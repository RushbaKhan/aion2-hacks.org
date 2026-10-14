import type { IconName } from '../components/icons/types';

export const featureIcons: Record<string, IconName> = {
  ESP: 'featureEsp',
  'Player ESP': 'comparePlayerEsp',
  'Soft Aim': 'featureAimbot',
  'Flight Markers': 'featureRadar',
  'World Info': 'compareRuneTimer',
  'Gathering Nodes': 'lootEsp',
  'Overlay Options': 'featureEsp',
  Radar: 'featureRadar',
  Configuration: 'compareCloudBackup',
  Compatibility: 'whyShield',
};

export const whyUsIcons: IconName[] = ['whyShield', 'whyUsers', 'whyMonitor', 'whyHeadphones'];

export const setupStepIcons: IconName[] = ['acqPackage', 'acqSettings', 'acqCheck'];

export const toolkitIcons: Record<string, IconName> = {
  Aim: 'toolkitCombat',
  Vision: 'toolkitVision',
  Radar: 'toolkitRadar',
  Flight: 'toolkitWeapons',
  World: 'toolkitMovement',
  Profiles: 'toolkitProfiles',
};

export const workflowIcons: IconName[] = [
  'workflowAlert',
  'workflowPackage',
  'workflowSettings',
  'workflowCheck',
];

export const fieldNoteIcons: IconName[] = ['fieldCalendar', 'fieldShield', 'fieldHeadphones'];

export const blogTagIcons: Record<string, IconName> = {
  Guides: 'navBlog',
  Setup: 'settings',
  Features: 'layers',
  Updates: 'refresh',
  Troubleshooting: 'alert',
};

export const forumCategoryIcons: Record<string, IconName> = {
  General: 'messageCircle',
  Features: 'layers',
  Status: 'refresh',
  Plans: 'navProducts',
};

export const heroStatusPills: { icon: IconName; label: string }[] = [
  { icon: 'espActive', label: 'Player ESP' },
  { icon: 'radarOnline', label: 'Radar' },
  { icon: 'lootEsp', label: 'Flight Markers' },
  { icon: 'softAim', label: 'Soft Aim' },
  { icon: 'mapHack', label: 'Node ESP' },
  { icon: 'liveStatus', label: 'Check Status' },
  { icon: 'autoUpdates', label: 'Steam / PURPLE' },
  { icon: 'support247', label: 'Windows PC' },
];

export const heroStatIcons: IconName[] = [
  'heroStatStream',
  'heroStatClock',
  'heroStatUsers',
  'heroStatHeadphones',
];

export const cheatTierIcons: Record<string, IconName> = {
  'AION 2 Cheats': 'tierPro',
  Lite: 'tierLite',
  Pro: 'tierPro',
  Elite: 'tierElite',
};

export const productCategoryIcons: Record<string, IconName> = {
  'Core product': 'coreProduct',
  'External suite': 'externalSuite',
  'DMA hardware': 'dmaHardware',
  'System utility': 'systemUtility',
  'Account recovery': 'accountRecovery',
  Cosmetic: 'cosmetic',
};

export const acquisitionStepIcons: IconName[] = ['acqPackage', 'acqSettings', 'acqZap', 'acqCheck'];

/** After-purchase timeline on product detail — one distinct icon per step */
export const productAcquisitionStepIcons: IconName[] = [
  'liveStatus',
  'acqPackage',
  'headphones',
  'acqCheck',
];

/** Product detail requirement tiles — prefer compat-style icons where mapped */
export const productRequirementIcons: Partial<Record<IconName, IconName>> = {
  reqWindows: 'compatWindows',
  reqSteam: 'compatSteam',
  reqSettings: 'compatPackage',
  reqWifi: 'compatWifi',
  reqCpu: 'compatMonitor',
  reqRestorePoint: 'compatRefresh',
  reqShieldGuide: 'compatShield',
  reqMailOrder: 'mail',
  reqShieldAccount: 'compatShield',
  reqWifiPortal: 'compatWifi',
};

export function requirementDisplayIcon(icon: IconName): IconName {
  return productRequirementIcons[icon] ?? icon;
}

export const compatibilityIcons: IconName[] = [
  'compatWindows',
  'compatPackage',
  'compatSteam',
  'compatMonitor',
  'compatRefresh',
  'compatWifi',
  'compatDiscord',
  'compatShield',
];
