import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';

export default defineConfig({
  site: 'https://aion2hacks.org',
  trailingSlash: 'always',
  redirects: {
    '/contact/': 'https://discord.gg/BX5rs748K',
    '/support/': 'https://discord.gg/BX5rs748K',
    '/products/dota-2-cheats/': '/store/',
    '/products/the-isle-hacks/': '/store/',
    '/products/aion-2/': '/store/',
    '/products/overwatch/': '/store/',
    '/products/cloud-dma/': '/cloud-dma/',
    '/products/hwid-spoofer/': '/hwid-spoofer/',
    '/dma/': '/cloud-dma/',
    '/hwid/': '/hwid-spoofer/',
    '/blog/features/': '/intel/',
    '/blog/guides/': '/guides/',
    '/blog/setup/': '/howto/',
    '/blog/updates/': '/updates/',
    '/go/the-isle/': '/go/',
    '/go/aion-2/': '/go/',
    '/go/aion-2/monthly/': '/go/',
    '/go/aion-2/lifetime/': '/go/',
    '/go/overwatch/': '/go/',
    '/flight/': '/aion-2-classes/',
    '/nodes/': '/esp/',
    '/world/': '/esp/',
    '/compat/': '/ac/',
    '/classes/': '/aion-2-classes/',
    '/guide/': '/cheats/',
    '/release/': '/aion-2-updates/',
    '/na/': '/pc/',
    '/ow2/': '/aion-2-updates/',
    '/juno/': '/aion-2-classes/',
    '/dva/': '/aion-2-classes/',
    '/heroes/': '/aion-2-classes/',
    '/hero/': '/aion-2-classes/',
    '/skins/': '/store/',
    '/ranks/': '/aion-2-updates/',
    '/patch/': '/aion-2-updates/',
    '/cross/': '/pc/',
    '/blizzard/': '/about/',
    '/tier/': '/aion-2-builds/',
    '/reddit/': '/forum/',
    '/obj/': '/esp/',
    '/q-flight/': '/forum/',
    '/q-nodes/': '/forum/',
    '/q-compat/': '/forum/',
    '/the-isle-hacks-evrima/': '/cheats/',
    '/the-isle-player-esp/': '/esp/',
    '/the-isle-dinosaur-esp/': '/esp/',
    '/the-isle-health-esp/': '/esp/',
    '/the-isle-aimbot/': '/aim/',
    '/the-isle-hacks-pc-setup/': '/pc/',
    '/the-isle-radar-features/': '/radar/',
    '/the-isle-esp-terminology/': '/esp/',
    '/the-isle-compatibility-eac/': '/ac/',
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
        if (path.startsWith('/go/')) return false;
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
      cssCodeSplit: true,
      assetsInlineLimit: 2048,
      modulePreload: false,
      reportCompressedSize: false,
    },
  },
  build: {
    inlineStylesheets: 'never',
  },
});
