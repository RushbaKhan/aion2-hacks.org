import { createCarousel } from '@starwind-ui/runtime/carousel';
import Autoplay from 'embla-carousel-autoplay';
import type { EmblaCarouselType } from 'embla-carousel';

export const HERO_AUTOPLAY_MS = 4500;

function restartProgress(progressEl: HTMLElement) {
  progressEl.style.animation = 'none';
  void progressEl.offsetWidth;
  progressEl.style.animation = `hero-embla-progress ${HERO_AUTOPLAY_MS}ms linear forwards`;
}

function bindHeroDots(wrapper: HTMLElement, api: EmblaCarouselType) {
  const dotsRoot = wrapper.querySelector('[data-hero-embla-dots]');
  if (!dotsRoot) return;

  const dots = Array.from(dotsRoot.querySelectorAll<HTMLButtonElement>('[data-hero-embla-dot]'));

  const syncProgress = () => {
    const index = api.selectedScrollSnap();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    dots.forEach((dot, i) => {
      const progress = dot.querySelector<HTMLElement>('[data-hero-embla-progress]');
      if (!progress) return;

      progress.style.animation = 'none';
      progress.style.width = i === index && reducedMotion ? '100%' : '0%';

      if (i === index && !reducedMotion) {
        restartProgress(progress);
      }
    });
  };

  const setActive = () => {
    const index = api.selectedScrollSnap();
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.dataset.active = active ? 'true' : 'false';
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
      dot.tabIndex = active ? 0 : -1;
    });
    syncProgress();
  };

  dots.forEach((dot) => {
    const index = Number(dot.getAttribute('data-hero-embla-dot'));
    dot.addEventListener('click', () => api.scrollTo(index));
  });

  api.on('select', setActive);
  api.on('reInit', setActive);
  setActive();
}

function initHeroCarousels(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-hero-embla]').forEach((carouselRoot) => {
    if (carouselRoot.dataset.heroEmblaReady === 'true') return;
    carouselRoot.dataset.heroEmblaReady = 'true';

    const wrapper = carouselRoot.closest('[data-hero-embla-wrap]');
    if (!wrapper) return;

    const autoplay = Autoplay({
      delay: HERO_AUTOPLAY_MS,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    });

    const instance = createCarousel(carouselRoot, {
      opts: { loop: true, align: 'start' },
      plugins: [autoplay],
    });

    bindHeroDots(wrapper as HTMLElement, instance.api);
  });
}

export function setupHeroEmbla() {
  initHeroCarousels();
  document.addEventListener('astro:page-load', () => initHeroCarousels());
}
