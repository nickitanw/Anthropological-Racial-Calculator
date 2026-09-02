// ============================================================
// DEVELOPER TOOLS MODULE
// ============================================================

const TAB_SWITCH_ANIMATION_MS = 450;
let tabSwitchTimer = null;
let currentDevResult = null;
let cachedDiagnosticsRules = null;

function escapeDevHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getDiagnosticsMode() {
    const modeSelect = document.getElementById('devDiagnosticsMode');
    return modeSelect?.value || 'trait';
}

function getAllEngineRules() {
    if (cachedDiagnosticsRules) {
        return cachedDiagnosticsRules;
    }

    const groups = ['combinations', 'contradictions', 'modifiers', 'macros'];
    const titles = {
        combinations: 'Combinations',
        contradictions: 'Contradictions',
        modifiers: 'Modifiers',
        macros: 'Macros'
    };

    const rules = [];

    groups.forEach(group => {
        const set = ENGINE_RULES?.[group];
        if (!Array.isArray(set)) {
            return;
        }

        set.forEach(rule => {
            rules.push({
                key: `${group}::${rule.id || rule.name || 'rule'}`,
                group,
                groupTitle: titles[group] || group,
                rule
            });
        });
    });

    cachedDiagnosticsRules = rules;
    return rules;
}

function populateDiagnosticsItems() {
    const select = document.getElementById('devTraitDiagnosticsSelect');
    const label = document.getElementById('devDiagnosticsSelectLabel');
    const mode = getDiagnosticsMode();

    if (!select) return;

    if (mode === 'rule') {
        if (label) {
            label.textContent = 'Select Rule to Inspect:';
        }

        select.innerHTML = '<option value="">-- Select Rule --</option>';

        const rules = getAllEngineRules();
        rules.forEach(item => {
            const option = document.createElement('option');
            option.value = item.key;
            option.textContent = `[${item.groupTitle}] ${item.rule.name || item.rule.id || 'Unnamed Rule'}`;
            select.appendChild(option);
        });
        return;
    }

    if (label) {
        label.textContent = 'Select Trait to Inspect:';
    }

    select.innerHTML = '<option value="">-- Select Trait --</option>';

    traits.forEach(trait => {
        const option = document.createElement('option');
        option.value = trait.id;
        option.textContent = trait.title;
        select.appendChild(option);
    });
}

function splitTopLevelAndClauses(expression) {
    const clauses = [];
    let depthParen = 0;
    let depthBracket = 0;
    let depthBrace = 0;
    let inSingle = false;
    let inDouble = false;
    let current = '';

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        const next = expression[i + 1];

        if (char === "'" && !inDouble && expression[i - 1] !== '\\') {
            inSingle = !inSingle;
        } else if (char === '"' && !inSingle && expression[i - 1] !== '\\') {
            inDouble = !inDouble;
        }

        if (!inSingle && !inDouble) {
            if (char === '(') depthParen++;
            if (char === ')') depthParen--;
            if (char === '[') depthBracket++;
            if (char === ']') depthBracket--;
            if (char === '{') depthBrace++;
            if (char === '}') depthBrace--;

            const atTopLevel = depthParen === 0 && depthBracket === 0 && depthBrace === 0;
            if (atTopLevel && char === '&' && next === '&') {
                if (current.trim()) {
                    clauses.push(current.trim());
                }
                current = '';
                i++;
                continue;
            }
        }

        current += char;
    }

    if (current.trim()) {
        clauses.push(current.trim());
    }

    return clauses;
}

function extractConditionExpression(conditionSource) {
    const cleaned = conditionSource.trim();
    const returnWrapped = cleaned.match(/return\s*\(([^]*)\)\s*;?$/);
    if (returnWrapped) {
        return returnWrapped[1].trim();
    }

    const returnSimple = cleaned.match(/return\s+([^;]+)\s*;?$/);
    if (returnSimple) {
        return returnSimple[1].trim();
    }

    return cleaned;
}

