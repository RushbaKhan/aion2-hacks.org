export interface ForumComment {
  author: string;
  age: string;
  score: number;
  body: string;
  replies?: ForumComment[];
}

export interface ForumPost {
  slug: string;
  category: string;
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  excerpt: string;
  author: string;
  age: string;
  commentsCount: number;
  upvotes: number;
  flair?: string;
  body: string[];
  comments: ForumComment[];
  sourceTitle?: string;
  sourcePath?: string;
}

export const forumCategories = [
  { name: 'General', tone: 'purple', icon: 'users' },
  { name: 'Guides & Hunts', tone: 'blue', icon: 'navBlog' },
  { name: 'Patch Talk', tone: 'orange', icon: 'refresh' },
  { name: 'Community', tone: 'green', icon: 'messageCircle' },
] as const;

function guideDiscussion(input: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryTone: ForumPost['categoryTone'];
  sourceTitle: string;
  sourcePath: string;
  upvotes: number;
  answer: string;
  detail: string;
  tip: string;
}): ForumPost {
  const { answer, detail, tip, ...post } = input;
  return {
    ...post,
    author: 'guide_team',
    age: '2 days ago',
    commentsCount: 1,
    upvotes: 14,
    flair: 'Guide Q&A',
    body: [answer, detail],
    comments: [{ author: 'guide_team', age: 'From the guide', score: 0, body: tip }],
  };
}

const additionalGuidePosts: ForumPost[] = [
  guideDiscussion({
    slug: 'what-does-player-esp-include',
    title: 'What does player ESP include in the guide?',
    upvotes: 71,
    excerpt: 'A short breakdown of box, name, distance, and direction options covered by the player ESP guide.',
    category: 'Guides & Hunts',
    categoryTone: 'blue',
    sourceTitle: 'The Isle player ESP guide',
    sourcePath: '/blog/the-isle-player-esp/',
    answer: 'The guide covers box, name, distance, direction, snapline, and visible-check options. Exact toggles depend on the current build.',
    detail: 'It recommends a short max-distance filter so the overlay stays readable on busy Evrima servers.',
    tip: 'Start with box and distance. Add names only if you can still track scent and stamina UI.',
  }),
  guideDiscussion({
    slug: 'how-to-read-dinosaur-esp',
    title: 'How should I read dinosaur ESP on the first hunt?',
    upvotes: 54,
    excerpt: 'Species and growth matter more than turning every creature marker on at once.',
    category: 'Guides & Hunts',
    categoryTone: 'blue',
    sourceTitle: 'The Isle dinosaur ESP guide',
    sourcePath: '/blog/the-isle-dinosaur-esp/',
    answer: 'Use species labels and growth first so you can tell a threat from a food source. Corpse and NPC markers can stay off until you need them.',
    detail: 'Pair dinosaur ESP with a short radar range if you only need to know that something is close.',
    tip: 'If the screen feels crowded, reduce range before changing colors.',
  }),
  guideDiscussion({
    slug: 'is-aim-assistance-required',
    title: 'Do I need aim assistance to use Isle Hacks?',
    upvotes: 41,
    excerpt: 'Aim assistance is listed as optional. ESP and radar can run without it.',
    category: 'Guides & Hunts',
    categoryTone: 'blue',
    sourceTitle: 'The Isle aimbot guide',
    sourcePath: '/blog/the-isle-aimbot/',
    answer: 'No. Aim assistance is a separate combat toggle. Silent aim and triggerbot are not listed.',
    detail: 'Check the status page after an Evrima update before enabling combat modules.',
    tip: 'Build a readable ESP profile first, then decide whether you want aim assistance.',
  }),
  guideDiscussion({
    slug: 'windows-pc-setup-order',
    title: 'What is the first-run setup order on Windows PC?',
    upvotes: 38,
    excerpt: 'Status, Evrima branch, conservative ESP, then a saved config.',
    category: 'Guides & Hunts',
    categoryTone: 'blue',
    sourceTitle: 'The Isle hacks PC setup',
    sourcePath: '/blog/the-isle-hacks-pc-setup/',
    answer: 'Confirm status and the Evrima branch, follow vendor setup notes, then enable player ESP, dinosaur ESP, and radar.',
    detail: 'The vendor lists Cloud DMA as required for full functionality. Confirm that at checkout if you need the complete set.',
    tip: 'Set a panic key before joining a populated server.',
  }),
];

export function getForumPost(slug: string) {
  return forumPosts.find((post) => post.slug === slug);
}

export const forumPosts: ForumPost[] = [
  ...additionalGuidePosts,
  {
    slug: 'evrima-or-legacy',
    category: 'General',
    categoryTone: 'purple',
    title: 'Does the current listing work on Legacy The Isle?',
    excerpt: 'The store notes Evrima-only. Sharing what that means before checkout.',
    author: 'guide_team',
    age: '3 days ago',
    commentsCount: 2,
    upvotes: 29,
    flair: 'Compatibility',
    sourceTitle: 'The Isle hacks for Evrima',
    sourcePath: '/blog/the-isle-hacks-evrima/',
    body: [
      'The current vendor listing is Evrima-only. Do not assume the same access works on a Legacy install.',
      'Confirm the Steam branch before you buy. After a patch, re-check the status page even if you stayed on Evrima.',
    ],
    comments: [
      {
        author: 'guide_team',
        age: 'From the guide',
        score: 2,
        body: 'If Steam is on the wrong branch, setup notes for Evrima will not apply.',
      },
    ],
  },
  {
    slug: 'eac-after-patch',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'What should I do after an Evrima or Easy Anti-Cheat update?',
    excerpt: 'Compatibility can change after a patch. Status first, launch second.',
    author: 'guide_team',
    age: '4 days ago',
    commentsCount: 2,
    upvotes: 46,
    flair: 'Status',
    sourceTitle: 'The Isle Easy Anti-Cheat notes',
    sourcePath: '/blog/the-isle-compatibility-eac/',
    body: [
      'The Isle Evrima launches through Easy Anti-Cheat. After a patch, treat compatibility as unknown until you re-check status.',
      'This community does not treat “undetected” as a permanent label. Stop if a build is marked unavailable.',
    ],
    comments: [
      {
        author: 'guide_team',
        age: 'From the guide',
        score: 3,
        body: 'Game-client EAC install errors are different from product setup errors. Repair The Isle files first if the game itself will not launch.',
      },
    ],
  },
  {
    slug: 'monthly-or-lifetime',
    category: 'Community',
    categoryTone: 'green',
    title: 'Monthly or lifetime: which plan matches a short trial?',
    excerpt: 'Same listed features, different duration and price.',
    author: 'guide_team',
    age: '5 days ago',
    commentsCount: 1,
    upvotes: 22,
    flair: 'Plans',
    sourceTitle: 'Isle Hacks monthly vs lifetime',
    sourcePath: '/blog/the-isle-monthly-vs-lifetime/',
    body: [
      'Monthly is $35 for 30 days. Lifetime is $150. Both list the same ESP, radar, and aim assistance modules.',
      'Choose monthly if you want to evaluate the overlay first. Choose lifetime only if you already want longer access.',
    ],
    comments: [
      {
        author: 'guide_team',
        age: 'From the guide',
        score: 1,
        body: 'A lifetime plan does not freeze Easy Anti-Cheat. Re-check status after updates either way.',
      },
    ],
  },
];
