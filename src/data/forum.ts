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

export const FORUM_TEAM = 'Overwatch Cheat guide team';
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
      return input.displayName.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase() || 'OW';
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
  return blogPosts.find((item) => item.slug === slug)?.image ?? '/images/gameplay/ow2.jpg';
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
    excerpt: 'Box, skeleton, health, name, and distance options covered by the player ESP guide.',
    category: 'Features',
    categoryTone: 'purple',
    sourceTitle: 'Overwatch player ESP guide',
    sourcePath: '/esp/',
    answer:
      'The guide walks through box ESP, skeleton ESP, health ESP, name ESP, distance ESP, team check, and enemy-only ESP. Exact toggles depend on the current build.',
    detail: 'It favors a short max-distance filter so the overlay stays readable on busy Overwatch maps.',
    comments: [
      reply({
        author: 'range_filter',
        displayName: 'RangeFilter',
        role: 'Overlay note',
        date: 'Oct 11, 2026',
        body: 'Start with box, health, and distance. Add hero labels only if you can still track the default HUD.',
      }),
      reply({
        author: 'busy_server',
        displayName: 'ServerRead',
        date: 'Oct 11, 2026',
        body: 'On crowded control points a short max-distance cap is easier to read than every player marker at once.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'q-aim',
    title: 'Do I need aimbot to use Overwatch Cheat?',
    upvotes: 41,
    views: 1500,
    date: 'Oct 10, 2026',
    tag: 'AIM',
    excerpt: 'Aimbot is listed as optional. ESP and radar can run with it left off.',
    category: 'Features',
    categoryTone: 'purple',
    sourceTitle: 'Overwatch aimbot guide',
    sourcePath: '/aim/',
    answer: 'No. Aimbot, silent aim, and triggerbot are separate combat toggles. Farming bots and movement macros are not listed.',
    detail: 'Open the status page after an Overwatch update before enabling combat modules.',
    comments: [
      reply({
        author: 'esp_first',
        displayName: 'EspFirst',
        role: 'Setup note',
        date: 'Oct 10, 2026',
        body: 'Build a readable ESP profile first, then decide whether you want aimbot.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'q-hero',
    title: 'How should I read hero ESP?',
    upvotes: 54,
    views: 1700,
    date: 'Oct 9, 2026',
    tag: 'HERO',
    excerpt: 'Hero labels matter more than enabling every ability marker at once.',
    category: 'Features',
    categoryTone: 'purple',
    sourceTitle: 'Overwatch hero ESP',
    sourcePath: '/hero/',
    answer:
      'Read hero ESP first so you can tell a tank from a support before the fight starts. Ability ESP can stay off until you need listed ultimate cues.',
    detail: 'Pair hero labels with a short radar range if you only need to know that something is close.',
    comments: [
      reply({
        author: 'alt_first',
        displayName: 'AltFirst',
        role: 'Hero note',
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
    sourceTitle: 'Overwatch radar features',
    sourcePath: '/radar/',
    answer: 'Enable a conservative player ESP profile first, then add 2D or 3D radar if you still want a compact local map.',
    detail: 'Keep radar range short on crowded maps. Both 2D radar and 3D radar are listed.',
    comments: [
      reply({
        author: 'radar_short',
        displayName: 'RadarShort',
        date: 'Oct 8, 2026',
        body: 'Team color coding is enough for most rotations. Leave extra pips off until you need them.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'q-obj',
    title: 'Is objective ESP a farming bot?',
    upvotes: 29,
    views: 1300,
    date: 'Oct 7, 2026',
    tag: 'OBJ',
    excerpt: 'Objective ESP labels payloads and points. It is not listed as unattended automation.',
    category: 'Features',
    categoryTone: 'purple',
    sourceTitle: 'Overwatch objective ESP',
    sourcePath: '/obj/',
    answer: 'No. The listing describes objective ESP for payloads, capture points, and push bots, not a quest or farming bot.',
    detail: 'Treat objective labels as information only. Movement macros are not listed.',
    comments: [
      reply({
        author: 'filter_ore',
        displayName: 'FilterOre',
        date: 'Oct 7, 2026',
        body: 'Turn on payload markers first. A full world list is harder to read than a short range.',
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
    excerpt: 'Status first, then Battle.net or Steam, a conservative ESP profile, and a saved config.',
    category: 'General',
    categoryTone: 'blue',
    sourceTitle: 'Overwatch cheats PC setup',
    sourcePath: '/pc/',
    answer:
      'Confirm status and the Windows client, follow vendor setup notes, then enable player ESP, hero ESP, and radar.',
    detail: 'Cloud DMA and HWID Spoofer are extras that run with Overwatch Cheats on Windows PC. Confirm those notes on their pages.',
    comments: [
      reply({
        author: 'panic_key',
        displayName: 'PanicKey',
        role: 'Setup note',
        date: 'Oct 5, 2026',
        body: 'Set a panic key before you join a ranked match.',
      }),
    ],
  }),
  guideDiscussion({
    slug: 'q-ac',
    title: 'What should I do after an Overwatch patch?',
    upvotes: 46,
    views: 2400,
    date: 'Oct 4, 2026',
    tag: 'STATUS',
    pinned: true,
    excerpt: 'Compatibility can shift after a patch. Check status first, then launch.',
    category: 'Status',
    categoryTone: 'orange',
    sourceTitle: 'Overwatch anti-cheat notes',
    sourcePath: '/ac/',
    answer:
      'Overwatch uses Blizzard Defense Matrix. After a patch, treat compatibility as unknown until you re-check status.',
    detail: 'This community does not treat “undetected” as a permanent label. Stop if a build is marked unavailable.',
    comments: [
      reply({
        author: 'status_first',
        displayName: 'StatusFirst',
        role: 'Status note',
        date: 'Oct 4, 2026',
        body: 'Game-client launch errors are different from product setup errors. Repair Overwatch files first if the game itself will not launch.',
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
    sourceTitle: 'Overwatch Cheat monthly vs lifetime',
    sourcePath: '/plans/',
    answer: 'Monthly is $35 for 30 days. Lifetime is $150. Both list the same ESP, radar, and aimbot modules.',
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
