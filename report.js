let currentReportResult = null;
let currentReportAnalysis = null;
let reportReturnFocus = null;
const reportState = {
    mode: 'group',
    section: 'overview',
    rankingQuery: '',
    rankingSort: 'score-desc',
    rankingExpanded: false,
    contributionSort: 'magnitude'
};
let reportPrintState = null;

const REPORT_SECTIONS = [
    ['overview', 'Overview'],
    ['categories', 'Pigmentation & Morphology'],
    ['rankings', 'Complete Rankings'],
    ['contributions', 'Trait Contributions'],
    ['selections', 'Trait Selections'],
    ['rules', 'Rules & Diagnostics'],
    ['map', 'Map']
];

function escapeReportHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function reportScore(value) {
    const rounded = Math.round(Math.abs(value) * 2) / 2 * (value < 0 ? -1 : 1);
    return String(rounded || 0);
}

function reportSignedScore(value) {
    const displayed = reportScore(value);
    return displayed === '0' ? '0' : `${value > 0 ? '+' : ''}${displayed}`;
}

function reportRanking(mode = reportState.mode, category = null) {
    if (category) {
        const subset = currentReportAnalysis.categories[category];
        return mode === 'group' ? subset.groupRanking : subset.subtypeRanking;
    }
    return mode === 'group' ? currentReportResult.groupRanking : currentReportResult.ranking;
}

function reportCard(label, value, detail = '') {
    return `<div class="report-summary-card"><div class="report-card-label">${escapeReportHtml(label)}</div><div class="report-card-value">${escapeReportHtml(value)}</div>${detail ? `<div class="report-card-detail">${escapeReportHtml(detail)}</div>` : ''}</div>`;
}

function reportBar(score, range, color = '#b89a60') {
    const width = Math.min(Math.abs(score) / (range || 1), 1) * 50;
    const left = score < 0 ? 50 - width : 50;
    return `<div class="report-score-bar" aria-hidden="true"><span class="report-score-fill" style="left:${left}%;width:${width}%;background:${score < 0 ? '#ac706b' : color}"></span></div>`;
}

function reportAlignmentLabel(score, maximum) {
    const ratio = score / Math.max(maximum, 1);
    return ratio >= .85 ? 'Strong' : ratio >= .65 ? 'Moderate' : ratio >= .40 ? 'Neutral' : 'Weak';
}

function reportScoreTable(entries, limit = entries.length) {
    if (!entries.length) return '<p class="report-empty">No calculated matches are available.</p>';
    const range = Math.max(1, ...entries.map(item => Math.abs(item.score)));
    const maximum = Math.max(1, ...entries.map(item => item.score));
    return `<div class="report-table-scroll"><table class="report-data-table"><thead><tr><th>Rank</th><th>Historical ${reportState.mode === 'group' ? 'Group' : 'Subtype'}</th><th>Score comparison</th><th>Score</th><th>Alignment</th></tr></thead><tbody>${entries.slice(0, limit).map((item, index) => `
        <tr class="${index < 3 ? 'report-leading-row' : ''}"><td>${index + 1}</td><td><strong>${escapeReportHtml(item.name)}</strong>${item.leadSubtypeName && reportState.mode === 'group' ? `<small>Lead subtype: ${escapeReportHtml(item.leadSubtypeName)}</small>` : ''}</td><td>${reportBar(item.score, range, TYPE_COLORS[item.key] || '#b89a60')}</td><td class="report-number">${escapeReportHtml(reportScore(item.score))}</td><td>${reportAlignmentLabel(item.score, maximum)}</td></tr>
    `).join('')}</tbody></table></div>`;
}

