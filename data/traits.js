// Initialize scores (baseline 0 for all types)
        let scores = {};
        SUBTYPE_KEYS.forEach(k => { scores[k] = 0; });

        // Store all user selections for report generation
        let userSelections = {};
        let userSubSelections = {};
        let userMeasurements = {};

        // ============================================================
        // TRAIT DEFINITIONS DATABASE
        // ============================================================
        const traits = [{
            id: 'eyeColor',
            number: 1,
            weightClass: 'A-',
            title: 'Eye Color',
            definition: 'Classification of iris pigmentation based on visual comparison against standardized chromatic scales (e.g., Martin–Schultz scale).',
            measurement: 'Visual comparison under natural daylight conditions.',
            unit: 'Categorical (chromatic grade)',
            guideImage: 'eye-color.png',
            imageLicense: {
    author: "No changes",
    authors: "https://en.wikipedia.org/w/index.php?title=Martin%E2%80%93Schultz_scale&action=history",
    source: "Wikipedia contributors",
    retrievedFrom: "Martin–Schultz scale",
    license: "CC BY-SA 4.0, GFDL",
    url: "https://en.wikipedia.org/wiki/Martin%E2%80%93Schultz_scale"
},
            type: 'select',
            options: [
                { value: '', label: '— Select Eye Color —', contributions: {} },
                { value: 'veryLightBlue', label: 'Very Light Blue (Martin 1)', 
                    contributions: {
                                caucasion: -7,
                                caspian: -7, 
                        hallstatt: 8,eastNordic: +5,tronder: +3, 
                        
                                ladogan: +5, 
                        northernSlavic: +4, centralSlavic: +2, ponticSlavic: -2, 
                        
                                eastBaltic: +3, 
                        
                                alpine: -2,
                        
                                dinaric: -1,
                        westernMediterranean: -4, centralMediterranean: -5, easternMediterranean: -6, southernMediterranean: -7,
                        levantine: -6,iranoAfghan: -7, armenoid: -7,
                        
                                northAsian: -5, centralAsian: -5,
                                eastAsian: -5, 
                                malay: -4, 
                                amerindian: -3,
                        
                                ethiopian: -6,
                        
                                subSaharan: -7,    },

                        positiveSynergy: { hallstatt: 0.20 },

                },
                { value: 'lightBlue', label: 'Light Blue (Martin 2-3)',
                    contributions: {
                                caucasion: -4,
                                caspian: -3.5, hallstatt: 7,eastNordic: +6,tronder: +4, 
                        
                                ladogan: +5, 
                        northernSlavic: +4, centralSlavic: +3, ponticSlavic: -1, 
                        
                                eastBaltic: +4,
                        westernMediterranean: -3, centralMediterranean: -4, easternMediterranean: -5, southernMediterranean: -6,
                        levantine: -5,iranoAfghan: -5, armenoid: -6,
                        
                                northAsian: -5, centralAsian: -5,
                                eastAsian: -5, 
                                malay: -3, 
                                amerindian: -2,
                        
                                ethiopian: -4,
                                subSaharan: -5, 
                        
                                alpine: -1, 
                                dinaric: 0 } },
                { value: 'grey', label: 'Grey (Martin 4)',
                    contributions: {
                                caucasion: -1,
                                caspian: 0, hallstatt: +3,eastNordic: +4,tronder: +3, 
                        
                                ladogan: +5, 
                        northernSlavic: +5, centralSlavic: +3, ponticSlavic: +1, 
                        
                                eastBaltic: +5.5,
                        westernMediterranean: -2, centralMediterranean: -3, easternMediterranean: -4, southernMediterranean: -5,
                        levantine: -3,iranoAfghan: -4, armenoid: -4,
                        
                                northAsian: -3, centralAsian: -2,
                                eastAsian: -3, 
                                malay: -2, 
                                amerindian: -1,
                        
                                ethiopian: -4,
                                subSaharan: -5, 
                        
                                alpine: 0, 
                                dinaric: 0 } },
                { value: 'greyGreen', label: 'Grey-Green (Martin 5-6)',
                    contributions: {
                                caucasion: 0,
                                caspian: 2, hallstatt: +2,eastNordic: +3,tronder: +2, 
                        
                                ladogan: +3, 
                        northernSlavic: +3, centralSlavic: +4, ponticSlavic: +3, 
                        
                                eastBaltic: +2,
                        westernMediterranean: +1, centralMediterranean: 0, easternMediterranean: -1, southernMediterranean: -2,
                        levantine: 0,iranoAfghan: -1, armenoid: -1,
                        
                                northAsian: -2, centralAsian: -1,
                                eastAsian: -2, 
                                malay: -1, 
                                amerindian: -1,
                        
                                ethiopian: -4,
                                subSaharan: -5, 
                        
                                alpine: +3, 
                                dinaric: +2 } },
                { value: 'green', label: 'Green (Martin 7-8)',
                    contributions: {
                                caucasion: 1,
                                caspian: 2, hallstatt: 0,eastNordic: +1,tronder: +2, 
                        
                                ladogan: +1, 
                        northernSlavic: +2, centralSlavic: +3, ponticSlavic: +3, 
                        
                                eastBaltic: 0,
                        westernMediterranean: +2, centralMediterranean: +2, easternMediterranean: +1, southernMediterranean: 0,
                        levantine: +1,iranoAfghan: 0, armenoid: +1,
                        
                                northAsian: -1, centralAsian: 0,
                                eastAsian: -2, 
                                malay: 0, 
                                amerindian: 0,
                        
                                ethiopian: -1,
                                subSaharan: -3, 
                        
                                alpine: +3, 
                                dinaric: +2 } },
                { value: 'hazel', label: 'Hazel (Martin 9-10)',
                    contributions: {
                                caucasion: 1.5,
                                caspian: 2.5,   
                                nordic: -2, 
                                ladogan: -1, 
                                eastBaltic: 0, 
                        northernSlavic: -1, centralSlavic: 0.5, ponticSlavic: +1,
                        
                                alpine: +1,
                        westernMediterranean: +3, centralMediterranean: +4, easternMediterranean: +3, southernMediterranean: +2,
                        
                                nearEastern: +2, 
                                dinaric: +2, 
                                eastAsian: -1, 
                                northAsian: 0,
                        
                                malay: +1, 
                                ethiopian: +1, 
                                subSaharan: 0, 
                                amerindian: +1 } },
                { value: 'lightBrown', label: 'Light Brown (Martin 11)',
                    contributions: {
                                caucasion: 4,
                                caspian: 4,   
                                nordic: -4, 
                                ladogan: -3, 
                                eastBaltic: -2, 
                        northernSlavic: -1, centralSlavic: 0, ponticSlavic: +1, 
                        
                                alpine: 0,
                        westernMediterranean: +4, centralMediterranean: +5, easternMediterranean: +4, southernMediterranean: +3,
                        levantine: +4,iranoAfghan: +5, armenoid: +4,
                        
                                dinaric: +2, 
                        
                                northAsian: +1, centralAsian: +2,
                                eastAsian: +1, 
                                malay: +2, 
                                amerindian: +2,
                        
                                ethiopian: +2, 
                                subSaharan: +1,} },
                { value: 'mediumBrown', label: 'Medium Brown (Martin 12-13)',
                    contributions: {
                                caucasion: 5,
                                caspian: 4,   
                                nordic: -6, 
                                ladogan: -5, 
                                eastBaltic: -4, 
                        northernSlavic: -1, centralSlavic: -1, ponticSlavic: +1,
                        
                                alpine: -1,
                        
                                mediterranean: +2, 
                                nearEastern: +4, 
                                dinaric: +1, 
                                eastAsian: +2, 
                                northAsian: +3,
                        
                                malay: +3, 
                                ethiopian: +4, 
                                subSaharan: +3, 
                                amerindian: +4 } },
                { value: 'darkBrown', label: 'Dark Brown (Martin 14-15)',
                    contributions: {
                                caucasion: 5,
                                caspian: 4,   
                                nordic: -8, 
                                ladogan: -7, 
                                eastBaltic: -6, 
                        northernSlavic: -3, centralSlavic: -2, ponticSlavic: 0,
                        
                                alpine: -3,
                        westernMediterranean: +1, centralMediterranean: +2, easternMediterranean: +5, southernMediterranean: +6,
                        levantine: +6,iranoAfghan: +6, armenoid: +5,
                        
                                dinaric: -2, 
                        
                                northAsian: +3, centralAsian: +4,
                                eastAsian: +3, 
                                malay: +4, 
                                amerindian: +3,
                        
                                ethiopian: +4.5, 
                                subSaharan: +4,} },
                { value: 'blackBrown', label: 'Black-Brown (Martin 16)',
                    contributions: {
                                caucasion: 5,
                                caspian: 4,   
                                nordic: -9, 
                                ladogan: -8, 
                                eastBaltic: -7, 
                                slavic: -5, 
                                alpine: -4,
                        
                                mediterranean: -5, 
                        levantine: -2,iranoAfghan: -1, armenoid: 1,
                        
                                dinaric: -4, 
                        
                                northAsian: +5, centralAsian: +4, 
                                eastAsian: +5, 
                                malay: +4, 
                                amerindian: +3,
                        
                                ethiopian: +8, 
                                subSaharan: +8, },
                    balanceSynergy: { eastAsian: 0.10, subSaharan: 0.10, amerindian: 0.10 } }
            ]
        }, {
            id: 'hairColor',
            number: 2,
            weightClass: 'A-',
            title: 'Hair Color',
            definition: 'Pigmentation of scalp hair classified via the Fischer–Saller scale, ranging from platinum blonde to black.',
            measurement: 'Visual comparison against standardized hair color charts.',
            unit: 'Categorical (Fischer–Saller grade)',
            guideImage: 'hair-color.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
            type: 'select',
            options: [
                { value: '', label: '— Select Hair Color —', contributions: {} },
                { value: 'platinumBlonde', label: 'Platinum Blonde (F–S A)',
                    contributions: {
                                caucasion: -6,
                                caspian: -6, 
                        hallstatt: +9,eastNordic: +6,tronder: +2,
                        
                                ladogan: +6,
                        
                                eastBaltic: +4, 
                        northernSlavic: +2,
                        centralSlavic: +1,
                        ponticSlavic: -6,
                        
                                alpine: -1,
                        westernMediterranean: -5,
                        centralMediterranean: -6,
                        easternMediterranean: -7,
                        southernMediterranean: -8,
                        levantine: -7,
                        iranoAfghan: -7,
                        armenoid: -8,
                        
                                northAsian: -5,
                        centralAsian: -4,
                        
                                eastAsian: -6,
                        
                                malay: -5,
                        
                                amerindian: -4,
                        
                                ethiopian: -6, 
                                subSaharan: -7, 
                        
                                dinaric: -3 },
                    positiveSynergy: { hallstatt: 0.20 } },
                { value: 'lightBlonde', label: 'Light Blonde (F–S B–C)',
                    contributions: {
                                caucasion: -4,
                                caspian: -3, 
                        hallstatt: +7,
                        eastNordic: +7,
                        tronder: +4,
                        
                                ladogan: +5, 
                                eastBaltic: +5, 
                        northernSlavic: +4,
                        centralSlavic: +3,
                        ponticSlavic: -2,
                        
                                alpine: 0,
                        westernMediterranean: -4,
                        centralMediterranean: -5,
                        easternMediterranean: -6,
                        southernMediterranean: -7,
                        levantine: -5,
                        iranoAfghan: -5,
                        armenoid: -6,
                        
                                northAsian: -4,
                        centralAsian: -3,
                        
                                eastAsian: -5,
                        
                                malay: -4,
                        
                                amerindian: -3,
                        
                                ethiopian: -5, 
                                subSaharan: -6, 
                        
                                dinaric: -2 } },
                { value: 'goldenBlonde', label: 'Golden Blonde (F–S D)',
                    contributions: {
                                caucasion: 0,
                                caspian: 0.5, 
                        hallstatt: +6,
                        eastNordic: +4,
                        tronder: +7,

                        
                                ladogan: +4, 
                        
                                eastBaltic: +3, 

                        northernSlavic: +3,
                        centralSlavic: +2,
                        ponticSlavic: -2,
        
                        
                                alpine: +1,
                        westernMediterranean: -2,
                        centralMediterranean: -3,
                        easternMediterranean: -4,
                        southernMediterranean: -5,
                        
                        levantine: -2,
                        iranoAfghan: -2,
                        armenoid: -2,
                        
                        
                                northAsian: -3,
                        centralAsian: -2,
                        
                                eastAsian: -4,

                        
                                malay: -3,
                        
                                amerindian: -2,
                        
                        
                                ethiopian: -4, 
                                subSaharan: -5, 
                        
                                dinaric: 0 } },
                { value: 'darkBlonde', label: 'Dark Blonde (F–S E–F)',
                    contributions: {
                                caucasion: 1,
                                caspian: 2, 
                        hallstatt: +3,
                        eastNordic: +4,
                        tronder: +3,

                        
                                ladogan: +2, 
                        
                                eastBaltic: +3, 
                        northernSlavic: +4,
                        centralSlavic: +4,
                        ponticSlavic: +2,
                        
                        
                                alpine: +2,
                        westernMediterranean: 0,
                        centralMediterranean: -1,
                        easternMediterranean: -2,
                        southernMediterranean: -3,
                        
                        levantine: 0,
                        iranoAfghan: +1,
                        armenoid: 0,
                        
                        
                                northAsian: -1,
                        centralAsian: 0,
                        
                                eastAsian: -2,
                        
                        
                                malay: -1,
                        
                                amerindian: 0,
                        
                        
                                ethiopian: -2, 
                                subSaharan: -3, 
                        
                                dinaric: +2 } },
                { value: 'lightBrown', label: 'Light Brown (F–S G–H)',
                    contributions: {
                                caucasion: 3,
                                caspian: 3,
                        hallstatt: -1,
                        eastNordic: 0,
                        tronder: 1,

                        
                                ladogan: 0,
                        
                                eastBaltic: 0, 
                        northernSlavic: +2,
                        centralSlavic: +3,
                        ponticSlavic: +4,
                        
                        
                                alpine: +3,
                        westernMediterranean: +3,
                        centralMediterranean: +4,
                        easternMediterranean: +3,
                        southernMediterranean: +2,
                        
                        levantine: +2,
                        iranoAfghan: +3,
                        armenoid: +2,
                        
                        
                                northAsian: 0,
                        centralAsian: +1,
                        
                                eastAsian: 0,

                        
                                malay: +1,
                        
                                amerindian: +1,

                        
                                ethiopian: 0,
                        
                                subSaharan: -1,
                        
                                dinaric: +2 } },
                { value: 'brown', label: 'Brown (F–S I–K)',
                    contributions: {
                                caucasion: 4,
                                caspian: 4,
                          
                                nordic: -4, 
                        
                                ladogan: -2, 
                        
                                eastBaltic: -1, 
                        northernSlavic: -0.5,
                        centralSlavic: 0,
                        ponticSlavic: 1,
                        
                                alpine: +1,
                        westernMediterranean: +5,
                        centralMediterranean: +6,
                        easternMediterranean: +5,
                        southernMediterranean: +4,
                        levantine: +4,
                        iranoAfghan: +4,
                        armenoid: +3,
                        
                                northAsian: +1,
                        centralAsian: +1,
                        
                                eastAsian: +1,
                        
                                malay: +3,
                                amerindian: +2, 
                        
                                ethiopian: +2, 
                                subSaharan: +1, 
                        
                                dinaric: +3 } },
                { value: 'darkBrown', label: 'Dark Brown (F–S L–M)',
                    contributions: {
                                caucasion: 5,
                                caspian: 4, 
                          
                                nordic: -7, 
                        
                                ladogan: -5, 
                        
                                eastBaltic: -3, 
                        northernSlavic: -3,
                        centralSlavic: -2,
                        ponticSlavic: 0,
                        
                                alpine: -1,
                        westernMediterranean: +2,
                        centralMediterranean: +3,
                        easternMediterranean: +5,
                        southernMediterranean: +6,
                        
                        levantine: +5,
                        iranoAfghan: +4,
                        armenoid: +4,

                        
                                northAsian: +3,
                        centralAsian: +4,
                        
                                eastAsian: +3,
                        
                                malay: +4,
                        
                                amerindian: +3,
                        
                                ethiopian: +4, 
                        
                                subSaharan: +4, 
                        
                                dinaric: +4 },
                        
                        balanceSynergy: {
                                                eastAsian: -0.02,
                                                northAsian: -0.02,
                                                malay: -0.02,
                                                amerindian: -0.02,
                                                centralAsian: -0.02
                                        },
negativeSynergy: {
                                                eastAsian: -0.02,
                                                northAsian: -0.02,
                                                malay: -0.02,
                                                amerindian: -0.02,
                                                centralAsian: -0.02
                    }
                },
                { value: 'black', label: 'Black (F–S N–P)',
                    contributions: {
                                caucasion: 5,
                                caspian: 4,   
                                nordic: -9, 
                                ladogan: -7, 
                                eastBaltic: -5, 
                                slavic: -5, 
                                alpine: -3,
                        westernMediterranean: -3,
                        centralMediterranean: -2,
                        easternMediterranean: 0,
                        southernMediterranean: +1,
                        levantine: +3,
                        iranoAfghan: +2,
                        armenoid: +2,
                        
                                northAsian: +4,
                        centralAsian: +4,
                        
                                eastAsian: +5,
                        
                                malay: +4,
                        
                                amerindian: +4,
                        
                                ethiopian: +5, 
                                subSaharan: +6, 
                                dinaric: -2 },
                        
                        balanceSynergy: {
                                                eastAsian: -0.05,
                                                northAsian: -0.05,
                                                malay: -0.05,
                                                amerindian: -0.05,
                                                centralAsian: -0.05
                                        },
negativeSynergy: {
                                                eastAsian: -0.05,
                                                northAsian: -0.05,
                                                malay: -0.05,
                                                amerindian: -0.05,
                                                centralAsian: -0.05
                    }  },
                { value: 'red', label: 'Red (F–S R)',
                    contributions: {
                                caucasion: 0,
                                caspian: 1, 
                        hallstatt: +3,
                        eastNordic: +1,
                        tronder: +4,
                        
                                ladogan: +2, 
                                eastBaltic: +1, 
                        northernSlavic: +2,
                        centralSlavic: +1,
                        ponticSlavic: -1,
                        
                                alpine: 0,
                        
                                mediterranean: 0, 
                                nearEastern: -1, 
                                eastAsian: -6, 
                                northAsian: -5, 
                                malay: -5,
                        
                                ethiopian: -5, 
                                subSaharan: -6, 
                                amerindian: -4, 
                                dinaric: 0 },
                    positiveSynergy: { tronder: 0.15 },
                    negativeSynergy: { subSaharan: 0.15 } }
            ]
        }, {
            id: 'hairForm',
            number: 3,
            weightClass: 'B+',
            title: 'Hair Form',
            definition: 'Morphology of the hair shaft cross-section and its macroscopic curl pattern.',
            measurement: 'Visual assessment of curl pattern and shaft morphology.',
            unit: 'Categorical',
            guideImage: 'hair-form.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
            type: 'select',
            options: [
                { value: '', label: '— Select Hair Form —', contributions: {} },
                { value: 'straight', label: 'Straight',
                    contributions: {
                                caucasion: 1,
                                caspian: 2, 
                        hallstatt: +3,
                        eastNordic: +2,
                        tronder: +1,
                        
                                ladogan: +1, 
                                eastBaltic: +1, 
                        northernSlavic: +2,
                        centralSlavic: +2,
                        ponticSlavic: +1,
                        
                                alpine: +1,
                        westernMediterranean: -1,
                        centralMediterranean: -2,
                        easternMediterranean: -2,
                        southernMediterranean: -2,
 
                        levantine: -1,
                        iranoAfghan: -1,
                        armenoid: -2,
                        
                        
                                northAsian: +3,
                        centralAsian: +2,
                        
                                eastAsian: +4,

                        
                                malay: +3,
                        
                                amerindian: +3,
                        
                        
                                ethiopian: -3, 
                                subSaharan: -5, 
                                dinaric: 0 } },
                { value: 'wavy', label: 'Wavy',
                    contributions: {
                                caucasion: 2,
                                caspian: 3, 
                        hallstatt: +2,
                        eastNordic: +2,
                        tronder: +3,

                        
                                ladogan: +2, 
                                eastBaltic: +1, 
                        northernSlavic: +3,
                        centralSlavic: +3,
                        ponticSlavic: +3,
                        
                        
                                alpine: +2,
                        westernMediterranean: +3,
                        centralMediterranean: +4,
                        easternMediterranean: +3,
                        southernMediterranean: +2,
                        
                        levantine: +2,
                        iranoAfghan: +2,
                        armenoid: +2,
                        
                        
                                northAsian: -2,
                        centralAsian: -1,
                        
                                eastAsian: -2,

                        
                                malay: +1,
                        
                                amerindian: -1,
                        
                        
                                ethiopian: 0, 
                                subSaharan: -3, 
                                dinaric: +2 } },
                { value: 'curly', label: 'Curly',
                    contributions: {
                                caucasion: 2,
                                caspian: 1, 
                        hallstatt: -1,
                        eastNordic: -1,
                        tronder: 0,
                        
                                ladogan: 0, 
                                eastBaltic: 0, 
                        northernSlavic: -1,
                        centralSlavic: -0.5,
                        ponticSlavic: 0,
                        
                        
                                alpine: -1,
                        westernMediterranean: +3,
                        centralMediterranean: +4,
                        easternMediterranean: +4,
                        southernMediterranean: +4,
                        
                        levantine: +4,
                        iranoAfghan: +3,
                        armenoid: +3,
                        
                        
                                northAsian: -4,
                        centralAsian: -2,
                        
                                eastAsian: -5,

                        
                                malay: 0,
                        
                                amerindian: -3,
                        
                        
                                ethiopian: +3.5, 
                                subSaharan: +6, 
                                dinaric: +1 } },
                { value: 'tightlyCurled', label: 'Coily/Tightly Curled',
                    contributions: {
                                caucasion: -1,
                                caspian: -2, 
                        hallstatt: -4,
                        eastNordic: -4,
                        tronder: -4,


                        
                                ladogan: -3, 
                                eastBaltic: -3, 
                        northernSlavic: -4,
                        centralSlavic: -4,
                        ponticSlavic: -3,
                        
                        
                                alpine: -3,
                        westernMediterranean: -2,
                        centralMediterranean: -2,
                        easternMediterranean: -1,
                        southernMediterranean: -1,
 
                        levantine: -1,
                        iranoAfghan: -1,
                        armenoid: -1,
                        
                                northAsian: -7,
                        centralAsian: -6,
                        
                                eastAsian: -8,

                        
                                malay: -3,
                        
                                amerindian: -6,

                        
                                ethiopian: +7, 
                                subSaharan: +9, 
                                dinaric: -2 },
                    positiveSynergy: { subSaharan: 0.20 },
                    negativeSynergy: { nordic: 0.15 } }
            ]
        }, {
            id: 'skinColor',
            number: 4,
            weightClass: 'B+',
            title: 'Skin Color',
            definition: 'Integumentary pigmentation classified via the Fitzpatrick scale and the von Luschan chromatic scale.',
            measurement: 'Visual comparison on the inner upper arm or unexposed area.',
            unit: 'Fitzpatrick Type / von Luschan grade',
            guideImage: 'skin-type.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
            type: 'select',
            options: [
                { value: '', label: '— Select Skin Color —', contributions: {} },
                { value: 'typeI', label: 'Type I — Very Fair (von Luschan 1–5)', 
                    contributions: {
                                caucasion: -4,
                                caspian: -4, 
                        hallstatt: +9,
                        eastNordic: +8,
                        tronder: +6,

                        
                                ladogan: +7, 
                                eastBaltic: +5, 
                        northernSlavic: +4,
                        centralSlavic: +3,
                        ponticSlavic: +1,

 
                        
                                alpine: -1,
                        westernMediterranean: -4,
                        centralMediterranean: -5,
                        easternMediterranean: -6,
                        southernMediterranean: -7,
                        
                        levantine: -6,
                        iranoAfghan: -6,
                        armenoid: -5,
                        
                                northAsian: -5,
                        centralAsian: -4,
                        
                                eastAsian: -6,

                        
                                malay: -6,
                        
                                amerindian: -4,
                        
                        
                                ethiopian: -7, 
                                subSaharan: -10, 
                                dinaric: -2 },
                        negativeSynergy: {
                        african: 0.5,
                        nearEastern: 0.15,
                        asian: 0.15,
                        southernMediterranean: 0.10,
                        },
                balanceSynergy: {
                                         african: 0.45,
                                         iranoAfghan: 0.15,
                                         nearEastern: 0.15,
                                         asian: 0.15,
                                         southernMediterranean: 0.10,
                                  },
                        },
                { value: 'typeII', label: 'Type II — Fair (von Luschan 6–10)',
                    contributions: {
                                caucasion: 2,
                                caspian: 2, 
                        hallstatt: +6,
                        eastNordic: +6,
                        tronder: +6,

                        
                                ladogan: +5, 
                                eastBaltic: +4, 
                        northernSlavic: +5,
                        centralSlavic: +4,
                        ponticSlavic: +4,

                        
                                alpine: +2,
                        westernMediterranean: -1,
                        centralMediterranean: -2,
                        easternMediterranean: -3,
                        southernMediterranean: -4,
 
                        levantine: -3.5,
                        iranoAfghan: -3.5,
                        armenoid: -2,
                        
                        
                                northAsian: -3,
                        centralAsian: -2,
                        
                                eastAsian: -3,

                        
                                malay: -3,
                        
                                amerindian: -2,
                        
                        
                                ethiopian: -7, 
                                subSaharan: -9, 
                                dinaric: +3 },
                        negativeSynergy: {
                        african: 0.45,
                        nearEastern: 0.10,
                        amerindian: 0.05,
                        malay: 0.05,
                        eastAsian: 0.05,
                        northAsian: 0.05,
                        centralAsian: 0.05,
                        },
                        balanceSynergy: {
                                         african: 0.25,
                                         levantine: 0.10,
                                         iranoAfghan: 0.05,
                                         armenoid: 0.05,
                                         amerindian: 0.05,
                                         eastAsian: 0.05,
                                         northAsian: 0.05,
                                         centralAsian: 0.05,
                                         malay: 0.05,
                                         southernMediterranean: 0.05,
                                  },
                 },
                { value: 'typeIII', label: 'Type III — Medium Fair (von Luschan 11–15)',
                    contributions: {
                                caucasion: 3,
                                caspian: 3, 
                        hallstatt: -0.5,
                        eastNordic: 0,
                        tronder: +1,

                        
                                ladogan: +1, 
                        
                                eastBaltic: +1, 
                        northernSlavic: +1,
                        centralSlavic: +2.25,
                        ponticSlavic: +3.75,
                        
                        
                                alpine: +3,
                        westernMediterranean: +4,
                        centralMediterranean: +5,
                        easternMediterranean: +4,
                        southernMediterranean: +3,
 
                        levantine: +3,
                        iranoAfghan: +4,
                        armenoid: +3,
                        
                        
                                northAsian: 0,
                        centralAsian: +1,
                        
                                eastAsian: 0,

                        
                                malay: +1,
                        
                                amerindian: +1,
                        
                                ethiopian: -1, 
                                subSaharan: -4, 
                                dinaric: +3 },
                    balanceSynergy: { mediterranean: 0.10, nearEastern: 0.10 } },
                { value: 'typeIV', label: 'Type IV — Olive/Moderate (von Luschan 16–21)',
                    contributions: {
                                caucasion: 3,
                                caspian: 3, 
                        hallstatt: -4,
                        eastNordic: -4,
                        tronder: -3,

                        
                                ladogan: -3, 
                                eastBaltic: -2, 
                        northernSlavic: -1,
                        centralSlavic: -0.5,
                        ponticSlavic: +1,
 
                        
                                alpine: +1,
                        westernMediterranean: +5,
                        centralMediterranean: +6,
                        easternMediterranean: +7,
                        southernMediterranean: +7,
 
                        levantine: +6,
                        iranoAfghan: +6,
                        armenoid: +6,
                        
                        
                                northAsian: +2,
                        centralAsian: +3,
                        
                                eastAsian: +2,

                        
                                malay: +4,
                        
                                amerindian: +3,
                        
                        
                                ethiopian: +3, 
                                subSaharan: -1, 
                                dinaric: +4 },
                        negativeSynergy: {
                        nordic: 0.3,
                        northernSlavic: 0.25,
                        centralSlavic: 0.15,
                        eastBaltic: 0.25,
                        ladogan: 0.25,
                        dinaric: 0.25,
                        alpine: 0.25,
                    },
                    balanceSynergy: {
                        nordic: 0.10,
                        northernSlavic: 0.10,
                        centralSlavic: 0.05,
                        eastBaltic: 0.05,
                        ladogan: 0.05,
                    },
                        
                        
                        
                        },
                { value: 'typeV', label: 'Type V — Brown (von Luschan 22–28)',
                    contributions: {
                                caucasion: 1,
                                caspian: 0,   
                                nordic: -8, 
                        
                                ladogan: -6, 
                        
                                eastBaltic: -5, 
                        northernSlavic: -5,
                        centralSlavic: -5,
                        ponticSlavic: -4,
                        
                        
                                alpine: -2,
                        westernMediterranean: -1,
                        centralMediterranean: 0,
                        easternMediterranean: +1,
                        southernMediterranean: +2,
 
                        levantine: +3,
                        iranoAfghan: +4,
                        armenoid: +3,

                        
                                northAsian: +4,
                        centralAsian: +5,
                        
                                eastAsian: +4,

                        
                                malay: +7,
                        
                                amerindian: +5,
                        
                        
                                ethiopian: +6, 
                                subSaharan: +5, 
                                dinaric: -2 },
                        positiveSynergy: {
                        african: 0.3
                   },
                        negativeSynergy: {
                        nordic: 0.5,
                        slavic: 0.4,
                        westernMediterranean: 0.05,
                        nearEastern: 0.10,
                        eastBaltic: 0.5,
                        ladogan: 0.5,
                        dinaric: 0.5,
                        alpine: 0.5,
                        northAsian: 0.45,
                        centralAsian: 0.45,
                        eastAsian: 0.45,
                    },
                    balanceSynergy: {
                        nordic: 0.25,
                        slavic: 0.25,
                        westernMediterranean: 0.03,
                        nearEastern: 0.10,
                        eastBaltic: 0.25,
                        ladogan: 0.25,
                        dinaric: 0.25,
                        alpine: 0.25,
                        northAsian: 0.15,
                        centralAsian: 0.15,
                        eastAsian: 0.15,
                    },
                        
                        
                        
                        },
                { value: 'typeVI', label: 'Type VI — Dark Brown/Black (von Luschan 29–36)',
                    contributions: {
                                caucasion: -4,
                                caspian: -5, 
                          
                                nordic: -10, 
                        
                                ladogan: -9, 
                        
                                eastBaltic: -8, 
                        northernSlavic: -8,
                        centralSlavic: -8,
                        ponticSlavic: -7,
 
                        
                                alpine: -5,
                        westernMediterranean: -6,
                        centralMediterranean: -6,
                        easternMediterranean: -5,
                        southernMediterranean: -4,
 
                        levantine: -3,
                        iranoAfghan: -2,
                        armenoid: -3,
                        
                                northAsian: -2,
                        centralAsian: -1,
                        
                                eastAsian: -3,

                        
                                malay: +2,
                        
                                amerindian: -1,
                        
                        
                                ethiopian: +7, 
                                subSaharan: +10, 
                                dinaric: -5 },
                                positiveSynergy: {
                        african: 0.3
                   },
                        negativeSynergy: {
                        nordic: 0.5,
                        slavic: 0.5,
                        mediterranean: 0.5,
                        nearEastern: 0.25,
                        northCaucasian: 0.25,
                        eastBaltic: 0.5,
                        ladogan: 0.5,
                        dinaric: 0.5,
                        alpine: 0.5,
                        northAsian: 0.45,
                        centralAsian: 0.45,
                        eastAsian: 0.45,
                    },
                    balanceSynergy: {
                        nordic: 0.25,
                        slavic: 0.25,
                        mediterranean: 0.20,
                        nearEastern: 0.10,
                        northCaucasian: 0.10,
                        eastBaltic: 0.25,
                        ladogan: 0.25,
                        dinaric: 0.25,
                        alpine: 0.25,
                        northAsian: 0.15,
                        centralAsian: 0.15,
                        eastAsian: 0.15,
                    },
                        
                        }
            ]
        }, {
            id: 'cephalicIndex',
            number: 5,
            weightClass: 'A+',
            title: 'Cephalic Index',
            definition: 'Ratio of maximum head width (biparietal) to maximum head length (glabella–opisthocranion), multiplied by 100.',
            measurement: 'Find the Length: Measure from the bump between the eyebrows (glabella) to the furthest point on the back of the head (opisthocranion).Find the Width: Measure the widest part of the head, usually just above and behind the ears (eurion).Calculate: Divide the width by the length, then multiply by 100.',
            unit: 'Index value → categorical',
            guideImage: 'cephalic-index.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
            imageLicense: {
    author: "Nevit Delmin, no changes",
    source: "Wikipedia Commons",
    license: "CC Attribution-Share Alike 3.0 Unported license.",
    url: "https://commons.wikimedia.org/wiki/File:Cephalic_index.svg"
},
            type: 'cephalic',
options: [
    { value: '', label: '— Enter measurements or select category —', contributions: {} },

    { 
        value: 'hyperdolichocephalic', 
        label: 'Hyperdolichocephalic (< 72)',
        contributions: {
                                caucasion: -6,
                                caspian: -1, 
            hallstatt: +8,
            eastNordic: +7,
            tronder: +3,

            ladogan: -3,
            eastBaltic: -4,
            northernSlavic: -2,
            centralSlavic: -3,
            ponticSlavic: 0,

            alpine: -6,
            westernMediterranean: +6,
            centralMediterranean: +3,
            easternMediterranean: +4,
            southernMediterranean: +6,

            levantine: +4,
            iranoAfghan: +6,
            armenoid: -5,

            northAsian: -3,
            centralAsian: -2,
            eastAsian: -2,
            malay: -3,

            ethiopian: +5,
            subSaharan: +6,
            amerindian: +1,
            dinaric: -5
        },

        balanceSynergy: {
            armenoid: 0.30,
            dinaric: 0.12
        }
    },

    { 
        value: 'dolichocephalic', 
        label: 'Dolichocephalic (72–75)',
        contributions: {
                                caucasion: -4,
                                caspian: +1, 
            hallstatt: +7,
            eastNordic: +6,
            tronder: +2,

            ladogan: -2,
            eastBaltic: -3,
            northernSlavic: -1,
            centralSlavic: -2,
            ponticSlavic: 0,

            alpine: -5,
            westernMediterranean: +5,
            centralMediterranean: +2,
            easternMediterranean: +3,
            southernMediterranean: +5,

            levantine: +3,
            iranoAfghan: +5,
            armenoid: -4,

            northAsian: -2,
            centralAsian: -1,
            eastAsian: -1,
            malay: -2,

            ethiopian: +4,
            subSaharan: +5,
            amerindian: +1,
            dinaric: -4
        },

        balanceSynergy: {
            armenoid: 0.25,
            dinaric: 0.10
        }
    },

    { 
        value: 'sub-dolichocephalic', 
        label: 'Sub-dolichocephalic (75–77.5)',
        contributions: {
                                caucasion: -3,
                                caspian: +3, 
            hallstatt: +4.5,
            eastNordic: +4.5,
            tronder: +3.5,

            ladogan: 0,
            eastBaltic: -1,
            northernSlavic: +0.5,
            centralSlavic: +0.25,
            ponticSlavic: +1.75,

            alpine: -2.5,
            westernMediterranean: +3.5,
            centralMediterranean: +2.5,
            easternMediterranean: +3,
            southernMediterranean: +3.5,

            levantine: +1,
            iranoAfghan: +1,
            armenoid: -2,

            northAsian: -0.5,
            centralAsian: +0.5,
            eastAsian: 0,
            malay: -0.5,

            ethiopian: +2.5,
            subSaharan: +2.5,
            amerindian: +1.5,
            dinaric: -1.5
        },

        balanceSynergy: {
            tronder: 0.10,
            armenoid: 0.12
        }
    },

    { 
        value: 'mesocephalic', 
        label: 'Mesocephalic (77.5–80)',
        contributions: {
                                caucasion: 0,
                                caspian: 3.25, 
            hallstatt: +2,
            eastNordic: +3,
            tronder: +5,

            ladogan: +2,
            eastBaltic: +1,
            northernSlavic: +2.5,
            centralSlavic: +2.5,
            ponticSlavic: +3.5,

            alpine: 0,
            westernMediterranean: +2,
            centralMediterranean: +3,
            easternMediterranean: +3,
            southernMediterranean: +2,

            levantine: -1,
            iranoAfghan: -3,
            armenoid: 0,

            northAsian: +1,
            centralAsian: +2,
            eastAsian: +1,
            malay: +1,

            ethiopian: +1,
            subSaharan: 0,
            amerindian: +2,
            dinaric: +1
        },

        balanceSynergy: {
            tronder: 0.15
        }
    },

    { 
        value: 'sub-brachycephalic', 
        label: 'Sub-brachycephalic (80–82.5)',
        contributions: {
                                caucasion: 3,
                                caspian: -3.5, 
            hallstatt: -1,
            eastNordic: -0.5,
            tronder: +1,

            ladogan: +3.5,
            eastBaltic: +2.5,
            northernSlavic: +2.75,
            centralSlavic: +3.25,
            ponticSlavic: +2.75,

            alpine: +3,
            westernMediterranean: 0,
            centralMediterranean: +1.5,
            easternMediterranean: +2.5,
            southernMediterranean: +0.5,

            levantine: -0.75,
            iranoAfghan: -3.1,
            armenoid: +2,

            northAsian: +2.5,
            centralAsian: +3,
            eastAsian: +2,
            malay: +2,

            ethiopian: 0,
            subSaharan: -1.5,
            amerindian: +2,
            dinaric: +3
        },

        positiveSynergy: {
            alpine: 0.10
        }
    },

    { 
        value: 'brachycephalic', 
        label: 'Brachycephalic (82.5–85)',
        contributions: {
                                caucasion: 6,
                                caspian: -5, 
            hallstatt: -3.5,
            eastNordic: -2.5,
            tronder: -1,

            ladogan: +5,
            eastBaltic: +4,
            northernSlavic: +3,
            centralSlavic: +4,
            ponticSlavic: +2,

            alpine: +6,
            westernMediterranean: -2,
            centralMediterranean: 0,
            easternMediterranean: +2,
            southernMediterranean: -1,

            levantine: -0.5,
            iranoAfghan: -3.25,
            armenoid: +4,

            northAsian: +4,
            centralAsian: +4,
            eastAsian: +3,
            malay: +3,

            ethiopian: -1,
            subSaharan: -3,
            amerindian: +2,
            dinaric: +5
        },

        positiveSynergy: {
            alpine: 0.05,
            dinaric: 0.05
        }
    },

    { 
        value: 'hyperbrachycephalic', 
        label: 'Hyperbrachycephalic (> 85)',
        contributions: {
                                caucasion: 4,
                                caspian: -5, 
            hallstatt: -6,
            eastNordic: -5,
            tronder: -3,

            ladogan: +4,
            eastBaltic: +5,
            northernSlavic: +3,
            centralSlavic: +4,
            ponticSlavic: +1,

            alpine: +7,
            westernMediterranean: -5,
            centralMediterranean: -3,
            easternMediterranean: 0,
            southernMediterranean: -4,

            levantine: -1,
            iranoAfghan: -3,
            armenoid: +7,

            northAsian: +5,
            centralAsian: +5,
            eastAsian: +5,
            malay: +4,

            ethiopian: -3,
            subSaharan: -5,
            amerindian: +1,
            dinaric: +6
        },

        balanceSynergy: {
            nordic: 0.25,
            iranoAfghan: 0.15,
            levantine: 0.10
        },

         positiveSynergy: {
            alpine: 0.05,
            dinaric: 0.05
        }
    }
],

hasMeasurements: true,

measurementFields: [
    { id: 'headWidth', label: 'Head Width (mm)', placeholder: 'e.g. 152' },
    { id: 'headLength', label: 'Head Length (mm)', placeholder: 'e.g. 190' }
],

calcIndex: function(w, l) {
    return l > 0 ? ((w / l) * 100).toFixed(1) : null;
},

categorizeIndex: function(val) {
    if (val === null) return '';

    if (val < 71) return 'hyperdolichocephalic';
    if (val < 75) return 'dolichocephalic';
    if (val < 77.5) return 'sub-dolichocephalic';
    if (val <= 80) return 'mesocephalic';
    if (val <= 82.5) return 'sub-brachycephalic';
    if (val <= 85) return 'brachycephalic';

    return 'hyperbrachycephalic';
}
        }, {
            id: 'faceShape',
            number: 6,
            weightClass: 'B+',
            title: 'Face Shape',
            definition: 'Overall morphological gestalt of the facial contour in frontal view.',
            measurement: 'Visual assessment of facial outline.',
            unit: 'Categorical',
            guideImage: 'face-shape.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
            type: 'select',
            options: [
                { value: '', label: '— Select Face Shape —', contributions: {} },
                { value: 'veryNarrow', label: 'Very Narrow (Leptoprosopic)',
                    contributions: {
                                caucasion: -4,
                                caspian: -2, 
                        hallstatt: +6,
                        eastNordic: +5,
                        tronder: +3,

                        
                                ladogan: +2, 
                        
                                eastBaltic: +1, 
                        northernSlavic: +1.5,
                        centralSlavic: +1,
                        ponticSlavic: +1.5,
 
                        
                                alpine: -4,
                        westernMediterranean: +4,
                        centralMediterranean: +3,
                        easternMediterranean: +3,
                        southernMediterranean: +4,
 
                        levantine: +2,
                        iranoAfghan: +4,
                        armenoid: -1,

                        
                                northAsian: -2, 
                        centralAsian: -1, 
                        
                                eastAsian: -3, 
                        
                                malay: -2,

                        
                                ethiopian: +3, 
                        
                                subSaharan: -1, 
                        
                                amerindian: -2, 
                        
                                dinaric: +3.25 },
                    positiveSynergy: { hallstatt: 0.15 } },
                { value: 'narrow', label: 'Narrow',
                    contributions: {
                                caucasion: -2,
                                caspian: 1, 
                        hallstatt: +4,
                        eastNordic: +3,
                        tronder: +3,
 
                        
                                ladogan: +2, 
                        
                                eastBaltic: +1, 

                        northernSlavic: +3,
                        centralSlavic: +2,
                        ponticSlavic: +2,
 
                        
                                alpine: -2,
                        westernMediterranean: +3,
                        centralMediterranean: +3,
                        easternMediterranean: +3,
                        southernMediterranean: +2,
 
                        levantine: +2,
                        iranoAfghan: +3,
                        armenoid: +1,
 
                        
                                northAsian: -1,
                        centralAsian: 0,
                        
                                eastAsian: -1,
                        
                                malay: -1,

                        
                                ethiopian: +2, 
                        
                                subSaharan: 0, 
                        
                                amerindian: -1, 
                        
                                dinaric: +2.25 } },
                { value: 'oval', label: 'Oval',
                    contributions: {
                                caucasion: 0,
                                caspian: 3, 
                        hallstatt: +2,
                        eastNordic: +2,
                        tronder: +2,

 
                        
                                ladogan: +1, 
                        
                                eastBaltic: +1, 
                        northernSlavic: +3,
                        centralSlavic: +3,
                        ponticSlavic: +4,

                        
                                alpine: +1,
                        westernMediterranean: +2,
                        centralMediterranean: +3,
                        easternMediterranean: +3,
                        southernMediterranean: +2,
                        //появился вопрос про easternMediterranean: не смешивается ли он с PonticSlavic

                        levantine: +3,
                        iranoAfghan: +3,
                        armenoid: +2,

                        
                                northAsian: +1,
                        centralAsian: +1,
                        
                                eastAsian: +1,
                        
                                malay: +1,


                        
                                ethiopian: +1, 
                        
                                subSaharan: +1, 
                        
                                amerindian: +1, 
                        
                                dinaric: +1 } },
                { value: 'round', label: 'Round (Euryprosopic)',
                    contributions: {
                                caucasion: 3,
                                caspian: 2, 
                        hallstatt: -2,
                        eastNordic: -1,
                        tronder: 0,

                        
                                ladogan: +4, 
                        
                                eastBaltic: +4, 
                        northernSlavic: +3,
                        centralSlavic: +2,
                        ponticSlavic: +1,

                        
                                alpine: +5,
                        westernMediterranean: -1,
                        centralMediterranean: 0,
                        easternMediterranean: 0,
                        southernMediterranean: -1,

                        levantine: 0,
                        iranoAfghan: -1,
                        armenoid: +2,

                        
                                northAsian: +4,
                        centralAsian: +3,
                        
                                eastAsian: +3,
                        
                                malay: +3,

                        
                                ethiopian: 0, 
                        
                                subSaharan: +1, 
                        
                                amerindian: +3, 
                        
                                dinaric: 0 } },
                { value: 'broad', label: 'Broad',
                    contributions: {
                                caucasion: 5,
                                caspian: 2, 
                        hallstatt: -4,
                        eastNordic: -3,
                        tronder: -1,


                        
                                ladogan: +3, 
                        
                                eastBaltic: +4, 
                        northernSlavic: +2,
                        centralSlavic: +1.5,
                        ponticSlavic: 0,
 
                        
                                alpine: +4,
                        westernMediterranean: -3,
                        centralMediterranean: -2,
                        easternMediterranean: -1.5,
                        southernMediterranean: -2,

                        levantine: -1,
                        iranoAfghan: -2,
                        armenoid: +2,

                        
                                northAsian: +5,
                        centralAsian: +4,
                        
                                eastAsian: +4,
                        
                                malay: +4,


                        
                                ethiopian: -1, 
                        
                                subSaharan: +2, 
                        
                                amerindian: +4, 
                        
                                dinaric: -1 } },
                { value: 'veryBroad', label: 'Very Broad',
                    contributions: {
                                caucasion: 6,
                                caspian: -2, 
                        hallstatt: -6,
                        eastNordic: -5,
                        tronder: -3,

                        
                                ladogan: +1, 
                        
                                eastBaltic: +4, 
                        northernSlavic: -1,
                        centralSlavic: -2,
                        ponticSlavic: -3,
 
                        
                                alpine: +2,
                        westernMediterranean: -5,
                        centralMediterranean: -4,
                        easternMediterranean: -3.5,
                        southernMediterranean: -4,
 
                        
                                nearEastern: -3, 
                        
                                eastAsian: +6, 
                        
                                northAsian: +7, 
                        
                                malay: +6,
                        
                                ethiopian: -3, 
                        
                                subSaharan: +3, 
                        
                                amerindian: +6, 
                        
                                dinaric: -3 },
                    positiveSynergy: { northAsian: 0.20 } }
            ]
        }, {
            id: 'cheekbones',
            number: 7,
            weightClass: 'B+',
            title: 'Cheekbones (Zygomatic Prominence)',
            definition: 'Degree of lateral projection and prominence of the zygomatic arches.',
            measurement: 'Visual assessment and palpation of zygomatic region.',
            unit: 'Categorical',
            guideImage: 'zygomatic-prominence.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
            type: 'select',
            options: [
                { value: '', label: '— Select Cheekbone Type —', contributions: {} },
                { value: 'low', label: 'Low / Flat',
                    contributions: {
                                caucasion: -2,
                                caspian: 0, 
                        hallstatt: +1,
                        eastNordic: +1,
                        tronder: +1,
 
                        
                                ladogan: +1, 
                        
                                eastBaltic: 0, 
                        northernSlavic: 0,
                        centralSlavic: 0,
                        ponticSlavic: 0,


                        
                                alpine: -1,
                        westernMediterranean: +1,
                        centralMediterranean: +1,
                        easternMediterranean: 0,
                        southernMediterranean: 0,
 
                        levantine: 0,
                        iranoAfghan: +1,
                        armenoid: -1,
                        
                                northAsian: -5,
                        centralAsian: -3,
                        
                                eastAsian: -4,
                        
                                malay: -3,
                        
                                amerindian: -4,


                        
                                ethiopian: -1, 
                        
                                subSaharan: -2, 
                        
                                dinaric: 0 } },
                { value: 'moderate', label: 'Moderate',
                    contributions: {
                                caucasion: 2.5,
                                caspian: 1.5, 
                        hallstatt: +2,
                        eastNordic: +2,
                        tronder: +2,
 
                        
                                ladogan: +1, 
                        
                                eastBaltic: +1, 
                        northernSlavic: +2,
                        centralSlavic: +2,
                        ponticSlavic: +2,
 
                        
                                alpine: +2,
                        westernMediterranean: +2,
                        centralMediterranean: +2,
                        easternMediterranean: +2,
                        southernMediterranean: +2,
 
                        levantine: +2,
                        iranoAfghan: +2,
                        armenoid: +2,
                        
                                northAsian: 0,
                        centralAsian: +1,
                        
                                eastAsian: 0,

                        
                                malay: +1,
                        
                                amerindian: 0,

                        
                                ethiopian: +1, 
                        
                                subSaharan: +1, 
                        
                                dinaric: +1 } },
                { value: 'high', label: 'High / Prominent',
                    contributions: {
                                caucasion: 4,
                                caspian: 1, 
                        hallstatt: -1,
                        eastNordic: -1,
                        tronder: 0,


                        
                                ladogan: +2, 
                        
                                eastBaltic: +3, 
                        northernSlavic: +2,
                        centralSlavic: +1,
                        ponticSlavic: +1,
 
                        
                                alpine: +1,
                        westernMediterranean: -1,
                        centralMediterranean: 0,
                        easternMediterranean: +1,
                        southernMediterranean: 0,
 
                        levantine: +1,
                        iranoAfghan: 0,
                        armenoid: +2,

 
                        
                                northAsian: +6,
                        centralAsian: +5,
                        
                                eastAsian: +6,

                        
                                malay: +4,
                        
                                amerindian: +5,

                        
                                ethiopian: +2, 
                        
                                subSaharan: +2, 
                        
                                dinaric: +1.5 } },
                { value: 'veryHigh', label: 'Very High / Very Prominent',
                    contributions: {
                                caucasion: 5,
                                caspian: -1, 
                        hallstatt: -3,
                        eastNordic: -3,
                        tronder: -2,

                        
                                ladogan: +1, 
                        
                                eastBaltic: +4, 
                        northernSlavic: 0,
                        centralSlavic: 0,
                        ponticSlavic: -1,

                        
                                alpine: 0,
                        westernMediterranean: -3,
                        centralMediterranean: -2,
                        easternMediterranean: -1,
                        southernMediterranean: -2,

                        levantine: 0,
                        iranoAfghan: -1,
                        armenoid: +2,

                        
                                northAsian: +7,
                        centralAsian: +6,
                        
                                eastAsian: +8,

                        
                                malay: +7,
                        
                                amerindian: +7,

                        
                                ethiopian: +3, 
                        
                                subSaharan: +3, 
                        
                                dinaric: +2 },
                    positiveSynergy: { eastAsian: 0.20 } }
            ]
        }, {
            id: 'epicanthus',
            number: 8,
            weightClass: 'A+',
            title: 'Epicanthus (Epicanthic Fold)',
            definition: 'A skin fold of the upper eyelid covering the inner corner (canthus) of the eye.',
            measurement: 'Visual inspection of the medial canthal region.',
            unit: 'Present / Absent',
            guideImage: 'epicanthic-fold.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
            type: 'select',
            options: [
                { value: '', label: '— Select —', contributions: {} },
                { value: 'absent', label: 'Absent',
                    contributions: {
                                caucasion: 1,
                                caspian: 1, 
                        hallstatt: +2,
                        eastNordic: +2,
                        tronder: +2,
 
                        
                                ladogan: +1, 
                        
                                eastBaltic: +1, 
                        northernSlavic: +1,
                        centralSlavic: +1,
                        ponticSlavic: +1,
 
                        
                                alpine: +1,
                        
                                dinaric: +1,

                        westernMediterranean: +2,
                        centralMediterranean: +2,
                        easternMediterranean: +1,
                        southernMediterranean: +1,

                        levantine: +1,
                        iranoAfghan: +2,
                        armenoid: +1,

                        
                                northAsian: -9,
                        centralAsian: -4,
                        
                                eastAsian: -9,
                        
                                malay: -6,

                        
                                malay: -6,
                        
                                ethiopian: 0, 
                        
                                subSaharan: +1, 
                        
                                amerindian: -2.5, 
                        
                                dinaric: +1 },
balanceSynergy: {
                                                eastAsian: 0.30,
                                                northAsian: 0.25,
                                                malay: 0.05,
                                                amerindian: 0.05,
                                                centralAsian: 0.05
                                        },
negativeSynergy: {
                eastAsian: 0.15,
                northAsian: 0.10,
                malay: 0.05,
                amerindian: 0.05,
                centralAsian: 0.05
                    }    

                        
                },

                {
            value: 'slight',
            label: 'Slight / Vestigial',
            contributions: {
                                caucasion: -2,
                                caspian: -2,
                hallstatt: -2,
                eastNordic: -2,
                tronder: -2,


                
                                ladogan: 0,
                
                                eastBaltic: -2,
                northernSlavic: -1,
                centralSlavic: -0.5,
                ponticSlavic: 0,

                
                                alpine: -1,
                westernMediterranean: -1,
                centralMediterranean: -1,
                easternMediterranean: -0.5,
                southernMediterranean: 0.5,

                levantine: 0,
                iranoAfghan: 0,
                armenoid: +1,

                
                                northAsian: +3,
                centralAsian: +5,
                
                                eastAsian: +4,
                
                                malay: +2,

                
                                ethiopian: 0,
                
                                subSaharan: 0,
                
                                amerindian: +2,
                
                                dinaric: -1
            }, balanceSynergy: {
                                                eastAsian: -0.10,
                                                northAsian: -0.10,
                                                malay: -0.10,
                                                amerindian: -0.10,
                                                centralAsian: -0.15,
                                                northCaucasian: 0.05,
                                        },
negativeSynergy: {
                                                eastAsian: -0.10,
                                                northAsian: -0.10,
                                                malay: -0.10,
                                                amerindian: -0.10,
                                                centralAsian: -0.15,
                                                northCaucasian: 0.50,
                    }   
        },

         {
            value: 'moderate',
            label: 'Moderate',
            contributions: {
                                caucasion: -3,
                                caspian: -3,
                hallstatt: -3,
                eastNordic: -3,
                tronder: -3,

                
                                ladogan: -2,
                
                                eastBaltic: -3,
                northernSlavic: -3,
                centralSlavic: -3,
                ponticSlavic: -2,

                
                                alpine: -1,
                westernMediterranean: -2,
                centralMediterranean: -2,
                easternMediterranean: -2,
                southernMediterranean: -1.5,

                levantine: -1,
                iranoAfghan: -1,
                armenoid: 0,

                
                                northAsian: +8,
                centralAsian: +6,
                
                                eastAsian: +8,
                
                                malay: +5,

                
                                ethiopian: 0,
                
                                subSaharan: 0,
                
                                amerindian: +5,
                
                                dinaric: -1
            }, balanceSynergy: {
                                                eastAsian: -0.20,
                                                northAsian: -0.20,
                                                malay: -0.20,
                                                amerindian: -0.20,
                                                centralAsian: -0.20,
                                                northCaucasian: 0.05,
                                        },
negativeSynergy: {
                                                eastAsian: -0.20,
                                                northAsian: -0.20,
                                                malay: -0.20,
                                                amerindian: -0.20,
                                                centralAsian: -0.20,                                                
                                                northCaucasian: 0.5

                    }   
        },

        {
            value: 'strong',
            label: 'Strong / Pronounced',
            contributions: {
                                caucasion: -3,
                                caspian: -4,
                hallstatt: -5,
                eastNordic: -5,
                tronder: -5,

                
                                ladogan: -3,
                
                                eastBaltic: -3,
                northernSlavic: -3,
                centralSlavic: -3,
                ponticSlavic: -3,

                
                                alpine: -2,
                westernMediterranean: -3,
                centralMediterranean: -3,
                easternMediterranean: -2,
                southernMediterranean: -2,


                levantine: -2,
                iranoAfghan: -2,
                armenoid: -1,

                
                                northAsian: +10,
                centralAsian: +7,
                
                                eastAsian: +10,

                
                                malay: +7,

                
                                ethiopian: +1,
                
                                subSaharan: 0,
                
                                amerindian: +8,
                
                                dinaric: -3
            }, balanceSynergy: {
                                                eastAsian: -0.50,
                                                northAsian: -0.50,
                                                malay: -0.30,
                                                amerindian: -0.20,
                                                centralAsian: -0.20,
                                                northCaucasian: 0.15,
                                        },
negativeSynergy: {
                                                eastAsian: -0.50,
                                                northAsian: -0.50,
                                                malay: -0.30,
                                                amerindian: -0.20,
                                                centralAsian: -0.20,
                                                northCaucasian: 0.25,

                    }   
        }   
                        

            ]
        }, {
            id: 'eyeShape',
            number: 9,
            weightClass: 'C+',
            title: 'Eye Shape (Palpebral Fissure)',
            definition: 'Morphology of the opening between the upper and lower eyelids.',
            measurement: 'Visual assessment of palpebral fissure orientation and shape.',
            unit: 'Categorical',
            guideImage: 'eye-shape.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
            type: 'select',
            options: [
                { value: '', label: '— Select Eye Shape —', contributions: {} },
                { value: 'round', label: 'Round',
                    contributions: {
                                caucasion: 0,
                                caspian: 0, 
                        hallstatt: -1,
                        eastNordic: -1,
                        tronder: 0,

                        
                                ladogan: 0, 
                        
                                eastBaltic: 0, 
                        
                                slavic: 0, 
                        
                                alpine: +1,
                        westernMediterranean: +1,
                        centralMediterranean: +1,
                        easternMediterranean: +1,
                        southernMediterranean: +1,

                        levantine: +1,
                        iranoAfghan: +1,
                        armenoid: +1,

                        
                                northAsian: -2,
                        centralAsian: -1,
                        
                                eastAsian: -2,
                        
                                malay: 0,
                        
                                amerindian: -1,

                        
                                ethiopian: +1, 
                        
                                subSaharan: +2, 
                        
                                dinaric: 0 } },

                { value: 'almond', label: 'Almond',
                    contributions: {
                                caucasion: 2,
                                caspian: 2, 
                        hallstatt: +3,
                        eastNordic: +3,
                        tronder: +2,


                        
                                ladogan: +2, 
                        
                                eastBaltic: +2, 
                        northernSlavic: +3,
                        centralSlavic: +3,
                        ponticSlavic: +3,


                        
                                alpine: +2,
                        westernMediterranean: +3,
                        centralMediterranean: +3,
                        easternMediterranean: +3,
                        southernMediterranean: +3,

                        
                        levantine: +3,
                        iranoAfghan: +3,
                        armenoid: +2,

                        
                                northAsian: +2,
                        centralAsian: +3,
                        
                                eastAsian: +2,

                        
                                malay: +2,

                        
                                ethiopian: +2, 
                        
                                subSaharan: +1, 
                        
                                amerindian: +1, 
                        
                                dinaric: +2 } },
                { value: 'horizontal', label: 'Horizontal / Narrow',
                    contributions: {
                                caucasion: 1,
                                caspian: 2, 
                        hallstatt: +1,
                        eastNordic: +1,
                        tronder: +1,

                        
                                ladogan: +2, 
                        
                                eastBaltic: +2, 
                        northernSlavic: +1,
                        centralSlavic: +1,
                        ponticSlavic: +1,

                        
                                alpine: +1,
                        westernMediterranean: 0,
                        centralMediterranean: 0,
                        easternMediterranean: 0,
                        southernMediterranean: 0,

                        levantine: +1,
                        iranoAfghan: 0,
                        armenoid: +1,

                        
                                northAsian: +5,
                        centralAsian: +4,
                        
                                eastAsian: +6,

                        
                                malay: +3,

                        
                                ethiopian: 0, 
                                subSaharan: -1, 
                                amerindian: +4, 
                                dinaric: +1 } },
                { value: 'upturned', label: 'Upturned (Lateral Canthus Higher)',
                    contributions: {
                                caucasion: 0,
                                caspian: 1,
                        hallstatt: 0,
                        eastNordic: 0,
                        tronder: +1,

                         
                                ladogan: +1, 
                         
                                eastBaltic: +1, 
                         northernSlavic: +2,
                         centralSlavic: +2,
                         ponticSlavic: +2,

                         
                                alpine: +1,
                        westernMediterranean: +1,
                        centralMediterranean: +1,
                        easternMediterranean: +1,
                        southernMediterranean: +1,


                        levantine: +1,
                        iranoAfghan: +1,
                        armenoid: +1,

                        
                                northAsian: +3,
                        centralAsian: +2,
                        
                                eastAsian: +3,

                        
                                malay: +2,
                        
                                ethiopian: +1, 
                        
                                subSaharan: +1, 
                        
                                amerindian: +3, 
                        
                                dinaric: +1 } },
                { value: 'downturned', label: 'Downturned (Lateral Canthus Lower)',
                    contributions: {
                                caucasion: 0,
                                caspian: 0, 
                        hallstatt: 0,
                        eastNordic: 0,
                        tronder: 0,

                        
                                ladogan: -1, 
                        
                                eastBaltic: -1, 
                        northernSlavic: -1,
                        centralSlavic: -0.5,
                        ponticSlavic: 0,
 
                        
                                alpine: 0,
                        
                        westernMediterranean: 0,
                        centralMediterranean: 0,
                        easternMediterranean: 0,
                        southernMediterranean: 0,
 
                        levantine: 0,
                        iranoAfghan: 0,
                        armenoid: 0,
 
                        
                                northAsian: -2,
                        centralAsian: -1,
                        
                                eastAsian: -2,

                        
                                malay: -1,
                        
                                ethiopian: 0, 
                        
                                subSaharan: 0, 
                        
                                amerindian: -2, 
                        
                                dinaric: 0 } }
            ]
        }, {
            id: 'innerCanthalDistance',
            number: 10,
            weightClass: 'B',
            title: 'Inner Canthal Distance',
            definition: 'Distance between the inner canthi (medial corners) of the eyes.',
            measurement: 'Sliding calipers: inner canthus to inner canthus, in millimeters.',
            unit: 'mm → categorical',
            guideImage: 'inner-canthal-distance.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
            type: 'select',
            options: [
                { value: '', label: '— Select Inner Canthal Distance —', contributions: {} },
                { value: 'narrow', label: 'Narrow (< 30 mm)',
                    contributions: {
                                caucasion: 0,
                                caspian: 0, 
                        hallstatt: +2,
                        eastNordic: +2,
                        tronder: +1,


                        
                                ladogan: +1, 
                        
                                eastBaltic: 0, 
                        northernSlavic: +1,
                        centralSlavic: +1,
                        ponticSlavic: +2,
 
                        
                                alpine: -1,
                        westernMediterranean: +2,
                        centralMediterranean: +2,
                        easternMediterranean: +1,
                        southernMediterranean: +1,
 
                        levantine: +1,
                        iranoAfghan: +2,
                        armenoid: +1,
 
                        
                                northAsian: -2,
                        centralAsian: -1,
                        
                                eastAsian: -2,

                        
                                malay: -1,

                        
                                ethiopian: 0, 
                        
                                subSaharan: -1, 
                        
                                amerindian: -1, 
                        
                                dinaric: +1 } },
                { value: 'average', label: 'Average (30–35 mm)',
                    contributions: {
                                caucasion: 2,
                                caspian: 2, 
                        hallstatt: +1,
                        eastNordic: +1,
                        tronder: +1,

 
                        
                                ladogan: +1, 
                        
                                eastBaltic: +1, 
                        northernSlavic: +2,
                        centralSlavic: +2,
                        ponticSlavic: +2,

                        
                                alpine: +2,
                        westernMediterranean: +2,
                        centralMediterranean: +2,
                        easternMediterranean: +2,
                        southernMediterranean: +2,


                        levantine: +2,
                        iranoAfghan: +2,
                        armenoid: +2,

                        
                                northAsian: +1,
                        centralAsian: +1,
                        
                                eastAsian: +1,

                        
                                malay: +1,

                        
                                ethiopian: +1, 
                        
                                subSaharan: +1, 
                        
                                amerindian: +1, 
                        
                                dinaric: +1 } },
                { value: 'wide', label: 'Wide (> 35 mm)',
                    contributions: {
                                caucasion: 3,
                                caspian: 2, 
                        hallstatt: -2,
                        eastNordic: -2,
                        tronder: -1,


                        
                                ladogan: 0, 
                        
                                eastBaltic: +1, 
                        northernSlavic: 0,
                        centralSlavic: 0,
                        ponticSlavic: -0.5,

                        
                                alpine: +1,
                        westernMediterranean: -1,
                        centralMediterranean: 0,
                        easternMediterranean: +1,
                        southernMediterranean: 0,


                        levantine: +1,
                        iranoAfghan: 0,
                        armenoid: +2,

                        
                                northAsian: +3,
                        centralAsian: +2,
                        
                                eastAsian: +3,

                        
                                malay: +2,

                        
                                ethiopian: +2, 
                        
                                subSaharan: +2, 
                        
                                amerindian: +3, 
                        
                                dinaric: 0 } }
            ]
        }, {
            id: 'noseType',
            number: 11,
            weightClass: 'A+',
            title: 'Nose Type (Nasal Index)',
            definition: 'Ratio of nasal width to nasal height × 100. Key index in classical anthropometry.',
            measurement: 'Nasal Index = (Nasal Width / Nasal Height) × 100.',
            unit: 'Index value → categorical',
            guideImage: 'nasal-index.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
            type: 'nasal',
            options: [
                { value: '', label: '— Enter measurements or select category —', contributions: {} },
                { value: 'leptorrhine', label: 'Leptorrhine — Narrow Nose (< 70)',
                    contributions: {
                                caucasion: 5,
                                caspian: 5, 
                        hallstatt: +7,
                        eastNordic: +6,
                        tronder: +5,
 
                        
                        ladogan: +3, 
                        
                        eastBaltic: +2, 
                        northernSlavic: +4.5,
                        centralSlavic: +4,
                        ponticSlavic: +5,
 
                        
                        alpine: +1,
                        westernMediterranean: +5,
                        centralMediterranean: +4,
                        easternMediterranean: +5,
                        southernMediterranean: +4,

                        levantine: +4,
                        iranoAfghan: +5.5,
                        armenoid: +5,

                        
                                northAsian: -3, 
                        centralAsian: +1,
                        
                                eastAsian: -2,

                        
                                malay: -3,

                        
                                ethiopian: -2, 
                        
                                subSaharan: -6, 
                        
                                amerindian: -1, 
                        
                                dinaric: +5 } },
                { value: 'mesorrhine', label: 'Mesorrhine — Medium Nose (70–85)',
                    contributions: {
                                caucasion: 1,
                                caspian: 2,
                        hallstatt: 0,
                        eastNordic: 1,
                        tronder: 2,

                        
                                ladogan: +2, 
                        
                                eastBaltic: +2,                        
                        northernSlavic: +2,
                        centralSlavic: +3,
                        ponticSlavic: +2,
                        
                                alpine: +3,
                        westernMediterranean: +2,
                        centralMediterranean: +3,
                        easternMediterranean: +2,
                        southernMediterranean: +2, 
                        levantine: +2,
                        iranoAfghan: +1,
                        armenoid: +2,

                        
                                northAsian: +2, 
                        centralAsian: +4,
                        
                                eastAsian: +2,

                        
                                northAsian: +2, 
                        
                                malay: +2,
                        
                                ethiopian: +2, 
                        
                                subSaharan: +1, 
                        
                                amerindian: +2, 
                        
                                dinaric: +2 },
                        balanceSynergy: { alpine: 0.10 } },
                { value: 'platyrrhine', label: 'Platyrrhine — Broad Nose (> 85)',
                    contributions: {
                                caucasion: -3,
                                caspian: -2, 
                        hallstatt: -5,
                        eastNordic: -5,
                        tronder: -4,
 
                        
                                ladogan: -3, 
                        
                                eastBaltic: -2, 
                        northernSlavic: -3,
                        centralSlavic: -3,
                        ponticSlavic: -3,

                        
                                alpine: -2,
                        westernMediterranean: -4,
                        centralMediterranean: -3,
                        easternMediterranean: -2,
                        southernMediterranean: -2,

                        levantine: -1,
                        iranoAfghan: -4,
                        armenoid: -2,
 
                        
                                northAsian: +2,
                        centralAsian: 0,
                        
                                eastAsian: +1,

                        
                                malay: +4,

                        
                                ethiopian: +5, 
                        
                                subSaharan: +8, 
                        
                                amerindian: +1, 
                        
                                dinaric: -4 },
                        positiveSynergy: { subSaharan: 0.25 } }
            ],
            hasMeasurements: true,
            measurementFields: [
                { id: 'nasalWidth', label: 'Nasal Width (mm)', placeholder: 'e.g. 35' },
                { id: 'nasalHeight', label: 'Nasal Height (mm)', placeholder: 'e.g. 50' }
            ],
            calcIndex: function(w, h) { return h > 0 ? ((w / h) * 100).toFixed(1) : null; },
            categorizeIndex: function(val) {
                if (val === null) return '';
                if (val < 70) return 'leptorrhine';
                if (val <= 85) return 'mesorrhine';
                return 'platyrrhine';
            }
        }, 
        
        
        {
  id: 'nasalProfile',
  number: 12,
  weightClass: 'B+',
  title: 'Nasal Profile (Bridge Shape)',
  definition: 'Contour of the nasal bridge in lateral view, independent of the nasal index.',
  measurement: 'Visual assessment in profile.',
  unit: 'Categorical',
  guideImage: 'nasal-profile.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
  type: 'select',
  options: [
    { value: '', label: '— Select Nasal Profile —', contributions: {} },
    {
      value: 'straight',
      label: 'Straight',
      contributions: {
                                caucasion: 2,
                                caspian: 3,
        hallstatt: +4,
        eastNordic: +3,
        tronder: +3,
 
        
                                ladogan: +1, 
        
                                eastBaltic: +1, 
        northernSlavic: +2,
        centralSlavic: +2,
        ponticSlavic: +3,
 
        
                                alpine: 0,
        westernMediterranean: +2,
        centralMediterranean: +1,
        easternMediterranean: +1,
        southernMediterranean: 0,

        levantine: 0,
        iranoAfghan: +1,
        armenoid: -1.5,

        
                                northAsian: -1,
        centralAsian: 0,
        
                                eastAsian: -1,
        
                                malay: 0,

        
                                ethiopian: 0, 
        
                                subSaharan: -1, 
        
                                amerindian: 0, 
        
                                dinaric: -0.25
      }
    },
    {
      value: 'concave',
      label: 'Concave (Saddle/Retroussé)',
      contributions: {
                                caucasion: 0,
                                caspian: 1,
        hallstatt: -2,
        eastNordic: -1,
        tronder: 0,


        
                                ladogan: +3, 
        
                                eastBaltic: +3, 
        northernSlavic: +2,
        centralSlavic: +2,
        ponticSlavic: +1,


        
                                alpine: +2,
        westernMediterranean: -1,
        centralMediterranean: 0,
        easternMediterranean: -1,
        southernMediterranean: -1,

        levantine: -1,
        iranoAfghan: -2,
        armenoid: -3,

        
                                northAsian: +1,
        centralAsian: +1,
        
                                eastAsian: 0,

        
                                malay: +1,
        
                                amerindian: 0,

        
                                ethiopian: 0, 
        
                                subSaharan: +1,  
        
                                dinaric: -2
      },
      positiveSynergy: { eastBaltic: 0.15 }
    },
    {
      value: 'convex',
      label: 'Convex (Aquiline/Roman)',
      contributions: {
                                caucasion: 3,
                                caspian: 1,
        hallstatt: -2,
        eastNordic: -2,
        tronder: -1,
 
        
                                ladogan: -1, 
        
                                eastBaltic: -2, 
        northernSlavic: -1,
        centralSlavic: -1,
        ponticSlavic: -0.5,
 
        
                                alpine: -1,
        westernMediterranean: +2,
        centralMediterranean: +3,
        easternMediterranean: +6,
        southernMediterranean: +2,

        levantine: +5,
        iranoAfghan: +5,
        armenoid: +7,

        
                                northAsian: -2,
        centralAsian: -1,
        
                                eastAsian: -3,

        
                                malay: -1,

        
                                ethiopian: +2, 
        
                                subSaharan: 0, 
        
                                amerindian: -2, 
        
                                dinaric: +8
      },
      positiveSynergy: { armenoid: 0.20, dinaric: 0.15 },
      
    },
    {
      value: 'wavy',
      label: 'Wavy / Irregular',
      contributions: {
                                caucasion: 1,
                                caspian: 2,
        hallstatt: -2,
        eastNordic: -2,
        tronder: -1,
 
        
                                ladogan: 0, 
        
                                eastBaltic: +1, 
        northernSlavic: 0, 
        centralSlavic: 0, 
        ponticSlavic: 0,
        
                                alpine: +1,
        westernMediterranean: +1,
        centralMediterranean: +2,
        easternMediterranean: +3,
        southernMediterranean: +2,

        levantine: +3,
        iranoAfghan: +2,
        armenoid: +3,


        
                                northAsian: -1,
        centralAsian: 0,
        
                                eastAsian: -1,

        
                                malay: 0,

        
                                ethiopian: +1, 
        
                                subSaharan: 0, 
        
                                amerindian: 0, 
        
                                dinaric: +1.5
      }
    }
  ]
},
        
        
        
        
        {
            id: 'forehead',
            number: 13,
            weightClass: 'B',
            title: 'Forehead Morphology',
            definition: 'Composite assessment of forehead height, width, and slope.',
            measurement: 'Visual assessment with optional caliper measurements.',
            unit: 'Categorical (3 sub-traits)',
            guideImage: 'forehead-morphology.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
            type: 'composite',
            subTraits: [
                { id: 'foreheadHeight', label: 'Height',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'low', label: 'Low',
                            contributions: {
                                caucasion: 1,
                                caspian: 0, 
                                hallstatt: -3,
                                eastNordic: -2,
                                tronder: -1,

                                
                                ladogan: -1, 
                                
                                eastBaltic: 0, 
                                northSlavic: 0,
                                centralSlavic: 0,
                                ponticSlavic: 0,

                                
                                alpine: +1,
                                westernMediterranean: -1,
                                centralMediterranean: 0,
                                easternMediterranean: 0,
                                southernMediterranean: 0,


                                Levantine: 0,
                                IranoAfghan: -1,
                                Armenoid: -1,

                                
                                northAsian: +1,
                                centralAsian: +1,
                                
                                eastAsian: +1,

                                
                                malay: +1,
                                
                                ethiopian: 0, 
                                
                                subSaharan: +1, 
                                
                                amerindian: +1, 
                                
                                dinaric: 0 } },
                        { value: 'average', label: 'Average',
                            contributions: {
                                caucasion: 0,
        caspian: 0,

        hallstatt: 0,
        eastNordic: 0,
        tronder: 0,

        ladogan: 0,

        eastBaltic: 0,
        northSlavic: 0,
        centralSlavic: 0,
        ponticSlavic: 0,

        alpine: 0,

        westernMediterranean: 0,
        centralMediterranean: 0,
        easternMediterranean: 0,
        southernMediterranean: 0,

        levantine: 0,
        iranoAfghan: 0,
        armenoid: 0,

        northAsian: 0,
        centralAsian: 0,
        eastAsian: 0,

        malay: 0,

        ethiopian: 0,
        subSaharan: 0,
        amerindian: 0,

        dinaric: 0 } },
                        { value: 'high', label: 'High',
                            contributions: {
                                caucasion: 3,
                                caspian: 3, 
                                hallstatt: +4,
                                eastNordic: +3,
                                tronder: +2,
 
                                
                                ladogan: +2, 
                                
                                eastBaltic: +2, 
                                northernSlavic: +2,
                                centralSlavic: +2,
                                ponticSlavic: +3,
 
                                
                                alpine: 0,
                                westernMediterranean: +2,
                                centralMediterranean: +2,
                                easternMediterranean: +2,
                                southernMediterranean: +2,

                                levantine: +2,
                                iranoAfghan: +3,
                                armenoid: +3,

                                
                                northAsian: 0,
                                centralAsian: 0,
                                
                                eastAsian: 0,


                                
                                malay: 0,
                                
                                ethiopian: +1, 
                                
                                subSaharan: 0, 
                                
                                amerindian: 0, 
                                
                                dinaric: +1 } }
                    ] }, { id: 'foreheadWidth', label: 'Width',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'narrow', label: 'Narrow',
                            contributions: {
                                caucasion: -2,
                                caspian: 1, 
                                hallstatt: +3,
                                eastNordic: +2,
                                tronder: +1,

                                
                                ladogan: 0, 
                                
                                eastBaltic: -1, 
                                northernSlavic: +1,
                                centralSlavic: +1,
                                ponticSlavic: +2,


                                
                                alpine: -2,
                                westernMediterranean: +2,
                                centralMediterranean: +2,
                                easternMediterranean: +1,
                                southernMediterranean: +2,


                                levantine: +1,
                                iranoAfghan: +3,
                                armenoid: 0,

                                
                                
                                northAsian: -1,
                                centralAsian: 0,
                                
                                eastAsian: -1,


                                
                                malay: -1,
                                
                                ethiopian: 0, 
                                
                                subSaharan: -1, 
                                
                                amerindian: -1, 
                                
                                dinaric: +1 } },
                        { value: 'average', label: 'Average',
                            contributions: {
                                caucasion: 0,
        caspian: 0,

        hallstatt: 0,
        eastNordic: 0,
        tronder: 0,

        ladogan: 0,

        eastBaltic: 0,
        northernSlavic: 0,
        centralSlavic: 0,
        ponticSlavic: 0,

        alpine: 0,

        westernMediterranean: 0,
        centralMediterranean: 0,
        easternMediterranean: 0,
        southernMediterranean: 0,

        levantine: 0,
        iranoAfghan: 0,
        armenoid: 0,

        eastAsian: 0,
        northAsian: 0,
        malay: 0,

        ethiopian: 0,
        subSaharan: 0,
        amerindian: 0,

        dinaric: 0 } },
                        { value: 'broad', label: 'Broad',
                            contributions: {
                                caucasion: 3.5,
                                caspian: 2, 
                                hallstatt: -1,
                                eastNordic: 0,
                                tronder: +1,


                                
                                ladogan: +2, 
                                
                                eastBaltic: +3, 
                                NorthernSlavic: +1,
                                CentralSlavic: +1,
                                PonticSlavic: 0,

                                
                                alpine: +4,
                                westernMediterranean: -1,
                                centralMediterranean: 0,
                                easternMediterranean: 0,
                                southernMediterranean: -1,

                                levantine: 0,
                                iranoAfghan: -1,
                                armenoid: +2,

                                
                                eastAsian: +2, 
                                centralAsian: +2,
                                
                                northAsian: +3, 
                                
                                malay: +2,
                                
                                ethiopian: +1, 
                                
                                subSaharan: +2, 
                                
                                amerindian: +2, 
                                
                                dinaric: +1 } }
                    ] }, { id: 'foreheadSlope', label: 'Slope',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'vertical', label: 'Vertical',
                            contributions: {
                                caucasion: 3,
                                caspian: 2, 
                                hallstatt: +2,
                                eastNordic: +3,
                                tronder: +2,

                                
                                ladogan: +2, 
                                
                                eastBaltic: +1, 
                                northernSlavic: +2,
                                centralSlavic: +2,
                                ponticSlavic: +2,

                                
                                alpine: -1,
                                westernMediterranean: +2,
                                centralMediterranean: +2,
                                easternMediterranean: +2,
                                southernMediterranean: +1,
 
                                levantine: +2,
                                iranoAfghan: +2,
                                armenoid: +1,

                                
                                northAsian: -1,
                                centralAsian: 0,
                                
                                eastAsian: -1,


                                
                                malay: 0,
                                
                                ethiopian: +1, 
                                
                                subSaharan: +1, 
                                
                                amerindian: -1, 
                                
                                dinaric: +1 } },
                        { value: 'moderate', label: 'Moderate Slope',
                            contributions: {
                                caucasion: 0,
                                caspian: 0, 
                                  
                                nordic: 0, 
                                
                                ladogan: 0, 
                                
                                eastBaltic: 0, 
                                
                                slavic: 0, 
                                
                                alpine: 0,
                                
                                mediterranean: 0, 
                                
                                nearEastern: 0, 
                                
                                eastAsian: 0, 
                                
                                northAsian: 0, 
                                
                                malay: 0,
                                
                                ethiopian: 0, 
                                
                                subSaharan: 0, 
                                
                                amerindian: 0, 
                                
                                dinaric: +1 } },
                        { value: 'sloping', label: 'Sloping',
                            contributions: {
                                caucasion: -1,
                                caspian: 1, 
                                hallstatt: +2,
                                eastNordic: 0,
                                tronder: +1,

                                
                                ladogan: -1, 
                                
                                eastBaltic: 0, 
                                northernSlavic: -1,
                                centralSlavic: -1,
                                ponticSlavic: 0,

                                
                                alpine: +1,
                                westernMediterranean: -1,
                                centralMediterranean: -1,
                                easternMediterranean: -1,
                                southernMediterranean: -1,


                                levantine: -1,
                                iranoAfghan: 0,
                                armenoid: -1,


                                
                                northAsian: +2,
                                centralAsian: +2,
                                
                                eastAsian: +2,


                                
                                malay: +1,
                                
                                ethiopian: 0, 
                                
                                subSaharan: 0, 
                                
                                amerindian: +2, 
                                
                                dinaric: 0 } }
                    ] }
            ]
        }, {
            id: 'chin',
            number: 14,
            weightClass: 'B',
            title: 'Chin Morphology',
            definition: 'Assessment of mental protuberance projection, presence of cleft, and width.',
            measurement: 'Visual assessment and palpation.',
            unit: 'Categorical (3 sub-traits)',
            guideImage: 'chin-morphology.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
            type: 'composite',
            subTraits: [
                { id: 'chinProjection', label: 'Projection',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'weak', label: 'Weak / Receding',
                            contributions: {
                                caucasion: -1,
                                caspian: -1, 
                                hallstatt: -2,
                                eastNordic: -1,
                                tronder: 0,

                                
                                ladogan: 0, 
                                
                                eastBaltic: 0, 
                                northernSlavic: 0,
                                centralSlavic: 0,
                                ponticSlavic: -0.5,


                                
                                alpine: -1,
                                westernMediterranean: -1,
                                centralMediterranean: -1,
                                easternMediterranean: -1,
                                southernMediterranean: -1,

                                levantine: -1,
                                iranoAfghan: -2,
                                armenoid: -2,

                                
                                northAsian: +1,
                                centralAsian: +1,
                                
                                eastAsian: +1,


                                
                                malay: +1,
                                
                                ethiopian: -1, 
                                
                                subSaharan: -1, 
                                
                                amerindian: +1, 
                                
                                dinaric: 0 } },
                        { value: 'moderate', label: 'Moderate',
                            contributions: {
                                caucasion: 0,
        caspian: 0,

        hallstatt: 0,
        eastNordic: 0,
        tronder: 0,
        ladogan: 0,
        eastBaltic: 0,

        northernSlavic: 0,
        centralSlavic: 0,
        ponticSlavic: 0,

        alpine: 0,

        westernMediterranean: 0,
        centralMediterranean: 0,
        easternMediterranean: 0,
        southernMediterranean: 0,

        levantine: 0,
        iranoAfghan: 0,
        armenoid: 0,

        northAsian: 0,
        centralAsian: 0,
        eastAsian: 0,
        malay: 0,
        ethiopian: 0,
        subSaharan: 0,
        amerindian: 0,

        dinaric: 0 } },
                        { value: 'strong', label: 'Strong / Projecting',
                            contributions: {
                                caucasion: 4,
                                caspian: 3, 
                                hallstatt: +4,
                                eastNordic: +3,
                                tronder: +2,

                                
                                ladogan: +2, 
                                
                                eastBaltic: +1, 
                                northernSlavic: +2,
                                centralSlavic: +2,
                                ponticSlavic: +3,

                                
                                alpine: +1,
                                westernMediterranean: +2,
                                centralMediterranean: +2,
                                easternMediterranean: +3,
                                southernMediterranean: +2,

                                levantine: +2,
                                iranoAfghan: 0,
                                armenoid: +4,

                                
                                northAsian: -2,
                                centralAsian: -1,
                                
                                eastAsian: -2,

                                
                                malay: -1,
                                
                                ethiopian: +1, 
                                
                                subSaharan: 0, 
                                
                                amerindian: -1, 
                                
                                dinaric: +3.5 } }
                    ] }, { id: 'chinCleft', label: 'Cleft',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'absent', label: 'Absent',
                            contributions: {
                                caucasion: 0,
                                caspian: 0, 
                                  
                                nordic: 0, 
                                ladogan: 0, 
                                eastBaltic: 0, 
                                slavic: 0, 
                                alpine: 0,
                                
                                mediterranean: 0, 
                                nearEastern: 0, 
                                eastAsian: 0, 
                                northAsian: 0, 
                                malay: 0,
                                
                                ethiopian: 0, 
                                subSaharan: 0, 
                                amerindian: 0, 
                                dinaric: 0 } },
                        { value: 'present', label: 'Present (Cleft Chin)',
                            contributions: {
                                caucasion: 0,
                                caspian: 0, 
                                hallstatt: +2,
                                eastNordic: +2,
                                tronder: +1,

                                
                                ladogan: +1, 
                                
                                eastBaltic: 0, 
                                northernSlavic: +1,
                                centralSlavic: +1,
                                ponticSlavic: +2,

                                
                                alpine: +1,
                                westernMediterranean: +2,
                                centralMediterranean: +2,
                                easternMediterranean: +2,
                                southernMediterranean: +1,

                                levantine: +1,
                                iranoAfghan: +1,
                                armenoid: +1,

                                
                                northAsian: -1,
                                centralAsian: 0,
                                
                                eastAsian: -1,


                                
                                northAsian: -1, 
                                
                                malay: 0,
                                
                                ethiopian: 0, 
                                
                                subSaharan: 0, 
                                
                                amerindian: -1, 
                                
                                dinaric: +1 } }
                    ] }, { id: 'chinWidth', label: 'Width',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'narrow', label: 'Narrow',
                            contributions: {
                                caucasion: -2,
                                caspian: 1, 
                            hallstatt: +3,
                            eastNordic: +2,
                            tronder: +1,
                                ladogan: 0, 
                                
                                eastBaltic: -1, 
                                
                                northernSlavic: +1,
                                centralSlavic: +1,
                                ponticSlavic: +2,

                                
                                alpine: -2,
                                
                                westernMediterranean: +2,
                                centralMediterranean: +2,
                                easternMediterranean: +2,
                                southernMediterranean: +2,

                                levantine: +1,
                                iranoAfghan: +1.5,
                                armenoid: 0,

                                northAsian: -1,
                                centralAsian: 0,
                                eastAsian: -1,

                                
                                malay: -1,
                                
                                ethiopian: 0, 
                                
                                subSaharan: -1, 
                                
                                amerindian: -1, 
                                
                                dinaric: +1 } },
                        { value: 'average', label: 'Average',
                            contributions: {
                                caucasion: 0,
                                caspian: 0,   
                                nordic: 0, 
                                ladogan: 0, 
                                eastBaltic: 0, 
                                slavic: 0, 
                                alpine: 0,
                                
                                mediterranean: 0, 
                                nearEastern: 0, 
                                eastAsian: 0, 
                                northAsian: 0, 
                                malay: 0,
                                
                                ethiopian: 0, 
                                subSaharan: 0, 
                                amerindian: 0, 
                                dinaric: 0 } },
                        { value: 'broad', label: 'Broad',
                            contributions: {
                                caucasion: 4,
                                caspian: 2,   
                                hallstatt: -1,
                                eastNordic: 0,
                                tronder: +1,

                                ladogan: +2, 
                                eastBaltic: +3, 
                                northernSlavic: +2,
                                centralSlavic: +2,
                                ponticSlavic: +1,

                                alpine: +3,
                                
                                westernMediterranean: -1,
                                centralMediterranean: 0,
                                easternMediterranean: 0,
                                southernMediterranean: -1,

                                levantine: 0,
                                iranoAfghan: -1,
                                armenoid: +2,

                                northAsian: +3,
                                centralAsian: +2,
                                eastAsian: +2,

                                malay: +2,
                                
                                ethiopian: +1, 
                                subSaharan: +2, 
                                amerindian: +2, 
                                dinaric: +1 } }
                    ] }
            ]
        }, {
            id: 'eyebrows',
            number: 15,
            weightClass: 'C',
            title: 'Eyebrow Characteristics',
            definition: 'Assessment of eyebrow shape, density, and position relative to the orbital rim.',
            measurement: 'Visual assessment.',
            unit: 'Categorical (3 sub-traits)',
            guideImage: 'eyebrow-characteristic.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
            type: 'composite',
            subTraits: [
                { id: 'eyebrowShape', label: 'Shape',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'straight', label: 'Straight',
                            contributions: {
                                caucasion: 2,
                                caspian: 2,   
                                hallstatt: 0,
                                eastNordic: 0,
                                tronder: +1,

                                ladogan: +1, 
                                eastBaltic: +1, 
                                northernSlavic: +1,
                                centralSlavic: +1,
                                ponticSlavic: +0.5,
                                alpine: +1,
                                
                                westernMediterranean: 0,
                                centralMediterranean: 0,
                                easternMediterranean: 0,
                                southernMediterranean: 0,

                                levantine: -1,
                                iranoAfghan: -1,
                                armenoid: -1,

                                northAsian: +3,
                                centralAsian: +2,
                                eastAsian: +3,

                                malay: +2,
                                
                                ethiopian: +1, 
                                subSaharan: +1, 
                                amerindian: +2, 
                                dinaric: +1 } },
                        { value: 'arched', label: 'Arched',
                            contributions: {
                                caucasion: 0,
        caspian: +1,

        hallstatt: +1,
        eastNordic: +1,
        tronder: +1,

        ladogan: 0,

        northernSlavic: +1,
        centralSlavic: +1,
        ponticSlavic: +1,

        alpine: 0,

        westernMediterranean: +1,
        centralMediterranean: +1,
        easternMediterranean: +1,
        southernMediterranean: 0,

        levantine: +1,
        iranoAfghan: +1,
        armenoid: 0,

        northAsian: -1,
        centralAsian: 0,
        eastAsian: -1,

        malay: 0,

        ethiopian: 0,
        subSaharan: 0,
        amerindian: -1,

        dinaric: +1 } },
                        { value: 'angled', label: 'Angled',
                            contributions: {
                                caucasion: +1,
        caspian: +1,

        hallstatt: +1,
        eastNordic: +1,
        tronder: +1,

        ladogan: +1,
        eastBaltic: 0,

        northernSlavic: 0,
        centralSlavic: 0,
        ponticSlavic: +1,

        alpine: 0,

        westernMediterranean: +1,
        centralMediterranean: +1,
        easternMediterranean: +1,
        southernMediterranean: 0,

        levantine: +1,
        iranoAfghan: +1,
        armenoid: +1,

        northAsian: +1,
        centralAsian: 0,
        eastAsian: +1,

        malay: 0,

        ethiopian: 0,
        subSaharan: 0,
        amerindian: +1,

        dinaric: +1 } }
                    ] }, { id: 'eyebrowDensity', label: 'Density',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'sparse', label: 'Sparse',
                            contributions: {
                                caucasion: -1,
                                caspian: 0,   
                                hallstatt: +2,
                                eastNordic: +1,
                                tronder: +1,
 
                                ladogan: +1, 
                                eastBaltic: +1, 
                                northernSlavic: +1,
                                centralSlavic: +1,
                                ponticSlavic: 0,


                                alpine: 0,
                                
                                mediterranean: 0, 
                                nearEastern: 0, 
                                eastAsian: -1, 
                                northAsian: -1, 
                                centralAsian: -1,

                                malay: -1,
                                
                                ethiopian: 0, 
                                subSaharan: 0, 
                                amerindian: -1, 
                                dinaric: 0 } },
                        { value: 'moderate', label: 'Moderate',
                            contributions: {
                                caucasion: 0,
        caspian: 0,

        nordic: 0,
        ladogan: 0,
        eastBaltic: 0,
        slavic: 0,
        alpine: 0,

        mediterranean: 0,
        nearEastern: 0,

        eastAsian: 0,
        northAsian: 0,
        malay: 0,

        ethiopian: 0,
        subSaharan: 0,
        amerindian: 0,

        dinaric: 0 } },
                        { value: 'dense', label: 'Dense / Bushy',
                            contributions: {
                                caucasion: 3,
                                caspian: 2,   
                                hallstatt: -1,
                                eastNordic: 0,
                                tronder: 0,
 
                                ladogan: 0, 
                                eastBaltic: 0, 
                                northernSlavic: 0,
                                centralSlavic: 0,
                                ponticSlavic: +1,
                                alpine: +1,
                                
                                westernMediterranean: +2,
                                centralMediterranean: +2,
                                easternMediterranean: +3,
                                southernMediterranean: +2,

                                levantine: +4,
                                iranoAfghan: +4,
                                armenoid: +5,

                                northAsian: -1,
                                centralAsian: 0,
                                eastAsian: -2,

                                malay: 0,
                                
                                ethiopian: +0, 
                                subSaharan: +1, 
                                amerindian: -1, 
                                dinaric: +2 } }
                    ] }, { id: 'eyebrowPosition', label: 'Position',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'low', label: 'Low (Close to Orbit)',
                            contributions: {
                                caucasion: 2,
                                caspian: 1,   
                                hallstatt: -1,
                                eastNordic: 0,
                                tronder: 0,

                                ladogan: 0, 
                                eastBaltic: +1, 
                                
                                northernSlavic: 0,
                                centralSlavic: 0,
                                ponticSlavic: +1,
 
                                alpine: +1,
                                
                                westernMediterranean: +1,
                                centralMediterranean: +1,
                                easternMediterranean: +2,
                                southernMediterranean: +1,

                                levantine: +2,
                                iranoAfghan: +2,
                                armenoid: +2,

                                northAsian: +1,
                                centralAsian: +1,
                                eastAsian: +1,

                                malay: +1,
                                
                                ethiopian: 0, 
                                subSaharan: +1, 
                                amerindian: +1, 
                                dinaric: +1 } },
                        { value: 'average', label: 'Average',
                            contributions: {
                                 caucasion: 0,
        caspian: 0,

        nordic: 0,
        ladogan: 0,
        eastBaltic: 0,
        slavic: 0,
        alpine: 0,

        mediterranean: 0,
        nearEastern: 0,

        eastAsian: 0,
        centralAsian: 0,
        northAsian: 0,
        malay: 0,

        ethiopian: 0,
        subSaharan: 0,
        amerindian: 0,

        dinaric: 0 } },
                        { value: 'high', label: 'High (Above Orbit)',
                            contributions: {
                                caucasion: 1,
                                caspian: 1,   
                                hallstatt: +3,
                                eastNordic: +2,
                                tronder: +1,
 
                                ladogan: +1, 
                                eastBaltic: 0, 
                                northernSlavic: +1,
                                centralSlavic: +1,
                                ponticSlavic: 0,
 
                                alpine: 0,
                                
                                mediterranean: +1, 
                                nearEastern: 0, 
                                eastAsian: -1,
                                northAsian: -1,
                                centralAsian: -1,
                                malay: -1,
                                
                                ethiopian: 0, 
                                subSaharan: -1, 
                                amerindian: -1, 
                                dinaric: 0 } }
                    ] }, {id: 'monobrow', label: 'Monobrow',
                    options: [
                         {value: '', label: '—', contributions: {}},
        {
            value: 'none',
            label: 'Absent',
            contributions: {
                                caucasion: 0.5,
                                caspian: 0,
                  
                                hallstatt: +2,
                                eastNordic: +2,
                                tronder: +1,
                                ladogan: +1, 
                                eastBaltic: +1, 
                                northernSlavic: +1,
                                centralSlavic: +1,
                                ponticSlavic: 0,
                
                                eastAsian: +1,
                                northAsian: +1,
                                centralAsian: -1,
            }
        },
        {
            value: 'slight',
            label: 'Slight',
            contributions: {
                                caucasion: 1,
                                caspian: 1,
                
                                westernMediterranean: +1,
                                centralMediterranean: +1,
                                easternMediterranean: +2,
                                southernMediterranean: +2,

                                levantine: +2,
                                iranoAfghan: +2,
                                armenoid: +2,

                                dinaric: +2,
                                ponticSlavic: +1,
                                centralAsian: +1,
            }
        },
        {
            value: 'moderate',
            label: 'Moderate',
            contributions: {
                                caucasion: 1,
                                caspian: 2,
                
                                westernMediterranean: +2,
                                centralMediterranean: +2,
                                easternMediterranean: +3,
                                southernMediterranean: +3,

                                levantine: +4,
                                iranoAfghan: +4,
                                armenoid: +5,

                                dinaric: +2,

                                hallstatt: -2,
                                eastNordic: -1,
                                centralAsian: +2,
            }
        },
        {
            value: 'strong',
            label: 'Strong / Complete',
            contributions: {
                                caucasion: 0,
                                caspian: 1,
                
                                westernMediterranean: +2,
                                centralMediterranean: +2,
                                easternMediterranean: +4,
                                southernMediterranean: +3,

                                levantine: +6,
                                iranoAfghan: +5,
                                armenoid: +6,

                                dinaric: +3,

                                hallstatt: -3,
                                eastNordic: -2,

                                eastAsian: -2,
                                centralAsian: +1.5,
                                northAsian: -2
            }
        }
    ]

                    }
            ]
        }, {
            id: 'browRidges',
            number: 16,
            weightClass: 'C+',
            title: 'Brow Ridges (Supraorbital Ridge)',
            definition: 'Degree of development of the supraorbital torus above the eye sockets.',
            measurement: 'Visual assessment and palpation of the supraorbital region.',
            unit: 'Categorical',
            guideImage: 'brow-ridges.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
            type: 'select',
            options: [
                { value: '', label: '— Select Brow Ridge Type —', contributions: {} },
                { value: 'weak', label: 'Weak / Smooth',
                    contributions: {
                                caucasion: -3.5,
                                caspian: 0,   
                                hallstatt: +2,
                                eastNordic: +1,
                                tronder: +1,
                                ladogan: +1, 
                                eastBaltic: +1, 
                                northernSlavic: +2,
                                centralSlavic: +2,
                                ponticSlavic: +1,

                                alpine: 0,
                        
                                westernMediterranean: +1,
                                centralMediterranean: +1,
                                easternMediterranean: +1,
                                southernMediterranean: +1,

                                levantine: +1,
                                iranoAfghan: 0,
                                armenoid: -1,

                                northAsian: +2,
                                centralAsian: +2,
                                eastAsian: +2,

                                malay: +2,
                        
                                ethiopian: +1, 
                                subSaharan: 0, 
                                amerindian: +2, 
                                dinaric: 0 } },
                { value: 'moderate', label: 'Moderate',
                    contributions: {
                                caucasion: 2,
                                caspian: 2,   
                                nordic: +2, 
                                ladogan: +1, 
                                eastBaltic: +1, 
                                slavic: +2, 
                                alpine: +1,
                        
                                mediterranean: +2, 
                                nearEastern: +2, 
                                eastAsian: 0, 
                                centralAsian: 0,
                                northAsian: 0, 
                                malay: +1,
                        
                                ethiopian: +1, 
                                subSaharan: +1, 
                                amerindian: 0, 
                                dinaric: +2 } },
                { value: 'strong', label: 'Strong / Pronounced',
                    contributions: {
                                caucasion: 4,
                                caspian: 3,   
                                hallstatt: 0,
                                eastNordic: +1,
                                tronder: +1,

                                ladogan: 0, 
                                eastBaltic: 0, 
                                northernSlavic: 0,
                                centralSlavic: 0,
                                ponticSlavic: +1,
                                alpine: +2,
                        
                                westernMediterranean: +1,
                                centralMediterranean: +2,
                                easternMediterranean: +2,
                                southernMediterranean: +2,

                                levantine: +2,
                                iranoAfghan: +3,
                                armenoid: +4,

                                northAsian: -2,
                                centralAsian: -1,
                                eastAsian: -2,

                                malay: -1,
                        
                                ethiopian: +2, 
                                subSaharan: +2, 
                                amerindian: -1, 
                                dinaric: +1 } },
                { value: 'veryStrong', label: 'Very Strong / Heavy',
                    contributions: {
                                caucasion: 3,
                                caspian: 2,   
                                hallstatt: -2,
                                eastNordic: -2,
                                tronder: -1,

 
                                ladogan: -1, 
                                eastBaltic: -1, 
                                northernSlavic: -1,
                                centralSlavic: -1,
                                ponticSlavic: 0,

                                alpine: +1,
                        
                                westernMediterranean: +1,
                                centralMediterranean: +2,
                                easternMediterranean: +3,
                                southernMediterranean: +2,

                                levantine: +3,
                                iranoAfghan: +4,
                                armenoid: +5,

                                northAsian: -4,
                                centralAsian: -3,
                                eastAsian: -4,

                                malay: -2,
                        
                                ethiopian: +3, 
                                subSaharan: +3, 
                                amerindian: -3, 
                                dinaric: 0 } }
            ]
        }, 
        
        {
            id: 'ears',
            number: 17,
            weightClass: 'C-',
            title: 'Ear Morphology',
            definition: 'Assessment of ear size, projection (protrusion), lobe type, and helix form.',
            measurement: 'Visual assessment.',
            unit: 'Categorical (4 sub-traits)',
            guideImage: 'ear-morphology.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
            type: 'composite',
            subTraits: [
                { id: 'earSize', label: 'Size',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'small', label: 'Small',
                            contributions: {
                                caucasion: 0,
                                caspian: 0,   
                                nordic: 0, 
                                ladogan: 0, 
                                eastBaltic: 0, 
                                slavic: 0, 
                                alpine: 0,
                                
                                mediterranean: 0, 
                                nearEastern: 0, 
                                eastAsian: 1, 
                                centralAsian: 0,
                                northAsian: 1, 
                                malay: 0,
                                
                                ethiopian: 0, 
                                subSaharan: -1, 
                                amerindian: 0, 
                                dinaric: 0 } },
                        { value: 'average', label: 'Average',
                            contributions: {
                                caucasion: 0,
                                caspian: 0,   
                                nordic: 0, 
                                ladogan: 0, 
                                eastBaltic: 0, 
                                slavic: 0, 
                                alpine: 0,
                                
                                mediterranean: 0, 
                                nearEastern: 0, 
                                eastAsian: 0, 
                                centralAsian: 0,
                                northAsian: 0, 
                                malay: 0,
                                
                                ethiopian: 0, 
                                subSaharan: 0, 
                                amerindian: 0, 
                                dinaric: 0 } },
                        { value: 'large', label: 'Large',
                            contributions: {
                                caucasion: 0,
                                caspian: 0,   
                                nordic: -1, 
                                ladogan: 0, 
                                eastBaltic: 0, 
                                slavic: 0, 
                                alpine: 0,
                                
                                mediterranean: 0, 
                                nearEastern: 0, 
                                eastAsian: 0, 
                                centralAsian: 0,
                                northAsian: 0, 
                                malay: 0,
                                
                                ethiopian: 1, 
                                subSaharan: 1, 
                                amerindian: 0, 
                                dinaric: 0 } }
                    ] }, { id: 'earProjection', label: 'Projection',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'flat', label: 'Flat / Close to Head',
                            contributions: {
                                caucasion: 0,
                                caspian: 0,   
                                nordic: 0, 
                                ladogan: 0, 
                                eastBaltic: 0, 
                                slavic: 0, 
                                alpine: 0,
                                
                                mediterranean: 0, 
                                nearEastern: 0, 
                                eastAsian: 0, 
                                centralAsian: 0,
                                northAsian: 0, 
                                malay: 0,
                                
                                ethiopian: 0, 
                                subSaharan: 0, 
                                amerindian: 0, 
                                dinaric: 0  } },
                        { value: 'moderate', label: 'Moderate',
                            contributions: {
                                caucasion: 0,
                                caspian: 0,   
                                nordic: 0, 
                                ladogan: 0, 
                                eastBaltic: 0, 
                                slavic: 0, 
                                alpine: 0,
                                
                                mediterranean: 0, 
                                nearEastern: 0, 
                                eastAsian: 0, 
                                centralAsian: 0,
                                northAsian: 0, 
                                malay: 0,
                                
                                ethiopian: 0, 
                                subSaharan: 0, 
                                amerindian: 0, 
                                dinaric: 0  } },
                        { value: 'protruding', label: 'Protruding',
                            contributions: {
                                caucasion: 0,
                                caspian: 0,   
                                nordic: 0, 
                                ladogan: 0, 
                                eastBaltic: 0, 
                                slavic: 0, 
                                alpine: 0,
                                
                                mediterranean: 0, 
                                nearEastern: 0, 
                                eastAsian: 0, 
                                centralAsian: 0,
                                northAsian: 0, 
                                malay: 0,
                                
                                ethiopian: 0, 
                                subSaharan: 1, 
                                amerindian: 0, 
                                dinaric: 0  } }
                    ] }, { id: 'earLobe', label: 'Lobe Type',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'attached', label: 'Attached',
                            contributions: {
                                caucasion: 0,
                                caspian: 0,   
                                nordic: 0, 
                                ladogan: 0, 
                                eastBaltic: 0, 
                                slavic: 0, 
                                alpine: 0,
                                
                                mediterranean: 0, 
                                nearEastern: 0, 
                                eastAsian: 1, 
                                centralAsian: 1,
                                northAsian: 1, 
                                malay: 1, 
                                
                                ethiopian: 0, 
                                subSaharan: 0, 
                                amerindian: 1, 
                                dinaric: 0 } },
                        { value: 'free', label: 'Free / Pendulous',
                            contributions: {
                                caucasion: 0,
                                caspian: 0,   
                                nordic: 0, 
                                ladogan: 0, 
                                eastBaltic: 0, 
                                slavic: 0, 
                                alpine: 0,
                                
                                mediterranean: 0, 
                                nearEastern: 0, 
                                eastAsian: 0, 
                                centralAsian: 0,
                                northAsian: 0, 
                                malay: 0,
                                
                                ethiopian: 0, 
                                subSaharan: 0, 
                                amerindian: 0, 
                                dinaric: 0 } }
                    ] }, { id: 'earHelix', label: 'Helix Form',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'regular', label: 'Regular / Rolled',
                            contributions: {
                                caucasion: 0,
                                caspian: 0,   
                                nordic: 0, 
                                ladogan: 0, 
                                eastBaltic: 0, 
                                slavic: 0, 
                                alpine: 0,
                                
                                mediterranean: 0, 
                                nearEastern: 0, 
                                eastAsian: 0, 
                                centralAsian: 0,
                                northAsian: 0, 
                                malay: 0,
                                
                                ethiopian: 0, 
                                subSaharan: 0, 
                                amerindian: 0, 
                                dinaric: 0  } },
                        { value: 'flat', label: 'Flat / Unrolled',
                            contributions: {
                                caucasion: 0,
                                caspian: 0,   
                                nordic: 0, 
                                ladogan: 0, 
                                eastBaltic: 0, 
                                slavic: 0, 
                                alpine: 0,
                                
                                mediterranean: 0, 
                                nearEastern: 0, 
                                eastAsian: 0, 
                                northAsian: 0, 
                                malay: 0,
                                
                                ethiopian: 0, 
                                subSaharan: 0, 
                                amerindian: 0, 
                                dinaric: 0 } },
                        { value: 'prominent', label: 'Prominent Antihelix',
                            contributions: {
                                caucasion: 0,
                                caspian: 0,   
                                nordic: 0, 
                                ladogan: 0, 
                                eastBaltic: 0, 
                                slavic: 0, 
                                alpine: 0,
                                
                                mediterranean: 0, 
                                nearEastern: 0, 
                                eastAsian: -1, 
                                northAsian: -1, 
                                malay: -1,
                                
                                ethiopian: 0, 
                                subSaharan: 0, 
                                amerindian: -1, 
                                dinaric: 0 } }
                    ] }
            ]
        }, {
            id: 'height',
            number: 18,
            weightClass: 'C',
            title: 'Stature (Height)',
            definition: 'Total standing height measured via anthropometer.',
            measurement: 'Anthropometer: vertex to floor in standing position.',
            unit: 'Categorical',
            guideImage: null,       // ← Set to e.g. 'eye-color.jpg' to show a guide image
            type: 'select',
            options: [
                { value: '', label: '— Select Height Category —', contributions: {} },
                { value: 'veryShort', label: 'Very Short (< 155 cm / < 5\'1")',
                    contributions: {
                                caucasion: -1,
                                caspian: 0,   
                                hallstatt: -5,
                                eastNordic: -4,
                                tronder: -3,


                                ladogan: -2, 
                                eastBaltic: -3, 
                                northernSlavic: -2,
                                centralSlavic: -2,
                                ponticSlavic: -2,

                                alpine: +4,
                        
                                westernMediterranean: +2,
                                centralMediterranean: +2,
                                easternMediterranean: +1,
                                southernMediterranean: +2,
 
                                levantine: +1,
                                iranoAfghan: 0,
                                armenoid: +2,

                                northAsian: -1,
                                centralAsian: -1,
                                eastAsian: 0,

                                malay: +3,
                        
                                ethiopian: +1, 
                                subSaharan: 0, 
                                amerindian: 0, 
                                dinaric: -3 } },
                { value: 'short', label: 'Short (155–164 cm / 5\'1"–5\'5")',
                    contributions: {
                                caucasion: 0,
                                caspian: 1,   
                                hallstatt: -3,
                                eastNordic: -2,
                                tronder: -1,

                                ladogan: -1, 
                                eastBaltic: -1, 
                                northernSlavic: -1,
                                centralSlavic: -1,
                                ponticSlavic: -1,
                                alpine: +3,
                        
                                westernMediterranean: +3,
                                centralMediterranean: +2,
                                easternMediterranean: +2,
                                southernMediterranean: +2,

                                levantine: +2,
                                iranoAfghan: +1,
                                armenoid: +2,

                                northAsian: 0,
                                centralAsian: 0,
                                eastAsian: +1,

                                malay: +2,
                        
                                ethiopian: +1, 
                                subSaharan: +1, 
                                amerindian: +1, 
                                dinaric: -1 } },
                { value: 'average', label: 'Average (165–174 cm / 5\'5"–5\'9")',
                    contributions: {
                                caucasion: 2,
                                caspian: 2,   
                                hallstatt: 0,
                                eastNordic: +1,
                                tronder: +2,
 
                                ladogan: +2, 
                                eastBaltic: +2, 
                                northernSlavic: +3,
                                centralSlavic: +3,
                                ponticSlavic: +2.5,

                                alpine: +1,
                        
                                westernMediterranean: +2,
                                centralMediterranean: +2,
                                easternMediterranean: +2,
                                southernMediterranean: +2,

                                levantine: +2,
                                iranoAfghan: +2,
                                armenoid: +2,


                                northAsian: +2,
                                centralAsian: +2,
                                eastAsian: +2,
                                malay: +1,
                        
                                ethiopian: +1, 
                                subSaharan: +2, 
                                amerindian: +2, 
                                dinaric: +3 } },
                { value: 'tall', label: 'Tall (175–184 cm / 5\'9"–6\'0")',
                    contributions: {
                                caucasion: 2,
                                caspian: 2,   
                                hallstatt: +5,
                                eastNordic: +4,
                                tronder: +5,

                                ladogan: +3, 
                                eastBaltic: +2, 
                                northernSlavic: +4,
                                centralSlavic: +3.5,
                                ponticSlavic: +3.5,

                                alpine: -1,
                        
                                westernMediterranean: +1,
                                centralMediterranean: +1,
                                easternMediterranean: 0,
                                southernMediterranean: 0,

                                levantine: 0,
                                iranoAfghan: +1,
                                armenoid: 0,

                                northAsian: +1,
                                centralAsian: +2,
                                eastAsian: +1,

                                malay: -1,
                        
                                ethiopian: +3, 
                                subSaharan: +4, 
                                amerindian: +1, 
                                dinaric: +5 } },
                { value: 'veryTall', label: 'Very Tall (> 184 cm / > 6\'0")',
                    contributions: {
                                caucasion: 1,
                                caspian: 1,   
                                hallstatt: +6,
                                eastNordic: +5,
                                tronder: +7,

                                ladogan: +4, 
                                eastBaltic: +3, 
                                northernSlavic: +5,
                                centralSlavic: +4.5,
                                ponticSlavic: +4.75,

                                alpine: -3,
                        
                                westernMediterranean: -1,
                                centralMediterranean: 0,
                                easternMediterranean: -1,
                                southernMediterranean: -2,

                                levantine: -1,
                                iranoAfghan: 0,
                                armenoid: -1,

                                northAsian: 0,
                                centralAsian: 0,
                                eastAsian: 0,

                                malay: -3,
                        
                                ethiopian: +5, 
                                subSaharan: +6, 
                                amerindian: 0, 
                                dinaric: +6.5 } }
            ]
        }, 
        

