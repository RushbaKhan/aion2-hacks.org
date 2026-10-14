import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const keys = JSON.parse(fs.readFileSync(path.join(dir, '../../public/locales/_en-keys.json'), 'utf8'));
const unique = JSON.parse(fs.readFileSync(path.join(dir, '_unique.json'), 'utf8'));
const ROWS = {};
for (const file of ['rows.mjs', 'rest-pack.mjs', 'rest-pack-2.mjs', 'rest-pack-3.mjs', 'rest-pack-4.mjs']) {
  const src = path.join(dir, file);
  if (!fs.existsSync(src)) continue;
  const mod = await import(pathToFileURL(src).href + `?t=${Date.now()}`);
  Object.assign(ROWS, mod.ROWS);
}
for (const file of fs.readdirSync(dir).filter((f) => /^fill-.*\.json$/.test(f))) {
  Object.assign(ROWS, JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8')));
}
const stripMd = (s) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
for (const [key, row] of Object.entries(ROWS)) {
  if (!/\[[^\]]+\]\([^)]+\)/.test(key)) continue;
  const stripped = stripMd(key);
  if (stripped !== key && !ROWS[stripped]) ROWS[stripped] = row;
}
const missingUnique = unique.filter((k) => !ROWS[k]);
const missingAll = keys.filter((k) => !ROWS[k]);
console.log('unique covered', unique.length - missingUnique.length, '/', unique.length);
console.log('all keys covered', keys.length - missingAll.length, '/', keys.length);
fs.writeFileSync(path.join(dir, '_left.json'), JSON.stringify(missingUnique, null, 2));
console.log('left unique', missingUnique.length);
for (const k of missingUnique.slice(0, 8)) console.log(' -', k.slice(0, 90));
