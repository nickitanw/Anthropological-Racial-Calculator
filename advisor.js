function getMissingTraits() {
            const missing = [];
            traits.forEach(trait => {
                let isFilled = false;
                
                if (trait.type === 'composite' && trait.subTraits) {
                    isFilled = trait.subTraits.some(sub => userSubSelections[sub.id]);
                } else if (trait.type === 'select' || trait.type === 'cephalic' || trait.type === 'nasal' || trait.type === 'index') {
                    isFilled = !!userSelections[trait.id];
                }
                
                if (!isFilled) {
                    missing.push({
                        id: trait.id,
                        title: trait.title,
                        weightClass: trait.weightClass,
                        number: trait.number,
                        type: trait.type,
                        subTraits: trait.subTraits
                    });
                }
            });
            return missing;
        }

function calculateMissingTraitPriority(missingTraits) {
            return missingTraits.map(trait => {
                const weightRank = WEIGHT_CLASSES[trait.weightClass] || 0;
                const weightValue = WEIGHT_CLASSES[trait.weightClass] || 1;
                
                // Priority Score: combines weight class rank (higher = more critical)
                // A+ traits get highest priority, then A, then A-, etc.
                const priorityScore = weightRank * 1000 + weightValue * 100;
                
                return {
                    ...trait,
                    weightRank,
                    weightValue,
                    priorityScore
                };
            }).sort((a, b) => b.priorityScore - a.priorityScore);
        }

function categorizeMissingTraits(prioritizedTraits) {
            const critical = [];    // A-Class (A+, A, A-)
            const important = [];   // B-Class (B+, B)
            const minor = [];       // C-Class (C+, C)
            
            prioritizedTraits.forEach(trait => {
                if (['A+', 'A', 'A-'].includes(trait.weightClass)) {
                    critical.push(trait);
                } else if (['B+', 'B'].includes(trait.weightClass)) {
                    important.push(trait);
                } else {
                    minor.push(trait);
                }
            });
            
            return { critical, important, minor };
        }