{
  id: 'lipFullness',
  number: 19,
  weightClass: 'B+',
  title: 'Lip Fullness',
  definition: 'Thickness and eversion of the integumental lips, a trait heavily emphasized in classical racial typology.',
  measurement: 'Visual assessment of the red lip portion in closed mouth position.',
  unit: 'Categorical',
  guideImage: 'lip-fullness.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
  type: 'select',
  options: [
    { value: '', label: '— Select Lip Fullness —', contributions: {} },
    {
      value: 'thin',
      label: 'Thin / Compressed',
      contributions: {
                                caucasion: 0,
                                caspian: 1,
          
                                hallstatt: +3,
                                eastNordic: +2,
                                tronder: +2,

                                ladogan: +2, 
                                eastBaltic: +1, 
                                slavic: +2, 
                                alpine: +1,
        
                                westernMediterranean: 0,
                                centralMediterranean: -1,
                                easternMediterranean: -2,
                                southernMediterranean: -2,

                                levantine: -2,
                                iranoAfghan: -1,
                                armenoid: +1,

                                northAsian: +2,
                                centralAsian: +2,
                                eastAsian: +3,

                                malay: -1,
        
                                ethiopian: -3, 
                                subSaharan: -4, 
                                amerindian: +2, 
                                dinaric: +1.5
      }
    },
    {
      value: 'medium',
      label: 'Medium / Moderate',
      contributions: {
                                caucasion: 2,
                                caspian: 2,
          
                                hallstatt: 0,
                                eastNordic: +1,
                                tronder: +1,
                                ladogan: +1, 
                                eastBaltic: +1, 
                                northernSlavic: +1,
                                centralSlavic: +2,
                                ponticSlavic: +2,
 
                                alpine: +2,
        
                                westernMediterranean: +2,
                                centralMediterranean: +3,
                                easternMediterranean: +3,
                                southernMediterranean: +2,


                                levantine: +3,
                                iranoAfghan: +2,
                                armenoid: +2,

                                northAsian: 0,
                                centralAsian: +1,
                                eastAsian: 0,


                                malay: +1,
        
                                ethiopian: 0, 
                                subSaharan: -1, 
                                amerindian: +1, 
                                dinaric: +1
      }
    },
    {
      value: 'thick',
      label: 'Thick / Full',
      contributions: {
                                caucasion: 1,
                                caspian: 1,
          
                                hallstatt: -2,
                                eastNordic: -2,
                                tronder: -2,


                                ladogan: -1, 
                                eastBaltic: -1, 
                                northernSlavic: -1,
                                centralSlavic: -1,
                                ponticSlavic: 0, 
                                alpine: -1,
        
                                westernMediterranean: +2,
                                centralMediterranean: +3,
                                easternMediterranean: +4,
                                southernMediterranean: +3,

                                levantine: +4,
                                iranoAfghan: +2,
                                armenoid: +3,

                                northAsian: -2,
                                centralAsian: -1,
                                eastAsian: -2,

                                malay: +3,
        
                                ethiopian: +4, 
                                subSaharan: +4, 
                                amerindian: 0, 
                                dinaric: -1
      }
    },
    {
      value: 'veryThick',
      label: 'Very Thick / Everted',
      contributions: {
                                caucasion: -1,
                                caspian: -1,
          
                                hallstatt: -4,
                                eastNordic: -4,
                                tronder: -4,

                                ladogan: -3, 
                                eastBaltic: -3, 
                                northernSlavic: -3,
                                centralSlavic: -3,
                                ponticSlavic: -2, 
                                alpine: -3,
        
                                westernMediterranean: -1,
                                centralMediterranean: 0,
                                easternMediterranean: +1,
                                southernMediterranean: 0,

                                levantine: +2,
                                iranoAfghan: 0,
                                armenoid: +2,

                                northAsian: -4,
                                centralAsian: -3,
                                eastAsian: -4,

                                malay: +2,
        
                                ethiopian: +6, 
                                subSaharan: +8, 
                                amerindian: -2, 
                                dinaric: -3
      }
    }
  ]
},

