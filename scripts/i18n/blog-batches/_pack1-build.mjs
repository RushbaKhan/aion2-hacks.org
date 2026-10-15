import fs from 'node:fs';
import { BLOG_AIM_PACK } from '../leftover-blog-aim.mjs';
import { CHROME_PACK } from '../leftover-chrome.mjs';
import { LANGS, HEADING_ROWS } from './_pack1-headings.mjs';
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

function rowMap(rows) {
  const map = new Map();
  for (const [en, vals] of rows) {
    if (map.has(en)) throw new Error('duplicate row ' + en.slice(0, 60));
    const obj = {};
    LANGS.forEach((lang, i) => { obj[lang] = vals[i]; });
    map.set(en, obj);
  }
  return map;
}

const ours = rowMap([
  ...HEADING_ROWS, ...BODY_A, ...BODY_B, ...BODY_C, ...BODY_D, ...BODY_E,
  ...BODY_F, ...BODY_G, ...BODY_H, ...BODY_I, ...BODY_J, ...BODY_K,
  ...BODY_L, ...BODY_M, ...BODY_N,
]);

function fromPack(pack, en) {
  const row = pack[en];
  if (!row) return null;
  const obj = {};
  for (const lang of LANGS) obj[lang] = row[lang];
  return obj;
}

const pack = {};
for (const lang of LANGS) pack[lang] = {};

for (const en of batch) {
  const row = ours.get(en) || fromPack(BLOG_AIM_PACK, en) || fromPack(CHROME_PACK, en);
  if (!row) throw new Error('missing ' + en.slice(0, 80));
  for (const lang of LANGS) {
    if (!row[lang]) throw new Error('empty ' + lang + ' ' + en.slice(0, 60));
    pack[lang][en] = row[lang];
  }
}

pack.de.Reviews = 'Bewertungen';
pack.ar['Overwatch store'] = 'متجر Overwatch';

const SUBS = {
  ru: [
    ['странице магазина', 'страница магазина'],
    ['странице функций', 'страница функций'],
    ['страницу статуса', 'страница статуса'],
    ['странице статуса', 'страница статуса'],
    ['в функциях', 'в функции'],
    ['Настройке', 'Настройка'],
    ['Настройку', 'Настройка'],
  ],
  pl: [
    ['stronie sklepu', 'strona sklepu'],
    ['stronie funkcji', 'strona funkcji'],
    ['stronę statusu', 'strona statusu'],
    ['stronie statusu', 'strona statusu'],
    ['w funkcjach', 'w funkcje'],
    ['Konfiguracji', 'Konfiguracja'],
  ],
  he: [['FAQ', 'שאלות נפוצות']],
  th: [['FAQ', 'คำถามที่พบบ่อย']],
  de: [['Defense-Matrix-Hinweise', 'Hinweise zu Defense Matrix']],
};
for (const [lang, pairs] of Object.entries(SUBS)) {
  for (const en of batch) {
    let text = pack[lang][en];
    for (const [from, to] of pairs) text = text.split(from).join(to);
    pack[lang][en] = text;
  }
}
for (const lang of ['de', 'fr', 'es', 'pt', 'tr', 'vi', 'pl', 'it', 'id']) {
  for (const en of batch) {
    pack[lang][en] = pack[lang][en].replace(/(?<![A-Za-z])radar(?![A-Za-z])/g, 'Radar');
  }
}
for (const en of batch) {
  pack.ru[en] = pack.ru[en].replace(/радар/gi, 'Радар');
}
const dicts = {};
for (const lang of LANGS) {
  dicts[lang] = JSON.parse(fs.readFileSync(new URL(`../../../public/locales/${lang}.json`, import.meta.url), 'utf8'));
}

