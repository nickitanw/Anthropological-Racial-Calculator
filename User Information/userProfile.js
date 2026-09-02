// ============================================================
// USER PROFILE STORAGE LAYER
// ============================================================

(function () {
    const PROFILE_NAME_KEY = 'raceCalcProfileName';

    function normalizeProfileName(name) {
        if (typeof name !== 'string') return '';
        return name.trim();
    }

    function saveProfileName(name) {
        const normalized = normalizeProfileName(name);

        if (!normalized) {
            localStorage.removeItem(PROFILE_NAME_KEY);
            return '';
        }

        localStorage.setItem(PROFILE_NAME_KEY, normalized);
        return normalized;
    }

    function getProfileName() {
        const stored = localStorage.getItem(PROFILE_NAME_KEY);
        return normalizeProfileName(stored || '');
    }

    function clearProfileName() {
        localStorage.removeItem(PROFILE_NAME_KEY);
    }

    window.saveProfileName = saveProfileName;
    window.getProfileName = getProfileName;
    window.clearProfileName = clearProfileName;
})();
