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
  'the-isle-hacks': [
    'the-isle-hacks-evrima',
    'the-isle-player-esp',
    'the-isle-dinosaur-esp',
    'the-isle-health-esp',
    'the-isle-radar-features',
    'the-isle-aimbot',
    'the-isle-hacks-pc-setup',
    'the-isle-compatibility-eac',
    'the-isle-esp-terminology',
    'the-isle-monthly-vs-lifetime',
  ],
};

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Open the status page on islehacks.com before you buy—especially after an Evrima or Easy Anti-Cheat update.',
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
    desc: 'Use the vendor setup notes for the Evrima branch. Turn on a conservative ESP and radar profile before joining a live server.',
  },
];

function acquisitionFor(productName: string): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'The Isle Evrima launches through Easy Anti-Cheat. Confirm current compatibility on the status page before you purchase or launch. Overlay options can change after a game or anti-cheat update.';

const sharedLimitations =
  'Third-party software in The Isle can violate the game terms of use and may lead to account action. You use this software at your own risk. Compatibility and availability can change after game, Easy Anti-Cheat, or Windows updates without notice.';

const isleSystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Windows 10 or Windows 11 (64-bit).' },
  { icon: 'reqSteam', text: 'The Isle Evrima branch via Steam with current patches applied.' },
  { icon: 'reqSettings', text: 'Administrator access for loader installation and updates.' },
  { icon: 'reqWifi', text: 'Stable internet connection for checkout access and updates.' },
  { icon: 'reqCpu', text: 'A system that meets The Isle published hardware requirements. The vendor lists Cloud DMA as required for full functionality.' },
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
  'the-isle-hacks': {
    images: rankedSlides,
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: isleSystemRequirements,
    fullFeatures: [
      'Aim assistance',
      'Player ESP',
      'Box ESP',
      'Name ESP',
      'Distance ESP',
      'Health ESP',
      'Dinosaur ESP / animal ESP',
      'Species, growth, and stamina info',
      'NPC ESP',
      'Corpse markers',
      'Player direction',
      'Head dot',
      'Visible check',
      'Snaplines',
      'Resource ESP (fruit and water)',
      'Gore markers',
      'Radar',
      'Max distance filter',
      'Custom ESP colors',
      'Custom menu and panic keys',
      'Crosshair and fullbright options',
      'HUD extras (FPS, resolution, time)',
      'Saveable configs',
      'English and Russian menus',
    ],
    overview: {
      title: 'Built around The Isle information workflow',
      paragraphs: [
        'Isle Hacks lists [The Isle hacks](/store/) for Windows PC: [player ESP](/the-isle-player-esp/), [dinosaur ESP](/the-isle-dinosaur-esp/), [health information](/the-isle-health-esp/), resource markers, [radar](/the-isle-radar-features/), and optional [aim assistance](/the-isle-aimbot/). Enable the overlays you can actually read, then save a config before joining a live Evrima server.',
        'The current vendor listing is Evrima-only. The Isle uses Easy Anti-Cheat, so treat compatibility as something to re-check on the [status page](/status/) after every game update rather than a permanent label. [Setup notes](/setup/) cover the Windows PC order.',
      ],
    },
  },
};

function buildTierPages(): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = 'the-isle-hacks';
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
          text: 'The Isle rewards awareness. Knowing which player or dinosaur is nearby, how healthy a threat is, and how far a target stands matters before you commit to a fight. Isle Hacks groups those information modules on one [store](/store/) page, with a longer breakdown on [features](/features/) and [preview](/preview/).',
        },
        { type: 'h2', text: 'What is listed' },
        {
          type: 'p',
          text: 'The current product listing includes [player ESP](/the-isle-player-esp/), [dinosaur ESP](/the-isle-dinosaur-esp/), [health and growth information](/the-isle-health-esp/), resource markers, [radar](/the-isle-radar-features/), and [aim assistance](/the-isle-aimbot/). Silent aim, triggerbot, and skeleton ESP are not listed, so this site does not claim them. See the [FAQ](/faq/) if you are unsure what is included.',
        },
      ],
      body: [
        { type: 'h2', text: 'Plans' },
        {
          type: 'p',
          text: 'Monthly access is $35 for 30 days (P30D). Lifetime access is $150 (P99Y). Both plans are priced in USD and use the same listed feature set. Compare them here, then read [monthly vs lifetime](/the-isle-monthly-vs-lifetime/) if you still need a short trial vs long access.',
        },
        { type: 'h2', text: 'Requirements' },
        {
          type: 'p',
          text: 'Windows 10 or 11, the Evrima branch, and a machine that can run The Isle. The vendor also lists Cloud DMA as required for full functionality, plus HVCI, core isolation, TPM, and Secure Boot left on. Confirm those notes on the [setup](/setup/) and [status](/status/) pages before you pay.',
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
    'Isle Hacks plans for The Isle on Windows PC. Compare monthly and lifetime options, review available features, and visit checkout for current pricing.',
  buyUrl: checkoutPath('isle'),
};
