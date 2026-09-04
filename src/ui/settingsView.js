(function () {
    const SETTINGS_TEMPLATE = `
        <div class="settings-overlay" id="settingsOverlay" onclick="closeSettings()"></div>
        <div class="settings-modal settings-shared" id="settingsModal" role="dialog" aria-modal="true" aria-labelledby="settingsTitle">
            <button class="close-settings" onclick="closeSettings()" aria-label="Close settings">✕</button>
            <div class="settings-layout">
                <nav class="settings-sidebar" aria-label="Settings sections">
                    <button class="settings-tab active" data-page="appearancePage" data-i18n="settings.appearance">🎨 Appearance</button>
                    <button class="settings-tab" data-page="enginePage" data-i18n="settings.engine">⚙ Engine</button>
                    <button class="settings-tab" data-page="themePage" data-i18n="settings.theme">🎛 Theme</button>
                    <button class="settings-tab" data-page="developerPage" data-i18n="settings.developer">🧪 Developer</button>
                    <button class="settings-tab" data-page="storagePage" data-i18n="settings.storage">💾 Storage</button>
                </nav>
                <div class="settings-content">
                    <section class="settings-page active" id="appearancePage">
                        <h2 id="settingsTitle" data-i18n="settings.appearance">🎨 Appearance</h2>
                        <div class="toggle-input-group">
                            <div class="toggle-label" data-i18n="settings.darkTheme">Dark Theme</div>
                            <button class="settings-theme-toggle" id="settingsThemeToggle" onclick="toggleTheme()">☀️</button>
                        </div>
                        <div class="toggle-input-group">
                            <label class="toggle-label" for="languageSelect" data-i18n="settings.language">Language</label>
                            <select class="settings-language-select" id="languageSelect" onchange="changeLanguage(this.value)">
                                <option value="en" aria-label="English">🇬🇧 English</option>
                                <option value="ru" aria-label="Russian">🇷🇺 Russian</option>
                            </select>
                        </div>
                    </section>
                    <section class="settings-page" id="enginePage">
                        <h2 data-i18n="settings.engine">⚙ Engine</h2>
                        <p data-i18n="common.info">Engine settings will appear here.</p>
                    </section>
                    <section class="settings-page" id="themePage">
                        <h2 data-i18n="settings.themeEditor">🎛 Theme Editor</h2>
                        <div class="color-input-group"><label data-i18n="settings.background">Background</label><input type="color" id="bgColor" onchange="updateDarkColor('bg')"><input type="text" id="bgColorText" onchange="updateDarkColorText('bg', this.value)"></div>
                        <div class="color-input-group"><label data-i18n="settings.panelBackground">Panel Background</label><input type="color" id="panelBgColor" onchange="updateDarkColor('panel-bg')"><input type="text" id="panelBgColorText" onchange="updateDarkColorText('panel-bg', this.value)"></div>
                        <div class="color-input-group"><label data-i18n="settings.textColor">Text Color</label><input type="color" id="textColor" onchange="updateDarkColor('text')"><input type="text" id="textColorText" onchange="updateDarkColorText('text', this.value)"></div>
                        <div class="color-input-group"><label data-i18n="settings.textLight">Text Light</label><input type="color" id="textLightColor" onchange="updateDarkColor('text-light')"><input type="text" id="textLightColorText" onchange="updateDarkColorText('text-light', this.value)"></div>
                        <div class="color-input-group"><label data-i18n="settings.accentColor">Accent Color</label><input type="color" id="accentColor" onchange="updateDarkColor('accent')"><input type="text" id="accentColorText" onchange="updateDarkColorText('accent', this.value)"></div>
                        <div class="color-input-group"><label data-i18n="settings.borderColor">Border Color</label><input type="color" id="borderColor" onchange="updateDarkColor('border')"><input type="text" id="borderColorText" onchange="updateDarkColorText('border', this.value)"></div>
                        <button onclick="saveDarkThemeColors()" data-i18n="buttons.save">💾 Save Theme</button>
                        <button class="reset" onclick="resetDarkThemeColors()" data-i18n="common.reset">↻ Reset to Default</button>
                    </section>
                    <section class="settings-page" id="developerPage">
                        <h2 data-i18n="settings.developer">🧪 Developer</h2>
                        <div class="toggle-input-group">
                            <div class="toggle-label" data-i18n="settings.showDevTools">Show Developer Tools</div>
                            <label class="toggle-switch" for="developerToolsVisibilityToggle"><input type="checkbox" id="developerToolsVisibilityToggle" onchange="toggleDeveloperToolsVisibility(this.checked)"><span class="toggle-slider"></span></label>
                            <div class="toggle-status" id="developerToolsVisibilityStatus"></div>
                        </div>
                    </section>
                    <section class="settings-page" id="storagePage">
                        <h2 data-i18n="settings.storage">💾 Storage</h2>
                        <div class="toggle-input-group">
                            <div class="toggle-label" data-i18n="settings.resetOnReload">Reset Data On Reload</div>
                            <label class="toggle-switch" for="resetOnReloadToggle"><input type="checkbox" id="resetOnReloadToggle" onchange="toggleResetOnReload(this.checked)"><span class="toggle-slider"></span></label>
                            <div class="toggle-status" id="resetOnReloadStatus"></div>
                        </div>
                    </section>
                </div>
            </div>
        </div>`;

    function renderSettingsView() {
        const root = document.querySelector('[data-settings-root]');
        const legacyModal = document.getElementById('settingsModal');
        const legacyOverlay = document.getElementById('settingsOverlay');

        if (root && !root.querySelector('#settingsModal')) {
            root.innerHTML = SETTINGS_TEMPLATE;
        } else if (!root && legacyModal) {
            const settingsRoot = document.createElement('div');
            settingsRoot.setAttribute('data-settings-root', '');
            legacyModal.parentNode.insertBefore(settingsRoot, legacyModal);
            settingsRoot.innerHTML = SETTINGS_TEMPLATE;
            legacyModal.remove();

            if (legacyOverlay) {
                legacyOverlay.remove();
            }
        }
    }

    window.renderSettingsView = renderSettingsView;
})();
