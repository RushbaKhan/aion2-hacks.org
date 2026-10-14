/**
 * Build scripts/i18n/{lang}.json from packed rows + fill JSON maps.
 * Markdown-link keys also generate a stripped-text sibling key.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const LANGS = ['fr', 'es', 'pt', 'ru', 'ja', 'ko', 'zh', 'zh-TW', 'he', 'tr', 'ar', 'vi', 'pl'];
const keys = JSON.parse(fs.readFileSync(path.join(dir, '../../public/locales/_en-keys.json'), 'utf8'));

const ROWS = {};
const packs = ['rows.mjs', 'rest-pack.mjs', 'rest-pack-2.mjs', 'rest-pack-3.mjs', 'rest-pack-4.mjs'];
for (const file of packs) {
  const src = path.join(dir, file);
  if (!fs.existsSync(src)) continue;
  const mod = await import(pathToFileURL(src).href + `?t=${Date.now()}`);
  Object.assign(ROWS, mod.ROWS);
}

for (const file of fs.readdirSync(dir).filter((f) => /^fill-.*\.json$/.test(f)).sort()) {
  const map = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
  for (const [key, row] of Object.entries(map)) {
    if (Array.isArray(row) && row.length === 13) ROWS[key] = row;
  }
}

function stripMd(s) {
  return s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

for (const [key, row] of Object.entries(ROWS)) {
  if (!/\[[^\]]+\]\([^)]+\)/.test(key)) continue;
  const stripped = stripMd(key);
  if (stripped === key || ROWS[stripped]) continue;
  ROWS[stripped] = row.map((v) => (typeof v === 'string' ? stripMd(v) : v));
}

const report = [];
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
  report.push(`${lang}: ${filled}/${keys.length}`);
}

const missing = keys.filter((k) => !ROWS[k]);
console.log(report.join('\n'));
console.log(`rows ${Object.keys(ROWS).length} · missing ${missing.length}`);
if (missing.length) {
  for (const k of missing.slice(0, 20)) console.log('  -', k.slice(0, 120));
  fs.writeFileSync(path.join(dir, '_still-missing.json'), JSON.stringify(missing, null, 2));
}
