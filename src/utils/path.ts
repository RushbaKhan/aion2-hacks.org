import { PRODUCT_BASE } from '../config/site';

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
  '/cheats': PRODUCT_BASE,
  '/cheats/': PRODUCT_BASE,
  '/cheats/lite': PRODUCT_BASE,
  '/cheats/lite/': PRODUCT_BASE,
  '/cheats/pro': PRODUCT_BASE,
  '/cheats/pro/': PRODUCT_BASE,
  '/cheats/elite': PRODUCT_BASE,
  '/cheats/elite/': PRODUCT_BASE,
  '/cheats/compare': '/features/',
  '/cheats/compare/': '/features/',
  '/contact': '/go/',
  '/contact/': '/go/',
  '/support': '/go/',
  '/support/': '/go/',
  '/products/dota-2-cheats': PRODUCT_BASE,
  '/products/dota-2-cheats/': PRODUCT_BASE,
  '/products/the-isle-hacks': PRODUCT_BASE,
  '/products/the-isle-hacks/': PRODUCT_BASE,
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
  '/go/the-isle/monthly': '/go/',
  '/go/the-isle/monthly/': '/go/',
  '/go/the-isle/lifetime': '/go/',
  '/go/the-isle/lifetime/': '/go/',
  '/go/dota-2': '/go/',
  '/go/dota-2/': '/go/',
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
  support: '/go/',
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

export function productPath(_slug?: string): string {
  return PRODUCT_BASE;
}

/** Render `[label](/path/)` as an internal HTML link. */
export function linkifyMarkdown(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label: string, href: string) => {
    return `<a href="${normalizeInternalPath(href)}">${label}</a>`;
  });
}
