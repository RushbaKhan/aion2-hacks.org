/** Checkout destinations keyed by internal product id. */
export const CHECKOUT_URLS = {
  overwatch: 'https://zadeyo.com/go/USMAN?to=%2Fproducts%2Foverwatch-2',
  dma: 'https://zadeyo.com/go/USMAN?to=%2Fproducts%2Fcloud-dma',
  hwid: 'https://zadeyo.com/go/USMAN?to=%2Fproducts%2Fhwid-spoofer',
};

function slashPairs(path, url) {
  const base = path.endsWith('/') ? path.slice(0, -1) : path;
  return [
    [base, url],
    [`${base}/`, url],
  ];
}

/** Checkout paths → external product URLs (used by Node serve + Astro middleware). */
export const CHECKOUT_PATH_REDIRECTS = new Map([
  ...slashPairs('/go', CHECKOUT_URLS.overwatch),
  ...slashPairs('/monthly', CHECKOUT_URLS.overwatch),
  ...slashPairs('/lifetime', CHECKOUT_URLS.overwatch),
  ...slashPairs('/go/overwatch', CHECKOUT_URLS.overwatch),
  ...slashPairs('/go/overwatch/monthly', CHECKOUT_URLS.overwatch),
  ...slashPairs('/go/overwatch/lifetime', CHECKOUT_URLS.overwatch),
  ...slashPairs('/go/monthly', CHECKOUT_URLS.overwatch),
  ...slashPairs('/go/lifetime', CHECKOUT_URLS.overwatch),
  ...slashPairs('/go/dma', CHECKOUT_URLS.dma),
  ...slashPairs('/go/hwid', CHECKOUT_URLS.hwid),
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}
