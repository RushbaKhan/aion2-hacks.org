import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const localesDir = path.join(root, 'public/locales');
const mapDir = path.join(root, 'scripts/i18n');

const LANGS = [
  'de',
  'fr',
  'es',
  'pt',
  'ru',
  'ja',
  'ko',
  'zh',
  'zh-TW',
  'he',
  'tr',
  'ar',
  'vi',
  'pl',
];

const FEATURE_TITLES = [
  'Player ESP',
  'Soft Aim',
  'Flight Markers',
  'World Info',
  'Gathering Nodes',
  'Radar',
  'Overlay Options',
  'Configuration',
  'Compatibility',
];

fs.mkdirSync(localesDir, { recursive: true });

for (const lang of LANGS) {
  const src = path.join(mapDir, `${lang}.json`);
  const dest = path.join(localesDir, `${lang}.json`);
  if (!fs.existsSync(src)) {
    if (!fs.existsSync(dest)) {
      throw new Error(`Missing locale map for ${lang}`);
    }
    continue;
  }
  const dict = JSON.parse(fs.readFileSync(src, 'utf8'));
  const missingTitles = FEATURE_TITLES.filter((title) => !dict[title]);
  if (missingTitles.length) {
    throw new Error(`${lang} missing feature titles: ${missingTitles.join(', ')}`);
  }
  fs.writeFileSync(dest, JSON.stringify(dict, null, 2) + '\n');
  console.log(`${lang}: ${Object.keys(dict).length} keys`);
}
