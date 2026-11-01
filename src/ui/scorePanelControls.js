// Menu and tooltip behavior only; action buttons retain their original handlers.
(function () {
    const trigger = document.getElementById('scoreMoreTrigger');
    const menu = document.getElementById('scoreMoreMenu');
    const info = document.querySelector('#scorePanel .score-info');
    if (!trigger || !menu) return;

    function setMenuOpen(open) {
        menu.hidden = !open;
        trigger.setAttribute('aria-expanded', String(open));
    }

    function availableItems() {
        return [...menu.querySelectorAll('button')].filter(button => !button.hidden && getComputedStyle(button).display !== 'none');
    }

    trigger.addEventListener('click', () => setMenuOpen(menu.hidden));
    trigger.addEventListener('keydown', event => {
        if (event.key !== 'ArrowDown') return;
        event.preventDefault();
        setMenuOpen(true);
        availableItems()[0]?.focus();
    });

    menu.addEventListener('click', event => {
        if (event.target.closest('button')) setMenuOpen(false);
    });
    menu.addEventListener('keydown', event => {
        if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
        const items = availableItems();
        const index = items.indexOf(document.activeElement);
        if (index < 0 || !items.length) return;
        event.preventDefault();
        items[(index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus();
    });

    document.addEventListener('click', event => {
        if (!trigger.contains(event.target) && !menu.contains(event.target)) setMenuOpen(false);
        if (info && !info.contains(event.target)) info.open = false;
    });
    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        if (!menu.hidden) {
            setMenuOpen(false);
            trigger.focus();
        }
        if (info) info.open = false;
    });
})();
