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
  { title: 'Home', desc: 'Overwatch Cheats for Overwatch 2: aimbot, player ESP, radar, OW characters, and plans.', href: ROUTES.home, type: 'Page' },
  { title: 'Features', desc: 'Aimbot, player ESP, hero ESP, objective ESP, radar, and team check for Overwatch 2.', href: ROUTES.features, type: 'Page' },
  { title: 'Store', desc: 'Overwatch Cheats plans: monthly $35 and lifetime $150 for Overwatch 2 on Windows PC.', href: ROUTES.store, type: 'Page' },
  { title: 'Cloud DMA', desc: 'Cloud DMA extra that runs with Overwatch Cheats. $50 one-time on Windows PC.', href: ROUTES.dma, type: 'Page' },
  { title: 'HWID Spoofer', desc: 'HWID Spoofer extra that runs with Overwatch Cheats. $50 monthly or $150 lifetime.', href: ROUTES.hwid, type: 'Page' },
  { title: 'Status', desc: 'Compatibility notes after Overwatch patches and Defense Matrix context.', href: ROUTES.status, type: 'Page' },
  { title: 'Preview', desc: 'Overlay screenshots for ESP, radar, and aiming features.', href: ROUTES.preview, type: 'Page' },
  { title: 'Setup', desc: 'Windows PC setup order for Overwatch on Battle.net or Steam.', href: ROUTES.setup, type: 'Page' },
  { title: 'Blog', desc: 'Overwatch guides: heroes, release notes, ESP, and patch reminders.', href: ROUTES.blog, type: 'Page' },
  { title: 'Forum', desc: 'Overwatch community forum: ESP, aimbot, setup, and plan Q&A.', href: ROUTES.forum, type: 'Page' },
  { title: 'FAQ', desc: 'Answers about plans, ESP, compatibility, and checkout.', href: ROUTES.faq, type: 'Page' },
  { title: 'Reviews', desc: 'Evaluation checkpoints before choosing a plan.', href: ROUTES.reviews, type: 'Page' },
  { title: 'Support', desc: 'Purchase, setup, and compatibility help.', href: ROUTES.support, type: 'Page' },
  { title: 'About', desc: 'What Overwatch Cheat publishes at overwatchcheat.com.', href: ROUTES.about, type: 'Page' },
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
