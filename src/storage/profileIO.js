// ============================================================
// PROFILE IMPORT / EXPORT LAYER
// ============================================================

function exportProfile() {
    const profileData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        userSelections: userSelections,
        userSubSelections: userSubSelections,
        userMeasurements: userMeasurements,
    };

    const jsonString = JSON.stringify(profileData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `anthropometric-profile-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('✓ Profile exported successfully!');
}

function buildCurrentProfileData() {
    return {
        version: '1.0',
        exportDate: new Date().toISOString(),
        userSelections: userSelections,
        userSubSelections: userSubSelections,
        userMeasurements: userMeasurements,
    };
}

async function saveProfileAsToMyProfile(profileName) {
    if (typeof saveAnthropometricProfileData !== 'function') {
        throw new Error('Profile library is unavailable.');
    }

    const trimmed = (profileName || '').trim();
    if (!trimmed) {
        throw new Error('Please enter a profile name.');
    }

    const fileName = `${trimmed}.json`;
    return await saveAnthropometricProfileData(trimmed, buildCurrentProfileData(), fileName, 'json');
}

function importProfile() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';

    fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const profileData = JSON.parse(event.target.result);

                // Validate the data has required fields
                if (!profileData.userSelections) {
                    throw new Error('Invalid profile file: missing userSelections');
                }

                // Restore the data
                userSelections = profileData.userSelections || {};
                userSubSelections = profileData.userSubSelections || {};
                userMeasurements = profileData.userMeasurements || {};

                // Update UI with restored data
                restoreUIFromData(profileData);

                // Recalculate and display scores
                updateAllScores();

                // Save to localStorage
                saveToLocalStorage();

                alert(`✓ Profile imported successfully!\n\nFile: ${file.name}`);
            } catch (error) {
                alert(`✗ Error importing profile:\n\n${error.message}`);
                console.error('Import error:', error);
            }
        };

        reader.readAsText(file);
    };

    fileInput.click();
}

function restoreUIFromData(data) {
    if (!data) return;

    // Restore selections
    Object.entries(data.userSelections || {}).forEach(([traitId, value]) => {
        const select = document.getElementById(`select-${traitId}`);
        if (select) {
            select.value = value;
        }
    });

    // Restore sub-selections
    Object.entries(data.userSubSelections || {}).forEach(([subId, value]) => {
        const select = document.getElementById(`select-${subId}`);
        if (select) {
            select.value = value;
        }
    });

    // Restore measurements
    Object.entries(data.userMeasurements || {}).forEach(([traitId, measurement]) => {
        if (measurement && measurement.values) {
            Object.entries(measurement.values).forEach(([fieldId, value]) => {
                const input = document.getElementById(`meas-${fieldId}`);
                if (input) {
                    input.value = value;
                }
            });
        }
    });
}