function renderReportOverview() {
    const groups = currentReportResult.groupRanking;
    const subtypes = currentReportResult.ranking;
    const count = currentReportResult.progress;
    const hasProfile = count.filledCount > 0;
    const alternatives = hasProfile ? reportRanking().slice(1, 3) : [];
    const pct = count.totalCount ? Math.round(count.filledCount / count.totalCount * 100) : 0;
    const pigmentLead = currentReportAnalysis.categoryCounts.pigmentation.selected ? reportRanking(reportState.mode, 'pigmentation')[0] : null;
    const morphologyLead = currentReportAnalysis.categoryCounts.morphological.selected ? reportRanking(reportState.mode, 'morphological')[0] : null;
    return `<div class="report-section-heading"><h2>Classification Summary</h2><p>Results within the historical typological framework</p></div>
        <div class="report-summary-grid">
            ${reportCard('Leading historical group', hasProfile ? groups[0]?.name || '—' : '—', hasProfile ? `Score: ${reportScore(groups[0]?.score ?? 0)}` : 'Select traits to begin')}
            ${reportCard('Leading historical subtype', hasProfile ? subtypes[0]?.name || '—' : '—', hasProfile ? `Score: ${reportScore(subtypes[0]?.score ?? 0)}` : 'Select traits to begin')}
            ${reportCard(`Closest ${reportState.mode === 'group' ? 'group' : 'subtype'} alternatives`, alternatives.map(x => `${x.name} (${reportScore(x.score)})`).join(' · ') || '—')}
            ${reportCard('Pigmentation leader', pigmentLead?.name || '—', pigmentLead ? `Subset score: ${reportScore(pigmentLead.score)}` : 'No pigmentation traits selected')}
            ${reportCard('Morphology leader', morphologyLead?.name || '—', morphologyLead ? `Subset score: ${reportScore(morphologyLead.score)}` : 'No morphology traits selected')}
            <div class="report-summary-card"><div class="report-card-label">Profile completeness</div><div class="report-card-value">${count.filledCount}/${count.totalCount} traits</div><div class="report-progress" role="progressbar" aria-label="Completed traits" aria-valuemin="0" aria-valuemax="${count.totalCount}" aria-valuenow="${count.filledCount}"><span style="width:${pct}%"></span></div><div class="report-card-detail">${pct}% completed</div></div>
        </div>
        <p class="report-explainer">Scores express relative alignment with obsolete historical classification models. They do not measure ancestry, ethnicity, genetics, or biological race. Displayed scores are rounded to the nearest 0.5; rankings and visualizations retain full precision. Category subset scores describe different numbers of selected traits and should be read within each category only.</p>`;
}

function reportCategoryDrivers(category, mode, leadKey, sign) {
    const entries = getReportTargetEntries(currentReportAnalysis, mode, leadKey)
        .filter(item => item.category === category && (sign === 'positive' ? item.value > 0 : item.value < 0))
        .sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
        .slice(0, 6);
    return entries.length ? `<ul class="report-driver-list">${entries.map(item => `<li><span>${escapeReportHtml(item.traitName)} <small>${escapeReportHtml(item.selection)}</small></span><strong class="${item.value < 0 ? 'negative' : 'positive'}">${escapeReportHtml(reportSignedScore(item.value))}</strong></li>`).join('')}</ul>` : '<p class="report-empty">No contributions in this direction.</p>';
}

function reportCategoryRankingList(ranking) {
    return `<ol class="report-category-ranking">${ranking.map(item => `<li><span>${escapeReportHtml(item.name)}</span><strong>${escapeReportHtml(reportScore(item.score))}</strong></li>`).join('')}</ol>`;
}

