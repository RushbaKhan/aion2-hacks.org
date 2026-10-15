import fs from 'fs';
import { head } from './_head.mjs';
import { head2 } from './_head2.mjs';
import { p1 } from './_p1.mjs';
import { tailA } from './_tail-a.mjs';
import { tailB } from './_tail-b.mjs';
import { tailC } from './_tail-c.mjs';
import { tailD } from './_tail-d.mjs';
import { tailE } from './_tail-e.mjs';
import { tailF } from './_tail-f.mjs';

const LANGS = ['de','fr','es','pt','ru','ja','ko','zh','zh-TW','he','tr','ar','vi','pl','it','th','id'];
const batch = JSON.parse(fs.readFileSync('./batch-3.json', 'utf8'));

let gapA = [];
let gapB = [];
try {
  gapA = (await import('./_rows-gap-a.mjs')).rowsGapA || [];
} catch {}
try {
  gapB = (await import('./_rows-gap-b.mjs')).rowsGapB || [];
} catch {}

const prefix = [...head, ...head2, ...p1];
const tails = [...tailA, ...tailB, ...tailC, ...tailD, ...tailE, ...tailF];

if (prefix.length !== 107) {
  console.error('prefix expected 107, got', prefix.length);
  process.exit(1);
}
if (tails.length !== 43) {
  console.error('tails expected 43, got', tails.length);
  process.exit(1);
}
if (gapB.length && gapB.length !== 21) {
  console.error('gapB expected 21, got', gapB.length);
  process.exit(1);
}

const rows = new Array(batch.length).fill(null);
for (let i = 0; i < prefix.length; i++) rows[i] = prefix[i];
for (let i = 0; i < gapA.length && 107 + i < 128; i++) rows[107 + i] = gapA[i];
for (let i = 0; i < gapB.length && 128 + i < 149; i++) rows[128 + i] = gapB[i];
for (let i = 0; i < tails.length; i++) rows[149 + i] = tails[i];

const filled = rows.filter(Boolean).length;
const pack = {};
for (const lang of LANGS) pack[lang] = {};
rows.forEach((row, i) => {
  if (!row) return;
  if (row.length !== 17) {
    console.error('bad width', i, row.length);
    process.exit(1);
  }
  LANGS.forEach((lang, li) => {
    pack[lang][batch[i]] = row[li];
  });
});

fs.writeFileSync('./pack-3.json', JSON.stringify(pack), 'utf8');
console.log('wrote pack-3.json keys/lang', Object.keys(pack.ja).length, 'filled rows', filled, '/', batch.length, 'gapA', gapA.length, 'gapB', gapB.length);
