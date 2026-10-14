/**
 * Spot-check locale quality: leaked CJK, mashed words, empty values.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const localesDir = path.join(dir, '../../public/locales');
const LANGS = ['de', 'fr', 'es', 'pt', 'ru', 'ja', 'ko', 'zh', 'zh-TW', 'he', 'tr', 'ar', 'vi', 'pl'];
const NO_CJK = new Set(['de', 'fr', 'es', 'pt', 'ru', 'he', 'tr', 'ar', 'vi', 'pl']);
const CJK = /[\u4e00-\u9fff]/;
const MASH = /[A-Za-zÀ-ÿ]{3,}[A-ZÀ-Ý][a-zà-ÿ]{2,}/;
const FEATURES = [
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

let issues = 0;
for (const lang of LANGS) {
  const dict = JSON.parse(fs.readFileSync(path.join(localesDir, `${lang}.json`), 'utf8'));
  const keys = Object.keys(dict);
  console.log(`\n=== ${lang} ${keys.length} ===`);
  for (const title of FEATURES) {
    console.log(`  ${title} → ${dict[title]}`);
  }
  for (const [k, v] of Object.entries(dict)) {
    if (!v || !String(v).trim()) {
      console.log(`  EMPTY: ${k.slice(0, 80)}`);
      issues += 1;
    }
    if (NO_CJK.has(lang) && CJK.test(v)) {
      console.log(`  CJK leak: ${k.slice(0, 60)} => ${v.slice(0, 80)}`);
      issues += 1;
    }
    if (MASH.test(v) && !MASH.test(k) && !/ESP|AION|USD|HVCI|AWS|TPM/.test(v)) {
      console.log(`  mash?: ${v.slice(0, 80)}`);
      issues += 1;
    }
  }
}
console.log(`\nissues ${issues}`);
