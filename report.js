let currentReportResult = null;

function toggleSubtypeBreakdown() {
    const groupPanels = [
        document.getElementById('groupModePanel'),
        document.getElementById('groupHighlightsPanel'),
        document.getElementById('groupRankingPanel')
    ].filter(Boolean);
    const subtypePanels = [
        document.getElementById('subtypeBreakdownPanel'),
        document.getElementById('subtypeRankingPanel'),
        document.getElementById('subtypeContributionPanel')
    ].filter(Boolean);
    const button = document.getElementById('subtypeBreakdownButton');
    const label = document.getElementById('subtypeBreakdownLabel');
    const title = document.getElementById('subtypeToggleTitle');
    const description = document.getElementById('subtypeToggleDescription');
    const kicker = document.getElementById('subtypeToggleKicker');

    if (
        groupPanels.length === 0 ||
        subtypePanels.length === 0 ||
        !label ||
        !button ||
        !title ||
        !description ||
        !kicker
    ) {
        return;
    }

    const willShowSubtypeMode = subtypePanels[0].style.display === 'none';

    groupPanels.forEach(section => {
        section.style.display = willShowSubtypeMode ? 'none' : 'block';
    });

    subtypePanels.forEach(section => {
        section.style.display = willShowSubtypeMode ? 'block' : 'none';
    });

    button.classList.toggle('active', willShowSubtypeMode);
    button.setAttribute('aria-pressed', willShowSubtypeMode ? 'true' : 'false');

    kicker.textContent = willShowSubtypeMode
        ? 'Subtype Mode'
        : 'Group Mode';

    title.textContent = willShowSubtypeMode
        ? 'Subtype mode is active'
        : 'Need the fine-grained subtype view?';

    description.textContent = willShowSubtypeMode
        ? 'You are now viewing subtype-level charts, rankings, and contribution analysis in the same report area.'
        : 'Switch the report into subtype mode to inspect the fine-grained ranking and contribution detail in-place.';

    label.textContent = willShowSubtypeMode
        ? 'Switch to Group Mode'
        : 'Switch to Subtype Mode';
}

