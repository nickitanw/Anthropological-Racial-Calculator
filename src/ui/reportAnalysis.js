// Analytical views of the engine result. These functions never write scores or selections.
function buildReportAnalysis(result) {
    const sourceMetadata = new Map();
    const categoryCounts = {
        pigmentation: { selected: 0, total: 0 },
        morphological: { selected: 0, total: 0 }
    };

    traits.forEach(trait => {
        const fields = trait.subTraits || [trait];
        fields.forEach(field => {
            const category = field.category;
            categoryCounts[category].total++;
            const selectedValue = trait.subTraits ? userSubSelections[field.id] : userSelections[field.id];
            if (!selectedValue) return;
            categoryCounts[category].selected++;
            const option = field.options.find(item => item.value === selectedValue);
            if (!option) return;
            const traitName = trait.subTraits ? `${trait.title} - ${field.label}` : trait.title;
            sourceMetadata.set(`${traitName} (${option.label})`, {
                category,
                traitName,
                selection: option.label
            });
        });
    });

    const categories = {};
    for (const category of ['pigmentation', 'morphological']) {
        categories[category] = {
            scores: Object.fromEntries(SUBTYPE_KEYS.map(key => [key, 0])),
            entries: Object.fromEntries(SUBTYPE_KEYS.map(key => [key, []]))
        };
    }
    const entries = Object.fromEntries(SUBTYPE_KEYS.map(key => [key, []]));
    const ruleEntries = Object.fromEntries(SUBTYPE_KEYS.map(key => [key, []]));
    const unattributedEntries = Object.fromEntries(SUBTYPE_KEYS.map(key => [key, []]));

    SUBTYPE_KEYS.forEach(key => {
        (result.scoreBreakdown[key] || []).forEach(source => {
            const metadata = sourceMetadata.get(source.trait);
            const category = metadata?.category || (source.trait === 'Rule' || source.trait.startsWith('Rule (') ? 'rule' : 'unattributed');
            const entry = {
                trait: source.trait,
                value: source.value,
                category,
                traitName: metadata?.traitName || source.trait,
                selection: metadata?.selection || ''
            };
            entries[key].push(entry);
            if (categories[category]) {
                categories[category].scores[key] += source.value;
                categories[category].entries[key].push(entry);
            } else if (category === 'rule') {
                ruleEntries[key].push(entry);
            } else {
                unattributedEntries[key].push(entry);
            }
        });
    });

    for (const category of ['pigmentation', 'morphological']) {
        const subset = categories[category];
        subset.subtypeRanking = SUBTYPE_KEYS.map(key => ({
            key,
            name: getSubtypeName(key),
            score: subset.scores[key]
        })).sort((a, b) => b.score - a.score);
        // Reuse the application's group average and lead-subtype logic.
        subset.groupRanking = getGroupScoreEntries(subset.scores).sort((a, b) => b.score - a.score);
    }

    return { result, categories, categoryCounts, entries, ruleEntries, unattributedEntries };
}

function getReportTargetEntries(analysis, mode, targetKey) {
    if (mode === 'subtype') return [...(analysis.entries[targetKey] || [])];
    const keys = GROUPS[targetKey] || [];
    const divisor = keys.length || 1;
    const merged = new Map();
    keys.forEach(key => {
        (analysis.entries[key] || []).forEach(entry => {
            const identity = `${entry.category}\u0000${entry.trait}`;
            const existing = merged.get(identity);
            if (existing) existing.value += entry.value / divisor;
            else merged.set(identity, { ...entry, value: entry.value / divisor });
        });
    });
    return [...merged.values()];
}
