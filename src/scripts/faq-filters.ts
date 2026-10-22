import { textMatches } from './search-match';

export function initFaqFilters() {
  document.querySelectorAll('[data-faq-section]').forEach((section) => {
    const list = section.querySelector('[data-faq-list]');
    if (!list) return;

    const items = list.querySelectorAll<HTMLElement>('[data-faq-topic]');
    const chips = section.querySelectorAll<HTMLButtonElement>('[data-faq-filter]');
    const searchInput = section.querySelector<HTMLInputElement>('[data-faq-search]');

    const apply = () => {
      const topic =
        section.querySelector<HTMLButtonElement>('[data-faq-filter].is-active')?.getAttribute('data-faq-filter') ??
        'all';
      const query = searchInput?.value.trim().toLocaleLowerCase() ?? '';

      items.forEach((item) => {
        const itemTopic = item.getAttribute('data-faq-topic');
        const haystack = item.getAttribute('data-faq-search-text') ?? item.textContent ?? '';
        const show = (topic === 'all' || itemTopic === topic) && textMatches(haystack, query);
        item.toggleAttribute('data-hidden', !show);
        item.classList.toggle('hidden', !show);
      });
    };

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.classList.toggle('is-active', c === chip));
        apply();
      });
    });

    searchInput?.addEventListener('input', apply);

    const queryFromUrl = new URLSearchParams(window.location.search).get('q');
    if (queryFromUrl && searchInput) {
      searchInput.value = queryFromUrl;
    }

    apply();
  });
}
