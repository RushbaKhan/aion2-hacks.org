import { resolveCheckoutPathRedirect } from '../src/config/checkout-redirects.mjs';

const CANONICAL_HOST = 'islehacks.org';

function isImmutableAsset(pathname) {
  return (
    pathname.startsWith('/_astro/') ||
    pathname.startsWith('/images/') ||
    /\.(?:webp|png|svg|js|css|ico|woff2?)$/i.test(pathname)
  );
}

export default {
  async fetch(request, env) {
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

    const checkout = resolveCheckoutPathRedirect(url.pathname);
    if (checkout) {
      return Response.redirect(checkout, 302);
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    const contentType = headers.get('content-type') ?? '';

    if (contentType.toLowerCase().startsWith('text/html') && !/charset=/i.test(contentType)) {
      headers.set('content-type', 'text/html; charset=utf-8');
    }

    if (isImmutableAsset(url.pathname)) {
      headers.set('cache-control', 'public, max-age=31536000, immutable');
    } else if (url.pathname === '/sitemap.xml' || url.pathname === '/site.webmanifest') {
      headers.set('cache-control', 'public, max-age=86400');
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
