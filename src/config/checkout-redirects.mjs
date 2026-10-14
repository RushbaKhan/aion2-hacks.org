/** Checkout destinations keyed by internal product id. */
export const CHECKOUT_URLS = {
  aion: 'https://zadeyo.com/go/USMAN?to=%2Fproducts%2Faion-2',
};

/** Checkout paths → external product URLs (used by Node serve + Astro middleware). */
export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go', CHECKOUT_URLS.aion],
  ['/go/', CHECKOUT_URLS.aion],
  ['/monthly', CHECKOUT_URLS.aion],
  ['/monthly/', CHECKOUT_URLS.aion],
  ['/lifetime', CHECKOUT_URLS.aion],
  ['/lifetime/', CHECKOUT_URLS.aion],
  ['/go/aion-2', CHECKOUT_URLS.aion],
  ['/go/aion-2/', CHECKOUT_URLS.aion],
  ['/go/aion-2/monthly', CHECKOUT_URLS.aion],
  ['/go/aion-2/monthly/', CHECKOUT_URLS.aion],
  ['/go/aion-2/lifetime', CHECKOUT_URLS.aion],
  ['/go/aion-2/lifetime/', CHECKOUT_URLS.aion],
  ['/go/monthly', CHECKOUT_URLS.aion],
  ['/go/monthly/', CHECKOUT_URLS.aion],
  ['/go/lifetime', CHECKOUT_URLS.aion],
  ['/go/lifetime/', CHECKOUT_URLS.aion],
  ['/support', CHECKOUT_URLS.aion],
  ['/support/', CHECKOUT_URLS.aion],
  ['/contact', CHECKOUT_URLS.aion],
  ['/contact/', CHECKOUT_URLS.aion],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}
