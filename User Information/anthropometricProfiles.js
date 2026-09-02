// ============================================================
// ANTHROPOMETRIC PROFILE LIBRARY STORAGE + JS PARSER
// ============================================================

(function () {
    const PROFILE_LIBRARY_KEY = 'raceCalcAnthropometricProfiles';
    const PENDING_IMPORT_KEY = 'raceCalcPendingImportedProfile';
    const USER_INFORMATION_FILES_KEY = 'raceCalcUserInformationFiles';
    const USER_INFORMATION_PROFILES_FOLDER = 'User Information/Profiles';
    const FS_DB_NAME = 'raceCalcFileSystemHandles';
    const FS_DB_VERSION = 1;
    const FS_STORE_NAME = 'directoryHandles';
    const FS_PROFILES_HANDLE_KEY = 'profilesDirectory';
    const REQUIRED_PROFILE_KEYS = [
        'userSelections',
        'userSubSelections',
        'userMeasurements',
    ];

    let profilesDirectoryHandleCache = null;

    function normalizeName(name) {
        if (typeof name !== 'string') return '';
        return name.trim();
    }

    function isFileSystemProfilesSupported() {
        return typeof window.showDirectoryPicker === 'function' && typeof indexedDB !== 'undefined';
    }

    function loadProfileLibrary() {
        const raw = localStorage.getItem(PROFILE_LIBRARY_KEY);
        if (!raw) return [];

        try {
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) return [];
            return parsed;
        } catch (error) {
            console.warn('Failed to parse anthropometric profile library:', error);
            return [];
        }
    }

    function saveProfileLibrary(profiles) {
        localStorage.setItem(PROFILE_LIBRARY_KEY, JSON.stringify(profiles));
    }

    function normalizeFileName(rawName, fallbackName, defaultExt, forceJsonExt) {
        const baseName = normalizeName(rawName || fallbackName || 'profile')
            .replace(/[\\/:*?"<>|]/g, '-')
            .replace(/\s+/g, ' ')
            .trim();

        const safeBase = baseName || 'profile';
        const withoutExt = safeBase.replace(/\.(json|js)$/i, '');
        const lower = safeBase.toLowerCase();
        const ext = defaultExt || '.json';

        if (forceJsonExt) {
            return `${withoutExt || 'profile'}.json`;
        }

        if (lower.endsWith('.json') || lower.endsWith('.js')) {
            return safeBase;
        }

        return safeBase + ext;
    }

    function joinProfilesPath(fileName) {
        return `${USER_INFORMATION_PROFILES_FOLDER}/${fileName}`;
    }

    function getUniqueProfilesPath(preferredFileName, fallbackName, defaultExt) {
        const files = loadUserInformationFiles();
        const normalizedFileName = normalizeFileName(preferredFileName, fallbackName, defaultExt);

        const extensionIndex = normalizedFileName.lastIndexOf('.');
        const hasExtension = extensionIndex > 0;
        const stem = hasExtension ? normalizedFileName.slice(0, extensionIndex) : normalizedFileName;
        const extension = hasExtension ? normalizedFileName.slice(extensionIndex) : '';

        let candidateName = normalizedFileName;
        let candidatePath = joinProfilesPath(candidateName);
        let counter = 2;

        while (Object.prototype.hasOwnProperty.call(files, candidatePath)) {
            candidateName = `${stem} (${counter})${extension}`;
            candidatePath = joinProfilesPath(candidateName);
            counter += 1;
        }

        return {
            fileName: candidateName,
            filePath: candidatePath
        };
    }

    function getUniqueProfilesJsonName(preferredFileName, fallbackName) {
        const files = loadUserInformationFiles();
        const baseFileName = normalizeFileName(preferredFileName, fallbackName, '.json', true);
        const extensionIndex = baseFileName.lastIndexOf('.');
        const stem = extensionIndex > 0 ? baseFileName.slice(0, extensionIndex) : baseFileName;
        const extension = extensionIndex > 0 ? baseFileName.slice(extensionIndex) : '.json';

        let counter = 1;
        let candidate = baseFileName;
        while (Object.prototype.hasOwnProperty.call(files, joinProfilesPath(candidate))) {
            counter += 1;
            candidate = `${stem} (${counter})${extension}`;
        }

        return candidate;
    }

    function openHandleDb() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(FS_DB_NAME, FS_DB_VERSION);

            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains(FS_STORE_NAME)) {
                    db.createObjectStore(FS_STORE_NAME);
                }
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error || new Error('Failed to open IndexedDB.'));
        });
    }

    async function saveProfilesDirectoryHandle(handle) {
        if (!isFileSystemProfilesSupported()) return;

        const db = await openHandleDb();
        await new Promise((resolve, reject) => {
            const tx = db.transaction(FS_STORE_NAME, 'readwrite');
            tx.objectStore(FS_STORE_NAME).put(handle, FS_PROFILES_HANDLE_KEY);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error || new Error('Failed to save directory handle.'));
        });
        db.close();
    }

    async function loadProfilesDirectoryHandle() {
        if (!isFileSystemProfilesSupported()) return null;

        const db = await openHandleDb();
        const handle = await new Promise((resolve, reject) => {
            const tx = db.transaction(FS_STORE_NAME, 'readonly');
            const request = tx.objectStore(FS_STORE_NAME).get(FS_PROFILES_HANDLE_KEY);
            request.onsuccess = () => resolve(request.result || null);
            request.onerror = () => reject(request.error || new Error('Failed to load directory handle.'));
        });
        db.close();
        return handle;
    }

    async function hasReadWritePermission(handle) {
        if (!handle || typeof handle.queryPermission !== 'function') return false;

        const opts = { mode: 'readwrite' };
        let status = await handle.queryPermission(opts);
        if (status === 'granted') return true;

        if (typeof handle.requestPermission === 'function') {
            status = await handle.requestPermission(opts);
            return status === 'granted';
        }

        return false;
    }

    async function getConnectedProfilesDirectoryHandle() {
        if (!isFileSystemProfilesSupported()) return null;

        if (profilesDirectoryHandleCache) {
            const hasPermission = await hasReadWritePermission(profilesDirectoryHandleCache);
            if (hasPermission) return profilesDirectoryHandleCache;
            profilesDirectoryHandleCache = null;
        }

        const loadedHandle = await loadProfilesDirectoryHandle();
        if (!loadedHandle) return null;

        const hasPermission = await hasReadWritePermission(loadedHandle);
        if (!hasPermission) return null;

        profilesDirectoryHandleCache = loadedHandle;
        return loadedHandle;
    }

    async function connectProfilesDirectory() {
        if (!isFileSystemProfilesSupported()) {
            throw new Error('This browser does not support folder access. Use a Chromium browser over HTTPS or localhost.');
        }

        const pickedHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
        if (!pickedHandle) {
            throw new Error('No folder was selected.');
        }

        if (pickedHandle.name !== 'Profiles') {
            throw new Error('Please select the Profiles folder inside User Information.');
        }

        const granted = await hasReadWritePermission(pickedHandle);
        if (!granted) {
            throw new Error('Folder access was not granted.');
        }

        profilesDirectoryHandleCache = pickedHandle;
        await saveProfilesDirectoryHandle(pickedHandle);

        return {
            folderName: pickedHandle.name,
            virtualPath: USER_INFORMATION_PROFILES_FOLDER
        };
    }

    async function getProfilesDirectoryStatus() {
        if (!isFileSystemProfilesSupported()) {
            return {
                supported: false,
                connected: false,
                folderName: ''
            };
        }

        const connectedHandle = await getConnectedProfilesDirectoryHandle();
        return {
            supported: true,
            connected: !!connectedHandle,
            folderName: connectedHandle ? connectedHandle.name : ''
        };
    }

    async function ensureProfilesDirectoryConnected() {
        const handle = await getConnectedProfilesDirectoryHandle();
        if (!handle) {
            throw new Error('Profiles folder is not connected. Click Connect Profiles Folder in My Profile first.');
        }
        return handle;
    }

    async function writeProfileJsonFile(fileName, data) {
        const handle = await getConnectedProfilesDirectoryHandle();
        if (!handle) return; // No folder connected — localStorage only, silently skip file write.

        const normalizedFileName = normalizeFileName(fileName, 'profile', '.json', true);

        const fileHandle = await handle.getFileHandle(normalizedFileName, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(JSON.stringify(data, null, 2));
        await writable.close();
    }

    async function deleteProfileJsonFile(fileName) {
        if (!fileName) return;

        const handle = await getConnectedProfilesDirectoryHandle();
        if (!handle) return;

        try {
            await handle.removeEntry(fileName);
        } catch (error) {
            // Ignore missing file or permission errors during cleanup.
        }
    }

    function loadUserInformationFiles() {
        const raw = localStorage.getItem(USER_INFORMATION_FILES_KEY);
        if (!raw) return {};

        try {
            const parsed = JSON.parse(raw);
            return parsed && typeof parsed === 'object' ? parsed : {};
        } catch (error) {
            return {};
        }
    }

    function saveUserInformationFile(filePath, data) {
        const normalizedFilePath = normalizeName(filePath);
        if (!normalizedFilePath) return;

        const files = loadUserInformationFiles();
        files[normalizedFilePath] = {
            savedAt: new Date().toISOString(),
            data: data
        };

        localStorage.setItem(USER_INFORMATION_FILES_KEY, JSON.stringify(files));
    }

    function removeUserInformationFile(filePath) {
        const normalizedFilePath = normalizeName(filePath);
        if (!normalizedFilePath) return;

        const files = loadUserInformationFiles();
        if (!Object.prototype.hasOwnProperty.call(files, normalizedFilePath)) return;

        delete files[normalizedFilePath];
        localStorage.setItem(USER_INFORMATION_FILES_KEY, JSON.stringify(files));
    }

    function looksLikeProfileData(data) {
        if (!data || typeof data !== 'object' || Array.isArray(data)) return false;

        return REQUIRED_PROFILE_KEYS.some((key) => Object.prototype.hasOwnProperty.call(data, key));
    }

    function extractObjectExpression(jsSource) {
        const trimmed = jsSource.trim();
        if (!trimmed) return '';

        const patterns = [
            /export\s+default\s+([\s\S]*);?$/,
            /module\.exports\s*=\s*([\s\S]*);?$/,
            /const\s+\w+\s*=\s*([\s\S]*);?$/,
            /let\s+\w+\s*=\s*([\s\S]*);?$/,
            /var\s+\w+\s*=\s*([\s\S]*);?$/
        ];

        for (const pattern of patterns) {
            const match = trimmed.match(pattern);
            if (match && match[1]) {
                return match[1].trim();
            }
        }

        return trimmed;
    }

    function parseProfileSource(source) {
        if (typeof source !== 'string' || !source.trim()) {
            throw new Error('Profile file is empty.');
        }

        const raw = source.trim();

        try {
            return JSON.parse(raw);
        } catch (jsonError) {
            const expression = extractObjectExpression(raw);
            try {
                // JS profile files can be object literals or module-style exports.
                return Function('"use strict"; return (' + expression + ');')();
            } catch (jsError) {
                throw new Error('Unable to parse file as JS profile data. Expected an object literal or export assignment.');
            }
        }
    }

    function normalizeProfileData(data) {
        if (!looksLikeProfileData(data)) {
            throw new Error('Profile data is invalid. Expected anthropometric fields like userSelections.');
        }

        return {
            version: data.version || '1.0',
            userSelections: data.userSelections || {},
            userSubSelections: data.userSubSelections || {},
            userMeasurements: data.userMeasurements || {},
            exportDate: data.exportDate || ''
        };
    }

    function queueProfileForCalculator(profileData) {
        const normalizedData = normalizeProfileData(profileData);
        localStorage.setItem(PENDING_IMPORT_KEY, JSON.stringify(normalizedData));
    }

    function consumeQueuedProfileForCalculator() {
        const raw = localStorage.getItem(PENDING_IMPORT_KEY);
        if (!raw) return null;

        localStorage.removeItem(PENDING_IMPORT_KEY);

        try {
            const parsed = JSON.parse(raw);
            return normalizeProfileData(parsed);
        } catch (error) {
            throw new Error('Invalid pending imported profile data.');
        }
    }

    async function saveNamedAnthropometricProfile(profileName, source, sourceFileName) {
        const normalizedName = normalizeName(profileName);
        if (!normalizedName) {
            throw new Error('Please provide a profile name.');
        }

        const parsed = parseProfileSource(source);
        const normalizedData = normalizeProfileData(parsed);
        const uniqueFileName = getUniqueProfilesJsonName(sourceFileName, normalizedName);
        const storagePath = joinProfilesPath(uniqueFileName);

        await writeProfileJsonFile(uniqueFileName, normalizedData);

        const profiles = loadProfileLibrary();
        const profileRecord = {
            id: 'profile-' + Date.now() + '-' + Math.floor(Math.random() * 100000),
            name: normalizedName,
            sourceFileName: uniqueFileName,
            storagePath: storagePath,
            format: 'json',
            uploadedAt: new Date().toISOString(),
            data: normalizedData
        };

        profiles.push(profileRecord);
        saveProfileLibrary(profiles);
        saveUserInformationFile(profileRecord.storagePath, normalizedData);

        return profileRecord;
    }

    async function saveAnthropometricProfileData(profileName, profileData, sourceFileName, format) {
        const normalizedName = normalizeName(profileName);
        if (!normalizedName) {
            throw new Error('Please provide a profile name.');
        }

        const normalizedData = normalizeProfileData(profileData);
        const uniqueFileName = getUniqueProfilesJsonName(sourceFileName, normalizedName);
        const storagePath = joinProfilesPath(uniqueFileName);

        await writeProfileJsonFile(uniqueFileName, normalizedData);

        const profiles = loadProfileLibrary();
        const profileRecord = {
            id: 'profile-' + Date.now() + '-' + Math.floor(Math.random() * 100000),
            name: normalizedName,
            sourceFileName: uniqueFileName,
            storagePath: storagePath,
            format: format || 'json',
            uploadedAt: new Date().toISOString(),
            data: normalizedData
        };

        profiles.push(profileRecord);
        saveProfileLibrary(profiles);
        saveUserInformationFile(profileRecord.storagePath, normalizedData);

        return profileRecord;
    }

    function getAnthropometricProfiles() {
        return loadProfileLibrary();
    }

    function getAnthropometricProfileById(profileId) {
        return loadProfileLibrary().find((profile) => profile.id === profileId) || null;
    }

    async function removeAnthropometricProfile(profileId) {
        const profiles = loadProfileLibrary();
        const profileToRemove = profiles.find((profile) => profile.id === profileId);
        const next = profiles.filter((profile) => profile.id !== profileId);
        saveProfileLibrary(next);

        if (profileToRemove) {
            const legacyPath = profileToRemove.sourceFileName ? joinProfilesPath(profileToRemove.sourceFileName) : '';
            const filePath = profileToRemove.storagePath || legacyPath;
            removeUserInformationFile(filePath);

            const fileName = (profileToRemove.sourceFileName || '').trim();
            if (fileName) {
                await deleteProfileJsonFile(fileName);
            }
        }
    }

    async function renameAnthropometricProfile(profileId, newDisplayName) {
        const normalizedNewName = normalizeName(newDisplayName);
        if (!normalizedNewName) {
            throw new Error('Please enter a new name.');
        }

        const profiles = loadProfileLibrary();
        const profileIndex = profiles.findIndex((p) => p.id === profileId);
        if (profileIndex === -1) {
            throw new Error('Profile not found.');
        }

        const profile = profiles[profileIndex];
        const oldFileName = (profile.sourceFileName || '').trim();

        // Compute new filename derived from the new display name, skipping the old path in uniqueness check.
        const baseNewFileName = normalizeFileName(normalizedNewName, normalizedNewName, '.json', true);
        const extensionIndex = baseNewFileName.lastIndexOf('.');
        const stem = extensionIndex > 0 ? baseNewFileName.slice(0, extensionIndex) : baseNewFileName;
        const extension = extensionIndex > 0 ? baseNewFileName.slice(extensionIndex) : '.json';
        const files = loadUserInformationFiles();
        let newFileName = baseNewFileName;
        let counter = 2;
        while (
            Object.prototype.hasOwnProperty.call(files, joinProfilesPath(newFileName)) &&
            joinProfilesPath(newFileName) !== (profile.storagePath || '')
        ) {
            newFileName = `${stem} (${counter})${extension}`;
            counter += 1;
        }

        const newStoragePath = joinProfilesPath(newFileName);

        // Write new file and delete old one in the real folder if connected.
        const dirHandle = await getConnectedProfilesDirectoryHandle();
        if (dirHandle && profile.data) {
            try {
                await writeProfileJsonFile(newFileName, profile.data);
                if (oldFileName && oldFileName !== newFileName) {
                    await deleteProfileJsonFile(oldFileName);
                }
            } catch (_) {
                // Ignore filesystem errors; library record is still updated.
            }
        }

        // Update the localStorage file index.
        const oldStoragePath = profile.storagePath || (oldFileName ? joinProfilesPath(oldFileName) : '');
        if (oldStoragePath) removeUserInformationFile(oldStoragePath);
        saveUserInformationFile(newStoragePath, profile.data);

        // Update the library record.
        profiles[profileIndex] = {
            ...profile,
            name: normalizedNewName,
            sourceFileName: newFileName,
            storagePath: newStoragePath
        };
        saveProfileLibrary(profiles);

        return profiles[profileIndex];
    }

    window.saveNamedAnthropometricProfile = saveNamedAnthropometricProfile;
    window.saveAnthropometricProfileData = saveAnthropometricProfileData;
    window.getAnthropometricProfiles = getAnthropometricProfiles;
    window.getAnthropometricProfileById = getAnthropometricProfileById;
    window.removeAnthropometricProfile = removeAnthropometricProfile;
    window.queueProfileForCalculator = queueProfileForCalculator;
    window.consumeQueuedProfileForCalculator = consumeQueuedProfileForCalculator;
    window.normalizeAnthropometricProfileData = normalizeProfileData;
    window.getUserInformationFiles = loadUserInformationFiles;
    window.getUserInformationProfilesFolder = function () {
        return USER_INFORMATION_PROFILES_FOLDER;
    };
    window.connectProfilesDirectory = connectProfilesDirectory;
    window.getProfilesDirectoryStatus = getProfilesDirectoryStatus;
    window.isFileSystemProfilesSupported = isFileSystemProfilesSupported;
    window.renameAnthropometricProfile = renameAnthropometricProfile;
})();
