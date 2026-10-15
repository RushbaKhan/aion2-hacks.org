import type { IconName } from '../components/icons/types';

export const featureIcons: Record<string, IconName> = {
  ESP: 'featureEsp',
  Aimbot: 'featureAimbot',
  'Player ESP': 'comparePlayerEsp',
  'Hero ESP': 'compareWardLocator',
  'Ability ESP': 'compareAbilityRadius',
  'Objective ESP': 'compareRuneTimer',
  'Overlay Options': 'featureEsp',
  Radar: 'featureRadar',
  'Team Check': 'compareCloudBackup',
  'Silent Aim': 'featureAimbot',
  Compatibility: 'whyShield',
};

export const whyUsIcons: IconName[] = ['whyShield', 'whyUsers', 'whyMonitor', 'whyHeadphones'];

export const setupStepIcons: IconName[] = ['acqPackage', 'acqSettings', 'acqCheck'];

export const toolkitIcons: Record<string, IconName> = {
  Aim: 'toolkitCombat',
  Vision: 'toolkitVision',
  Radar: 'toolkitRadar',
  Heroes: 'toolkitWeapons',
  Objectives: 'toolkitMovement',
  Filters: 'toolkitProfiles',
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
  { icon: 'lootEsp', label: 'Hero ESP' },
  { icon: 'softAim', label: 'Aimbot' },
  { icon: 'mapHack', label: 'Objective ESP' },
  { icon: 'liveStatus', label: 'Check Status' },
  { icon: 'autoUpdates', label: 'Defense Matrix' },
  { icon: 'support247', label: 'Windows PC' },
];

export const heroStatIcons: IconName[] = [
  'heroStatStream',
  'heroStatClock',
  'heroStatUsers',
  'heroStatHeadphones',
];

export const cheatTierIcons: Record<string, IconName> = {
  'Overwatch Cheat': 'tierPro',
  'Cloud DMA': 'dmaHardware',
  'HWID Spoofer': 'systemUtility',
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