{
  id: 'prognathism',
  number: 20,
  weightClass: 'A',
  title: 'Prognathism',
  definition: 'Degree of forward projection of the alveolar region and lower face relative to the cranial base.',
  measurement: 'Visual assessment in profile, often using a vertical line from the nasion.',
  unit: 'Categorical',
  guideImage: 'prognathism.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
  type: 'select',
  options: [
    { value: '', label: '— Select Prognathism —', contributions: {} },
    {
      value: 'orthognathous',
      label: 'Orthognathous (Flat/Straight profile)',
      contributions: {
                                caucasion: 2,
                                caspian: 2,
          
                                hallstatt: +6,
                                eastNordic: +5,
                                tronder: +5,
 
                                ladogan: +3, 
                                eastBaltic: +3, 
                                northernSlavic: +3.25,
                                centralSlavic: +3.25,
                                ponticSlavic: +3.25,

                                alpine: +2,
        
                                westernMediterranean: +3,
                                centralMediterranean: +2,
                                easternMediterranean: +2,
                                southernMediterranean: +2,

                                levantine: +2,
                                iranoAfghan: +2,
                                armenoid: +2,

                                northAsian: +4,
                                centralAsian: +3,
                                eastAsian: +6,

                                malay: -1,
        
                                ethiopian: -2, 
                                subSaharan: -5, 
                                amerindian: +3, 
                                dinaric: +3
      },
        balanceSynergy: {
                                                ethiopian: 0.15,
                                                subSaharan: 0.2,
                                              },
        negativeSynergy: {
                        ethiopian: 0.25,
                        subSaharan: 0.3,
                    }                                       
    },
    {
      value: 'mesognathous',
      label: 'Mesognathous (Moderate projection)',
      contributions: {
                                caucasion: 1,
                                caspian: 1,
          
                                nordic: 0, 
                                ladogan: +1, 
                                eastBaltic: +1, 
                                northernSlavic: -0.5,
                                centralSlavic: 0,
                                ponticSlavic: +1,
 
                                alpine: 0,
        
                                westernMediterranean: +2,
                                centralMediterranean: +3,
                                easternMediterranean: +3,
                                southernMediterranean: +3,

                                levantine: +3,
                                iranoAfghan: +2,
                                armenoid: +2,

                                northAsian: +1,
                                centralAsian: +2,
                                eastAsian: 0,

                                malay: +4,
        
                                ethiopian: +2, 
                                subSaharan: +2, 
                                amerindian: +1, 
                                dinaric: 0
      }
    },
    {
      value: 'prognathous',
      label: 'Prognathous (Marked projection)',
      contributions: {
                                caucasion: -3,
                                caspian: -3,
          
                                hallstatt: -6,
                                eastNordic: -5,
                                tronder: -5,


                                ladogan: -4, 
                                eastBaltic: -3, 
                                northernSlavic: -5,
                                centralSlavic: -5,
                                ponticSlavic: -4,

                                alpine: -3,
        
                                westernMediterranean: -4,
                                centralMediterranean: -3,
                                easternMediterranean: -2,
                                southernMediterranean: -2,

                                levantine: -2,
                                iranoAfghan: -1,
                                armenoid: -1,

                                northAsian: -4,
                                centralAsian: -2,
                                eastAsian: -5,

                                malay: +1,
        
                                ethiopian: +7, 
                                subSaharan: +10, 
                                amerindian: -2, 
                                dinaric: -4
      },
      positiveSynergy: {
                        subSaharan: 0.25,
                        ethiopian: 0.15
                        } 
    }
  ]
},

