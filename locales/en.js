window.APP_LOCALES = window.APP_LOCALES || {};

window.APP_LOCALES.en = {
    // ========== Глобальные ==========
    pageTitle: 'Historical Anthropometric Reconstruction Simulator',
    pageSubtitle: 'Reconstructing Late 19th & Early 20th Century Morphological Classification Systems',
    eraBadge: '📜 circa 1880–1940 · Physical Anthropology · Racial Typology · Craniometry',
    disclaimerBanner: 'HISTORICAL ANTHROPOMETRIC RECONSTRUCTION SIMULATOR — This simulator reconstructs historical anthropological classification systems (c. 1880–1940). It does NOT represent modern scientific ancestry analysis, genetics, ethnicity prediction, race determination, or biological reality. For educational and historical study purposes only.',
    disclaimerInline: 'IMPORTANT HISTORICAL NOTICE: This simulator reconstructs historical anthropological classification methods. It does NOT constitute modern genetics, scientific ancestry estimation, ethnicity prediction, race determination, or any statement of biological reality. The categories and scoring reflect obsolete typological frameworks studied here solely for their historical and educational value.',

    navigation: { menu: 'Main Menu', calculator: 'Calculator', profile: 'Profile', theme: 'Theme', settings: 'Settings' },

    // ========== Меню и навигация ==========
    menu: {
        title: 'Main Menu',
        subtitle: 'Historical Anthropometric Reconstruction Simulator',
        calculator: 'Calculator',
        calculatorDescription: 'Select traits and optional measurements to explore historical group scores and a detailed report.',
        openCalculator: 'Open Calculator →',
        profile: 'My Profile',
        profileDescription: 'Set your display name and manage your local profile library.',
        openProfile: 'Open Profile →',
        about: 'About This Project',
        aboutDescription: 'Learn about the historical context and educational purpose of this simulator.',
        learnMore: 'Learn More →',
        guide: 'User Guide',
        guideDescription: 'Instructions on how to use the calculator and interpret the results.',
        viewGuide: 'View Guide →',
        methodology: 'Methodology',
        methodologyDescription: 'Learn how trait selections, indices, score contributions, and rules shape the results.',
        viewMethodology: 'View Methodology →',
        disclaimers: 'Important Disclaimers',
        disclaimersDescription: 'Critical information about what this simulator does and does not represent.',
        viewDisclaimers: 'View Disclaimers →'
    },

    // ========== Кнопки ==========
    buttons: {
        backToMenu: 'Back to Main Menu',
        profile: 'My Profile',
        settings: 'Settings',
        toggleTheme: 'Toggle dark mode',
        generateReport: '📋 Generate Full Report',
        openDevPanel: '🔧 Open Developer Panel',
        exportProfile: '💾 Export Profile',
        saveProfileAs: '🗂️ Save Profile As...',
        importProfile: '📂 Import Profile',
        resetAll: '🔄 Reset All Traits',
        clearAll: 'Clear all selections and start over',
        close: 'Close',
        print: '🖨️ Print Report',
        cancel: 'Cancel',
        save: 'Save'
    },

    // ========== Настройки ==========
    settings: {
        appearance: 'Appearance',
        language: 'Language',
        traitAutoCollapse: 'Trait Auto-Collapse',
        traitAutoCollapseNever: 'Never Auto-Close',
        traitAutoCollapseOnOpen: 'Close When Opening Another Trait',
        traitAutoCollapseAfterSelection: 'Close After Selecting an Answer',
        engine: 'Engine',
        theme: 'Theme',
        themeEditor: 'Theme Editor',
        developer: 'Developer',
        storage: 'Storage',
        darkTheme: 'Dark Theme',
        showDevTools: 'Show Developer Tools',
        resetOnReload: 'Reset Data On Reload',
        background: 'Background',
        panelBackground: 'Panel Background',
        textColor: 'Text Color',
        textLight: 'Text Light',
        accentColor: 'Accent Color',
        borderColor: 'Border Color'
    },

    // ========== Панель результатов ==========
    scorePanel: {
        title: 'Live Type Scores',
        disclaimer: 'Historical anthropological group affinity scores (baseline: 0), using the highest subtype score within each group. Higher score = greater morphological alignment in this historical framework.',
        progressText: '{filled}/{total} traits · {percent}%',
        aboutScores: 'About Live Type Scores',
        completedTraits: 'Completed traits',
        generateReport: 'Generate Full Report',
        moreActions: 'More Actions',
        saveProfileAs: 'Save Profile As...',
        importProfile: 'Import Profile',
        exportProfile: 'Export Profile',
        developerPanel: 'Developer Panel',
        resetAll: 'Reset All Traits',
        closestLabel: 'Closest Historical Group',
        closestDefault: '—',
        secondaryDefault: 'Select traits to begin',
        importedBadge: '✓ Imported profile loaded',
        noTraitsSelected: 'No traits selected'
    },

    groups: {
        nordic: 'Nordic',
        slavic: 'Slavic',
        mediterranean: 'Mediterranean',
        eastBaltic: 'East Baltic',
        ladogan: 'Ladogan',
        alpine: 'Alpine',
        dinaric: 'Dinaric',
        nearEastern: 'Near Eastern',
        northCaucasian: 'North Caucasian',
        asian: 'Asian',
        african: 'African'
    },

    subtypes: {
        hallstatt: 'Hallstatt Nordic',
        eastNordic: 'East Nordic',
        tronder: 'Trønder',
        eastBaltic: 'East Baltic',
        ladogan: 'Ladogan',
        northernSlavic: 'Northern Slavic',
        centralSlavic: 'Central Slavic',
        ponticSlavic: 'Pontic Slavic',
        alpine: 'Alpine',
        dinaric: 'Dinaric',
        westernMediterranean: 'Western Mediterranean',
        centralMediterranean: 'Central Mediterranean',
        easternMediterranean: 'Eastern Mediterranean',
        southernMediterranean: 'Southern Mediterranean',
        levantine: 'Levantine',
        iranoAfghan: 'Irano-Afghan',
        armenoid: 'Armenoid',
        caucasion: 'Caucasion',
        caspian: 'Caspian',
        northAsian: 'North Asian',
        centralAsian: 'Central Asian',
        eastAsian: 'East Asian',
        malay: 'Malay',
        amerindian: 'Amerindian',
        subSaharan: 'Sub-Saharan',
        ethiopian: 'Ethiopian'
    },

    comparison: {
        selectBoth: 'Select both types to compare',
        selectDifferent: 'Select different types to compare',
        trait: 'Trait',
        difference: 'Difference',
        noData: 'No comparison data to export. Please select both types first.'
    },

    // ========== Признаки (trait cards) ==========
    traits: {
        commonOptions: {
            low: 'Low',
            average: 'Average',
            high: 'High',
            narrow: 'Narrow',
            broad: 'Broad',
            medium: 'Medium',
            moderate: 'Moderate',
            strong: 'Strong',
            absent: 'Absent',
            present: 'Present',
            straight: 'Straight',
            flat: 'Flat',
            rounded: 'Rounded',
            prominent: 'Prominent',
            thin: 'Thin',
            thick: 'Thick / Full',
            veryThick: 'Very Thick / Everted',
            fine: 'Fine / Narrow Tip',
            upturned: 'Upturned Tip',
            hooked: 'Hooked / Drooping Tip',
            bulbous: 'Bulbous / Rounded Tip',
            deepSet: 'Deep-set',
            shallow: 'Shallow',
            protruding: 'Protruding',
            projecting: 'Projecting',
            orthognathous: 'Orthognathous',
            mesognathous: 'Mesognathous',
            prognathous: 'Prognathous',
            veryShort: 'Very Short',
            short: 'Short',
            tall: 'Tall',
            veryTall: 'Very Tall'
            ,categorical: 'Categorical'
            ,height: 'Height'
            ,width: 'Width'
            ,slope: 'Slope'
            ,projection: 'Projection'
            ,cleft: 'Cleft'
            ,shape: 'Shape'
            ,density: 'Density'
            ,position: 'Position'
            ,size: 'Size'
            ,ear_lobe: 'Lobe Type'
            ,lobe: 'Lobe Type'
            ,helix: 'Helix Form'
            ,helix_form: 'Helix Form'
            ,monobrow: 'Monobrow'
        },
        eyeColor: {
            title: 'Eye Color',
            definition: 'Pigmentation of the iris, historically classified by the Martin-Schultz scale.',
            measurementNote: 'Select the dominant eye color.',
            options: {
                veryLightBlue: 'Very Light Blue',
                lightBlue: 'Light Blue',
                grey: 'Gray',
                greyGreen: 'Gray-Green',
                green: 'Green',
                hazel: 'Hazel',
                lightBrown: 'Light Brown',
                mediumBrown: 'Medium Brown',
                darkBrown: 'Dark Brown',
                blackBrown: 'Black-Brown'
            }
        },
        hairColor: {
            title: 'Hair Color',
            definition: 'Natural hair pigmentation, classified by the Fischer–Saller scale.',
            measurementNote: 'Select the closest match.',
            options: {
                veryLight: 'Very Light',
                lightBlonde: 'Light Blonde',
                mediumBlonde: 'Medium Blonde',
                darkBlonde: 'Dark Blonde',
                lightBrown: 'Light Brown',
                mediumBrown: 'Medium Brown',
                darkBrown: 'Dark Brown',
                veryDark: 'Very Dark',
                reddish: 'Reddish / Auburn'
            }
        },
        skinColor: {
            title: 'Skin Color',
            definition: 'Pigmentation of unexposed skin, assessed by the von Luschan chromatic scale.',
            measurementNote: 'Select the skin tone category.',
            options: {
                veryFair: 'Very Fair',
                fair: 'Fair',
                lightOlive: 'Light Olive',
                olive: 'Olive',
                darkOlive: 'Dark Olive',
                lightBrown: 'Light Brown',
                brown: 'Brown',
                darkBrown: 'Dark Brown',
                veryDark: 'Very Dark'
            }
        },
        cephalicIndex: {
            title: 'Cephalic Index',
            definition: 'Ratio of maximum head breadth to maximum head length (×100).',
            measurementNote: 'Enter measured values or select a category.',
            options: {
                dolicho: 'Dolichocephalic (<75)',
                meso: 'Mesocephalic (75–80)',
                brachy: 'Brachycephalic (80–85)',
                hyper: 'Hyperbrachycephalic (>85)'
            },
            inputs: {
                length: 'Head Length (mm)',
                breadth: 'Head Breadth (mm)'
            },
            calcLabel: 'Calculated CI: {value}'
        },
        nasalIndex: {
            title: 'Nasal Index',
            definition: 'Ratio of nasal breadth to nasal height (×100).',
            measurementNote: 'Enter measurements or select category.',
            options: {
                lepto: 'Leptorrhine (<70)',
                meso: 'Mesorrhine (70–85)',
                platyrrhine: 'Platyrrhine (>85)'
            },
            inputs: {
                height: 'Nasal Height (mm)',
                breadth: 'Nasal Breadth (mm)'
            },
            calcLabel: 'Calculated NI: {value}'
        },
        facialIndex: {
            title: 'Facial Index',
            definition: 'Ratio of morphological facial height to bizygomatic breadth (×100).',
            measurementNote: 'Enter measurements or select category.',
            options: {
                hyperEury: 'Hyper-euryprosopic (<78)',
                eury: 'Euryprosopic (78–84)',
                meso: 'Mesoprosopic (85–89)',
                lepto: 'Leptoprosopic (90–94)',
                hyperLepto: 'Hyper-leptoprosopic (>95)'
            },
            inputs: {
                height: 'Facial Height (mm)',
                breadth: 'Bizygomatic Breadth (mm)'
            },
            calcLabel: 'Calculated FI: {value}'
        },
        headShape: {
            title: 'Head Shape (lateral)',
            definition: 'Profile shape of the cranium as viewed from the side.',
            measurementNote: 'Select the best match.',
            options: {
                oval: 'Oval',
                ellipsoid: 'Ellipsoid',
                sphenoid: 'Sphenoid',
                pentagonoid: 'Pentagonoid'
            }
        },
        faceShape: {
            title: 'Face Shape (frontal)',
            definition: 'Outline of the face as viewed from the front.',
            measurementNote: 'Select the dominant shape.',
            options: {
                oval: 'Oval',
                round: 'Round',
                square: 'Square',
                rectangular: 'Rectangular',
                diamond: 'Diamond',
                heart: 'Heart'
            }
        },
        jawShape: {
            title: 'Jaw / Mandible Shape',
            definition: 'Morphology of the lower jaw, often used in racial classification.',
            measurementNote: 'Select the best description.',
            options: {
                narrow: 'Narrow / Parabolic',
                medium: 'Medium / U‑shaped',
                broad: 'Broad / Square'
            }
        },
        cheekbones: {
            title: 'Cheekbone (Zygomatic) Projection',
            definition: 'Degree of forward and lateral projection of the malar bones.',
            measurementNote: 'Select the most appropriate category.',
            options: {
                weak: 'Weak (flat)',
                moderate: 'Moderate',
                strong: 'Strong (prominent)'
            }
        },
        browRidge: {
            title: 'Supraorbital Ridge (Brow Ridge)',
            definition: 'Development of the bony ridge above the eye sockets.',
            measurementNote: 'Select the level of development.',
            options: {
                absent: 'Absent / Weak',
                moderate: 'Moderate',
                strong: 'Strong (prominent)'
            }
        },
        nasalProfile: {
            title: 'Nasal Profile (bridge)',
            definition: 'Shape of the nasal bridge in profile view.',
            measurementNote: 'Select the profile type.',
            options: {
                concave: 'Concave',
                straight: 'Straight',
                convex: 'Convex',
                wavy: 'Wavy / Undulating'
            }
        },
        lipThickness: {
            title: 'Lip Thickness',
            definition: 'Thickness of the lips, often used in morphotype classification.',
            measurementNote: 'Select the relative thickness.',
            options: {
                thin: 'Thin',
                medium: 'Medium',
                thick: 'Thick'
            }
        },
        earType: {
            title: 'Ear Form',
            definition: 'Shape and attachment of the external ear.',
            measurementNote: 'Select the best match.',
            options: {
                free: 'Free (protruding)',
                attached: 'Attached (closely set)',
                medium: 'Medium / Average'
            }
        },
        hairForm: {
            title: 'Hair Form',
            definition: 'Overall texture and curl pattern of the scalp hair.',
            measurementNote: 'Select the closest hair texture category.',
            options: {
                straight: 'Straight',
                wavy: 'Wavy',
                curly: 'Curly',
                tightlyCurled: 'Coily / Tightly Curled'
            }
        },
        epicanthus: {
            title: 'Epicanthus',
            definition: 'Presence and degree of the upper eyelid fold over the inner corner of the eye.',
            measurementNote: 'Select the degree of epicanthic fold.',
            options: {
                absent: 'Absent',
                slight: 'Slight / Vestigial',
                moderate: 'Moderate',
                strong: 'Strong / Pronounced'
            }
        },
        eyeShape: {
            title: 'Eye Shape',
            definition: 'Morphology of the palpebral fissure and eye opening.',
            measurementNote: 'Select the eye opening shape that best matches.',
            options: {
                round: 'Round',
                almond: 'Almond',
                horizontal: 'Horizontal / Narrow',
                upturned: 'Upturned',
                downturned: 'Downturned'
            }
        },
        innerCanthalDistance: {
            title: 'Inner Canthal Distance',
            definition: 'Distance between the inner corners of the eyes.',
            measurementNote: 'Choose the appropriate intercanthal width.',
            options: {
                narrow: 'Narrow',
                average: 'Average',
                wide: 'Wide'
            }
        },
        noseType: {
            title: 'Nose Type',
            definition: 'Morphological classification of the nose based on nasal proportion.',
            measurementNote: 'Select the nose type or enter measurements.',
            options: {
                leptorrhine: 'Leptorrhine',
                mesorrhine: 'Mesorrhine',
                platyrrhine: 'Platyrrhine'
            }
        },
        nasalProfile: {
            title: 'Nasal Profile',
            definition: 'Profile shape of the nasal bridge and dorsum.',
            measurementNote: 'Select the profile type.',
            options: {
                straight: 'Straight',
                concave: 'Concave',
                convex: 'Convex',
                wavy: 'Wavy / Irregular'
            }
        },
        forehead: {
            title: 'Forehead Morphology',
            definition: 'Morphology of the forehead in height, width, and slope.',
            measurementNote: 'Choose the most representative forehead profile.',
            options: {
                low: 'Low',
                average: 'Average',
                high: 'High',
                narrow: 'Narrow',
                broad: 'Broad',
                vertical: 'Vertical',
                moderate: 'Moderate Slope',
                sloping: 'Sloping'
            }
        },
        chin: {
            title: 'Chin Morphology',
            definition: 'Projection, width, and cleft of the chin.',
            measurementNote: 'Select the chin profile.',
            options: {
                weak: 'Weak / Receding',
                moderate: 'Moderate',
                strong: 'Strong / Projecting',
                absent: 'Absent',
                present: 'Present',
                narrow: 'Narrow',
                broad: 'Broad'
            }
        },
        eyebrows: {
            title: 'Eyebrow Characteristics',
            definition: 'Shape, density, position, and continuity of the eyebrows.',
            measurementNote: 'Select the closest eyebrow morphology.',
            options: {
                straight: 'Straight',
                arched: 'Arched',
                angled: 'Angled',
                sparse: 'Sparse',
                moderate: 'Moderate',
                dense: 'Dense / Bushy',
                low: 'Low',
                average: 'Average',
                high: 'High',
                absent: 'Absent',
                slight: 'Slight',
                strong: 'Strong / Complete'
            }
        },
        browRidges: {
            title: 'Brow Ridges',
            definition: 'Prominence of the supraorbital ridge above the eyes.',
            measurementNote: 'Select the ridge prominence.',
            options: {
                weak: 'Weak / Smooth',
                moderate: 'Moderate',
                strong: 'Strong / Pronounced',
                veryStrong: 'Very Strong / Heavy'
            }
        },
        ears: {
            title: 'Ear Morphology',
            definition: 'Size, projection, lobe form, and helix shape of the ears.',
            measurementNote: 'Select the ear morphology that best matches.',
            options: {
                small: 'Small',
                average: 'Average',
                large: 'Large',
                flat: 'Flat / Close to Head',
                protruding: 'Protruding',
                attached: 'Attached',
                free: 'Free / Pendulous',
                regular: 'Regular / Rolled',
                prominent: 'Prominent Antihelix'
            }
        },
        height: {
            title: 'Stature',
            definition: 'Overall adult body height and stature category.',
            measurementNote: 'Choose the height category most consistent with the individual.',
            options: {
                veryShort: 'Very Short',
                short: 'Short',
                average: 'Average',
                tall: 'Tall',
                veryTall: 'Very Tall'
            }
        },
        lipFullness: {
            title: 'Lip Fullness',
            definition: 'Relative fullness and projection of the lips.',
            measurementNote: 'Select the lip fullness category.',
            options: {
                thin: 'Thin',
                medium: 'Medium',
                full: 'Full',
                veryFull: 'Very Full'
            }
        },
        prognathism: {
            title: 'Prognathism',
            definition: 'Projection of the lower face and jaw relative to the upper face.',
            measurementNote: 'Select the degree of facial projection.',
            options: {
                recessive: 'Recessive',
                moderate: 'Moderate',
                prominent: 'Prominent'
            }
        },
        occipitalContour: {
            title: 'Occipital Contour',
            definition: 'Shape of the posterior skull contour in the occipital region.',
            measurementNote: 'Select the posterior skull contour.',
            options: {
                rounded: 'Rounded',
                flat: 'Flat',
                prominent: 'Prominent'
            }
        },
        eyeDepth: {
            title: 'Eye Depth',
            definition: 'Degree of orbital depth and eye socket projection.',
            measurementNote: 'Select the orbital depth category.',
            options: {
                shallow: 'Shallow',
                moderate: 'Moderate',
                deep: 'Deep'
            }
        },
        nasalBridgeHeight: {
            title: 'Nasal Bridge Height',
            definition: 'Relative height of the nasal bridge.',
            measurementNote: 'Select the bridge height category.',
            options: {
                low: 'Low',
                medium: 'Medium',
                high: 'High'
            }
        },
        facialIndex: {
            title: 'Facial Index',
            definition: 'Facial height relative to facial width.',
            measurementNote: 'Choose the facial index category.',
            options: {
                hyperEury: 'Hyper-euryprosopic',
                eury: 'Euryprosopic',
                meso: 'Mesoprosopic',
                lepto: 'Leptoprosopic',
                hyperLepto: 'Hyper-leptoprosopic'
            }
        },
        orbitalIndex: {
            title: 'Orbital Index',
            definition: 'Relative orbital height-to-width ratio.',
            measurementNote: 'Select the orbital index category.',
            options: {
                narrow: 'Narrow',
                average: 'Average',
                broad: 'Broad'
            }
        },
        nasalTipMorphology: {
            title: 'Nasal Tip Morphology',
            definition: 'Shape and projection of the nasal tip.',
            measurementNote: 'Select the nasal tip morphology.',
            options: {
                bulbous: 'Bulbous',
                rounded: 'Rounded',
                pointed: 'Pointed',
                hooked: 'Hooked'
            }
        }
    },

    traitsLabels: {
        none: 'None',
        pigmentation: 'Pigmentation',
        morphological: 'Morphological',
        completed: 'Completed',
        missing: 'Missing',
        definition: 'Definition:',
        measurement: 'Measurement:',
        unit: 'Unit:'
    },

    // ========== Пресеты (типы) ==========
    presets: {
        nordic: 'Nordic',
        eastBaltic: 'East Baltic',
        slavic: 'Slavic',
        alpine: 'Alpine',
        dinaric: 'Dinaric',
        mediterranean: 'Mediterranean',
        nearEastern: 'Near Eastern',
        eastAsian: 'East Asian',
        mongolian: 'Mongolian',
        malay: 'Malay',
        ethiopian: 'Ethiopian',
        subSaharan: 'Sub‑Saharan African',
        amerindian: 'Amerindian',
        ladogan: 'Ladogan',
        caucasion: 'Caucasion',
        caspian: 'Caspian'
    },

    // ========== Типы (названия) ==========
    types: {
        nordic: 'Nordic',
        eastBaltic: 'East Baltic',
        slavic: 'Slavic',
        alpine: 'Alpine',
        dinaric: 'Dinaric',
        mediterranean: 'Mediterranean',
        nearEastern: 'Near Eastern',
        eastAsian: 'East Asian',
        mongolian: 'Mongolian',
        malay: 'Malay',
        ethiopian: 'Ethiopian',
        subSaharan: 'Sub‑Saharan African',
        amerindian: 'Amerindian',
        ladogan: 'Ladogan',
        caucasion: 'Caucasion',
        caspian: 'Caspian'
    },

    // ========== Отчёт ==========
    report: {
        title: '📋 Anthropometric Reconstruction Report',
        disclaimer: 'This report is generated for historical and educational purposes only. It does not represent modern genetics, ancestry, or biological race.',
        generated: 'Report generated on {date}',
        summary: 'Summary of Type Scores',
        closestType: 'Closest Matching Type',
        scoreBreakdown: 'Detailed Score Breakdown',
        traitContributions: 'Trait Contributions (for top type)',
        positiveContrib: 'Positive contributions',
        negativeContrib: 'Negative contributions',
        noData: 'No traits selected. Please fill in at least one trait to generate a report.',
        print: '🖨️ Print Report',
        close: 'Close'
    },

    // ========== Инструменты разработчика ==========
    devTools: {
        sectionTitle: '🔧 DEVELOPER TOOLS',
        tabComparison: 'Trait Comparison',
        tabDiagnostics: 'Trait Diagnostics',
        tabAdvisor: 'Missing Trait Advisor',
        comparison: {
            title: '⚖️ Compare Types',
            typeA: 'Type A:',
            typeB: 'Type B:',
            outputPlaceholder: 'Select two types to compare their trait profiles.',
            exportPng: '📥 Export as PNG',
            exportJpg: '📥 Export as JPG'
        },
        diagnostics: {
            title: '🔬 Trait Diagnostics',
            modeLabel: 'Diagnostics Mode:',
            modeTrait: 'Traits',
            modeRule: 'Rules',
            selectTrait: 'Select Trait to Inspect:',
            outputPlaceholder: 'Select a trait to see its internal rules and weights.',
            exportPng: '📥 Export as PNG',
            exportJpg: '📥 Export as JPG'
        },
        advisor: {
            title: '💡 Missing Trait Advisor',
            description: 'Identify which unfilled traits would most improve classification accuracy.',
            outputPlaceholder: 'No missing traits or all traits filled.'
        }
    },

    // ========== Общие слова ==========
    common: {
        loading: 'Loading...',
        error: 'An error occurred.',
        success: 'Success!',
        warning: 'Warning',
        info: 'Info',
        yes: 'Yes',
        no: 'No',
        apply: 'Apply',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        reset: 'Reset',
        default: 'Default',
        optional: 'Optional',
        required: 'Required',
        select: '-- Select --',
        none: 'None',
        all: 'All',
        from: 'from',
        to: 'to',
        of: 'of',
        and: 'and',
        or: 'or'
    },

    // ========== Баннеры и модалки ==========
    modals: {
        saveProfileAs: {
            title: 'Save Profile As...',
            description: 'Enter a profile name. It will be saved to My Profile as <strong>[name].json</strong>.',
            placeholder: 'Profile name',
            errorEmpty: 'Please enter a profile name.',
            success: '✓ Profile saved to My Profile as {name}.json'
        }
    }
};
