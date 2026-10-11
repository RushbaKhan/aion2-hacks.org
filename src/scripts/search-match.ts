const expansions: Record<string, string[]> = {
  eac: ['eac', 'anti-cheat'],
};

function wordPresent(haystack: string, word: string) {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}\\b`, 'i').test(haystack);
}

export function textMatches(haystack: string, query: string) {
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  return words.every((word) => {
    const variants = expansions[word] ?? [word];
    return variants.some((variant) => wordPresent(haystack, variant));
  });
}
