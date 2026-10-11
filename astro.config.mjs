import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';

export default defineConfig({
  site: 'https://islehacks.com',
  trailingSlash: 'always',
  redirects: {
    '/cheats/': '/store/',
    '/cheats/lite/': '/store/',
    '/cheats/pro/': '/store/',
    '/cheats/elite/': '/store/',
    '/cheats/compare/': '/features/',
    '/contact/': '/go/',
    '/products/dota-2-cheats/': '/store/',
    '/products/dota-2-cheats/elite/': '/store/',
    '/products/dota-2-cheats/utilities/': '/store/',
    '/products/the-isle-hacks/': '/store/',
    '/blog/features/': '/intel/',
    '/blog/guides/': '/guides/',
    '/blog/setup/': '/howto/',
    '/blog/updates/': '/updates/',
    '/go/the-isle/': '/go/',
    '/go/the-isle/monthly/': '/go/',
    '/go/the-isle/lifetime/': '/go/',
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
        return !['/404/', '/go/', '/monthly/', '/lifetime/', '/search/', '/support/', '/contact/'].includes(path);
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
