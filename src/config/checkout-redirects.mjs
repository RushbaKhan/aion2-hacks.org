/** Affiliate destinations keyed by internal product id. */
export const AFFILIATE_CHECKOUT_URLS = {
  dota2: 'https://zadeyo.com/go/PRO?to=%2Fproducts%2Fdota-2',
  skinChanger: 'https://zadeyo.com/go/PRO?to=%2Fproducts%2Fskin-changer',
  hwidSpoofer: 'https://zadeyo.com/go/PRO?to=%2Fproducts%2Fhwid-spoofer',
  ugc: 'https://zadeyo.com/go/PRO?to=%2Fproducts%2Fugc',
};

/** Checkout paths → affiliate URLs (used by Node serve + Astro middleware). */
export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/dota-2', AFFILIATE_CHECKOUT_URLS.dota2],
  ['/go/dota-2/', AFFILIATE_CHECKOUT_URLS.dota2],
  ['/go/skin-changer', AFFILIATE_CHECKOUT_URLS.skinChanger],
  ['/go/skin-changer/', AFFILIATE_CHECKOUT_URLS.skinChanger],
  ['/go/hwid-spoofer', AFFILIATE_CHECKOUT_URLS.hwidSpoofer],
  ['/go/hwid-spoofer/', AFFILIATE_CHECKOUT_URLS.hwidSpoofer],
  ['/go/ugc', AFFILIATE_CHECKOUT_URLS.ugc],
  ['/go/ugc/', AFFILIATE_CHECKOUT_URLS.ugc],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}
