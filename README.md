# AION 2 Cheats

Marketing site for [aion2cheats.org](https://aion2cheats.org) — listed AION 2 overlay tools for the global Windows PC client.

AION 2 is NC’s free-to-play, sky-battlefield MMORPG on Unreal Engine 5. The global service launched on 5 October 2026 for Windows PC via [Steam](https://store.steampowered.com/app/3393110/AION_2/) and NC’s PURPLE launcher. Steam and PURPLE share the same servers (NA, SA, EU, Japan). This site documents the current vendor listing for that PC client only.

## What the listing covers

Features are taken from the live product page. The site does not invent modules, anti-cheat status, or “undetected” claims.

- Player ESP — nameplates, class, level, faction (Elyos / Asmodian / Balaur), distance, flying or grounded state
- Soft aim — optional assist with FOV, smoothness, bone selection, and faction / party filters
- Flight and aerial markers — altitude, glide / wing state, sky contested zones
- World and PvE markers — NPC, elite, world boss, dungeon, quest, and portal overlays
- Gathering node ESP — ore, herb, material, and chest filters
- 2D radar — faction color coding
- Overlay and config — stream-proof overlay, combat mode, colors, panic key, saveable configs

Farming bots and quest automation are **not** listed.

## Plans

| Plan | Price | Term |
| --- | --- | --- |
| Monthly | $35 USD | 30 days (P30D) |
| Lifetime | $150 USD | P99Y |

Both plans use the same listed feature set. Checkout goes through `/go/` (vendor redirect). Re-check the [status](https://aion2cheats.org/status/) page after every AION 2 client update.

## Game context (for editors)

Use this when writing or translating copy. Do not present it as a product guarantee.

- Platform: Windows 10 / 11, 64-bit (official). Steam and PURPLE share servers and content.
- Combat: Daevas, flight, faction war across Atreia.
- Site languages: English, German, French, Spanish, Portuguese, Russian, Japanese, Korean, Simplified Chinese, Traditional Chinese, Hebrew, Turkish, Arabic, Vietnamese, Polish.
- Official game UI languages include EN, DE, FR, ES, PT-BR, RU, JA, KO (and Chinese on some global listings).
- Compatibility is patch-dependent. NC runs anti-bot measures; this site does not name a Western anti-cheat or promise bypass.

Support: [support@aion2cheats.org](mailto:support@aion2cheats.org)

## Stack

Astro 7, Tailwind CSS 4, Starwind UI. Static output with Cloudflare Pages / Wrangler worker for SEO edge redirects.

## Local

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

```bash
npm run build
npm start
```

`npm run build` rebuilds locale dictionaries, generates responsive WebP screenshots, prunes unused images, finalizes the sitemap, and runs IndexNow when configured.

## Useful paths

| Path | Purpose |
| --- | --- |
| `/` | Home — features, guides, updates |
| `/store/` | Product, screenshots, monthly vs lifetime |
| `/features/` | Module list |
| `/status/` | Compatibility notes after patches |
| `/setup/` / `/pc/` | Windows PC setup |
| `/esp/` `/aim/` `/flight/` `/radar/` `/nodes/` `/world/` | Feature guides |
| `/blog/` `/forum/` `/faq/` | Guides, Q&A, FAQ |
| `/go/` | Checkout redirect (not indexed) |

Copy and SEO titles live in `src/i18n/en.ts`, `src/config/pageSeo.ts`, and `public/locales/`. Screenshots are ranked in `src/data/screenshots.ts`. Checkout targets are in `src/config/checkout-redirects.mjs`.

## Deploy

- **Cloudflare Pages / Wrangler:** `wrangler.jsonc` serves `dist/` through `workers/seo-edge.js`.
- **Nixpacks / Node host:** `nixpacks.toml` runs `npm ci`, `npm run build`, then `npm start`.
- After go-live, submit `https://aion2cheats.org/sitemap.xml` in Search Console. See [docs/search-console.md](docs/search-console.md).

## License

Site source is for the aion2cheats.org project. AION 2, Atreia, Elyos, Asmodian, Balaur, Steam, and PURPLE are trademarks of their owners. This repository is not affiliated with NC.
