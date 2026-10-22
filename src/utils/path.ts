import { DISCORD_INVITE, PRODUCT_BASE } from '../config/site';

/** Normalize internal paths to match trailingSlash: 'always' and canonical URLs. */
export function withTrailingSlash(path: string): string {
  if (!path || path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:')) {
    return path;
  }
  const [pathname, hash = ''] = path.split('#');
  const normalized = pathname === '/' || pathname.endsWith('/') ? pathname : `${pathname}/`;
  return hash ? `${normalized}#${hash}` : normalized;
}

const BLOG_TOPIC_PATHS: Record<string, string> = {
  features: '/intel/',
  guides: '/guides/',
  setup: '/howto/',
  updates: '/updates/',
};

/** Former nested or leftover URLs → current single-segment routes. */
export const LEGACY_PATH_MAP: Record<string, string> = {
  '/cheats/lite': PRODUCT_BASE,
  '/cheats/lite/': PRODUCT_BASE,
  '/cheats/pro': PRODUCT_BASE,
  '/cheats/pro/': PRODUCT_BASE,
  '/cheats/elite': PRODUCT_BASE,
  '/cheats/elite/': PRODUCT_BASE,
  '/cheats/compare': '/features/',
  '/cheats/compare/': '/features/',
  '/contact': DISCORD_INVITE,
  '/contact/': DISCORD_INVITE,
  '/support': DISCORD_INVITE,
  '/support/': DISCORD_INVITE,
  '/products/dota-2-cheats': PRODUCT_BASE,
  '/products/dota-2-cheats/': PRODUCT_BASE,
  '/products/the-isle-hacks': PRODUCT_BASE,
  '/products/the-isle-hacks/': PRODUCT_BASE,
  '/products/aion-2': PRODUCT_BASE,
  '/products/aion-2/': PRODUCT_BASE,
  '/products/overwatch': PRODUCT_BASE,
  '/products/overwatch/': PRODUCT_BASE,
  '/products/cloud-dma': '/cloud-dma/',
  '/products/cloud-dma/': '/cloud-dma/',
  '/products/hwid-spoofer': '/hwid-spoofer/',
  '/products/hwid-spoofer/': '/hwid-spoofer/',
  '/dma': '/cloud-dma/',
  '/dma/': '/cloud-dma/',
  '/hwid': '/hwid-spoofer/',
  '/hwid/': '/hwid-spoofer/',
  '/blog/features': '/intel/',
  '/blog/features/': '/intel/',
  '/blog/guides': '/guides/',
  '/blog/guides/': '/guides/',
  '/blog/setup': '/howto/',
  '/blog/setup/': '/howto/',
  '/blog/updates': '/updates/',
  '/blog/updates/': '/updates/',
  '/go/the-isle': '/go/',
  '/go/the-isle/': '/go/',
  '/go/aion-2': '/go/',
  '/go/aion-2/': '/go/',
  '/go/aion-2/monthly': '/go/',
  '/go/aion-2/monthly/': '/go/',
  '/go/aion-2/lifetime': '/go/',
  '/go/aion-2/lifetime/': '/go/',
  '/go/dota-2': '/go/',
  '/go/dota-2/': '/go/',
  '/go/overwatch': '/go/',
  '/go/overwatch/': '/go/',
  '/flight': '/aion-2-classes/',
  '/flight/': '/aion-2-classes/',
  '/nodes': '/esp/',
  '/nodes/': '/esp/',
  '/world': '/esp/',
  '/world/': '/esp/',
  '/compat': '/ac/',
  '/compat/': '/ac/',
  '/classes': '/aion-2-classes/',
  '/classes/': '/aion-2-classes/',
  '/guide': '/cheats/',
  '/guide/': '/cheats/',
  '/release': '/aion-2-updates/',
  '/release/': '/aion-2-updates/',
  '/na': '/pc/',
  '/na/': '/pc/',
  '/ow2': '/aion-2-updates/',
  '/ow2/': '/aion-2-updates/',
  '/juno': '/aion-2-classes/',
  '/juno/': '/aion-2-classes/',
  '/dva': '/aion-2-classes/',
  '/dva/': '/aion-2-classes/',
  '/heroes': '/aion-2-classes/',
  '/heroes/': '/aion-2-classes/',
  '/hero': '/aion-2-classes/',
  '/hero/': '/aion-2-classes/',
  '/skins': '/store/',
  '/skins/': '/store/',
  '/ranks': '/aion-2-updates/',
  '/ranks/': '/aion-2-updates/',
  '/patch': '/aion-2-updates/',
  '/patch/': '/aion-2-updates/',
  '/cross': '/pc/',
  '/cross/': '/pc/',
  '/blizzard': '/about/',
  '/blizzard/': '/about/',
  '/tier': '/aion-2-builds/',
  '/tier/': '/aion-2-builds/',
  '/reddit': '/forum/',
  '/reddit/': '/forum/',
  '/obj': '/esp/',
  '/obj/': '/esp/',
  '/q-flight': '/forum/',
  '/q-flight/': '/forum/',
  '/q-nodes': '/forum/',
  '/q-nodes/': '/forum/',
  '/q-compat': '/forum/',
  '/q-compat/': '/forum/',
  '/the-isle-hacks-evrima': '/cheats/',
  '/the-isle-hacks-evrima/': '/cheats/',
  '/the-isle-player-esp': '/esp/',
  '/the-isle-player-esp/': '/esp/',
  '/the-isle-dinosaur-esp': '/esp/',
  '/the-isle-dinosaur-esp/': '/esp/',
  '/the-isle-health-esp': '/esp/',
  '/the-isle-health-esp/': '/esp/',
  '/the-isle-aimbot': '/aim/',
  '/the-isle-aimbot/': '/aim/',
  '/the-isle-hacks-pc-setup': '/pc/',
  '/the-isle-hacks-pc-setup/': '/pc/',
  '/the-isle-radar-features': '/radar/',
  '/the-isle-radar-features/': '/radar/',
  '/the-isle-esp-terminology': '/esp/',
  '/the-isle-esp-terminology/': '/esp/',
  '/the-isle-compatibility-eac': '/ac/',
  '/the-isle-compatibility-eac/': '/ac/',
  '/the-isle-monthly-vs-lifetime': '/plans/',
  '/the-isle-monthly-vs-lifetime/': '/plans/',
};

