/**
 * Extract user-facing English keys for client-side i18n.
 * Keys are exact trimmed English source text.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());

const SKIP_EXACT = new Set([
  'aion-2',
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
  'AION 2',
  'AION 2 Cheats',
  'aion2cheats.org',
  'Windows PC',
  'Steam',
  'PURPLE',
  'Elyos',
  'Asmodian',
  'Balaur',
  '$35',
  '$150',
]);

const SKIP_RE = [
  /^https?:\/\//,
  /^\/[\w\-./?=#]*$/,
  /^#/,
  /^(sm:|lg:|md:|xl:|flex|grid|col-|row-|hidden|text-|bg-|px-|py-|mt-|mb-|scroll-)/,
  /^[.#]?[\w-]+(\s+[.#][\w-]+)+$/,
  /\.(ts|tsx|astro|mjs|js|css|jpg|jpeg|png|webp|svg)$/i,
  /^[\w./-]+\/[\w./-]+$/,
  /^[a-z]+[A-Z][a-zA-Z]*$/,
  /^data-/,
  /^aria-/,
  /^type:\s*'/,
];

const EXTRA_UI = [
  'Home',
  'Open guide',
  'View all features',
  'Preview overlays',
  'Search',
  'Search articles',
  'Search AION 2 Cheats',
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
  addKey(keys, 'How to get AION 2 Cheats');
}

function extractFaqPlain(keys) {
  const src = fs.readFileSync(path.join(root, 'src/data/faq.ts'), 'utf8');
  extractQuoted(src, keys);

  const linkMap = {
    store: 'AION 2 store',
    features: 'features page',
    status: 'status page',
    setup: 'setup page',
    faqPage: 'full FAQ',
    blog: 'AION 2 guides',
    forum: 'community forum',
    preview: 'preview gallery',
    reviews: 'reviews checklist',
    support: 'checkout',
    playerEsp: 'player ESP guide',
    flightGuide: 'flight markers',
    worldGuide: 'world markers',
    radarGuide: 'radar features',
    aimGuide: 'soft aim notes',
    setupGuide: 'Windows PC setup guide',
    compatGuide: 'compatibility notes',
    plansGuide: 'monthly vs lifetime',
    cheatsGuide: 'AION 2 cheats overview',
    nodesGuide: 'gathering node ESP',
  };

  // Reconstruct interpolated FAQ answers as visible plain text.
  const interp = [
    'Open the status page on aion2cheats.org before purchase or launch, especially after an AION 2 client update. The compatibility notes explain why patch days matter.',
    'Checkout provides access and setup instructions. Follow those notes plus the setup page for Windows PC and the Steam or PURPLE client before launching AION 2. The Windows PC setup guide covers a conservative first profile.',
    'Yes. Any third-party modification can conflict with published anti-bot measures and may lead to account action. You use this software at your own risk. Read the compatibility notes and status page before you launch.',
    'AION 2 on Windows 10/11 PC through the global Steam or PURPLE client. macOS, Linux, and consoles are not listed. Confirm the client in the Windows PC setup guide and setup page.',
    'AION 2 store lists Monthly access at $35 (P30D) and Lifetime access at $150 (P99Y), both in USD. monthly vs lifetime compares duration without changing the feature list.',
    'AION 2 store lists monthly and lifetime plans, available features, and the checkout path. The features page collects the same modules in more detail, the preview gallery shows overlay screenshots, and the community forum keeps guide discussions.',
    'ESP is an information overlay. features page covers player ESP, flight markers, world markers, and gathering nodes. It does not automatically aim or move your character. AION 2 cheats overview maps each overlay group.',
    'Player ESP can show nearby Daevas with box outlines, nameplates, faction, class, level, distance, flying state, and off-screen arrows when those toggles are included in the current build. See the player ESP guide and preview gallery.',
    'Flight options can mark aerial targets, altitude, wing or glide state, and sky contested zones. The flight markers explains how they pair with player ESP.',
    'World overlays can mark NPCs, elites, bosses, quests, and portals. gathering node ESP covers ore, herb, and chest labels. world markers covers PvE markers.',
    'Yes. 2D radar is listed as a local awareness overlay for nearby players, bosses, and nodes. radar features covers when to pair it with ESP.',
    'Soft aim is listed. Farming bots and skill-rotation automation are not listed, so this site does not claim them. Confirm the status page before enabling combat modules, and read the soft aim notes.',
    'No. This site does not promise permanent undetected status. Compatibility can change after a patch. Check the status page and stop if a build is marked unavailable.',
    'NC has published anti-bot measures for AION 2, including VPN blocks, reporting, and hardware-based restrictions. A named Western anti-cheat brand is not treated here as a verified public label. After a patch, re-check the status page.',
    'The current vendor listing notes Cloud DMA and an AWS option, plus HVCI, core isolation, TPM, and Secure Boot left on. Confirm those notes at checkout and on the setup page before you buy.',
    'The current listing is the global Windows PC client. Steam and PURPLE share global content when accounts are linked. Confirm the client in the Windows PC setup guide.',
    'Choose monthly if you want to evaluate AION 2 cheats for 30 days. Choose lifetime if you already know you want longer access. Feature lists are the same; only duration and price change. See AION 2 store and monthly vs lifetime. The reviews checklist lists evaluation checkpoints without invented quotes.',
    'No. AION 2 guides explains terminology and setup. The AION 2 store feature list is the source for what you are buying. Use features page if you want the same modules without checkout copy.',
    'Guides link to the AION 2 store, setup page, and status page pages. Checkout runs through the listed partner—do not download files from random messages. Ask on the checkout if an instruction is unclear.',
    'Open a request on the checkout with your order email, Windows version, Steam or PURPLE, and the exact error text from the loader or AION 2 client.',
    'Those modules are not on the current product listing, so AION 2 Cheats does not advertise them. Compare the features page and AION 2 store lists instead of third-party screenshots.',
    'This site includes landing FAQs and per-page sections. See the full FAQ for plans, ESP, setup, and safety answers—or read AION 2 guides for longer guides.',
    'No. Use AION 2 store for current plans and the listed feature set. Guides explain terminology and workflow. features page is the public module summary.',
    'Check the article date and the status page. AION 2 updates can change what a build can do. The compatibility notes cover that patch-day habit.',
    'Player ESP, soft aim, flight markers, gathering nodes, world markers, radar, and configuration options. See the features page for the full listed set, or the preview gallery for screenshots.',
    'Articles explain workflows and link to AION 2 store. Feature lists on the store page are authoritative for checkout. features page and the full FAQ stay in sync with that list.',
    'Continue through checkout with your order email and the article slug. Include your Windows version and Steam or PURPLE.',
    'features page and AION 2 store list player ESP, flight markers, nodes, world markers, and radar from the current product listing.',
    'No. Use the status page page for current compatibility notes after an AION 2 update.',
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
  extractQuoted(src, keys);
}

function extractExtra(keys) {
  for (const item of EXTRA_UI) addKey(keys, item);
}

const keys = new Set();
extractEnTs(keys);
extractProducts(keys);
extractFaqPlain(keys);
extractScreenshots(keys);
extractForum(keys);
extractBlog(keys);
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
  'aion2-lab-combat.jpg',
  'aion2-safehaven-combat.jpg',
  'aion2-radar-map.jpg',
  'aion2-snaplines.jpg',
  'aion2-player-esp.jpg',
  'aion2-dungeon-quest.jpg',
  'aion2-flight-view.jpg',
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
