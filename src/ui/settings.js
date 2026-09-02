// ============================================================
// SHARED SETTINGS MODULE (Menu + Calculator)
// ============================================================

(function () {

    function initializeSettingsTabs(){

    document
    .querySelectorAll(".settings-tab")
    .forEach(button=>{

        button.onclick=()=>{

            document
            .querySelectorAll(".settings-tab")
            .forEach(x=>
                x.classList.remove("active")
            );

            button.classList.add("active");

            document
            .querySelectorAll(".settings-page")
            .forEach(x=>
                x.classList.remove("active")
            );

            document
            .getElementById(
                button.dataset.page
            )
            .classList.add("active");

        };

    });

}
    const DEFAULT_DARK_COLORS = {
        'bg': '#1a1a1a',
        'panel-bg': '#2d2d2d',
        'border': '#4a4a4a',
        'text': '#e8e8e8',
        'text-light': '#a8a8a8',
        'accent': '#c49a3c',
        'accent-light': '#d4b86c',
        'highlight': '#e8c547'
    };

    const RESET_ON_RELOAD_KEY = 'raceCalcResetOnReload';
    const DEV_TOOLS_VISIBLE_KEY = 'raceCalcDeveloperToolsVisible';

    function rgbToHex(str) {
        if (!str) return '#000000';
        if (str.startsWith('#')) return str;
        const rgb = str.match(/\d+/g);
        if (!rgb || rgb.length < 3) return '#000000';
        return '#' + [rgb[0], rgb[1], rgb[2]].map(x => {
            const hex = parseInt(x, 10).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('').toUpperCase();
    }

    function loadDarkThemeColors() {
        const saved = localStorage.getItem('darkThemeColors');
        if (!saved) return;

        try {
            const colors = JSON.parse(saved);
            Object.keys(colors).forEach(key => {
                document.body.style.setProperty(`--${key}`, colors[key]);
            });
        } catch (e) {
            console.warn('Failed to parse saved dark theme colors:', e);
        }
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.add('dark-mode');
        }

        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }

        if (savedTheme === 'light') {
            document.body.classList.remove('dark-mode');
        }

        const btn = document.getElementById('themeToggle');
        if (btn) {
            btn.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        }

        loadDarkThemeColors();
    }

    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');

        const btn = document.getElementById('themeToggle');
        if (btn) {
            btn.innerHTML = isDarkMode ? '☀️' : '🌙';
        }

        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }

    function updateColorInputs() {
        Object.keys(DEFAULT_DARK_COLORS).forEach(key => {
            const colorId = key.replace(/-/g, '');
            const currentValue = getComputedStyle(document.body).getPropertyValue(`--${key}`).trim();
            const input = document.getElementById(colorId + 'Color');
            const textInput = document.getElementById(colorId + 'ColorText');

            if (input) input.value = rgbToHex(currentValue);
            if (textInput) textInput.value = currentValue;
        });
    }

    function updateDarkColor(colorKey) {
        const colorId = colorKey.replace(/-/g, '');
        const colorInput = document.getElementById(colorId + 'Color');
        const textInput = document.getElementById(colorId + 'ColorText');
        if (!colorInput) return;

        const hexColor = colorInput.value;
        document.body.style.setProperty(`--${colorKey}`, hexColor);
        if (textInput) textInput.value = hexColor;
    }

    function updateDarkColorText(colorKey, value) {
        const colorId = colorKey.replace(/-/g, '');
        const colorInput = document.getElementById(colorId + 'Color');
        document.body.style.setProperty(`--${colorKey}`, value);

        try {
            if (colorInput) colorInput.value = rgbToHex(value);
        } catch (e) {
            // Ignore invalid temporary text values while typing.
        }
    }

    function saveDarkThemeColors() {
        const colors = {};
        Object.keys(DEFAULT_DARK_COLORS).forEach(key => {
            const value = getComputedStyle(document.body).getPropertyValue(`--${key}`).trim();
            colors[key] = value;
        });

        localStorage.setItem('darkThemeColors', JSON.stringify(colors));
        alert('✓ Dark theme colors saved!');
    }

    function resetDarkThemeColors() {
        if (!confirm('Reset colors to default?')) return;

        Object.keys(DEFAULT_DARK_COLORS).forEach(key => {
            document.body.style.removeProperty(`--${key}`);
        });

        localStorage.removeItem('darkThemeColors');
        updateColorInputs();
        alert('✓ Colors reset to default!');
    }

    function isResetOnReloadEnabled() {
        return localStorage.getItem(RESET_ON_RELOAD_KEY) === 'true';
    }

    function setResetOnReloadEnabled(enabled) {
        localStorage.setItem(RESET_ON_RELOAD_KEY, enabled ? 'true' : 'false');
    }

    function updateResetOnReloadControls() {
        const toggle = document.getElementById('resetOnReloadToggle');
        const statusText = document.getElementById('resetOnReloadStatus');
        if (!toggle) return;

        const enabled = isResetOnReloadEnabled();
        toggle.checked = enabled;

        if (statusText) {
            statusText.textContent = enabled ? 'Enabled' : 'Disabled';
        }
    }

    function toggleResetOnReload(enabled) {
        setResetOnReloadEnabled(enabled);
        updateResetOnReloadControls();
    }

    function isDeveloperToolsVisible() {
        const stored = localStorage.getItem(DEV_TOOLS_VISIBLE_KEY);
        return stored === 'true';
    }

    function setDeveloperToolsVisible(visible) {
        localStorage.setItem(DEV_TOOLS_VISIBLE_KEY, visible ? 'true' : 'false');
    }

    function applyDeveloperToolsVisibility() {
        const visible = isDeveloperToolsVisible();
        const panel = document.getElementById('devToolsSection');
        const openButton = document.getElementById('openDevPanelButton');

        if (panel) {
            panel.style.display = visible ? '' : 'none';
        }

        if (openButton) {
            openButton.style.display = visible ? '' : 'none';
        }
    }

    function updateDeveloperToolsVisibilityControls() {
        const toggle = document.getElementById('developerToolsVisibilityToggle');
        const statusText = document.getElementById('developerToolsVisibilityStatus');
        if (!toggle) return;

        const visible = isDeveloperToolsVisible();
        toggle.checked = visible;

        if (statusText) {
            statusText.textContent = visible ? 'Visible' : 'Hidden';
        }
    }

    function toggleDeveloperToolsVisibility(visible) {
        setDeveloperToolsVisible(visible);
        updateDeveloperToolsVisibilityControls();
        applyDeveloperToolsVisibility();
    }

    function openSettings() {
        const modal = document.getElementById('settingsModal');
        const overlay = document.getElementById('settingsOverlay');
        if (modal) modal.classList.add('active');
        if (overlay) overlay.classList.add('active');

        updateColorInputs();
        updateResetOnReloadControls();
        updateDeveloperToolsVisibilityControls();
    }

    function closeSettings() {
        const modal = document.getElementById('settingsModal');
        const overlay = document.getElementById('settingsOverlay');
        if (modal) modal.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    }

    function initializeSettings() {
        loadTheme();
        updateResetOnReloadControls();
        updateDeveloperToolsVisibilityControls();
        applyDeveloperToolsVisibility();
        initializeSettingsTabs();
    }

    window.DEFAULT_DARK_COLORS = DEFAULT_DARK_COLORS;
    window.rgbToHex = rgbToHex;
    window.loadDarkThemeColors = loadDarkThemeColors;
    window.loadTheme = loadTheme;
    window.toggleTheme = toggleTheme;
    window.updateColorInputs = updateColorInputs;
    window.updateDarkColor = updateDarkColor;
    window.updateDarkColorText = updateDarkColorText;
    window.saveDarkThemeColors = saveDarkThemeColors;
    window.resetDarkThemeColors = resetDarkThemeColors;
    window.isResetOnReloadEnabled = isResetOnReloadEnabled;
    window.setResetOnReloadEnabled = setResetOnReloadEnabled;
    window.updateResetOnReloadControls = updateResetOnReloadControls;
    window.toggleResetOnReload = toggleResetOnReload;
    window.isDeveloperToolsVisible = isDeveloperToolsVisible;
    window.setDeveloperToolsVisible = setDeveloperToolsVisible;
    window.applyDeveloperToolsVisibility = applyDeveloperToolsVisibility;
    window.updateDeveloperToolsVisibilityControls = updateDeveloperToolsVisibilityControls;
    window.toggleDeveloperToolsVisibility = toggleDeveloperToolsVisibility;
    window.openSettings = openSettings;
    window.closeSettings = closeSettings;
    window.initializeSettings = initializeSettings;
})();