function flattenNestedPath(pathname: string): string {
  const mapped = LEGACY_PATH_MAP[pathname];
  if (mapped) return mapped;

  const blogArticle = pathname.match(/^\/blog\/([^/]+)\/?$/);
  if (blogArticle) {
    const slug = blogArticle[1];
    if (slug && slug !== 'features' && slug !== 'guides' && slug !== 'setup' && slug !== 'updates') {
      return `/${slug}/`;
    }
  }

  const forumArticle = pathname.match(/^\/forum\/([^/]+)\/?$/);
  if (forumArticle?.[1]) return `/${forumArticle[1]}/`;

  return pathname;
}

export function normalizeInternalPath(href: string): string {
  if (!href || href.startsWith('http') || href.startsWith('mailto:')) {
    return href;
  }

  const hashIndex = href.indexOf('#');
  const rawPath = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : '';

  let pathname = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  pathname = flattenNestedPath(pathname);

  return withTrailingSlash(pathname) + hash;
}

export const ROUTES = {
  home: '/',
  features: '/features/',
  store: '/store/',
  dma: '/cloud-dma/',
  hwid: '/hwid-spoofer/',
  status: '/status/',
  preview: '/preview/',
  setup: '/setup/',
  reviews: '/reviews/',
  blog: '/blog/',
  forum: '/forum/',
  products: PRODUCT_BASE,
  productsElite: PRODUCT_BASE,
  productsUtilities: PRODUCT_BASE,
  faq: '/faq/',
  terms: '/terms/',
  about: '/about/',
  support: DISCORD_INVITE,
  privacy: '/privacy/',
  intel: '/intel/',
  guides: '/guides/',
  howto: '/howto/',
  updates: '/updates/',
  checkout: '/go/',
  search: '/search/',
} as const;

export function blogPostPath(slug: string): string {
  return `/${slug}/`;
}

export function forumPostPath(slug: string): string {
  return `/${slug}/`;
}

export function blogTopicSlug(tag: string): string {
  return tag.trim().toLowerCase().replaceAll(/\s+/g, '-');
}

export function blogTopicPath(tag: string): string {
  if (!tag || tag === 'all') return ROUTES.blog;
  return BLOG_TOPIC_PATHS[blogTopicSlug(tag)] ?? ROUTES.blog;
}

/** @deprecated Use productPath — product pages live under the store. */
export function cheatPath(slug: string): string {
  return productPath(slug);
}

export function productPath(slug?: string): string {
  if (slug === 'dma') return ROUTES.dma;
  if (slug === 'hwid') return ROUTES.hwid;
  return PRODUCT_BASE;
}

const BLOG_SECTION_PATHS = new Set([
  '/blog',
  '/intel',
  '/guides',
  '/howto',
  '/updates',
  '/cheats',
  '/esp',
  '/aim',
  '/radar',
  '/pc',
  '/ac',
  '/plans',
  '/aion-2-classes',
  '/aion-2-builds',
  '/aion-2-leveling',
  '/aion-2-updates',
  '/aion-2-requirements',
]);

function stripPath(pathname: string) {
  return pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
}

/** Which navbar href should light up for the current URL. */
export function activeNavHref(pathname: string): string {
  const path = stripPath(pathname);

  if (path === '/') return ROUTES.home;
  if (path === '/features' || path === '/status' || path === '/preview' || path === '/setup') {
    return ROUTES.features;
  }
  if (
    path === '/store' ||
    path === '/dma' ||
    path === '/hwid' ||
    path === '/cloud-dma' ||
    path === '/hwid-spoofer' ||
    path === '/products' ||
    path.startsWith('/products/')
  ) {
    return ROUTES.store;
  }
  if (path === '/forum' || path.startsWith('/forum/') || path.startsWith('/q-')) {
    return ROUTES.forum;
  }
  if (path === '/faq') return ROUTES.faq;
  if (path === '/go' || path.startsWith('/go/')) {
    return ROUTES.store;
  }
  if (BLOG_SECTION_PATHS.has(path) || path.startsWith('/blog/')) {
    return ROUTES.blog;
  }

  return '';
}

export function navLinkIsActive(pathname: string, href: string) {
  const current = activeNavHref(pathname);
  if (!current) return false;
  return stripPath(href) === stripPath(current);
}

export function isExternalHref(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:');
}

/** Render `[label](/path/)` as an HTML link. */
export function linkifyMarkdown(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label: string, href: string) => {
    const url = normalizeInternalPath(href);
    if (isExternalHref(url)) {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    }
    return `<a href="${url}">${label}</a>`;
  });
}
