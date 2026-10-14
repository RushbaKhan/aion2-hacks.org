import { initSmoothScroll, smoothScrollTo } from './smooth-scroll';
import { initSiteSearch } from './site-search';
import { textMatches } from './search-match';
import { navLinkIsActive } from '../utils/path';

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
      smoothScrollTo(target);
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
      smoothScrollTo(main);
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

function bootSite() {
  initFonts();
  initFaqFilters();
  initSiteSearch();
  initNavHighlight();
  initInPageScroll();
  initSkipLink();
  initThemeMetaColor();
  initSmoothScroll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootSite);
} else {
  bootSite();
}
