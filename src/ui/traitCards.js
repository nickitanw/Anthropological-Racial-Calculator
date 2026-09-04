// ============================================================
// TRAIT CARD RENDERING MODULE
// ============================================================

function getWeightLabel(weightClass) {
    const map = {
        'A+': 'VERY HIGH',
        'A': 'HIGH',
        'A-': 'HIGH-MEDIUM',
        'B+': 'MEDIUM-HIGH',
        'B': 'MEDIUM',
        'C+': 'LOW',
        'C': 'VERY LOW'
    };

    return map[weightClass] || '';
}

function getLocalizedTraitValue(traitId, path, fallback) {
    if (!window.LOCALE || !traitId) return fallback;
    const key = `traits.${traitId}.${path}`;
    const value = window.LOCALE.get(key);
    return value && value !== key ? value : fallback;
}

function getLocalizedTraitOption(traitId, value, fallback) {
    if (!window.LOCALE) return fallback;
    if (value === '') return window.LOCALE.get('common.select', fallback);

    const specificKey = `traits.${traitId}.options.${value}`;
    const specificValue = window.LOCALE.get(specificKey);
    if (specificValue && specificValue !== specificKey) return specificValue;

    const commonKey = `traits.commonOptions.${value}`;
    const commonValue = window.LOCALE.get(commonKey);
    return commonValue && commonValue !== commonKey ? commonValue : fallback;
}

function getLocalizedSubTraitLabel(traitId, subTrait, fallback) {
    const specific = getLocalizedTraitValue(`${traitId}.subTraits.${subTrait.id}`, 'label', fallback);
    if (specific !== fallback) return specific;

    if (window.LOCALE) {
        let labelId = subTrait.id;
        const prefix = traitId.toLowerCase().replace(/s$/, '');
        if (labelId.toLowerCase().startsWith(prefix)) labelId = labelId.slice(prefix.length);
        labelId = labelId.replace(/^[A-Z]/, match => match.toLowerCase());
        const commonKey = `traits.commonOptions.${labelId}`;
        const commonValue = window.LOCALE.get(commonKey);
        if (commonValue && commonValue !== commonKey) return commonValue;
    }

    return fallback;
}

function applyTraitLocale() {
    if (!Array.isArray(traits)) return;

    traits.forEach(trait => {
        if (!trait || !trait.id) return;

        trait.title = getLocalizedTraitValue(trait.id, 'title', trait.title);
        trait.definition = getLocalizedTraitValue(trait.id, 'definition', trait.definition);
        trait.measurement = getLocalizedTraitValue(
            trait.id,
            'measurement',
            getLocalizedTraitValue(trait.id, 'measurementNote', trait.measurement)
        );
        trait.unit = getLocalizedTraitValue(
            trait.id,
            'unit',
            getLocalizedTraitValue('commonOptions', 'categorical', trait.unit)
        );

        if (Array.isArray(trait.measurementFields)) {
            trait.measurementFields.forEach(field => {
                if (!field || !field.id) return;
                field.label = getLocalizedTraitValue(`${trait.id}.fields.${field.id}`, 'label', field.label);
                field.placeholder = getLocalizedTraitValue(`${trait.id}.fields.${field.id}`, 'placeholder', field.placeholder);
            });
        }

        if (Array.isArray(trait.options)) {
            trait.options.forEach(option => {
                if (!option || option.value === undefined || option.value === null) return;
                option.label = getLocalizedTraitOption(trait.id, option.value, option.label);
            });
        }

        if (Array.isArray(trait.subTraits)) {
            trait.subTraits.forEach(subTrait => {
                if (!subTrait || !subTrait.id) return;
                subTrait.label = getLocalizedSubTraitLabel(trait.id, subTrait, subTrait.label);

                if (Array.isArray(subTrait.options)) {
                    subTrait.options.forEach(option => {
                        if (!option || option.value === undefined || option.value === null) return;
                        option.label = getLocalizedTraitOption(trait.id, option.value, option.label);
                    });
                }
            });
        }
    });
}