{
  id: 'occipitalContour',
  number: 21,
  weightClass: 'B',
  title: 'Occipital Contour',
  definition: 'Shape of the back of the skull, often associated with cephalic index but independently assessed.',
  measurement: 'Visual and tactile examination of the occiput.',
  unit: 'Categorical',
  guideImage: 'occipital-contour.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
  type: 'select',
  options: [
    { value: '', label: '— Select Occipital Contour —', contributions: {} },
    {
      value: 'flat',
      label: 'Flat / Planoccipital',
      contributions: {
                                caucasion: 1.5,
                                caspian: -1,
          
                                hallstatt: -4,
                                eastNordic: -2,
                                tronder: -2,

                                ladogan: +3, 
                                eastBaltic: +5, 
                                northernSlavic: +2,
                                centralSlavic: +3,
                                ponticSlavic: +1,
 
                                alpine: +5,
        
                                westernMediterranean: -2,
                                centralMediterranean: -2,
                                easternMediterranean: -1,
                                southernMediterranean: -2,

                                levantine: +1,
                                iranoAfghan: 0,
                                armenoid: +2,

                                eastAsian: +6,
                                northAsian: +7,
                                centralAsian: +4,
 
                                malay: +4,
        
                                ethiopian: 0, 
                                subSaharan: -2, 
                                amerindian: +5, 
                                dinaric: +1
      }
    },
    {
      value: 'rounded',
      label: 'Rounded / Curved',
      contributions: {
                                caucasion: 0.5,
                                caspian: 2,
          
                                hallstatt: +1,
                                eastNordic: +2,
                                tronder: +2,

                                ladogan: +1, 
                                eastBaltic: -1, 
                                northernSlavic: +1,
                                centralSlavic: +2,
                                ponticSlavic: +2,

                                alpine: -1,
        
                                westernMediterranean: +2,
                                centralMediterranean: +2,
                                easternMediterranean: +2,
                                southernMediterranean: +2,

                                levantine: +2,
                                iranoAfghan: +2,
                                armenoid: +1,

                                eastAsian: -2,
                                northAsian: -2,
                                centralAsian: -1,

                                malay: -2,
        
                                ethiopian: +1, 
                                subSaharan: +1, 
                                amerindian: -2, 
                                dinaric: 0
      }
    },
    {
      value: 'projecting',
      label: 'Projecting / Bun',
      contributions: {
                                caucasion: -1,
                                caspian: 4,
          
                                hallstatt: +6,
                                eastNordic: +5,
                                tronder: +4,

                                ladogan: -2, 
                                eastBaltic: -3, 
                                northernSlavic: -2, 
                                centralSlavic: -2, 
                                ponticSlavic: -1, 
                                alpine: -3,
        
                                westernMediterranean: +3,
                                centralMediterranean: +2,
                                easternMediterranean: +1,
                                southernMediterranean: +2,

                                levantine: 0,
                                iranoAfghan: +1,
                                armenoid: -2,

                                eastAsian: -5,
                                northAsian: -6,
                                centralAsian: -4,

                                malay: -3,
        
                                ethiopian: +2, 
                                subSaharan: +3, 
                                amerindian: -4, 
                                dinaric: -2
      }
    }
  ]
},

