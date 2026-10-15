/**
 * Extract user-facing English keys for client-side i18n.
 * Keys are exact trimmed English source text.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());

const SKIP_EXACT = new Set([
  'overwatch',
  'dma',
  'hwid',
  'P30D',
  'P99Y',
  'USD',
  'ESP',
  'FAQ',
  'PC',
  'AWS',
  'DMA',
  'HVCI',
  'TPM',
  'Overwatch',
  'Overwatch 2',
  'Overwatch Cheat',
  'overwatchcheat.com',
  'Windows PC',
  'Steam',
  'Battle.net',
  'Defense Matrix',
  'Blizzard',
  '$35',
  '$150',
]);

const SKIP_RE = [
  /^https?:\/\//,
  /^\/[\w\-./?=#]*$/,
  /^#/,
  /^(sm:|lg:|md:|xl:|flex|grid|col-|row-|hidden|text-|bg-|px-|py-|mt-|mb-|scroll-)/,
  /col-span-|row-start-|row-span-|lg:col-|sm:col-/,
  /^[.#]?[\w-]+(\s+[.#][\w-]+)+$/,
  /\.(ts|tsx|astro|mjs|js|css|jpg|jpeg|png|webp|svg)$/i,
  /^[\w./-]+\/[\w./-]+$/,
  /^[a-z]+[A-Z][a-zA-Z]*$/,
  /^data-/,
  /^aria-/,
  /^type:\s*'/,
  /^(og|twitter|article):/,
  /^application\//,
  /^@/,
  /querySelector|class:list|isHero|forumPost/,
];

const EXTRA_UI = [
  'Home',
  'Open guide',
  'View all features',
  'Preview overlays',
  'Search',
  'Search articles',
  'Search Overwatch Cheat',
  'Search articles, forum, FAQ…',
  'Search results',
  'Articles, discussions, FAQ, and pages',
  'No matches. Try ESP, radar, plans, or status.',
  'Read FAQ',
  'Read guides',
  'Read features',
  'Read source guide',
  'Read the full guidelines',
  'features list',
  'monthly and lifetime plans',
  'current status',
  'Windows PC setup',
  'Start with the',
  'compare',
  'then check',
  'and',
  'before checkout.',
  'Language',
  'Change language',
  'Back to home',
  'All topics',
  'Search discussions…',
  'Available features',
  'Open checkout',
  'Start checkout',
  'View all FAQ',
  'Features',
  'Store',
  'Blog',
  'Forum',
  'FAQ',
  'Support',
  'Buy now',
  'Compare plans',
  'View store',
  'Monthly',
  'Lifetime',
  'Platform',
  'Plans',
  'Guides',
  'Newest first',
  'Related products',
  'Cloud DMA and HWID Spoofer',
  'View details',
  'Main product',
  'Related product',
  'Popular Overwatch searches',
  'Cheats',
  'Checkout',
  'Select subscription',
  'Purchase option',
  'Total',
  'Best value',
  'Included modules',
  'Modules both plans include',
  'All features',
  'Open forum',
  'Open checkout',
  'Share on X',
  'Share on Facebook',
  'Overwatch 2 on Steam',
  'Popular',
  'Limited',
  'Available',
  'Related',
  'Optional targeting help.',
  'Read nearby heroes.',
  'Identify the roster.',
  'Track listed abilities.',
  'Payloads and points.',
  'Local 2D and 3D awareness.',
  'Enemies first.',
  'A separate combat toggle.',
  'Windows PC and Defense Matrix.',
  'These two cards are related add-ons with separate checkout. They are not Overwatch Cheat, they are not bundled into the $35 monthly or $150 lifetime Overwatch plans, and they do not add aimbot, ESP, or radar on their own.',
  'Related products — not the main Overwatch cheat',
  'Optional Cloud DMA and HWID Spoofer listings',
  'Not included in Overwatch Cheat',
  'Related product',
  'View store details',
  'Typical listing',
  'Setup questions',
  'Guides and updates',
  'Latest articles',
  'All articles',
  'Sort by',
  'Oldest first',
  'Shortest read',
  'Longest read',
  'View all articles',
  '5 min read',
  'Start with the features list, compare monthly and lifetime plans, then check current status and Windows PC setup before checkout.',
  'This page lists Overwatch modules from the current product listing. Compare plans on the store, look at screenshots on the preview, and read the Overwatch cheats overview if you want a starting map. Confirm status after an Overwatch client update.',
  'Check Status',
  'Check status',
  'Overwatch Features',
  'USD / month',
  'USD · one-time',
  'At a glance',
  'Monthly $50 · Lifetime $150',
  'Windows PC notes',
  'Separate checkout',
  'Open forum',
  'Complete checkout',
  'Follow Windows PC setup',
  'Overwatch characters',
  'Overwatch patch notes',
  'Overwatch ranks',
  'Juno Overwatch',
  'D.Va Overwatch',
  'Overwatch 2 skins',
  'Overwatch aimbot',
  'status page',
  'Setup notes',
  'player ESP guide',
  'Overwatch cheats overview',
  'Article topics',
  'Share Overwatch Cheat',
  'Compatibility status',
  'When did Overwatch 2 come out',
  'Is Overwatch 2 cross platform',
  'Cloud DMA related product',
  'HWID Spoofer related product',
  'Overwatch reddit vs this forum',
  'OW and Blizzard naming',
  'Blizzard Overwatch heroes',
  'Start with the store for plans, the features list for modules, and the status page after an Overwatch patch. The player ESP guide and Overwatch cheats overview are the usual first reads.',
  'General',
  'Privacy',
  'Terms',
  'checkout',
  'Upvote this discussion',
  '1 comment',
  '2 comments',
  '8 discussions',
  '8 guide discussions',
  'Forum topics',
  'From the guide:',
  'Previous screenshot',
  'Next screenshot',
  'Screenshot 1',
  'Screenshot 2',
  'Screenshot 3',
  'Screenshot 4',
  'Screenshot 5',
  'Screenshot 6',
  'Screenshot 7',
  'Guide Q&A only. Compare modules on the store and checkout path before you buy.',
  'Feature',
  '2 plans',
  'USD / month · 30 days',
  'USD · one-time · One-time',
  'Explore Overwatch Cheat',
  'Read the status page on overwatchcheat.com after any Overwatch client update.',
  'Select the $35 monthly plan or the $150 lifetime plan, then continue to checkout.',
  'Use the vendor setup notes for Battle.net or Steam. Related Cloud DMA notes live on a separate page.',
  'Enable the ESP and radar options you can actually read, then save the config.',
  'In this article',
  'Related guides',
  'Our products',
  'Reviews',
  'Article sidebar',
  'Table of contents',
  'Continue reading',
  'More articles',
  'Overwatch store',
];

function stripMarkdownLinks(text) {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

function hasMarkdownLink(text) {
  return /\[[^\]]+\]\([^)]+\)/.test(text);
}

function addKey(keys, value) {
  if (typeof value !== 'string') return;
  const trimmed = value.replace(/\\n/g, '\n').trim();
  if (trimmed.length < 2) return;
  if (SKIP_EXACT.has(trimmed) && trimmed !== 'FAQ' && trimmed !== 'ESP') {
    // Keep chrome tokens that are also nav/filter labels when listed in EXTRA_UI.
    if (!EXTRA_UI.includes(trimmed)) return;
  }
  if (SKIP_RE.some((re) => re.test(trimmed))) return;
  if (/^[a-z0-9_-]+$/.test(trimmed) && trimmed.length < 24 && !EXTRA_UI.includes(trimmed)) {
    const allowShort = new Set([
      'Home',
      'Store',
      'Blog',
      'Forum',
      'FAQ',
      'Support',
      'Search',
      'Guides',
      'Plans',
      'Setup',
      'Status',
      'About',
      'Legal',
      'Read',
      'Get',
      'Explore',
      'Monthly',
      'Lifetime',
      'Platform',
      'Preview',
      'Radar',
      'Vision',
      'Flight',
      'World',
      'Aim',
      'Updates',
      'General',
      'Safety',
      'and',
      'compare',
    ]);
    if (!allowShort.has(trimmed) && trimmed !== trimmed.toUpperCase()) return;
  }
  keys.add(trimmed);
  if (hasMarkdownLink(trimmed)) {
    const stripped = stripMarkdownLinks(trimmed).trim();
    if (stripped && stripped !== trimmed) keys.add(stripped);
  }
}

function extractQuoted(src, keys) {
  const re = /(['"])((?:\\.|(?!\1).){1,})\1/g;
  let match;
  while ((match = re.exec(src))) {
    const value = match[2]
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\n/g, '\n');
    addKey(keys, value);
  }
}

function extractEnTs(keys) {
  const src = fs.readFileSync(path.join(root, 'src/i18n/en.ts'), 'utf8');
  extractQuoted(src, keys);
}

function extractProducts(keys) {
  const src = fs.readFileSync(path.join(root, 'src/data/products.ts'), 'utf8');
  extractQuoted(src, keys);
  addKey(keys, 'How to get Overwatch Cheat');
  addKey(keys, 'How to get Cloud DMA');
  addKey(keys, 'How to get HWID Spoofer');
  addKey(keys, 'Choose Monthly');
  addKey(keys, 'Choose Lifetime');
  addKey(keys, 'Related products');
  addKey(keys, 'Cloud DMA and HWID Spoofer');
  addKey(keys, 'View details');
  addKey(keys, 'Best value');
  addKey(keys, 'Included modules');
  addKey(keys, 'Modules both plans include');
  addKey(keys, 'All features');
  addKey(keys, 'Open forum');
  addKey(keys, 'Same listed ESP, radar, and aimbot set');
  addKey(keys, 'Optional silent aim and triggerbot');
  addKey(keys, 'Windows PC via Battle.net or Steam');
  addKey(keys, 'Try listed ESP, radar, and aimbot for 30 days.');
  addKey(keys, 'Same listed modules, billed once in USD.');
}

function extractFaqPlain(keys) {
  const src = fs.readFileSync(path.join(root, 'src/data/faq.ts'), 'utf8');
  extractQuoted(src, keys);

  const linkMap = {
    store: 'Overwatch store',
    features: 'features page',
    status: 'status page',
    setup: 'setup page',
    faqPage: 'full FAQ',
    blog: 'Overwatch guides',
    forum: 'community forum',
    preview: 'preview gallery',
    reviews: 'reviews checklist',
    support: 'checkout',
    playerEsp: 'player ESP guide',
    heroGuide: 'hero ESP',
    objGuide: 'objective ESP',
    radarGuide: 'radar features',
    aimGuide: 'aimbot notes',
    setupGuide: 'Windows PC setup guide',
    compatGuide: 'compatibility notes',
    plansGuide: 'monthly vs lifetime',
    cheatsGuide: 'Overwatch cheats overview',
    dmaPage: 'Cloud DMA',
    hwidPage: 'HWID Spoofer',
  };

  const interp = [
    'Open the status page on overwatchcheat.com before purchase or launch, especially after an Overwatch client update. The compatibility notes explain why patch days matter.',
    'Checkout provides access and setup instructions. Follow those notes plus the setup page for Windows PC before launching Overwatch. The Windows PC setup guide covers a conservative first profile.',
    'Yes. Any third-party modification can conflict with Blizzard Defense Matrix and may lead to account action. You use this software at your own risk. Read the compatibility notes and status page before you launch.',
    'Overwatch on Windows 10/11 PC. macOS, Linux, and consoles are not listed. Confirm the client in the Windows PC setup guide and setup page.',
    'Overwatch store lists Monthly access at $35 (P30D) and Lifetime access at $150 (P99Y), both in USD. monthly vs lifetime compares duration without changing the feature list.',
    'Overwatch store lists monthly and lifetime plans, available features, and the checkout path. The features page collects the same modules in more detail, the preview gallery shows overlay screenshots, and the community forum keeps guide discussions.',
    'ESP is an information overlay. features page covers player ESP, box ESP, skeleton ESP, hero ESP, and objective ESP. It does not automatically aim or move your character. Overwatch cheats overview maps each overlay group.',
    'Player ESP can show nearby heroes with box outlines, skeleton, health, name, distance, and enemy-only filters when those toggles are included in the current build. See the player ESP guide and preview gallery.',
    'Hero ESP can label the hero someone locked so you can read tanks, damage, and supports. The hero ESP explains how it pairs with player ESP.',
    'Objective ESP can mark payloads, capture points, and push bots. objective ESP covers those markers. Ability ESP is listed separately.',
    'Yes. 2D radar and 3D radar are listed as local awareness overlays for nearby players. radar features covers when to pair them with ESP.',
    'Aimbot, aim assist, silent aim, and triggerbot are listed. Farming bots and movement macros are not listed, so this site does not claim them. Confirm the status page before enabling combat modules, and read the aimbot notes.',
    'No. This site does not promise permanent undetected status. Compatibility can change after a patch. Check the status page and stop if a build is marked unavailable.',
    'Overwatch uses Blizzard Defense Matrix. This site treats that label as published context, not a verified bypass. After a patch, re-check the status page.',
    'Cloud DMA is a related product with its own page and checkout. It is not bundled into Overwatch Cheat. Confirm those notes on Cloud DMA and the setup page before you buy.',
    'No. HWID Spoofer is a related listing with a separate checkout. It does not change the $35 or $150 Overwatch Cheat plans.',
    'The current listing is the Windows PC client. Confirm the client you launch in the Windows PC setup guide. Console clients are not listed.',
    'Choose monthly if you want to evaluate Overwatch cheats for 30 days. Choose lifetime if you already know you want longer access. Feature lists are the same; only duration and price change. See Overwatch store and monthly vs lifetime. The reviews checklist lists evaluation checkpoints without invented quotes.',
    'No. Overwatch guides explains terminology and setup. The Overwatch store feature list is the source for what you are buying. Use features page if you want the same modules without checkout copy.',
    'Guides link to the Overwatch store, setup page, and status page pages. Checkout runs through the listed partner—do not download files from random messages. Ask on the checkout if an instruction is unclear.',
    'Open a request on the checkout with your order email, Windows version, Battle.net or Steam, and the exact error text from the loader or Overwatch client.',
    'Those modules are not on the current product listing, so Overwatch Cheat does not advertise them. Compare the features page and Overwatch store lists instead of third-party screenshots.',
    'This site includes landing FAQs and per-page sections. See the full FAQ for plans, ESP, setup, and safety answers—or read Overwatch guides for longer guides.',
    'No. Use Overwatch store for current plans and the listed feature set. Guides explain terminology and workflow. features page is the public module summary.',
    'Check the article date and the status page. Overwatch updates can change what a build can do. The compatibility notes cover that patch-day habit.',
    'Aimbot, aim assist, silent aim, triggerbot, player ESP, hero ESP, objective ESP, radar, and team check. See the features page for the full listed set, or the preview gallery for screenshots.',
    'Articles explain workflows and link to Overwatch store. Feature lists on the store page are authoritative for checkout. features page and the full FAQ stay in sync with that list.',
    'Continue through checkout with your order email and the article slug. Include your Windows version and Battle.net or Steam.',
    'features page and Overwatch store list player ESP, hero ESP, objective ESP, and radar from the current product listing.',
    'No. Use the status page page for current compatibility notes after an Overwatch update.',
  ];
  for (const line of interp) addKey(keys, line);
  for (const label of Object.values(linkMap)) addKey(keys, label);
}

function extractScreenshots(keys) {
  const src = fs.readFileSync(path.join(root, 'src/data/screenshots.ts'), 'utf8');
  extractQuoted(src, keys);
}

function extractForum(keys) {
  const src = fs.readFileSync(path.join(root, 'src/data/forum.ts'), 'utf8');
  extractQuoted(src, keys);
}

function extractBlog(keys) {
  const src = fs.readFileSync(path.join(root, 'src/data/blog/posts.ts'), 'utf8');
  const tmp = new Set();
  extractQuoted(src, tmp);
  for (const key of tmp) {
    // Keep titles, headings, CTAs, and short labels. Skip 950-word body paragraphs
    // so locale JSON stays small enough for performance.
    if (key.length <= 180) addKey(keys, key);
  }
}

function extractExtra(keys) {
  for (const item of EXTRA_UI) addKey(keys, item);
}

function walkAstro(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'starwind' || entry.name === 'node_modules') continue;
      walkAstro(full, out);
    } else if (entry.name.endsWith('.astro')) {
      out.push(full);
    }
  }
  return out;
}

function extractAstro(keys) {
  for (const file of walkAstro(path.join(root, 'src'))) {
    const src = fs.readFileSync(file, 'utf8');
    extractQuoted(src, keys);
    const textRe = />([^<>{}$][^<>{}]{1,220})</g;
    let match;
    while ((match = textRe.exec(src))) {
      addKey(keys, match[1].replace(/\s+/g, ' ').trim());
    }
  }
}

const keys = new Set();
extractEnTs(keys);
extractProducts(keys);
extractFaqPlain(keys);
extractScreenshots(keys);
extractForum(keys);
extractBlog(keys);
extractAstro(keys);
extractExtra(keys);

// Drop leftover code-ish tokens that slipped through quoted-string extraction.
const DROP = new Set([
  'after-buy',
  'aim-assist',
  'alt_first',
  'ban-risk',
  'blog-default-1',
  'blog-default-2',
  'blog-default-3',
  'blog-feature-list',
  'blog-guide-start',
  'blog-guide-status',
  'blog-sec-compat',
  'blog-setup',
  'blog-setup-loader',
  'blog-setup-lobby',
  'blog-slug-aim',
  'blog-slug-esp',
  'blog-slug-status',
  'blog-vs-product',
  'busy_server',
  'cta',
  'esp_first',
  'faq-more',
  'filter_ore',
  'guide_team',
  'h2',
  'invented-features',
  'ow2.jpg',
  'ow-7.jpg',
  'ow-3.jpg',
  'ow1.jpg',
  'ow-1.jpg',
  'ow-8.jpg',
  'ow-4.jpg',
  'ow-9.jpg',
  'ow-6.jpg',
  'ow-5.jpg',
  'ow-2.jpg',
  'cloud-dma.jpg',
  'spoofer.jpg',
  'monthly-vs-lifetime',
  'panic_key',
  'plan_note',
  'player-esp',
  'products-page',
  'q-aim',
  'q-compat',
  'q-esp',
  'q-flight',
  'q-nodes',
  'q-pc',
  'q-plans',
  'q-radar',
  'radar_short',
  'range_filter',
  'same_list',
  'src',
  'status_first',
  'steam-purple',
  'support-help',
  'ul',
  'wait_label',
  'what-is-esp',
  'world-esp',
  'flight-esp',
  'alt',
  'caption',
  'category',
  'images',
  'key',
  'overview',
  'limitations',
  'platforms',
  'popular',
  'purple',
  'blue',
  'green',
  'orange',
  'clock',
  'headphones',
  'layers',
  'refresh',
  'table',
  'tier',
  'users',
  'utility',
  'all',
  'aim',
  'aion',
  'blog',
  'cheats',
  'classes',
  'compat',
  'dma',
  'esp',
  'flight',
  'forum',
  'guide',
  'na',
  'nodes',
  'pc',
  'plans',
  'radar',
  'release',
  'setup',
  'status',
  'store',
  'undetected',
  'world',
  'anticheat',
  'essential',
  'limited',
  'safety',
  '../components/icons/types',
  '../config/checkout',
  '../config/site',
  '../i18n',
  '../utils/path',
  './blog',
  './screenshots',
  './types',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  'AIM',
  'FLIGHT',
  'NODES',
  'PLANS',
  'RADAR',
  'SETUP',
  'STATUS',
  ') ??',
  ').slice(0, 2).toUpperCase() ||',
  '${normalizeInternalPath(href)}',
  'AltFirst',
  'EspFirst',
  'FilterOre',
  'PanicKey',
  'PlanNote',
  'RadarShort',
  'RangeFilter',
  'SameList',
  'ServerRead',
  'StatusFirst',
  'WaitLabel',
  'faqBlogDefault1',
  'faqBlogDefault2',
  'faqBlogDefault3',
  'faqBlogGuideStart',
  'faqBlogGuideStatus',
  'faqBlogSetupLoader',
  'faqBlogSetupLobby',
  'faqBlogGuideTier',
  'faqBlogSecVac',
  'faqBlogSlugEsp',
  'faqBlogSlugScripts',
  'faqBlogSlugHwid',
  'faqAfterBuy',
  'faqAutoFarm',
  'faqBanRisk',
  'faqBlogVsCheats',
  'faqComparePlans',
  'faqDiscordHelp',
  'faqEspVsScripts',
  'faqExternalLoader',
  'faqMore',
  'faqPlatforms',
  'faqProductsPage',
  'faqRankTiers',
  'faqStatus',
  'faqStreamProof',
  'faqUndetected',
  'faqVacUpdate',
  'faqWhatIsEsp',
  'faqWhichTierEsp',
  'faqWhichTierScripts',
  'faqZoomHack',
  'faqBlogSetup',
]);

for (const k of [...keys]) {
  if (DROP.has(k)) keys.delete(k);
}

const list = [...keys].sort((a, b) => a.localeCompare(b));
fs.mkdirSync(path.join(root, 'public/locales'), { recursive: true });
fs.writeFileSync(path.join(root, 'public/locales/_en-keys.json'), JSON.stringify(list, null, 2));
console.log(`Extracted ${list.length} keys`);
