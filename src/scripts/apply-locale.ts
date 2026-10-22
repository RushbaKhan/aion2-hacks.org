import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, RTL_LOCALES, isLocaleCode, localeMeta, type LocaleCode } from '../i18n/locales';

const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE', 'KBD', 'SAMP', 'TEXTAREA']);
const ATTRS = ['placeholder', 'aria-label', 'title', 'alt'] as const;
const dictCache = new Map<string, Record<string, string>>();
const blogDictCache = new Map<string, Record<string, string>>();

function currentLocale(): LocaleCode {
  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('hl') ?? '';
    if (isLocaleCode(fromUrl)) {
      localStorage.setItem(LOCALE_STORAGE_KEY, fromUrl);
      document.cookie = `${LOCALE_STORAGE_KEY}=${fromUrl};path=/;max-age=31536000;samesite=lax`;
      return fromUrl;
    }
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY) ?? '';
    if (isLocaleCode(stored)) return stored;
  } catch {
    // ignore
  }
  return DEFAULT_LOCALE;
}

function applyDocumentLocale(locale: LocaleCode) {
  const meta = localeMeta(locale);
  document.documentElement.lang = meta.htmlLang;
  document.documentElement.dir = meta.dir;
  document.documentElement.dataset.locale = locale;
  document.documentElement.setAttribute('translate', 'no');
  document.documentElement.classList.toggle('locale-rtl', RTL_LOCALES.has(locale));
}

function normalize(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function lookup(dict: Record<string, string>, value: string) {
  const trimmed = value.trim();
  const collapsed = normalize(value);
  return dict[value] || dict[trimmed] || dict[collapsed] || '';
}

function shouldSkip(el: Element | null) {
  if (!el) return true;
  if (SKIP_TAGS.has(el.tagName)) return true;
  if (el.closest('[data-no-i18n], option')) return true;
  return false;
}

function isDecorative(el: Element) {
  const tag = el.tagName;
  if (tag === 'SVG' || tag === 'IMG' || tag === 'PATH' || tag === 'BR' || tag === 'USE') return true;
  if (el.getAttribute('aria-hidden') === 'true' && !normalize(el.textContent || '')) return true;
  const onlyGraphic = [...el.children].every((child) => isDecorative(child));
  return onlyGraphic && !normalize(el.textContent || '');
}

function meaningfulChildren(el: Element) {
  return [...el.childNodes].filter((child) => {
    if (child.nodeType === Node.TEXT_NODE) return false;
    if (child.nodeType !== Node.ELEMENT_NODE) return false;
    return !isDecorative(child as Element);
  });
}

function looksSmashed(source: string, next: string) {
  const srcSpaces = (source.match(/ /g) || []).length;
  const nextSpaces = (next.match(/ /g) || []).length;
  return srcSpaces >= 2 && nextSpaces < Math.max(1, Math.floor(srcSpaces / 3));
}

function translateValue(value: string, dict: Record<string, string>) {
  const next = lookup(dict, value);
  if (!next || next === normalize(value) || looksSmashed(value, next)) return value;
  const trimmed = value.trim();
  if (value.includes(trimmed)) return value.replace(trimmed, next);
  return next;
}

function stampEnglish(el: HTMLElement, english: string) {
  if (!el.hasAttribute('data-i18n-en')) el.setAttribute('data-i18n-en', english);
}

function translateNode(node: Text, dict: Record<string, string>) {
  const parent = node.parentElement;
  if (shouldSkip(parent)) return;

  const raw = node.nodeValue;
  if (!raw) return;
  const trimmed = raw.trim();
  if (!trimmed) return;

  const elementChildren = parent ? meaningfulChildren(parent) : [];
  if (parent && elementChildren.length === 0) {
    stampEnglish(parent, parent.getAttribute('data-i18n-en') || trimmed);
  }

  const source = parent?.getAttribute('data-i18n-en') || trimmed;
  const keyed = lookup(dict, source) || lookup(dict, trimmed);
  if (keyed && parent && elementChildren.length === 0 && !looksSmashed(source, keyed)) {
    node.nodeValue = raw.includes(source) ? raw.replace(source, keyed) : keyed;
    return;
  }

  node.nodeValue = translateValue(raw, dict);
}

function rewrapLinks(el: HTMLElement, translated: string, dict: Record<string, string>) {
  const links = [...el.querySelectorAll('a')].map((anchor) => {
    const english = normalize(anchor.getAttribute('data-i18n-en') || anchor.textContent || '');
    stampEnglish(anchor, english);
    return {
      href: anchor.getAttribute('href') || '',
      label: lookup(dict, english) || english,
    };
  });

  const escape = (value: string) =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  let html = escape(translated);
  for (const link of links) {
    if (!link.label) continue;
    html = html.replace(link.label, `<a href="${escape(link.href)}">${escape(link.label)}</a>`);
  }
  el.innerHTML = html;
}

function mixedCandidates() {
  return [...document.querySelectorAll<HTMLElement>('h1,h2,h3,h4,p,li,span,a,button,label,legend,td,th,dt,dd,figcaption,blockquote,small')];
}

function stampMixedEnglish() {
  for (const el of mixedCandidates()) {
    if (shouldSkip(el)) continue;
    if (meaningfulChildren(el).length === 0) continue;
    const hasText = [...el.childNodes].some((child) => child.nodeType === Node.TEXT_NODE && child.nodeValue?.trim());
    if (!hasText) continue;
    const english = normalize(el.innerText || '');
    if (english) stampEnglish(el, english);
  }
}

function translateMixedElements(dict: Record<string, string>) {
  const nodes = mixedCandidates();
  nodes.reverse();
  for (const el of nodes) {
    if (shouldSkip(el)) continue;
    if (meaningfulChildren(el).length === 0) continue;
    const hasText = [...el.childNodes].some((child) => child.nodeType === Node.TEXT_NODE && child.nodeValue?.trim());
    if (!hasText) continue;

    const english = el.getAttribute('data-i18n-en') || normalize(el.innerText || '');
    if (!english) continue;
    stampEnglish(el, english);
    const next = lookup(dict, english);
    if (!next || next === english || looksSmashed(english, next)) continue;
    rewrapLinks(el, next, dict);
  }
}

function translateAttributes(dict: Record<string, string>) {
  const selector = ATTRS.map((attr) => `[${attr}]`).join(',');
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    if (shouldSkip(el)) return;
    for (const attr of ATTRS) {
      const current = el.getAttribute(attr);
      if (!current) continue;
      const stamped = el.getAttribute(`data-i18n-${attr}`) ?? current;
      if (!el.hasAttribute(`data-i18n-${attr}`)) el.setAttribute(`data-i18n-${attr}`, current);
      const next = lookup(dict, stamped);
      if (next) el.setAttribute(attr, next);
    }
  });
}

