import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const src = fs.readFileSync(path.join(root, 'src/data/blog/posts.ts'), 'utf8');

function strip(text) {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\s+/g, ' ').trim();
}

function add(keys, value) {
  if (typeof value !== 'string') return;
  const trimmed = value.replace(/\\n/g, '\n').trim();
  if (trimmed.length < 2) return;
  keys.add(trimmed);
  const plain = strip(trimmed);
  if (plain && plain !== trimmed) keys.add(plain);
}

const keys = new Set();
const quoted = /(?:text|title|desc|readTime|date|tag):\s*(['"])((?:\\.|(?!\1).)*)\1/g;
let match;
while ((match = quoted.exec(src))) add(keys, match[2].replace(/\\'/g, "'").replace(/\\"/g, '"'));

const itemRe = /items:\s*\[([^\]]*)\]/g;
while ((match = itemRe.exec(src))) {
  const inner = match[1];
  const itemQuoted = /(['"])((?:\\.|(?!\1).)*)\1/g;
  let item;
  while ((item = itemQuoted.exec(inner))) add(keys, item[2].replace(/\\'/g, "'").replace(/\\"/g, '"'));
}

const tableRe = /(?:headers|rows):\s*(\[[\s\S]*?\])/g;
while ((match = tableRe.exec(src))) {
  const cellQuoted = /(['"])((?:\\.|(?!\1).)*)\1/g;
  let cell;
  while ((cell = cellQuoted.exec(match[1]))) add(keys, cell[2].replace(/\\'/g, "'").replace(/\\"/g, '"'));
}

const extra = [
  'In this article',
  'Related guides',
  'Our products',
  'Reviews',
  'Article sidebar',
  'Table of contents',
  'Continue reading',
  'More articles',
  'Overwatch store',
  'Review Overwatch Cheats plans',
  'Compare monthly and lifetime Overwatch Cheats access for Overwatch 2 on the store page, then continue to checkout for current pricing.',
];
for (const item of extra) add(keys, item);

const arr = [...keys].sort((a, b) => a.length - b.length || a.localeCompare(b));
const outDir = path.join(root, 'public/locales');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, '_en-blog-keys.json'), JSON.stringify(arr, null, 2) + '\n');
console.log('blog keys', arr.length);
console.log('short', arr.filter((k) => k.length <= 90).length);
console.log('long', arr.filter((k) => k.length > 90).length);
