import { t } from '../i18n';
import { checkoutForSlug, checkoutPath } from '../config/checkout';
import type { IconName } from '../components/icons/types';
import { EXTRA_SHOTS, SCREENSHOT_RANK, type ScreenshotShot } from './screenshots';
import { productPath } from '../utils/path';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
}

export const productRelatedBlogSlugs: Record<string, string[]> = {
  overwatch: ['cheats', 'esp', 'aim', 'radar', 'hero', 'obj', 'pc', 'ac', 'plans'],
  dma: ['pc', 'ac', 'cheats', 'plans'],
  hwid: ['pc', 'ac', 'cheats', 'plans'],
};

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Open the status page on overwatchcheat.com before you buy—especially after an Overwatch client update.',
  },
  {
    num: '02',
    title: 'Choose monthly or lifetime',
    desc: 'Pick the $35 monthly plan or the $150 lifetime plan, then compare the listed modules before checkout.',
  },
  {
    num: '03',
    title: 'Complete checkout',
    desc: 'Finish the checkout flow for access details. Keep the order email you used so support can find your purchase.',
  },
  {
    num: '04',
    title: 'Follow Windows PC setup',
    desc: 'Use the vendor setup notes for Battle.net or Steam. Turn on a conservative ESP and radar profile before joining a live match.',
  },
];

const utilityAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Open the status page on overwatchcheat.com before you buy—especially after an Overwatch client update.',
  },
  {
    num: '02',
    title: 'Read the extra listing',
    desc: 'This extra runs with Overwatch Cheats on Windows PC. Confirm vendor notes on this page before you continue.',
  },
  {
    num: '03',
    title: 'Complete checkout',
    desc: 'Finish this product’s own checkout flow for access details. Keep the order email you used so support can find your purchase.',
  },
  {
    num: '04',
    title: 'Follow vendor setup notes',
    desc: 'Use the instructions provided after checkout. Re-check status after Overwatch patches.',
  },
];

function acquisitionFor(productName: string, kind: 'tier' | 'utility' = 'tier'): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: kind === 'utility' ? utilityAcquisitionSteps : defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'Overwatch on Windows PC launches through Battle.net or Steam. Confirm current compatibility on the status page before you purchase or launch. Overlay options can change after a game update.';

const sharedLimitations =
  'Third-party software in Overwatch can violate the game terms of use and may lead to account action. You use this software at your own risk. Compatibility and availability can change after game or Windows updates without notice. This site is not affiliated with Blizzard Entertainment.';

const overwatchSystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Windows 10 or Windows 11 (64-bit).' },
  { icon: 'reqSteam', text: 'Overwatch on Windows PC via Battle.net or Steam with current patches applied.' },
  { icon: 'reqSettings', text: 'Administrator access for loader installation and updates.' },
  { icon: 'reqWifi', text: 'Stable internet connection for checkout access and updates.' },
  {
    icon: 'reqCpu',
    text: 'A system that meets Overwatch published hardware requirements. Cloud DMA and HWID Spoofer extras run with Overwatch Cheats on this PC.',
  },
];

type GalleryKey = ScreenshotShot['key'];

const galleryRaw = Object.fromEntries(
  SCREENSHOT_RANK.map((shot) => [
    shot.key,
    { src: shot.src, alt: shot.alt, caption: shot.caption, captionDesc: shot.captionDesc },
  ]),
) as Record<GalleryKey, Pick<ScreenshotShot, 'src' | 'alt' | 'caption' | 'captionDesc'>>;

function slide(...keys: GalleryKey[]): ProductSlide[] {
  return keys.map((k) => {
    const item = galleryRaw[k];
    return {
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      captionDesc: item.captionDesc,
    };
  });
}

const rankedSlides = slide(...SCREENSHOT_RANK.map((shot) => shot.key));

