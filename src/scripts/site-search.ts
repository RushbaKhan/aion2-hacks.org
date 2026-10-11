import type { SearchEntry } from '../data/searchIndex';
import { textMatches } from './search-match';

function parseIndex(root: HTMLElement): SearchEntry[] {
  const raw = root.querySelector<HTMLScriptElement>('[data-site-search-index]')?.textContent;
  if (!raw) return [];
  try {
    return JSON.parse(raw) as SearchEntry[];
  } catch {
    return [];
  }
}

function matches(entry: SearchEntry, query: string) {
  return textMatches(`${entry.title} ${entry.desc} ${entry.type}`, query);
}

function renderResults(list: HTMLElement, entries: SearchEntry[]) {
  list.replaceChildren(
    ...entries.map((entry, index) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = entry.href;
      link.className = 'site-search__result';
      link.setAttribute('role', 'option');
      if (index === 0) link.setAttribute('data-active', 'true');
      link.innerHTML = `<span class="site-search__type">${entry.type}</span><span class="site-search__title">${entry.title}</span><span class="site-search__desc">${entry.desc}</span>`;
      item.append(link);
      return item;
    }),
  );
}

export function initSiteSearch() {
  document.querySelectorAll<HTMLElement>('[data-site-search]').forEach((root) => {
    const toggle = root.querySelector<HTMLButtonElement>('[data-site-search-toggle]');
    const panel = root.querySelector<HTMLElement>('[data-site-search-panel]');
    const input = root.querySelector<HTMLInputElement>('[data-site-search-input]');
    const results = root.querySelector<HTMLElement>('[data-site-search-results]');
    const empty = root.querySelector<HTMLElement>('[data-site-search-empty]');
    if (!toggle || !panel || !input || !results) return;

    const index = parseIndex(root);

    const setOpen = (open: boolean) => {
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      root.classList.toggle('is-open', open);
      if (open) {
        input.focus();
        apply();
      }
    };

    const apply = () => {
      const query = input.value.trim().toLocaleLowerCase();
      const matchesFound = query
        ? index.filter((entry) => matches(entry, query)).slice(0, 8)
        : index.slice(0, 6);
      renderResults(results, matchesFound);
      if (empty) empty.hidden = matchesFound.length > 0;
    };

    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      setOpen(panel.hidden);
    });

    input.addEventListener('input', apply);
    input.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowDown' && event.key !== 'Enter') return;
      const first = results.querySelector<HTMLAnchorElement>('.site-search__result');
      if (!first) return;
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        first.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (!root.contains(event.target as Node)) setOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key === '/' && !event.defaultPrevented && root.classList.contains('site-search--header')) {
        const target = event.target as HTMLElement | null;
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
          return;
        }
        event.preventDefault();
        setOpen(true);
      }
    });

    apply();
  });
}