function getTraitValueLabel(traitId, rawValue) {
    if (rawValue === undefined || rawValue === null || rawValue === '') {
        return 'not selected';
    }

    const trait = Array.isArray(traits)
        ? traits.find(item => item.id === traitId)
        : null;

    if (!trait) {
        return String(rawValue);
    }

    const options = Array.isArray(trait.options) ? trait.options : [];
    const option = options.find(opt => opt.value === rawValue);
    return option?.label || String(rawValue);
}

function getRuleConditionChecklist(rule, conditionSource) {
    if (!rule?.condition) {
        return [];
    }

    const expression = extractConditionExpression(conditionSource);
    const clauses = splitTopLevelAndClauses(expression);

    return clauses.map(clause => {
        let met = false;
        let error = null;

        try {
            met = Boolean(Function('userSelections', `return (${clause});`)(userSelections));
        } catch (evaluationError) {
            error = evaluationError;
        }

        const fields = [...new Set(
            [...clause.matchAll(/userSelections\.([a-zA-Z0-9_]+)/g)]
                .map(match => match[1])
        )];

        const currentValues = fields
            .map(field => {
                const trait = Array.isArray(traits)
                    ? traits.find(item => item.id === field)
                    : null;
                const title = trait?.title || field;
                const rawValue = userSelections?.[field];
                const label = getTraitValueLabel(field, rawValue);
                return {
                    title,
                    rawValue,
                    label
                };
            });

        return {
            clause,
            met,
            error,
            currentValues
        };
    });
}