function renderReportCategories() {
    const mode = reportState.mode;
    const cards = ['pigmentation', 'morphological'].map(category => {
        const ranking = reportRanking(mode, category);
        const count = currentReportAnalysis.categoryCounts[category];
        const lead = count.selected ? ranking[0] : null;
        const title = category === 'pigmentation' ? 'Pigmentation' : 'Morphology';
        return `<article class="report-category-card">
            <div class="report-card-label">${title} · ${count.selected}/${count.total} traits selected</div>
            <h3>${escapeReportHtml(lead?.name || '—')}</h3><div class="report-category-score">${lead ? `Subset score: ${escapeReportHtml(reportScore(lead.score))}` : 'No category score yet'}</div>
            <h4>Ranked alternatives</h4>${lead ? reportCategoryRankingList(ranking.slice(0, 5)) : '<p class="report-empty">No traits selected in this category.</p>'}
            <div class="report-driver-grid"><div><h4>Strongest positive traits</h4>${reportCategoryDrivers(category, mode, lead?.key, 'positive')}</div><div><h4>Strongest negative traits</h4>${reportCategoryDrivers(category, mode, lead?.key, 'negative')}</div></div>
        </article>`;
    }).join('');
    const pigment = currentReportAnalysis.categoryCounts.pigmentation.selected ? reportRanking(mode, 'pigmentation')[0] : null;
    const morphology = currentReportAnalysis.categoryCounts.morphological.selected ? reportRanking(mode, 'morphological')[0] : null;
    const comparison = !pigment || !morphology
        ? 'Select traits in both categories to compare their leading historical matches.'
        : pigment.key === morphology.key
        ? `Both categories favor ${pigment?.name || 'the same historical match'}.`
        : `Pigmentation favors ${pigment?.name || '—'}; morphology favors ${morphology?.name || '—'}.`;
    return `<div class="report-section-heading"><h2>Pigmentation & Morphology</h2><p>Separate views of existing final trait contributions</p></div>
        <div class="report-category-grid">${cards}</div>
        <div class="report-comparison"><strong>Comparison</strong><p>${escapeReportHtml(comparison)}</p><small>Subset scores use the same existing contribution values, but the categories contain different numbers of traits. Their raw totals are not directly comparable. Rule effects stay separate; per-trait values already include any cross-trait synergy applied by the engine.</small></div>`;
}

function renderReportRankings() {
    return `<div class="report-section-heading"><h2>Complete Rankings</h2><p>Signed scores rounded to the nearest 0.5 for display</p></div>
        <div class="report-controls"><label>Filter <input id="reportRankingSearch" type="search" placeholder="Search names" value="${escapeReportHtml(reportState.rankingQuery)}" oninput="updateReportRankings()"></label><label>Sort <select id="reportRankingSort" onchange="updateReportRankings()"><option value="score-desc">Highest score</option><option value="score-asc">Lowest score</option><option value="name">Name</option></select></label></div>
        <div id="reportRankingTable"></div><button type="button" class="report-secondary-button" id="reportRankingExpand" onclick="toggleReportRankings()">Show all results</button>`;
}

function renderReportContributions() {
    const ranking = reportRanking();
    return `<div id="subtypeContributionPanel"><div class="report-section-heading"><h2>Trait Contributions</h2><p>Final contribution values, rounded to the nearest 0.5 for display</p></div>
        <div class="report-controls"><label>Analyze <select id="contributionTypeSelect" onchange="updateContributionAnalysis()">${ranking.map(item => `<option value="${escapeReportHtml(item.key)}">${escapeReportHtml(item.name)}</option>`).join('')}</select></label><label>Direction <select id="reportContributionSign" onchange="updateContributionAnalysis()"><option value="all">All</option><option value="positive">Positive</option><option value="negative">Negative</option></select></label><label>Category <select id="reportContributionCategory" onchange="updateContributionAnalysis()"><option value="all">All</option><option value="pigmentation">Pigmentation</option><option value="morphological">Morphology</option></select></label><label>Sort score <select id="reportContributionSort" onchange="updateContributionAnalysis()"><option value="magnitude">Largest magnitude</option><option value="positive-first">Highest positive first</option><option value="negative-first">Most negative first</option></select></label></div>
        <div id="contributionAnalysisContainer"></div><p class="report-footnote">Group contributions are averaged over the same subtype set as the main group score. Rule effects and entries without a matched trait are shown separately in the All view.</p>
        <div class="report-inline-actions"><button type="button" onclick="exportReportAs('png')">Export contribution PNG</button><button type="button" onclick="exportReportAs('jpg')">Export contribution JPG</button></div></div>`;
}

function reportSelectionBreakdown(contributions) {
    const rows = Object.entries(contributions).filter(([, value]) => value !== 0);
    if (!rows.length) return '<span class="report-empty">No subtype contribution recorded.</span>';
    return `<div class="report-table-scroll"><table class="report-data-table"><thead><tr><th>Subtype</th><th>Contribution</th></tr></thead><tbody>${rows.map(([key, value]) => `<tr><td>${escapeReportHtml(getSubtypeName(key))}</td><td class="report-number ${value < 0 ? 'negative' : 'positive'}">${escapeReportHtml(reportSignedScore(value))}</td></tr>`).join('')}</tbody></table></div>`;
}

