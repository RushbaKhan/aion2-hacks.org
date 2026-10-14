import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';

export default defineConfig({
  site: 'https://aion2cheats.org',
  trailingSlash: 'always',
  redirects: {
    '/contact/': '/go/',
    '/products/dota-2-cheats/': '/store/',
    '/products/the-isle-hacks/': '/store/',
    '/products/aion-2/': '/store/',
    '/blog/features/': '/intel/',
    '/blog/guides/': '/guides/',
    '/blog/setup/': '/howto/',
    '/blog/updates/': '/updates/',
    '/go/the-isle/': '/go/',
    '/go/aion-2/': '/go/',
    '/go/aion-2/monthly/': '/go/',
    '/go/aion-2/lifetime/': '/go/',
    '/the-isle-hacks-evrima/': '/cheats/',
    '/the-isle-player-esp/': '/esp/',
    '/the-isle-dinosaur-esp/': '/world/',
    '/the-isle-health-esp/': '/esp/',
    '/the-isle-aimbot/': '/aim/',
    '/the-isle-hacks-pc-setup/': '/pc/',
    '/the-isle-radar-features/': '/radar/',
    '/the-isle-esp-terminology/': '/esp/',
    '/the-isle-compatibility-eac/': '/compat/',
    '/the-isle-monthly-vs-lifetime/': '/plans/',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        if (['/404/', '/go/', '/monthly/', '/lifetime/', '/search/', '/support/', '/contact/'].includes(path)) {
          return false;
        }
        if (path.startsWith('/blog/') && path !== '/blog/') return false;
        if (path.startsWith('/forum/') && path !== '/forum/') return false;
        return true;
      },
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
});
