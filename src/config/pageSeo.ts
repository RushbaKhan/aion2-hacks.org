/**
 * Central titles/descriptions for high-traffic routes.
 * After Search Console shows impressions, edit the matching path here and redeploy.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'AION 2 Cheats | Features, Guides and Updates',
    description:
      'Explore AION 2 cheats, gameplay tools, compatibility information, and product updates. Review available features and access details before choosing a plan.',
  },
  '/features/': {
    title: 'AION 2 Features | AION 2 Cheats',
    description:
      'Explore the AION 2 features supported by AION 2 Cheats. Review available gameplay tools, configuration options, compatibility, and product details.',
  },
  '/store/': {
    title: 'AION 2 Cheats Store | AION 2 Cheats',
    description:
      'Explore AION 2 Cheats plans, compare subscription options, and review current pricing, supported platforms, available features, and access details.',
  },
  '/status/': {
    title: 'AION 2 Status | AION 2 Cheats',
    description:
      'Check AION 2 Cheats product status, supported game versions, compatibility updates, and verified anti-cheat information before purchasing.',
  },
  '/preview/': {
    title: 'AION 2 Cheats Preview | AION 2 Cheats',
    description:
      'Explore the AION 2 Cheats interface and preview verified product features, configuration options, and supported gameplay tools.',
  },
  '/setup/': {
    title: 'AION 2 Cheats Setup | AION 2 Cheats',
    description:
      'Review AION 2 Cheats setup requirements, supported platforms, compatibility information, configuration options, and troubleshooting guidance.',
  },
  '/support/': {
    title: 'AION 2 Cheats Support | AION 2 Cheats',
    description:
      'Find support for AION 2 Cheats, including purchase assistance, access questions, setup guidance, compatibility information, and troubleshooting.',
  },
  '/faq/': {
    title: 'AION 2 Cheats FAQ | AION 2 Cheats',
    description:
      'Find answers to common AION 2 Cheats questions about pricing, supported platforms, product features, compatibility, setup, and customer support.',
  },
  '/reviews/': {
    title: 'AION 2 Cheats Reviews | Customer Feedback',
    description:
      'Explore genuine customer feedback about AION 2 Cheats, including usability, supported features, compatibility, and customer support.',
  },
  '/blog/': {
    title: 'AION 2 Guides and Updates | AION 2 Cheats',
    description:
      'Explore AION 2 guides, gameplay tips, class information, game updates, compatibility news, and product-related information.',
  },
  '/intel/': {
    title: 'AION 2 Feature Articles | AION 2 Cheats',
    description:
      'Read AION 2 Cheats articles about player ESP, soft aim, flight markers, gathering nodes, radar, and other listed overlay options.',
  },
  '/guides/': {
    title: 'AION 2 Guides | AION 2 Cheats',
    description:
      'Practical AION 2 guides covering classes, release details, regional servers, and how to review AION 2 Cheats before you buy.',
  },
  '/howto/': {
    title: 'AION 2 Setup Articles | AION 2 Cheats',
    description:
      'Windows PC setup notes for AION 2 Cheats, including Steam and PURPLE requirements, configuration order, and compatibility checks.',
  },
  '/updates/': {
    title: 'AION 2 Updates | AION 2 Cheats',
    description:
      'AION 2 Cheats updates on global PC patches, published anti-bot notes, and current compatibility reminders.',
  },
  '/forum/': {
    title: 'AION 2 Cheats Forum | Overlay Q&A',
    description:
      'Practical answers on AION 2 ESP, soft aim, flight markers, Windows PC setup, and AION 2 Cheats plans. Each discussion links back to a source guide.',
  },
  '/search/': {
    title: 'Search AION 2 Cheats',
    description:
      'Search AION 2 Cheats articles, forum discussions, FAQ answers, and pages for AION 2 on Windows PC.',
  },
  '/terms/': {
    title: 'Terms & Conditions | AION 2 Cheats',
    description:
      'Purchase terms, license use, and refund policy for AION 2 Cheats products sold through aion2cheats.org.',
  },
  '/privacy/': {
    title: 'Privacy Policy | AION 2 Cheats',
    description:
      'How aion2cheats.org uses analytics, cookies, and contact data when you browse or request support.',
  },
  '/about/': {
    title: 'About AION 2 Cheats',
    description:
      'What AION 2 Cheats publishes: AION 2 features, plans, setup notes, and status information at aion2cheats.org.',
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
