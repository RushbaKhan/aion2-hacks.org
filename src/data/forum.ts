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

export const FORUM_TEAM = 'AION 2 Cheats guide team';
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
      return input.displayName.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase() || 'A2';
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
  return blogPosts.find((item) => item.slug === slug)?.image ?? '/images/gameplay/aion2-lab-combat.jpg';
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
  guideDiscussion({
    slug: 'q-esp',
    title: 'What does player ESP include?',
    upvotes: 71,
    views: 2100,
    date: 'Oct 11, 2026',
    tag: 'ESP',
    pinned: true,
    excerpt: 'Faction, class, level, and distance options covered by the player ESP guide.',
    category: 'Features',
    categoryTone: 'purple',
    sourceTitle: 'AION 2 player ESP guide',
    sourcePath: '/esp/',
    answer:
      'The guide walks through box styles, skeleton, nameplate, faction, class, level, distance, and flying-state options. Exact toggles depend on the current build.',
    detail: 'It favors a short max-distance filter so the overlay stays readable on busy AION 2 servers.',
    comments: [
      reply({
        author: 'range_filter',
        displayName: 'RangeFilter',
        role: 'Overlay note',
        date: 'Oct 11, 2026',
        body: 'Start with box, faction, and distance. Add class labels only if you can still track the default HUD.',
      }),
      reply({
        author: 'busy_server',
        displayName: 'ServerRead',
        date: 'Oct 11, 2026',
        body: 'On populated Abyss maps a short max-distance cap is easier to read than every player marker at once.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'q-aim',
    title: 'Do I need soft aim to use AION 2 Cheats?',
    upvotes: 41,
    views: 1500,
    date: 'Oct 10, 2026',
    tag: 'AIM',
    excerpt: 'Soft aim is listed as optional. ESP and radar can run with it left off.',
    category: 'Features',
    categoryTone: 'purple',
    sourceTitle: 'AION 2 soft aim guide',
    sourcePath: '/aim/',
    answer: 'No. Soft aim is a separate combat toggle. Farming bots and skill-rotation automation are not listed.',
    detail: 'Open the status page after an AION 2 update before enabling combat modules.',
    comments: [
      reply({
        author: 'esp_first',
        displayName: 'EspFirst',
        role: 'Setup note',
        date: 'Oct 10, 2026',
        body: 'Build a readable ESP profile first, then decide whether you want soft aim.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'q-flight',
    title: 'How should I read flight markers?',
    upvotes: 54,
    views: 1700,
    date: 'Oct 9, 2026',
    tag: 'FLIGHT',
    excerpt: 'Altitude and wing state matter more than enabling every aerial marker at once.',
    category: 'Features',
    categoryTone: 'purple',
    sourceTitle: 'AION 2 flight markers',
    sourcePath: '/flight/',
    answer:
      'Read aerial target ESP and altitude first so you can tell a grounded player from one already in the air. Sky contested highlights can stay off until you need them.',
    detail: 'Pair flight markers with a short radar range if you only need to know that something is close.',
    comments: [
      reply({
        author: 'alt_first',
        displayName: 'AltFirst',
        role: 'Flight note',
        date: 'Oct 9, 2026',
        body: 'If the screen feels crowded, reduce range before changing colors.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'q-radar',
    title: 'Should I enable radar or ESP first?',
    upvotes: 33,
    views: 1400,
    date: 'Oct 8, 2026',
    tag: 'RADAR',
    excerpt: 'ESP answers identity. Radar answers nearby position.',
    category: 'Features',
    categoryTone: 'purple',
    sourceTitle: 'AION 2 radar features',
    sourcePath: '/radar/',
    answer: 'Enable a conservative player ESP profile first, then add 2D radar if you still want a compact local map.',
    detail: 'Keep radar range short on crowded maps. It is not listed as a separate 3D product.',
    comments: [
      reply({
        author: 'radar_short',
        displayName: 'RadarShort',
        date: 'Oct 8, 2026',
        body: 'Faction color coding is enough for most rotations. Leave node pips off until you need them.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'q-nodes',
    title: 'Is gathering node ESP a farming bot?',
    upvotes: 29,
    views: 1300,
    date: 'Oct 7, 2026',
    tag: 'NODES',
    excerpt: 'Node ESP labels ore, herbs, and chests. It is not listed as unattended automation.',
    category: 'Features',
    categoryTone: 'purple',
    sourceTitle: 'AION 2 gathering node ESP',
    sourcePath: '/nodes/',
    answer: 'No. The listing describes gathering node ESP and material filters, not a quest or farming bot.',
    detail: 'NC has published anti-bot measures around automated gathering. Treat node labels as information only.',
    comments: [
      reply({
        author: 'filter_ore',
        displayName: 'FilterOre',
        date: 'Oct 7, 2026',
        body: 'Turn on one material filter at a time. A full node list is harder to read than a short range.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'q-pc',
    title: 'What is the first-run setup order on Windows PC?',
    upvotes: 38,
    views: 1900,
    date: 'Oct 5, 2026',
    tag: 'SETUP',
    pinned: true,
    excerpt: 'Status first, then Steam or PURPLE, a conservative ESP profile, and a saved config.',
    category: 'General',
    categoryTone: 'blue',
    sourceTitle: 'AION 2 cheats PC setup',
    sourcePath: '/pc/',
    answer:
      'Confirm status and the global Windows client, follow vendor setup notes, then enable player ESP, flight markers, and radar.',
    detail: 'The vendor lists Cloud DMA and an AWS option. Confirm those notes at checkout if you need the complete set.',
    comments: [
      reply({
        author: 'panic_key',
        displayName: 'PanicKey',
        role: 'Setup note',
        date: 'Oct 5, 2026',
        body: 'Set a panic key before you join a populated server.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'q-compat',
    title: 'What should I do after an AION 2 patch?',
    upvotes: 46,
    views: 2400,
    date: 'Oct 4, 2026',
    tag: 'STATUS',
    pinned: true,
    excerpt: 'Compatibility can shift after a patch. Check status first, then launch.',
    category: 'Status',
    categoryTone: 'orange',
    sourceTitle: 'AION 2 anti-cheat notes',
    sourcePath: '/compat/',
    answer:
      'NC has published anti-bot measures for AION 2. After a patch, treat compatibility as unknown until you re-check status.',
    detail: 'This community does not treat “undetected” as a permanent label. Stop if a build is marked unavailable.',
    comments: [
      reply({
        author: 'status_first',
        displayName: 'StatusFirst',
        role: 'Status note',
        date: 'Oct 4, 2026',
        body: 'Game-client launch errors are different from product setup errors. Repair AION 2 files first if the game itself will not launch.',
      }),
      reply({
        author: 'wait_label',
        displayName: 'WaitLabel',
        date: 'Oct 4, 2026',
        body: 'If the status page is still updating, wait. A lifetime plan does not freeze game updates.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'q-plans',
    title: 'Monthly or lifetime: which plan matches a short trial?',
    upvotes: 22,
    views: 1100,
    date: 'Oct 3, 2026',
    tag: 'PLANS',
    excerpt: 'Same listed features; only duration and price change.',
    category: 'Plans',
    categoryTone: 'green',
    sourceTitle: 'AION 2 Cheats monthly vs lifetime',
    sourcePath: '/plans/',
    answer: 'Monthly is $35 for 30 days. Lifetime is $150. Both list the same ESP, radar, flight, and soft aim modules.',
    detail: 'Choose monthly if you want to evaluate the overlay first. Choose lifetime only if you already want longer access.',
    comments: [
      reply({
        author: 'plan_note',
        displayName: 'PlanNote',
        role: 'Store note',
        date: 'Oct 3, 2026',
        body: 'A lifetime plan does not freeze compatibility. Re-check status after updates either way.',
      }),
      reply({
        author: 'same_list',
        displayName: 'SameList',
        date: 'Oct 3, 2026',
        body: 'Feature lists are the same on both plans. Duration and price are the only listed differences.',
      }),
    ],
  }),
];
