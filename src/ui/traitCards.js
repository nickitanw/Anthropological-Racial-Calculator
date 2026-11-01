// ============================================================
// TRAIT CARD RENDERING MODULE
// ============================================================

// Presentation order only. New traits not listed here appear at the end.
const TRAIT_DISPLAY_ORDER = Object.freeze([
    'eyeColor', 'hairColor', 'skinColor', 'hairForm',
    'cephalicIndex', 'occipitalContour',
    'facialIndex', 'cheekbones', 'forehead', 'chin',
    'orbitalIndex', 'eyeShape', 'eyeDepth', 'epicanthus', 'innerCanthalDistance',
    'noseType', 'nasalProfile', 'nasalBridgeHeight', 'nasalProjection', 'nasalTipMorphology',
    'prognathism', 'lipFullness', 'eyebrows', 'browRidges', 'ears', 'height'
]);

// Set to 'select' to restore the original dropdown presentation. The selects,
// selection handlers, and saved value format are identical in both modes.
const traitSelectionUI = { mode: 'radio' };

function setTraitSelectionUI(mode) {
    if (mode !== 'radio' && mode !== 'select') return;
    traitSelectionUI.mode = mode;
    if (traitsContainer) traitsContainer.dataset.selectionUi = mode;
    refreshTraitPresentation();
}

function orderedTraitsForDisplay() {
    const byId = new Map(traits.map(trait => [trait.id, trait]));
    const listed = new Set();
    const ordered = [];
    TRAIT_DISPLAY_ORDER.forEach(id => {
        if (listed.has(id)) return;
        listed.add(id);
        if (byId.has(id)) ordered.push(byId.get(id));
    });
    return ordered.concat(traits.filter(trait => !listed.has(trait.id)));
}

function traitCardIsComplete(card) {
    const selects = [...card.querySelectorAll('select[id^="select-"]')];
    return selects.length > 0 && selects.every(select => select.value !== '');
}

function refreshTraitPresentation() {
    if (!traitsContainer) return;
    traitsContainer.dataset.selectionUi = traitSelectionUI.mode;
    traitsContainer.querySelectorAll('.trait-card').forEach(card => {
        const selects = [...card.querySelectorAll('select[id^="select-"]')];
        const selectedLabels = selects.filter(select => select.value !== '')
            .map(select => select.selectedOptions[0]?.textContent?.trim()).filter(Boolean);
        const summary = card.querySelector('.trait-selected-value');
        if (summary) {
            summary.textContent = selectedLabels.join(' · ');
            summary.hidden = selectedLabels.length === 0;
        }
        const complete = traitCardIsComplete(card);
        card.classList.toggle('is-complete', complete);
        const status = card.querySelector('.trait-status');
        if (status) {
            status.textContent = complete ? t('traitsLabels.completed', 'Completed') : t('traitsLabels.missing', 'Missing');
        }
        selects.forEach(select => {
            card.querySelectorAll(`.trait-choice-list[data-select-id="${select.id}"] input[type="radio"]`).forEach(radio => {
                radio.checked = radio.value !== '' && radio.value === select.value;
                radio.closest('.trait-choice-row')?.classList.toggle('is-selected', radio.checked);
            });
        });
    });
    if (traitsContainer.dispatchEvent) traitsContainer.dispatchEvent(new Event('traitpresentationchange'));
}

function addRadioChoices(card) {
    card.querySelectorAll('select[id^="select-"]').forEach(select => {
        const list = document.createElement('div');
        list.className = 'trait-choice-list';
        list.dataset.selectId = select.id;
        list.setAttribute('role', 'radiogroup');
        const subLabel = select.closest('.sub-trait-row')?.querySelector('label');
        list.setAttribute('aria-label', subLabel?.textContent?.trim() || card.querySelector('.trait-title')?.textContent?.trim() || 'Trait options');
        [...select.options].forEach(option => {
            const row = document.createElement('label');
            row.className = 'trait-choice-row';
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `choice-${select.id}`;
            radio.value = option.value;
            radio.dataset.selectId = select.id;
            const text = document.createElement('span');
            text.textContent = option.textContent;
            row.append(radio, text);
            if (option.value === '') row.classList.add('trait-choice-clear');
            list.appendChild(row);
        });
        select.insertAdjacentElement('afterend', list);
    });
}

