export const LOCALES = [
  { code: 'en', label: 'English', htmlLang: 'en', dir: 'ltr' },
  { code: 'de', label: 'Deutsch', htmlLang: 'de', dir: 'ltr' },
  { code: 'fr', label: 'Français', htmlLang: 'fr', dir: 'ltr' },
  { code: 'es', label: 'Español', htmlLang: 'es', dir: 'ltr' },
  { code: 'pt', label: 'Português', htmlLang: 'pt', dir: 'ltr' },
  { code: 'ru', label: 'Русский', htmlLang: 'ru', dir: 'ltr' },
  { code: 'ja', label: '日本語', htmlLang: 'ja', dir: 'ltr' },
  { code: 'ko', label: '한국어', htmlLang: 'ko', dir: 'ltr' },
  { code: 'zh', label: '简体中文', htmlLang: 'zh-Hans', dir: 'ltr' },
  { code: 'zh-TW', label: '繁體中文', htmlLang: 'zh-Hant', dir: 'ltr' },
  { code: 'he', label: 'עברית', htmlLang: 'he', dir: 'rtl' },
  { code: 'tr', label: 'Türkçe', htmlLang: 'tr', dir: 'ltr' },
  { code: 'ar', label: 'العربية', htmlLang: 'ar', dir: 'rtl' },
  { code: 'vi', label: 'Tiếng Việt', htmlLang: 'vi', dir: 'ltr' },
  { code: 'pl', label: 'Polski', htmlLang: 'pl', dir: 'ltr' },
] as const;

export type LocaleCode = (typeof LOCALES)[number]['code'];

export const DEFAULT_LOCALE: LocaleCode = 'en';
export const LOCALE_STORAGE_KEY = 'site-locale';
export const RTL_LOCALES = new Set<LocaleCode>(
  LOCALES.filter((locale) => locale.dir === 'rtl').map((locale) => locale.code),
);

export function isLocaleCode(value: string): value is LocaleCode {
  return LOCALES.some((locale) => locale.code === value);
}

export function localeMeta(code: LocaleCode) {
  return LOCALES.find((locale) => locale.code === code) ?? LOCALES[0];
}
