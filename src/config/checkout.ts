import { CHECKOUT_URLS } from './checkout-redirects.mjs';

/**
 * External checkout URLs — server-side redirect targets only (never use as visible href).
 */
export const CHECKOUT = CHECKOUT_URLS;

export type CheckoutProduct = keyof typeof CHECKOUT;

/** URL slug for /go/[slug]/ checkout redirect pages. */
export const CHECKOUT_SLUGS: Record<CheckoutProduct, string> = {
  overwatch: 'go',
  dma: 'dma',
  hwid: 'hwid',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

/** Internal checkout path shown to users (hides external URL on hover). */
export function checkoutPath(product: CheckoutProduct = 'overwatch'): string {
  if (product === 'dma') return '/go/dma/';
  if (product === 'hwid') return '/go/hwid/';
  return '/go/';
}

/** Default product checkout redirect. */
export const PRIMARY_CHECKOUT_PATH = checkoutPath('overwatch');

/** Map internal product slugs to checkout redirect paths. */
export function checkoutForSlug(slug: string): string {
  if (slug === 'dma') return checkoutPath('dma');
  if (slug === 'hwid') return checkoutPath('hwid');
  return checkoutPath('overwatch');
}

/** Resolve blog CTA or legacy href values to internal checkout paths. */
export function resolveCheckoutHref(href: string): string {
  if (!href.startsWith('http')) {
    return href.startsWith('/') ? href : `/${href}`;
  }

  for (const [product, url] of Object.entries(CHECKOUT) as [CheckoutProduct, string][]) {
    if (href === url || href.startsWith(`${url}?`) || href.startsWith(`${url}/`)) {
      return checkoutPath(product);
    }
  }

  if (
    href.includes('%2Fproducts%2Foverwatch-2') ||
    href.includes('/products/overwatch-2') ||
    href.includes('%2Fproducts%2Foverwatch-cheats') ||
    href.includes('/products/overwatch-cheats') ||
    href.includes('%2Fproducts%2Foverwatch') ||
    href.includes('/products/overwatch')
  ) {
    return checkoutPath('overwatch');
  }
  if (href.includes('%2Fproducts%2Fcloud-dma') || href.includes('/products/cloud-dma')) {
    return checkoutPath('dma');
  }
  if (href.includes('%2Fproducts%2Fhwid-spoofer') || href.includes('/products/hwid-spoofer')) {
    return checkoutPath('hwid');
  }
  if (
    href.includes('%2Fproducts%2Faion-2') ||
    href.includes('/products/aion-2') ||
    href.includes('%2Fproducts%2Fthe-isle') ||
    href.includes('/products/the-isle')
  ) {
    return checkoutPath('overwatch');
  }

  return href;
}
