// ============================================================
// SCORE PANEL SYSTEM
// ============================================================
function animateValue(element, start, end, duration = 220) {

    if (element._scoreAnimationFrame)
        cancelAnimationFrame(element._scoreAnimationFrame);

    if (start === end || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        element.textContent = formatScoreValue(end);
        element._scoreAnimationFrame = null;
        return;
    }

    const startTime = performance.now();

    function update(now) {

        const progress = Math.min((now - startTime) / duration, 1);

        // easeOutCubic
        const eased =
            1 - Math.pow(1 - progress, 3);

        const value =
            start + (end - start) * eased;

        element.textContent = formatScoreValue(value);

        if (progress < 1)
            element._scoreAnimationFrame = requestAnimationFrame(update);
        else {
            element.textContent = formatScoreValue(end);
            element._scoreAnimationFrame = null;
        }

    }

    element._scoreAnimationFrame = requestAnimationFrame(update);

}

function buildScoreRows() {
    const scoreRowsDiv = document.getElementById('scoreRows');
    scoreRowsDiv.innerHTML = '';
    GROUP_KEYS.forEach(key => {
        const row = document.createElement('div');
        row.className = 'score-row';
        row.id = 'scoreRow-' + key;
        row.innerHTML = `
            <span class="type-name">${getGroupName(key)}</span>
            <div class="score-bar"><div class="score-bar-fill" id="scoreBar-${key}" style="left:50%;width:0;"></div></div>
            <span class="type-score" id="scoreVal-${key}">0</span>
        `;
        scoreRowsDiv.appendChild(row);
    });
}

function updateProgress(result) {
    const progressContainer = document.getElementById('progressContainer');
    const progressText = document.getElementById('progressText');
    if (!progressContainer || !progressText) return;

    const { filledCount, totalCount } = result.progress;
    const percentage = totalCount > 0 ? Math.round((filledCount / totalCount) * 100) : 0;
    const template = window.LOCALE ? window.LOCALE.get('scorePanel.progressText', '{filled}/{total} traits · {percent}%') : '{filled}/{total} traits · {percent}%';
    progressText.textContent = template
        .replace('{percent}', String(percentage))
        .replace('{filled}', String(filledCount))
        .replace('{total}', String(totalCount));

    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    if (progressFill) progressFill.style.width = percentage + '%';
    if (progressBar) {
        progressBar.setAttribute('aria-valuenow', String(filledCount));
        progressBar.setAttribute('aria-valuemax', String(totalCount));
        progressBar.setAttribute('aria-valuetext', progressText.textContent);
    }
}

function updateAllScores() {
    console.trace("updateAllScores");


    const result = calculateProfile();

    updateProgress(result);

    updateMissingTraitAdvisor(result);

    updateDevToolsRaceOrder(result);

    updateScoreRows(result);

    updateClosestType(result);

    updateEngineVersion(result);

}

function updateScoreRows(result) {
    
console.log(previousSubtypeScores);
console.log(result.groupScores);
console.count("updateScoreRows");
    const scoreContainer = document.getElementById("scoreRows");

    // Сохраняем старые позиции строк
    const oldPositions = {};

    document.querySelectorAll(".score-row").forEach(row => {
        oldPositions[row.id] = row.getBoundingClientRect();
    });

    const displayRange = getScoreDisplayRange(result.groupScores);
    updateScoreScale(displayRange);

    // Сортировка типов по очкам
    const orderedGroups = [...GROUP_KEYS].sort((a, b) => {
        return (result.groupScores[b] ?? 0) - (result.groupScores[a] ?? 0);
    });

    orderedGroups.forEach(key => {

        const val = result.groupScores[key] ?? 0;

        const previous = previousSubtypeScores[key];

        const scoreValEl =
            document.getElementById("scoreVal-" + key);

        const scoreBarEl =
            document.getElementById("scoreBar-" + key);

        const scoreRowEl =
            document.getElementById("scoreRow-" + key);
        
        if (scoreValEl)
            scoreValEl.textContent = formatScoreValue(val);
        const oldValue =
    Number(scoreValEl.dataset.value || 0);
if (scoreRowEl) {

    scoreRowEl.classList.remove(
        "rank-gold",
        "rank-silver",
        "rank-bronze"
    );

    switch (orderedGroups.indexOf(key)) {

        case 0:
            scoreRowEl.classList.add("rank-gold");
            break;

        case 1:
            scoreRowEl.classList.add("rank-silver");
            break;

        case 2:
            scoreRowEl.classList.add("rank-bronze");
            break;

    }

}
animateValue(
    scoreValEl,
    oldValue,
    val
);

scoreValEl.dataset.value = val;

        if (scoreBarEl)
            renderSignedScoreBar(scoreBarEl, val, displayRange, getTypeColor(key), getGroupName(key));

        if (scoreRowEl) {
            scoreRowEl.classList.remove("top-score");
            scoreRowEl.style.setProperty(
    "--typeColor",
    getTypeColor(key)
);

            // Меняем порядок элементов
            scoreContainer.appendChild(scoreRowEl);
        }
        if (scoreRowEl && previous !== undefined) {

    scoreRowEl.classList.remove(
        "flash-positive",
        "flash-negative"
    );

    void scoreRowEl.offsetWidth;

    if (val > previous) {

        scoreRowEl.classList.add("flash-positive");

    } else if (val < previous) {

        scoreRowEl.classList.add("flash-negative");

    }

}
previousSubtypeScores[key] = val;

    });

    // FLIP-анимация
    document.querySelectorAll(".score-row").forEach(row => {

        const oldPos = oldPositions[row.id];

        if (!oldPos) return;

        const newPos = row.getBoundingClientRect();

        const deltaY = oldPos.top - newPos.top;

        row.style.transition = "none";
        row.style.transform = `translateY(${deltaY}px)`;

        // Форсируем перерасчет layout
        void row.offsetWidth;

        row.style.transition = "transform .22s ease, background .2s ease, border-color .2s ease, box-shadow .2s ease";
        row.style.transform = "";

    });

}


function updateClosestType(result) {

    const closestTypeName =
        document.getElementById('closestTypeName');

    const secondaryTypes =
        document.getElementById('secondaryTypes');

    const sorted = result.groupRanking;

    if (!closestTypeName || !secondaryTypes)
        return;

    if (sorted.length > 0 && sorted[0].score > 0) {

        const topKey = sorted[0].key;

        const topRow =
            document.getElementById('scoreRow-' + topKey);

        if (topRow)
            topRow.classList.add('top-score');

        closestTypeName.textContent =
            sorted[0].name;

        const secs =
            sorted
                .slice(1, 3)
                .filter(s => s.score > sorted[0].score * 0.7)
                .map(s => s.name)
                .join(', ');

        secondaryTypes.textContent =
            secs
                ? 'Secondary Groups: ' + secs
                : 'No strong secondary group alignment';

    } else if (sorted.length > 0) {

        closestTypeName.textContent =
            sorted[0].name + ' (weak alignment)';

        secondaryTypes.textContent =
            'Insufficient trait data for strong group classification';

    }

}

function updateEngineVersion(result) {

    const engineVersion =
        document.getElementById("engineVersion");

    if (engineVersion) {

        engineVersion.textContent =
            `${result.engine.name} v${result.engine.version}`;

    }

}
