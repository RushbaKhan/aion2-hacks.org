import { textMatches } from './search-match';

/** Blog index topic filters, search, and Starwind sort select. */
export function initBlogIndexFilters(emptyMessage: string) {
  const grid = document.getElementById('blog-grid');
  const emptyEl = document.getElementById('blog-empty');
  const sortRoot = document.getElementById('blog-sort-select');
  const searchInput = document.querySelector<HTMLInputElement>('[data-listing-search]');
  if (!grid) return;

  const filters = document.querySelectorAll<HTMLButtonElement>('[data-blog-filter]');

  const cards = () => [...document.querySelectorAll<HTMLElement>('[data-blog-card]:not([data-forum-card])')];

  const activeTag = () =>
    document.querySelector<HTMLButtonElement>('[data-blog-filter][aria-pressed="true"]')?.getAttribute(
      'data-blog-filter',
    ) ?? 'all';

  const getSortSelectRoot = () => sortRoot?.querySelector<HTMLElement>('[data-sw-select]');

  const getSort = () => {
    const root = getSortSelectRoot();
    const fromAttr = root?.getAttribute('data-value');
    if (fromAttr) return fromAttr;
    const input = sortRoot?.querySelector<HTMLInputElement>('[data-sw-select-input]');
    return input?.value || 'newest';
  };

  const isBlogSortEvent = (event: Event) => {
    const root = getSortSelectRoot();
    if (!root || !sortRoot) return false;
    return event.target === root || root.contains(event.target as Node);
  };

  const compareCards = (a: HTMLElement, b: HTMLElement, sort: string) => {
    const tsA = Number(a.getAttribute('data-ts') ?? 0);
    const tsB = Number(b.getAttribute('data-ts') ?? 0);
    const readA = Number(a.getAttribute('data-read-minutes') ?? 0);
    const readB = Number(b.getAttribute('data-read-minutes') ?? 0);
    if (sort === 'oldest') return tsA - tsB;
    if (sort === 'short') return readA - readB;
    if (sort === 'long') return readB - readA;
    return tsB - tsA;
  };

  const apply = () => {
    const tag = activeTag();
    const sort = getSort();
    const query = searchInput?.value.trim().toLocaleLowerCase() ?? '';
    const items = cards();

    const sorted = [...items].sort((a, b) => compareCards(a, b, sort));
    sorted.forEach((el) => {
      if (el.parentElement === grid) grid.appendChild(el);
    });

    let visibleCount = 0;
    items.forEach((el) => {
      const matchTag = tag === 'all' || el.getAttribute('data-tag') === tag;
      const haystack = el.getAttribute('data-search') ?? el.textContent ?? '';
      const matchQuery = textMatches(haystack, query);
      const match = matchTag && matchQuery;
      el.classList.toggle('hidden', !match);
      if (match) visibleCount += 1;
    });

    if (emptyEl) {
      emptyEl.classList.toggle('hidden', visibleCount > 0);
      emptyEl.textContent = query ? 'No articles match this search.' : emptyMessage;
    }
  };

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      apply();
    });
  });

  searchInput?.addEventListener('input', apply);

  const onSortChange = (event: Event) => {
    if (!isBlogSortEvent(event)) return;
    apply();
  };

  document.addEventListener('starwind:value-change', onSortChange);

  const queryFromUrl = new URLSearchParams(window.location.search).get('q');
  if (queryFromUrl && searchInput) searchInput.value = queryFromUrl;

  requestAnimationFrame(apply);
  window.setTimeout(apply, 0);
}
