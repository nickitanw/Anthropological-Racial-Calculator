        // ============================================================
        // BUILD THE UI
        // ============================================================
        const traitsContainer = document.getElementById('traitsContainer');
        const scoreRowsDiv = document.getElementById('scoreRows');
        const closestTypeName = document.getElementById('closestTypeName');
        const secondaryTypes = document.getElementById('secondaryTypes');
        let breakdownData = {};

const TEST_PRESETS = {

    nordic: {},
    ladogan: {},
    eastBaltic: {},
    slavic: {},
    alpine: {},
    dinaric: {},
    mediterranean: {},
    nearEastern: {},
    northCaucasian: {},
    caucasion: {},
    caspian: {},
    eastAsian: {},
    mongolian: {},
    malay: {},
    ethiopian: {},
    subSaharan: {},
    amerindian: {}
};

const previousSubtypeScores = {};



Object.keys(TEST_PRESETS).forEach(type => {
    TEST_PRESETS[type] = generatePreset(type);
});



        // ============================================================
        // REPORT GENERATION
        // ============================================================
        // Type color mapping
        const TYPE_COLORS = (() => {
            const groupColors = {
                nordic: '#6b4c9f',
                ladogan: '#8aafec',
                eastBaltic: '#053544',
                slavic: '#4a9f8b',
                alpine: '#8b6b3b',
                dinaric: '#8b4a6b',
                mediterranean: '#9f6b3b',
                nearEastern: '#9f5a3b',
                northCaucasian: '#3d6828',
                asian: '#9f6b4a',
                african: '#8b5a2a'
            };

            const subtypeColors = {
                hallstatt: '#6b4c9f',
                eastNordic: '#7e63b6',
                tronder: '#563b88',
                eastBaltic: '#0f5b70',
                ladogan: '#8aafec',
                northernSlavic: '#4a9f8b',
                centralSlavic: '#63b8a1',
                ponticSlavic: '#377d6c',
                alpine: '#8b6b3b',
                dinaric: '#8b4a6b',
                westernMediterranean: '#9f6b3b',
                centralMediterranean: '#b07b48',
                easternMediterranean: '#8e5d31',
                southernMediterranean: '#c48f5a',
                levantine: '#9f5a3b',
                iranoAfghan: '#b56d47',
                armenoid: '#84452c',
                caucasion: '#2a5511',
                caspian: '#4c9a43',
                northAsian: '#8d6847',
                centralAsian: '#aa8050',
                eastAsian: '#9f6b4a',
                malay: '#bd7e59',
                amerindian: '#8b4a3a',
                subSaharan: '#7a4a28',
                ethiopian: '#8b5a3b'
            };

            return {
                ...groupColors,
                ...subtypeColors
            };
        })();

function getTypeColor(typeKey) {
    return TYPE_COLORS[typeKey] || '#8b6d5c';
}

function hexToRgb(hexColor) {
    const normalized = hexColor.replace('#', '');
    const value = normalized.length === 3
        ? normalized.split('').map(char => char + char).join('')
        : normalized;

    const intValue = Number.parseInt(value, 16);

    return {
        r: (intValue >> 16) & 255,
        g: (intValue >> 8) & 255,
        b: intValue & 255
    };
}

function getTypeBadgeColors(typeKey) {
    const border = getTypeColor(typeKey);
    const { r, g, b } = hexToRgb(border);

    return {
        border,
        background: `rgba(${r}, ${g}, ${b}, 0.16)`,
        text: border
    };
}

function getTypeBadgeStyle(typeKey) {
    const colors = getTypeBadgeColors(typeKey);

    return `background: ${colors.background}; border-color: ${colors.border}; color: ${colors.text};`;
}

        

        // Close report on overlay click
        document.getElementById('reportOverlay').addEventListener('click', function(e) {
            if (e.target === this) closeReport();
        });

        // Keyboard shortcut to close report
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeReport();
        });

        // ============================================================
        // INITIALIZE
        // ============================================================
        


        // APPLICATION CONTROLLER

function resetAll() {
            resetAllScores();
            updateAllScores();
            closestTypeName.textContent = '—';
            secondaryTypes.textContent = 'No traits selected';
        }


