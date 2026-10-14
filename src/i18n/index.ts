export type { Translations } from './types';
export { en as t } from './en';

export function avatarSrc(style: string, seed: string) {
  return `https://api.dicebear.com/9.x/${style}/png?seed=${seed}&size=28&backgroundColor=0a0614,5b21b6,1e1b4b,8b5cf6,11161b`;
}