{
    id: 'eyeDepth',
    number: 22,
    weightClass: 'B',
    title: 'Eye Depth (Orbital Depth)',
    definition: 'Relative position of the eyeball within the orbital cavity. Assesses whether the eyes appear deep-set, average, or prominent in profile and frontal view.',
    measurement: 'Visual assessment from profile and three-quarter view. Compare prominence of the eyeball relative to the brow ridges, upper eyelid, and orbital rim.',
    unit: 'Categorical',
    guideImage: 'eye-depth.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
    type: 'select',
    options: [
        { value: '', label: '— Select Eye Depth —', contributions: {} },

        {
            value: 'deepSet',
            label: 'Deep-set',
            contributions: {
                                caucasion: 3,
                                caspian: 2,
                  
                                hallstatt: +5,
                                eastNordic: +4,
                                tronder: +3,


                                ladogan: +2, 
                                eastBaltic: +1, 
                                northernSlavic: +2,
                                centralSlavic: +2,
                                ponticSlavic: +3,

                
                                alpine: 0, 
                                westernMediterranean: +3,
                                centralMediterranean: +2,
                                easternMediterranean: +2,
                                southernMediterranean: +2,
 
                                levantine: +2,
                                iranoAfghan: +2,
                                armenoid: +2,

                                eastAsian: -3,
                                northAsian: -3,
                                centralAsian: -2,

                                malay: -1,
                
                                ethiopian: 0, 
                                subSaharan: -1,
                
                                amerindian: -1, 
                                dinaric: +2
            }
        },

        {
            value: 'average',
            label: 'Average',
            contributions: {
                                caucasion: 2,
                                caspian: 2,
                  
                                nordic: +1, 
                                ladogan: +1, 
                                eastBaltic: +1, 
                                slavic: +2,
                
                                alpine: +2, 
                                mediterranean: +2, 
                                levantine: +2,
                                iranoAfghan: +1,
                                armenoid: +1,
                
                                eastAsian: +1, 
                                centralAsian: +1,
                                northAsian: +1, 
                                malay: +1,
                
                                ethiopian: +1, 
                                subSaharan: +1,
                
                                amerindian: +1, 
                                dinaric: +1
            }
        },

        {
            value: 'prominent',
            label: 'Prominent / Protruding',
            contributions: {
                                caucasion: 0,
                                caspian: 0,
                  
                                hallstatt: -2,
                                eastNordic: -2,
                                tronder: -1,

                                ladogan: -1, 
                                eastBaltic: 0, 
                                slavic: 0,
                
                                alpine: +1, 
                                westernMediterranean: +1,
                                centralMediterranean: +2,
                                easternMediterranean: +2,
                                southernMediterranean: +2,

                                levantine: +2,
                                iranoAfghan: 0,
                                armenoid: -2,

                                eastAsian: +3,
                                northAsian: +3,
                                centralAsian: +2,

                                malay: +2,
                
                                ethiopian: +2, 
                                subSaharan: +2,
                
                                amerindian: +1, 
                                dinaric: 0
            }
        }
    ]
},


