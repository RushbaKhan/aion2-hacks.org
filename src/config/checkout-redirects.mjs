/** Checkout destinations keyed by internal product id. */
export const CHECKOUT_URLS = {
  aion2: 'https://levocheats.com/go/RUSHBA?to=%2Faion-2-cheats',
  dma: 'https://levocheats.com/go/RUSHBA?to=%2Fcloud-dma',
  hwid: 'https://levocheats.com/go/RUSHBA?to=%2Fhwid-spoofer',
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
  ...slashPairs('/go', CHECKOUT_URLS.aion2),
  ...slashPairs('/weekly', CHECKOUT_URLS.aion2),
  ...slashPairs('/monthly', CHECKOUT_URLS.aion2),
  ...slashPairs('/lifetime', CHECKOUT_URLS.aion2),
  ...slashPairs('/go/aion-2', CHECKOUT_URLS.aion2),
  ...slashPairs('/go/aion-2/weekly', CHECKOUT_URLS.aion2),
  ...slashPairs('/go/aion-2/monthly', CHECKOUT_URLS.aion2),
  ...slashPairs('/go/aion-2/lifetime', CHECKOUT_URLS.aion2),
  ...slashPairs('/go/weekly', CHECKOUT_URLS.aion2),
  ...slashPairs('/go/monthly', CHECKOUT_URLS.aion2),
  ...slashPairs('/go/lifetime', CHECKOUT_URLS.aion2),
  ...slashPairs('/go/dma', CHECKOUT_URLS.dma),
  ...slashPairs('/go/cloud-dma', CHECKOUT_URLS.dma),
  ...slashPairs('/go/hwid', CHECKOUT_URLS.hwid),
  ...slashPairs('/go/hwid-spoofer', CHECKOUT_URLS.hwid),
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}
