export const LOCALES = [{ code: 'en', label: 'English', htmlLang: 'en', dir: 'ltr' }] as const;

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
