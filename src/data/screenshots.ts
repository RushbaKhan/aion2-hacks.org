export interface ScreenshotShot {
  key: 'gpLab' | 'gpCombat' | 'gpRadar' | 'gpSnaplines' | 'gpPlayer' | 'gpDungeon' | 'gpFlight';
  file: string;
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
  palette: 'lab' | 'red-combat' | 'map' | 'snap' | 'red-esp' | 'dungeon' | 'flight';
}

const gameplay = '/images/gameplay';

/**
 * Display order: priority (lab, combat, radar, snaplines) then remaining,
 * interleaved so adjacent shots never share a scene/palette.
 */
export const SCREENSHOT_RANK: ScreenshotShot[] = [
  {
    key: 'gpLab',
    file: 'aion2-lab-combat.jpg',
    src: `${gameplay}/aion2-lab-combat.jpg`,
    palette: 'lab',
    alt: 'AION 2 Cheats combat ESP and nameplates inside a Daeva bio-research instance',
    caption: 'Instance combat',
    captionDesc: 'Nameplates, health, and skill readouts on nearby enemies in a dark instance.',
  },
  {
    key: 'gpCombat',
    file: 'aion2-safehaven-combat.jpg',
    src: `${gameplay}/aion2-safehaven-combat.jpg`,
    palette: 'red-combat',
    alt: 'AION 2 Cheats overlay during close combat on the Safehaven training grounds',
    caption: 'Combat overlay',
    captionDesc: 'Damage and target readouts while fighting on the wooden platform.',
  },
  {
    key: 'gpRadar',
    file: 'aion2-radar-map.jpg',
    src: `${gameplay}/aion2-radar-map.jpg`,
    palette: 'map',
    alt: 'AION 2 Cheats 2D radar map and skeleton ESP on a world boss',
    caption: 'Radar and skeleton',
    captionDesc: 'Local map plus skeleton ESP on Executioner Nemok.',
  },
  {
    key: 'gpSnaplines',
    file: 'aion2-snaplines.jpg',
    src: `${gameplay}/aion2-snaplines.jpg`,
    palette: 'snap',
    alt: 'AION 2 Cheats long-range snaplines and world markers across open terrain',
    caption: 'Distance and direction',
    captionDesc: 'Snaplines and world labels toward distant objectives.',
  },
  {
    key: 'gpPlayer',
    file: 'aion2-player-esp.jpg',
    src: `${gameplay}/aion2-player-esp.jpg`,
    palette: 'red-esp',
    alt: 'AION 2 Cheats player ESP showing nearby Daeva nameplates and distance',
    caption: 'Player ESP',
    captionDesc: 'Nameplates, class, and distance on nearby players.',
  },
  {
    key: 'gpDungeon',
    file: 'aion2-dungeon-quest.jpg',
    src: `${gameplay}/aion2-dungeon-quest.jpg`,
    palette: 'dungeon',
    alt: 'AION 2 Cheats world and quest markers inside a dark AION 2 outpost',
    caption: 'World markers',
    captionDesc: 'NPC, quest, and objective labels in a dungeon corridor.',
  },
  {
    key: 'gpFlight',
    file: 'aion2-flight-view.jpg',
    src: `${gameplay}/aion2-flight-view.jpg`,
    palette: 'flight',
    alt: 'AION 2 Cheats flight view with a winged Daeva over Safehaven',
    caption: 'Flight view',
    captionDesc: 'Aerial camera with overlay distance on a flying target.',
  },
];

const ALT_BY_FILE = Object.fromEntries(SCREENSHOT_RANK.map((shot) => [shot.file, shot.alt]));
const ALT_BY_SRC = Object.fromEntries(SCREENSHOT_RANK.map((shot) => [shot.src, shot.alt]));
const PALETTE_BY_SRC = Object.fromEntries(SCREENSHOT_RANK.map((shot) => [shot.src, shot.palette]));

export function screenshotAlt(src: string, fallback = 'AION 2 overlay screenshot from AION 2 Cheats'): string {
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
