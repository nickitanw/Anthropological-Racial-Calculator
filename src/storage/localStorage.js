// ============================================================
// LOCAL STORAGE PERSISTENCE LAYER
// ============================================================

const RESET_ON_RELOAD_STORAGE_KEY = 'raceCalcResetOnReload';

function isResetOnReloadEnabled() {
    return localStorage.getItem(RESET_ON_RELOAD_STORAGE_KEY) === 'true';
}

function setResetOnReloadEnabled(enabled) {
    localStorage.setItem(RESET_ON_RELOAD_STORAGE_KEY, enabled ? 'true' : 'false');
}

function isReloadNavigation() {
    const navEntry = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
    if (navEntry && navEntry.type) {
        return navEntry.type === 'reload';
    }

    if (performance.navigation) {
        return performance.navigation.type === 1;
    }

    return false;
}

function shouldResetDataOnReload() {
    return isResetOnReloadEnabled() && isReloadNavigation();
}

function clearSavedCalculatorData() {
    localStorage.removeItem('raceCalcData');
}

function saveToLocalStorage() {
    try {
        const dataToSave = {
            userSelections: userSelections,
            userSubSelections: userSubSelections,
            userMeasurements: userMeasurements
        };
        localStorage.setItem('raceCalcData', JSON.stringify(dataToSave));
    } catch (e) {
        console.warn('Failed to save data to localStorage:', e);
    }
}

function loadFromLocalStorage() {
    try {
        if (shouldResetDataOnReload()) {
            clearSavedCalculatorData();
            return null;
        }

        const saved = localStorage.getItem('raceCalcData');
        if (!saved) return null;
        return JSON.parse(saved);
    } catch (e) {
        console.warn('Failed to load data from localStorage:', e);
        return null;
    }
}

function clearLocalStorage() {
    try {
        clearSavedCalculatorData();
        location.reload();
    } catch (e) {
        console.warn('Failed to clear localStorage:', e);
    }
}
