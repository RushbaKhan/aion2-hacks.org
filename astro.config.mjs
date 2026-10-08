import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';

export default defineConfig({
  site: 'https://dotacheats.com',
  trailingSlash: 'always',
  redirects: {
    '/cheats/': '/products/dota-2-cheats/',
    '/cheats/lite/': '/products/dota-2-cheats/',
    '/cheats/pro/': '/products/dota-2-cheats/',
    '/cheats/elite/': '/products/dota-2-cheats/elite/',
    '/cheats/compare/': '/blog/dota-2-lite-vs-pro/',
    '/contact/': '/support/',
  },
  compressHTML: true,
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/go/'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
});