{
    id: 'nasalBridgeHeight',
    number: 23,
    weightClass: 'B',
    title: 'Nasal Bridge Height',
    definition: 'Vertical prominence of the nasal bridge relative to the facial plane. Historically considered one of the major descriptive traits in physical anthropology.',
    measurement: 'Visual assessment from profile and frontal view. Evaluate how strongly the nasal bridge projects between the eyes.',
    unit: 'Categorical',
    guideImage: 'nasal-bridge-height.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
    type: 'select',
    options: [
        { value: '', label: '— Select Nasal Bridge Height —', contributions: {} },

        {
            value: 'low',
            label: 'Low Bridge',
            contributions: {
                                caucasion: -5,
                                caspian: -4,
                  
                                hallstatt: -4,
                                eastNordic: -3,
                                tronder: -2,
 
                                ladogan: -1, 
                                eastBaltic: 0, 
                                northernSlavic: -1,
                                centralSlavic: -1,
                                ponticSlavic: -2,

                
                                alpine: +4, 
                                westernMediterranean: -2,
                                centralMediterranean: -2,
                                easternMediterranean: -2,
                                southernMediterranean: -3,

                                levantine: -4,
                                iranoAfghan: -5,
                                armenoid: -5,

                                eastAsian: +6,
                                northAsian: +7,
                                centralAsian: +5,

                                malay: +5,
                
                                ethiopian: 0, 
                                subSaharan: +1,
                
                                amerindian: +4, 
                                dinaric: -4
            },
            positiveSynergy: { northAsian: 0.20 }
        },

        {
            value: 'medium',
            label: 'Medium Bridge',
            contributions: {
                                caucasion: 2,
                                caspian: 2,
                  
                                hallstatt: +1,
                                eastNordic: +2,
                                tronder: +2,
 
                                ladogan: +1, 
                                eastBaltic: +1, 
                                northernSlavic: +2,
                                centralSlavic: +2,
                                ponticSlavic: +2,

                
                                alpine: +2, 
                                westernMediterranean: +2,
                                centralMediterranean: +2,
                                easternMediterranean: +2,
                                southernMediterranean: +2,

                                levantine: +2,
                                iranoAfghan: +2,
                                armenoid: +1,

                                eastAsian: 0,
                                northAsian: 0,
                                centralAsian: +1,

                                malay: +1,
                
                                ethiopian: +1, 
                                subSaharan: +1,
                
                                amerindian: +1, 
                                dinaric: +1
            }
        },

        {
            value: 'high',
            label: 'High Bridge',
            contributions: {
                                caucasion: 6,
                                caspian: 5,
                  
                                hallstatt: +6,
                                eastNordic: +5,
                                tronder: +4,

                                ladogan: +3, 
                                eastBaltic: +1, 
                                northernSlavic: +3,
                                centralSlavic: +3,
                                ponticSlavic: +4,
                
                                alpine: 0, 
                                westernMediterranean: +3,
                                centralMediterranean: +4,
                                easternMediterranean: +5,
                                southernMediterranean: +4,

                                levantine: +6,
                                iranoAfghan: +7,
                                armenoid: +8,

                                eastAsian: -5,
                                northAsian: -6,
                                centralAsian: -3,

                                malay: -3,
                
                                ethiopian: +1, 
                                subSaharan: -2,
                
                                amerindian: -3, 
                                dinaric: +7
            },
        }
    ]
},

