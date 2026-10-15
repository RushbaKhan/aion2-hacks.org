export interface ScreenshotShot {
  key:
    | 'ow2'
    | 'ow7'
    | 'ow3'
    | 'ow1'
    | 'owHanzo'
    | 'ow8'
    | 'ow4'
    | 'ow9'
    | 'ow6'
    | 'ow5'
    | 'ow2gothic';
  file: string;
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
  palette: 'temple-aim' | 'havana-ashe' | 'cassidy-cyan' | 'kiriko-menu' | 'hanzo-green' | 'yellow-esp';
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

export const SCREENSHOT_WIDTH = 1024;
export const SCREENSHOT_HEIGHT = 574;

/**
 * Display order: priority 1–5 first, then remaining shots interleaved
 * so adjacent slider/thumb items never share a map/hero/palette.
 * Havana Ashe = ow-7/ow-8/ow-6; Cassidy cyan = ow-3/ow-4/ow-5; yellow ESP = ow-9/ow-2.
 */
export const SCREENSHOT_RANK: ScreenshotShot[] = [
  {
    key: 'ow2',
    file: 'ow2.jpg',
    src: `${gameplay}/ow2.jpg`,
    palette: 'temple-aim',
    alt: 'Overwatch 2 aim overlay during overtime in a close indoor fight',
    caption: 'Close fight',
    captionDesc: 'Target boxes and combat readouts in a contested indoor fight.',
  },
  {
    key: 'ow7',
    file: 'ow-7.jpg',
    src: `${gameplay}/ow-7.jpg`,
    palette: 'havana-ashe',
    alt: 'Overwatch 2 skeleton ESP and health bars during a Havana night fight',
    caption: 'Combat overlay',
    captionDesc: 'Skeleton ESP and health readouts on nearby enemies.',
  },
  {
    key: 'ow3',
    file: 'ow-3.jpg',
    src: `${gameplay}/ow-3.jpg`,
    palette: 'cassidy-cyan',
    alt: 'Overwatch 2 player ESP boxes, health, and outlines on a night payload map',
    caption: 'Player ESP',
    captionDesc: 'Nameplates, health, and outlines on nearby players.',
  },
  {
    key: 'ow1',
    file: 'ow1.jpg',
    src: `${gameplay}/ow1.jpg`,
    palette: 'kiriko-menu',
    alt: 'Overwatch 2 ESP menu with skeleton and box overlays in an outdoor fight',
    caption: 'ESP modules',
    captionDesc: 'Listed ESP toggles next to in-world skeleton and box overlays.',
  },
  {
    key: 'owHanzo',
    file: 'ow-1.jpg',
    src: `${gameplay}/ow-1.jpg`,
    palette: 'hanzo-green',
    alt: 'Overwatch 2 distance ESP, health labels, and objective markers from high ground',
    caption: 'Distance and direction',
    captionDesc: 'Distance ESP and objective labels toward a payload fight.',
  },
  {
    key: 'ow8',
    file: 'ow-8.jpg',
    src: `${gameplay}/ow-8.jpg`,
    palette: 'havana-ashe',
    alt: 'Overwatch 2 skeleton ESP stick figures during a Havana street fight',
    caption: 'Skeleton ESP',
    captionDesc: 'Skeleton ESP on enemies across a street fight.',
  },
  {
    key: 'ow4',
    file: 'ow-4.jpg',
    src: `${gameplay}/ow-4.jpg`,
    palette: 'cassidy-cyan',
    alt: 'Overwatch 2 radar outline with health ESP inside a tight corridor',
    caption: 'Radar and skeleton',
    captionDesc: 'Local radar outline plus health ESP on nearby targets.',
  },
  {
    key: 'ow9',
    file: 'ow-9.jpg',
    src: `${gameplay}/ow-9.jpg`,
    palette: 'yellow-esp',
    alt: 'Overwatch 2 wallhack silhouette ESP through a building on King’s Row',
    caption: 'Through-wall ESP',
    captionDesc: 'Silhouette ESP marking an enemy through a wall.',
  },
  {
    key: 'ow6',
    file: 'ow-6.jpg',
    src: `${gameplay}/ow-6.jpg`,
    palette: 'havana-ashe',
    alt: 'Overwatch 2 ESP outlines and health bars while escorting a payload on Havana',
    caption: 'Objective markers',
    captionDesc: 'ESP outlines and health labels around a live payload.',
  },
  {
    key: 'ow5',
    file: 'ow-5.jpg',
    src: `${gameplay}/ow-5.jpg`,
    palette: 'cassidy-cyan',
    alt: 'Overwatch 2 night ESP list with health and ultimate labels on rooftop targets',
    caption: 'High-ground view',
    captionDesc: 'Elevated camera with health and ultimate labels on distant targets.',
  },
  {
    key: 'ow2gothic',
    file: 'ow-2.jpg',
    src: `${gameplay}/ow-2.jpg`,
    palette: 'yellow-esp',
    alt: 'Overwatch 2 yellow ESP blob and skeleton overlays in a gothic interior',
    caption: 'Interior overlay',
    captionDesc: 'ESP fill and skeleton readouts in a tight interior.',
  },
];

export const EXTRA_SHOTS = {
  dma: {
    src: `${extras}/cloud-dma.jpg`,
    file: 'cloud-dma.jpg',
    palette: 'cloud-dma',
    alt: 'Cloud DMA extra for Overwatch Cheats on Windows PC',
    caption: 'Cloud DMA',
    captionDesc: 'Cloud DMA extra that runs with Overwatch Cheats.',
  },
  hwid: {
    src: `${extras}/spoofer.jpg`,
    file: 'spoofer.jpg',
    palette: 'hwid-spoofer',
    alt: 'HWID Spoofer extra for Overwatch Cheats on Windows PC',
    caption: 'HWID Spoofer',
    captionDesc: 'HWID Spoofer extra that runs with Overwatch Cheats.',
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

export function screenshotAlt(src: string, fallback = 'Overwatch overlay screenshot from Overwatch Cheat'): string {
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