function loadPreset(presetName) {

    const preset = TEST_PRESETS[presetName];

    if (!preset) return;

    resetAllScores();

    Object.entries(preset).forEach(([traitId, value]) => {

        userSelections[traitId] = value;

        const select =
            document.getElementById(`select-${traitId}`);

        if (select) {
            select.value = value;
        }
    });
    
    updateAllScores();
}

        // ============================================================
        // COMPARE TYPES FEATURE
        // ============================================================

        function updateComparisonAnalysis() {
            const selectA = document.getElementById('comparisonTypeA');
            const selectB = document.getElementById('comparisonTypeB');
            const container = document.getElementById('comparisonAnalysisContainer');

            if (!selectA || !selectB || !container) return;

            const typeKeyA = selectA.value;
            const typeKeyB = selectB.value;

            if (!typeKeyA || !typeKeyB) {
                container.innerHTML = '<p style="color: #5c5240; text-align: center; padding: 20px;">Select both types to compare</p>';
                return;
            }

            if (typeKeyA === typeKeyB) {
                container.innerHTML = '<p style="color: #8b5a3b; text-align: center; padding: 20px;">Select different types to compare</p>';
                return;
            }

            const comparisons = getComparisonData(typeKeyA, typeKeyB);
            const typeNameA = getSubtypeName(typeKeyA);
            const typeNameB = getSubtypeName(typeKeyB);

            let html = `
                <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
                    <tr style="background: #3a2a18; color: #fefdf9;">
                        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #c49a3c;">Trait</th>
                        <th style="padding: 12px; text-align: center; border-bottom: 2px solid #c49a3c;">${typeNameA}</th>
                        <th style="padding: 12px; text-align: center; border-bottom: 2px solid #c49a3c;">${typeNameB}</th>
                        <th style="padding: 12px; text-align: center; border-bottom: 2px solid #c49a3c;">Difference</th>
                    </tr>
            `;

            comparisons.forEach(item => {
                const winnerName = item.diff > 0 ? typeNameA : typeNameB;
                const bgColor = item.diff > 0 ? 'rgba(45, 107, 30, 0.2)' : item.diff < 0 ? 'rgba(74, 159, 139, 0.2)' : 'transparent';

                html += `
                    <tr style="border-bottom: 1px solid #4a4a4a; background: ${bgColor};">
                        <td style="padding: 10px; text-align: left; color: #fefdf9;">${item.trait}</td>
                        <td style="padding: 10px; text-align: center; color: ${item.valueA >= 0 ? '#2d6b1e' : '#8b2020'}; font-weight: bold;">${item.valueA > 0 ? '+' : ''}${Math.round(item.valueA)}</td>
                        <td style="padding: 10px; text-align: center; color: ${item.valueB >= 0 ? '#2d6b1e' : '#8b2020'}; font-weight: bold;">${item.valueB > 0 ? '+' : ''}${Math.round(item.valueB)}</td>
                        <td style="padding: 10px; text-align: center; color: #d4b86c; font-weight: bold;">${winnerName} ${item.diff > 0 ? '+' : ''}${Math.round(Math.abs(item.diff))}</td>
                    </tr>
                `;
            });

            html += `</table>`;
            container.innerHTML = html;
        }

        


        

// ============================================================
// Presets
// ============================================================

function generatePreset(typeKey) {

    const preset = {};

    traits.forEach(trait => {

        // Обычные traits
        if (
            trait.options &&
            (
                trait.type === 'select' ||
                trait.type === 'cephalic' ||
                trait.type === 'nasal' ||
                trait.type === 'index'
            )
        ) {

            let bestValue = '';
            let bestScore = -9999;

            trait.options.forEach(opt => {

               const contributions = getOptionContributions(opt);

               const own = getScoreValueForTypeKey(contributions, typeKey);

const rival =
    Math.max(0,
        ...SUBTYPE_KEYS
            .filter(key => key !== typeKey)
            .map(key => getScoreValueForTypeKey(contributions, key))
    );

const score = own - rival;

                if (
                    opt.value &&
                    score > bestScore
                ) {
                    bestScore = score;
                    bestValue = opt.value;
                }

            });

            if (bestValue) {
                preset[trait.id] = bestValue;
            }
        }

        // Composite traits
        if (
            trait.type === 'composite' &&
            trait.subTraits
        ) {

            trait.subTraits.forEach(subTrait => {

                let bestValue = '';
                let bestScore = -9999;

                subTrait.options.forEach(opt => {

                    const contributions = getOptionContributions(opt);

                    const score =
                        getScoreValueForTypeKey(contributions, typeKey);

                    if (
                        opt.value &&
                        score > bestScore
                    ) {
                        bestScore = score;
                        bestValue = opt.value;
                    }

                });

                if (bestValue) {
                    preset[subTrait.id] = bestValue;
                }

            });

        }

    });

    return preset;
}



// ============================================================
// APPLICATION BOOTSTRAP
// ============================================================

        function init() {
            initializeSettings();
            _initGuide();
            buildAllTraitCards();
            updateAllScores();
            populateDevTools();
            initDevToolsState();

            document.querySelectorAll('.preset-btn').forEach(btn => {

    const badgeName = btn.dataset.badge;
    const badgeColors = getTypeBadgeColors(badgeName);

    btn.style.background = badgeColors.background;
    btn.style.color = badgeColors.text;
    btn.style.border =
        `2px solid ${badgeColors.border}`;

});

            // Open first trait card by default
            const firstCard = document.getElementById('traitCard-eyeColor');
            if (firstCard) firstCard.classList.add('open', 'active');
        }




        init();