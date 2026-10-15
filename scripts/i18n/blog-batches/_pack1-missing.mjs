import fs from 'node:fs';
import { BLOG_AIM_PACK } from '../leftover-blog-aim.mjs';
import { CHROME_PACK } from '../leftover-chrome.mjs';
import { HEADING_ROWS } from './_pack1-headings.mjs';
import { BODY_A } from './_pack1-body-a.mjs';
import { BODY_B } from './_pack1-body-b.mjs';
import { BODY_C } from './_pack1-body-c.mjs';
import { BODY_D } from './_pack1-body-d.mjs';
import { BODY_E } from './_pack1-body-e.mjs';
import { BODY_F } from './_pack1-body-f.mjs';
import { BODY_G } from './_pack1-body-g.mjs';
import { BODY_H } from './_pack1-body-h.mjs';
import { BODY_I } from './_pack1-body-i.mjs';
import { BODY_J } from './_pack1-body-j.mjs';
import { BODY_K } from './_pack1-body-k.mjs';
import { BODY_L } from './_pack1-body-l.mjs';
import { BODY_M } from './_pack1-body-m.mjs';
import { BODY_N } from './_pack1-body-n.mjs';

const batch = JSON.parse(fs.readFileSync(new URL('./batch-1.json', import.meta.url), 'utf8'));
const have = new Set([
  ...Object.keys(BLOG_AIM_PACK),
  ...Object.keys(CHROME_PACK),
  ...HEADING_ROWS.map((r) => r[0]),
  ...BODY_A.map((r) => r[0]),
  ...BODY_B.map((r) => r[0]),
  ...BODY_C.map((r) => r[0]),
  ...BODY_D.map((r) => r[0]),
  ...BODY_E.map((r) => r[0]),
  ...BODY_F.map((r) => r[0]),
  ...BODY_G.map((r) => r[0]),
  ...BODY_H.map((r) => r[0]),
  ...BODY_I.map((r) => r[0]),
  ...BODY_J.map((r) => r[0]),
  ...BODY_K.map((r) => r[0]),
  ...BODY_L.map((r) => r[0]),
  ...BODY_M.map((r) => r[0]),
  ...BODY_N.map((r) => r[0]),
]);
const miss = batch.filter((k) => !have.has(k));
fs.writeFileSync(new URL('./_missing-full.json', import.meta.url), JSON.stringify(miss, null, 2));
console.log('missing', miss.length, 'of', batch.length);
miss.forEach((k, i) => console.log(String(i + 1).padStart(3), k.length, k.slice(0, 110)));
