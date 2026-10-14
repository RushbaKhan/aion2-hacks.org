import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lang = process.argv[2];
if (!lang) {
  console.error('Usage: node scripts/i18n/_write-json.mjs <lang>');
  process.exit(1);
}
const mod = await import(pathToFileURL(path.join(dir, `_${lang}.mjs`)).href);
const dict = mod.default;
const dest = path.join(dir, `${lang}.json`);
fs.writeFileSync(dest, JSON.stringify(dict, null, 2) + '\n');
console.log(`Wrote ${Object.keys(dict).length} keys → ${dest}`);