const guideEn = batch.find((en) => en.startsWith('The current vendor listing is the Windows PC client.'));
if (guideEn) {
  const guideSwap = {
    fr: 'guide Installation Windows PC',
    es: 'guía de Configuración Windows PC',
    pt: 'guia de Configuração Windows PC',
    ru: 'гайд Настройка Windows PC',
    ja: 'Windows PCセットアップのガイド',
    tr: 'Windows PC kurulumu rehberini',
    vi: 'hướng dẫn Cài Windows PC',
    pl: 'poradnika Konfiguracja Windows PC',
    it: 'guida Setup Windows PC',
    id: 'panduan Pengaturan Windows PC',
  };
  for (const [lang, from] of Object.entries(guideSwap)) {
    const token = dicts[lang]['Windows PC setup guide'];
    if (!pack[lang][guideEn].includes(token)) {
      pack[lang][guideEn] = pack[lang][guideEn].split(from).join(token);
    }
  }
}

const STORE_PAGE = {
  de: 'Shop-Seite', fr: 'page boutique', es: 'página de tienda', pt: 'página da loja',
  ru: 'страница магазина', ja: 'ストアページ', ko: '스토어 페이지', zh: '商店页', 'zh-TW': '商店頁',
  he: 'דף החנות', tr: 'mağaza sayfası', ar: 'صفحة المتجر', vi: 'trang cửa hàng', pl: 'strona sklepu',
  it: 'pagina negozio', th: 'หน้าร้าน', id: 'halaman toko',
};
const DM_NOTES = {
  de: 'Hinweise zu Defense Matrix', fr: 'notes Defense Matrix', es: 'notas de Defense Matrix',
  pt: 'notas de Defense Matrix', ru: 'заметки Defense Matrix', ja: 'Defense Matrixメモ',
  ko: 'Defense Matrix 노트', zh: 'Defense Matrix 说明', 'zh-TW': 'Defense Matrix 說明',
  he: 'הערות Defense Matrix', tr: 'Defense Matrix notları', ar: 'ملاحظات Defense Matrix',
  vi: 'ghi chú Defense Matrix', pl: 'uwagi Defense Matrix', it: 'note Defense Matrix',
  th: 'โน้ต Defense Matrix', id: 'catatan Defense Matrix',
};
const REVIEWS = {
  de: 'Bewertungscheckliste', fr: 'liste de contrôle d’évaluation', es: 'lista de revisión',
  pt: 'lista de avaliação', ru: 'чеклист оценки', ja: '評価チェックリスト', ko: '평가 체크리스트',
  zh: '评估清单', 'zh-TW': '評估清單', he: 'רשימת בדיקה', tr: 'değerlendirme listesi',
  ar: 'قائمة المراجعة', vi: 'danh sách đánh giá', pl: 'lista kontrolna recenzji',
  it: 'checklist delle recensioni', th: 'เช็กลิสต์รีวิว', id: 'daftar periksa ulasan',
};

function tokens(lang, key) {
  return dicts[lang][key];
}

const PHRASES = [
  ['Windows PC setup guide', (lang) => tokens(lang, 'Windows PC setup guide')],
  ['Windows PC setup', (lang) => tokens(lang, 'Windows PC setup')],
  ['Defense Matrix notes', (lang) => DM_NOTES[lang]],
  ['reviews checklist', (lang) => REVIEWS[lang]],
  ['monthly vs lifetime', (lang) => tokens(lang, 'monthly vs lifetime')],
  ['features page', (lang) => tokens(lang, 'features page')],
  ['status page', (lang) => tokens(lang, 'status page')],
  ['store page', (lang) => STORE_PAGE[lang]],
  ['Overwatch store', (lang) => lang === 'ar' ? 'متجر Overwatch' : tokens(lang, 'Overwatch store')],
  ['player ESP', (lang) => tokens(lang, 'Player ESP')],
  ['hero ESP', (lang) => tokens(lang, 'Hero ESP')],
  ['objective ESP', (lang) => tokens(lang, 'objective ESP') || tokens(lang, 'Objective ESP')],
  ['FAQ', (lang) => tokens(lang, 'FAQ')],
  ['setup', (lang) => tokens(lang, 'Setup')],
  ['features', (lang) => tokens(lang, 'features')],
  ['status', (lang) => tokens(lang, 'status')],
  ['radar', (lang) => tokens(lang, 'Radar')],
  ['store', (lang) => tokens(lang, 'store')],
];