const listedFeatures = [
  'Aimbot',
  'Aim Assist',
  'Silent Aim',
  'Triggerbot',
  'ESP',
  'Player ESP',
  'Box ESP',
  'Skeleton ESP',
  'Health ESP',
  'Name ESP',
  'Distance ESP',
  'Hero ESP',
  'Team Check',
  'Enemy Only ESP',
  'Ability ESP',
  'Objective ESP',
  'Radar',
  '2D Radar',
  '3D Radar',
];

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements'>
> = {
  overwatch: {
    images: rankedSlides,
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: overwatchSystemRequirements,
    fullFeatures: listedFeatures,
    overview: {
      title: 'Built around Overwatch and Overwatch 2 information workflow',
      paragraphs: [
        'Overwatch Cheats lists tools for Overwatch and Overwatch 2, the Blizzard hero shooter you play on Windows PC: [player ESP](/esp/), [hero ESP](/hero/) for Overwatch characters, [objective ESP](/obj/), [radar](/radar/), and optional [aimbot](/aim/). Enable the overlays you can actually read, then save a config before joining a live match.',
        'The current vendor listing is the Windows PC client for this game. Treat compatibility as something to re-check on the [status page](/status/) after every new season and Overwatch patch notes drop rather than a permanent label. [Setup notes](/setup/) cover the Windows PC order. OW shorthand, Overwatch 2 heroes, and ranks do not change the listed modules.',
      ],
    },
  },
  dma: {
    images: [
      {
        src: EXTRA_SHOTS.dma.src,
        alt: EXTRA_SHOTS.dma.alt,
        caption: EXTRA_SHOTS.dma.caption,
        captionDesc: EXTRA_SHOTS.dma.captionDesc,
      },
    ],
    goodToKnow:
      'Cloud DMA is a $50 one-time extra that runs with Overwatch Cheats. Confirm vendor notes at checkout. Overwatch Cheats plans stay $35 monthly or $150 lifetime.',
    limitations: sharedLimitations,
    systemRequirements: overwatchSystemRequirements,
    fullFeatures: ['$50 one-time extra', 'Windows PC', 'Runs with Overwatch Cheats'],
    overview: {
      title: 'Cloud DMA extra for Overwatch Cheats',
      paragraphs: [
        'Cloud DMA is a $50 one-time extra that runs with [Overwatch Cheats](/store/) on Windows PC. Use this page for DMA delivery notes, then keep [aimbot](/aim/), ESP, and radar on the store listing.',
        'Pair it with the [HWID Spoofer](/hwid/) extra when you are mapping the three listings. Re-check [status](/status/) after Overwatch patches either way.',
      ],
    },
  },
  hwid: {
    images: [
      {
        src: EXTRA_SHOTS.hwid.src,
        alt: EXTRA_SHOTS.hwid.alt,
        caption: EXTRA_SHOTS.hwid.caption,
        captionDesc: EXTRA_SHOTS.hwid.captionDesc,
      },
    ],
    goodToKnow:
      'HWID Spoofer is a $50 monthly or $150 lifetime extra that runs with Overwatch Cheats on Windows PC. This page does not promise ban evasion or Defense Matrix bypass.',
    limitations: sharedLimitations,
    systemRequirements: overwatchSystemRequirements,
    fullFeatures: ['Monthly $50', 'Lifetime $150', 'Runs with Overwatch Cheats'],
    overview: {
      title: 'HWID Spoofer extra for Overwatch Cheats',
      paragraphs: [
        'HWID Spoofer is a $50 monthly or $150 lifetime extra that runs with Overwatch Cheats on Windows PC. This page does not promise ban evasion, hardware masking success, or Defense Matrix bypass.',
        'Keep [aimbot](/aim/), ESP, and radar on the [store](/store/). Use [setup](/setup/) and [status](/status/) before you launch the extras with the overlay.',
      ],
    },
  },
};

