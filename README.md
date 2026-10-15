# Overwatch Cheat

Marketing site for [overwatchcheat.com](https://overwatchcheat.com) — listed Overwatch overlay tools for Windows PC.

Overwatch (including Overwatch 2) is Blizzard’s team-based hero shooter. This site documents the current vendor listing for the Windows PC client only. It is not affiliated with or endorsed by Blizzard Entertainment.

## What the listing covers

Features are taken from the live product page. The site does not invent modules, anti-cheat status, or “undetected” claims.

- Aimbot, aim assist, silent aim, and triggerbot
- Player ESP — box, skeleton, health, name, and distance
- Hero ESP, ability ESP, team check, and enemy-only ESP
- Objective ESP
- 2D radar and 3D radar

Related listings: Cloud DMA and HWID Spoofer (separate checkout).

## Plans

| Plan | Price | Term |
| --- | --- | --- |
| Monthly | $35 USD | 30 days (P30D) |
| Lifetime | $150 USD | P99Y |

Both plans use the same listed feature set. Checkout goes through `/go/` (vendor redirect). Re-check the [status](https://overwatchcheat.com/status/) page after every Overwatch client update.

## Stack

Astro 7, Tailwind CSS 4, Starwind UI. Static output with Cloudflare Pages / Wrangler worker for SEO edge redirects.

## Local

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).
