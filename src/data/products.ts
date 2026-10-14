import { t } from '../i18n';
import { checkoutForSlug, checkoutPath } from '../config/checkout';
import type { IconName } from '../components/icons/types';
import { SCREENSHOT_RANK, type ScreenshotShot } from './screenshots';

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
  'aion-2': ['cheats', 'esp', 'aim', 'flight', 'radar', 'nodes', 'world', 'pc', 'compat', 'plans'],
};

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Open the status page on aion2cheats.org before you buy—especially after an AION 2 client update.',
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
    desc: 'Use the vendor setup notes for Steam or PURPLE. Turn on a conservative ESP and radar profile before joining a live server.',
  },
];

function acquisitionFor(productName: string): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'AION 2 global PC launches through Steam or NC’s PURPLE client. Confirm current compatibility on the status page before you purchase or launch. Overlay options can change after a game update.';

const sharedLimitations =
  'Third-party software in AION 2 can violate the game terms of use and may lead to account action. You use this software at your own risk. Compatibility and availability can change after game or Windows updates without notice.';

const aionSystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Windows 10 or Windows 11 (64-bit).' },
  { icon: 'reqSteam', text: 'AION 2 global client via Steam or PURPLE with current patches applied.' },
  { icon: 'reqSettings', text: 'Administrator access for loader installation and updates.' },
  { icon: 'reqWifi', text: 'Stable internet connection for checkout access and updates.' },
  {
    icon: 'reqCpu',
    text: 'A system that meets AION 2 published hardware requirements. The vendor lists Cloud DMA and an AWS option for isolated delivery.',
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

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements'>
> = {
  'aion-2': {
    images: rankedSlides,
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: aionSystemRequirements,
    fullFeatures: [
      'Soft aim assist',
      'Aim key, FOV, and smoothness',
      'Bone selection (head / chest / closest)',
      'Visible check',
      'Ignore friendly faction',
      'Ignore same party / alliance',
      'Player ESP',
      'Box styles (full / corner)',
      'Skeleton and head circle',
      'Health bar, nameplate, class, and level',
      'Faction (Elyos / Asmodian / Balaur)',
      'Distance and view direction',
      'Flying / grounded state',
      'Out of screen arrows',
      'Aerial target ESP',
      'Flight path markers and altitude readout',
      'Glide / wing state',
      'Sky contested zone highlights',
      'NPC / mob ESP',
      'Elite, world boss, and dungeon boss markers',
      'Quest objective markers',
      'Gathering node ESP',
      'Ore / herb / material filters',
      'Chest / loot object ESP',
      'Portal / instance entrance markers',
      '2D radar with faction color coding',
      'Stream-proof overlay',
      'Combat mode (hide world ESP)',
      'Custom crosshair and ESP colors',
      'Custom menu and panic keys',
      'Saveable configs',
    ],
    overview: {
      title: 'Built around AION 2 information workflow',
      paragraphs: [
        'AION 2 Cheats lists [AION 2 cheats](/store/) for Windows PC: [player ESP](/esp/), [flight markers](/flight/), [gathering nodes](/nodes/), [world and boss information](/world/), [radar](/radar/), and optional [soft aim](/aim/). Enable the overlays you can actually read, then save a config before joining a live server.',
        'The current vendor listing is the global PC client on Steam or PURPLE. Treat compatibility as something to re-check on the [status page](/status/) after every game update rather than a permanent label. [Setup notes](/setup/) cover the Windows PC order.',
      ],
    },
  },
};

function buildTierPages(): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = 'aion-2';
    const content = productContent[slug];
    return {
      slug,
      kind: 'tier',
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
          text: 'AION 2 rewards awareness in three dimensions. Knowing which faction is nearby, whether a target is flying, and how far a world boss stands matters before you commit. AION 2 Cheats groups those information modules on one [store](/store/) page, with a longer breakdown on [features](/features/) and [preview](/preview/).',
        },
        { type: 'h2', text: 'What is listed' },
        {
          type: 'p',
          text: 'The current product listing includes [player ESP](/esp/), [flight and aerial markers](/flight/), [gathering node ESP](/nodes/), [world and boss information](/world/), [2D radar](/radar/), and [soft aim](/aim/). Full farming bots and quest automation are not listed, so this site does not claim them. See the [FAQ](/faq/) if you are unsure what is included.',
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
          text: 'Windows 10 or 11, the global Steam or PURPLE client, and a machine that can run AION 2. The vendor also lists Cloud DMA and an AWS option, plus HVCI, core isolation, TPM, and Secure Boot left on. Confirm those notes on the [setup](/setup/) and [status](/status/) pages before you pay.',
        },
      ],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
}

export const productPages: ProductPage[] = [...buildTierPages()];

export const cheatPages = productPages.filter((p) => p.kind === 'tier');

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
    'AION 2 Cheats plans for AION 2 on Windows PC. Compare monthly and lifetime options, review available features, and visit checkout for current pricing.',
  buyUrl: checkoutPath('aion'),
};
