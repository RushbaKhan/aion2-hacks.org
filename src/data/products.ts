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
  aion2: ['cheats', 'esp', 'aim', 'radar', 'pc', 'ac', 'plans', 'aion-2-classes', 'aion-2-requirements'],
  dma: ['pc', 'ac', 'cheats', 'plans'],
  hwid: ['pc', 'ac', 'cheats', 'plans'],
};

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Open the status page on aion2hacks.org before you buy—especially after an Aion 2 client update.',
  },
  {
    num: '02',
    title: 'Choose weekly, monthly, or lifetime',
    desc: 'Pick the $15 weekly, $35 monthly, or $150 lifetime plan, then compare the listed modules before checkout.',
  },
  {
    num: '03',
    title: 'Complete checkout',
    desc: 'Finish the checkout flow for access details. Keep the order email you used so support can find your purchase.',
  },
  {
    num: '04',
    title: 'Follow Windows PC setup',
    desc: 'Use the vendor setup notes for the official Aion 2 client. Turn on a conservative ESP and radar profile before joining a live zone.',
  },
];

const utilityAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Open the status page on aion2hacks.org before you buy—especially after an Aion 2 client update.',
  },
  {
    num: '02',
    title: 'Read the extra listing',
    desc: 'This extra runs with Aion 2 Hacks on Windows PC. Confirm vendor notes on this page before you continue.',
  },
  {
    num: '03',
    title: 'Complete checkout',
    desc: 'Finish this product’s own checkout flow for access details. Keep the order email you used so support can find your purchase.',
  },
  {
    num: '04',
    title: 'Follow vendor setup notes',
    desc: 'Use the instructions provided after checkout. Re-check status after Aion 2 patches.',
  },
];

function acquisitionFor(productName: string, kind: 'tier' | 'utility' = 'tier'): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: kind === 'utility' ? utilityAcquisitionSteps : defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'Aion 2 on Windows PC launches through the official NCSOFT client. Confirm current compatibility on the status page before you purchase or launch. Overlay options can change after a game update.';

const sharedLimitations =
  'Third-party software in Aion 2 can violate the game terms of use and may lead to account action. You use this software at your own risk. Compatibility and availability can change after game or Windows updates without notice. This site is not affiliated with NCSOFT.';