function buildAllTraitCards() {
    applyTraitLocale();
    traitsContainer.innerHTML = '';
    traits.forEach((trait, index) => {
        const card = document.createElement('div');
        card.className = 'trait-card';
        card.id = 'traitCard-' + trait.id;

        let bodyHTML = '';
        bodyHTML +=
            `<div class="definition">📖 <strong>${t('traitsLabels.definition', 'Definition:')}</strong> ${trait.definition}</div>`;
        bodyHTML +=
            `<div class="measurement-note">📏 <strong>${t('traitsLabels.measurement', 'Measurement:')}</strong> ${trait.measurement} | <strong>${t('traitsLabels.unit', 'Unit:')}</strong> ${trait.unit}</div>`;

        if (trait.type === 'select') {
            bodyHTML +=
                `<select id="select-${trait.id}" onchange="handleSelectChange('${trait.id}', this.value, this)">`;
            trait.options.forEach(opt => {
                bodyHTML +=
                    `<option value="${opt.value}" data-contributions='${JSON.stringify(getOptionContributions(opt))}'>${opt.label}</option>`;
            });
            bodyHTML += `</select>`;
            bodyHTML += `<div class="contributions-preview" id="preview-${trait.id}"></div>`;
        } else if (trait.type === 'cephalic' || trait.type === 'nasal' || trait.type === 'index') {
            if (trait.hasMeasurements && trait.measurementFields) {
                bodyHTML += `<div class="measurement-inputs">`;
                trait.measurementFields.forEach(f => {
                    bodyHTML +=
                        `<div class="input-group"><label>${f.label}</label><input type="number" id="meas-${f.id}" placeholder="${f.placeholder}" oninput="handleMeasurementInput('${trait.id}')" step="0.1" min="0"></div>`;
                });
                bodyHTML += `</div>`;
                bodyHTML +=
                    `<div class="calc-result" id="calcResult-${trait.id}"></div>`;
            }
            bodyHTML +=
                `<select id="select-${trait.id}" onchange="handleSelectChange('${trait.id}', this.value, this)">`;
            trait.options.forEach(opt => {
                bodyHTML +=
                    `<option value="${opt.value}" data-contributions='${JSON.stringify(getOptionContributions(opt))}'>${opt.label}</option>`;
            });
            bodyHTML += `</select>`;
            bodyHTML += `<div class="contributions-preview" id="preview-${trait.id}"></div>`;
        } else if (trait.type === 'composite') {
            trait.subTraits.forEach(sub => {
                bodyHTML +=
                    `<div class="sub-trait-row"><label>${sub.label}</label><select id="select-${sub.id}" onchange="handleSubSelectChange('${trait.id}', '${sub.id}', this.value, this)">`;
                sub.options.forEach(opt => {
                    bodyHTML +=
                        `<option value="${opt.value}" data-contributions='${JSON.stringify(getOptionContributions(opt))}'>${opt.label}</option>`;
                });
                bodyHTML += `</select></div>`;
            });
            bodyHTML +=
            `<div class="contributions-preview" id="preview-${trait.id}" style="margin-top:6px;"></div>`;
        }

        card.innerHTML = `
            <div class="trait-header" onclick="toggleTraitCard('${trait.id}')">
                <button class="guide-btn" onclick="showGuide(event, '${trait.id}')" title="How to measure this trait">?</button>
                <span class="trait-number">${trait.number}</span>
                <span class="trait-title"> ${trait.title} <span class="weight-label"> ${getWeightLabel(trait.weightClass)}  </span>
                <span class="trait-arrow">▼</span>
            </div>
            <div class="trait-body">${bodyHTML}</div>
        `;
        traitsContainer.appendChild(card);
    });
    buildScoreRows();
    updateAllScores();
}

function toggleTraitCard(id) {
    const card = document.getElementById('traitCard-' + id);
    if (card) {
        card.classList.toggle('open');
        if (card.classList.contains('open')) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    }
}
