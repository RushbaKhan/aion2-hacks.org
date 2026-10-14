import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, RTL_LOCALES, isLocaleCode, localeMeta, type LocaleCode } from '../i18n/locales';

const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE', 'KBD', 'SAMP']);
const ATTRS = ['placeholder', 'aria-label', 'title', 'alt'] as const;
const dictCache = new Map<string, Record<string, string>>();

function currentLocale(): LocaleCode {
  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('hl') ?? '';
    if (isLocaleCode(fromUrl)) {
      localStorage.setItem(LOCALE_STORAGE_KEY, fromUrl);
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

function translateValue(value: string, dict: Record<string, string>) {
  const trimmed = value.trim();
  if (!trimmed) return value;
  const next = dict[trimmed];
  if (!next || next === trimmed) return value;
  return value.replace(trimmed, next);
}

function translateNode(node: Text, dict: Record<string, string>) {
  const parent = node.parentElement;
  if (!parent || SKIP_TAGS.has(parent.tagName) || parent.closest('[data-no-i18n]')) return;

  const raw = node.nodeValue;
  if (!raw) return;

  if (!parent.hasAttribute('data-i18n-en') && parent.childNodes.length === 1) {
    parent.setAttribute('data-i18n-en', raw.trim());
  }

  const source = parent.getAttribute('data-i18n-en') || raw.trim();
  const next = dict[source];
  if (next && parent.childNodes.length === 1) {
    node.nodeValue = raw.includes(source) ? raw.replace(source, next) : next;
    return;
  }

  node.nodeValue = translateValue(raw, dict);
}

function translateAttributes(dict: Record<string, string>) {
  const selector = ATTRS.map((attr) => `[${attr}]`).join(',');
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    for (const attr of ATTRS) {
      const current = el.getAttribute(attr);
      if (!current) continue;
      const stamped = el.getAttribute(`data-i18n-${attr}`) ?? current;
      if (!el.hasAttribute(`data-i18n-${attr}`)) el.setAttribute(`data-i18n-${attr}`, current);
      const next = dict[stamped.trim()];
      if (next) el.setAttribute(attr, next);
    }
  });
}

async function loadDict(locale: LocaleCode): Promise<Record<string, string> | null> {
  if (locale === 'en') return null;
  const cached = dictCache.get(locale);
  if (cached) return cached;

  const res = await fetch(`/locales/${locale}.json`, { credentials: 'same-origin' });
  if (!res.ok) return null;
  const dict = (await res.json()) as Record<string, string>;
  dictCache.set(locale, dict);
  return dict;
}

export async function applyLocale(locale = currentLocale()) {
  applyDocumentLocale(locale);
  if (locale === 'en') return;

  const dict = await loadDict(locale);
  if (!dict) return;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const node of nodes) translateNode(node, dict);
  translateAttributes(dict);
}

export function setLocale(locale: LocaleCode) {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  const url = new URL(window.location.href);
  if (locale === DEFAULT_LOCALE) url.searchParams.delete('hl');
  else url.searchParams.set('hl', locale);
  window.location.assign(url.pathname + url.search + url.hash);
}

export function initLocale() {
  void applyLocale();
  document.querySelectorAll<HTMLButtonElement>('[data-set-locale]').forEach((button) => {
    button.addEventListener('click', () => {
      const next = button.getAttribute('data-set-locale') ?? '';
      if (isLocaleCode(next)) setLocale(next);
    });
  });
}