function buildTierPages(): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = 'overwatch';
    const content = productContent[slug];
    return {
      slug,
      kind: 'tier' as const,
      badge: cheat.badge,
      tier: cheat.tier,
      name: cheat.name,
      title: cheat.title,
      subtitle: cheat.desc,
      desc: cheat.desc,
      features: cheat.features,
      more: cheat.more,
      variant: cheat.variant,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(cheat.title),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      about: [
        {
          type: 'p',
          text: 'Overwatch and Overwatch 2 reward awareness of enemy heroes, abilities, and the live objective. Overwatch Cheats groups those information modules on one [store](/store/) page so you can play this Blizzard game with listed ESP and radar, with a longer breakdown on [features](/features/) and [preview](/preview/).',
        },
        { type: 'h2', text: 'What is listed' },
        {
          type: 'p',
          text: 'The current product listing includes [aimbot](/aim/), [player ESP](/esp/), [hero ESP](/hero/), [objective ESP](/obj/), [2D and 3D radar](/radar/), team check, and enemy-only ESP. Full farming bots and movement macros are not listed, so this site does not claim them. See the [FAQ](/faq/) if you are unsure what is included.',
        },
      ],
      body: [
        { type: 'h2', text: 'Plans' },
        {
          type: 'p',
          text: 'Monthly access is $35 for 30 days (P30D). Lifetime access is $150 (P99Y). Both plans are priced in USD and use the same listed feature set. Compare them here, then read [monthly vs lifetime](/plans/) if you still need a short trial vs long access.',
        },
        { type: 'h2', text: 'Requirements' },
        {
          type: 'p',
          text: 'Windows 10 or 11 and a machine that can run Overwatch. [Cloud DMA](/dma/) and [HWID Spoofer](/hwid/) are extras that run with Overwatch Cheats on that PC. Confirm notes on [setup](/setup/) and [status](/status/) before you pay.',
        },
      ],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
}

function buildUtilityPages(): ProductPage[] {
  return t.products.items.map((item) => {
    const slug = item.href.includes('dma') ? 'dma' : 'hwid';
    const content = productContent[slug];
    return {
      slug,
      kind: 'utility' as const,
      badge: item.badge,
      category: item.category,
      name: item.title,
      title: item.title,
      subtitle: item.subtitle,
      desc: item.desc,
      features: item.features,
      more: item.more,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(item.title, 'utility'),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      about: [
        {
          type: 'p',
          text: `${item.title} is an extra that runs with [Overwatch Cheats](/store/) on Windows PC. Use this page for its checkout path, then keep [aimbot](/aim/), ESP, and radar on [features](/features/).`,
        },
      ],
      body: [
        { type: 'h2', text: 'How it relates' },
        {
          type: 'p',
          text: 'This extra runs with [Overwatch Cheats](/store/) on Windows PC. Monthly ($35) and lifetime ($150) overlay plans stay on the store. Use this page for the extra’s checkout.',
        },
        { type: 'h2', text: 'Compatibility' },
        {
          type: 'p',
          text: 'Treat Blizzard Defense Matrix notes as unverified context. Re-check [status](/status/) after Overwatch patches. [Windows PC setup](/pc/) covers first-run order for the main overlay.',
        },
      ],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
}

export const productPages: ProductPage[] = [...buildTierPages(), ...buildUtilityPages()];

export const cheatPages = productPages.filter((p) => p.kind === 'tier');
export const utilityPages = productPages.filter((p) => p.kind === 'utility');

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug) ?? productPages[0];
}

export function getCheatPage(slug: string) {
  return cheatPages.find((p) => p.slug === slug) ?? cheatPages[0];
}

export function getAllProductSlugs() {
  return productPages.map((p) => p.slug);
}

export function getAllCheatSlugs() {
  return cheatPages.map((p) => p.slug);
}

export const heroSlides = rankedSlides;

export const productHub = {
  path: '/store/',
  title: t.products.title,
  subtitle: t.products.subtitle,
  description:
    'Overwatch Cheats plans for Overwatch and Overwatch 2 on Windows PC. Compare monthly and lifetime options, review Overwatch characters overlays, and visit checkout for current pricing.',
  buyUrl: checkoutPath('overwatch'),
};

export { productPath };
