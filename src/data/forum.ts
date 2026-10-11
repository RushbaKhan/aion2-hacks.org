import { blogPosts, getBlogPostTimestamp } from './blog';

export interface ForumComment {
  author: string;
  displayName: string;
  role?: string;
  date: string;
  initials: string;
  age: string;
  score: number;
  body: string;
  replies?: ForumComment[];
}

export interface ForumPost {
  slug: string;
  category: 'General' | 'Features' | 'Status' | 'Plans';
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  excerpt: string;
  author: string;
  age: string;
  date: string;
  commentsCount: number;
  upvotes: number;
  views: number;
  pinned: boolean;
  closed: boolean;
  tag: string;
  flair?: string;
  body: string[];
  comments: ForumComment[];
  sourceTitle?: string;
  sourcePath?: string;
}

export const forumCategories = [
  { name: 'General', tone: 'blue', icon: 'messageCircle' },
  { name: 'Features', tone: 'purple', icon: 'layers' },
  { name: 'Status', tone: 'orange', icon: 'refresh' },
  { name: 'Plans', tone: 'green', icon: 'navProducts' },
] as const;

export const FORUM_TEAM = 'Isle Hacks guide team';
export const FORUM_FLAIR = 'Guide-based Q&A';

export function getForumCommunityHandle(name: string) {
  return `i/${getForumCategoryKey(name)}`;
}

function viewsFor(slug: string, base: number) {
  let hash = 0;
  for (const char of slug) hash = (hash * 33 + char.charCodeAt(0)) >>> 0;
  return base + (hash % 1600);
}

function reply(input: { author: string; displayName: string; role?: string; date: string; body: string }): ForumComment {
  return {
    ...input,
    initials: (() => {
      const caps = input.displayName.replace(/[^A-Z]/g, '');
      if (caps.length >= 2) return caps.slice(0, 2);
      return input.displayName.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase() || 'IH';
    })(),
    age: input.date,
    score: 1,
  };
}

function guideDiscussion(input: {
  slug: string;
  title: string;
  excerpt: string;
  category: ForumPost['category'];
  categoryTone: ForumPost['categoryTone'];
  sourceTitle: string;
  sourcePath: string;
  upvotes: number;
  views: number;
  date: string;
  tag: string;
  pinned?: boolean;
  answer: string;
  detail: string;
  comments: ForumComment[];
}): ForumPost {
  const { answer, detail, comments, views, pinned = false, ...post } = input;
  return {
    author: 'guide_team',
    age: post.date,
    commentsCount: comments.length,
    flair: post.tag,
    body: [answer, detail],
    comments,
    pinned,
    closed: true,
    views: viewsFor(post.slug, views),
    ...post,
  };
}

