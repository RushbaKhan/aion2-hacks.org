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
  { title: 'Home', desc: 'AION 2 cheats overview, ESP, flight markers, radar, and plans.', href: ROUTES.home, type: 'Page' },
  { title: 'Features', desc: 'Player ESP, soft aim, flight markers, gathering nodes, radar, and world information.', href: ROUTES.features, type: 'Page' },
  { title: 'Store', desc: 'Monthly $35 and lifetime $150 plans for AION 2 on Windows PC.', href: ROUTES.store, type: 'Page' },
  { title: 'Status', desc: 'Compatibility notes after AION 2 patches.', href: ROUTES.status, type: 'Page' },
  { title: 'Preview', desc: 'Overlay screenshots for ESP, radar, and flight information.', href: ROUTES.preview, type: 'Page' },
  { title: 'Setup', desc: 'Windows PC setup order for AION 2 on Steam or PURPLE.', href: ROUTES.setup, type: 'Page' },
  { title: 'Blog', desc: 'AION 2 guides: classes, release notes, ESP, and patch reminders.', href: ROUTES.blog, type: 'Page' },
  { title: 'Forum', desc: 'AION 2 community forum: ESP, soft aim, setup, and plan Q&A.', href: ROUTES.forum, type: 'Page' },
  { title: 'FAQ', desc: 'Answers about plans, ESP, compatibility, and checkout.', href: ROUTES.faq, type: 'Page' },
  { title: 'Reviews', desc: 'Evaluation checkpoints before choosing a plan.', href: ROUTES.reviews, type: 'Page' },
  { title: 'Support', desc: 'Purchase, setup, and compatibility help.', href: ROUTES.support, type: 'Page' },
  { title: 'About', desc: 'What AION 2 Cheats publishes at aion2cheats.org.', href: ROUTES.about, type: 'Page' },
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