const aion2SystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Windows 10 or Windows 11 (64-bit).' },
  { icon: 'reqSteam', text: 'Aion 2 on Windows PC via the official client with current patches applied.' },
  { icon: 'reqSettings', text: 'Administrator access for loader installation and updates.' },
  { icon: 'reqWifi', text: 'Stable internet connection for checkout access and updates.' },
  {
    icon: 'reqCpu',
    text: 'A system that meets Aion 2 published hardware requirements. Cloud DMA and HWID Spoofer extras run with Aion 2 Hacks on this PC.',
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
  'Target ESP',
  'NPC ESP',
  'Faction Filter',
  'Enemy Only ESP',
  'Item ESP',
  'Loot ESP',
  'Map ESP',
  'Quest Markers',
  'Radar',
  '2D Radar',
  '3D Radar',
];

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements'>
> = {
  aion2: {
    images: rankedSlides,
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: aion2SystemRequirements,
    fullFeatures: listedFeatures,
    overview: {
      title: 'Built around Aion 2',
      paragraphs: [
        'Aion 2 Hacks lists tools for Aion 2, the NCSOFT MMORPG on Windows PC: [player ESP](/esp/), [target and NPC ESP](/radar/), [item and loot cues](/features/), [map markers](/features/), [radar](/radar/), and optional [aimbot](/aim/). Enable the overlays you can actually read, then save a config before joining a crowded zone or PvP.',
        'The current vendor listing is the Windows PC client for this game. Treat compatibility as something to re-check on the [status page](/status/) after every Aion 2 update rather than a permanent label. [Setup notes](/setup/) cover the Windows PC order. Class guides and build articles do not change the listed modules.',
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
      'Cloud DMA is a related extra with weekly access at $15 and lifetime at $50 that runs with Aion 2 Hacks. Confirm vendor notes at checkout. Aion 2 Hacks main plans stay $15 weekly, $35 monthly, or $150 lifetime.',
    limitations: sharedLimitations,
    systemRequirements: aion2SystemRequirements,
    fullFeatures: ['$15 weekly', '$50 lifetime', 'Windows PC', 'Runs with Aion 2 Hacks'],
    overview: {
      title: 'Cloud DMA extra for Aion 2 Hacks',
      paragraphs: [
        'Cloud DMA is a related extra with weekly ($15) and lifetime ($50) access that runs with [Aion 2 Hacks](/store/) on Windows PC. Use this page for DMA delivery notes, then keep ESP and radar on the store listing.',
        'Pair it with the [HWID Spoofer](/hwid-spoofer/) extra when you are mapping the three listings. Re-check [status](/status/) after Aion 2 patches either way.',
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
      'HWID Spoofer is a related extra with weekly access at $15 and monthly access at $35 that runs with Aion 2 Hacks on Windows PC. This page does not promise ban evasion or anti-cheat bypass.',
    limitations: sharedLimitations,
    systemRequirements: aion2SystemRequirements,
    fullFeatures: ['$15 weekly', '$35 monthly', 'Runs with Aion 2 Hacks'],
    overview: {
      title: 'HWID Spoofer extra for Aion 2 Hacks',
      paragraphs: [
        'HWID Spoofer is a related extra with weekly ($15) and monthly ($35) access that runs with Aion 2 Hacks on Windows PC. This page does not promise ban evasion, hardware masking success, or anti-cheat bypass.',
        'Keep ESP and radar on the [store](/store/). Use [setup](/setup/) and [status](/status/) before you launch the extras with the overlay.',
      ],
    },
  },
};

function buildTierPages(): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = 'aion2';
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
          text: 'Aion 2 rewards awareness of nearby players, mobs, and quest objectives. Aion 2 Hacks groups those information modules on one [store](/store/) page so you can play with listed ESP and radar, with a longer breakdown on [features](/features/) and [preview](/preview/).',
        },
        { type: 'h2', text: 'What is listed' },
        {
          type: 'p',
          text: 'The current product listing includes [aimbot](/aim/), [player ESP](/esp/), target and NPC overlays, item and map cues when listed, [2D and 3D radar](/radar/), faction filter, and enemy-only ESP. Full farming bots and movement macros are not listed, so this site does not claim them. See the [FAQ](/faq/) if you are unsure what is included.',
        },
      ],
      body: [
        { type: 'h2', text: 'Plans' },
        {
          type: 'p',
          text: 'Weekly access is $15 for 7 days (P7D). Monthly access is $35 for 30 days (P30D). Lifetime access is $150 (P99Y). All plans are priced in USD and use the same listed feature set. Compare them here, then read [plan comparison](/plans/) if you still need a short trial vs long access.',
        },
        { type: 'h2', text: 'Requirements' },
        {
          type: 'p',
          text: 'Windows 10 or 11 and a machine that can run Aion 2. [Cloud DMA](/cloud-dma/) and [HWID Spoofer](/hwid-spoofer/) are extras that run with Aion 2 Hacks on that PC. Confirm notes on [setup](/setup/) and [status](/status/) before you pay.',
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
          text: `${item.title} is an extra that runs with [Aion 2 Hacks](/store/) on Windows PC. Use this page for its checkout path, then keep ESP and radar on [features](/features/).`,
        },
      ],
      body: [
        { type: 'h2', text: 'How it relates' },
        {
          type: 'p',
          text: 'This extra runs with [Aion 2 Hacks](/store/) on Windows PC. Weekly ($15), monthly ($35), and lifetime ($150) overlay plans stay on the store. Use this page for the extra’s checkout.',
        },
        { type: 'h2', text: 'Compatibility' },
        {
          type: 'p',
          text: 'Treat NCSOFT anti-cheat notes as unverified context. Re-check [status](/status/) after Aion 2 patches. [Windows PC setup](/pc/) covers first-run order for the main overlay.',
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
    'Aion 2 Hacks plans for Aion 2 on Windows PC. Compare weekly, monthly, and lifetime options, review listed overlays, and visit checkout for current pricing.',
  buyUrl: checkoutPath('aion2'),
};

export { productPath };
