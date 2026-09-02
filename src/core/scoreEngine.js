// ============================================================
// SCORE ENGINE
// ============================================================

const WEIGHT_CLASSES = {
    'A+': 4.5,
    'A': 4,
    'A-': 3.5,
    'B+': 3,
    'B': 2,
    'C+': 1.5,
    'C': 1,
    'C-': 0.5
};

const CUSTOM_WEIGHT_CLASSES = {
    ...WEIGHT_CLASSES
};

const CATEGORY_LEVELS = {
    veryDominant: 8,
    dominant: 6,
    common: 4,
    secondary: 2,
    occasional: 1,
    negligible: 0,
    rare: -2,
    veryRare: -4,
    exceptional: -8

};

const CATEGORY_LEVEL_LOOKUP = Object.entries(CATEGORY_LEVELS).reduce(
    (lookup, [key, value]) => {
        lookup[key] = value;
        lookup[key.toLowerCase()] = value;
        return lookup;
    },
    {}
);

function normalizeResolvedScoreMap(rawMap, valueResolver) {
    if (!rawMap) {
        return {};
    }

    const resolved = {};

    Object.entries(rawMap).forEach(([typeKey, rawValue]) => {
        const normalizedValue = valueResolver(rawValue);

        if (normalizedValue === undefined) {
            return;
        }

        const targets = resolveSubtypeTargets(typeKey);

        targets.forEach(targetKey => {
            resolved[targetKey] = (resolved[targetKey] || 0) + normalizedValue;
        });
    });

    return resolved;
}

function getOptionContributions(option) {
    if (!option) return {};

    if (option.categories) {
        return normalizeResolvedScoreMap(option.categories, category => {
            if (typeof category === 'number') {
                return category;
            }

            const normalizedCategory =
                typeof category === 'string'
                    ? category.trim().toLowerCase()
                    : '';

            return CATEGORY_LEVEL_LOOKUP[normalizedCategory];
        });
    }

    return normalizeResolvedScoreMap(option.contributions || {}, value => {
        const numericValue = Number(value);
        return Number.isFinite(numericValue) ? numericValue : undefined;
    });
}

function getOptionSynergyMap(option, fieldName) {
    if (!option || !option[fieldName]) {
        return {};
    }

    return normalizeResolvedScoreMap(option[fieldName], value => {
        const numericValue = Number(value);
        return Number.isFinite(numericValue) ? numericValue : undefined;
    });
}

function recordContribution(
    breakdownData,
    typeKey, 
    value,
    traitName,
     optionLabel = '') {
    if (!breakdownData[typeKey]) {
        breakdownData[typeKey] = [];
    }

    const displayName = optionLabel ? `${traitName} (${optionLabel})` : traitName;

    breakdownData[typeKey].push({
        trait: displayName,
        value: value
    });
}

const ENGINE_INFO = {

    id: "historical-engine",

    name: "Historical Reconstruction Engine",

    version: "1.6.0",

    stage: "Engine 1.6",

    algorithm: "Weighted Contribution + Rule Engine",

    build: "2026.07.06",

    supportedProfileVersion: "1.0",

    features: {

        weightedContributions: true,

        ruleEngine: true,

        combinationRules: true,

        contradictionRules: false,

        adjustments: false,

        mixedTypes: false,

        confidence: false,

        bayesianModel: false

    }


};

function initBreakdown() {
    scoreBreakdown = {};

    SUBTYPE_KEYS.forEach(type => {
        scoreBreakdown[type] = [];
    });
}

function resolveWeightOverride(weightOverride, subtypeKey) {
    if (weightOverride == null) {
        return undefined;
    }

    if (typeof weightOverride === 'string' || typeof weightOverride === 'number') {
        return weightOverride;
    }

    const groupKey = SUBTYPE_TO_GROUP[subtypeKey];

    return (
        weightOverride[subtypeKey] ??
        (groupKey ? weightOverride[groupKey] : undefined)
    );
}

function normalizeWeightValue(weightValue) {
    if (weightValue === undefined || weightValue === null) {
        return undefined;
    }

    if (typeof weightValue === 'number' && Number.isFinite(weightValue)) {
        return weightValue;
    }

    if (CUSTOM_WEIGHT_CLASSES[weightValue] !== undefined) {
        return CUSTOM_WEIGHT_CLASSES[weightValue];
    }

    const numericValue = Number(weightValue);

    return Number.isFinite(numericValue) ? numericValue : undefined;
}

function getWeightForSubtype(weightClass, customWeightClasses, subtypeKey, optionCustomWeight = null) {
    const optionWeight = normalizeWeightValue(
        resolveWeightOverride(optionCustomWeight, subtypeKey)
    );

    if (optionWeight !== undefined) {
        return optionWeight;
    }

    const traitWeight = normalizeWeightValue(
        resolveWeightOverride(customWeightClasses, subtypeKey)
    );

    if (traitWeight !== undefined) {
        return traitWeight;
    }

    return WEIGHT_CLASSES[weightClass] || 1;
}