function renderRuleDiagnostics(ruleEntry) {
    const { groupTitle, rule } = ruleEntry;

    let conditionMet = false;
    let evaluationError = null;

    try {
        conditionMet = Boolean(rule.condition?.());
    } catch (error) {
        evaluationError = error;
    }

    const conditionSource = rule.condition
        ? rule.condition
            .toString()
            .replace(/^condition\s*\(\)\s*\{/, '')
            .replace(/\}\s*$/, '')
            .trim()
        : 'No condition function available.';

    const checklist = getRuleConditionChecklist(rule, conditionSource);
    const fulfilledCount = checklist.filter(item => item.met && !item.error).length;
    const checklistHtml = checklist.length === 0
        ? '<div style="color: var(--text-light);">No condition checklist available.</div>'
        : checklist.map(item => {
            const statusColor = item.error
                ? '#c94a3b'
                : item.met
                    ? '#2d6b1e'
                    : '#7a6f64';
            const statusLabel = item.error
                ? 'Error'
                : item.met
                    ? 'Met'
                    : 'Not met';

            const valuesHtml = item.currentValues.length === 0
                ? ''
                : `<div style="margin-top: 6px; font-size: 0.8rem; color: var(--text-light);">
                    ${item.currentValues
                        .map(value => `${escapeDevHtml(value.title)}: <b style="color: var(--text);">${escapeDevHtml(value.label)}</b>${value.rawValue !== undefined && value.rawValue !== null && value.rawValue !== '' ? ` <span style="opacity: .75;">(${escapeDevHtml(String(value.rawValue))})</span>` : ''}`)
                        .join(' | ')}
                </div>`;

            return `
                <div style="padding: 10px; background: rgba(196, 154, 60, 0.08); border-radius: 4px; border-left: 3px solid ${statusColor}; margin-bottom: 8px;">
                    <div style="display: flex; justify-content: space-between; gap: 12px; align-items: center; margin-bottom: 6px;">
                        <div style="font-size: 0.82rem; color: var(--text-light); letter-spacing: 0.4px; text-transform: uppercase;">Requirement</div>
                        <div style="font-size: 0.82rem; font-weight: bold; color: ${statusColor};">${statusLabel}</div>
                    </div>
                    <pre style="margin: 0; white-space: pre-wrap; word-break: break-word; font-size: 0.8rem; line-height: 1.4; color: var(--text); font-family: Consolas, monospace;">${escapeDevHtml(item.clause)}</pre>
                    ${valuesHtml}
                    ${item.error ? `<div style="margin-top: 6px; font-size: 0.8rem; color: #c94a3b;">${escapeDevHtml(item.error.message || String(item.error))}</div>` : ''}
                </div>
            `;
        }).join('');

    const effects = Array.isArray(rule.effects) ? rule.effects : [];
    const effectsHtml = effects.length === 0
        ? '<div style="color: var(--text-light);">No effects configured.</div>'
        : effects
            .map(effect => {
                const typeName = getSubtypeName(effect.type);
                const value = Number(effect.value) || 0;
                const color = value > 0 ? '#2d6b1e' : value < 0 ? '#c94a3b' : '#7a6f64';
                return `
                    <div style="padding: 8px 10px; background: rgba(196, 154, 60, 0.08); border-radius: 4px; border-left: 3px solid ${color};">
                        <div style="font-size: 0.82rem; color: var(--text-light);">${escapeDevHtml(typeName)}</div>
                        <div style="font-weight: bold; color: ${color};">${value > 0 ? '+' : ''}${Math.round(value)}</div>
                    </div>
                `;
            })
            .join('');

    return `
        <div style="display: grid; gap: 12px;">
            <div style="padding: 12px; background: rgba(196, 154, 60, 0.08); border-left: 3px solid var(--accent); border-radius: 4px;">
                <div style="font-size: 0.8rem; color: var(--text-light); letter-spacing: 0.4px; text-transform: uppercase; margin-bottom: 4px;">Rule Group</div>
                <div style="font-weight: bold; color: var(--accent);">${escapeDevHtml(groupTitle)}</div>
            </div>

            <div style="padding: 12px; background: rgba(196, 154, 60, 0.08); border-left: 3px solid var(--accent); border-radius: 4px;">
                <div style="font-size: 0.8rem; color: var(--text-light); letter-spacing: 0.4px; text-transform: uppercase; margin-bottom: 4px;">Rule Name</div>
                <div style="font-weight: bold; color: var(--text);">${escapeDevHtml(rule.name || 'Unnamed Rule')}</div>
                <div style="margin-top: 6px; font-size: 0.85rem; color: var(--text-light);">ID: ${escapeDevHtml(rule.id || 'n/a')}</div>
                <div style="margin-top: 6px; font-size: 0.85rem; color: ${rule.enabled ? '#2d6b1e' : '#c94a3b'}; font-weight: bold;">${rule.enabled ? 'Enabled' : 'Disabled'}</div>
            </div>

            <div style="padding: 12px; background: rgba(196, 154, 60, 0.08); border-left: 3px solid var(--accent); border-radius: 4px;">
                <div style="font-size: 0.8rem; color: var(--text-light); letter-spacing: 0.4px; text-transform: uppercase; margin-bottom: 4px;">Current Condition Status</div>
                <div style="font-weight: bold; color: ${evaluationError ? '#c94a3b' : conditionMet ? '#2d6b1e' : '#7a6f64'};">
                    ${evaluationError ? 'Condition evaluation failed' : conditionMet ? 'Condition met for current inputs' : 'Condition not met for current inputs'}
                </div>
                ${checklist.length > 0 ? `<div style="margin-top: 6px; font-size: 0.82rem; color: var(--text-light);">Requirements met: <b style="color: var(--text);">${fulfilledCount}/${checklist.length}</b></div>` : ''}
                ${evaluationError ? `<div style="margin-top: 6px; font-size: 0.82rem; color: #c94a3b;">${escapeDevHtml(evaluationError.message || String(evaluationError))}</div>` : ''}
            </div>

            <div style="padding: 12px; background: rgba(196, 154, 60, 0.08); border-left: 3px solid var(--accent); border-radius: 4px;">
                <div style="font-size: 0.8rem; color: var(--text-light); letter-spacing: 0.4px; text-transform: uppercase; margin-bottom: 8px;">Fulfillment Checklist</div>
                ${checklistHtml}
            </div>

            <div style="padding: 12px; background: rgba(196, 154, 60, 0.08); border-left: 3px solid var(--accent); border-radius: 4px;">
                <div style="font-size: 0.8rem; color: var(--text-light); letter-spacing: 0.4px; text-transform: uppercase; margin-bottom: 8px;">Effects</div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
                    ${effectsHtml}
                </div>
            </div>

            <div style="padding: 12px; background: rgba(196, 154, 60, 0.08); border-left: 3px solid var(--accent); border-radius: 4px;">
                <div style="font-size: 0.8rem; color: var(--text-light); letter-spacing: 0.4px; text-transform: uppercase; margin-bottom: 8px;">Condition Source</div>
                <pre style="margin: 0; white-space: pre-wrap; word-break: break-word; font-size: 0.8rem; line-height: 1.45; color: var(--text); font-family: Consolas, monospace;">${escapeDevHtml(conditionSource)}</pre>
            </div>
        </div>
    `;
}