function renderReportSelections() {
    const rows = traits.map(trait => {
        let selected = '— Not selected —';
        const contributions = {};
        if (trait.subTraits) {
            const parts = [];
            trait.subTraits.forEach(sub => {
                const value = userSubSelections[sub.id];
                if (!value) return;
                const option = sub.options.find(item => item.value === value);
                parts.push(`${sub.label}: ${option?.label || value}`);
                Object.entries(getOptionContributions(option)).forEach(([key, amount]) => {
                    contributions[key] = (contributions[key] || 0) + amount;
                });
            });
            if (parts.length) selected = parts.join('; ');
        } else {
            const value = userSelections[trait.id];
            if (value) {
                const option = trait.options.find(item => item.value === value);
                selected = option?.label || value;
                Object.assign(contributions, getOptionContributions(option));
            }
            if (userMeasurements[trait.id]) selected += ` [Index: ${userMeasurements[trait.id].index}]`;
        }
        const affected = Object.values(contributions).filter(value => value !== 0).length;
        const summary = affected ? `<details class="report-trait-details"><summary>${affected} subtype contributions</summary>${reportSelectionBreakdown(contributions)}</details>` : '—';
        return `<tr><td>${trait.number}</td><td><strong>${escapeReportHtml(trait.title)}</strong></td><td>${escapeReportHtml(selected)}</td><td>${trait.category === 'pigmentation' ? 'Pigmentation' : 'Morphology'}</td><td>${summary}</td></tr>`;
    }).join('');
    return `<div class="report-section-heading"><h2>Trait Selections</h2><p>All traits, including those left unselected</p></div><div class="report-table-scroll"><table class="report-data-table report-trait-table"><thead><tr><th>#</th><th>Trait</th><th>Selected Value</th><th>Category</th><th>Contribution / Summary</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function reportRuleEffects(rule) {
    return (rule.effects || []).map(effect => `${GROUP_KEYS.includes(effect.type) ? getGroupName(effect.type) : getSubtypeName(effect.type)} ${reportSignedScore(effect.value)}`).join(' · ') || 'No effects configured';
}

function reportRuleCard(item, status) {
    const rule = item.rule;
    const source = rule.condition ? rule.condition.toString().replace(/^condition\s*\(\)\s*\{/, '').replace(/\}\s*$/, '').trim() : '';
    const checklist = typeof getRuleConditionChecklist === 'function' ? getRuleConditionChecklist(rule, source) : [];
    const met = checklist.filter(clause => clause.met && !clause.error).length;
    const fields = [...new Set([...source.matchAll(/userSelections\.([a-zA-Z0-9_]+)/g)].map(match => match[1]))];
    const usedCategories = new Set(fields.map(id => traits.find(trait => trait.id === id)?.category).filter(Boolean));
    const mixed = usedCategories.size > 1;
    return `<details class="report-rule-card"><summary><span><strong>${escapeReportHtml(rule.name || rule.id || 'Unnamed Rule')}</strong><small>${escapeReportHtml(item.groupTitle)}${mixed ? ' · Mixed-category condition' : ''}</small></span><span class="report-rule-count">${status === 'triggered' ? 'Triggered' : status === 'disabled' ? 'Disabled' : `${met}/${checklist.length} met`}</span></summary><div class="report-rule-detail"><p><strong>Effects:</strong> ${escapeReportHtml(reportRuleEffects(rule))}</p><p><strong>Condition:</strong> <code>${escapeReportHtml(source || 'No condition supplied')}</code></p>${checklist.length ? `<ul>${checklist.map(clause => `<li class="${clause.met ? 'met' : 'missing'}"><strong>${clause.met ? 'Met' : 'Missing'}:</strong> <code>${escapeReportHtml(clause.clause)}</code>${clause.currentValues?.length ? `<small>${clause.currentValues.map(value => `${escapeReportHtml(value.title)}: ${escapeReportHtml(value.label)}`).join(' · ')}</small>` : ''}</li>`).join('')}</ul>` : '<p>No condition checklist available.</p>'}</div></details>`;
}

function renderReportRules() {
    const rules = typeof getAllEngineRules === 'function' ? getAllEngineRules() : [];
    const triggered = [], near = [], disabled = [];
    rules.forEach(item => {
        if (!item.rule.enabled) { disabled.push(item); return; }
        let active = false;
        try { active = Boolean(item.rule.condition?.()); } catch (_) { active = false; }
        if (active) triggered.push(item);
        else {
            const source = item.rule.condition?.toString().replace(/^condition\s*\(\)\s*\{/, '').replace(/\}\s*$/, '').trim() || '';
            const checklist = typeof getRuleConditionChecklist === 'function' ? getRuleConditionChecklist(item.rule, source) : [];
            const met = checklist.filter(clause => clause.met && !clause.error).length;
            near.push({ ...item, ratio: checklist.length ? met / checklist.length : 0, missing: checklist.length - met });
        }
    });
    near.sort((a, b) => b.ratio - a.ratio || a.missing - b.missing);
    return `<div class="report-section-heading"><h2>Rules & Diagnostics</h2><p>Existing rule conditions, effects, and activation details</p></div><div class="report-rule-columns"><div><h3>Triggered Rules (${triggered.length})</h3>${triggered.map(item => reportRuleCard(item, 'triggered')).join('') || '<p class="report-empty">No rules triggered.</p>'}</div><div><h3>Closest Untriggered Rules (${near.length})</h3>${near.map(item => reportRuleCard(item, 'near')).join('') || '<p class="report-empty">No near misses.</p>'}</div></div>${disabled.length ? `<details class="report-disabled-rules"><summary>Disabled rules (${disabled.length})</summary>${disabled.map(item => reportRuleCard(item, 'disabled')).join('')}</details>` : ''}`;
}

function renderReportMarkup() {
    const sections = {
        overview: renderReportOverview(),
        categories: renderReportCategories(),
        rankings: renderReportRankings(),
        contributions: renderReportContributions(),
        selections: renderReportSelections(),
        rules: renderReportRules()
    };
    return `<div class="report-workspace-header"><div class="report-heading"><h1>Historical Anthropometric Reconstruction Report</h1><p>Simulated classification · circa 1880–1940 typological framework</p></div><div class="report-header-controls"><div class="report-view-switch"><button type="button" id="analysisTab" class="report-tab" onclick="showReportAnalysis()">Analysis</button><button type="button" id="mapTab" class="report-tab" onclick="showReportMap()">Map</button></div><div class="report-mode-switch" role="group" aria-label="Ranking mode"><button type="button" id="reportGroupMode" onclick="setReportMode('group')">Group Mode</button><button type="button" id="reportSubtypeMode" onclick="setReportMode('subtype')">Subtype Mode</button></div><button type="button" onclick="printFullReport()">Print</button><details class="report-export-menu"><summary>Export</summary><div><button type="button" onclick="exportFullReportAs('png')">PNG image</button><button type="button" onclick="exportFullReportAs('jpg')">JPG image</button></div></details><button type="button" onclick="closeReport()" aria-label="Close Full Report">Close</button></div></div>
        <div class="report-workspace-body"><nav class="report-sidebar" aria-label="Report sections">${REPORT_SECTIONS.map(([key, label]) => `<button type="button" data-report-section="${key}" onclick="showReportSection('${key}')">${label}</button>`).join('')}</nav><main class="report-main" id="reportMain"><div id="reportAnalysisView">${REPORT_SECTIONS.filter(([key]) => key !== 'map').map(([key]) => `<section class="report-workspace-section" id="reportSection-${key}" aria-labelledby="reportSectionLabel-${key}"><span class="report-print-section-label" id="reportSectionLabel-${key}">${REPORT_SECTIONS.find(item => item[0] === key)[1]}</span>${sections[key]}</section>`).join('')}</div><section class="report-workspace-section" id="reportMapView"><div class="report-section-heading"><h2>Map</h2><p>Existing geographic visualization of subtype scores</p></div><div class="report-map-card" id="anthropologicalMapContainer"><iframe id="anthropologicalMapFrame" title="Historical anthropological map" src="map/anthropologicalMap.html"></iframe><div id="reportMapSnapshot" aria-hidden="true"></div></div><p class="report-footnote">The map retains its existing subtype-score display in both report modes.</p></section><div class="report-disclaimer"><strong>Historical reconstruction disclaimer:</strong> These obsolete classification methods do not represent modern genetics, scientific ancestry estimation, ethnicity prediction, race determination, or biological reality.</div></main></div>`;
}

function updateReportRankings() {
    const query = document.getElementById('reportRankingSearch');
    const sort = document.getElementById('reportRankingSort');
    if (query) reportState.rankingQuery = query.value;
    if (sort) reportState.rankingSort = sort.value;
    const filtered = reportRanking().filter(item => item.name.toLowerCase().includes(reportState.rankingQuery.trim().toLowerCase()));
    if (reportState.rankingSort === 'score-asc') filtered.sort((a, b) => a.score - b.score);
    if (reportState.rankingSort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
    const table = document.getElementById('reportRankingTable');
    if (table) table.innerHTML = reportScoreTable(filtered, reportState.rankingExpanded ? filtered.length : 8);
    const expand = document.getElementById('reportRankingExpand');
    if (expand) {
        expand.hidden = filtered.length <= 8;
        expand.textContent = reportState.rankingExpanded ? 'Show top 8' : `Show all ${filtered.length} results`;
    }
}

function toggleReportRankings() {
    reportState.rankingExpanded = !reportState.rankingExpanded;
    updateReportRankings();
}

function updateContributionAnalysis() {
    const target = document.getElementById('contributionTypeSelect');
    const direction = document.getElementById('reportContributionSign');
    const category = document.getElementById('reportContributionCategory');
    const sort = document.getElementById('reportContributionSort');
    const output = document.getElementById('contributionAnalysisContainer');
    if (!target || !direction || !category || !output || !currentReportAnalysis) return;
    if (sort) reportState.contributionSort = sort.value;
    output.innerHTML = renderContributionTable(target.value, direction.value, category.value, reportState.contributionSort);
}

function sortReportContributionRows(rows, sort) {
    const sorted = [...rows];
    if (sort === 'positive-first') return sorted.sort((a, b) => b.value - a.value);
    if (sort === 'negative-first') return sorted.sort((a, b) => a.value - b.value);
    return sorted.sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
}

function renderContributionTable(targetKey, direction, category, sort = 'magnitude') {
    const rows = getReportTargetEntries(currentReportAnalysis, reportState.mode, targetKey)
        .filter(item => direction === 'all' || (direction === 'positive' ? item.value > 0 : item.value < 0))
        .filter(item => category === 'all' || item.category === category);
    const sortedRows = sortReportContributionRows(rows, sort);
    return sortedRows.length ? `<div class="report-table-scroll"><table class="report-data-table"><thead><tr><th>Trait / source</th><th>Selected variant</th><th>Category</th><th>Contribution</th></tr></thead><tbody>${sortedRows.map(item => `<tr><td>${escapeReportHtml(item.traitName)}</td><td>${escapeReportHtml(item.selection || '—')}</td><td>${item.category === 'morphological' ? 'Morphology' : item.category === 'pigmentation' ? 'Pigmentation' : item.category === 'rule' ? 'Rule / mixed' : 'Unattributed'}</td><td class="report-number ${item.value < 0 ? 'negative' : 'positive'}">${escapeReportHtml(reportSignedScore(item.value))}</td></tr>`).join('')}</tbody></table></div>` : '<p class="report-empty">No contributions match these filters.</p>';
}

function sendReportMapScores() {
    const frame = document.getElementById('anthropologicalMapFrame');
    if (frame?.contentWindow && currentReportResult) {
        frame.contentWindow.postMessage({ scores: currentReportResult.scores, colors: TYPE_COLORS }, '*');
    }
}

function showReportSection(section) {
    if (!REPORT_SECTIONS.some(([key]) => key === section)) section = 'overview';
    reportState.section = section;
    const isMap = section === 'map';
    const analysis = document.getElementById('reportAnalysisView');
    const map = document.getElementById('reportMapView');
    if (analysis) analysis.hidden = isMap;
    if (map) map.hidden = !isMap;
    document.querySelectorAll('#reportInner .report-workspace-section').forEach(panel => {
        if (panel.id !== 'reportMapView') panel.hidden = panel.id !== `reportSection-${section}`;
    });
    document.querySelectorAll('#reportInner [data-report-section]').forEach(button => {
        const active = button.dataset.reportSection === section;
        button.classList.toggle('active', active);
        if (active) button.setAttribute('aria-current', 'page');
        else button.removeAttribute('aria-current');
    });
    for (const [id, active] of [['analysisTab', !isMap], ['mapTab', isMap]]) {
        const tab = document.getElementById(id);
        if (tab) {
            tab.classList.toggle('active', active);
            tab.setAttribute('aria-pressed', String(active));
        }
    }
    const main = document.getElementById('reportMain');
    if (main) main.scrollTop = 0;
    if (isMap) sendReportMapScores();
}

function showReportAnalysis() { showReportSection('overview'); }
function showReportMap() { showReportSection('map'); }

function setReportMode(mode) {
    if (!currentReportResult || !['group', 'subtype'].includes(mode)) return;
    reportState.mode = mode;
    const reportInner = document.getElementById('reportInner');
    reportInner.innerHTML = renderReportMarkup();
    document.getElementById('reportRankingSort').value = reportState.rankingSort;
    document.getElementById('reportContributionSort').value = reportState.contributionSort;
    document.getElementById(mode === 'group' ? 'reportGroupMode' : 'reportSubtypeMode').focus();
    for (const [id, active] of [['reportGroupMode', mode === 'group'], ['reportSubtypeMode', mode === 'subtype']]) {
        const button = document.getElementById(id);
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
    }
    updateReportRankings();
    updateContributionAnalysis();
    showReportSection(reportState.section);
    attachReportMapFrame();
}

function toggleSubtypeBreakdown() {
    setReportMode(reportState.mode === 'group' ? 'subtype' : 'group');
}

function attachReportMapFrame() {
    const frame = document.getElementById('anthropologicalMapFrame');
    if (!frame) return;
    frame.addEventListener('load', sendReportMapScores);
    setTimeout(sendReportMapScores, 300);
}

function generateReport() {
    currentReportResult = calculateProfile();
    currentReportAnalysis = buildReportAnalysis(currentReportResult);
    reportReturnFocus = document.activeElement;
    reportState.mode = 'group';
    reportState.section = 'overview';
    reportState.rankingQuery = '';
    reportState.rankingSort = 'score-desc';
    reportState.rankingExpanded = false;
    reportState.contributionSort = 'magnitude';
    const overlay = document.getElementById('reportOverlay');
    document.getElementById('reportInner').innerHTML = renderReportMarkup();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.getElementById('reportGroupMode').classList.add('active');
    document.getElementById('reportGroupMode').setAttribute('aria-pressed', 'true');
    document.getElementById('reportSubtypeMode').setAttribute('aria-pressed', 'false');
    updateReportRankings();
    updateContributionAnalysis();
    showReportSection('overview');
    attachReportMapFrame();
    overlay.querySelector('.report-workspace-header button')?.focus();
}

function closeReport() {
    document.getElementById('reportOverlay').classList.remove('active');
    document.body.style.overflow = '';
    reportReturnFocus?.focus?.();
}

function prepareReportMapSnapshot() {
    const frame = document.getElementById('anthropologicalMapFrame');
    const snapshot = document.getElementById('reportMapSnapshot');
    try {
        const mapSvg = frame?.contentDocument?.querySelector('svg');
        if (snapshot && mapSvg) snapshot.replaceChildren(mapSvg.cloneNode(true));
    } catch (_) {
        // The live iframe remains available if the browser blocks document access.
    }
}

function printFullReport() {
    prepareReportMapSnapshot();
    window.print();
}

function exportFullReportAs(format) {
    if (!['png', 'jpg'].includes(format)) return;
    if (typeof html2canvas !== 'function') {
        alert('Image export is unavailable right now. Please reload the page and try again.');
        return;
    }
    prepareReportMapSnapshot();
    const report = document.getElementById('reportContent');
    html2canvas(report, {
        scale: 1.5,
        backgroundColor: '#211f1d',
        logging: false,
        onclone: clonedDocument => {
            const clone = clonedDocument.getElementById('reportContent');
            const cloneOverlay = clonedDocument.getElementById('reportOverlay');
            clone.classList.add('report-exporting');
            clone.style.width = '1100px';
            clone.style.maxWidth = 'none';
            clone.style.maxHeight = 'none';
            clone.style.overflow = 'visible';
            if (cloneOverlay) {
                cloneOverlay.style.display = 'block';
                cloneOverlay.style.position = 'static';
                cloneOverlay.style.overflow = 'visible';
                cloneOverlay.style.padding = '0';
            }
            clonedDocument.body.style.overflow = 'visible';
            clonedDocument.querySelectorAll('#reportInner [hidden]').forEach(element => element.hidden = false);
            clonedDocument.querySelectorAll('#reportInner details').forEach(element => element.open = true);
            const fullRankings = clonedDocument.getElementById('reportRankingTable');
            if (fullRankings) fullRankings.innerHTML = reportScoreTable(reportRanking());
            const fullContributions = clonedDocument.getElementById('contributionAnalysisContainer');
            const selectedTarget = document.getElementById('contributionTypeSelect')?.value || reportRanking()[0]?.key;
            if (fullContributions && selectedTarget) fullContributions.innerHTML = renderContributionTable(selectedTarget, 'all', 'all', reportState.contributionSort);
        }
    }).then(canvas => {
        const link = document.createElement('a');
        link.href = format === 'png' ? canvas.toDataURL('image/png') : canvas.toDataURL('image/jpeg', 0.95);
        link.download = `hars-full-report-${new Date().toISOString().slice(0, 10)}.${format}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        alert(`Full report exported as ${format.toUpperCase()}.`);
    }).catch(error => {
        console.error('Report export error:', error);
        alert('Could not export the report image. Please try printing the report instead.');
    });
}

