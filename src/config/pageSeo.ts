/**
 * Central titles/descriptions for high-traffic routes.
 * After Search Console shows impressions, edit the matching path here and redeploy.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    // gscNote: Keep primary keyword "dota 2 cheats" near front; trim if title truncates in SERP.
    title: 'Dota 2 Cheats & Hacks | Scripts, Map Hack & ESP',
    description:
      'Dota 2 cheats for PC ranked: scripts, map hack, zoom hack, and skin changer tiers updated every patch at dotacheats.com.',
  },
  '/products/dota-2-cheats/': {
    title: 'Dota 2 Elite Cheats & Utility Products',
    description:
      'Elite dota 2 cheats plus HWID spoofer, UGC tools, and Skin Changer utilities for Steam ranked on dotacheats.com.',
  },
  '/products/dota-2-cheats/elite/': {
    title: 'Dota 2 Elite Cheats | Bots & Full Map Hack',
    description:
      'Elite tier: auto farm bot, kill steal, skin changer, full map hack suite, and priority patch delivery.',
  },
  '/products/dota-2-cheats/utilities/': {
    title: 'Dota 2 Utilities | HWID, UGC & Skin Changer',
    description:
      'Choose HWID Spoofer, UGC, or Skin Changer—when each utility fits and links to full product pages.',
  },
  '/blog/': {
    title: 'Dota 2 Cheats Guides & Patch Notes',
    description:
      'Setup guides, Lite vs Pro comparisons, VAC patch checklists, and ranked config tips for dota cheats.',
  },
  '/forum/': {
    title: 'Dota 2 Community Forum | DotaCheats',
    description: 'Join Dota players to discuss heroes, builds, patch changes, guides, and community moments.',
  },
  '/faq/': {
    title: 'FAQ | Dota 2 Cheats, Products & Setup',
    description:
      'Answers on cheat tiers, map hack, scripts, HWID tools, checkout, and blog guides at dotacheats.com.',
  },
  '/terms/': {
    title: 'Terms & Conditions | DotaCheats',
    description:
      'Purchase terms, license use, and refund policy for DotaCheats products sold through dotacheats.com.',
  },
  '/privacy/': {
    title: 'Privacy Policy | DotaCheats',
    description:
      'How dotacheats.com uses analytics, cookies, and contact data when you browse or request support.',
  },
  '/about/': {
    title: 'About DotaCheats',
    description:
      'What DotaCheats publishes: Dota 2 cheat tiers, utilities, guides, and status notes at dotacheats.com.',
  },
  '/support/': {
    title: 'Support | DotaCheats',
    description:
      'Get help with loader setup, HWID, and checkout for Dota 2 cheat tiers and utilities.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}
