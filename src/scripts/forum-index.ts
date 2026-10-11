import { textMatches } from './search-match';

export function initForumIndexFilters(emptyMessage: string) {
  const list = document.querySelector<HTMLElement>('[data-forum-list]');
  const emptyEl = document.getElementById('forum-empty');
  const searchInput = document.querySelector<HTMLInputElement>('[data-listing-search]');
  const countEl = document.querySelector<HTMLElement>('[data-forum-visible-count]');
  const resultsLabel = document.querySelector<HTMLElement>('[data-forum-results-label]');
  const filters = document.querySelectorAll<HTMLButtonElement>('[data-forum-filter]');
  const sorters = document.querySelectorAll<HTMLButtonElement>('[data-forum-sort]');
  const cards = [...document.querySelectorAll<HTMLElement>('[data-forum-card]')];
  if (!list || cards.length === 0) return;

  const activeCategory = () =>
    document.querySelector<HTMLButtonElement>('[data-forum-filter].is-active')?.getAttribute('data-forum-filter') ??
    'all';

  const activeSort = () =>
    document.querySelector<HTMLButtonElement>('[data-forum-sort].is-active')?.getAttribute('data-forum-sort') ??
    'popular';

  const apply = () => {
    const category = activeCategory();
    const sort = activeSort();
    const query = searchInput?.value.trim() ?? '';
    let visible = 0;

    const ranked = [...cards].sort((a, b) => {
      if (sort === 'latest') return Number(b.dataset.ts ?? 0) - Number(a.dataset.ts ?? 0);
      if (sort === 'discussed') return Number(b.dataset.comments ?? 0) - Number(a.dataset.comments ?? 0);
      return Number(b.dataset.upvotes ?? 0) - Number(a.dataset.upvotes ?? 0);
    });

    ranked.forEach((el) => {
      const matchCategory = category === 'all' || el.getAttribute('data-category') === category;
      const matchQuery = textMatches(el.getAttribute('data-search') ?? el.textContent ?? '', query);
      const show = matchCategory && matchQuery;
      el.toggleAttribute('hidden', !show);
      list.appendChild(el);
      if (show) visible += 1;
    });

    if (emptyEl) {
      emptyEl.hidden = visible > 0;
      emptyEl.textContent = emptyMessage;
    }
    if (countEl) countEl.textContent = `${visible} ${visible === 1 ? 'discussion' : 'discussions'}`;
    if (resultsLabel) resultsLabel.textContent = `${visible} guide ${visible === 1 ? 'discussion' : 'discussions'}`;
  };

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((item) => item.classList.toggle('is-active', item === btn));
      const category = btn.getAttribute('data-forum-filter') ?? 'all';
      const url = new URL(window.location.href);
      if (category === 'all') url.searchParams.delete('category');
      else url.searchParams.set('category', category);
      window.history.replaceState({}, '', url);
      apply();
    });
  });

  sorters.forEach((btn) => {
    btn.addEventListener('click', () => {
      sorters.forEach((item) => item.classList.toggle('is-active', item === btn));
      apply();
    });
  });

  searchInput?.addEventListener('input', () => {
    const url = new URL(window.location.href);
    const query = searchInput.value.trim();
    if (query) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    window.history.replaceState({}, '', url);
    apply();
  });

  const requested = new URLSearchParams(window.location.search).get('category') ?? 'all';
  const initial = [...filters].find((btn) => btn.getAttribute('data-forum-filter') === requested) ?? filters[0];
  filters.forEach((item) => item.classList.toggle('is-active', item === initial));

  const queryFromUrl = new URLSearchParams(window.location.search).get('q');
  if (queryFromUrl && searchInput) searchInput.value = queryFromUrl;

  apply();
}
