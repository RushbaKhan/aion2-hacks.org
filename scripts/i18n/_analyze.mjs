import fs from 'node:fs';

const text = fs.readFileSync(new URL('./rest-pack-4.mjs', import.meta.url), 'utf8');
const pack4 = [...text.matchAll(/^  "((?:\\.|[^"])*)":/gm)].map((m) => m[1].replace(/\\"/g, '"'));
const remain = JSON.parse(fs.readFileSync(new URL('./_remain.json', import.meta.url), 'utf8'));
const remainEn = remain.map((x) => x.en);
const still = remainEn.filter((k) => !pack4.includes(k));
console.log('pack4 keys', pack4.length);
console.log('still after pack4', still.length);
const short = still.filter((k) => k.length <= 90);
const mid = still.filter((k) => k.length > 90 && k.length <= 200);
const long = still.filter((k) => k.length > 200);
console.log('short', short.length, 'mid', mid.length, 'long', long.length);

function stripMd(s) {
  return s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}
const md = still.filter((k) => /\[[^\]]+\]\([^)]+\)/.test(k));
let pairs = 0;
for (const k of md) {
  const s = stripMd(k);
  if (still.includes(s) || remainEn.includes(s)) pairs += 1;
}
console.log('md keys in still', md.length, 'with stripped pair', pairs);

fs.writeFileSync(new URL('./_still.json', import.meta.url), JSON.stringify(still, null, 2));
const de = JSON.parse(fs.readFileSync(new URL('./de.json', import.meta.url), 'utf8'));
fs.writeFileSync(
  new URL('./_still-with-de.json', import.meta.url),
  JSON.stringify(
    still.map((k) => ({ en: k, de: de[k] || '' })),
    null,
    2,
  ),
);
console.log('wrote _still.json');
