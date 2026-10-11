/** Checkout destinations keyed by internal product id. */
export const CHECKOUT_URLS = {
  isle: 'https://zadeyo.com/go/USMAN?to=%2Fproducts%2Fthe-isle-novaxware',
};

/** Checkout paths → external product URLs (used by Node serve + Astro middleware). */
export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go', CHECKOUT_URLS.isle],
  ['/go/', CHECKOUT_URLS.isle],
  ['/monthly', CHECKOUT_URLS.isle],
  ['/monthly/', CHECKOUT_URLS.isle],
  ['/lifetime', CHECKOUT_URLS.isle],
  ['/lifetime/', CHECKOUT_URLS.isle],
  ['/go/the-isle', CHECKOUT_URLS.isle],
  ['/go/the-isle/', CHECKOUT_URLS.isle],
  ['/go/the-isle/monthly', CHECKOUT_URLS.isle],
  ['/go/the-isle/monthly/', CHECKOUT_URLS.isle],
  ['/go/the-isle/lifetime', CHECKOUT_URLS.isle],
  ['/go/the-isle/lifetime/', CHECKOUT_URLS.isle],
  ['/go/monthly', CHECKOUT_URLS.isle],
  ['/go/monthly/', CHECKOUT_URLS.isle],
  ['/go/lifetime', CHECKOUT_URLS.isle],
  ['/go/lifetime/', CHECKOUT_URLS.isle],
  ['/support', CHECKOUT_URLS.isle],
  ['/support/', CHECKOUT_URLS.isle],
  ['/contact', CHECKOUT_URLS.isle],
  ['/contact/', CHECKOUT_URLS.isle],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}
