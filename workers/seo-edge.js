import { resolveCheckoutPathRedirect } from '../src/config/checkout-redirects.mjs';

const CANONICAL_HOST = 'overwatchcheat.com';
const FILE_ASSETS = new Set([
  '/sitemap.xml',
  '/sitemap-index.xml',
  '/sitemap-0.xml',
  '/robots.txt',
  '/rss.xml',
  '/og.jpg',
  '/opengraph.jpg',
  '/favicon.ico',
  '/favicon.svg',
  '/site.webmanifest',
]);

const XML_FILES = new Set(['/sitemap.xml', '/sitemap-index.xml', '/sitemap-0.xml', '/rss.xml']);
const FALLBACK_SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://overwatchcheat.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
const COVER_PATHS = new Set([
  '/opengraph.jpg',
  '/og.jpg',
  '/images/gameplay/ow2.jpg',
  '/images/gameplay/overwatch-aim.jpg',
  '/images/gameplay/ow-lab-combat.jpg',
]);
const COVER_ASSET = '/opengraph.jpg';

function isImmutableAsset(pathname) {
  return (
    pathname.startsWith('/_astro/') ||
    pathname.startsWith('/images/') ||
    /\.(?:webp|png|jpe?g|svg|js|css|ico|woff2?)$/i.test(pathname)
  );
}

function applyAssetHeaders(pathname, headers) {
  const contentType = headers.get('content-type') ?? '';

  if (XML_FILES.has(pathname)) {
    headers.set('content-type', 'application/xml; charset=utf-8');
    headers.set('x-content-type-options', 'nosniff');
    headers.set('cache-control', 'public, max-age=3600, must-revalidate, no-transform');
    return;
  }

  if (pathname === '/robots.txt') {
    headers.set('content-type', 'text/plain; charset=utf-8');
    headers.set('cache-control', 'public, max-age=3600, must-revalidate');
    return;
  }

  if (contentType.toLowerCase().startsWith('text/html') && !/charset=/i.test(contentType)) {
    headers.set('content-type', 'text/html; charset=utf-8');
  }

  if (isImmutableAsset(pathname)) {
    headers.set('cache-control', 'public, max-age=31536000, immutable');
  } else if (pathname === '/site.webmanifest') {
    headers.set('cache-control', 'public, max-age=86400');
  }
}

function xmlResponse(body, method, contentType = 'application/xml; charset=utf-8') {
  const bytes = typeof body === 'string' ? new TextEncoder().encode(body) : new Uint8Array(body);
  const headers = new Headers({
    'content-type': contentType,
    'content-length': String(bytes.byteLength),
    'cache-control': 'public, max-age=3600, must-revalidate, no-transform',
    'x-content-type-options': 'nosniff',
  });

  return new Response(method === 'HEAD' ? null : bytes, { status: 200, headers });
}

async function serveExactAsset(env, request, pathname, contentType) {
  try {
    const asset = await env.ASSETS.fetch(new Request(`https://assets.local${pathname}`, { method: 'GET' }));
    if (asset.ok) {
      return xmlResponse(await asset.text(), request.method, contentType);
    }
  } catch {
    // Keep a valid sitemap response so Search Console can always fetch it.
  }

  if (pathname === '/robots.txt') {
    return xmlResponse(
      'User-agent: *\nAllow: /\nSitemap: https://overwatchcheat.com/sitemap.xml\n',
      request.method,
      'text/plain; charset=utf-8',
    );
  }

  return xmlResponse(FALLBACK_SITEMAP, request.method);
}

async function serveCover(env, request) {
  const asset = await env.ASSETS.fetch(new Request(`https://assets.local${COVER_ASSET}`, { method: 'GET' }));
  const body = await asset.arrayBuffer();
  const headers = new Headers({
    'content-type': 'image/jpeg',
    'content-length': String(body.byteLength),
    'cache-control': 'public, max-age=86400',
    'access-control-allow-origin': '*',
    'x-content-type-options': 'nosniff',
  });

  if (request.method === 'HEAD' || request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  return new Response(body, { status: 200, headers });
}

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);

      if (url.hostname === `www.${CANONICAL_HOST}` || url.hostname.startsWith('www.')) {
        url.hostname = CANONICAL_HOST;
        url.protocol = 'https:';
        return Response.redirect(url.href, 301);
      }

      if (url.protocol === 'http:') {
        url.protocol = 'https:';
        return Response.redirect(url.href, 301);
      }

      if (url.pathname.endsWith('/') && FILE_ASSETS.has(url.pathname.slice(0, -1))) {
        url.pathname = url.pathname.slice(0, -1);
        return Response.redirect(url.href, 301);
      }

      if (XML_FILES.has(url.pathname)) {
        return serveExactAsset(env, request, url.pathname, 'application/xml; charset=utf-8');
      }

      if (url.pathname === '/robots.txt') {
        return serveExactAsset(env, request, url.pathname, 'text/plain; charset=utf-8');
      }

      if (COVER_PATHS.has(url.pathname)) {
        return serveCover(env, request);
      }

      const checkout = resolveCheckoutPathRedirect(url.pathname);
      if (checkout) {
        return Response.redirect(checkout, 302);
      }

      const response = await env.ASSETS.fetch(request);
      const headers = new Headers(response.headers);
      applyAssetHeaders(url.pathname, headers);

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    } catch {
      const failPath = new URL(request.url).pathname;
      if (XML_FILES.has(failPath) || failPath === '/sitemap.xml/') {
        return xmlResponse(FALLBACK_SITEMAP, request.method);
      }

      return new Response('Not found', {
        status: 404,
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      });
    }
  },
};
