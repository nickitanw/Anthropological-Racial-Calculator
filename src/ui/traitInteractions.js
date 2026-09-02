// ============================================================
// TRAIT INTERACTION HANDLERS
// ============================================================

function handleSelectChange(traitId, value, selectEl) {
    console.log("handleSelectChange", traitId);
    userSelections[traitId] = value;
    // Update preview
    const preview = document.getElementById('preview-' + traitId);
    if (preview) {
        const trait = traits.find(t => t.id === traitId);
        if (trait) {
            const opt = trait.options.find(o => o.value === value);
            const contributions = getOptionContributions(opt);
            if (Object.keys(contributions).length > 0) {
                preview.innerHTML = generatePreviewHTML(contributions);
            } else {
                preview.innerHTML = '';
            }
        }
    }
    // If this is a cephalic/nasal trait with measurements, also check measurement-based category
    if (
    traitId === 'cephalicIndex' ||
    traitId === 'noseType' ||
    traitId === 'facialIndex' ||
    traitId === 'orbitalIndex'
) {
    handleMeasurementInput(traitId);
    return;
}

updateAllScores();
saveToLocalStorage();
}

function handleSubSelectChange(traitId, subId, value, selectEl) {
    userSubSelections[subId] = value;
    // Update composite preview
    const preview = document.getElementById('preview-' + traitId);
    if (preview) {
        const trait = traits.find(t => t.id === traitId);
        if (trait && trait.subTraits) {
            let allContribs = {};
            trait.subTraits.forEach(sub => {
                const subSel = document.getElementById('select-' + sub.id);
                if (subSel && subSel.value) {
                    const opt = sub.options.find(o => o.value === subSel.value);
                    const contributions = getOptionContributions(opt);
                    for (const [k, v] of Object.entries(contributions)) {
                        allContribs[k] = (allContribs[k] || 0) + v;
                    }
                }
            });
            preview.innerHTML = generatePreviewHTML(allContribs);
        }
    }
    updateAllScores();
    saveToLocalStorage();
}

function handleMeasurementInput(traitId) {
    const trait = traits.find(t => t.id === traitId);
    if (!trait || !trait.hasMeasurements) return;
    const calcResult = document.getElementById('calcResult-' + traitId);
    const selectEl = document.getElementById('select-' + traitId);

    let allFilled = true;
    const measurements = {};
    trait.measurementFields.forEach(f => {
        const inp = document.getElementById('meas-' + f.id);
        const val = inp ? parseFloat(inp.value) : NaN;
        if (!isNaN(val) && val > 0) {
            measurements[f.id] = val;
        } else {
            allFilled = false;
        }
    });

    if (allFilled && trait.calcIndex && trait.measurementFields.length >= 2) {
        const vals = trait.measurementFields.map(f => measurements[f.id]);
        const indexVal = trait.calcIndex(vals[0], vals[1]);
        const category = trait.categorizeIndex(parseFloat(indexVal));
        userMeasurements[traitId] = { values: measurements, index: indexVal, category: category };
        if (calcResult) {
            const catLabels = {
                'dolichocephalic': 'Dolichocephalic (< 75)',
                'mesocephalic': 'Mesocephalic (75–80)',
                'brachycephalic': 'Brachycephalic (80–85)',
                'hyperbrachycephalic': 'Hyperbrachycephalic (> 85)',
                'leptorrhine': 'Leptorrhine — Narrow Nose (< 70)',
                'mesorrhine': 'Mesorrhine — Medium Nose (70–85)',
                'platyrrhine': 'Platyrrhine — Broad Nose (> 85)',
                'hypereuryprosopic': 'Hypereuryprosopic (< 80)',
                'euryprosopic': 'Euryprosopic (80–85)',
                'mesoprosopic': 'Mesoprosopic (85–90)',
                'leptoprosopic': 'Leptoprosopic (90–95)',
                'hyperleptoprosopic': 'Hyperleptoprosopic (> 95)',
                'chamaeconch': 'Chamaeconch (< 83)',
                'mesoconch': 'Mesoconch (83–89)',
                'hypsiconch': 'Hypsiconch (> 89)'
            };
            calcResult.innerHTML =
                `Calculated Index: <strong>${indexVal}</strong> → <span class="index-category">${catLabels[category] || category}</span>`;
        }
        // Auto-select the category in the dropdown
        if (selectEl && category) {
            selectEl.value = category;
            userSelections[traitId] = category;
            const preview = document.getElementById('preview-' + traitId);
            if (preview) {
                const opt = trait.options.find(o => o.value === category);
                const contributions = getOptionContributions(opt);
                if (Object.keys(contributions).length > 0) {
                    preview.innerHTML = generatePreviewHTML(contributions);
                } else {
                    preview.innerHTML = '';
                }
            }
        }
    } else {
        if (calcResult) calcResult.innerHTML = '<em>Enter both measurements to calculate index</em>';
    }
    updateAllScores();
    saveToLocalStorage();
}

function generatePreviewHTML(contributions) {
    if (!contributions || Object.keys(contributions).length === 0) return '';
    const items = [];
    for (const [key, val] of Object.entries(contributions)) {
        if (val !== 0) {
            const typeName = getSubtypeName(key);
            const cls = val > 0 ? 'pos' : 'neg';
            const sign = val > 0 ? '+' : '';
            items.push(`<span class="${cls}">${typeName}: ${sign}${val}</span>`);
        }
    }
    return items.join(' ');
}
