import { blogPosts } from './blog';
import { forumPosts } from './forum';
import { getAllFaqs } from './faq';
import { blogPostPath, forumPostPath, ROUTES } from '../utils/path';

export interface SearchEntry {
  title: string;
  desc: string;
  href: string;
  type: 'Article' | 'Discussion' | 'FAQ' | 'Page';
}

const pages: SearchEntry[] = [
  {
    title: 'Home',
    desc: 'Aion 2 Hacks for Windows PC: weekly, monthly, and lifetime plans plus setup and compatibility guidance.',
    href: ROUTES.home,
    type: 'Page',
  },
  {
    title: 'Features',
    desc: 'Documented Aion 2 Hacks capabilities, configuration options, and compatibility information.',
    href: ROUTES.features,
    type: 'Page',
  },
  {
    title: 'Store',
    desc: 'Aion 2 Hacks plans: weekly $15, monthly $35, and lifetime $150 on Windows PC.',
    href: ROUTES.store,
    type: 'Page',
  },
  {
    title: 'Cloud DMA',
    desc: 'Cloud DMA related product: weekly $15 and lifetime $50 on Windows PC.',
    href: ROUTES.dma,
    type: 'Page',
  },
  {
    title: 'HWID Spoofer',
    desc: 'HWID Spoofer related product: weekly $15 and monthly $35 on Windows PC.',
    href: ROUTES.hwid,
    type: 'Page',
  },
  {
    title: 'Status',
    desc: 'Aion 2 compatibility notes after game updates and published anti-cheat context.',
    href: ROUTES.status,
    type: 'Page',
  },
  {
    title: 'Preview',
    desc: 'Product preview screenshots and documented overlay functionality.',
    href: ROUTES.preview,
    type: 'Page',
  },
  {
    title: 'Setup',
    desc: 'Windows PC setup order and configuration notes for Aion 2 Hacks.',
    href: ROUTES.setup,
    type: 'Page',
  },
  {
    title: 'Blog',
    desc: 'Aion 2 guides: classes, builds, leveling, updates, and PC requirements.',
    href: ROUTES.blog,
    type: 'Page',
  },
  {
    title: 'Forum',
    desc: 'Aion 2 Hacks community forum: setup, plans, and product Q&A.',
    href: ROUTES.forum,
    type: 'Page',
  },
  { title: 'FAQ', desc: 'Answers about plans, features, compatibility, and checkout.', href: ROUTES.faq, type: 'Page' },
  { title: 'Reviews', desc: 'Evaluation checkpoints before choosing a plan.', href: ROUTES.reviews, type: 'Page' },
  { title: 'Support', desc: 'Purchase, setup, and compatibility help.', href: ROUTES.support, type: 'Page' },
  { title: 'About', desc: 'What Aion 2 Hacks publishes at aion2hacks.org.', href: ROUTES.about, type: 'Page' },
];

export function getSearchIndex(): SearchEntry[] {
  const articles = blogPosts.map((post) => ({
    title: post.title,
    desc: post.desc,
    href: blogPostPath(post.slug),
    type: 'Article' as const,
  }));

  const discussions = forumPosts.map((post) => ({
    title: post.title,
    desc: post.excerpt,
    href: forumPostPath(post.slug),
    type: 'Discussion' as const,
  }));

  const faqs = getAllFaqs().map((item) => ({
    title: item.q,
    desc: item.a.replace(/<[^>]+>/g, ''),
    href: `${ROUTES.faq}#${item.id}`,
    type: 'FAQ' as const,
  }));

  return [...pages, ...articles, ...discussions, ...faqs];
}
