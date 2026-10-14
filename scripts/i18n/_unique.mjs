import fs from 'node:fs';

const still = JSON.parse(fs.readFileSync(new URL('./_still.json', import.meta.url), 'utf8'));
const stripMd = (s) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
const md = still.filter((k) => /\[[^\]]+\]\([^)]+\)/.test(k));
const strippedOfMd = new Set(md.map(stripMd));
const unique = still.filter((k) => !strippedOfMd.has(k) || /\[[^\]]+\]\([^)]+\)/.test(k));
console.log('unique to author', unique.length, 'auto-derived', still.length - unique.length);
fs.writeFileSync(new URL('./_unique.json', import.meta.url), JSON.stringify(unique, null, 2));
const de = JSON.parse(fs.readFileSync(new URL('./de.json', import.meta.url), 'utf8'));
fs.writeFileSync(
  new URL('./_unique-with-de.json', import.meta.url),
  JSON.stringify(
    unique.map((k) => ({ en: k, de: de[k] || '', n: k.length })),
    null,
    2,
  ),
);