{
    id: 'facialIndex',
    number: 24,
    weightClass: 'A',
    title: 'Facial Index',
    definition: 'Ratio of face height (nasion-gnathion) to bizygomatic width x 100. Classifies facial proportions from hypereuryprosopic (very wide) to hyperleptoprosopic (very narrow).',
    measurement: 'Measure face height from the nasion (bridge of nose) vertically down to the gnathion (lowest point of chin). Measure bizygomatic width between the most lateral points of the cheekbones. Divide height by width and multiply by 100.',
    unit: 'Index value -> hypereuryprosopic / euryprosopic / mesoprosopic / leptoprosopic / hyperleptoprosopic',
    guideImage: 'facial-index.png',
    type: 'index',
    options: [
        { value: '', label: '— Enter measurements or select category —', contributions: {} },
        { value: 'hypereuryprosopic', label: 'Hypereuryprosopic (< 80)',
            contributions: {
                                caucasion: 5,
                                caspian: -1,   
                                hallstatt: -5,
                                eastNordic: -4,
                                tronder: -3,

                                alpine: +5.5,
                                northernSlavic: +2,
                                centralSlavic: +2,
                                ponticSlavic: +1,

                                eastBaltic: +5, 
                                westernMediterranean: -4,
                                centralMediterranean: -3,
                                easternMediterranean: -2,
                                southernMediterranean: -3,

                                levantine: -1,
                                iranoAfghan: -4,
                                armenoid: +2,

                                eastAsian: +3,
                                northAsian: +6,
                                centralAsian: +4,
                                amerindian: +3,
                                ethiopian: -2,
                                subSaharan: -2,

                                dinaric: -3 },
            positiveSynergy: { northAsian: 0.15 } },
        { value: 'euryprosopic', label: 'Euryprosopic (80-85)',
            contributions: {
                                caucasion: 4,
                                caspian: 0,   
                                hallstatt: -3,
                                eastNordic: -2,
                                tronder: -1,


                                alpine: +3, 
                                northernSlavic: +2,
                                centralSlavic: +2,
                                ponticSlavic: +2,

                                eastBaltic: +4, 
                                westernMediterranean: -2,
                                centralMediterranean: -1,
                                easternMediterranean: 0,
                                southernMediterranean: -1,

                                levantine: +1,
                                iranoAfghan: -2,
                                armenoid: +2,

                                eastAsian: +2,
                                northAsian: +4,
                                centralAsian: +3,
                                malay: +3,
                                amerindian: +3,
                                ethiopian: 0,
                                subSaharan: -1,


                                dinaric: -1 } },
        { value: 'mesoprosopic', label: 'Mesoprosopic (85-90)',
            contributions: {
                                caucasion: -2,
                                caspian: 3,   
                                hallstatt: +1,
                                eastNordic: +2,
                                tronder: +2,

eastBaltic: +2,
ladogan: +2,

northernSlavic: +2,
centralSlavic: +3,
ponticSlavic: +3,

alpine: +2,
dinaric: +2,

westernMediterranean: +2,
centralMediterranean: +2,
easternMediterranean: +2,
southernMediterranean: +2,

levantine: +3,
iranoAfghan: +2,
armenoid: +2,

eastAsian: +2,
northAsian: +2,
centralAsian: +2,

malay: +2,
amerindian: +2,

ethiopian: +2,
subSaharan: +2 } },
        { value: 'leptoprosopic', label: 'Leptoprosopic (90-95)',
            contributions: {
                                caucasion: -2,
                                caspian: 3,   
                                hallstatt: +4,
                                eastNordic: +4,
                                tronder: +3,

                                eastBaltic: 0,
                                ladogan: +1,

                                northernSlavic: +2,
                                centralSlavic: +2,
                                ponticSlavic: +3,

                                alpine: -2,
                                dinaric: +4,

                                westernMediterranean: +4,
                                centralMediterranean: +4,
                                easternMediterranean: +3,
                                southernMediterranean: +3,

                                levantine: +3,
                                iranoAfghan: +5,
                                armenoid: +2,

                                eastAsian: -2,
                                northAsian: -2,
                                centralAsian: -1,

                                malay: -1,
                                amerindian: -2,

                                ethiopian: +2,
                                subSaharan: +2 } },
        { value: 'hyperleptoprosopic', label: 'Hyperleptoprosopic (> 95)',
            contributions: {
                                caucasion: -4,
                                caspian: 0,   
                                hallstatt: +6,
                                eastNordic: +5,
                                tronder: +4,

                                eastBaltic: -2,
                                ladogan: -1,

                                northernSlavic: 0,
                                centralSlavic: 0,
                                ponticSlavic: +2,

                                alpine: -4,
                                dinaric: +6,

                                westernMediterranean: +5,
                                centralMediterranean: +5,
                                easternMediterranean: +4,
                                southernMediterranean: +4,

                                levantine: +4,
                                iranoAfghan: +4.5,
                                armenoid: -2,

                                eastAsian: -3,
                                northAsian: -3,
                                centralAsian: -2,

                                malay: -2,
                                amerindian: -3,

                                ethiopian: +3,
                                subSaharan: +2 },
            positiveSynergy: { dinaric: 0.20 } }
    ],
    hasMeasurements: true,
    measurementFields: [
        { id: 'faceHeight', label: 'Face Height (nasion-gnathion, mm)', placeholder: 'e.g. 120' },
        { id: 'faceWidth', label: 'Face Width (bizygomatic, mm)', placeholder: 'e.g. 135' }
    ],
    calcIndex: function(h, w) { return w > 0 ? ((h / w) * 100).toFixed(1) : null; },
    categorizeIndex: function(v) {
        if (v === null) return '';
        if (v < 80) return 'hypereuryprosopic';
        if (v < 85) return 'euryprosopic';
        if (v <= 90) return 'mesoprosopic';
                if (v <= 95) return 'leptoprosopic';
                return 'hyperleptoprosopic';
        }
},

        
{
    id: 'orbitalIndex',
    number: 25,
    weightClass: 'A',
    title: 'Orbital Index',
    definition: 'Ratio of orbital height to orbital width x 100. Classifies eye socket shape from chamaeconch (wide, low orbit) to hypsiconch (tall, narrow orbit).',
    measurement: 'Measure orbital height from the superior to inferior bony rim at the midpoint of the orbit. Measure orbital width from the dacryon (medial corner) to the ectoconchion (most lateral point of the orbital rim). Divide height by width and multiply by 100.',
    unit: 'Index value -> chamaeconch / mesoconch / hypsiconch',
    guideImage: 'orbital-index.png',
    type: 'index',
    options: [
        { value: '', label: '— Enter measurements or select category —', contributions: {} },
        { value: 'chamaeconch', label: 'Chamaeconch (< 83)',
            contributions: {
                                caucasion: 3,
                                caspian: 1,   
                                hallstatt: -3,
                                eastNordic: -2,
                                tronder: -1,

                                eastBaltic: +1,
                                ladogan: +2,

                                northernSlavic: 0,
                                centralSlavic: +1,
                                ponticSlavic: +1,

                                alpine: +2,
                                dinaric: -2,

                                westernMediterranean: -1,
                                centralMediterranean: -1,
                                easternMediterranean: 0,
                                southernMediterranean: 0,

                                levantine: 0,
                                iranoAfghan: -2,
                                armenoid: -1,

                                eastAsian: +3,
                                northAsian: +4,
                                centralAsian: +2,

                                malay: +2,
                                amerindian: +2,

                                ethiopian: +1,
                                subSaharan: +2 } },
        { value: 'mesoconch', label: 'Mesoconch (83-89)',
            contributions: {
                                caucasion: 2,
                                caspian: 3,   
                                hallstatt: +1,
                                eastNordic: +2,
                                tronder: +2,

                                eastBaltic: +2,
                                ladogan: +2,

                                northernSlavic: +2,
                                centralSlavic: +3,
                                ponticSlavic: +3,

                                alpine: +2,
                                dinaric: +2,

                                westernMediterranean: +2,
                                centralMediterranean: +2,
                                easternMediterranean: +2,
                                southernMediterranean: +2,

                                levantine: +2,
                                iranoAfghan: +2,
                                armenoid: +2,

                                eastAsian: +2,
                                northAsian: +2,
                                centralAsian: +2,

                                malay: +2,
                                amerindian: +2,

                                ethiopian: +2,
                                subSaharan: +2 } },
        { value: 'hypsiconch', label: 'Hypsiconch (> 89)',
            contributions: {
                                caucasion: 0,
                                caspian: 2,
                                hallstatt: +4,
                                eastNordic: +3,
                                tronder: +3,

                                eastBaltic: +1,
                                ladogan: +2,

                                northernSlavic: +2,
                                centralSlavic: +2,
                                ponticSlavic: +3,

                                alpine: 0,
                                dinaric: +4,

                                westernMediterranean: +3,
                                centralMediterranean: +3,
                                easternMediterranean: +3,
                                southernMediterranean: +2,

                                levantine: +3,
                                iranoAfghan: +4,
                                armenoid: +3,

                                eastAsian: 0,
                                northAsian: -2,
                                centralAsian: -1,

                                malay: -1,
                                amerindian: -2,

                                ethiopian: -1,
                                subSaharan: -2 } }
    ],
    hasMeasurements: true,
    measurementFields: [
        { id: 'orbitalHeight', label: 'Orbital Height (mm)', placeholder: 'e.g. 33' },
        { id: 'orbitalWidth', label: 'Orbital Width (mm)', placeholder: 'e.g. 40' }
    ],
    calcIndex: function(h, w) { return w > 0 ? ((h / w) * 100).toFixed(1) : null; },
    categorizeIndex: function(v) {
        if (v === null) return '';
        if (v < 83) return 'chamaeconch';
        if (v <= 89) return 'mesoconch';
        return 'hypsiconch';
    }
},

