export const HERO_AUTOPLAY_MS = 4800;

function restartProgress(progressEl: HTMLElement) {
  progressEl.style.animation = 'none';
  void progressEl.offsetWidth;
  progressEl.style.animation = `hero-embla-progress ${HERO_AUTOPLAY_MS}ms linear forwards`;
}

function hydrateSlide(slide: HTMLElement) {
  if (slide.querySelector('img')) return;

  const src = slide.getAttribute('data-slide-src');
  const srcset = slide.getAttribute('data-slide-srcset');
  const avifset = slide.getAttribute('data-slide-avifset');
  const alt = slide.getAttribute('data-slide-alt') ?? '';
  const sizes = slide.getAttribute('data-slide-sizes') ?? '42vw';
  if (!src) return;

  const img = document.createElement('img');
  img.src = src;
  if (srcset) img.srcset = srcset;
  img.sizes = sizes;
  img.alt = alt;
  img.width = 3840;
  img.height = 2160;
  if (avifset) {
    const picture = document.createElement('picture');
    const avif = document.createElement('source');
    avif.type = 'image/avif';
    avif.srcset = avifset;
    avif.sizes = sizes;
    picture.append(avif);
    if (srcset) {
      const webp = document.createElement('source');
      webp.type = 'image/webp';
      webp.srcset = srcset;
      webp.sizes = sizes;
      picture.append(webp);
    }
    img.className = 'h-full w-full object-cover';
    img.decoding = 'async';
    img.loading = 'lazy';
    picture.append(img);
    slide.appendChild(picture);
    return;
  }
  img.decoding = 'async';
  img.loading = 'lazy';
  img.className = 'h-full w-full object-cover';
  slide.appendChild(img);
}

function initHeroSlider(wrap: HTMLElement) {
  if (wrap.dataset.heroSliderReady === 'true') return;
  wrap.dataset.heroSliderReady = 'true';

  const track = wrap.querySelector<HTMLElement>('[data-hero-slider-track]');
  const slides = track ? [...track.children] as HTMLElement[] : [];
  const dots = [...wrap.querySelectorAll<HTMLButtonElement>('[data-hero-slider-dot]')];
  const prev = wrap.querySelector<HTMLButtonElement>('[data-hero-slider-prev]');
  const next = wrap.querySelector<HTMLButtonElement>('[data-hero-slider-next]');
  if (!track || slides.length < 2) return;

  let index = 0;
  let timer: number | undefined;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const go = (nextIndex: number) => {
    index = (nextIndex + slides.length) % slides.length;
    hydrateSlide(slides[index]!);
    hydrateSlide(slides[(index + 1) % slides.length]!);
    track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.dataset.active = active ? 'true' : 'false';
      if (active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
      const progress = dot.querySelector<HTMLElement>('[data-hero-slider-progress]');
      if (!progress) return;
      progress.style.animation = 'none';
      progress.style.transform = active && reducedMotion ? 'scaleX(1)' : 'scaleX(0)';
      if (active && !reducedMotion) restartProgress(progress);
    });
  };

  const play = () => {
    if (reducedMotion || document.hidden) return;
    window.clearInterval(timer);
    timer = window.setInterval(() => go(index + 1), HERO_AUTOPLAY_MS);
  };

  const stop = () => {
    window.clearInterval(timer);
    timer = undefined;
  };

  prev?.addEventListener('click', () => {
    stop();
    go(index - 1);
  });
  next?.addEventListener('click', () => {
    stop();
    go(index + 1);
  });
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      stop();
      go(Number(dot.getAttribute('data-hero-slider-dot')) || 0);
    });
  });

  wrap.addEventListener('mouseenter', stop);
  wrap.addEventListener('mouseleave', play);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else play();
  });

  track.style.display = 'flex';
  track.style.transition = reducedMotion ? 'none' : 'transform 0.45s ease';
  track.style.willChange = 'transform';

  go(0);
  window.setTimeout(play, 8000);
}

export function setupHeroSlider() {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(max-width: 1023px)').matches) return;

  const run = () => {
    document.querySelectorAll<HTMLElement>('[data-hero-slider-wrap]').forEach(initHeroSlider);
  };

  const schedule = () => {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(run, { timeout: 1800 });
      return;
    }
    window.setTimeout(run, 400);
  };

  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });
}

export const setupHeroEmbla = setupHeroSlider;
