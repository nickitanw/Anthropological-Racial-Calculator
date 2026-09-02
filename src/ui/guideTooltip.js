// ============================================================
// GUIDE TOOLTIP SYSTEM
// ============================================================
let _guideEl = null;
let _activeGuideId = null;

function _initGuide() {
    _guideEl = document.createElement('div');
    _guideEl.id = 'guideTooltip';
    _guideEl.className = 'guide-tooltip';
    document.body.appendChild(_guideEl);

    document.addEventListener('click', function(e) {
        if (_guideEl && !_guideEl.contains(e.target) && !e.target.classList.contains('guide-btn')) {
            closeGuide();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeGuide();
    });
}

function showGuide(event, traitId) {
    event.stopPropagation();

    // Toggle off if same button clicked again
    if (_activeGuideId === traitId && _guideEl.classList.contains('active')) {
        closeGuide();
        return;
    }

    const trait = traits.find(t => t.id === traitId);
    if (!trait) return;

    let html = `<button class="guide-close" onclick="closeGuide()">✕</button>
                <h4>📏 ${trait.title}</h4>`;

    if (trait.guideImage) {

    html += `
    <div class="guide-image-wrapper">

        <img
            class="guide-img"
            src="guide-images/${trait.guideImage}"
            alt="${trait.title} measurement guide"
            onclick="openLightbox(
                this.src,
                this.alt,
                ${trait.imageLicense ? JSON.stringify(trait.imageLicense).replace(/"/g, '&quot;') : 'null'},
                event
            );
            showImageLicense(${trait.imageLicense ? JSON.stringify(trait.imageLicense).replace(/"/g, '&quot;') : 'null'});
            "
            
            style="cursor:zoom-in;"
            onerror="this.style.display='none'">

        ${
            trait.imageLicense
            ? `
            <div class="guide-license">

                <b>Image Source</b><br>

                ${trait.imageLicense.source}<br>

                ${trait.imageLicense.author}<br>

                ${trait.imageLicense.license}

            </div>
            `
            : ""
        }

    </div>
    `;

}

    html += `<p><strong>Definition:</strong> ${trait.definition}</p>`;
    html += `<p><strong>How to measure:</strong> ${trait.measurement}</p>`;
    html += `<p class="guide-unit"><em>Unit: ${trait.unit}</em></p>`;

    _guideEl.innerHTML = html;
    _guideEl.classList.add('active');
    _activeGuideId = traitId;

    // Smart positioning: below the button, shift left if near edge
    const btn = event.currentTarget;
    const rect = btn.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const tooltipW = 340;

    let left = rect.left;
    let top = rect.bottom + scrollY + 6;

    if (left + tooltipW > window.innerWidth - 12) {
        left = window.innerWidth - tooltipW - 12;
    }
    if (left < 8) left = 8;

    _guideEl.style.left = left + 'px';
    _guideEl.style.top = top + 'px';
}

function closeGuide() {
    if (_guideEl) _guideEl.classList.remove('active');
    _activeGuideId = null;
}