const additionalGuidePosts: ForumPost[] = [
  guideDiscussion({
    slug: 'what-does-player-esp-include',
    title: 'What does player ESP include in the guide?',
    upvotes: 71,
    views: 2100,
    date: 'Oct 7, 2026',
    tag: 'ESP',
    pinned: true,
    excerpt: 'Box, name, distance, and direction options covered by the player ESP guide.',
    category: 'Features',
    categoryTone: 'purple',
    sourceTitle: 'The Isle player ESP guide',
    sourcePath: '/the-isle-player-esp/',
    answer:
      'The guide walks through box, name, distance, direction, snapline, and visible-check options. Exact toggles depend on the current build.',
    detail: 'It favors a short max-distance filter so the overlay stays readable on busy Evrima servers.',
    comments: [
      reply({
        author: 'range_filter',
        displayName: 'RangeFilter',
        role: 'Overlay note',
        date: 'Oct 7, 2026',
        body: 'Start with box and distance. Add names only if you can still track scent and stamina UI.',
      }),
      reply({
        author: 'busy_server',
        displayName: 'ServerRead',
        date: 'Oct 7, 2026',
        body: 'On populated servers a short max-distance cap is easier to read than every player marker at once.',
      }),
      reply({
        author: 'visible_check',
        displayName: 'LineCheck',
        date: 'Oct 8, 2026',
        body: 'Visible-check is optional. Leave it off until box and distance already make sense.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'how-to-read-dinosaur-esp',
    title: 'How should I read dinosaur ESP on the first hunt?',
    upvotes: 54,
    views: 1700,
    date: 'Oct 6, 2026',
    tag: 'ESP',
    excerpt: 'Species and growth matter more than enabling every creature marker at once.',
    category: 'Features',
    categoryTone: 'purple',
    sourceTitle: 'The Isle dinosaur ESP guide',
    sourcePath: '/the-isle-dinosaur-esp/',
    answer:
      'Read species labels and growth first so you can tell a threat from a food source. Corpse and NPC markers can stay off until you need them.',
    detail: 'Pair dinosaur ESP with a short radar range if you only need to know that something is close.',
    comments: [
      reply({
        author: 'growth_first',
        displayName: 'GrowthFirst',
        role: 'Hunt note',
        date: 'Oct 6, 2026',
        body: 'If the screen feels crowded, reduce range before changing colors.',
      }),
      reply({
        author: 'corpse_off',
        displayName: 'CorpseOff',
        date: 'Oct 6, 2026',
        body: 'Corpse and NPC markers are useful after a fight, not as a default first-run overlay.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'is-aim-assistance-required',
    title: 'Do I need aim assistance to use Isle Hacks?',
    upvotes: 41,
    views: 1500,
    date: 'Oct 5, 2026',
    tag: 'AIM',
    excerpt: 'Aim assistance is listed as optional. ESP and radar can run with it left off.',
    category: 'Features',
    categoryTone: 'purple',
    sourceTitle: 'The Isle aimbot guide',
    sourcePath: '/the-isle-aimbot/',
    answer: 'No. Aim assistance is a separate combat toggle. Silent aim and triggerbot are not listed.',
    detail: 'Open the status page after an Evrima update before enabling combat modules.',
    comments: [
      reply({
        author: 'esp_first',
        displayName: 'EspFirst',
        role: 'Setup note',
        date: 'Oct 5, 2026',
        body: 'Build a readable ESP profile first, then decide whether you want aim assistance.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'windows-pc-setup-order',
    title: 'What is the first-run setup order on Windows PC?',
    upvotes: 38,
    views: 1900,
    date: 'Oct 5, 2026',
    tag: 'SETUP',
    pinned: true,
    excerpt: 'Status first, then the Evrima branch, a conservative ESP profile, and a saved config.',
    category: 'General',
    categoryTone: 'blue',
    sourceTitle: 'The Isle hacks PC setup',
    sourcePath: '/the-isle-hacks-pc-setup/',
    answer:
      'Confirm status and the Evrima branch, follow vendor setup notes, then enable player ESP, dinosaur ESP, and radar.',
    detail: 'The vendor lists Cloud DMA as required for full functionality. Confirm that at checkout if you need the complete set.',
    comments: [
      reply({
        author: 'panic_key',
        displayName: 'PanicKey',
        role: 'Setup note',
        date: 'Oct 5, 2026',
        body: 'Set a panic key before you join a populated server.',
      }),
      reply({
        author: 'branch_check',
        displayName: 'BranchCheck',
        date: 'Oct 5, 2026',
        body: 'If Steam is on Legacy, Evrima setup notes will not apply. Confirm the branch before checkout.',
      }),
      reply({
        author: 'save_config',
        displayName: 'SaveConfig',
        date: 'Oct 6, 2026',
        body: 'Save the first profile after the overlay is readable. Do not leave every toggle on.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'when-to-enable-health-esp',
    title: 'When should I turn health ESP on?',
    upvotes: 33,
    views: 1400,
    date: 'Oct 4, 2026',
    tag: 'ESP',
    excerpt: 'Health, stamina, and growth are useful before a fight—not as a default overlay.',
    category: 'Features',
    categoryTone: 'purple',
    sourceTitle: 'The Isle health ESP guide',
    sourcePath: '/the-isle-health-esp/',
    answer:
      'Keep boxes and distance on first. Add health ESP when you already know what you are looking at and need fight-critical numbers.',
    detail: 'If the overlay feels noisy, leave stamina and growth off until you need them.',
    comments: [
      reply({
        author: 'fight_read',
        displayName: 'FightRead',
        date: 'Oct 4, 2026',
        body: 'Pair a short radar range with health ESP so you are not reading numbers on every distant contact.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'radar-or-esp-first',
    title: 'Should I start with radar or ESP boxes?',
    upvotes: 27,
    views: 1300,
    date: 'Oct 4, 2026',
    tag: 'RADAR',
    excerpt: 'Radar is a local cue. ESP identifies the contact. Most first-run profiles use both at short range.',
    category: 'Features',
    categoryTone: 'purple',
    sourceTitle: 'The Isle radar features',
    sourcePath: '/the-isle-radar-features/',
    answer: 'Use radar to notice something nearby, then player or dinosaur ESP to identify it. Keep both ranges similar.',
    detail: 'On busier Evrima servers a short radar plus a max-distance ESP filter is easier to read than every toggle at once.',
    comments: [
      reply({
        author: 'match_range',
        displayName: 'MatchRange',
        date: 'Oct 4, 2026',
        body: 'Match the two ranges so the overlays agree before you add aim assistance.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'what-do-esp-terms-mean',
    title: 'What do the ESP terms mean in the glossary?',
    upvotes: 36,
    views: 1600,
    date: 'Oct 6, 2026',
    tag: 'ESP',
    excerpt: 'Box, name, distance, snapline, and visible-check each answer a different question on Evrima.',
    category: 'Features',
    categoryTone: 'purple',
    sourceTitle: 'The Isle ESP terminology',
    sourcePath: '/the-isle-esp-terminology/',
    answer:
      'The glossary separates player ESP, dinosaur ESP, health ESP, and radar so you can enable one overlay at a time.',
    detail: 'Read the terms first if the [features page](/features/) labels are new, then confirm them on the [store](/store/).',
    comments: [
      reply({
        author: 'term_first',
        displayName: 'TermFirst',
        date: 'Oct 6, 2026',
        body: 'If two overlays feel redundant, keep the shorter range and turn the rest off.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'can-i-preview-overlays',
    title: 'Can I preview overlays before checkout?',
    upvotes: 31,
    views: 1450,
    date: 'Oct 5, 2026',
    tag: 'PREVIEW',
    excerpt: 'The preview gallery shows ESP, radar, and health layers from the current listing.',
    category: 'Features',
    categoryTone: 'purple',
    sourceTitle: 'Isle Hacks overlay preview',
    sourcePath: '/preview/',
    answer: 'Yes. Open the [preview](/preview/) page for screenshot layers, then compare modules on [features](/features/).',
    detail: 'Screenshots are visual context—not a live compatibility guarantee. Check [status](/status/) after an Evrima patch.',
    comments: [
      reply({
        author: 'shot_check',
        displayName: 'ShotCheck',
        date: 'Oct 5, 2026',
        body: 'Use preview to decide which overlays you actually want, then keep the first profile conservative.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'is-cloud-dma-required',
    title: 'Is Cloud DMA required for the listed features?',
    upvotes: 44,
    views: 1800,
    date: 'Oct 7, 2026',
    tag: 'SETUP',
    excerpt: 'The vendor lists Cloud DMA for full functionality. Confirm that before you buy.',
    category: 'General',
    categoryTone: 'blue',
    sourceTitle: 'The Isle hacks PC setup',
    sourcePath: '/the-isle-hacks-pc-setup/',
    answer:
      'The listing notes Cloud DMA as required for the full feature set. Local requirements still include Windows 10/11 and the Evrima branch.',
    detail: 'Read the [setup page](/setup/) and use [checkout](/go/) if a requirement is unclear before you buy.',
    comments: [
      reply({
        author: 'req_note',
        displayName: 'ReqNote',
        role: 'Setup note',
        date: 'Oct 7, 2026',
        body: 'Cloud processing does not remove Windows, motherboard, or branch checks.',
      }),
      reply({
        author: 'status_first',
        displayName: 'StatusFirst',
        date: 'Oct 7, 2026',
        body: 'Confirm [status](/status/) after a patch even if Cloud DMA was already set up.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'what-to-review-before-buying',
    title: 'What should I review before buying Isle Hacks?',
    upvotes: 39,
    views: 1750,
    date: 'Oct 4, 2026',
    tag: 'PLANS',
    excerpt: 'Features, plans, status, and setup—in that order—before you open checkout.',
    category: 'Plans',
    categoryTone: 'green',
    sourceTitle: 'Buyer checklist',
    sourcePath: '/reviews/',
    answer:
      'Compare modules on the [features page](/features/), duration on the [store](/store/), then [status](/status/) and [setup](/setup/).',
    detail: 'The [reviews checklist](/reviews/) is evaluation points, not invented testimonials.',
    comments: [
      reply({
        author: 'list_first',
        displayName: 'ListFirst',
        date: 'Oct 4, 2026',
        body: 'If a screenshot shows a module that is not on the store list, ignore the screenshot.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'how-to-get-setup-help',
    title: 'How do I get setup help after checkout?',
    upvotes: 24,
    views: 1200,
    date: 'Oct 3, 2026',
    tag: 'SUPPORT',
    excerpt: 'Include order email, Windows version, Evrima branch, and the exact error text.',
    category: 'General',
    categoryTone: 'blue',
    sourceTitle: 'Isle Hacks checkout',
    sourcePath: '/go/',
    answer: 'Open [checkout](/go/) after you check the [FAQ](/faq/) and [setup](/setup/) notes.',
    detail: 'Vendor instructions from checkout still apply. The site pages explain the first-run order and what to send in a ticket.',
    comments: [
      reply({
        author: 'ticket_pack',
        displayName: 'TicketPack',
        date: 'Oct 3, 2026',
        body: 'A screenshot of the exact loader or Easy Anti-Cheat message saves a round of questions.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'are-resource-markers-listed',
    title: 'Are fruit, water, and corpse markers listed?',
    upvotes: 19,
    views: 980,
    date: 'Oct 2, 2026',
    tag: 'ESP',
    excerpt: 'Resource ESP is on the current listing. Treat it as an optional world overlay.',
    category: 'Features',
    categoryTone: 'purple',
    sourceTitle: 'The Isle features',
    sourcePath: '/features/',
    answer:
      'Yes. Fruit, water, gore, and corpse markers are listed beside player and dinosaur ESP. They are not required for a first-run profile.',
    detail: 'Keep a max-distance filter so world markers do not cover [player ESP](/the-isle-player-esp/).',
    comments: [
      reply({
        author: 'world_later',
        displayName: 'WorldLater',
        date: 'Oct 2, 2026',
        body: 'Turn world markers on after boxes and radar already make sense.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'should-i-set-a-panic-key',
    title: 'Should I set a panic key before joining a server?',
    upvotes: 34,
    views: 1550,
    date: 'Oct 6, 2026',
    tag: 'SETUP',
    excerpt: 'Yes. Save a conservative profile and a panic key before a populated Evrima server.',
    category: 'General',
    categoryTone: 'blue',
    sourceTitle: 'The Isle hacks PC setup',
    sourcePath: '/the-isle-hacks-pc-setup/',
    answer: 'Set a panic key and custom menu key during first-run setup, then save the config.',
    detail: 'The [setup page](/setup/) and [Windows PC guide](/the-isle-hacks-pc-setup/) both put this before live play.',
    comments: [
      reply({
        author: 'panic_key',
        displayName: 'PanicKey',
        role: 'Setup note',
        date: 'Oct 6, 2026',
        body: 'Test the key in a quiet area first so you know it actually hides the overlay.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'does-it-run-on-macos',
    title: 'Does the current listing work on macOS or Linux?',
    upvotes: 18,
    views: 900,
    date: 'Oct 2, 2026',
    tag: 'SETUP',
    excerpt: 'The listing is Windows 10/11 PC and Evrima-only. macOS and Linux are not listed.',
    category: 'General',
    categoryTone: 'blue',
    sourceTitle: 'The Isle hacks PC setup',
    sourcePath: '/the-isle-hacks-pc-setup/',
    answer: 'No. The [store](/store/) and [setup](/setup/) pages list Windows 10 and 11 only.',
    detail: 'Confirm the Steam branch is Evrima. Legacy The Isle is a separate discussion.',
    comments: [
      reply({
        author: 'win_only',
        displayName: 'WinOnly',
        date: 'Oct 2, 2026',
        body: 'If you are not on Windows PC, the listed checkout path will not match your machine.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'are-silent-aim-or-triggerbot-listed',
    title: 'Are silent aim or triggerbot listed on Isle Hacks?',
    upvotes: 28,
    views: 1350,
    date: 'Oct 5, 2026',
    tag: 'AIM',
    excerpt: 'Those modules are not on the current listing. Aim assistance is the combat option that is listed.',
    category: 'Features',
    categoryTone: 'purple',
    sourceTitle: 'The Isle aimbot guide',
    sourcePath: '/the-isle-aimbot/',
    answer:
      'Silent aim, triggerbot, and skeleton ESP are not advertised here. Compare the [features](/features/) and [store](/store/) lists instead of third-party screenshots.',
    detail: 'Aim assistance stays optional. ESP and radar can run with it left off.',
    comments: [
      reply({
        author: 'list_only',
        displayName: 'ListOnly',
        date: 'Oct 5, 2026',
        body: 'If a video shows a module that is not on the store page, treat the video as outdated.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'status-page-or-store',
    title: 'Should I trust the store page or the status page after a patch?',
    upvotes: 47,
    views: 2100,
    date: 'Oct 8, 2026',
    tag: 'STATUS',
    excerpt: 'The store lists modules and plans. Status is the live compatibility check after Evrima or Easy Anti-Cheat updates.',
    category: 'Status',
    categoryTone: 'orange',
    sourceTitle: 'The Isle Easy Anti-Cheat notes',
    sourcePath: '/the-isle-compatibility-eac/',
    answer: 'Use the [status page](/status/) after every patch. The [store](/store/) does not replace a live compatibility note.',
    detail: 'A lifetime plan does not freeze Easy Anti-Cheat. Stop if a build is marked unavailable.',
    comments: [
      reply({
        author: 'two_pages',
        displayName: 'TwoPages',
        date: 'Oct 8, 2026',
        body: 'Store for what you are buying. Status for whether you should launch today.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'forum-or-blog',
    title: 'How is the forum different from The Isle intel blog?',
    upvotes: 16,
    views: 860,
    date: 'Oct 1, 2026',
    tag: 'GENERAL',
    excerpt: 'The blog is the long-form guide. The forum is short Q&A that points back to those guides.',
    category: 'General',
    categoryTone: 'blue',
    sourceTitle: 'The Isle intel',
    sourcePath: '/blog/',
    answer:
      'Start on [The Isle intel](/blog/) for full articles. Use this board when you want a short question with a source-guide link.',
    detail: 'The [FAQ](/faq/) covers the same topics as searchable answers if you are still comparing plans.',
    comments: [
      reply({
        author: 'guide_first',
        displayName: 'GuideFirst',
        date: 'Oct 1, 2026',
        body: 'If a reply and a guide disagree, the guide and the store list win.',
      }),
    ],
  }),
];

export function getForumPost(slug: string) {
  return forumPosts.find((post) => post.slug === slug);
}

export function getForumCategoryKey(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function getForumSourceSlug(post: ForumPost) {
  return post.sourcePath?.split('/').filter(Boolean).at(-1);
}

export function getForumPostImage(post: ForumPost) {
  const slug = getForumSourceSlug(post);
  return blogPosts.find((item) => item.slug === slug)?.image ?? '/images/gameplay/isle-reeds-aim.jpg';
}

export function getForumPostTimestamp(post: ForumPost) {
  const slug = getForumSourceSlug(post);
  const article = blogPosts.find((item) => item.slug === slug);
  return article ? getBlogPostTimestamp(article.date) : getBlogPostTimestamp(post.date);
}

export function getPinnedForumPosts() {
  return forumPosts.filter((post) => post.pinned);
}

export const forumPosts: ForumPost[] = [
  ...additionalGuidePosts,
  {
    slug: 'evrima-or-legacy',
    category: 'Status',
    categoryTone: 'orange',
    title: 'Does the current listing work on Legacy The Isle?',
    excerpt: 'The store notes Evrima-only. Here is what that means before checkout.',
    author: 'guide_team',
    age: 'Oct 8, 2026',
    date: 'Oct 8, 2026',
    commentsCount: 2,
    upvotes: 29,
    views: viewsFor('evrima-or-legacy', 980),
    pinned: false,
    closed: true,
    tag: 'EVRIMA',
    flair: 'EVRIMA',
    sourceTitle: 'The Isle hacks for Evrima',
    sourcePath: '/the-isle-hacks-evrima/',
    body: [
      'The current vendor listing is Evrima-only. Do not assume the same access works on a Legacy install.',
      'Confirm the Steam branch before you buy. After a patch, re-check the status page even if you stayed on Evrima.',
    ],
    comments: [
      reply({
        author: 'branch_check',
        displayName: 'BranchCheck',
        role: 'Compatibility',
        date: 'Oct 8, 2026',
        body: 'If Steam is on the wrong branch, Evrima setup notes will not apply.',
      }),
      reply({
        author: 'status_first',
        displayName: 'StatusFirst',
        date: 'Oct 8, 2026',
        body: 'After a game update, treat the listing as unknown until the status page is current.',
      }),
    ],
  },
  {
    slug: 'eac-after-patch',
    category: 'Status',
    categoryTone: 'orange',
    title: 'What should I do after an Evrima or Easy Anti-Cheat update?',
    excerpt: 'Compatibility can shift after a patch. Check status first, then launch.',
    author: 'guide_team',
    age: 'Oct 8, 2026',
    date: 'Oct 8, 2026',
    commentsCount: 3,
    upvotes: 46,
    views: viewsFor('eac-after-patch', 2400),
    pinned: true,
    closed: true,
    tag: 'STATUS',
    flair: 'STATUS',
    sourceTitle: 'The Isle Easy Anti-Cheat notes',
    sourcePath: '/the-isle-compatibility-eac/',
    body: [
      'The Isle Evrima launches through Easy Anti-Cheat. After a patch, treat compatibility as unknown until you re-check status.',
      'This community does not treat “undetected” as a permanent label. Stop if a build is marked unavailable.',
    ],
    comments: [
      reply({
        author: 'status_first',
        displayName: 'StatusFirst',
        role: 'Status note',
        date: 'Oct 8, 2026',
        body: 'Game-client EAC install errors are different from product setup errors. Repair The Isle files first if the game itself will not launch.',
      }),
      reply({
        author: 'wait_label',
        displayName: 'WaitLabel',
        date: 'Oct 8, 2026',
        body: 'If the status page is still updating, wait. A lifetime plan does not freeze Easy Anti-Cheat.',
      }),
      reply({
        author: 'stop_flag',
        displayName: 'StopFlag',
        date: 'Oct 9, 2026',
        body: 'If a build is marked unavailable, stop and re-check later. Do not keep launching to test it.',
      }),
    ],
  },
  {
    slug: 'monthly-or-lifetime',
    category: 'Plans',
    categoryTone: 'green',
    title: 'Monthly or lifetime: which plan matches a short trial?',
    excerpt: 'Same listed features; only duration and price change.',
    author: 'guide_team',
    age: 'Oct 3, 2026',
    date: 'Oct 3, 2026',
    commentsCount: 2,
    upvotes: 22,
    views: viewsFor('monthly-or-lifetime', 1100),
    pinned: false,
    closed: true,
    tag: 'PLANS',
    flair: 'PLANS',
    sourceTitle: 'Isle Hacks monthly vs lifetime',
    sourcePath: '/the-isle-monthly-vs-lifetime/',
    body: [
      'Monthly is $35 for 30 days. Lifetime is $150. Both list the same ESP, radar, and aim assistance modules.',
      'Choose monthly if you want to evaluate the overlay first. Choose lifetime only if you already want longer access.',
    ],
    comments: [
      reply({
        author: 'plan_note',
        displayName: 'PlanNote',
        role: 'Store note',
        date: 'Oct 3, 2026',
        body: 'A lifetime plan does not freeze Easy Anti-Cheat. Re-check status after updates either way.',
      }),
      reply({
        author: 'same_list',
        displayName: 'SameList',
        date: 'Oct 3, 2026',
        body: 'Feature lists are the same on both plans. Duration and price are the only listed differences.',
      }),
    ],
  },
];
