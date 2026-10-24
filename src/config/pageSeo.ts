/**
 * Central titles/descriptions for high-traffic routes.
 * Titles stay concise for SERP display. Homepage description stays under ~120 characters / 1000px.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Aion 2 Hacks | Features, Plans and Product Information',
    description:
      'Aion 2 Hacks for Windows PC. Compare weekly, monthly, and lifetime plans, then review setup and compatibility notes.',
  },
  '/features/': {
    title: 'Aion 2 Features | Aion 2 Hacks',
    description:
      'Explore the available Aion 2 Hacks features, product capabilities, configuration options, and compatibility information. Review supported functionality before choosing a plan.',
  },
  '/store/': {
    title: 'Aion 2 Store | Weekly, Monthly and Lifetime Plans',
    description:
      'Explore the Aion 2 Hacks store. Compare weekly access at $15, monthly access at $35, and lifetime access at $150, with clearly identified product links.',
  },
  '/cloud-dma/': {
    title: 'Cloud DMA | Aion 2 Hacks',
    description:
      'Cloud DMA is a related product with weekly access at $15 and lifetime access at $50. Review delivery notes, requirements, and checkout details before you purchase.',
  },
  '/dma/': {
    title: 'Cloud DMA | Aion 2 Hacks',
    description:
      'Cloud DMA is a related product with weekly access at $15 and lifetime access at $50. Review delivery notes, requirements, and checkout details before you purchase.',
  },
  '/hwid-spoofer/': {
    title: 'HWID Spoofer | Aion 2 Hacks',
    description:
      'HWID Spoofer is a related product with weekly access at $15 and monthly access at $35. Compare notes and checkout details before purchase.',
  },
  '/hwid/': {
    title: 'HWID Spoofer | Aion 2 Hacks',
    description:
      'HWID Spoofer is a related product with weekly access at $15 and monthly access at $35. Compare notes and checkout details before purchase.',
  },
  '/status/': {
    title: 'Aion 2 Status | Updates and Compatibility',
    description:
      'Review Aion 2 product compatibility information, verified game update notices, and relevant anti-cheat information. Check available evidence before making a purchase.',
  },
  '/preview/': {
    title: 'Aion 2 Preview | Aion 2 Hacks',
    description:
      'Explore the Aion 2 Hacks product preview and available functionality. Review documented features, supported configurations, and product information before checkout.',
  },
  '/setup/': {
    title: 'Aion 2 Setup | Requirements and Configuration',
    description:
      'Find Aion 2 product setup information, supported configuration requirements, troubleshooting guidance, and compatibility details for your PC.',
  },
  '/support/': {
    title: 'Aion 2 Support | Aion 2 Hacks',
    description:
      'Find help with Aion 2 Hacks purchases, product delivery, setup, configuration, and compatibility questions.',
  },
  '/faq/': {
    title: 'Aion 2 Hacks FAQ | Plans and Support',
    description:
      'Find answers about Aion 2 Hacks, weekly and monthly subscriptions, lifetime access, supported features, setup requirements, compatibility, and support.',
  },
  '/reviews/': {
    title: 'Aion 2 Hacks Reviews | Buyer Feedback',
    description:
      'Explore authentic buyer feedback about Aion 2 Hacks, including documented product features, setup experience, and compatibility. Review available evidence before choosing a plan.',
  },
  '/blog/': {
    title: 'Aion 2 Guides and Updates | Aion 2 Hacks',
    description:
      'Explore the Aion 2 information hub for game guides, classes, skills, quests, updates, PC requirements, compatibility information, and product-related articles.',
  },
  '/intel/': {
    title: 'Aion 2 Feature Guides | Aion 2 Hacks',
    description:
      'Read Aion 2 Hacks articles about player information overlays, radar, loot cues, and configuration on Windows PC.',
  },
  '/guides/': {
    title: 'Aion 2 Guides | Aion 2 Hacks',
    description:
      'Practical Aion 2 guides covering classes, builds, quests, and how to review Aion 2 Hacks before you buy.',
  },
  '/howto/': {
    title: 'Aion 2 Setup Articles | Aion 2 Hacks',
    description:
      'Windows PC setup notes for Aion 2 Hacks, including client order, configuration, and compatibility checks.',
  },
  '/updates/': {
    title: 'Aion 2 Updates | Aion 2 Hacks',
    description:
      'Aion 2 Hacks updates on verified patch information and current compatibility reminders for Windows PC.',
  },
  '/forum/': {
    title: 'Aion 2 Hacks Forum | Product Q&A',
    description:
      'Practical answers on Aion 2 overlays, Windows PC setup, and Aion 2 Hacks plans. Each discussion links back to a source guide.',
  },
  '/search/': {
    title: 'Search Aion 2 Hacks',
    description:
      'Search Aion 2 Hacks articles, forum discussions, FAQ answers, and pages for Aion 2 product information on Windows PC.',
  },
  '/terms/': {
    title: 'Terms & Conditions | Aion 2 Hacks',
    description:
      'Purchase terms, license use, and refund policy for Aion 2 Hacks products sold through aion2hacks.org.',
  },
  '/privacy/': {
    title: 'Privacy Policy | Aion 2 Hacks',
    description:
      'How aion2hacks.org uses analytics, cookies, and contact data when you browse or request support.',
  },
  '/about/': {
    title: 'About Aion 2 Hacks',
    description:
      'What Aion 2 Hacks publishes: Aion 2 features, plans, setup notes, and status information at aion2hacks.org.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}
