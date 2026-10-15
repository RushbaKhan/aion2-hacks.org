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
  if (/^\/[\w\-./]*$/.test(trimmed)) return;
  if (trimmed === './types') return;
  const plain = strip(trimmed);
  if (!plain) return;
  if (plain.length < 8 && !extra.includes(plain)) return;
  keys.add(plain);
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

const postChunks = src.split(/slug:\s*["']/);
const posts = [];
for (let i = 1; i < postChunks.length; i += 1) {
  const chunk = postChunks[i];
  const slug = chunk.match(/^([^"']+)/)?.[1];
  if (!slug) continue;
  const keys = new Set(extra);
  const quoted = /(?:text|title|desc|readTime|date|tag):\s*(['"])((?:\\.|(?!\1).)*)\1/g;
  let match;
  while ((match = quoted.exec(chunk))) add(keys, match[2].replace(/\\'/g, "'").replace(/\\"/g, '"'));
  const itemRe = /items:\s*\[([^\]]*)\]/g;
  while ((match = itemRe.exec(chunk))) {
    const itemQuoted = /(['"])((?:\\.|(?!\1).)*)\1/g;
    let item;
    while ((item = itemQuoted.exec(match[1]))) add(keys, item[2].replace(/\\'/g, "'").replace(/\\"/g, '"'));
  }
  const tableRe = /(?:headers|rows):\s*(\[[\s\S]*?\])/g;
  while ((match = tableRe.exec(chunk))) {
    const cellQuoted = /(['"])((?:\\.|(?!\1).)*)\1/g;
    let cell;
    while ((cell = cellQuoted.exec(match[1]))) add(keys, cell[2].replace(/\\'/g, "'").replace(/\\"/g, '"'));
  }
  posts.push({ slug, keys: [...keys] });
}

const ja = JSON.parse(fs.readFileSync(path.join(root, 'public/locales/ja.json'), 'utf8'));
const all = new Set(extra);
for (const post of posts) for (const key of post.keys) all.add(key);
const unique = [...all].sort((a, b) => a.length - b.length || a.localeCompare(b));
const missing = unique.filter((key) => !ja[key]);

const groups = [
  ['cheats', 'esp', 'aim', 'hero', 'radar', 'obj'],
  ['pc', 'ac', 'plans', 'ow2', 'heroes', 'ranks'],
  ['patch', 'skins', 'dva', 'juno', 'tier', 'cross'],
  ['reddit', 'blizzard', 'vendetta', 'domina', 'mizuki', 'art'],
];

const outDir = path.join(root, 'scripts/i18n/blog-batches');
fs.mkdirSync(outDir, { recursive: true });

const assigned = new Set();
groups.forEach((slugs, index) => {
  const keys = new Set(extra);
  for (const post of posts) {
    if (!slugs.includes(post.slug)) continue;
    for (const key of post.keys) {
      if (!ja[key]) keys.add(key);
    }
  }
  const arr = [...keys].sort((a, b) => a.length - b.length || a.localeCompare(b));
  for (const key of arr) assigned.add(key);
  fs.writeFileSync(path.join(outDir, `batch-${index + 1}.json`), JSON.stringify(arr, null, 2) + '\n');
  console.log(`batch-${index + 1}`, slugs.join(','), arr.length, 'keys');
});

const leftover = missing.filter((key) => !assigned.has(key));
fs.writeFileSync(path.join(outDir, 'all-missing.json'), JSON.stringify(missing, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'public/locales/_en-blog-keys.json'), JSON.stringify(unique, null, 2) + '\n');
console.log('posts', posts.length, 'unique', unique.length, 'missing', missing.length, 'unassigned', leftover.length);
