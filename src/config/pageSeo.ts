/**
 * Central titles/descriptions for high-traffic routes.
 * Titles stay concise for SERP display. Descriptions target ~150–160 characters.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Overwatch Cheats | Overwatch 2 Aimbot, ESP and Radar',
    description:
      'Play Overwatch and Overwatch 2 on Windows PC with Overwatch Cheats: aimbot, player ESP, and radar. Review OW characters, new season notes, and Blizzard game plans before you buy.',
  },
  '/features/': {
    title: 'Overwatch 2 Features | Overwatch Cheats',
    description:
      'Explore Overwatch Cheats features for Overwatch 2: aimbot, silent aim, triggerbot, player ESP, hero ESP for Overwatch characters, and 2D/3D radar on Windows PC.',
  },
  '/store/': {
    title: 'Overwatch Cheats Store | Overwatch 2 Plans',
    description:
      'Buy Overwatch Cheats for Overwatch 2 on Windows PC. Play with listed aimbot, ESP, and radar. Monthly $35, lifetime $150. Cloud DMA $50 and HWID Spoofer $50 / $150 extras run with the cheat.',
  },
  '/dma/': {
    title: 'Cloud DMA | Overwatch Cheat',
    description:
      'Cloud DMA is a $50 one-time extra that runs with Overwatch Cheats on Windows PC. Compare delivery notes, requirements, and checkout details before you purchase.',
  },
  '/hwid/': {
    title: 'HWID Spoofer | Overwatch Cheat',
    description:
      'HWID Spoofer is a $50 monthly or $150 lifetime extra that runs with Overwatch Cheats on Windows PC. Compare notes and checkout details before purchase.',
  },
  '/status/': {
    title: 'Overwatch Status | Overwatch Cheat',
    description:
      'Check Overwatch Cheat compatibility and anti-cheat status information. Review reported updates and compatibility notices following Overwatch patches before making a purchase.',
  },
  '/preview/': {
    title: 'Overwatch Cheat Preview | Overwatch Cheat',
    description:
      'Explore the Overwatch Cheat feature preview, including aiming features, player visuals, and radar. Review available functionality and compatibility information before checkout.',
  },
  '/setup/': {
    title: 'Overwatch Cheat Setup | Overwatch Cheat',
    description:
      'Learn about Overwatch Cheat setup requirements, available feature settings, Windows PC compatibility, and important anti-cheat considerations.',
  },
  '/support/': {
    title: 'Overwatch Cheat Support | Overwatch Cheat',
    description:
      'Find support information for Overwatch Cheat, including purchase and delivery questions, setup guidance, configuration help, and compatibility updates.',
  },
  '/faq/': {
    title: 'Overwatch Cheat FAQ | Overwatch Cheats',
    description:
      'Find answers to common questions about Overwatch cheats, including monthly and lifetime plans, aiming features, player ESP, radar, setup, compatibility, and support.',
  },
  '/reviews/': {
    title: 'Overwatch Cheat Reviews | Buyer Feedback',
    description:
      'Explore buyer feedback about Overwatch Cheat, including aiming features, player ESP, radar, setup, and compatibility. Review available information before choosing a plan.',
  },
  '/blog/': {
    title: 'Overwatch Guides | Overwatch 2 Heroes, Ranks and Patch Notes',
    description:
      'Read Overwatch and Overwatch 2 guides: Overwatch characters, patch notes, ranks, Juno, D.Va, skins, battle pass, Steam charts, and how to play with listed cheats.',
  },
  '/intel/': {
    title: 'Overwatch Feature Guides | Overwatch Cheat',
    description:
      'Read Overwatch Cheat articles about aimbot, player ESP, wallhack-style overlays, hero ESP, objective ESP, and 2D/3D radar on Windows PC.',
  },
  '/guides/': {
    title: 'Overwatch Guides | Overwatch Cheat',
    description:
      'Practical Overwatch guides covering Overwatch 2 heroes, ranks, patch notes, and how to review Overwatch cheats before you buy.',
  },
  '/howto/': {
    title: 'Overwatch Setup Articles | Overwatch Cheat',
    description:
      'Windows PC setup notes for Overwatch Cheat, including Battle.net and Steam client order, configuration, and compatibility checks.',
  },
  '/updates/': {
    title: 'Overwatch Updates | Overwatch Cheat',
    description:
      'Overwatch Cheat updates on Overwatch 2 patches, Defense Matrix notes, and current compatibility reminders for Windows PC.',
  },
  '/forum/': {
    title: 'Overwatch Cheat Forum | Overlay Q&A',
    description:
      'Practical answers on Overwatch ESP, aimbot, radar, Windows PC setup, and Overwatch Cheat plans. Each discussion links back to a source guide.',
  },
  '/search/': {
    title: 'Search Overwatch Cheat',
    description:
      'Search Overwatch Cheat articles, forum discussions, FAQ answers, and pages for Overwatch cheats on Windows PC.',
  },
  '/terms/': {
    title: 'Terms & Conditions | Overwatch Cheat',
    description:
      'Purchase terms, license use, and refund policy for Overwatch Cheat products sold through overwatchcheat.com.',
  },
  '/privacy/': {
    title: 'Privacy Policy | Overwatch Cheat',
    description:
      'How overwatchcheat.com uses analytics, cookies, and contact data when you browse or request support.',
  },
  '/about/': {
    title: 'About Overwatch Cheat',
    description:
      'What Overwatch Cheat publishes: Overwatch features, plans, setup notes, and status information at overwatchcheat.com.',
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