function devRefreshDiagnostics() {
    populateDiagnosticsItems();
    devUpdateTraitDiagnostics();
}

function switchTab(tabName) {
    const selectedTab = document.getElementById(tabName);
    if (!selectedTab) return;

    const activeTab = document.querySelector('.tab-content.active');

    if (tabSwitchTimer) {
        clearTimeout(tabSwitchTimer);
        tabSwitchTimer = null;
    }

    document.querySelectorAll('.tab-content.closing').forEach(tab => {
        tab.classList.remove('closing');
    });

    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.nav-tab[onclick="switchTab('${tabName}')"]`)?.classList.add('active');

    if (!activeTab || activeTab === selectedTab) {
        selectedTab.classList.add('active');
        return;
    }

    activeTab.classList.remove('active');
    activeTab.classList.add('closing');
    selectedTab.classList.remove('closing');

    tabSwitchTimer = setTimeout(() => {
        activeTab.classList.remove('closing');
        selectedTab.classList.add('active');
        tabSwitchTimer = null;
    }, TAB_SWITCH_ANIMATION_MS);
}

function populateDevTools() {
    const compTypeA = document.getElementById('devComparisonTypeA');
    const compTypeB = document.getElementById('devComparisonTypeB');
    const traitDiag = document.getElementById('devTraitDiagnosticsSelect');

    if (compTypeA) {
        SUBTYPE_KEYS.forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = getSubtypeName(key);
            compTypeA.appendChild(option);
        });
    }

    if (compTypeB) {
        SUBTYPE_KEYS.forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = getSubtypeName(key);
            compTypeB.appendChild(option);
        });
    }

    if (traitDiag) {
        populateDiagnosticsItems();
    }
}

function getComparisonData(scoreBreakdown, typeKeyA, typeKeyB) {
    const contributorsA = scoreBreakdown[typeKeyA] || [];
    const contributorsB = scoreBreakdown[typeKeyB] || [];

    const traitMap = {};

    contributorsA.forEach(item => {
        traitMap[item.trait] = { trait: item.trait, valueA: item.value, valueB: 0 };
    });

    contributorsB.forEach(item => {
        if (traitMap[item.trait]) {
            traitMap[item.trait].valueB = item.value;
        } else {
            traitMap[item.trait] = { trait: item.trait, valueA: 0, valueB: item.value };
        }
    });

    let comparisons = Object.values(traitMap);
    comparisons.forEach(item => {
        item.diff = item.valueA - item.valueB;
        item.absDiff = Math.abs(item.diff);
    });
    comparisons.sort((a, b) => b.absDiff - a.absDiff);

    return comparisons;
}

function devUpdateComparisonAnalysis() {
    const selectA = document.getElementById('devComparisonTypeA');
    const selectB = document.getElementById('devComparisonTypeB');
    const container = document.getElementById('devComparisonOutput');

    if (!selectA || !selectB || !container) return;

    const typeKeyA = selectA.value;
    const typeKeyB = selectB.value;

    if (!typeKeyA || !typeKeyB) {
        container.innerHTML = '<p style="text-align: center; padding: 12px; color: #8b6d5c;">Select both types to compare</p>';
        return;
    }

    if (typeKeyA === typeKeyB) {
        container.innerHTML = '<p style="text-align: center; padding: 12px; color: #8b6d5c;">Select different types to compare</p>';
        return;
    }

    const comparisons = getComparisonData(currentDevResult.scoreBreakdown, typeKeyA, typeKeyB);
    const typeNameA = getSubtypeName(typeKeyA);
    const typeNameB = getSubtypeName(typeKeyB);

    let html = `
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; font-family: inherit;">
            <tr style="background: rgba(196, 154, 60, 0.1); border-bottom: 2px solid var(--border);">
                <th style="padding: 10px; text-align: left; color: var(--accent); font-weight: bold;">Trait</th>
                <th style="padding: 10px; text-align: center; color: var(--accent); font-weight: bold;">${typeNameA}</th>
                <th style="padding: 10px; text-align: center; color: var(--accent); font-weight: bold;">${typeNameB}</th>
                <th style="padding: 10px; text-align: center; color: var(--accent); font-weight: bold;">Difference</th>
            </tr>
    `;

    comparisons.forEach(item => {
        const winnerName = item.diff > 0 ? typeNameA : typeNameB;
        const bgColor = item.diff > 0 ? 'rgba(45, 107, 30, 0.08)' : item.diff < 0 ? 'rgba(74, 159, 139, 0.08)' : 'transparent';

        html += `
            <tr style="border-bottom: 1px solid var(--border); background: ${bgColor};">
                <td style="padding: 8px 10px; text-align: left; color: var(--text);">${item.trait}</td>
                <td style="padding: 8px 10px; text-align: center; color: ${item.valueA >= 0 ? '#2d6b1e' : '#c94a3b'}; font-weight: bold;">${item.valueA > 0 ? '+' : ''}${Math.round(item.valueA)}</td>
                <td style="padding: 8px 10px; text-align: center; color: ${item.valueB >= 0 ? '#2d6b1e' : '#c94a3b'}; font-weight: bold;">${item.valueB > 0 ? '+' : ''}${Math.round(item.valueB)}</td>
                <td style="padding: 8px 10px; text-align: center; color: #c49a3c; font-weight: bold;">${winnerName} ${item.diff > 0 ? '+' : ''}${Math.round(Math.abs(item.diff))}</td>
            </tr>
        `;
    });

    html += `</table>`;
    container.innerHTML = html;
}

function getTraitDiagnostics(traitId) {
    const trait = traits.find(t => t.id === traitId);
    if (!trait) return null;

    let options = [];

    if (trait.type === 'select' || trait.type === 'cephalic' || trait.type === 'nasal' || trait.type === 'index') {
        options = (trait.options || []).map(opt => ({
            ...opt,
            contributions: getOptionContributions(opt)
        }));
    } else if (trait.type === 'composite' && trait.subTraits) {
        trait.subTraits.forEach(sub => {
            sub.options.forEach(opt => {
                options.push({
                    label: `${sub.label}: ${opt.label}`,
                    value: opt.value,
                    contributions: getOptionContributions(opt),
                    isComposite: true,
                    parentLabel: sub.label
                });
            });
        });
    }

    return {
        trait: trait,
        options: options,
        type: trait.type,
        weightClass: trait.weightClass
    };
}

function devUpdateTraitDiagnostics() {
    const select = document.getElementById('devTraitDiagnosticsSelect');
    const container = document.getElementById('devTraitDiagnosticsOutput');
    const mode = getDiagnosticsMode();

    if (!select || !container) return;

    if (mode === 'rule') {
        const selectedRuleKey = select.value;
        if (!selectedRuleKey) {
            container.innerHTML = '<p style="text-align: center; padding: 12px; color: #8b6d5c;">Select a rule to inspect details and effects</p>';
            return;
        }

        const ruleEntry = getAllEngineRules().find(item => item.key === selectedRuleKey);
        if (!ruleEntry) {
            container.innerHTML = '<p style="text-align: center; padding: 12px; color: #8b6d5c;">Rule not found</p>';
            return;
        }

        container.innerHTML = renderRuleDiagnostics(ruleEntry);
        return;
    }

    const traitId = select.value;
    if (!traitId) {
        container.innerHTML = '<p style="text-align: center; padding: 12px; color: #8b6d5c;">Select a trait to inspect contributions</p>';
        return;
    }

    const diagnostics = getTraitDiagnostics(traitId);
    if (!diagnostics || diagnostics.options.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 12px; color: #8b6d5c;">This trait has no options to display</p>';
        return;
    }

    let html = `<div>`;

    diagnostics.options.forEach(opt => {
        html += `
            <div style="margin-bottom: 16px; padding: 12px; background: rgba(196, 154, 60, 0.08); border-left: 3px solid var(--accent); border-radius: 4px;">
                <div style="font-weight: bold; margin-bottom: 10px; color: var(--accent); font-size: 0.95rem;">
                    ${opt.isComposite ? `${opt.parentLabel} → ` : ''}${opt.label}
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; font-size: 0.85rem;">
        `;

        SUBTYPE_KEYS.forEach(key => {
            const contribution = opt.contributions?.[key] ?? 0;
            const typeName = getSubtypeName(key);
            const color = contribution > 0 ? '#2d6b1e' : contribution < 0 ? '#c94a3b' : '#7a6f64';
            const bgColor = contribution > 0 ? 'rgba(45, 107, 30, 0.12)' : contribution < 0 ? 'rgba(201, 74, 59, 0.12)' : 'rgba(122, 111, 100, 0.08)';

            const weight = WEIGHT_CLASSES[diagnostics.weightClass] || 1;
            const weightedValue = contribution * weight;
            const displayValue = contribution === 0 ? '0' : `${contribution > 0 ? '+' : ''}${contribution}${weight !== 1 ? `(${weightedValue > 0 ? '+' : ''}${Math.round(weightedValue)})` : ''}`;

            html += `
                <div style="padding: 6px 8px; background: ${bgColor}; border-radius: 3px; border-left: 2px solid ${color};">
                    <div style="color: var(--text-light); font-size: 0.8rem; margin-bottom: 3px;">${typeName}</div>
                    <div style="color: ${color}; font-weight: bold;">${displayValue}</div>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

function getTopContributors(scoreBreakdown, typeKey) {
    if (!scoreBreakdown[typeKey])
        return [];

    return scoreBreakdown[typeKey]
        .filter(x => x.value > 0)
        .sort((a, b) => b.value - a.value)
        .slice(0, 100);
}

function getTopNegatives(scoreBreakdown, typeKey) {
    if (!scoreBreakdown[typeKey])
        return [];

    return scoreBreakdown[typeKey]
        .filter(x => x.value < 0)
        .sort((a, b) => a.value - b.value)
        .slice(0, 100);
}

function exportComparisonAs(format) {
    const container = document.getElementById('devComparisonOutput');
    if (!container || !container.innerHTML.trim()) {
        alert('No comparison data to export. Please select both types first.');
        return;
    }

    html2canvas(container, {
        scale: 2,
        backgroundColor: '#fefdf9',
        logging: false
    }).then(canvas => {
        const link = document.createElement('a');
        const typeA = document.getElementById('devComparisonTypeA').selectedOptions[0]?.text || 'Type_A';
        const typeB = document.getElementById('devComparisonTypeB').selectedOptions[0]?.text || 'Type_B';
        const timestamp = new Date().toISOString().split('T')[0];
        
        if (format === 'png') {
            link.href = canvas.toDataURL('image/png');
            link.download = `comparison-${typeA}-vs-${typeB}-${timestamp}.png`;
        } else if (format === 'jpg') {
            link.href = canvas.toDataURL('image/jpeg', 0.95);
            link.download = `comparison-${typeA}-vs-${typeB}-${timestamp}.jpg`;
        }
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert(`✓ Comparison exported successfully as ${format.toUpperCase()}!`);
    }).catch(error => {
        console.error('Export error:', error);
        alert('Error exporting comparison. Please try again.');
    });
}

function exportReportAs(format) {
    const traitSection =
        document.getElementById('subtypeContributionPanel') ||
        document.getElementById('traitContributionSection');

    if (!traitSection || !traitSection.innerHTML.trim()) {
        alert('No trait analysis data to export. Please generate a report first.');
        return;
    }

    if (typeof html2canvas !== 'function') {
        alert('Image export is unavailable right now. Please reload the page and try again.');
        return;
    }

    html2canvas(traitSection, {
        scale: 2,
        backgroundColor: '#fefdf9',
        logging: false
    }).then(canvas => {
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().split('T')[0];
        
        if (format === 'png') {
            link.href = canvas.toDataURL('image/png');
            link.download = `trait-analysis-${timestamp}.png`;
        } else if (format === 'jpg') {
            link.href = canvas.toDataURL('image/jpeg', 0.95);
            link.download = `trait-analysis-${timestamp}.jpg`;
        }
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert(`✓ Trait analysis exported successfully as ${format.toUpperCase()}!`);
    }).catch(error => {
        console.error('Export error:', error);
        alert('Error exporting trait analysis. Please try again.');
    });
}

function exportDiagnosticsAs(format) {
    const diagnosticsOutput = document.getElementById('devTraitDiagnosticsOutput');
    if (!diagnosticsOutput || !diagnosticsOutput.innerHTML.trim()) {
        alert('No diagnostics data to export. Please select an item first.');
        return;
    }

    html2canvas(diagnosticsOutput, {
        scale: 2,
        backgroundColor: '#fefdf9',
        logging: false
    }).then(canvas => {
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().split('T')[0];
        
        if (format === 'png') {
            link.href = canvas.toDataURL('image/png');
            link.download = `trait-diagnostics-${timestamp}.png`;
        } else if (format === 'jpg') {
            link.href = canvas.toDataURL('image/jpeg', 0.95);
            link.download = `trait-diagnostics-${timestamp}.jpg`;
        }
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert(`✓ Trait diagnostics exported successfully as ${format.toUpperCase()}!`);
    }).catch(error => {
        console.error('Export error:', error);
        alert('Error exporting trait diagnostics. Please try again.');
    });
}

function openDevPanel() {
    if (typeof isDeveloperToolsVisible === 'function' && !isDeveloperToolsVisible()) {
        return;
    }

    const devTools = document.querySelector('.dev-tools-section');
    if (devTools) {
        devTools.classList.remove('collapsed');
        devTools.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function toggleDevPanel() {
    if (typeof isDeveloperToolsVisible === 'function' && !isDeveloperToolsVisible()) {
        return;
    }

    const devTools = document.getElementById('devToolsSection');
    const toggle = document.getElementById('devToolsToggle');
    if (devTools) {
        devTools.classList.toggle('collapsed');
        toggle.textContent = devTools.classList.contains('collapsed') ? '+' : '−';
        localStorage.setItem('devToolsCollapsed', devTools.classList.contains('collapsed'));
    }
}

function initDevToolsState() {
    const devTools = document.getElementById('devToolsSection');
    const toggle = document.getElementById('devToolsToggle');
    const isCollapsed = localStorage.getItem('devToolsCollapsed') === 'true';
    if (isCollapsed) {
        devTools.classList.add('collapsed');
        toggle.textContent = '+';
    } else {
        devTools.classList.remove('collapsed');
        toggle.textContent = '−';
    }
}

function updateDevToolsRaceOrder(result) {
    currentDevResult = result;
            // Update race dropdown order based on current scores (highest to lowest)
            const ranking = result.ranking;
            const compTypeA = document.getElementById('devComparisonTypeA');
            const compTypeB = document.getElementById('devComparisonTypeB');

            if (!compTypeA || !compTypeB) return;

            // Sort races by score (highest to lowest)
            const sortedRaces = ranking;

            // Update compTypeA: remove all options except the first (placeholder), then add sorted ones
            const currentValueA = compTypeA.value;
            while (compTypeA.options.length > 1) {
                compTypeA.remove(1);
            }
            sortedRaces.forEach(race => {
                const option = document.createElement('option');
                option.value = race.key;
                option.textContent = race.name;
                compTypeA.appendChild(option);
            });
            compTypeA.value = currentValueA;

            // Update compTypeB: remove all options except the first (placeholder), then add sorted ones
            const currentValueB = compTypeB.value;
            while (compTypeB.options.length > 1) {
                compTypeB.remove(1);
            }
            sortedRaces.forEach(race => {
                const option = document.createElement('option');
                option.value = race.key;
                option.textContent = race.name;
                compTypeB.appendChild(option);
            });
            compTypeB.value = currentValueB;
        }


function updateTraitDiagnostics() {
            const select = document.getElementById('traitDiagnosticsSelect');
            const container = document.getElementById('traitDiagnosticsContainer');

            if (!select || !container) return;

            const traitId = select.value;
            if (!traitId) {
                container.innerHTML = '<p style="color: #5c5240; text-align: center; padding: 20px;">Select a trait to inspect contributions</p>';
                return;
            }

            const diagnostics = getTraitDiagnostics(traitId);
            if (!diagnostics || diagnostics.options.length === 0) {
                container.innerHTML = '<p style="color: #8b5a3b; text-align: center; padding: 20px;">This trait has no options to display</p>';
                return;
            }

            let html = `<div style="margin-top: 16px;">`;

            diagnostics.options.forEach(opt => {
                html += `
                    <div style="margin-bottom: 20px; padding: 14px; background: rgba(196, 154, 60, 0.08); border-left: 4px solid #c49a3c; border-radius: 4px;">
                        <div style="font-weight: bold; margin-bottom: 12px; color: #d4b86c; font-size: 1rem;">
                            ${opt.isComposite ? `${opt.parentLabel} → ` : ''}${opt.label}
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
                `;

                SUBTYPE_KEYS.forEach(key => {
                    const contribution = opt.contributions?.[key] ?? 0;
                    const typeName = getSubtypeName(key);
                    const color = contribution > 0 ? '#2d6b1e' : contribution < 0 ? '#c94a3b' : '#7a6f64';
                    const bgColor = contribution > 0 ? 'rgba(45, 107, 30, 0.15)' : contribution < 0 ? 'rgba(201, 74, 59, 0.15)' : 'rgba(122, 111, 100, 0.1)';
                    
                    const weight = WEIGHT_CLASSES[diagnostics.weightClass] || 1;
                    const weightedValue = contribution * weight;
                    const displayValue = contribution === 0 ? '0' : `${contribution > 0 ? '+' : ''}${contribution}${weight !== 1 ? `(${weightedValue > 0 ? '+' : ''}${Math.round(weightedValue)})` : ''}`;

                    html += `
                        <div style="padding: 8px 10px; background: ${bgColor}; border-radius: 4px; border-left: 3px solid ${color};">
                            <div style="color: #a8a8a8; font-size: 0.85rem; margin-bottom: 4px;">${typeName}</div>
                            <div style="color: ${color}; font-weight: bold; font-size: 1.05rem;">${displayValue}</div>
                        </div>
                    `;
                });

                html += `
                        </div>
                    </div>
                `;
            });

            html += `</div>`;
            container.innerHTML = html;
        }