function needed(en) {
  let rest = en.replace(/undetected status/gi, ' ');
  const out = [];
  for (const [phrase, tokenOf] of PHRASES) {
    const re = new RegExp('(?<![A-Za-z])' + phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![A-Za-z])', 'ig');
    if (re.test(rest)) {
      out.push([phrase, tokenOf]);
      rest = rest.replace(re, ' ');
    }
  }
  return out;
}

const EXTRA = {
  pl: [
    ['Konfiguracją', 'Konfiguracja'],
    ['Konfigurację', 'Konfiguracja'],
    ['stroną funkcji', 'strona funkcji'],
    ['listę kontrolną recenzji', 'lista kontrolna recenzji'],
    ['funkcjach', 'funkcje'],
    ['listy funkcji', 'funkcje'],
    ['funkcji Radar', 'funkcje Radar'],
    ['strona funkcji i statusu', 'strona funkcji i strona statusu'],
    ['strony funkcji', 'strona funkcji'],
    ['strony statusu', 'strona statusu'],
  ],
  ru: [
    ['страницей функций', 'страница функций'],
    ['страницей статуса', 'страница статуса'],
    ['страницы функций', 'страница функций'],
    ['страницы статуса', 'страница статуса'],
  ],
  tr: [['özelliği', 'özellikler']],
  ar: [
    ['ميزات رادار', 'الميزات لرادار'],
    ['متجر Overwatch Cheats', 'المتجر Overwatch Cheats'],
  ],
  it: [
    ['testo dello store', 'testo del negozio'],
    ['pagina stato', 'pagina di stato'],
  ],
  es: [['página de funciones y la de estado', 'página de funciones y la página de estado']],
  he: [['דף התכונות', 'דף תכונות']],
};
for (const [lang, pairs] of Object.entries(EXTRA)) {
  for (const en of batch) {
    let text = pack[lang][en];
    for (const [from, to] of pairs) text = text.split(from).join(to);
    pack[lang][en] = text;
  }
}

function forceToken(text, token) {
  if (text.includes(token)) return text;
  const lower = text.toLocaleLowerCase('tr');
  const needle = token.toLocaleLowerCase('tr');
  const idx = lower.indexOf(needle);
  if (idx === -1) return text;
  return text.slice(0, idx) + token + text.slice(idx + needle.length);
}

const fails = [];
for (const en of batch) {
  const reqs = needed(en);
  if (!reqs.length) continue;
  for (const lang of LANGS) {
    let text = pack[lang][en];
    for (const [phrase, tokenOf] of reqs) {
      const token = tokenOf(lang);
      if (!token) {
        fails.push(`${lang} NO TOKEN for ${phrase}`);
        continue;
      }
      text = forceToken(text, token);
      pack[lang][en] = text;
      if (!text.includes(token)) fails.push(`${lang} missing [${token}] for "${phrase}"\n  ${text}\n`);
    }
  }
}

const counts = {};
for (const lang of LANGS) counts[lang] = Object.keys(pack[lang]).length;

fs.writeFileSync(new URL('./_pack1-fails.txt', import.meta.url), fails.join('\n'));
console.log(JSON.stringify(counts));
console.log('fails', fails.length);

if (fails.length) process.exit(1);

const out = new URL('./pack-1.json', import.meta.url);
fs.writeFileSync(out, JSON.stringify(pack));
const check = JSON.parse(fs.readFileSync(out, 'utf8'));
if (Object.keys(check.de).length !== batch.length) throw new Error('length mismatch');
for (const lang of LANGS) {
  if (Object.keys(check[lang]).length !== batch.length) throw new Error(lang);
  for (const en of batch) if (check[lang][en] == null) throw new Error('gap ' + lang);
}
console.log('wrote', out.pathname, 'de', Object.keys(check.de).length);