{
    id: 'nasalTipMorphology',
    number: 26,
    weightClass: 'B',
    title: 'Nasal Tip Morphology',
    definition: 'Shape and structure of the nasal tip.',
    measurement: 'Visual assessment of nasal tip form.',
    unit: 'Categorical',
    guideImage: 'nasal-tip.png',
    type: 'select',

    options: [

        {
            value: '',
            label: '— Select —',
            contributions: {}
        },

        {
            value: 'fine',
            label: 'Fine / Narrow Tip',
            contributions: {
                                caucasion: -2,
                                caspian: 0,
                  
                                hallstatt: +3,
                                eastNordic: +2,
                                tronder: +2,

eastBaltic: 0,
ladogan: 0,

northernSlavic: +1,
centralSlavic: +1,
ponticSlavic: +2,

alpine: -1,
dinaric: +2,

westernMediterranean: +3,
centralMediterranean: +2,
easternMediterranean: +1,
southernMediterranean: +1,

levantine: 0,
iranoAfghan: +2,
armenoid: -2,

eastAsian: -2,
northAsian: -2,
centralAsian: -1,

malay: -1,
amerindian: -1,

ethiopian: 0,
subSaharan: -2
            }
        },

        {
            value: 'moderate',
            label: 'Moderate Tip',
            contributions: {
                                caucasion: 2,
                                caspian: 3,
                  
                                hallstatt: +1,
                                eastNordic: +1,
                                tronder: +1,

                                eastBaltic: +1,
                                ladogan: +1,

                                northernSlavic: +2,
                                centralSlavic: +2,
                                ponticSlavic: +2,

                                alpine: +1,
                                dinaric: +1,

                                westernMediterranean: +1,
                                centralMediterranean: +2,
                                easternMediterranean: +2,
                                southernMediterranean: +2,

                                levantine: +2,
                                iranoAfghan: +1,
                                armenoid: +1,

                                eastAsian: +1,
                                northAsian: +1,
                                centralAsian: +1,

                                malay: +1,
                                amerindian: +1,

                                ethiopian: +1,
                                subSaharan: +1
            }
        },

        {
            value: 'bulbous',
            label: 'Bulbous / Rounded Tip',
            contributions: {
                                caucasion: 3,
                                caspian: 2,
                  
                                allstatt: -2,
                                eastNordic: -2,
                                tronder: -1,

                                eastBaltic: 0,
                                ladogan: 0,

                                northernSlavic: -1,
                                centralSlavic: -1,
                                ponticSlavic: +1,

                                alpine: +2,
                                dinaric: +1,

                                westernMediterranean: +2,
                                centralMediterranean: +3,
                                easternMediterranean: +4,
                                southernMediterranean: +3,

                                levantine: +4,
                                iranoAfghan: +2,
                                armenoid: +4,

                                eastAsian: 0,
                                northAsian: 0,
                                centralAsian: +1,

                                malay: +1,
                                amerindian: 0,

                                ethiopian: +2,
                                subSaharan: +2
            }
        },

        {
            value: 'hooked',
            label: 'Hooked / Drooping Tip',
            contributions: {
                                caucasion: 3,
                                caspian: 3,
                  
                                hallstatt: -2,
                                eastNordic: -2,
                                tronder: -2,

                                eastBaltic: -1,
                                ladogan: -1,

                                northernSlavic: -1,
                                centralSlavic: -1,
                                ponticSlavic: 0,

                                alpine: +1,
                                dinaric: +5,

                                westernMediterranean: +2,
                                centralMediterranean: +3,
                                easternMediterranean: +4,
                                southernMediterranean: +4,

                                levantine: +6,
                                iranoAfghan: +4,
                                armenoid: +7,

                                eastAsian: -3,
                                northAsian: -3,
                                centralAsian: -2,

                                malay: -1,
                                amerindian: -2,

                                ethiopian: 0,
                                subSaharan: 0
            }
        },
        {
              value: 'upturned',
              label: 'Upturned Tip',
              contributions: {
                                caucasion: -2,
                                caspian: -1,
          
                                hallstatt: -2,
                                eastNordic: -1,
                                tronder: 0,

                                eastBaltic: +3,
                                ladogan: +3,

                                northernSlavic: +2,
                                centralSlavic: +1,
                                ponticSlavic: 0,

                                alpine: +1,
                                dinaric: -3,

                                westernMediterranean: -1,
                                centralMediterranean: -2,
                                easternMediterranean: -3,
                                southernMediterranean: -3,

                                levantine: -4,
                                iranoAfghan: -4,
                                armenoid: -5,

                                eastAsian: +3,
                                northAsian: +3,
                                centralAsian: +2,

                                malay: +2,
                                amerindian: +2,

                                ethiopian: 0,
                                subSaharan: 0
                    } },
                        ]
                }
];

const OPTION_CUSTOM_WEIGHT_CLASSES = {
        eyeColor: {
                veryLightBlue: { hallstatt: 'A+', eastNordic: 'A', tronder: 'A', eastBaltic: 'A', ladogan: 'A' },
                lightBlue: { hallstatt: 'A+', eastNordic: 'A+', tronder: 'A', eastBaltic: 'A', ladogan: 'A', northernSlavic: 'A' },
                grey: { eastBaltic: 'A+', ladogan: 'A+', northernSlavic: 'A', centralSlavic: 'A' },
                greyGreen: { eastNordic: 'A', eastBaltic: 'A', centralSlavic: 'A' },
                darkBrown: {
                        westernMediterranean: 'B+', centralMediterranean: 'B+', easternMediterranean: 'B+', southernMediterranean: 'B+',
                        levantine: 'B+', iranoAfghan: 'B+', armenoid: 'B+'
                },
                blackBrown: {
                        westernMediterranean: 'B', centralMediterranean: 'B', easternMediterranean: 'B', southernMediterranean: 'B',
                        levantine: 'B', iranoAfghan: 'B', armenoid: 'B', northAsian: 'B', centralAsian: 'B', eastAsian: 'B',
                        malay: 'B', amerindian: 'B', subSaharan: 'B', ethiopian: 'B'
                }
        },
        hairColor: {
                platinumBlonde: { hallstatt: 'A+', eastNordic: 'A', eastBaltic: 'A', ladogan: 'A' },
                lightBlonde: { hallstatt: 'A+', eastNordic: 'A', eastBaltic: 'A', ladogan: 'A', northernSlavic: 'A', centralSlavic: 'A' },
                goldenBlonde: { tronder: 'A+', hallstatt: 'A', eastNordic: 'A' },
                darkBlonde: { eastNordic: 'A', tronder: 'A', eastBaltic: 'A', northernSlavic: 'A', centralSlavic: 'A' },
                brown: {
                        westernMediterranean: 'B+', centralMediterranean: 'B+', easternMediterranean: 'B+', southernMediterranean: 'B+',
                        levantine: 'B+', iranoAfghan: 'B+', armenoid: 'B+'
                },
                darkBrown: {
                        westernMediterranean: 'B', centralMediterranean: 'B', easternMediterranean: 'B', southernMediterranean: 'B',
                        levantine: 'B', iranoAfghan: 'B', armenoid: 'B'
                },
                black: {
                        easternMediterranean: 'B', southernMediterranean: 'B', levantine: 'B', iranoAfghan: 'B', armenoid: 'B',
                        northAsian: 'B', centralAsian: 'B', eastAsian: 'B', malay: 'B', amerindian: 'B', subSaharan: 'B', ethiopian: 'B'
                },
                red: { tronder: 'A' }
        },
        hairForm: {
                straight: { northAsian: 'A-', eastAsian: 'A-', amerindian: 'A-' },
                wavy: { tronder: 'A-' },
                curly: { ethiopian: 'A-', subSaharan: 'A' },
                tightlyCurled: { ethiopian: 'A', subSaharan: 'A+' }
        },
        skinColor: {
                typeI: { hallstatt: 'A+', eastNordic: 'A', eastBaltic: 'A', ladogan: 'A', northernSlavic: 'A', northCaucasian: 'A' },
                typeIV: {
                        westernMediterranean: 'B', centralMediterranean: 'B', easternMediterranean: 'B', southernMediterranean: 'B',
                        levantine: 'B+', iranoAfghan: 'B+', armenoid: 'B+', ethiopian: 'B'
                },
                typeV: { malay: 'A-', ethiopian: 'A-', subSaharan: 'A' },
                typeVI: { ethiopian: 'A', subSaharan: 'A+' }
        },
        cephalicIndex: {
                dolichocephalic: {
    eastAsian: 'B+', malay: 'B+', amerindian: 'B+', subSaharan: 'B+',
    hallstatt: 'A+', westernMediterranean: 'A+', southernMediterranean: 'A+', iranoAfghan: 'A+'
},

hyperdolichocephalic: {
    eastAsian: 'A+', malay: 'A+', amerindian: 'A+', subSaharan: 'A+',
    hallstatt: 'A+', westernMediterranean: 'A+', southernMediterranean: 'A+', iranoAfghan: 'A+',
    eastNordic: 'A+', levantine: 'A+'
},

subDolichocephalic: {
    eastAsian: 'B+', malay: 'B+', amerindian: 'B+', subSaharan: 'B+',
    hallstatt: 'A+', westernMediterranean: 'A+', southernMediterranean: 'A+', iranoAfghan: 'A+',
    eastNordic: 'B+', levantine: 'B+'
},

mesocephalic: {
    hallstatt: 'B+', eastNordic: 'B+', tronder: 'A', eastBaltic: 'B+', ladogan: 'B+',
    northernSlavic: 'B+', centralSlavic: 'B+', ponticSlavic: 'B+', alpine: 'B+',
    dinaric: 'B+', westernMediterranean: 'B+', centralMediterranean: 'B+',
    easternMediterranean: 'B+', southernMediterranean: 'B+', levantine: 'B+',
    iranoAfghan: 'B+', armenoid: 'B+', northAsian: 'B+', centralAsian: 'B+',
    eastAsian: 'B+', malay: 'B+', amerindian: 'B+', subSaharan: 'B+', ethiopian: 'B+'
},

subBrachycephalic: {
    eastBaltic: 'B+', ladogan: 'B+', northernSlavic: 'B+',
    centralSlavic: 'B+', alpine: 'B+', dinaric: 'B+',
    easternMediterranean: 'B+',
    
    eastNordic: 'B',
    tronder: 'B',
    ponticSlavic: 'B+',
    armenoid: 'B+'
},

brachycephalic: {
    eastBaltic: 'A+', ladogan: 'A+', northernSlavic: 'A',
    centralSlavic: 'A', alpine: 'A+', dinaric: 'A',
    easternMediterranean: 'A',
    
    armenoid: 'A+'
},

hyperbrachycephalic: {
    eastBaltic: 'A+', alpine: 'A+', dinaric: 'A+', armenoid: 'A+'
}
        },
        faceShape: {
                veryNarrow: { hallstatt: 'A-', southernMediterranean: 'A', iranoAfghan: 'A', caspian: 'A-', caucasion: 'B+' },
                round: { eastBaltic: 'A-', centralSlavic: 'A-', alpine: 'A' },
                broad: { northAsian: 'A', eastAsian: 'A-', amerindian: 'A-', caspian: 'A-', caucasion: 'A' },
                veryBroad: { northAsian: 'A+', eastAsian: 'A', amerindian: 'A',caspian: 'A-', caucasion: 'A' }
        },
        cheekbones: {
                low: { northAsian: 'A-', eastAsian: 'A-', amerindian: 'A-' },
                high: { eastNordic: 'A', eastBaltic: 'A-', ladogan: 'A', northAsian: 'A', eastAsian: 'A+', centralAsian: 'A-', amerindian: 'A' },
                veryHigh: { eastBaltic: 'A-', ladogan: 'A', northAsian: 'A+', eastAsian: 'A+', centralAsian: 'A', malay: 'A-', amerindian: 'A+' }
        },
        epicanthus: {
                absent: {
                        hallstatt: 'C+', eastNordic: 'C+', tronder: 'C+', northernSlavic: 'C+', centralSlavic: 'C+', ponticSlavic: 'C+',
                        alpine: 'C+', dinaric: 'C+', westernMediterranean: 'C+', centralMediterranean: 'C+', easternMediterranean: 'C+',
                        southernMediterranean: 'C+', levantine: 'C+', iranoAfghan: 'C+', armenoid: 'C+', ethiopian: 'C+', subSaharan: 'C+'
                },
                slight: { northAsian: 'A', centralAsian: 'A', eastAsian: 'A', malay: 'A-', amerindian: 'A-' },
                moderate: { malay: 'A', amerindian: 'A' },
                strong: { centralAsian: 'A', malay: 'A', amerindian: 'A' }
        },
        eyeShape: {
                horizontal: { northAsian: 'B+', centralAsian: 'B', eastAsian: 'B+', malay: 'B', amerindian: 'B' }
        },
        noseType: {
                leptorrhine: {
                        westernMediterranean: 'A', centralMediterranean: 'A', easternMediterranean: 'A', southernMediterranean: 'A',
                        levantine: 'A', iranoAfghan: 'A+', armenoid: 'A-', dinaric: 'A-'
                },
                mesorrhine: {
                        hallstatt: 'B+', eastNordic: 'B+', tronder: 'B+', eastBaltic: 'B+', ladogan: 'B+', northernSlavic: 'B+',
                        centralSlavic: 'B+', ponticSlavic: 'B+', alpine: 'B+', dinaric: 'B+', westernMediterranean: 'B+',
                        centralMediterranean: 'B+', easternMediterranean: 'B+', southernMediterranean: 'B+', levantine: 'B+',
                        iranoAfghan: 'B+', armenoid: 'B+', northAsian: 'B+', centralAsian: 'B', eastAsian: 'B+', malay: 'B+',
                        amerindian: 'B+', subSaharan: 'B+', ethiopian: 'B+'
                },
                platyrrhine: { malay: 'A', ethiopian: 'A', subSaharan: 'A+' }
        },
        nasalProfile: {
                straight: { hallstatt: 'A', westernMediterranean: 'A-' },
                concave: { eastBaltic: 'A', ladogan: 'A', northernSlavic: 'A', alpine: 'A-' },
                convex: { dinaric: 'A+', easternMediterranean: 'A', levantine: 'A', iranoAfghan: 'A', armenoid: 'A+' }
        },
        chinProjection: {
                strong: { hallstatt: 'B+', dinaric: 'B+', armenoid: 'B+' }
        },
        monobrow: {
                moderate: { levantine: 'B', iranoAfghan: 'B', armenoid: 'B' },
                strong: { levantine: 'B', iranoAfghan: 'B', armenoid: 'B', centralAsian: 'B' }
        },
        lipFullness: {
                thick: { ethiopian: 'A-', subSaharan: 'A' },
                veryThick: { ethiopian: 'A', subSaharan: 'A+' }
        },
        prognathism: {
                orthognathous: { eastAsian: 'B+', northAsian: 'B+', amerindian: 'B+', subSaharan: 'A+' },
                mesognathous: { malay: 'A-', ethiopian: 'A-' },
                prognathous: { ethiopian: 'A', subSaharan: 'A+' }
        },
        occipitalContour: {
                flat: { eastBaltic: 'A-', alpine: 'A-', dinaric: 'A', northAsian: 'A+', eastAsian: 'A', amerindian: 'A' },
                rounded: { alpine: 'A-' },
                projecting: { hallstatt: 'A', westernMediterranean: 'A-', ethiopian: 'A-' }
        },
        eyeDepth: {
                deepSet: { hallstatt: 'A-' },
                prominent: { northAsian: 'A-', eastAsian: 'A-' }
        },
        nasalBridgeHeight: {
                low: { northAsian: 'A+', eastAsian: 'A', centralAsian: 'A-', malay: 'A-', amerindian: 'A-' },
                high: { hallstatt: 'A-', dinaric: 'A+', easternMediterranean: 'A-', levantine: 'A', iranoAfghan: 'A', armenoid: 'A+' }
        },
        facialIndex: {
                hypereuryprosopic: { eastBaltic: 'A', ladogan: 'A', alpine: 'A', northAsian: 'A+', eastAsian: 'A', amerindian: 'A' },
                euryprosopic: { eastBaltic: 'A', ladogan: 'A', alpine: 'A', northAsian: 'A', amerindian: 'A' },
                mesoprosopic: {
                        hallstatt: 'B+', eastNordic: 'B+', tronder: 'B+', eastBaltic: 'B+', ladogan: 'B+', northernSlavic: 'B+',
                        centralSlavic: 'B+', ponticSlavic: 'B+', alpine: 'B+', dinaric: 'B+', westernMediterranean: 'B+',
                        centralMediterranean: 'B+', easternMediterranean: 'B+', southernMediterranean: 'B+', levantine: 'B+',
                        iranoAfghan: 'B+', armenoid: 'B+', northAsian: 'B+', centralAsian: 'B+', eastAsian: 'B+', malay: 'B+',
                        amerindian: 'B+', subSaharan: 'B+', ethiopian: 'B+',caspian: 'B+', caucasion: 'B+'
                },
                leptoprosopic: { hallstatt: 'A', dinaric: 'A', westernMediterranean: 'A', southernMediterranean: 'A', levantine: 'A', iranoAfghan: 'A',caspian: 'A+' },
                hyperleptoprosopic: { hallstatt: 'A+', dinaric: 'A', southernMediterranean: 'A+', levantine: 'A', iranoAfghan: 'A+', ethiopian: 'A' }
        },
        orbitalIndex: {
                chamaeconch: { northAsian: 'A+', eastAsian: 'A', subSaharan: 'A' },
                mesoconch: {
                        hallstatt: 'B+', eastNordic: 'B+', tronder: 'B+', eastBaltic: 'B+', ladogan: 'B+', northernSlavic: 'B+',
                        centralSlavic: 'B+', ponticSlavic: 'B+', alpine: 'B+', dinaric: 'B+', westernMediterranean: 'B+',
                        centralMediterranean: 'B+', easternMediterranean: 'B+', southernMediterranean: 'B+', levantine: 'B+',
                        iranoAfghan: 'B+', armenoid: 'B+', northAsian: 'B+', centralAsian: 'B+', eastAsian: 'B+', malay: 'B+',
                        amerindian: 'B+', subSaharan: 'B+', ethiopian: 'B+'
                },
                hypsiconch: { hallstatt: 'A', dinaric: 'A', levantine: 'A', iranoAfghan: 'A+', armenoid: 'A' }
        },
        nasalTipMorphology: {
                fine: { westernMediterranean: 'A-' },
                bulbous: { centralSlavic: 'A-', armenoid: 'A-' },
                hooked: { dinaric: 'A', levantine: 'A', iranoAfghan: 'A', armenoid: 'A+' },
                upturned: { eastBaltic: 'A', ladogan: 'A', northernSlavic: 'A' }
        }
};

traits.forEach(trait => {
        const optionGroups = trait.type === 'composite' ? trait.subTraits : [trait];

        optionGroups.forEach(optionGroup => {
                const optionOverrides = OPTION_CUSTOM_WEIGHT_CLASSES[optionGroup.id];
                if (!optionOverrides) return;

                optionGroup.options.forEach(option => {
                        if (optionOverrides[option.value]) {
                                option.customWeightClasses = optionOverrides[option.value];
                        }
                });
        });
});

const NORTH_CAUCASIAN_CUSTOM_WEIGHTS = {
        eyeColor: 'B',
        hairColor: 'B',
        hairForm: 'B',
        skinColor: 'A',
        cephalicIndex: 'A+',
        cheekbones: 'A',
        epicanthus: 'C+',
        eyeShape: 'B',
        innerCanthalDistance: 'B',
        noseType: 'A+',
        forehead: 'B+',
        chin: 'B+',
        eyebrows: 'C+',
        browRidges: 'B+',
        ears: 'C',
        height: 'C',
        nasalProfile: 'B+',
        lipFullness: 'B',
        prognathism: 'B+',
        occipitalContour: 'B',
        eyeDepth: 'B',
        nasalBridgeHeight: 'B+',
        orbitalIndex: 'A+',
        nasalTipMorphology: 'B+'
};

Object.entries(NORTH_CAUCASIAN_CUSTOM_WEIGHTS).forEach(([traitId, weightClass]) => {
        const trait = traits.find(item => item.id === traitId);
        if (!trait) return;

        const optionGroups = trait.type === 'composite' ? trait.subTraits : [trait];
        optionGroups.forEach(optionGroup => {
                optionGroup.options.forEach(option => {
                        option.customWeightClasses = {
                                ...(option.customWeightClasses || {}),
                                caucasion: weightClass,
                                caspian: weightClass
                        };
                });
        });
});
