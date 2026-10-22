function nativeScrollTo(target: HTMLElement) {
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function initFonts() {
  document.documentElement.classList.remove('fonts-pending');
  document.documentElement.classList.add('fonts-ready');
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

function initThemeMetaColor() {
  const metaTheme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  const isDark = document.documentElement.classList.contains('dark');
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  if (metaTheme) metaTheme.content = isDark ? '#2d6ee2' : '#f5f7fa';
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


function initSmoothScrollLazy() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    window.removeEventListener('pointerdown', start);
    window.removeEventListener('keydown', start);
    void import('./smooth-scroll').then(({ initSmoothScroll }) => initSmoothScroll());
  };
  window.addEventListener('pointerdown', start, { once: true, passive: true });
  window.addEventListener('keydown', start, { once: true });
  window.setTimeout(start, 4000);
}

function initMarquee() {
  document.querySelectorAll('.hero-status-marquee-track').forEach((track) => {
    if (track.dataset.cloned === 'true') return;
    track.append(...[...track.children].map((child) => child.cloneNode(true)));
    track.dataset.cloned = 'true';
  });
  document.querySelectorAll('.hero-status-marquee').forEach((el) => el.classList.add('is-running'));
}

function bootSite() {
  initFonts();
  initInPageScroll();
  initSkipLink();
  initThemeMetaColor();
  initMobileNav();
  const idle = (fn: () => void, timeout = 1800) => {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(fn, { timeout });
    } else {
      window.setTimeout(fn, Math.min(timeout, 600));
    }
  };
  idle(() => {
    if (document.querySelector('[data-site-search]')) {
      void import('./site-search').then(({ initSiteSearch }) => initSiteSearch());
    }
  });
  idle(() => {
    if (document.querySelector('[data-faq-section]')) {
      void import('./faq-filters').then(({ initFaqFilters }) => initFaqFilters());
    }
  });
  idle(() => {
    if (
      window.matchMedia('(min-width: 1024px)').matches &&
      document.querySelector('[data-hero-slider]')
    ) {
      void import('./hero-embla').then(({ setupHeroSlider }) => setupHeroSlider());
    }
  }, 2500);
  const startMarquee = () => initMarquee();
  window.addEventListener('pointerdown', startMarquee, { once: true, passive: true });
  window.setTimeout(startMarquee, 5000);
  initSmoothScrollLazy();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootSite);
} else {
  bootSite();
}
