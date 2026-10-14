/**
 * Write scripts/i18n/{lang}.json for every non-English locale from packed rows.
 * Each row is [fr, es, pt, ru, ja, ko, zh, zh-TW, he, tr, ar, vi, pl]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const LANGS = ['fr', 'es', 'pt', 'ru', 'ja', 'ko', 'zh', 'zh-TW', 'he', 'tr', 'ar', 'vi', 'pl'];

const keys = JSON.parse(fs.readFileSync(path.join(dir, '../..', 'public/locales/_en-keys.json'), 'utf8'));
const packs = ['rows.mjs', 'rest-pack.mjs', 'rest-pack-2.mjs', 'rest-pack-3.mjs'];
const ROWS = {};
for (const file of packs) {
  const src = path.join(dir, file);
  if (!fs.existsSync(src)) continue;
  const mod = await import(pathToFileURL(src).href);
  Object.assign(ROWS, mod.ROWS);
}

if (Object.keys(ROWS).length !== keys.length) {
  const missing = keys.filter((k) => !ROWS[k]);
  console.warn(`rows has ${Object.keys(ROWS).length}/${keys.length} keys; missing ${missing.length}`);
  for (const k of missing.slice(0, 12)) console.warn('  -', k.slice(0, 100));
}

for (const [i, lang] of LANGS.entries()) {
  const out = {};
  let filled = 0;
  for (const key of keys) {
    const row = ROWS[key];
    if (row?.[i]) {
      out[key] = row[i];
      filled += 1;
    }
  }
  fs.writeFileSync(path.join(dir, `${lang}.json`), JSON.stringify(out, null, 2) + '\n');
  console.log(`${lang}: ${filled} keys`);
}