function applyCategories(
    contributionStore,
    synergySourceStore,
    option,
    weightClass = 'C',
    customWeightClasses = null,
    optionCustomWeight = null,
    traitName = 'Unknown',
    optionLabel = '',
    sourceId = ''
)
 {
    const contributions = getOptionContributions(option);
    const positiveSynergy = getOptionSynergyMap(option, 'positiveSynergy');
    const negativeSynergy = getOptionSynergyMap(option, 'negativeSynergy');
    const balanceSynergy = getOptionSynergyMap(option, 'balanceSynergy');
    const negativeBalanceSynergy = getOptionSynergyMap(option, 'negativeBalanceSynergy');

    if (!contributions) return;

    synergySourceStore.push({
        sourceId,
        positiveSynergy,
        negativeSynergy,
        balanceSynergy,
        negativeBalanceSynergy
    });

    SUBTYPE_KEYS.forEach(key => {
        if (contributions[key] !== undefined) {
            const weight = getWeightForSubtype(
                weightClass,
                customWeightClasses,
                key,
                optionCustomWeight
            );
            const weightedValue = contributions[key] * weight;

            contributionStore.push({
                subtypeKey: key,
                baseValue: weightedValue,
                traitName,
                optionLabel,
                sourceId
            });
        }
    });
}

function applySynergyPass(baseContributions, synergySources) {
    if (!Array.isArray(baseContributions) || baseContributions.length === 0) {
        return [];
    }

    const activeSynergySources = Array.isArray(synergySources) ? synergySources : [];

    return baseContributions.map(targetContribution => {
        const isPositiveTarget = targetContribution.baseValue > 0;
        const isNegativeTarget = targetContribution.baseValue < 0;

        if (!isPositiveTarget && !isNegativeTarget) {
            return {
                ...targetContribution,
                synergyRate: 0,
                synergyAdjustment: 0,
                finalValue: targetContribution.baseValue
            };
        }

        const totalSynergyRate = activeSynergySources.reduce((accumulator, source) => {
            if (source.sourceId === targetContribution.sourceId) {
                return accumulator;
            }

            if (isPositiveTarget) {
                return accumulator + (source.positiveSynergy[targetContribution.subtypeKey] || 0);
            }

            return accumulator + (source.negativeSynergy[targetContribution.subtypeKey] || 0);
        }, 0);

        const totalBalanceRate = activeSynergySources.reduce((accumulator, source) => {
            if (source.sourceId === targetContribution.sourceId) {
                return accumulator;
            }

            if (isPositiveTarget) {
                return accumulator + (source.balanceSynergy[targetContribution.subtypeKey] || 0);
            }

            return accumulator + (source.negativeBalanceSynergy[targetContribution.subtypeKey] || 0);
        }, 0);

        const effectiveSynergyRate = totalSynergyRate > 0 ? totalSynergyRate : 0;
        const effectiveBalanceRate = totalBalanceRate > 0 ? totalBalanceRate : 0;
        const netRate = Math.max(-1, effectiveSynergyRate - effectiveBalanceRate);
        const synergyAdjustment = targetContribution.baseValue * netRate;

        return {
            ...targetContribution,
            synergyRate: netRate,
            synergyBoostRate: effectiveSynergyRate,
            synergyBalanceRate: effectiveBalanceRate,
            synergyAdjustment,
            finalValue: targetContribution.baseValue + synergyAdjustment
        };
    });
}

function recalculateAllScores() {
    const localScores = createEmptyScores();
    const localBreakdown = createEmptyBreakdown();
    const baseContributions = [];
    const synergySources = [];

    for (const [traitId, value] of Object.entries(userSelections)) {
        const trait = traits.find(t => t.id === traitId);
        if (!trait) continue;
        if (trait.type === 'select' || trait.type === 'cephalic' || trait.type === 'nasal' || trait.type === 'index') {
            const opt = trait.options.find(o => o.value === value);
            if (opt) {
                applyCategories(
                    baseContributions,
                    synergySources,
                    opt,
                    trait.weightClass,
                    trait.customWeightClasses,
                    opt.customWeight ?? opt.customWeightClasses,
                    trait.title,
                    opt.label,
                    `trait:${traitId}`
                );
            }
        }
    }

    for (const [subId, value] of Object.entries(userSubSelections)) {
        for (const trait of traits) {
            if (trait.type === 'composite' && trait.subTraits) {
                const sub = trait.subTraits.find(s => s.id === subId);
                if (sub) {
                    const opt = sub.options.find(o => o.value === value);
                    if (opt) {
                        applyCategories(
                            baseContributions,
                            synergySources,
                            opt,
                            trait.weightClass,
                            trait.customWeightClasses,
                            opt.customWeight ?? opt.customWeightClasses,
                            trait.title + ' - ' + sub.label,
                            opt.label,
                            `subtrait:${subId}`
                        );
                    }
                    break;
                }
            }
        }
    }

    const finalizedContributions = applySynergyPass(baseContributions, synergySources);

    finalizedContributions.forEach(contribution => {
        localScores[contribution.subtypeKey] += contribution.finalValue;

        recordContribution(
            localBreakdown,
            contribution.subtypeKey,
            contribution.finalValue,
            contribution.traitName,
            contribution.optionLabel
        );
    });

scores = localScores;
scoreBreakdown = localBreakdown;
engineRules(scores);
return {

    scores: localScores,

    scoreBreakdown: localBreakdown

};

}

