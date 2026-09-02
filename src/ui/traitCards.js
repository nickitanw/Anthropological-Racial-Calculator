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

function buildAllTraitCards() {
    traitsContainer.innerHTML = '';
    traits.forEach((trait, index) => {
        const card = document.createElement('div');
        card.className = 'trait-card';
        card.id = 'traitCard-' + trait.id;

        let bodyHTML = '';
        bodyHTML +=
            `<div class="definition">📖 <strong>Definition:</strong> ${trait.definition}</div>`;
        bodyHTML +=
            `<div class="measurement-note">📏 <strong>Measurement:</strong> ${trait.measurement} | <strong>Unit:</strong> ${trait.unit}</div>`;

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