window.addEventListener('beforeprint', () => {
    if (!document.getElementById('reportOverlay')?.classList.contains('active')) return;
    reportPrintState = {
        query: reportState.rankingQuery,
        sort: reportState.rankingSort,
        expanded: reportState.rankingExpanded,
        sign: document.getElementById('reportContributionSign')?.value,
        category: document.getElementById('reportContributionCategory')?.value,
        openDetails: [...document.querySelectorAll('#reportInner details[open]')]
    };
    reportState.rankingQuery = '';
    reportState.rankingSort = 'score-desc';
    reportState.rankingExpanded = true;
    const search = document.getElementById('reportRankingSearch');
    const sort = document.getElementById('reportRankingSort');
    if (search) search.value = '';
    if (sort) sort.value = 'score-desc';
    updateReportRankings();
    const contributionSign = document.getElementById('reportContributionSign');
    const contributionCategory = document.getElementById('reportContributionCategory');
    if (contributionSign) contributionSign.value = 'all';
    if (contributionCategory) contributionCategory.value = 'all';
    updateContributionAnalysis();
    document.querySelectorAll('#reportInner details').forEach(element => element.open = true);
    prepareReportMapSnapshot();
});
window.addEventListener('afterprint', () => {
    if (!reportPrintState) return;
    reportState.rankingQuery = reportPrintState.query;
    reportState.rankingSort = reportPrintState.sort;
    reportState.rankingExpanded = reportPrintState.expanded;
    const search = document.getElementById('reportRankingSearch');
    const sort = document.getElementById('reportRankingSort');
    if (search) search.value = reportPrintState.query;
    if (sort) sort.value = reportPrintState.sort;
    updateReportRankings();
    const contributionSign = document.getElementById('reportContributionSign');
    const contributionCategory = document.getElementById('reportContributionCategory');
    if (contributionSign) contributionSign.value = reportPrintState.sign;
    if (contributionCategory) contributionCategory.value = reportPrintState.category;
    updateContributionAnalysis();
    document.querySelectorAll('#reportInner details').forEach(element => element.open = reportPrintState.openDetails.includes(element));
    reportPrintState = null;
});
document.addEventListener('keydown', event => {
    if (!document.getElementById('reportOverlay')?.classList.contains('active')) return;
    if (event.key === 'Escape') { closeReport(); return; }
    if (event.key !== 'Tab') return;
    const dialog = document.getElementById('reportContent');
    const focusable = [...dialog.querySelectorAll('button, input, select, summary, a[href], [tabindex]:not([tabindex="-1"])')]
        .filter(element => !element.disabled && element.getClientRects().length > 0);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