function indexDict(raw: Record<string, string>) {
  const dict: Record<string, string> = { ...raw };
  for (const [key, value] of Object.entries(raw)) {
    dict[normalize(key)] = value;
  }
  return dict;
}

async function fetchDict(url: string) {
  try {
    const res = await fetch(url, { credentials: 'same-origin' });
    const type = res.headers.get('content-type') || '';
    if (!res.ok || !type.includes('json')) return null;
    return (await res.json()) as Record<string, string>;
  } catch {
    return null;
  }
}

function pageNeedsBlogDict() {
  return Boolean(document.querySelector('[data-i18n-pack="blog"], .blog-sidebar, .blog-article__prose'));
}

async function loadDict(locale: LocaleCode): Promise<Record<string, string> | null> {
  if (locale === 'en') return null;

  let main = dictCache.get(locale);
  if (!main) {
    const raw = await fetchDict(`/locales/${locale}.json`);
    if (!raw) return null;
    main = indexDict(raw);
    dictCache.set(locale, main);
  }

  if (!pageNeedsBlogDict()) return main;

  let blog = blogDictCache.get(locale);
  if (!blog) {
    const raw =
      (await fetchDict(`/locales/${locale}-blog.json`)) ||
      (await fetchDict(`/locales/blog/${locale}.json`));
    blog = raw ? indexDict(raw) : {};
    blogDictCache.set(locale, blog);
  }

  return { ...main, ...blog };
}

function isStaleGameDict(dict: Record<string, string>) {
  const sample = Object.keys(dict).slice(0, 120).join('\n');
  return /Overwatch|overwatchcheat|The Isle|Dota 2|Juno Overwatch|D\.Va Overwatch/i.test(sample);
}

export async function applyLocale(_locale = currentLocale()) {
  applyDocumentLocale(DEFAULT_LOCALE);
  try {
    localStorage.removeItem(LOCALE_STORAGE_KEY);
    document.cookie = `${LOCALE_STORAGE_KEY}=;path=/;max-age=0;samesite=lax`;
  } catch {
    // ignore
  }
}

export function setLocale(_locale: LocaleCode) {
  applyDocumentLocale(DEFAULT_LOCALE);
  try {
    localStorage.removeItem(LOCALE_STORAGE_KEY);
    document.cookie = `${LOCALE_STORAGE_KEY}=;path=/;max-age=0;samesite=lax`;
  } catch {
    // ignore
  }
  const url = new URL(window.location.href);
  url.searchParams.delete('hl');
  window.location.assign(url.pathname + url.search + url.hash);
}

export function initLocale() {
  void applyLocale();
  document.addEventListener('astro:page-load', () => {
    void applyLocale();
  });
  document.querySelectorAll<HTMLButtonElement>('[data-set-locale]').forEach((button) => {
    button.addEventListener('click', () => {
      const next = button.getAttribute('data-set-locale') ?? '';
      if (isLocaleCode(next)) setLocale(next);
    });
  });
  document.querySelectorAll<HTMLSelectElement>('[data-lang-select]').forEach((select) => {
    const locale = currentLocale();
    if (isLocaleCode(locale)) select.value = locale;
    select.addEventListener('change', () => {
      const next = select.value;
      if (isLocaleCode(next)) setLocale(next);
    });
  });
}
