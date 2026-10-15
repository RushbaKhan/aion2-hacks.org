# Search Console workflow (overwatchcheat.com)

Verify the domain at your DNS provider — no HTML meta tags in the repo.

## Setup (once)

1. Open [Google Search Console](https://search.google.com/search-console) and add the **domain** property for `overwatchcheat.com` if it is not already there.
2. Under **Sitemaps**, submit: `https://overwatchcheat.com/sitemap.xml`
3. Repeat in [Bing Webmaster Tools](https://www.bing.com/webmasters) if you use Bing.

## Monthly tune (15 minutes)

1. Search Console → **Performance** → **Search results**.
2. Sort by **Impressions** (last 28 days).
3. For each query that already maps to a page, open the matching path in [`src/config/pageSeo.ts`](../src/config/pageSeo.ts).
4. Adjust `title` and `description` so the primary query appears naturally in the title (keep the title under ~60 characters where possible).
5. Deploy. Wait 1–2 weeks before judging click-through changes.

Do not add undetected, bypass, or live anti-cheat claims. Compatibility copy should point at `/status/`.

## Path cheat sheet

| Common query intent | Edit path in `pageSeo.ts` |
| ------------------- | ------------------------- |
| aion 2 cheats (broad) | `/` |
| store / buy / price | `/store/` |
| player ESP, faction, nameplates | `/esp/` |
| soft aim | `/aim/` |
| flight / aerial / wings | `/flight/` |
| radar | `/radar/` |
| gathering / nodes / chests | `/nodes/` |
| world boss / dungeon / quest markers | `/world/` |
| Windows PC / Steam / PURPLE setup | `/pc/`, `/setup/` |
| monthly vs lifetime | `/plans/` |
| compatibility after a patch | `/status/`, `/compat/` |
| classes | `/classes/` |
| FAQ / refund / support | `/faq/`, `/terms/` |

Product and blog pages still use their own titles from content. Add a `PAGE_SEO` entry only when you want a fixed override for a specific pathname.