function calculateConfidenceScore() {
            let totalWeight = 0;
            let completedWeight = 0;
            
            traits.forEach(trait => {
                const traitWeight = WEIGHT_CLASSES[trait.weightClass] || 1;
                totalWeight += traitWeight;
                
                let isCompleted = false;
                if (trait.type === 'composite' && trait.subTraits) {
                    isCompleted = trait.subTraits.some(sub => userSubSelections[sub.id]);
                } else if (trait.type === 'select' || trait.type === 'cephalic' || trait.type === 'nasal' || trait.type === 'index') {
                    isCompleted = !!userSelections[trait.id];
                }
                
                if (isCompleted) {
                    completedWeight += traitWeight;
                }
            });
            
            const percentage = totalWeight > 0 ? (completedWeight / totalWeight) * 100 : 0;
            const completedCount = Object.keys(userSelections).length + Object.keys(userSubSelections).length;
            const totalTraits = traits.length;
            
            let confidence = 'Low';
            let reason = 'Most critical traits are still missing.';
            
            if (percentage >= 75) {
                confidence = 'High';
                reason = 'Most A-Class and B-Class traits are already filled.';
            } else if (percentage >= 50) {
                confidence = 'Medium';
                reason = 'Several important traits are complete, but more A/B-class traits would strengthen accuracy.';
            }
            
            return {
                confidence,
                reason,
                percentage: Math.round(percentage),
                completedCount,
                totalTraits,
                completedWeight: Math.round(completedWeight * 10) / 10,
                totalWeight: Math.round(totalWeight * 10) / 10
            };
        }


        function updateMissingTraitAdvisor(result) {
            const container = document.getElementById('devMissingTraitOutput');
            if (!container) return;
            
            const missingTraits = getMissingTraits();
            if (missingTraits.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 20px; background: rgba(45, 107, 30, 0.15); border-left: 3px solid #2d6b1e; border-radius: 4px;">
                        <div style="color: #2d6b1e; font-weight: bold; font-size: 1rem;">✓ All Traits Complete!</div>
                        <div style="color: #5a6f4a; font-size: 0.9rem; margin-top: 6px;">Your profile has maximum classification confidence.</div>
                    </div>
                `;
                return;
            }
            
            const prioritized = calculateMissingTraitPriority(missingTraits);
            const categorized = categorizeMissingTraits(prioritized);
            const confidence = calculateConfidenceScore();
            
            let html = `
                <!-- CONFIDENCE SCORE -->
                <div style="margin-bottom: 20px; padding: 16px; background: var(--score-bg); border: 1px solid var(--border); border-radius: 6px;">
                    <div style="font-weight: bold; color: var(--accent); font-size: 1rem; margin-bottom: 8px;">📊 Classification Confidence</div>
                    <div style="display: flex; gap: 24px; margin-bottom: 12px; flex-wrap: wrap;">
                        <div>
                            <div style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 4px;">Weighted Completion</div>
                            <div style="font-size: 1.2rem; font-weight: bold; color: var(--accent);">${confidence.percentage}%</div>
                            <div style="font-size: 0.8rem; color: var(--text-light);">${confidence.completedWeight}/${confidence.totalWeight} weight</div>
                        </div>
                        <div>
                            <div style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 4px;">Confidence Level</div>
                            <div style="font-size: 1.1rem; font-weight: bold; color: ${confidence.confidence === 'High' ? '#2d6b1e' : confidence.confidence === 'Medium' ? '#c49a3c' : '#c94a3b'};">
                                ${confidence.confidence}
                            </div>
                        </div>
                    </div>
                    <div style="font-size: 0.9rem; color: var(--text); padding: 8px; background: rgba(196, 154, 60, 0.08); border-left: 2px solid var(--accent); border-radius: 4px;">
                        <strong>Why:</strong> ${confidence.reason}
                    </div>
                </div>
            `;
            
            // Critical Missing Traits
            if (categorized.critical.length > 0) {
                html += `
                    <div style="margin-bottom: 16px;">
                        <div style="font-weight: bold; color: #c94a3b; font-size: 0.95rem; margin-bottom: 8px;">🔴 Critical Missing Traits (A-Class)</div>
                `;
                categorized.critical.forEach((trait, idx) => {
                    html += `
                        <div style="padding: 8px 12px; margin-bottom: 6px; background: rgba(201, 74, 59, 0.1); border-left: 3px solid #c94a3b; border-radius: 4px; font-size: 0.9rem;">
                            <span style="color: var(--text); font-weight: bold;">${trait.number}. ${trait.title}</span>
                            <span style="color: #c94a3b; font-weight: bold; margin-left: 8px;">${trait.weightClass}</span>
                        </div>
                    `;
                });
                html += `</div>`;
            }
            
            // Important Missing Traits
            if (categorized.important.length > 0) {
                html += `
                    <div style="margin-bottom: 16px;">
                        <div style="font-weight: bold; color: #c49a3c; font-size: 0.95rem; margin-bottom: 8px;">🟡 Important Missing Traits (B-Class)</div>
                `;
                categorized.important.forEach((trait, idx) => {
                    html += `
                        <div style="padding: 8px 12px; margin-bottom: 6px; background: rgba(196, 154, 60, 0.1); border-left: 3px solid var(--accent); border-radius: 4px; font-size: 0.9rem;">
                            <span style="color: var(--text); font-weight: bold;">${trait.number}. ${trait.title}</span>
                            <span style="color: var(--accent); font-weight: bold; margin-left: 8px;">${trait.weightClass}</span>
                        </div>
                    `;
                });
                html += `</div>`;
            }
            
            // Minor Missing Traits
            if (categorized.minor.length > 0) {
                html += `
                    <div style="margin-bottom: 16px;">
                        <div style="font-weight: bold; color: var(--text-light); font-size: 0.95rem; margin-bottom: 8px;">⚪ Minor Missing Traits (C-Class)</div>
                `;
                const showCount = 5; // Show first 5, allow collapsing
                categorized.minor.slice(0, showCount).forEach((trait, idx) => {
                    html += `
                        <div style="padding: 8px 12px; margin-bottom: 6px; background: rgba(122, 111, 100, 0.08); border-left: 3px solid #a89886; border-radius: 4px; font-size: 0.9rem;">
                            <span style="color: var(--text-light); font-weight: bold;">${trait.number}. ${trait.title}</span>
                            <span style="color: #8b6d5c; font-weight: bold; margin-left: 8px;">${trait.weightClass}</span>
                        </div>
                    `;
                });
                if (categorized.minor.length > showCount) {
                    html += `<div style="text-align: center; color: var(--text-light); font-size: 0.85rem; margin-top: 8px;">+ ${categorized.minor.length - showCount} more minor traits</div>`;
                }
                html += `</div>`;
            }
            
            // Statistics
            html += `
                <div style="margin-top: 16px; padding: 12px; background: rgba(196, 154, 60, 0.05); border: 1px solid var(--border); border-radius: 6px; font-size: 0.85rem;">
                    <div style="color: var(--text-light); margin-bottom: 4px;">
                        <strong>${missingTraits.length}</strong> trait${missingTraits.length !== 1 ? 's' : ''} remain to be filled out of <strong>${traits.length}</strong> total traits.
                    </div>
                    <div style="color: var(--text-light);">
                        Filling the <strong>${categorized.critical.length}</strong> critical trait${categorized.critical.length !== 1 ? 's' : ''} would significantly improve accuracy.
                    </div>
                </div>
            `;
            
            container.innerHTML = html;
        }