function closeReport() {
            document.getElementById('reportOverlay').classList.remove('active');
            document.body.style.overflow = '';
            // Clean up tooltip
            const tooltip = document.getElementById('pie-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        }

function showReportAnalysis(){

    document.getElementById(
        'reportAnalysisView'
    ).style.display = 'block';

    document.getElementById(
        'reportMapView'
    ).style.display = 'none';

    document
        .querySelectorAll(
            '.report-tab'
        )
        .forEach(
            x => x.classList.remove(
                'active'
            )
        );

    document
        .getElementById(
            'analysisTab'
        )
        .classList.add(
            'active'
        );
}

function showReportMap(){

    document.getElementById(
        'reportAnalysisView'
    ).style.display = 'none';

    document.getElementById(
        'reportMapView'
    ).style.display = 'block';

    document
        .querySelectorAll(
            '.report-tab'
        )
        .forEach(
            x => x.classList.remove(
                'active'
            )
        );

    document
        .getElementById(
            'mapTab'
        )
        .classList.add(
            'active'
        );
}

function showTypeTooltip(event, typeName, score, percentage) {
            // Make the hovered segment more opaque
            event.target.style.opacity = '1';

            let tooltip = document.getElementById('pie-tooltip');
            if (!tooltip) {
                tooltip = document.createElement('div');
                tooltip.id = 'pie-tooltip';
                tooltip.style.cssText = `
                    position: fixed;
                    background: #3a2a18;
                    color: #fefdf9;
                    padding: 12px 16px;
                    border-radius: 8px;
                    font-size: 0.95rem;
                    font-weight: bold;
                    pointer-events: none;
                    z-index: 10000;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                    white-space: nowrap;
                    border: 2px solid #c49a3c;
                `;
                document.body.appendChild(tooltip);
            }

            tooltip.innerHTML = `
                <div style="font-size: 1.1rem; margin-bottom: 4px;">${typeName}</div>
                <div style="font-size: 0.9rem; color: #d4b86c;">Score: ${score} (${percentage}%)</div>
            `;

            // Position tooltip near cursor
            const rect = event.target.getBoundingClientRect();
            const x = event.clientX + 10;
            const y = event.clientY - 10;

            tooltip.style.left = x + 'px';
            tooltip.style.top = y + 'px';
            tooltip.style.display = 'block';

            // Keep tooltip on screen
            setTimeout(() => {
                const tooltipRect = tooltip.getBoundingClientRect();
                if (tooltipRect.right > window.innerWidth) {
                    tooltip.style.left = (window.innerWidth - tooltipRect.width - 10) + 'px';
                }
                if (tooltipRect.bottom > window.innerHeight) {
                    tooltip.style.top = (window.innerHeight - tooltipRect.height - 10) + 'px';
                }
            }, 0);
        }

function hideTypeTooltip() {
            const tooltip = document.getElementById('pie-tooltip');
            if (tooltip) {
                tooltip.style.display = 'none';
            }
            // Reset all segments to normal opacity
            document.querySelectorAll('#reportInner svg path').forEach(path => {
                path.style.opacity = '0.85';
            });
        }


function escapeReportHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function renderTypeBadge(typeKey, label, scoreText = '') {
    return `<span class="type-badge" style="${getTypeBadgeStyle(typeKey)}">${escapeReportHtml(label)}${scoreText}</span>`;
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

function extractConditionExpression(conditionFn) {
    if (!conditionFn) {
        return '';
    }

    const source = conditionFn.toString();
    const body = source
        .replace(/^condition\s*\(\)\s*\{/, '')
        .replace(/^function\s*\(\)\s*\{/, '')
        .replace(/\}\s*$/, '')
        .trim();

    const returnWrapped = body.match(/return\s*\(([^]*)\)\s*;?$/);
    if (returnWrapped) {
        return returnWrapped[1].trim();
    }

    const returnSimple = body.match(/return\s+([^;]+)\s*;?$/);
    if (returnSimple) {
        return returnSimple[1].trim();
    }

    return body;
}

function evaluateRuleClauses(rule) {
    const expression = extractConditionExpression(rule.condition);
    const clauses = splitTopLevelAndClauses(expression);

    const statuses = clauses.map(clause => {
        try {
            return {
                clause,
                met: Boolean(Function('userSelections', `return (${clause});`)(userSelections))
            };
        } catch (_) {
            return {
                clause,
                met: false
            };
        }
    });

    const metCount = statuses.filter(x => x.met).length;
    const total = statuses.length;

    return {
        statuses,
        metCount,
        total,
        missingCount: Math.max(0, total - metCount),
        ratio: total > 0 ? metCount / total : 0
    };
}

function getAllRulesWithGroups() {
    const groups = [
        { key: 'combinations', label: 'Combinations' },
        { key: 'contradictions', label: 'Contradictions' },
        { key: 'modifiers', label: 'Modifiers' },
        { key: 'macros', label: 'Macros' }
    ];

    const all = [];

    groups.forEach(group => {
        const rules = ENGINE_RULES[group.key];
        if (!Array.isArray(rules)) return;

        rules.forEach(rule => {
            all.push({
                groupLabel: group.label,
                rule
            });
        });
    });

    return all;
}

function getRuleEffectsText(rule) {
    const effects = Array.isArray(rule.effects) ? rule.effects : [];
    if (!effects.length) {
        return 'No effects';
    }

    return effects
        .map(effect => {
            const typeName = getSubtypeName(effect.type);
            const value = Number(effect.value) || 0;
            return `${escapeReportHtml(typeName)}: ${value > 0 ? '+' : ''}${Math.round(value)}`;
        })
        .join(' | ');
}

function buildRulesContributionMarkup() {
    const allRules = getAllRulesWithGroups();

    const triggered = [];
    const nearMiss = [];

    allRules.forEach(entry => {
        const rule = entry.rule;
        if (!rule.enabled) return;

        let isTriggered = false;
        try {
            isTriggered = Boolean(rule.condition?.());
        } catch (_) {
            isTriggered = false;
        }

        const evalData = evaluateRuleClauses(rule);

        if (isTriggered) {
            triggered.push({
                groupLabel: entry.groupLabel,
                rule
            });
            return;
        }

        if (evalData.total > 0) {
            nearMiss.push({
                groupLabel: entry.groupLabel,
                rule,
                evalData
            });
        }
    });

    nearMiss.sort((a, b) => {
        if (b.evalData.ratio !== a.evalData.ratio) {
            return b.evalData.ratio - a.evalData.ratio;
        }
        if (a.evalData.missingCount !== b.evalData.missingCount) {
            return a.evalData.missingCount - b.evalData.missingCount;
        }
        return a.evalData.total - b.evalData.total;
    });

    const topNearMiss = nearMiss.slice(0, 10);

    const triggeredHtml = triggered.length === 0
        ? '<div style="padding: 10px 12px; border: 1px solid var(--border); border-radius: 6px; background: rgba(196, 154, 60, 0.06); color: var(--text-light);">No rules were triggered for the current profile.</div>'
        : triggered.map(item => `
            <div style="padding: 10px 12px; border: 1px solid var(--border); border-radius: 6px; background: rgba(45, 107, 30, 0.08); margin-bottom: 8px;">
                <div style="font-weight: bold; color: var(--accent); margin-bottom: 4px;">${escapeReportHtml(item.rule.name || item.rule.id || 'Unnamed Rule')}</div>
                <div style="font-size: 0.82rem; color: var(--text-light); margin-bottom: 6px;">${escapeReportHtml(item.groupLabel)}</div>
                <div style="font-size: 0.88rem; color: var(--text);"><strong>Effect:</strong> ${getRuleEffectsText(item.rule)}</div>
            </div>
        `).join('');

    const nearMissHtml = topNearMiss.length === 0
        ? '<div style="padding: 10px 12px; border: 1px solid var(--border); border-radius: 6px; background: rgba(196, 154, 60, 0.06); color: var(--text-light);">No near-miss rules available.</div>'
        : topNearMiss.map(item => {
            const unmet = item.evalData.statuses
                .filter(x => !x.met)
                .slice(0, 3)
                .map(x => escapeReportHtml(x.clause))
                .join(' | ');

            return `
                <div style="padding: 10px 12px; border: 1px solid var(--border); border-radius: 6px; background: rgba(196, 154, 60, 0.08); margin-bottom: 8px;">
                    <div style="font-weight: bold; color: var(--accent); margin-bottom: 4px;">${escapeReportHtml(item.rule.name || item.rule.id || 'Unnamed Rule')}</div>
                    <div style="font-size: 0.82rem; color: var(--text-light); margin-bottom: 6px;">${escapeReportHtml(item.groupLabel)}</div>
                    <div style="font-size: 0.86rem; color: var(--text); margin-bottom: 4px;"><strong>Progress:</strong> ${item.evalData.metCount}/${item.evalData.total} conditions met</div>
                    <div style="font-size: 0.82rem; color: var(--text-light);"><strong>Missing:</strong> ${unmet || 'n/a'}</div>
                </div>
            `;
        }).join('');

    return `
        <div class="contribution-grid" style="margin-top: 12px;">
            <div class="contribution-box">
                <div class="contribution-header positive">✓ Triggered Rules (${triggered.length})</div>
                <div class="contribution-list">${triggeredHtml}</div>
            </div>
            <div class="contribution-box">
                <div class="contribution-header">⏳ Closest Rules To Being Met (${topNearMiss.length})</div>
                <div class="contribution-list">${nearMissHtml}</div>
            </div>
        </div>
    `;
}


function createTypeScorePie(sorted) {
            const pieData = sorted.filter(item => item.score > 0);
            const size = 280;
            const radius = 130;
            const innerRadius = 80;
            const center = size / 2;

            // Calculate total score for percentage
            const totalScore = pieData.reduce( (sum, item) => sum + Math.max(item.score, 0),  0  ) || 1;

            let svgHTML = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.15)); cursor: pointer;">`;

            let currentAngle = -90; // Start from top

            pieData.forEach((item, idx) => {
                const visualScore =Math.max(0, item.score);
                const percentage = (visualScore / totalScore) * 100;
                const sliceAngle = (percentage / 100) * 360;

                const startAngle = currentAngle * Math.PI / 180;
                const endAngle = (currentAngle + sliceAngle) * Math.PI / 180;

                const x1 = center + radius * Math.cos(startAngle);
                const y1 = center + radius * Math.sin(startAngle);
                const x2 = center + radius * Math.cos(endAngle);
                const y2 = center + radius * Math.sin(endAngle);

                const x3 = center + innerRadius * Math.cos(endAngle);
                const y3 = center + innerRadius * Math.sin(endAngle);
                const x4 = center + innerRadius * Math.cos(startAngle);
                const y4 = center + innerRadius * Math.sin(startAngle);

                const largeArc = sliceAngle > 180 ? 1 : 0;
                const largeArcInner = sliceAngle > 180 ? 1 : 0;

                const color = TYPE_COLORS[item.key];

                const pathData = `
                    M ${x1} ${y1}
                    A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
                    L ${x3} ${y3}
                    A ${innerRadius} ${innerRadius} 0 ${largeArcInner} 0 ${x4} ${y4}
                    Z
                `;

                svgHTML += `<path
                    d="${pathData}"
                    fill="${color}"
                    stroke="#fff"
                    stroke-width="2"
                    opacity="0.85"
                    data-type="${item.name}"
                    data-score="${Math.round(item.score)}"
                    data-percentage="${percentage.toFixed(1)}"
                    onmouseover="showTypeTooltip(event, '${item.name}', ${Math.round(item.score)}, ${percentage.toFixed(1)})"
                    onmouseout="hideTypeTooltip()"
                    style="transition: opacity 0.2s; cursor: pointer;"
                />`;

                currentAngle += sliceAngle;
            });

            // Center circle
            svgHTML += `<circle cx="${center}" cy="${center}" r="${innerRadius}" fill="#fefdf9" stroke="none"/>`;

            svgHTML += `</svg>`;

            return svgHTML;
        }

        function updateContributionAnalysis() {

    const select =
        document.getElementById(
            'contributionTypeSelect'
        );

    const container =
        document.getElementById(
            'contributionAnalysisContainer'
        );

    if (!select || !container) return;

    const typeKey = select.value;

    const positives =
        getTopContributors(currentReportResult.scoreBreakdown, typeKey);

    const negatives =
        getTopNegatives(currentReportResult.scoreBreakdown, typeKey);

    container.innerHTML = `

<div class="contribution-grid">

    <div class="contribution-box">

        <div class="contribution-header positive">
            ▲ Top Positive Contributors (${positives.length} Traits)
        </div>

        <div class="contribution-list">

            ${positives.map(x => `
                <div class="contribution-item">
                    <span class="contribution-trait">
                        ${x.trait}
                    </span>

                    <span class="contribution-value positive">
                        +${Math.round(x.value)}
                    </span>
                </div>
            `).join('')}

        </div>

    </div>

    <div class="contribution-box">

        <div class="contribution-header negative">
            ▼ Top Negative Contributors (${negatives.length} Traits)
        </div>

        <div class="contribution-list">

            ${negatives.map(x => `
                <div class="contribution-item">
                    <span class="contribution-trait">
                        ${x.trait}
                    </span>

                    <span class="contribution-value negative">
                        ${Math.round(x.value)}
                    </span>
                </div>
            `).join('')}

        </div>

    </div>

</div>
`;

}



function generateReport() {
    const overlay = document.getElementById('reportOverlay');
    const reportInner = document.getElementById('reportInner');

    const result = calculateProfile();
    currentReportResult = result;

    const sorted = result.ranking;
    const groupSorted = result.groupRanking;
    const primarySubtype = sorted[0];
    const primaryGroup = groupSorted[0];
    const maxSubtypeScore = Math.max(...sorted.map(x => x.score), 1);
    const maxGroupScore = Math.max(...groupSorted.map(x => x.score), 1);

    let traitTableRows = '';

    traits.forEach(trait => {
        let selectionText = '';
        let contribSummary = '';

        if (trait.type === 'select' || trait.type === 'cephalic' || trait.type === 'nasal' || trait.type === 'index') {
            const selVal = userSelections[trait.id] || '';

            if (selVal) {
                const opt = trait.options.find(o => o.value === selVal);
                selectionText = opt ? opt.label : selVal;

                const contributions = getOptionContributions(opt);
                if (Object.keys(contributions).length > 0) {
                    contribSummary = Object.entries(contributions)
                        .filter(([, v]) => v !== 0)
                        .map(([k, v]) => {
                            const name = getSubtypeName(k);
                            return `<span style="color: ${v > 0 ? '#2d6b1e' : '#8b2020'}; font-weight: bold;">${name}: ${v > 0 ? '+' : ''}${v}</span>`;
                        }).join(' ');
                }
            }

            if (userMeasurements[trait.id]) {
                const m = userMeasurements[trait.id];
                selectionText += ` [Index: ${m.index}]`;
            }
        } else if (trait.type === 'composite' && trait.subTraits) {
            const parts = [];
            const allContribs = {};

            trait.subTraits.forEach(sub => {
                const subVal = userSubSelections[sub.id] || '';

                if (subVal) {
                    const opt = sub.options.find(o => o.value === subVal);
                    parts.push(`${sub.label}: ${opt ? opt.label : subVal}`);

                    const contributions = getOptionContributions(opt);
                    for (const [k, v] of Object.entries(contributions)) {
                        allContribs[k] = (allContribs[k] || 0) + v;
                    }
                }
            });

            selectionText = parts.join('; ') || '—';
            contribSummary = Object.entries(allContribs)
                .filter(([, v]) => v !== 0)
                .map(([k, v]) => {
                    const name = getSubtypeName(k);
                    return `<span style="color: ${v > 0 ? '#2d6b1e' : '#8b2020'}; font-weight: bold;">${name}: ${v > 0 ? '+' : ''}${v}</span>`;
                }).join(' ');
        }

        if (!selectionText) {
            selectionText = '— Not selected —';
        }

        traitTableRows += `<tr><td>${trait.number}</td><td><strong>${trait.title}</strong></td><td>${selectionText}</td><td style="font-size:0.75rem;">${contribSummary || '—'}</td></tr>`;
    });

    const groupRankingRows = groupSorted.map((item, i) => {
        const ratio = item.score / maxGroupScore;
        const alignment =
            ratio >= 0.85
                ? '🟢 Strong'
                : ratio >= 0.65
                    ? '🟡 Moderate'
                    : ratio >= 0.40
                        ? '⚪ Neutral'
                        : '⚫ Weak';

        return `<tr><td style="font-weight: bold;">${i + 1}</td><td><strong>${renderTypeBadge(item.key, item.name)}</strong></td><td>${renderTypeBadge(item.leadSubtypeKey, item.leadSubtypeName)}</td><td style="font-weight: bold; font-size: 1.1rem;">${Math.round(item.score)}</td><td>${alignment}</td></tr>`;
    }).join('');

    const subtypeRankingRows = sorted.map((item, i) => {
        const ratio = item.score / maxSubtypeScore;
        const alignment =
            ratio >= 0.85
                ? '🟢 Strong'
                : ratio >= 0.65
                    ? '🟡 Moderate'
                    : ratio >= 0.40
                        ? '⚪ Neutral'
                        : '⚫ Weak';

        return `<tr><td style="font-weight: bold;">${i + 1}</td><td><strong>${renderTypeBadge(item.key, item.name)}</strong></td><td style="font-weight: bold; font-size: 1.1rem;">${Math.round(item.score)}</td><td>${alignment}</td></tr>`;
    }).join('');

    const analysisHtml = `
        <div class="subtype-toggle-wrap">
            <div class="subtype-toggle-copy">
                <div class="subtype-toggle-kicker" id="subtypeToggleKicker">Group Mode</div>
                <h3 id="subtypeToggleTitle">Need the fine-grained subtype view?</h3>
                <p id="subtypeToggleDescription">Switch the report into subtype mode to inspect the fine-grained ranking and contribution detail in-place.</p>
            </div>
            <button
                id="subtypeBreakdownButton"
                class="subtype-toggle-button"
                type="button"
                aria-pressed="false"
                onclick="toggleSubtypeBreakdown()">
                <span class="subtype-toggle-icon">🧬</span>
                <span id="subtypeBreakdownLabel">Switch to Subtype Mode</span>
            </button>
        </div>

        <div class="report-section" id="groupModePanel">
            <h3>📊 Group Score Analysis</h3>
            <div class="report-visualization">
                <div style="display: flex; justify-content: center; align-items: center; position: relative;">
                    <div style="position: relative; display: flex; align-items: center; justify-content: center;">
                        ${createTypeScorePie(groupSorted)}
                        <div class="type-circle-center" style="position: absolute; text-align: center;">
                            <div class="top-type-name">${primaryGroup.name}</div>
                            <div class="top-type-score">${Math.round(primaryGroup.score)}</div>
                            <div class="score-label">Average Group Alignment</div>
                        </div>
                    </div>
                </div>
                <div class="score-breakdown">
                    ${groupSorted.slice(0, 7).map(item => {
                        const pct = Math.max(0, Math.min(100, (item.score / maxGroupScore) * 100));
                        return `
                            <div class="score-item" style="border-left-color: ${TYPE_COLORS[item.key]};">
                                <div class="score-item-color" style="background: ${TYPE_COLORS[item.key]};"></div>
                                <div class="score-item-info">
                                    <div class="score-item-name">${item.name}</div>
                                    <div style="font-size: 0.8rem; color: #7a6f64; margin-top: 2px;">Lead subtype: ${item.leadSubtypeName}</div>
                                    <div class="score-item-bar">
                                        <div class="score-item-fill" style="width: ${pct}%; background: linear-gradient(90deg, ${TYPE_COLORS[item.key]}, ${TYPE_COLORS[item.key]}dd);"></div>
                                    </div>
                                </div>
                                <div class="score-item-value">${Math.round(item.score)}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>

        <div class="report-highlights" id="groupHighlightsPanel">
            <div class="highlight-box">
                <div class="highlight-label">🏆 Primary Group Classification</div>
                <div class="highlight-value">${primaryGroup.name}</div>
                <div style="font-size: 0.9rem; color: #5c5240; margin-top: 6px;">Score: ${Math.round(primaryGroup.score)} | Lead subtype: <span style="color: ${TYPE_COLORS[primaryGroup.leadSubtypeKey]}; font-weight: bold;">${primaryGroup.leadSubtypeName}</span></div>
            </div>
            <div class="highlight-box">
                <div class="highlight-label">🔗 Secondary Groups</div>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
                    ${groupSorted.slice(1, 4).map(item => renderTypeBadge(item.key, item.name, ` (${Math.round(item.score)})`)).join('')}
                </div>
            </div>
        </div>

        <div class="report-section" id="subtypeBreakdownPanel" style="display:none;">
            <h3>📊 Subtype Score Analysis</h3>
            <div class="report-visualization">
                <div style="display: flex; justify-content: center; align-items: center; position: relative;">
                    <div style="position: relative; display: flex; align-items: center; justify-content: center;">
                        ${createTypeScorePie(sorted)}
                        <div class="type-circle-center" style="position: absolute; text-align: center;">
                            <div class="top-type-name">${primarySubtype.name}</div>
                            <div class="top-type-score">${Math.round(primarySubtype.score)}</div>
                            <div class="score-label">Top Subtype</div>
                        </div>
                    </div>
                </div>
                <div class="score-breakdown">
                    ${sorted.slice(0, 10).map(item => {
                        const pct = Math.max(0, Math.min(100, (item.score / maxSubtypeScore) * 100));
                        return `
                            <div class="score-item" style="border-left-color: ${TYPE_COLORS[item.key]};">
                                <div class="score-item-color" style="background: ${TYPE_COLORS[item.key]};"></div>
                                <div class="score-item-info">
                                    <div class="score-item-name">${item.name}</div>
                                    <div class="score-item-bar">
                                        <div class="score-item-fill" style="width: ${pct}%; background: linear-gradient(90deg, ${TYPE_COLORS[item.key]}, ${TYPE_COLORS[item.key]}dd);"></div>
                                    </div>
                                </div>
                                <div class="score-item-value">${Math.round(item.score)}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>

        <div id="subtypeRankingPanel" style="display:none; margin-top: 24px;">
            <h3 style="margin-top: 24px;">🧬 Complete Subtype Rankings</h3>
            <table><tr><th>Rank</th><th>Subtype</th><th>Score</th><th>Alignment</th></tr>${subtypeRankingRows}</table>
        </div>

        <div class="report-section" id="subtypeContributionPanel" style="display:none;">
            <h3>🔍 Trait Contribution Analysis</h3>
            <div style="font-size: 0.88rem; color: #7a6f64; margin-bottom: 10px;">Subtype-level contribution detail for the currently selected subtype.</div>
            <select
                id="contributionTypeSelect"
                class="contribution-select"
                onchange="updateContributionAnalysis()">
                ${sorted.map(item => `<option value="${item.key}">${item.name || item.key}</option>`).join('')}
            </select>
            <div id="contributionAnalysisContainer"></div>
            <div style="display: flex; gap: 10px; margin-top: 12px; margin-bottom: 12px;">
                <button onclick="exportReportAs('png')" style="padding: 8px 16px; background: var(--accent); color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-family: inherit;">📥 Export as PNG</button>
                <button onclick="exportReportAs('jpg')" style="padding: 8px 16px; background: var(--accent); color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-family: inherit;">📥 Export as JPG</button>
            </div>
        </div>

        <h3 style="margin-top: 24px;">📋 Trait Selections</h3>
        <table>
            <tr><th>Trait #</th><th>Trait</th><th>Selection</th><th>Key Contributions</th></tr>
            ${traitTableRows}
        </table>

        <div id="groupRankingPanel">
            <h3 style="margin-top: 24px;">📈 Complete Group Rankings</h3>
            <table><tr><th>Rank</th><th>Historical Group</th><th>Lead Subtype</th><th>Score</th><th>Alignment</th></tr>${groupRankingRows}</table>
        </div>

        <div class="report-section" id="rulesContributionSection">
            <h3>🧩 Rules Contribution Summary</h3>
            ${buildRulesContributionMarkup()}
        </div>

        <div class="report-disclaimer" style="margin-top: 24px;">
            ⚠️ <strong>REPEAT DISCLAIMER:</strong> This is a <u>historical reconstruction</u> of obsolete
            anthropological classification methods. It does NOT represent modern genetics, scientific
            ancestry estimation, ethnicity prediction, race determination, or biological reality.
        </div>
    `;

    const html = `
        <h2>📜 Historical Anthropometric Reconstruction Report</h2>
        <p style="text-align:center;font-size:0.8rem;color:#5c5240;">Simulated Classification — circa 1880–1940 Typological Framework</p>
        <div class="report-view-switch">
            <button id="analysisTab" class="report-tab active" onclick="showReportAnalysis()">📊 Analysis</button>
            <button id="mapTab" class="report-tab" onclick="showReportMap()">🌍 Map</button>
        </div>
        <div id="reportAnalysisView">${analysisHtml}</div>
        <div id="reportMapView" style="display:none;">
            <div class="report-section">
                <h3>🌍 Anthropological Map</h3>
                <div id="anthropologicalMapContainer">
                    <iframe
                        id="anthropologicalMapFrame"
                        src="map/anthropologicalMap.html"
                        style="width:100%; height:600px; border:none;">
                    </iframe>
                </div>
            </div>
        </div>
    `;

    reportInner.innerHTML = html;

    setTimeout(() => {
        const frame = document.getElementById('anthropologicalMapFrame');

        if (!frame) return;

        frame.contentWindow.postMessage(
            {
                scores: result.scores,
                colors: TYPE_COLORS
            },
            '*'
        );
    }, 300);

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        updateContributionAnalysis();
    }, 0);
}
