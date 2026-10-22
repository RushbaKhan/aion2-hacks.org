export interface ScreenshotShot {
  key: 'garden' | 'lab' | 'plaza' | 'outpost' | 'wilds';
  file: string;
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
  palette: 'crimson-garden' | 'void-lab' | 'ember-plaza' | 'dusk-outpost' | 'wilds-hunt';
}

export interface ExtraShot {
  src: string;
  file: string;
  alt: string;
  caption: string;
  captionDesc: string;
  palette: 'cloud-dma' | 'hwid-spoofer';
}

const gameplay = '/images/gameplay';
const extras = '/images/extras';

export const SCREENSHOT_WIDTH = 3840;
export const SCREENSHOT_HEIGHT = 2160;

/**
 * Display order alternates outdoor crimson, dark interiors, and earth-tone combat
 * so no two similar colors sit next to each other in sliders or grids.
 */
export const SCREENSHOT_RANK: ScreenshotShot[] = [
  {
    key: 'garden',
    file: 'aion-garden.jpg',
    src: `${gameplay}/aion-garden.jpg`,
    palette: 'crimson-garden',
    alt: 'Aion 2 wooden walkway through red blooms at Safehaven with nearby players and a training scarecrow',
    caption: 'Safehaven walkway',
    captionDesc: 'Open-world path with player nameplates and a training dummy in the red garden.',
  },
  {
    key: 'lab',
    file: 'aion-lab.jpg',
    src: `${gameplay}/aion-lab.jpg`,
    palette: 'void-lab',
    alt: 'Aion 2 Daeva bio-research base with swarming enemies and cooldown skill readouts',
    caption: 'Research base combat',
    captionDesc: 'Indoor swarm fight with skill cooldown and target information on screen.',
  },
  {
    key: 'plaza',
    file: 'aion-plaza.jpg',
    src: `${gameplay}/aion-plaza.jpg`,
    palette: 'ember-plaza',
    alt: 'Aion 2 training scarecrow fight on a wooden plaza surrounded by red flowers',
    caption: 'Training plaza',
    captionDesc: 'Close combat on the wooden platform with impact effects and nearby players.',
  },
  {
    key: 'outpost',
    file: 'aion-outpost.jpg',
    src: `${gameplay}/aion-outpost.jpg`,
    palette: 'dusk-outpost',
    alt: 'Aion 2 dark Cohto outpost corridor with security modules and named NPCs',
    caption: 'Outpost corridor',
    captionDesc: 'Dim interior with NPC labels, quest markers, and a live objective path.',
  },
  {
    key: 'wilds',
    file: 'aion-wilds.jpg',
    src: `${gameplay}/aion-wilds.jpg`,
    palette: 'wilds-hunt',
    alt: 'Aion 2 open-field hunt against Executioner Nemok with a recovery totem and minimap',
    caption: 'Open-field hunt',
    captionDesc: 'Outdoor combat with a named enemy, totem support, and map information.',
  },
];

export const EXTRA_SHOTS = {
  dma: {
    src: `${extras}/cloud-dma.jpg`,
    file: 'cloud-dma.jpg',
    palette: 'cloud-dma',
    alt: 'Cloud DMA extra for Aion 2 Hacks on Windows PC',
    caption: 'Cloud DMA',
    captionDesc: 'Cloud DMA extra listed alongside Aion 2 Hacks.',
  },
  hwid: {
    src: `${extras}/spoofer.jpg`,
    file: 'spoofer.jpg',
    palette: 'hwid-spoofer',
    alt: 'HWID Spoofer extra for Aion 2 Hacks on Windows PC',
    caption: 'HWID Spoofer',
    captionDesc: 'HWID Spoofer extra listed alongside Aion 2 Hacks.',
  },
} as const satisfies Record<'dma' | 'hwid', ExtraShot>;

const ALT_BY_FILE = Object.fromEntries([
  ...SCREENSHOT_RANK.map((shot) => [shot.file, shot.alt]),
  ...Object.values(EXTRA_SHOTS).map((shot) => [shot.file, shot.alt]),
]);
const ALT_BY_SRC = Object.fromEntries([
  ...SCREENSHOT_RANK.map((shot) => [shot.src, shot.alt]),
  ...Object.values(EXTRA_SHOTS).map((shot) => [shot.src, shot.alt]),
]);
const PALETTE_BY_SRC = Object.fromEntries([
  ...SCREENSHOT_RANK.map((shot) => [shot.src, shot.palette]),
  ...Object.values(EXTRA_SHOTS).map((shot) => [shot.src, shot.palette]),
]);

export function screenshotAlt(src: string, fallback = 'Aion 2 gameplay screenshot from Aion 2 Hacks'): string {
  if (!src) return fallback;
  const file = src.split('/').pop()?.replace(/-\d+\.webp$/i, '') ?? '';
  const withExt = file.includes('.') ? file : `${file}.jpg`;
  return ALT_BY_SRC[src] ?? ALT_BY_FILE[withExt] ?? ALT_BY_FILE[`${file}.jpg`] ?? fallback;
}

export function screenshotPalette(src: string): string {
  return PALETTE_BY_SRC[src] ?? src;
}

export function screenshotByRank(index = 0): ScreenshotShot {
  return SCREENSHOT_RANK[index] ?? SCREENSHOT_RANK[0]!;
}

export function screenshotForIndex(index: number): ScreenshotShot {
  return SCREENSHOT_RANK[index % SCREENSHOT_RANK.length]!;
}
