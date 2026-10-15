import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const src = fs.readFileSync(path.join(root, 'src/data/blog/posts.ts'), 'utf8');
const keys = new Set();
const re = /(['"])((?:\\.|(?!\1).){1,})\1/g;
let match;
while ((match = re.exec(src))) {
  const value = match[2]
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\n/g, '\n')
    .trim();
  if (value.length < 4) continue;
  if (/^\/images\//.test(value) || /\.(jpg|png|webp)$/i.test(value)) continue;
  if (/^[a-z0-9-]+$/.test(value) && value.length < 24) continue;
  keys.add(value);
  const stripped = value.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
  if (stripped && stripped !== value) keys.add(stripped);
}
const arr = [...keys];
fs.writeFileSync(path.join(root, 'scripts/i18n/_blog-keys.json'), JSON.stringify(arr, null, 2) + '\n');
console.log('unique', arr.length);
console.log('chars', arr.reduce((a, b) => a + b.length, 0));
console.log('<=80', arr.filter((k) => k.length <= 80).length);
console.log('81-220', arr.filter((k) => k.length > 80 && k.length <= 220).length);
console.log('>220', arr.filter((k) => k.length > 220).length);