function closeTraitCard(card) {
    card?.classList.remove('open', 'active');
    const toggle = card?.querySelector('.trait-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
}

function initializeTraitChoiceEvents() {
    if (traitsContainer.dataset.choiceEventsReady) return;
    traitsContainer.dataset.choiceEventsReady = 'true';
    traitsContainer.addEventListener('change', event => {
        const target = event.target;
        if (target.matches('.trait-choice-list input[type="radio"]')) {
            const select = document.getElementById(target.dataset.selectId);
            if (!select) return;
            select.value = target.value;
            select.dispatchEvent(new Event('change', { bubbles: true }));
            return;
        }
        if (target.matches('select[id^="select-"]')) {
            refreshTraitPresentation();
            if (target.value && window.getTraitAutoCollapseMode?.() === 'after-selection') {
                closeTraitCard(target.closest('.trait-card'));
            }
        }
    });
    traitsContainer.addEventListener('input', event => {
        if (event.target.matches('.measurement-inputs input')) refreshTraitPresentation();
    });
}

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

function getTraitChoiceLabel(option) {
    return option.value === '' ? t('traitsLabels.none', 'None') : option.label;
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
    traitsContainer.dataset.selectionUi = traitSelectionUI.mode;
    orderedTraitsForDisplay().forEach((trait, index) => {
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
                    `<option value="${opt.value}" data-contributions='${JSON.stringify(getOptionContributions(opt))}'>${getTraitChoiceLabel(opt)}</option>`;
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
                    `<option value="${opt.value}" data-contributions='${JSON.stringify(getOptionContributions(opt))}'>${getTraitChoiceLabel(opt)}</option>`;
            });
            bodyHTML += `</select>`;
            bodyHTML += `<div class="contributions-preview" id="preview-${trait.id}"></div>`;
        } else if (trait.type === 'composite') {
            trait.subTraits.forEach(sub => {
                bodyHTML +=
                    `<div class="sub-trait-row"><label>${sub.label}</label><select id="select-${sub.id}" onchange="handleSubSelectChange('${trait.id}', '${sub.id}', this.value, this)">`;
                sub.options.forEach(opt => {
                    bodyHTML +=
                        `<option value="${opt.value}" data-contributions='${JSON.stringify(getOptionContributions(opt))}'>${getTraitChoiceLabel(opt)}</option>`;
                });
                bodyHTML += `</select></div>`;
            });
            bodyHTML +=
            `<div class="contributions-preview" id="preview-${trait.id}" style="margin-top:6px;"></div>`;
        }

        card.innerHTML = `
            <div class="trait-header" onclick="toggleTraitCard('${trait.id}')">
                <button type="button" class="guide-btn" onclick="showGuide(event, '${trait.id}')" title="How to measure this trait">?</button>
                <button type="button" class="trait-toggle" aria-expanded="false" aria-controls="traitBody-${trait.id}">
                    <span class="trait-number">${index + 1}</span>
                    <span class="trait-heading"><span class="trait-name-row"><span class="trait-title">${trait.title}</span><span class="trait-category">${trait.category === 'pigmentation' ? t('traitsLabels.pigmentation', 'Pigmentation') : t('traitsLabels.morphological', 'Morphological')}</span></span><span class="trait-selected-value" hidden></span></span>
                    <span class="trait-header-meta"><span class="weight-label">${trait.weightClass} · ${getWeightLabel(trait.weightClass)}</span><span class="trait-status"></span><span class="trait-arrow" aria-hidden="true">▼</span></span>
                </button>
            </div>
            <div class="trait-body" id="traitBody-${trait.id}"><div class="trait-body-clip"><div class="trait-body-content">${bodyHTML}</div></div></div>
        `;
        addRadioChoices(card);
        traitsContainer.appendChild(card);
    });
    initializeTraitChoiceEvents();
    refreshTraitPresentation();
    buildScoreRows();
    updateAllScores();
}

function toggleTraitCard(id) {
    const card = document.getElementById('traitCard-' + id);
    if (card) {
        const opening = !card.classList.contains('open');
        if (opening && window.getTraitAutoCollapseMode?.() === 'on-open') {
            traitsContainer.querySelectorAll('.trait-card.open').forEach(closeTraitCard);
        }
        card.classList.toggle('open', opening);
        card.classList.toggle('active', opening);
        card.querySelector('.trait-toggle')?.setAttribute('aria-expanded', String(opening));
    }
}
