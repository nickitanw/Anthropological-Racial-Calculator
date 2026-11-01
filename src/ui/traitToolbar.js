// Presentation-only search and status view for the existing trait cards.
(function () {
    const workspace = document.querySelector('.traits-workspace');
    const container = document.getElementById('traitsContainer');
    if (!workspace || !container) return;

    const search = document.getElementById('traitSearch');
    const filters = [...workspace.querySelectorAll('[data-trait-filter]')];
    const count = document.getElementById('traitFilterCount');
    const empty = document.getElementById('traitsEmptyState');
    const presets = [...workspace.querySelectorAll('.preset-btn')];
    let currentFilter = 'all';

    const labels = {
        en: { eyebrow: 'Historical record', presets: 'Reference presets', searchLabel: 'Search traits', searchPlaceholder: 'Search by trait name', filterLabel: 'Filter traits', all: 'All', completed: 'Completed', missing: 'Missing', reset: 'Reset traits', catalogue: 'Trait catalogue', empty: 'No traits match this view.', shown: 'shown' },
        ru: { eyebrow: 'Историческая запись', presets: 'Эталонные профили', searchLabel: 'Поиск признаков', searchPlaceholder: 'Поиск по названию признака', filterLabel: 'Фильтр признаков', all: 'Все', completed: 'Заполненные', missing: 'Незаполненные', reset: 'Сбросить признаки', catalogue: 'Каталог признаков', empty: 'В этом представлении нет признаков.', shown: 'показано' }
    };

    function localize() {
        const words = labels[document.documentElement.lang] || labels.en;
        workspace.querySelector('.traits-eyebrow').textContent = words.eyebrow;
        workspace.querySelector('.traits-toolbar-label').textContent = words.presets;
        workspace.querySelector('.traits-search-label').textContent = words.searchLabel;
        search.placeholder = words.searchPlaceholder;
        workspace.querySelector('.traits-filter-group').setAttribute('aria-label', words.filterLabel);
        filters.forEach(button => { button.textContent = words[button.dataset.traitFilter]; });
        workspace.querySelector('.traits-reset').textContent = words.reset;
        workspace.querySelector('.traits-list-heading span').textContent = words.catalogue;
        empty.textContent = words.empty;
        updateView();
    }

    function completed(card) {
        const selects = [...card.querySelectorAll('select')];
        return selects.length > 0 && selects.every(select => select.value !== '');
    }

    function updateView() {
        const query = search.value.trim().toLocaleLowerCase();
        const cards = [...container.querySelectorAll('.trait-card')];
        let visible = 0;
        cards.forEach(card => {
            const title = card.querySelector('.trait-title')?.textContent.toLocaleLowerCase() || '';
            const matchesText = !query || title.includes(query);
            const isCompleted = completed(card);
            const matchesStatus = currentFilter === 'all' || (currentFilter === 'completed' ? isCompleted : !isCompleted);
            const show = matchesText && matchesStatus;
            card.hidden = !show;
            if (show) visible++;
        });
        const words = labels[document.documentElement.lang] || labels.en;
        count.textContent = `${visible} / ${cards.length} ${words.shown}`;
        empty.hidden = visible !== 0 || cards.length === 0;
    }

    filters.forEach(button => button.addEventListener('click', () => {
        currentFilter = button.dataset.traitFilter;
        filters.forEach(item => {
            const active = item === button;
            item.classList.toggle('is-active', active);
            item.setAttribute('aria-pressed', String(active));
        });
        updateView();
    }));

    search.addEventListener('input', updateView);
    container.addEventListener('traitpresentationchange', updateView);
    container.addEventListener('change', () => {
        presets.forEach(preset => preset.classList.remove('is-active'));
        updateView();
    });
    container.addEventListener('input', updateView);
    document.addEventListener('click', event => {
        const preset = event.target.closest('.preset-btn');
        const reset = event.target.closest('[onclick="resetAll()"]');
        if (preset && workspace.contains(preset)) {
            presets.forEach(item => item.classList.toggle('is-active', item === preset));
            updateView();
        } else if (reset) {
            presets.forEach(item => item.classList.remove('is-active'));
            updateView();
        }
    });

    new MutationObserver(updateView).observe(container, { childList: true });
    new MutationObserver(localize).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    localize();
})();