function calculateProgress() {
    let filledCount = 0;
    let totalCount = 0;

    traits.forEach(trait => {
        if (trait.type === 'select' || trait.type === 'cephalic' || trait.type === 'nasal' || trait.type === 'index') {
            totalCount++;
            if (userSelections[trait.id] && userSelections[trait.id] !== '') {
                filledCount++;
            }
        } else if (trait.type === 'composite' && trait.subTraits) {
            trait.subTraits.forEach(sub => {
                totalCount++;
                if (userSubSelections[sub.id] && userSubSelections[sub.id] !== '') {
                    filledCount++;
                }
            });
        }
    });

    return { filledCount, totalCount };
}

function getScoreRanking(scoresData) {

    return SUBTYPE_KEYS
        .map(key => ({
            key,
            name: getSubtypeName(key),
            score: scoresData[key]
        }))
        .sort((a, b) => b.score - a.score);

}

function getGroupRanking(scoresData) {

    return getGroupScoreEntries(scoresData)
        .sort((a, b) => b.score - a.score);

}

function resetAllScores() {
    SUBTYPE_KEYS.forEach(k => { scores[k] = 0; });
    userSelections = {};
    userSubSelections = {};
    userMeasurements = {};
    document.querySelectorAll('select').forEach(sel => {
        if (sel.id.startsWith('select-') || sel.id.startsWith('adv')) {
            sel.value = '';
        }
    });
    document.querySelectorAll('input[type="number"]').forEach(inp => { inp.value = ''; });
    document.querySelectorAll('.contributions-preview').forEach(p => { p.innerHTML = ''; });
    document.querySelectorAll('.calc-result').forEach(c => { c.innerHTML = ''; });
    clearSavedCalculatorData();
    updateAllScores();
    document.querySelectorAll('.trait-card').forEach(c => { c.classList.remove('open', 'active'); });
}


function calculateProfile(){

    const engineResult =
        recalculateAllScores();

    return buildResult(engineResult);

}

function buildResult(engineResult) {

    const scoresCopy =
    structuredClone(engineResult.scores);

    const breakdownCopy =
    structuredClone(
        engineResult.scoreBreakdown);

    const ranking =
        getScoreRanking(scoresCopy);

    const groupRanking =
        getGroupRanking(scoresCopy);

    const groupScores =
        Object.fromEntries(
            groupRanking.map(item => [item.key, item.score])
        );

    const progress =
        calculateProgress();

    return {

        engine: structuredClone(ENGINE_INFO),

        scores: scoresCopy,

        groupScores,

        scoreBreakdown: breakdownCopy,

        ranking,

        groupRanking,

        progress

    };

}

function createEmptyScores(){

    const scores = {};

    SUBTYPE_KEYS.forEach(type => {

        scores[type] = 0;

    });

    return scores;

}

function createEmptyBreakdown(){

    const breakdown = {};

    SUBTYPE_KEYS.forEach(type => {

        breakdown[type] = [];

    });

    return breakdown;

}


function applyRuleSet(ruleSet, scoresData) {

    ruleSet.forEach(rule => {

        if (!rule.enabled) return;

        if (!rule.condition()) return;

        rule.effects.forEach(effect => {

            const targets = resolveSubtypeTargets(effect.type);

            if (targets.length === 0) {
                return;
            }

            targets.forEach(targetKey => {

                scoresData[targetKey] += effect.value;

                recordContribution(
                    scoreBreakdown,
                    targetKey,
                    effect.value,
                    "Rule",
                    rule.name
                );

            });

        });

    });

}

function engineRules(scoresData){

    applyRuleSet(ENGINE_RULES.combinations, scoresData);
    applyRuleSet(ENGINE_RULES.contradictions, scoresData);
    applyRuleSet(ENGINE_RULES.modifiers, scoresData);
    applyRuleSet(ENGINE_RULES.macros, scoresData);

}