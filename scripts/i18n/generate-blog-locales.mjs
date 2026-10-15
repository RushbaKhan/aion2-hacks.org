import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { UI_PACK } from './ui-pack.mjs';
import { HOME_PACK } from './home-pack.mjs';
import { LEFTOVER_PACK } from './leftover-pack.mjs';
import { PAGES_PACK } from './leftover-pages.mjs';
import { BLOG_PACK } from './leftover-blog.mjs';
import { BLOG_PACK_2 } from './leftover-blog-2.mjs';
import { MORE_PACK } from './leftover-more.mjs';
import { CHROME_PACK } from './leftover-chrome.mjs';
import { FAQ_PACK } from './leftover-faq.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const keysPath = path.join(root, 'public/locales/_en-blog-keys.json');
const keys = fs.existsSync(keysPath) ? JSON.parse(fs.readFileSync(keysPath, 'utf8')) : [];

const LANGS = ['de','fr','es','pt','ru','ja','ko','zh','zh-TW','he','tr','ar','vi','pl','it','th','id'];
const PACKS = [UI_PACK, HOME_PACK, LEFTOVER_PACK, PAGES_PACK, BLOG_PACK, BLOG_PACK_2, MORE_PACK, CHROME_PACK, FAQ_PACK];
try {
  const heads = await import('./leftover-blog-heads.mjs');
  if (heads.BLOG_HEADS_PACK) PACKS.push(heads.BLOG_HEADS_PACK);
} catch {
  // optional until heading pack exists
}
try {
  const aim = await import('./leftover-blog-aim.mjs');
  if (aim.BLOG_AIM_PACK) PACKS.push(aim.BLOG_AIM_PACK);
} catch {
  // optional until aim pack exists
}
try {
  const aim2 = await import('./leftover-blog-aim-2.mjs');
  if (aim2.BLOG_AIM_PACK_2) PACKS.push(aim2.BLOG_AIM_PACK_2);
} catch {
  // optional until aim pack 2 exists
}
try {
  const esp = await import('./leftover-blog-esp.mjs');
  if (esp.BLOG_ESP_PACK) PACKS.push(esp.BLOG_ESP_PACK);
} catch {
  // optional until esp pack exists
}
try {
  const gapA = await import('./leftover-blog-gap-a.mjs');
  if (gapA.BLOG_GAP_A_PACK) PACKS.push(gapA.BLOG_GAP_A_PACK);
} catch {
  // optional until gap A exists
}
try {
  const gapB = await import('./leftover-blog-gap-b.mjs');
  if (gapB.BLOG_GAP_B_PACK) PACKS.push(gapB.BLOG_GAP_B_PACK);
} catch {
  // optional until gap B exists
}
try {
  const b1 = await import('./leftover-blog-gap-b1.mjs');
  if (b1.BLOG_GAP_B1_PACK) PACKS.push(b1.BLOG_GAP_B1_PACK);
} catch {
  // optional
}
try {
  const b2 = await import('./leftover-blog-gap-b2.mjs');
  if (b2.BLOG_GAP_B2_PACK) PACKS.push(b2.BLOG_GAP_B2_PACK);
} catch {
  // optional
}
try {
  const b3 = await import('./leftover-blog-gap-b3.mjs');
  if (b3.BLOG_GAP_B3_PACK) PACKS.push(b3.BLOG_GAP_B3_PACK);
} catch {
  // optional
}

const dynamicPacks = [];
const batchDir = path.join(root, 'scripts/i18n/blog-batches');
if (fs.existsSync(batchDir)) {
  for (const name of fs.readdirSync(batchDir).sort()) {
    if (!/^pack-\d+\.json$/.test(name)) continue;
    dynamicPacks.push(JSON.parse(fs.readFileSync(path.join(batchDir, name), 'utf8')));
  }
}

function lookupPack(en, lang) {
  for (const pack of PACKS) {
    if (pack[en]?.[lang]) return pack[en][lang];
  }
  for (const pack of dynamicPacks) {
    if (pack[lang]?.[en]) return pack[lang][en];
    if (pack[en]?.[lang]) return pack[en][lang];
  }
  return '';
}

const publicDir = path.join(root, 'public/locales');
const outDir = path.join(publicDir, 'blog');
fs.mkdirSync(outDir, { recursive: true });

for (const lang of LANGS) {
  const dict = {};
  for (const key of keys) {
    const next = lookupPack(key, lang);
    if (next && next !== key) dict[key] = next;
  }
  for (const pack of PACKS) {
    for (const [key, map] of Object.entries(pack)) {
      if (map[lang]) dict[key] = map[lang];
    }
  }
  for (const pack of dynamicPacks) {
    const langMap = pack[lang] || {};
    Object.assign(dict, langMap);
    if (!pack[lang]) {
      for (const [key, map] of Object.entries(pack)) {
        if (map && typeof map === 'object' && map[lang]) dict[key] = map[lang];
      }
    }
  }
  const payload = JSON.stringify(dict) + '\n';
  fs.writeFileSync(path.join(outDir, `${lang}.json`), payload);
  fs.writeFileSync(path.join(publicDir, `${lang}-blog.json`), payload);
  console.log(`blog ${lang}: ${Object.keys(dict).length} keys`);
}
