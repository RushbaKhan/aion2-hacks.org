export interface ScreenshotShot {
  key: 'gpAim' | 'gpPlayer' | 'gpSwim' | 'gpRadar' | 'gpPack' | 'gpSnaplines' | 'gpCombat' | 'gpJungle';
  file: string;
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

const gameplay = '/images/gameplay';

/** Priority rank used by every gallery, hero, and card on the site. */
export const SCREENSHOT_RANK: ScreenshotShot[] = [
  {
    key: 'gpAim',
    file: 'isle-reeds-aim.jpg',
    src: `${gameplay}/isle-reeds-aim.jpg`,
    alt: 'Isle Hacks aim assistance reticles locked on Utahraptor targets in the reeds on The Isle Evrima',
    caption: 'Aim assistance',
    captionDesc: 'Optional aim assistance over listed ESP targets.',
  },
  {
    key: 'gpPlayer',
    file: 'isle-player-esp.jpg',
    src: `${gameplay}/isle-player-esp.jpg`,
    alt: 'Isle Hacks player ESP red silhouette and snaplines beside a dinosaur in a forest clearing',
    caption: 'Player ESP',
    captionDesc: 'Player silhouette, boxes, and snaplines on nearby survivors.',
  },
  {
    key: 'gpSwim',
    file: 'isle-water-swim.jpg',
    src: `${gameplay}/isle-water-swim.jpg`,
    alt: 'Isle Hacks overlay while swimming in clear water toward a distant dinosaur on The Isle Evrima',
    caption: 'Open-water view',
    captionDesc: 'A quieter overlay while crossing water on Evrima.',
  },
  {
    key: 'gpRadar',
    file: 'isle-forest-radar.jpg',
    src: `${gameplay}/isle-forest-radar.jpg`,
    alt: 'Isle Hacks snaplines and radar overlay in a forest with nearby dinosaur markers',
    caption: 'Radar awareness',
    captionDesc: 'Radar and nearby-entity cues for rotations on Evrima servers.',
  },
  {
    key: 'gpPack',
    file: 'isle-beach-pack.jpg',
    src: `${gameplay}/isle-beach-pack.jpg`,
    alt: 'Isle Hacks dinosaur ESP labels on a beach with multiple nearby creatures',
    caption: 'Dinosaur ESP',
    captionDesc: 'Species and distance labels on nearby dinosaurs.',
  },
  {
    key: 'gpSnaplines',
    file: 'isle-beach-snaplines.jpg',
    src: `${gameplay}/isle-beach-snaplines.jpg`,
    alt: 'Isle Hacks snaplines and distant ESP labels across an open beach on The Isle Evrima',
    caption: 'Snaplines and distance',
    captionDesc: 'Long-range markers on nearby players and dinosaurs.',
  },
  {
    key: 'gpCombat',
    file: 'isle-combat-health.jpg',
    src: `${gameplay}/isle-combat-health.jpg`,
    alt: 'Isle Hacks health, stamina, and growth readout during a close dinosaur fight',
    caption: 'Health information',
    captionDesc: 'Health, stamina, and growth fields when the current build includes them.',
  },
  {
    key: 'gpJungle',
    file: 'isle-jungle-close.jpg',
    src: `${gameplay}/isle-jungle-close.jpg`,
    alt: 'Isle Hacks nearby-entity marker on a jungle trail in The Isle Evrima',
    caption: 'Nearby creature markers',
    captionDesc: 'Close-range species and distance cues through foliage.',
  },
];

const ALT_BY_FILE = Object.fromEntries(SCREENSHOT_RANK.map((shot) => [shot.file, shot.alt]));
const ALT_BY_SRC = Object.fromEntries(SCREENSHOT_RANK.map((shot) => [shot.src, shot.alt]));

export function screenshotAlt(src: string, fallback = 'The Isle overlay screenshot from Isle Hacks'): string {
  if (!src) return fallback;
  const file = src.split('/').pop()?.replace(/-\d+\.webp$/i, '') ?? '';
  const withExt = file.includes('.') ? file : `${file}.jpg`;
  return ALT_BY_SRC[src] ?? ALT_BY_FILE[withExt] ?? ALT_BY_FILE[`${file}.jpg`] ?? fallback;
}

export function screenshotByRank(index = 0): ScreenshotShot {
  return SCREENSHOT_RANK[index] ?? SCREENSHOT_RANK[0]!;
}
