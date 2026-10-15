import { initSiteSearch } from './site-search';
import { textMatches } from './search-match';
import { navLinkIsActive } from '../utils/path';
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, isLocaleCode } from '../i18n/locales';

function nativeScrollTo(target: HTMLElement) {
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function currentLocaleHint() {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('hl') ?? '';
    if (isLocaleCode(fromUrl)) return fromUrl;
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY) ?? '';
    if (isLocaleCode(stored)) return stored;
  } catch {
    // ignore
  }
  return DEFAULT_LOCALE;
}

function initFonts() {
  document.documentElement.classList.remove('fonts-pending');
  document.documentElement.classList.add('fonts-ready');
}

function initNavHighlight() {
  const path = window.location.pathname;

  document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]').forEach((link) => {
    const href = link.getAttribute('href') ?? '';
    const isActive = navLinkIsActive(path, href);

    link.classList.toggle('is-active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function initInPageScroll() {
  document.querySelectorAll<HTMLElement>('[data-scroll-target]').forEach((el) => {
    el.addEventListener('click', (event) => {
      const id = el.getAttribute('data-scroll-target');
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      const href = el.getAttribute('href');
      if (href) {
        try {
          const url = new URL(href, window.location.href);
          const here = window.location.pathname.replace(/\/$/, '') || '/';
          const there = url.pathname.replace(/\/$/, '') || '/';
          if (there !== here) return;
        } catch {
          return;
        }
      }

      event.preventDefault();
      nativeScrollTo(target);
    });
  });
}

function initSkipLink() {
  document.querySelectorAll<HTMLElement>('[data-skip-to-main]').forEach((button) => {
    button.addEventListener('click', () => {
      const main = document.getElementById('main-content');
      if (!main) return;

      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: true });
      nativeScrollTo(main);
    });
  });
}

function initFaqFilters() {
  document.querySelectorAll('[data-faq-section]').forEach((section) => {
    const list = section.querySelector('[data-faq-list]');
    if (!list) return;

    const items = list.querySelectorAll<HTMLElement>('[data-faq-topic]');
    const chips = section.querySelectorAll<HTMLButtonElement>('[data-faq-filter]');
    const searchInput = section.querySelector<HTMLInputElement>('[data-faq-search]');

    const apply = () => {
      const topic =
        section.querySelector<HTMLButtonElement>('[data-faq-filter].is-active')?.getAttribute('data-faq-filter') ??
        'all';
      const query = searchInput?.value.trim().toLocaleLowerCase() ?? '';

      items.forEach((item) => {
        const itemTopic = item.getAttribute('data-faq-topic');
        const haystack = item.getAttribute('data-faq-search-text') ?? item.textContent ?? '';
        const show = (topic === 'all' || itemTopic === topic) && textMatches(haystack, query);
        item.toggleAttribute('data-hidden', !show);
        item.classList.toggle('hidden', !show);
      });
    };

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.classList.toggle('is-active', c === chip));
        apply();
      });
    });

    searchInput?.addEventListener('input', apply);

    const queryFromUrl = new URLSearchParams(window.location.search).get('q');
    if (queryFromUrl && searchInput) {
      searchInput.value = queryFromUrl;
    }

    apply();
  });
}

function initThemeMetaColor() {
  const metaTheme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

  const update = () => {
    const isDark = document.documentElement.classList.contains('dark');
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    if (metaTheme) metaTheme.content = isDark ? '#5B21B6' : '#f5f3ff';
  };

  update();
  const observer = new MutationObserver(update);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}

function initMobileNav() {
  const nav = document.getElementById('site-mobile-nav');
  const toggle = document.querySelector<HTMLElement>('[data-mobile-nav-toggle]');
  if (!nav || !toggle) return;

  const sync = () => {
    toggle.setAttribute('aria-expanded', nav.matches(':popover-open') ? 'true' : 'false');
  };

  nav.addEventListener('toggle', sync);
  sync();
}

function initLocaleLayer() {
  const locale = currentLocaleHint();

  document.querySelectorAll<HTMLSelectElement>('[data-lang-select]').forEach((select, index) => {
    if (isLocaleCode(locale)) select.value = locale;
    if (!select.id) select.id = `site-language-select-${index}`;
    select.addEventListener('change', () => {
      const next = select.value;
      if (!isLocaleCode(next)) return;
      void import('./apply-locale').then(({ setLocale }) => setLocale(next));
    });
  });

  if (locale !== DEFAULT_LOCALE) {
    void import('./apply-locale').then(({ applyLocale }) => applyLocale(locale));
  }
}

function initSmoothScrollLazy() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(max-width: 1024px), (pointer: coarse)').matches) return;

  const load = () => {
    void import('./smooth-scroll').then(({ initSmoothScroll }) => initSmoothScroll());
  };

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(load, { timeout: 2500 });
  } else {
    window.setTimeout(load, 600);
  }
}

function bootSite() {
  initFonts();
  initNavHighlight();
  initInPageScroll();
  initSkipLink();
  initThemeMetaColor();
  initMobileNav();
  initLocaleLayer();
  initSiteSearch();
  const runFaq = () => {
    if (document.querySelector('[data-faq-section]')) initFaqFilters();
  };
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(runFaq, { timeout: 1800 });
  } else {
    window.setTimeout(runFaq, 400);
  }
  initSmoothScrollLazy();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootSite);
} else {
  bootSite();
}
