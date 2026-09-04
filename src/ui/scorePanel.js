// ============================================================
// SCORE PANEL SYSTEM
// ============================================================
function animateValue(element, start, end, duration = 850) {

    if (start === end) {
        element.textContent = Math.round(end);
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

        element.textContent = Math.round(value);

        if (progress < 1)
            requestAnimationFrame(update);

    }

    requestAnimationFrame(update);

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
            <div class="score-bar"><div class="score-bar-fill" id="scoreBar-${key}" style="width:50%;"></div></div>
            <span class="type-score" id="scoreVal-${key}">50</span>
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
    const template = window.LOCALE ? window.LOCALE.get('scorePanel.progressText', '{percent}% ({filled}/{total})') : '{percent}% ({filled}/{total})';
    progressText.textContent = template
        .replace('{percent}', String(percentage))
        .replace('{filled}', String(filledCount))
        .replace('{total}', String(totalCount));

    if (percentage === 0) {
        progressContainer.style.background = '#f5f0e5';
        progressText.style.color = '#4a3828';
    } else if (percentage < 50) {
        progressContainer.style.background = '#ffe8e8';
        progressText.style.color = '#8b2020';
    } else if (percentage < 100) {
        progressContainer.style.background = '#fff8e8';
        progressText.style.color = '#8b6914';
    } else {
        progressContainer.style.background = '#e8f5e8';
        progressText.style.color = '#2d6b1e';
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

    // Максимальный положительный балл
    const maxScore = Math.max(
        ...Object.values(result.groupScores).map(v => Math.max(0, v)),
        1
    );

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
            scoreValEl.textContent = Math.round(val);
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

        if (scoreBarEl) {

            scoreBarEl.style.background = getTypeColor(key);

            const maxPositive = Math.max(
    ...Object.values(result.groupScores)
        .map(v=>Math.max(0,v)),
    1
);

const maxNegative = Math.max(
    ...Object.values(result.groupScores)
        .map(v=>Math.abs(Math.min(0,v))),
    1
);

let pct;

if(val>=0){

    pct=(val/maxPositive)*100;

}else{

    pct=(Math.abs(val)/maxNegative)*100;

}
if(val>=0){

    scoreBarEl.style.background=getTypeColor(key);

}else{

    scoreBarEl.style.background="#cf5b5b";

}

            scoreBarEl.style.width = pct + "%";
        }

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

        row.style.transition = "transform .45s ease";
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