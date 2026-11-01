// Display-only helpers for the live score panel. Scores and ranking come from the engine.
function formatScoreValue(value) {
    const rounded = Math.round(Math.abs(value)) * (value < 0 ? -1 : 1);
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(rounded || 0);
}

function getScoreDisplayRange(groupScores) {
    return Math.max(1, ...Object.values(groupScores).map(value => Math.abs(value)));
}

function getSignedBarGeometry(value, range) {
    const halfWidth = Math.min(Math.abs(value) / range, 1) * 50;
    return { left: value < 0 ? 50 - halfWidth : 50, width: halfWidth };
}

function renderSignedScoreBar(fill, value, range, color, groupName) {
    const geometry = getSignedBarGeometry(value, range);
    fill.style.left = geometry.left + '%';
    fill.style.width = geometry.width + '%';
    fill.style.background = value < 0 ? '#a96a66' : color;
    const track = fill.parentElement;
    track.setAttribute('role', 'meter');
    track.setAttribute('aria-label', groupName + ' score');
    track.setAttribute('aria-valuemin', String(-range));
    track.setAttribute('aria-valuemax', String(range));
    track.setAttribute('aria-valuenow', String(value));
}

function updateScoreScale(range) {
    const min = document.getElementById('scoreScaleMin');
    const max = document.getElementById('scoreScaleMax');
    if (min) min.textContent = '−' + formatScoreValue(range);
    if (max) max.textContent = '+' + formatScoreValue(range);
}
