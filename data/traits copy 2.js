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
        // Assign exactly one category on each trait and composite subtrait:
        // 'pigmentation' for color, 'morphological' for form and proportions.
        const traits = [{
            id: 'eyeColor',
            category: 'pigmentation',
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
                    contributions: { hallstatt: 20.5, eastNordic: 18.5, tronder: 22.5,
                eastBaltic: 15.7,
                ladogan: 14,
                northernSlavic: 13, centralSlavic: 2.45, ponticSlavic: -6.8,
                alpine: -6.4,
                dinaric: -12.31,
                westernMediterranean: -20.5, centralMediterranean: -20.5, easternMediterranean: -20.5, southernMediterranean: -24.5,
                levantine: -24, iranoAfghan: -24.5, armenoid: -24.5,
                caucasion: -16.25, caspian: -24.5,
                northAsian: -24, centralAsian: -24, eastAsian: -24, malay: -24, amerindian: -24,
                subSaharan: -24.5, ethiopian: -21 },
                },
                { value: 'lightBlue', label: 'Light Blue (Martin 2-3)',
                    contributions: { hallstatt: 16.85, eastNordic: 19, tronder: 16.15,
                eastBaltic: 16.85,
                ladogan: 16.15,
                northernSlavic: 18, centralSlavic: 14, ponticSlavic: 8.85,
                alpine: 8.5,
                dinaric: 5,
                westernMediterranean: -2, centralMediterranean: 1, easternMediterranean: -4.25, southernMediterranean: -21,
                levantine: -16, iranoAfghan: -16, armenoid: -20.25,
                caucasion: -0.5, caspian: -12.75,
                northAsian: -24, centralAsian: -20, eastAsian: -24, malay: -24, amerindian: -24,
                subSaharan: -24, ethiopian: -24 } },
                { value: 'grey', label: 'Grey (Martin 4)',
                    contributions: { hallstatt: 2.5, eastNordic: -0.5, tronder: 2.5,
                eastBaltic: 15.25,
                ladogan: 18,
                northernSlavic: 15, centralSlavic: 11.5, ponticSlavic: 8.5,
                alpine: 2.5,
                dinaric: 2.5,
                westernMediterranean: -6, centralMediterranean: 2.5, easternMediterranean: -6, southernMediterranean: -21,
                levantine: -16, iranoAfghan: -16, armenoid: -16,
                caucasion: 2, caspian: -6,
                northAsian: -10.5, centralAsian: -7, eastAsian: -10.5, malay: -7, amerindian: -3.5,
                subSaharan: -17.5, ethiopian: -14 } },
                { value: 'greyGreen', label: 'Grey-Green (Martin 5-6)',
                    contributions: { hallstatt: -6, eastNordic: -4, tronder: -6,
                eastBaltic: -0.5,
                ladogan: 2.5,
                northernSlavic: 2.5, centralSlavic: 8, ponticSlavic: 8,
                alpine: 8,
                dinaric: 8,
                westernMediterranean: -0.5, centralMediterranean: 2, easternMediterranean: -0.5, southernMediterranean: -17,
                levantine: -9, iranoAfghan: -12, armenoid: -12,
                caucasion: 5, caspian: -2.25,
                northAsian: -20, centralAsian: -12, eastAsian: -24, malay: -24, amerindian: -24,
                subSaharan: -17.5, ethiopian: -14 } },
                { value: 'green', label: 'Green (Martin 7-8)',
                    contributions: { hallstatt: -12.25, eastNordic: -9, tronder: -12.25,
                eastBaltic: -8.8,
                ladogan: -6,
                northernSlavic: -0.5, centralSlavic: 2.5, ponticSlavic: 2.5,
                alpine: 2.5,
                dinaric: 2.5,
                westernMediterranean: -2, centralMediterranean: -6, easternMediterranean: -4, southernMediterranean: -12,
                levantine: -9, iranoAfghan: -12, armenoid: -12,
                caucasion: -0.5, caspian: -6,
                northAsian: -20, centralAsian: -16, eastAsian: -24, malay: -24, amerindian: -24,
                subSaharan: -10.5, ethiopian: -3.5 } },
                { value: 'hazel', label: 'Hazel (Martin 9-10)',
                    contributions: { hallstatt: -20, eastNordic: -20, tronder: -20,
                eastBaltic: -16,
                ladogan: -12,
                northernSlavic: -9.5, centralSlavic: 2.5, ponticSlavic: 8.5,
                alpine: 12,
                dinaric: 12,
                westernMediterranean: 12, centralMediterranean: 8, easternMediterranean: 10.5, southernMediterranean: -0.5,
                levantine: 5, iranoAfghan: 2.5, armenoid: 3.5,
                caucasion: 7.8, caspian: 7.8,
                northAsian: -16, centralAsian: -2.35, eastAsian: -20.25, malay: -24, amerindian: -24,
                subSaharan: 0, ethiopian: 3.5 } },
                { value: 'lightBrown', label: 'Light Brown (Martin 11)',
                    contributions: { hallstatt: -20, eastNordic: -20, tronder: -20,
                eastBaltic: -20,
                ladogan: -16,
                northernSlavic: -17, centralSlavic: -4, ponticSlavic: 5.25,
                alpine: 5,
                dinaric: 8,
                westernMediterranean: 12, centralMediterranean: 12, easternMediterranean: 13, southernMediterranean: 8,
                levantine: 8.5, iranoAfghan: 8, armenoid: 5,
                caucasion: 8, caspian: 8,
                northAsian: -6, centralAsian: 2.5, eastAsian: -16, malay: -20, amerindian: -20,
                subSaharan: -10, ethiopian: -5 } },
                { value: 'mediumBrown', label: 'Medium Brown (Martin 12-13)',
                    contributions: { hallstatt: -24, eastNordic: -24, tronder: -24,
                eastBaltic: -24,
                ladogan: -24,
                northernSlavic: -21, centralSlavic: -12, ponticSlavic: -0.5,
                alpine: -0.5,
                dinaric: 2.5,
                westernMediterranean: 11.5, centralMediterranean: 11.5, easternMediterranean: 13, southernMediterranean: 20,
                levantine: 16, iranoAfghan: 17, armenoid: 17,
                caucasion: 12.8, caspian: 17,
                northAsian: 12.5, centralAsian: 16, eastAsian: -2, malay: -10, amerindian: -10,
                subSaharan: 10.5, ethiopian: 14 } },
                { value: 'darkBrown', label: 'Dark Brown (Martin 14-15)',
                    contributions: { hallstatt: -28, eastNordic: -28, tronder: -28,
                eastBaltic: -24,
                ladogan: -24.5,
                northernSlavic: -24.5, centralSlavic: -20, ponticSlavic: -6,
                alpine: -10,
                dinaric: -10,
                westernMediterranean: 2, centralMediterranean: -0.5, easternMediterranean: 2.5, southernMediterranean: 19,
                levantine: 14, iranoAfghan: 14, armenoid: 14,
                caucasion: -0.5, caspian: 11.3,
                northAsian: 19, centralAsian: 20, eastAsian: 22.5, malay: 20, amerindian: 24.5,
                subSaharan: 14, ethiopian: 15.75 } },
                { value: 'blackBrown', label: 'Black-Brown (Martin 16)',
                    contributions: { hallstatt: -31.5, eastNordic: -31.5, tronder: -31.5,
                eastBaltic: -24.5,
                ladogan: -28,
                northernSlavic: -17.5, centralSlavic: -17.5, ponticSlavic: -17.5,
                alpine: -20,
                dinaric: -20,
                westernMediterranean: -16, centralMediterranean: -16, easternMediterranean: -16, southernMediterranean: -6,
                levantine: -6, iranoAfghan: -6, armenoid: 6,
                caucasion: -16, caspian: -16,
                northAsian: 12, centralAsian: 9, eastAsian: 16, malay: 20.5, amerindian: 16,
                subSaharan: 16, ethiopian: 16 },
                    balanceSynergy: { nordic: 0.10,
                eastBaltic: 0.10, ladogan: 0.10 } }
            ]
        }, {
            id: 'hairColor',
            category: 'pigmentation',
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
                    contributions: { hallstatt: 3.5, eastNordic: 1, tronder: -2,
                eastBaltic: 7,
                ladogan: -2,
                northernSlavic: -7.5, centralSlavic: -17, ponticSlavic: -21,
                alpine: -20.5,
                dinaric: -24.5,
                westernMediterranean: -24, centralMediterranean: -24, easternMediterranean: -24.5, southernMediterranean: -28,
                levantine: -24.5, iranoAfghan: -24.5, armenoid: -28,
                caucasion: -24, caspian: -24,
                northAsian: -27.5, centralAsian: -24, eastAsian: -24, malay: -27.5, amerindian: -24,
                subSaharan: -24.5, ethiopian: -25 },
                     },
                { value: 'lightBlonde', label: 'Light Blonde (F–S B–C)',
                    contributions: { hallstatt: 15.7, eastNordic: 16.6, tronder: 15,
                eastBaltic: 16.5,
                ladogan: 14.5,
                northernSlavic: 15, centralSlavic: 5, ponticSlavic: -4,
                alpine: -7,
                dinaric: -13,
                westernMediterranean: -20, centralMediterranean: -20, easternMediterranean: -20, southernMediterranean: -24.5,
                levantine: -24, iranoAfghan: -24, armenoid: -24,
                caucasion: -17, caspian: -21,
                northAsian: -24, centralAsian: -25, eastAsian: -27.5, malay: -24, amerindian: -25,
                subSaharan: -25, ethiopian: -25 } },
                { value: 'goldenBlonde', label: 'Golden Blonde (F–S D)',
                    contributions: { hallstatt: 13, eastNordic: 12, tronder: 14,
                eastBaltic: 11,
                ladogan: 13,
                northernSlavic: 11, centralSlavic: 6.5, ponticSlavic: 1,
                alpine: -0.5,
                dinaric: -7,
                westernMediterranean: -17, centralMediterranean: -13.5, easternMediterranean: -17, southernMediterranean: -21,
                levantine: -20, iranoAfghan: -20, armenoid: -20,
                caucasion: -13.5, caspian: -21,
                northAsian: -24, centralAsian: -20, eastAsian: -24, malay: -25, amerindian: -24,
                subSaharan: -24, ethiopian: -24 } },
                { value: 'darkBlonde', label: 'Dark Blonde (F–S E–F)',
                    contributions: { hallstatt: 6.5, eastNordic: 8.2, tronder: 9,
                eastBaltic: 6.5,
                ladogan: 10.8,
                northernSlavic: 13.3, centralSlavic: 13.3, ponticSlavic: 11,
                alpine: 7,
                dinaric: 3.5,
                westernMediterranean: -3.5, centralMediterranean: -2, easternMediterranean: -3.5, southernMediterranean: -18.5,
                levantine: -13, iranoAfghan: -17, armenoid: -17,
                caucasion: -2, caspian: -10.5,
                northAsian: -24, centralAsian: -17, eastAsian: -24, malay: -24, amerindian: -24,
                subSaharan: -24, ethiopian: -24 } },
                { value: 'lightBrown', label: 'Light Brown (F–S G–H)',
                    contributions: { hallstatt: -2, eastNordic: -2, tronder: -2,
                eastBaltic: -2,
                ladogan: 1,
                northernSlavic: 3.75, centralSlavic: 10.5, ponticSlavic: 12.30,
                alpine: 14,
                dinaric: 11,
                westernMediterranean: 6.5, centralMediterranean: 9, easternMediterranean: 6, southernMediterranean: -6,
                levantine: -2, iranoAfghan: -5.5, armenoid: -7.5,
                caucasion: 7, caspian: 1,
                northAsian: -20, centralAsian: -7, eastAsian: -24, malay: -24, amerindian: -24,
                subSaharan: -24, ethiopian: 24 } },
                { value: 'brown', label: 'Brown (F–S I–K)',
                    contributions: { hallstatt: -10, eastNordic: -10, tronder: -10,
                eastBaltic: -10,
                ladogan: -5.5,
                northernSlavic: -2, centralSlavic: 6.5, ponticSlavic: 12.9,
                alpine: 13.5,
                dinaric: 15,
                westernMediterranean: 17, centralMediterranean: 15, easternMediterranean: 15, southernMediterranean: 11,
                levantine: 13.5, iranoAfghan: 11, armenoid:11.5,
                caucasion: 15, caspian: 14,
                northAsian: -10, centralAsian: 4, eastAsian: -21, malay: -25, amerindian: -21,
                subSaharan: -24, ethiopian: -20.5 } },
                { value: 'darkBrown', label: 'Dark Brown (F–S L–M)',
                    contributions: { hallstatt: -20.5, eastNordic: -20.5, tronder: -20.5,
                eastBaltic: -20.5,
                ladogan: -17,
                northernSlavic: -14.5, centralSlavic: -2, ponticSlavic: 7,
                alpine: 9.5,
                dinaric: 13.8,
                westernMediterranean: 15.5, centralMediterranean: 14.8, easternMediterranean: 16.85, southernMediterranean: 21,
                levantine: 18, iranoAfghan: 18, armenoid: 19,
                caucasion: 16, caspian: 18,
                northAsian: 14, centralAsian: 20, eastAsian: -0.5, malay: -1, amerindian: -6,
                subSaharan: -18, ethiopian: 6 },
                        
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
                    contributions: { hallstatt: -31.5, eastNordic: -31.5, tronder: -31.5,
                eastBaltic: -27.5,
                ladogan: -24.5,
                northernSlavic: -24.5, centralSlavic: -20.5, ponticSlavic: -17,
                alpine: -18.5,
                dinaric: -10,
                westernMediterranean: -3.5, centralMediterranean: -3.5, easternMediterranean: -0.5, southernMediterranean: 17,
                levantine: 10.5, iranoAfghan: 13.5, armenoid: 11,
                caucasion: 0.5, caspian: 7,
                northAsian: 25, centralAsian: 24, eastAsian: 26, malay: 28, amerindian: 27,
                subSaharan: 27, ethiopian: 26 },
                        
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
                    contributions: { hallstatt: 10.5, eastNordic: 3.5, tronder: 16,
                eastBaltic: 3.5,
                ladogan: 7,
                northernSlavic: 7, centralSlavic: 3.5, ponticSlavic: -3.5,
                alpine: 0,
                dinaric: 0,
                westernMediterranean: 0, centralMediterranean: 0, easternMediterranean: 0, southernMediterranean: 0,
                levantine: -3.5, iranoAfghan: -3.5, armenoid: -3.5,
                caucasion: 2, caspian: -2,
                northAsian: -17.5, eastAsian: -21, malay: -17.5, amerindian: -14,
                subSaharan: -21, ethiopian: -17.5 },
                    positiveSynergy: { tronder: 0.15 },
                    negativeSynergy: { subSaharan: 0.15 } }
            ]
        }, {
            id: 'hairForm',
            category: 'morphological',
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
                    contributions: { hallstatt: 9.7, eastNordic: 9.8, tronder: 9.8,
                eastBaltic: 10.5,
                ladogan: 11,
                northernSlavic: 10, centralSlavic: 9, ponticSlavic: 9,
                alpine: 9,
                dinaric: 8,
                westernMediterranean: 6, centralMediterranean: 5, easternMediterranean: 5, southernMediterranean: 1.5,
                levantine: 2, iranoAfghan: 2, armenoid: 1,
                caucasion: 7, caspian: 5,
                northAsian: 12.5, centralAsian: 11, eastAsian: 13, malay: 11, amerindian: 12,
                subSaharan: -12, ethiopian: -10 } },
                { value: 'wavy', label: 'Wavy',
                    contributions: { hallstatt: 0.2, eastNordic: 1.25, tronder: 1.6,
                eastBaltic: -1.4,
                ladogan: -2.2,
                northernSlavic: 0.2, centralSlavic: 1.5, ponticSlavic: 3,
                alpine: 4,
                dinaric: 5,
                westernMediterranean: 6, centralMediterranean: 6.4, easternMediterranean: 6.5, southernMediterranean: 7.5,
                levantine: 7, iranoAfghan: 7, armenoid: 7,
                caucasion: 5.5, caspian: 6.5,
                northAsian: -9, centralAsian: -1, eastAsian: -11.5, malay: 0.2, amerindian: -9,
                subSaharan: -13, ethiopian: -1.5 } },
                { value: 'curly', label: 'Curly',
                    contributions: { hallstatt: -10, eastNordic: -10, tronder: -9.5,
                eastBaltic: -11,
                ladogan: -11,
                northernSlavic: -10, centralSlavic: -9, ponticSlavic: -8.5,
                alpine: -7.5,
                dinaric: -6.5,
                westernMediterranean: -4, centralMediterranean: -3, easternMediterranean: -3, southernMediterranean: 0.2,
                levantine: -1.5, iranoAfghan: -1, armenoid: -1,
                caucasion: -5, caspian: -2,
                northAsian: -12, centralAsian: -10, eastAsian: -12, malay: -10, amerindian: -11,
                subSaharan: -12, ethiopian: 7} },
                { value: 'tightlyCurled', label: 'Coily/Tightly Curled',
                    contributions: { hallstatt: -12, eastNordic: -12, tronder: -12,
                eastBaltic: -12,
                ladogan: -12,
                northernSlavic: -12, centralSlavic: -12, ponticSlavic: -12,
                alpine: -12,
                dinaric: -12,
                westernMediterranean: -12, centralMediterranean: -12, easternMediterranean: -12, southernMediterranean: -10,
                levantine: -11, iranoAfghan: -11, armenoid: -11,
                caucasion: -12, caspian: -12,
                northAsian: -21, centralAsian: -18, eastAsian: -24, malay: -12, amerindian: -18,
                subSaharan: 20.5, ethiopian: 10 },
                    positiveSynergy: { subSaharan: 0.20 },
                    negativeSynergy: { nordic: 0.15 } }
            ]
        }, {
            id: 'skinColor',
            category: 'pigmentation',
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
                    contributions: { hallstatt: 10.5, eastNordic: 8, tronder: 13,
                eastBaltic: 13,
                ladogan: 4.5,
                northernSlavic: 1, centralSlavic: -9, ponticSlavic: -20,
                alpine: -16,
                dinaric: -21,
                westernMediterranean: -27, centralMediterranean: -27, easternMediterranean: -27, southernMediterranean: -30,
                levantine: -30, iranoAfghan: -30, armenoid: -30,
                caucasion: -25, caspian: -30,
                northAsian: -25, centralAsian: -30, eastAsian: -30, malay: -30, amerindian: -30,
                subSaharan: -30, ethiopian: -30 },
                        negativeSynergy: {
                        african: 0.5,
                        nearEastern: 0.15,
                        asian: 0.15,
                        southernMediterranean: 0.10,
                        },
                balanceSynergy: {
                                         african: 0.70,
                                         iranoAfghan: 0.15,
                                         nearEastern: 0.15,
                                         asian: 0.15,
                                         southernMediterranean: 0.10,
                                  },
                        },
                { value: 'typeII', label: 'Type II — Fair (von Luschan 6–10)',
                    contributions: { hallstatt: 18, eastNordic: 19, tronder: 19,
                eastBaltic: 20,
                ladogan: 19,
                northernSlavic: 21, centralSlavic: 16, ponticSlavic: 15,
                alpine: 17,
                dinaric: 10,
                westernMediterranean: 2, centralMediterranean: 3.5, easternMediterranean: 0, southernMediterranean: -20,
                levantine: -10.5, iranoAfghan: -15.5, armenoid: -12,
                caucasion: 7, caspian: -5,
                northAsian: 12, centralAsian: -2, eastAsian: 1, malay: -27, amerindian: -19,
                subSaharan: -27, ethiopian: -24 },
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
                                         african: 0.45,
                                         levantine: 0.10,
                                         iranoAfghan: 0.05,
                                         armenoid: 0.05,
                                         amerindian: 0.05,
                                         eastAsian: 0.05,
                                         northAsian: 0.05,
                                         centralAsian: 0.05,
                                         malay: 0.20,
                                         southernMediterranean: 0.05,
                                  },
                 },
                { value: 'typeIII', label: 'Type III — Medium Fair (von Luschan 11–15)',
                    contributions: { hallstatt: -1, eastNordic: 0, tronder: -1,
                eastBaltic: -1,
                ladogan: 3,
                northernSlavic: 7, centralSlavic: 13.75, ponticSlavic: 18.32,
                alpine: 15.59,
                dinaric: 17,
                westernMediterranean: 18, centralMediterranean: 17.9, easternMediterranean: 17, southernMediterranean: 10,
                levantine: 13, iranoAfghan: 11.5, armenoid: 12,
                caucasion: 18, caspian: 16,
                northAsian: 21, centralAsian: 18, eastAsian: 19, malay: -9, amerindian: 13,
                subSaharan: -24, ethiopian: -21 },
                    balanceSynergy: { mediterranean: -0.05, nearEastern: 0.10 } },
                { value: 'typeIV', label: 'Type IV — Olive/Moderate (von Luschan 16–21)',
                    contributions: { hallstatt: -19, eastNordic: -19, tronder: -19,
                eastBaltic: -19,
                ladogan: -17,
                northernSlavic: -15, centralSlavic: -7, ponticSlavic: 1,
                alpine: -1,
                dinaric: 7,
                westernMediterranean: 10, centralMediterranean: 10, easternMediterranean: 12, southernMediterranean: 21,
                levantine: 16, iranoAfghan: 16, armenoid: 16,
                caucasion: 7, caspian: 15,
                northAsian: 0, centralAsian: 12, eastAsian: 12, malay: 16, amerindian: 19,
                subSaharan: -26, ethiopian: -2 },
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
                    contributions: { hallstatt: -24, eastNordic: -24, tronder: -24,
                eastBaltic: -24,
                ladogan: -24,
                northernSlavic: -24, centralSlavic: -24, ponticSlavic: -24,
                alpine: -25,
                dinaric: -25,
                westernMediterranean: -17.5, centralMediterranean: -17.5, easternMediterranean: -15, southernMediterranean: 4,
                levantine: -1, iranoAfghan: 2.8, armenoid: -1,
                caucasion: -20, caspian: -9,
                northAsian: -25, centralAsian: 7, eastAsian: 19.5, malay: 21, amerindian: 2,
                subSaharan: -10, ethiopian: 28 },
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
                    contributions: { hallstatt: -30, eastNordic: -30, tronder: -30,
                eastBaltic: -24,
                ladogan: -27,
                northernSlavic: -24, centralSlavic: -24, ponticSlavic: -24,
                alpine: -25,
                dinaric: -25,
                westernMediterranean: -24, centralMediterranean: -24, easternMediterranean: -24, southernMediterranean: -20,
                levantine: -21, iranoAfghan: -21, armenoid: -21,
                caucasion: -24, caspian: -24,
                northAsian: -24, centralAsian: -24, eastAsian: -24, malay: -13, amerindian: -21,
                subSaharan: 45, ethiopian: 28 },
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
            category: 'morphological',
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
    label: 'Hyperdolichocephalic (< 71)',
    contributions: {
        hallstatt: -13.60,
        eastNordic: 5.40,
        tronder: -24.15,
        eastBaltic: -31.65,
        ladogan: -31.65,

        northernSlavic: -30.00,
        centralSlavic: -30.00,
        ponticSlavic: -30.00,

        alpine: -31.20,
        dinaric: -31.20,

        westernMediterranean: -13.75,
        centralMediterranean: -13.00,
        easternMediterranean: -31.20,
        southernMediterranean: -2.90,

        levantine: 15.60,
        iranoAfghan: -2.25,
        armenoid: -35.25,

        caucasion: -30.90,
        caspian: -18.95,

        northAsian: -31.15,
        centralAsian: -31.15,
        eastAsian: -31.15,
        malay: -31.15,
        amerindian: 1.70,

        subSaharan: 10.15,
        ethiopian: -9.40
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
        hallstatt: 23.15,
        eastNordic: 32.50,
        tronder: 16.60,
        eastBaltic: -39.40,
        ladogan: -39.40,

        northernSlavic: -20.25,
        centralSlavic: -30.60,
        ponticSlavic: -26.40,

        alpine: -37.90,
        dinaric: -37.90,

        westernMediterranean: 26.65,
        centralMediterranean: 18.15,
        easternMediterranean: -29.10,
        southernMediterranean: 32.55,

        levantine: 30.05,
        iranoAfghan: 27.70,
        armenoid: -45.00,

        caucasion: -37.50,
        caspian: 19.00,

        northAsian: -32.65,
        centralAsian: -32.65,
        eastAsian: -32.65,
        malay: 5.30,
        amerindian: 1.65,

        subSaharan: 25.40,
        ethiopian: 28.80
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
        hallstatt: 27.40,
        eastNordic: 9.90,
        tronder: 13.45,
        eastBaltic: -37.50,
        ladogan: -2.45,

        northernSlavic: -3.15,
        centralSlavic: -13.55,
        ponticSlavic: -12.40,

        alpine: -30.85,
        dinaric: -35.15,

        westernMediterranean: 18.90,
        centralMediterranean: 15.70,
        easternMediterranean: -3.50,
        southernMediterranean: 10.00,

        levantine: 4.05,
        iranoAfghan: 11.15,
        armenoid: -35.25,

        caucasion: -26.50,
        caspian: 25.65,

        northAsian: -32.25,
        centralAsian: -32.25,
        eastAsian: -12.90,
        malay: -7.10,
        amerindian: 1.65,

        subSaharan: 9.45,
        ethiopian: 13.65
    },

    balanceSynergy: {
        armenoid: 0.12
    }
},

{
    value: 'mesocephalic',
    label: 'Mesocephalic (77.5–80)',
    contributions: {
        hallstatt: -3.30,
        eastNordic: -14.80,
        tronder: 24.55,
        eastBaltic: -2.40,
        ladogan: 15.15,

        northernSlavic: 18.75,
        centralSlavic: 14.70,
        ponticSlavic: 20.00,

        alpine: -14.70,
        dinaric: -22.05,

        westernMediterranean: 4.05,
        centralMediterranean: 10.95,
        easternMediterranean: 3.65,
        southernMediterranean: -2.70,

        levantine: -13.85,
        iranoAfghan: -2.30,
        armenoid: -13.05,

        caucasion: -3.80,
        caspian: 12.45,

        northAsian: 5.75,
        centralAsian: -23.00,
        eastAsian: 4.80,
        malay: 9.70,
        amerindian: 1.50,

        subSaharan: -3.20,
        ethiopian: -21.15
    },

    balanceSynergy: {
    }
},

{
    value: 'sub-brachycephalic',
    label: 'Sub-brachycephalic (80–82.5)',
    contributions: {
        hallstatt: -35.25,
        eastNordic: -35.25,
        tronder: -15.35,
        eastBaltic: 19.85,
        ladogan: 23.35,

        northernSlavic: 20.00,
        centralSlavic: 22.15,
        ponticSlavic: 21.15,

        alpine: 9.40,
        dinaric: -3.65,

        westernMediterranean: -15.05,
        centralMediterranean: -2.30,
        easternMediterranean: 25.10,
        southernMediterranean: -22.30,

        levantine: -33.00,
        iranoAfghan: -13.05,
        armenoid: 5.35,

        caucasion: 9.75,
        caspian: -13.35,

        northAsian: 15.95,
        centralAsian: 3.50,
        eastAsian: 10.05,
        malay: 4.65,
        amerindian: 1.60,

        subSaharan: -30.00,
        ethiopian: -30.00
    }
},

{
    value: 'brachycephalic',
    label: 'Brachycephalic (82.5–85)',
    contributions: {
        hallstatt: -34.50,
        eastNordic: -34.50,
        tronder: -34.50,
        eastBaltic: 27.15,
        ladogan: 10.90,

        northernSlavic: 0.00,
        centralSlavic: 10.20,
        ponticSlavic: -1.55,

        alpine: 27.20,
        dinaric: 23.95,

        westernMediterranean: -36.90,
        centralMediterranean: -14.90,
        easternMediterranean: 13.55,
        southernMediterranean: -36.90,

        levantine: -36.45,
        iranoAfghan: -36.45,
        armenoid: 29.95,

        caucasion: 29.80,
        caspian: -43.50,

        northAsian: 22.30,
        centralAsian: 23.35,
        eastAsian: 18.75,
        malay: 14.75,
        amerindian: 1.85,

        subSaharan: -30.00,
        ethiopian: -30.00
    }
},

{
    value: 'hyperbrachycephalic',
    label: 'Hyperbrachycephalic (> 85)',
    contributions: {
        hallstatt: -31.50,
        eastNordic: -31.50,
        tronder: -31.50,
        eastBaltic: 5.40,
        ladogan: -12.90,

        northernSlavic: -30.45,
        centralSlavic: -20.15,
        ponticSlavic: -30.45,

        alpine: 18.60,
        dinaric: 30.90,

        westernMediterranean: -35.40,
        centralMediterranean: -35.40,
        easternMediterranean: -3.50,
        southernMediterranean: -35.40,

        levantine: -34.80,
        iranoAfghan: -34.80,
        armenoid: 22.95,

        caucasion: 15.60,
        caspian: -37.50,

        northAsian: -1.45,
        centralAsian: 23.80,
        eastAsian: 10.00,
        malay: 2.80,
        amerindian: 1.60,

        subSaharan: -30.00,
        ethiopian: -30.00
    },

    balanceSynergy: {
        nordic: 0.25,
        iranoAfghan: 0.15,
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
        }, 
        {
    id: 'facialIndex',
    category: 'morphological',
    number: 6,
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
                hallstatt: -24.20,
                eastNordic: -24.20,
                tronder: -24.20,
                eastBaltic: 13.15,
                ladogan: 16.90,
                northernSlavic: -18.45,
                centralSlavic: -18.40,
                ponticSlavic: -18.45,
                alpine: 5.40,
                dinaric: -21.45,
                westernMediterranean: -17.75,
                centralMediterranean: -11.90,
                easternMediterranean: -16.00,
                southernMediterranean: -17.75,
                levantine: -12.20,
                iranoAfghan: -21.00,
                armenoid: -12.55,
                caucasion: -20.00,
                caspian: -20.00,
                northAsian: 16.05,
                centralAsian: -1.05,
                eastAsian: -4.25,
                malay: -5.25,
                amerindian: -2.20,
                subSaharan: -17.95,
                ethiopian: -20.30
            }
        },
        {
            value: 'euryprosopic',
            label: 'Euryprosopic',
            contributions: {
                hallstatt: -24.45,
                eastNordic: -20.35,
                tronder: -9.45,
                eastBaltic: 14.40,
                ladogan: 13.15,
                northernSlavic: -3.80,
                centralSlavic: -1.90,
                ponticSlavic: -3.80,
                alpine: 16.25,
                dinaric: -12.25,
                westernMediterranean: -4.05,
                centralMediterranean: 2.95,
                easternMediterranean: -2.20,
                southernMediterranean: -6.15,
                levantine: -0.90,
                iranoAfghan: -19.60,
                armenoid: 3.80,
                caucasion: 13.00,
                caspian: -11.50,
                northAsian: 8.50,
                centralAsian: 10.35,
                eastAsian: 6.60,
                malay: 4.70,
                amerindian: 10.55,
                subSaharan: -12.15,
                ethiopian: -20.75
            }
        },
        {
            value: 'mesoprosopic',
            label: 'Mesoprosopic',
            contributions: {
                hallstatt: -6.60,
                eastNordic: 0.70,
                tronder: 3.05,
                eastBaltic: -0.60,
                ladogan: -3.85,
                northernSlavic: 9.80,
                centralSlavic: 11.15,
                ponticSlavic: 10.50,
                alpine: 3.75,
                dinaric: 3.90,
                westernMediterranean: 11.15,
                centralMediterranean: 14.65,
                easternMediterranean: 10.30,
                southernMediterranean: 7.60,
                levantine: 12.00,
                iranoAfghan: -9.80,
                armenoid: 12.45,
                caucasion: 13.80,
                caspian: 6.85,
                northAsian: 0.30,
                centralAsian: 9.25,
                eastAsian: 9.20,
                malay: 11.95,
                amerindian: 9.10,
                subSaharan: -2.50,
                ethiopian: -19.90
            }
        },
        {
            value: 'leptoprosopic',
            label: 'Leptoprosopic',
            contributions: {
                hallstatt: 24.40,
                eastNordic: 13.40,
                tronder: 15.80,
                eastBaltic: -19.25,
                ladogan: -24.05,
                northernSlavic: 10.25,
                centralSlavic: 9.40,
                ponticSlavic: 11.10,
                alpine: -15.90,
                dinaric: 15.55,
                westernMediterranean: 11.00,
                centralMediterranean: 3.25,
                easternMediterranean: 6.65,
                southernMediterranean: 13.05,
                levantine: 10.85,
                iranoAfghan: 5.90,
                armenoid: 6.60,
                caucasion: 0.5,
                caspian: 12.95,
                northAsian: -15.40,
                centralAsian: -2.60,
                eastAsian: 2.15,
                malay: 2.15,
                amerindian: -4.65,
                subSaharan: 3.75,
                ethiopian: -14.80
            }
        },
        {
            value: 'hyperleptoprosopic',
            label: 'Hyperleptoprosopic',
            contributions: {
                hallstatt: 1.50,
                eastNordic: 11.60,
                tronder: 2.40,
                eastBaltic: -23.80,
                ladogan: -23.80,
                northernSlavic: -2.20,
                centralSlavic: -5.50,
                ponticSlavic: -6.90,
                alpine: -22.70,
                dinaric: 3.90,
                westernMediterranean: -5.70,
                centralMediterranean: -16.65,
                easternMediterranean: 0.90,
                southernMediterranean: -1.40,
                levantine: -19.70,
                iranoAfghan: 22.75,
                armenoid: -15.45,
                caucasion: -20.10,
                caspian: 2.60,
                northAsian: -20.75,
                centralAsian: -20.75,
                eastAsian: -11.25,
                malay: -12.60,
                amerindian: -13.75,
                subSaharan: 19.45,
                ethiopian: 26.35

            },
            positiveSynergy: {
                dinaric: 0.20
            } }
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
        if (v <= 89.9) return 'mesoprosopic';
                if (v <= 95) return 'leptoprosopic';
                return 'hyperleptoprosopic';
        }
},
{
    id: 'cheekbones',
    category: 'morphological',
    number: 7,
    weightClass: 'B+',
    title: 'Cheekbone Morphology',
    definition: 'Assessment of cheekbone width and midfacial projection.',
    measurement: 'Visual assessment with optional anthropometric measurements.',
    unit: 'Categorical',
    guideImage: 'cheekbone-morphology.png',
    type: 'composite',
    subTraits: [

        {
            id: 'cheekboneWidth',
            category: 'morphological',
            label: 'Width',
            options: [
                {
                    value: '',
                    label: '—',
                    contributions: {}
                },
                {
                    value: 'low',
                    label: 'Low',
                    contributions: {
                        hallstatt: 5, eastNordic: 3, tronder: -2,
                        eastBaltic: -6.5,
                        ladogan: -8,
                        northernSlavic: -2.5, centralSlavic: -3.5, ponticSlavic: -1.5,
                        alpine: -5,
                        dinaric: -8,
                        westernMediterranean: 5, centralMediterranean: 4.5,
                        easternMediterranean: 3, southernMediterranean: 3.5,
                        levantine: 2, iranoAfghan: 3, armenoid: -5,
                        caucasion: -12, caspian: 2,
                        northAsian: -7, centralAsian: -6, eastAsian: -6,
                        malay: -3, amerindian: -8,
                        subSaharan: 0, ethiopian: 5
                    }
                },
                {
                    value: 'moderate',
                    label: 'Moderate',
                    contributions: {
                        hallstatt: 2.5, eastNordic: 2.5, tronder: 2.5,
                        eastBaltic: 0.5,
                        ladogan: 0,
                        northernSlavic: 2, centralSlavic: 1.5, ponticSlavic: 2.10,
                        alpine: 1.10,
                        dinaric: 0.5,
                        westernMediterranean: 2, centralMediterranean: 2,
                        easternMediterranean: 2.5, southernMediterranean: 2.5,
                        levantine: 2.5, iranoAfghan: 2.4, armenoid: 1.5,
                        caucasion: -3, caspian: 3,
                        northAsian: -4, centralAsian: -1, eastAsian: 0.5,
                        malay: 5.5, amerindian: -4,
                        subSaharan: 4, ethiopian: 3
                    }
                },
                {
                    value: 'high',
                    label: 'High',
                    contributions: {
                        hallstatt: -3, eastNordic: -2, tronder: 2,
                        eastBaltic: 5.65,
                        ladogan: 6,
                        northernSlavic: 2.5, centralSlavic: 3.5, ponticSlavic: 2.5,
                        alpine: 5.5,
                        dinaric: 6.3,
                        westernMediterranean: -3.5, centralMediterranean: -3,
                        easternMediterranean: -1, southernMediterranean: -2,
                        levantine: -0.5, iranoAfghan: -1.5, armenoid: 5,
                        caucasion: 5, caspian: -0.5,
                        northAsian: 4, centralAsian: 4.6, eastAsian: 5,
                        malay: 3, amerindian: 4,
                        subSaharan: 1, ethiopian: -5
                    }
                },
                {
                    value: 'veryHigh',
                    label: 'Very High',
                    contributions: {
                        hallstatt: -7, eastNordic: -7, tronder: -4,
                        eastBaltic: 5,
                        ladogan: 4,
                        northernSlavic: -3, centralSlavic: -3, ponticSlavic: -4,
                        alpine: -2,
                        dinaric: -1,
                        westernMediterranean: -7, centralMediterranean: -8,
                        easternMediterranean: -7, southernMediterranean: -7.5,
                        levantine: -7, iranoAfghan: -7.5, armenoid: -3.5,
                        caucasion: 8, caspian: -8,
                        northAsian: 4, centralAsian: 2, eastAsian: 0.15,
                        malay: -7, amerindian: 5.5,
                        subSaharan: -6, ethiopian: -7
                    }
                }
            ]
        },

{
    id: 'zygomaticProjection',
    category: 'morphological',
    label: 'Anterior Zygomatic Projection',
    options: [
        {
            value: '',
            label: '—',
            contributions: {}
        },

        {
    value: 'low',
    label: 'Low',
    contributions: {
        hallstatt: 5.05,
        eastNordic: 5.05,
        tronder: 1.65,
        eastBaltic: 0.88,
        ladogan: -9.20,

        northernSlavic: -1.38,
        centralSlavic: 3.08,
        ponticSlavic: 5.23,

        alpine: 1.75,
        dinaric: 4.03,
        westernMediterranean: -1.20,
        centralMediterranean: 5.18,
        easternMediterranean: 4.03,
        southernMediterranean: 3.63,

        levantine: 3.48,
        iranoAfghan: 4.13,
        armenoid: 3.60,

        caucasion: 4.70,
        caspian: 3.78,

        northAsian: -10.50,
        centralAsian: 1.93,
        eastAsian: -7.18,
        malay: 0.35,
        amerindian: -10.50,

        subSaharan: 3.95,
        ethiopian: 4.00
    },
    balanceSynergy: {
                eastAsian: 0.10,
                northAsian: 0.10,
            },
},

        {
    value: 'moderate',
    label: 'Moderate',
    contributions: {
        hallstatt: 0.33,
        eastNordic: 0.33,
        tronder: 4.97,
        eastBaltic: 4.07,
        ladogan: 2.90,

        northernSlavic: 7.83,
        centralSlavic: 3.07,
        ponticSlavic: -0.70,

        alpine: 4.67,
        dinaric: 0.70,
        westernMediterranean: 7.30,
        centralMediterranean: -2.27,
        easternMediterranean: 0.70,
        southernMediterranean: 1.47,

        levantine: 2.50,
        iranoAfghan: -0.20,
        armenoid: 0.60,

        caucasion: 2.27,
        caspian: 0.10,

        northAsian: -3.40,
        centralAsian: 4.50,
        eastAsian: -3.23,
        malay: 4.90,
        amerindian: -5.37,

        subSaharan: -1.07,
        ethiopian: -1.23
    }
},

        {
            value: 'high',
            label: 'High',
            contributions: {
                hallstatt: -9.05,
                eastNordic: -9.05,
                tronder: -7.00,
                eastBaltic: -4.10,
                ladogan: 6.85,

                northernSlavic: -8.05,
                centralSlavic: -7.50,
                ponticSlavic: -7.45,

                alpine: -3.95,
                dinaric: -6.40,
                westernMediterranean: -6.25,
                centralMediterranean: -8.20,
                easternMediterranean: -6.40,
                southernMediterranean: -6.40,

                levantine: -6.30,
                iranoAfghan: -7.60,
                armenoid: -6.45,

                caucasion: -6.55,
                caspian: -4.95,

                northAsian: 7.35,
                centralAsian: -5.60,
                eastAsian: 8.55,
                malay: -0.85,
                amerindian: 8.85,

                subSaharan: -6.25,
                ethiopian: -6.40
            }
        },

       {
    value: 'veryHigh',
    label: 'Very High',
    contributions: {
        hallstatt: -10.00,
        eastNordic: -10.00,
        tronder: -10.00,
        eastBaltic: -5.50,
        ladogan: -5.00,

        northernSlavic: -7.00,
        centralSlavic: -7.00,
        ponticSlavic: -6.50,

        alpine: -6.00,
        dinaric: -5.00,
        westernMediterranean: -5.00,
        centralMediterranean: -6.00,
        easternMediterranean: -5.00,
        southernMediterranean: -5.00,

        levantine: -5.00,
        iranoAfghan: -5.50,
        armenoid: -5.00,

        caucasion: -7.00,
        caspian: -7.00,

        northAsian: 5.00,
        centralAsian: 4.50,
        eastAsian: 6.00,
        malay: 4.00,
        amerindian: 6.50,

        subSaharan: -5.00,
        ethiopian: -5.00
    }
}
    ]
},
{
    id: 'zygomaxillaryFlatness',
    category: 'morphological',
    label: 'Zygomaxillary Facial Flatness',
    options: [
        {
            value: '',
            label: '—',
            contributions: {}
        },
        {
            value: 'veryFlat',
            label: 'Very Flat',
            contributions: {}
        },
        {
            value: 'flat',
            label: 'Flat',
            contributions: {}
        },
        {
            value: 'moderate',
            label: 'Moderate',
            contributions: {}
        },
        {
            value: 'projecting',
            label: 'Projecting',
            contributions: {}
        }
    ]
}
    ]
},
 {
    id: 'epicanthus',
    category: 'morphological',
    number: 8,
    weightClass: 'A+',
    title: 'Epicanthus (Epicanthic Fold)',
    definition: 'A skin fold of the upper eyelid covering the inner corner (canthus) of the eye.',
    measurement: 'Visual inspection of the medial canthal region.',
    unit: 'Present / Absent',
    guideImage: 'epicanthic-fold.png',
    type: 'select',

    options: [
        {
            value: '',
            label: '— Select —',
            contributions: {}
        },

        {
            value: 'absent',
            label: 'Absent',
            contributions: {
                hallstatt: 2.25,
                eastNordic: 2.20,
                tronder: 2.15,
                eastBaltic: 1.85,
                ladogan: 1.85,

                northernSlavic: 1.90,
                centralSlavic: 1.90,
                ponticSlavic: 2.00,

                alpine: 2.00,
                dinaric: 2.00,
                westernMediterranean: 2.00,
                centralMediterranean: 2.00,
                easternMediterranean: 2.00,
                southernMediterranean: 2.00,

                levantine: 2.00,
                iranoAfghan: 2.00,
                armenoid: 2.00,

                caucasion: 1.95,
                caspian: 1.95,

                northAsian: -25.70,
                centralAsian: -2.70,
                eastAsian: -18.65,
                malay: 0.90,
                amerindian: 1.65,

                subSaharan: 1.90,
                ethiopian: 2.00
            },
            balanceSynergy: {
                eastAsian: 0.30,
                northAsian: 0.25,
                centralAsian: 0.05
            },
            negativeSynergy: {
                eastAsian: 0.15,
                northAsian: 0.10,
                centralAsian: 0.05
            }
        },

        {
            value: 'slight',
            label: 'Slight / Vestigial',
            contributions: {
                hallstatt: -15.30,
                eastNordic: -14.20,
                tronder: -13.05,
                eastBaltic: -2.70,
                ladogan: 0.15,

                northernSlavic: -6.55,
                centralSlavic: -10.40,
                ponticSlavic: -11.55,

                alpine: -13.45,
                dinaric: -15.20,
                westernMediterranean: -15.20,
                centralMediterranean: -15.20,
                easternMediterranean: -14.20,
                southernMediterranean: -13.45,

                levantine: -14.20,
                iranoAfghan: -13.40,
                armenoid: -14.20,

                caucasion: -13.40,
                caspian: -12.50,

                northAsian: -5.90,
                centralAsian: 0.25,
                eastAsian: -1.80,
                malay: 2.40,
                amerindian: 1.95,

                subSaharan: -7.05,
                ethiopian: -8.10
            },
            balanceSynergy: {
                eastAsian: -0.10,
                northAsian: -0.10,
                amerindian: -0.10,
                centralAsian: -0.15,
                northCaucasian: 0.05
            },
            negativeSynergy: {
                eastAsian: -0.10,
                northAsian: -0.10,
                amerindian: -0.10,
                centralAsian: -0.15,
                northCaucasian: 0.50
            }
        },

        {
            value: 'moderate',
            label: 'Moderate',
            contributions: {
                hallstatt: -25.00,
                eastNordic: -25.00,
                tronder: -25.00,
                eastBaltic: -8.70,
                ladogan: -2.85,

                northernSlavic: -16.85,
                centralSlavic: -21.25,
                ponticSlavic: -22.95,

                alpine: -24.00,
                dinaric: -24.00,
                westernMediterranean: -24.00,
                centralMediterranean: -24.00,
                easternMediterranean: -24.00,
                southernMediterranean: -24.00,

                levantine: -24.10,
                iranoAfghan: -22.80,
                armenoid: -24.10,

                caucasion: -22.60,
                caspian: -22.60,

                northAsian: 16.40,
                centralAsian: 7.75,
                eastAsian: 20.45,
                malay: 1.55,
                amerindian: 1.10,

                subSaharan: -25.20,
                ethiopian: -28.85
            },
            balanceSynergy: {
                eastAsian: -0.20,
                northAsian: -0.20,
                malay: -0.20,
                amerindian: -0.20,
                centralAsian: -0.20,
                northCaucasian: 0.05
            },
            negativeSynergy: {
                eastAsian: -0.20,
                northAsian: -0.20,
                malay: -0.20,
                amerindian: -0.20,
                centralAsian: -0.20,
                northCaucasian: 0.50
            }
        },

        {
            value: 'strong',
            label: 'Strong / Pronounced',
            contributions: {
                hallstatt: -40.50,
                eastNordic: -40.50,
                tronder: -40.50,
                eastBaltic: -37.65,
                ladogan: -32.05,

                northernSlavic: -38.00,
                centralSlavic: -40.20,
                ponticSlavic: -40.20,

                alpine: -40.00,
                dinaric: -40.00,
                westernMediterranean: -40.00,
                centralMediterranean: -40.00,
                easternMediterranean: -40.00,
                southernMediterranean: -40.00,

                levantine: -40.00,
                iranoAfghan: -40.00,
                armenoid: -40.00,

                caucasion: -40.00,
                caspian: -40.00,

                northAsian: 25.40,
                centralAsian: 0.80,
                eastAsian: 11.55,
                malay: -1.90,
                amerindian: -1.55,

                subSaharan: -38.00,
                ethiopian: -40.40
            },
            balanceSynergy: {
                eastAsian: -0.50,
                northAsian: -0.50,
                malay: -0.30,
                amerindian: -0.20,
                centralAsian: -0.20,
                northCaucasian: 0.25
            },
            negativeSynergy: {
                eastAsian: -0.50,
                northAsian: -0.50,
                malay: -0.30,
                amerindian: -0.20,
                centralAsian: -0.20,
                northCaucasian: 0.25
            }
        }
    ]
}, {
            id: 'eyeShape',
            category: 'morphological',
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
                    contributions: { hallstatt: -1.5, eastNordic: -1.5, tronder: 0,
                eastBaltic: 0,
                ladogan: 0,
                northernSlavic: 0, centralSlavic: 0, ponticSlavic: 0,
                alpine: 1.5,
                dinaric: 0,
                westernMediterranean: 1.5, centralMediterranean: 1.5, easternMediterranean: 1.5, southernMediterranean: 1.5,
                levantine: 1.5, iranoAfghan: 1.5, armenoid: 1.5,
                caucasion: 0, caspian: 0,
                northAsian: -3, centralAsian: -1.5, eastAsian: -3, malay: 0, amerindian: -1.5,
                subSaharan: 3, ethiopian: 1.5 } },

                { value: 'almond', label: 'Almond',
                    contributions: { hallstatt: 4.5, eastNordic: 4.5, tronder: 3,
                eastBaltic: 3,
                ladogan: 3,
                northernSlavic: 4.5, centralSlavic: 4.5, ponticSlavic: 4.5,
                alpine: 3,
                dinaric: 3,
                westernMediterranean: 4.5, centralMediterranean: 4.5, easternMediterranean: 4.5, southernMediterranean: 4.5,
                levantine: 4.5, iranoAfghan: 4.5, armenoid: 3,
                caucasion: 4, caspian: 4,
                northAsian: 3, centralAsian: 4.5, eastAsian: 3, malay: 3, amerindian: 1.5,
                subSaharan: 1.5, ethiopian: 3 } },
                { value: 'horizontal', label: 'Horizontal / Narrow',
                    contributions: { hallstatt: 1.5, eastNordic: 1.5, tronder: 1.5,
                eastBaltic: 3,
                ladogan: 3,
                northernSlavic: 1.5, centralSlavic: 1.5, ponticSlavic: 1.5,
                alpine: 1.5,
                dinaric: 1.5,
                westernMediterranean: 0, centralMediterranean: 0, easternMediterranean: 0, southernMediterranean: 0,
                levantine: 1.5, iranoAfghan: 0, armenoid: 1.5,
                caucasion: 2, caspian: 4,
                northAsian: 15, centralAsian: 8, eastAsian: 18, malay: 6, amerindian: 8,
                subSaharan: -1.5, ethiopian: 0 } },
                { value: 'upturned', label: 'Upturned (Lateral Canthus Higher)',
                    contributions: { hallstatt: 0, eastNordic: 0, tronder: 1.5,
                eastBaltic: 1.5,
                ladogan: 1.5,
                northernSlavic: 3, centralSlavic: 3, ponticSlavic: 3,
                alpine: 1.5,
                dinaric: 1.5,
                westernMediterranean: 1.5, centralMediterranean: 1.5, easternMediterranean: 1.5, southernMediterranean: 1.5,
                levantine: 1.5, iranoAfghan: 1.5, armenoid: 1.5,
                caucasion: 0, caspian: 2,
                northAsian: 4.5, centralAsian: 3, eastAsian: 4.5, malay: 3, amerindian: 4.5,
                subSaharan: 1.5, ethiopian: 1.5 } },
                { value: 'downturned', label: 'Downturned (Lateral Canthus Lower)',
                    contributions: { hallstatt: 0, eastNordic: 0, tronder: 0,
                eastBaltic: -1.5,
                ladogan: -1.5,
                northernSlavic: -1.5, centralSlavic: -0.75, ponticSlavic: 0,
                alpine: 0,
                dinaric: 0,
                westernMediterranean: 0, centralMediterranean: 0, easternMediterranean: 0, southernMediterranean: 0,
                levantine: 0, iranoAfghan: 0, armenoid: 0,
                caucasion: 0, caspian: 0,
                northAsian: -3, centralAsian: -1.5, eastAsian: -3, malay: -1.5, amerindian: -3,
                subSaharan: 0, ethiopian: 0 } }
            ]
        }, {
    id: 'innerCanthalDistance',
    category: 'morphological',

    number: 10,

    weightClass: 'B',

    title: 'Inner Canthal Distance',

    definition: 'Distance between the inner canthi (medial corners) of the eyes.',

    measurement: 'Sliding calipers: inner canthus to inner canthus, in millimeters.',

    unit: 'mm → categorical',

    guideImage: 'inner-canthal-distance.png',

    type: 'select',

    options: [

        {
            value: '',
            label: '— Select Inner Canthal Distance —',
            contributions: {}
        },

        {
            value: 'narrow',
            label: 'Narrow (< 30 mm)',
            contributions: {
                hallstatt: 4.10,
                eastNordic: 2,
                tronder: -3.15,

                eastBaltic: -3.05,
                ladogan: -4.55,

                northernSlavic: -4.10,
                centralSlavic: -3.00,
                ponticSlavic: 0,

                alpine: -4.35,
                dinaric: -5.65,
                westernMediterranean: 0,
                centralMediterranean: -2.10,
                easternMediterranean: -3.00,
                southernMediterranean: -1.85,

                levantine: 0,
                iranoAfghan: 1,
                armenoid: 0,

                caucasion: -5.25,
                caspian: 1.00,

                northAsian: -7.70,
                centralAsian: -3.30,
                eastAsian: -7.70,
                malay: -7.70,
                amerindian: -5.15,

                subSaharan: -5.50,
                ethiopian: -3.30
            }
        },

        {
            value: 'average',
            label: 'Average (30–35 mm)',
            contributions: {
                hallstatt: 0,
                eastNordic: 0,
                tronder: 0,

                eastBaltic: 0,
                ladogan: 0,

                northernSlavic: 0,
                centralSlavic: 0,
                ponticSlavic: 0,

                alpine: 0,
                dinaric: 0,
                westernMediterranean: 0,
                centralMediterranean: 0,
                easternMediterranean: 0,
                southernMediterranean: 0,

                levantine: 0,
                iranoAfghan: 0,
                armenoid: 0,

                caucasion: 0,
                caspian: 0,

                northAsian: -1,
                centralAsian: 0,
                eastAsian: -1,
                malay: 0,
                amerindian: 0,

                subSaharan: 0,
                ethiopian: 0
            }
        },

        {
            value: 'wide',
            label: 'Wide (> 35 mm)',
            contributions: {
                hallstatt: -5.40,
                eastNordic: -5.40,
                tronder: -4.10,

                eastBaltic: -3.00,
                ladogan: -2.20,

                northernSlavic: -4.25,
                centralSlavic: -4.05,
                ponticSlavic: -4.00,

                alpine: -2.10,
                dinaric: 4.30,
                westernMediterranean: -5.60,
                centralMediterranean: -4.25,
                easternMediterranean: -4.25,
                southernMediterranean: -4.75,

                levantine: -5.00,
                iranoAfghan: -5.00,
                armenoid: -5.00,

                caucasion: -2.25,
                caspian: -4.95,

                northAsian: 7.65,
                centralAsian: -2.70,
                eastAsian: 6.00,
                malay: -0.60,
                amerindian: 1.50,

                subSaharan: 3.05,
                ethiopian: -4.15
            }
        }

    ]
}, {
            id: 'noseType',
            category: 'morphological',
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
                {
    value: 'leptorrhine',
            label: 'Leptorrhine — Narrow Nose (< 70)',
            contributions: {
                hallstatt: 27.90,
                eastNordic: 27.90,
                tronder: 25.00,

                eastBaltic: 16.75,
                ladogan: 11.45,

                northernSlavic: 22.00,
                centralSlavic: 21.10,
                ponticSlavic: 22.00,

                alpine: 0.85,
                dinaric: 26.20,
                westernMediterranean: 20.70,
                centralMediterranean: 20.70,
                easternMediterranean: 18.35,
                southernMediterranean: 18.35,

                levantine: 17.05,
                iranoAfghan: 17.25,
                armenoid: 23.65,

                caucasion: 23.10,
                caspian: 18.90,

                northAsian: -2.45,
                centralAsian: 22.75,
                eastAsian: -23.80,
                malay: -30.90,
                amerindian: -5.80,

                subSaharan: -34.80,
                ethiopian: 11.90
            }
        },

        {
            value: 'mesorrhine',
            label: 'Mesorrhine — Medium Nose (70–85)',
            contributions: {
                hallstatt: -23.80,
                eastNordic: -23.80,
                tronder: -16.60,

                eastBaltic: 7.05,
                ladogan: 17.30,

                northernSlavic: -14.65,
                centralSlavic: -10.05,
                ponticSlavic: -14.65,

                alpine: 24.65,
                dinaric: -17.45,
                westernMediterranean: -6.15,
                centralMediterranean: -6.15,
                easternMediterranean: -2.50,
                southernMediterranean: -2.50,

                levantine: 3.70,
                iranoAfghan: 0.60,
                armenoid: -11.20,

                caucasion: -11.00,
                caspian: 0.65,

                northAsian: 18.30,
                centralAsian: 0.75,
                eastAsian: 23.25,
                malay: 15.90,
                amerindian: 14.00,

                subSaharan: -3.00,
                ethiopian: 13.00
            },
            balanceSynergy: {
                alpine: -0.10
            }
        },

        {
            value: 'platyrrhine',
            label: 'Platyrrhine — Broad Nose (> 85)',
            contributions: {
                hallstatt: -24.00,
                eastNordic: -24.00,
                tronder: -24.00,

                eastBaltic: -24.00,
                ladogan: -24.00,

                northernSlavic: -24.00,
                centralSlavic: -24.00,
                ponticSlavic: -24.00,

                alpine: -24.00,
                dinaric: -24.00,
                westernMediterranean: -24.00,
                centralMediterranean: -24.00,
                easternMediterranean: -24.00,
                southernMediterranean: -24.00,

                levantine: -24.00,
                iranoAfghan: -24.00,
                armenoid: -24.00,

                caucasion: -24.00,
                caspian: -24.00,

                northAsian: -22.10,
                centralAsian: -22.10,
                eastAsian: -4.85,
                malay: 4.05,
                amerindian: -2.95,

                subSaharan: 26.50,
                ethiopian: -29.15
            },
            balanceSynergy: {
                subSaharan: -0.20
            }
}
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
  category: 'morphological',
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
        hallstatt: 8.70,
        eastNordic: 7.90,
        tronder: 4.70,
        eastBaltic: 5.60,
        ladogan: 4.80,

        northernSlavic: 6.90,
        centralSlavic: 7.35,
        ponticSlavic: 6.85,

        alpine: 6.60,
        dinaric: -3.20,

        westernMediterranean: 6.90,
        centralMediterranean: 4.90,
        easternMediterranean: 4.90,
        southernMediterranean: 4.65,

        levantine: 3.75,
        iranoAfghan: -0.35,
        armenoid: -2.90,

        caucasion: 6.35,
        caspian: 8.10,

        northAsian: 6.20,
        centralAsian: 7.10,
        eastAsian: 5.60,
        malay: 6.30,
        amerindian: 4.45,

        subSaharan: 7.00,
        ethiopian: 6.35
    }
},

{
    value: 'concave',
    label: 'Concave (Saddle/Retroussé)',
    contributions: {
        hallstatt: -5.85,
        eastNordic: -8.35,
        tronder: -10.05,
        eastBaltic: 5.85,
        ladogan: 8.20,

        northernSlavic: -1.70,
        centralSlavic: -3.90,
        ponticSlavic: -5.15,

        alpine: 1.10,
        dinaric: -8.50,

        westernMediterranean: -4.60,
        centralMediterranean: -7.10,
        easternMediterranean: -7.10,
        southernMediterranean: -6.25,

        levantine: -8.40,
        iranoAfghan: -8.40,
        armenoid: -2.80,

        caucasion: -7.00,
        caspian: -8.15,

        northAsian: 4.25,
        centralAsian: -5.85,
        eastAsian: 4.20,
        malay: 3.30,
        amerindian: -1.35,

        subSaharan: 2.55,
        ethiopian: -2.40
    }
},

{
    value: 'slconvex',
    label: 'Slight Convex',
    contributions: {
        hallstatt: 0.80,
        eastNordic: 2.00,
        tronder: 8.00,
        eastBaltic: -5.60,
        ladogan: -5.80,

        northernSlavic: -0.65,
        centralSlavic: -1.00,
        ponticSlavic: 0.25,

        alpine: -0.50,
        dinaric: 2.95,

        westernMediterranean: 2.55,
        centralMediterranean: 2.90,
        easternMediterranean: 3.95,
        southernMediterranean: 3.35,

        levantine: 5.85,
        iranoAfghan: 2.50,
        armenoid: 2.65,

        caucasion: 2.80,
        caspian: 0.90,

        northAsian: -5.40,
        centralAsian: 1.20,
        eastAsian: -2.40,
        malay: -5.30,
        amerindian: 1.40,

        subSaharan: -5.70,
        ethiopian: 2.65
    }
},

{
    value: 'stconvex',
    label: 'Strong Convex (Aquiline/Roman)',
    contributions: {
        hallstatt: -8.05,
        eastNordic: -6.40,
        tronder: -8.05,
        eastBaltic: -8.05,
        ladogan: -8.05,

        northernSlavic: -8.05,
        centralSlavic: -7.45,
        ponticSlavic: -8.05,

        alpine: -8.25,
        dinaric: 8.65,

        westernMediterranean: -5.45,
        centralMediterranean: 0.70,
        easternMediterranean: -0.70,
        southernMediterranean: 1.10,

        levantine: -0.45,
        iranoAfghan: 6.20,
        armenoid: 6.50,

        caucasion: -0.95,
        caspian: -5.40,

        northAsian: -8.70,
        centralAsian: -5.55,
        eastAsian: -8.70,
        malay: -8.70,
        amerindian: 2.80,

        subSaharan: -8.40,
        ethiopian: -5.00
    }
},

{
    value: 'wavy',
    label: 'Wavy / Irregular',
    contributions: {
        hallstatt: -8.20,
        eastNordic: -8.20,
        tronder: -3.90,
        eastBaltic: -7.40,
        ladogan: -7.45,

        northernSlavic: -8.10,
        centralSlavic: -8.10,
        ponticSlavic: -6.40,

        alpine: -4.95,
        dinaric: -7.55,

        westernMediterranean: -8.25,
        centralMediterranean: -5.10,
        easternMediterranean: -5.10,
        southernMediterranean: -7.50,

        levantine: -4.85,
        iranoAfghan: -4.85,
        armenoid: -7.05,

        caucasion: -5.40,
        caspian: -8.40,

        northAsian: -8.15,
        centralAsian: -8.15,
        eastAsian: -7.45,
        malay: -6.80,
        amerindian: -5.55,

        subSaharan: -8.00,
        ethiopian: -8.00
    }
}
  ]
},
        
        
        
        
        {
            id: 'forehead',
            category: 'morphological',
            number: 13,
            weightClass: 'B',
            title: 'Forehead Morphology',
            definition: 'Composite assessment of forehead height, width, and slope.',
            measurement: 'Visual assessment with optional caliper measurements.',
            unit: 'Categorical (3 sub-traits)',
            guideImage: 'forehead-morphology.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
            type: 'composite',
            subTraits: [
                { id: 'foreheadHeight', category: 'morphological', label: 'Height',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'low', label: 'Low',
                            contributions: { hallstatt: -6.50,
        eastNordic: -6.50,
        tronder: -3.50,

        eastBaltic: 4.10,
        ladogan: 4.10,

        northernSlavic: -1.25,
        centralSlavic: -2.00,
        ponticSlavic: -3.20,

        alpine: -3.15,
        dinaric: -4.55,

        westernMediterranean: -3.15,
        centralMediterranean: 1.60,
        easternMediterranean: -3.15,
        southernMediterranean: -1.70,

        levantine: -4.15,
        iranoAfghan: -4.15,
        armenoid: -3.15,

        caucasion: -3.00,
        caspian: -3.00,

        northAsian: -3.45,
        centralAsian: -0.50,
        eastAsian: -2.25,
        malay: 2.70,
        amerindian: 0.25,

        subSaharan: 0.65,
        ethiopian: -5.05
    }
},

{
    value: 'average',
    label: 'Average',
    contributions: {
        hallstatt: -0.55,
        eastNordic: -0.55,
        tronder: 0,

        eastBaltic: 0,
        ladogan: 0,

        northernSlavic: 1,
        centralSlavic: 1,
        ponticSlavic: 1,

        alpine: 1,
        dinaric: 0,

        westernMediterranean: 0,
        centralMediterranean: 1,
        easternMediterranean: 1,
        southernMediterranean: 1,

        levantine: 1.,
        iranoAfghan: 0,
        armenoid: -0.60,

        caucasion: 1,
        caspian: 1,

        northAsian: 1,
        centralAsian: 1,
        eastAsian: 1,
        malay: 0,
        amerindian: 0,

        subSaharan: 0,
        ethiopian: -0.55
    }
},

{
    value: 'high',
    label: 'High',
    contributions: {
        hallstatt: 5.25,
        eastNordic: 5.25,
        tronder: 2.40,

        eastBaltic: -5.70,
        ladogan: -7.50,

        northernSlavic: -3.20,
        centralSlavic: -2.00,
        ponticSlavic: -1.25,

        alpine: -0.55,
        dinaric: 4.40,

        westernMediterranean: 2.60,
        centralMediterranean: -3.80,
        easternMediterranean: 0.10,
        southernMediterranean: -2.05,

        levantine: 0.15,
        iranoAfghan: 3.70,
        armenoid: 3.70,

        caucasion: 2.35,
        caspian: 0.15,

        northAsian: 0.35,
        centralAsian: -2.10,
        eastAsian: -2.30,
        malay: -4.15,
        amerindian: 0.30,

        subSaharan: 0.70,
        ethiopian: 4.80 } }
                    ] }, { id: 'foreheadWidth', category: 'morphological', label: 'Width',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'narrow', label: 'Narrow',
                            contributions: { hallstatt: 4.60,
        eastNordic: 4.00,
        tronder: -3.70,

        eastBaltic: -6.80,
        ladogan: -3.70,

        northernSlavic: -3.30,
        centralSlavic: -1.20,
        ponticSlavic: -1.05,

        alpine: -6.30,
        dinaric: -3.40,

        westernMediterranean: -1.20,
        centralMediterranean: 2.90,
        easternMediterranean: -2.15,
        southernMediterranean: 1.05,

        levantine: -3.30,
        iranoAfghan: 0.35,
        armenoid: -4.60,

        caucasion: -6.00,
        caspian: 4.75,

        northAsian: -4.30,
        centralAsian: -1.95,
        eastAsian: -1.95,
        malay: -1.75,
        amerindian: -4.35,

        subSaharan: 4.10,
        ethiopian: -6.00
    }
},

{
    value: 'average',
    label: 'Average',
    contributions: {
        hallstatt: 0,
        eastNordic: 0,
        tronder: 1,

        eastBaltic: 0,
        ladogan: 0,

        northernSlavic: 1,
        centralSlavic: 1,
        ponticSlavic: 1,

        alpine: -2.60,
        dinaric: 1,

        westernMediterranean: 1,
        centralMediterranean: 0,
        easternMediterranean: 1,
        southernMediterranean: 1,

        levantine: -0.05,
        iranoAfghan: 1,
        armenoid: 1,

        caucasion: -0.35,
        caspian: 0,

        northAsian: -0.45,
        centralAsian: 1,
        eastAsian: 1,
        malay: 1,
        amerindian: 0,

        subSaharan: 0,
        ethiopian: 0
    }
},

{
    value: 'broad',
    label: 'Broad',
    contributions: {
        hallstatt: -7.00,
        eastNordic: -7.00,
        tronder: 0.70,

        eastBaltic: 5.05,
        ladogan: 3.30,

        northernSlavic: 0.15,
        centralSlavic: -1.20,
        ponticSlavic: -2.00,

        alpine: 6.20,
        dinaric: 1.40,

        westernMediterranean: -2.30,
        centralMediterranean: -5.20,
        easternMediterranean: -0.50,
        southernMediterranean: -5.10,

        levantine: 4.25,
        iranoAfghan: -4.00,
        armenoid: 0.90,

        caucasion: 5.00,
        caspian: -6.05,

        northAsian: 4.70,
        centralAsian: -2.25,
        eastAsian: -2.25,
        malay: -3.50,
        amerindian: 3.30,

        subSaharan: -4.15,
        ethiopian: 4.00 } }
                    ] }, { id: 'foreheadSlope', category: 'morphological', label: 'Slope',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'vertical', label: 'Vertical',
                            contributions: {
        hallstatt: 1,
        eastNordic: -3.75,
        tronder: -5.25,

        eastBaltic: 4.00,
        ladogan: 2.75,

        northernSlavic: 0.75,
        centralSlavic: 2.50,
        ponticSlavic: 0.75,

        alpine: 4.85,
        dinaric: -1.40,

        westernMediterranean: 0.10,
        centralMediterranean: -1.40,
        easternMediterranean: 3.60,
        southernMediterranean: -1.05,

        levantine: 0.35,
        iranoAfghan: -3.10,
        armenoid: -4.65,

        caucasion: -6.00,
        caspian: 4.75,

        northAsian: 3.50,
        centralAsian: 0.10,
        eastAsian: 0.30,
        malay: 0.30,
        amerindian: -1.00,

        subSaharan: 3.05,
        ethiopian: 3.05
    }
},

{
    value: 'moderate',
    label: 'Moderate Slope',
    contributions: {
        hallstatt: 0,
        eastNordic: 0,
        tronder: 0,

        eastBaltic: 0,
        ladogan: 0,

        northernSlavic: 0,
        centralSlavic: 0,
        ponticSlavic: 0,

        alpine: 0,
        dinaric: 0,

        westernMediterranean: 0,
        centralMediterranean: 0,
        easternMediterranean: 0,
        southernMediterranean: 0,

        levantine: 0,
        iranoAfghan: 0,
        armenoid: 0,

        caucasion: 0,
        caspian: 0,

        northAsian: 0,
        centralAsian: 0,
        eastAsian: 0,
        malay: 0,
        amerindian: 0,

        subSaharan: 0,
        ethiopian: 0
    }
},

{
    value: 'sloping',
    label: 'Sloping',
    contributions: {
        hallstatt: -1.20,
        eastNordic: 3.30,
        tronder: 0.55,

        eastBaltic: -6.50,
        ladogan: -3.50,

        northernSlavic: -4.15,
        centralSlavic: -4.15,
        ponticSlavic: -3.15,

        alpine: -5.75,
        dinaric: -0.55,

        westernMediterranean: -2.05,
        centralMediterranean: -0.55,
        easternMediterranean: -4.30,
        southernMediterranean: -4.30,

        levantine: -3.85,
        iranoAfghan: 0.30,
        armenoid: 4.00,

        caucasion: 4.60,
        caspian: -6.05,

        northAsian: -4.35,
        centralAsian: -3.05,
        eastAsian: -1.90,
        malay: -1.90,
        amerindian: -1.75,

        subSaharan: -4.00,
        ethiopian: -4.00 } }
                    ] }
            ]
        }, {
            id: 'chin',
            category: 'morphological',
            number: 14,
            weightClass: 'B',
            title: 'Chin Morphology',
            definition: 'Assessment of mental protuberance projection, presence of cleft, and width.',
            measurement: 'Visual assessment and palpation.',
            unit: 'Categorical (3 sub-traits)',
            guideImage: 'chin-morphology.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
            type: 'composite',
            subTraits: [
                { id: 'chinProjection', category: 'morphological', label: 'Projection',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'weak', label: 'Weak / Receding',
                            contributions: { hallstatt: -7.10,
        eastNordic: -9.20,
        tronder: -7.00,

        eastBaltic: 4.95,
        ladogan: 5.80,

        northernSlavic: -4.30,
        centralSlavic: -4.30,
        ponticSlavic: -2.65,

        alpine: -0.75,
        dinaric: -8.40,

        westernMediterranean: -8.40,
        centralMediterranean: 0.20,
        easternMediterranean: -3.05,
        southernMediterranean: 0.20,

        levantine: 1.25,
        iranoAfghan: -6.50,
        armenoid: -6.50,

        caucasion: -7.35,
        caspian: -5.90,

        northAsian: 7.65,
        centralAsian: -0.55,
        eastAsian: 3.40,
        malay: -0.55,
        amerindian: -0.55,

        subSaharan: 6.75,
        ethiopian: 0.25
    }
},

{
    value: 'moderate',
    label: 'Moderate',
    contributions: {
        hallstatt: 0,
        eastNordic: 0,
        tronder: -0.55,

        eastBaltic: 0,
        ladogan: 0,

        northernSlavic: 0,
        centralSlavic: 0,
        ponticSlavic: 0,

        alpine: 0,
        dinaric: -1.00,

        westernMediterranean: 0,
        centralMediterranean: 0,
        easternMediterranean: 0,
        southernMediterranean: 0,

        levantine: 0,
        iranoAfghan: 0,
        armenoid: 0,

        caucasion: -1.00,
        caspian: 0,

        northAsian: -2.10,
        centralAsian: 0,
        eastAsian: 0,
        malay: 0,
        amerindian: 0,

        subSaharan: 0,
        ethiopian: 0
    }
},

{
    value: 'strong',
    label: 'Strong / Projecting',
    contributions: {
        hallstatt: -0.75,
        eastNordic: 7.10,
        tronder: 6.60,

        eastBaltic: -9.80,
        ladogan: -9.80,

        northernSlavic: 0.20,
        centralSlavic: -1.65,
        ponticSlavic: -5.55,

        alpine: -6.90,
        dinaric: 7.75,

        westernMediterranean: 0.15,
        centralMediterranean: -6.90,
        easternMediterranean: -0.95,
        southernMediterranean: -8.95,

        levantine: -8.50,
        iranoAfghan: 4.50,
        armenoid: 4.50,

        caucasion: 7.75,
        caspian: -0.70,

        northAsian: -6.70,
        centralAsian: -4.25,
        eastAsian: -5.70,
        malay: -5.65,
        amerindian: -5.65,

        subSaharan: -7.70,
        ethiopian: -4.60
    }
}
                    ] }, { id: 'chinCleft', category: 'morphological', label: 'Cleft',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'absent', label: 'Absent',
                            contributions: { hallstatt: 0, eastNordic: 0, tronder: 0,
                eastBaltic: 0,
                ladogan: 0,
                northernSlavic: 0, centralSlavic: 0, ponticSlavic: 0,
                alpine: 0,
                dinaric: 0,
                westernMediterranean: 0, centralMediterranean: 0, easternMediterranean: 0, southernMediterranean: 0,
                levantine: 0, iranoAfghan: 0, armenoid: 0,
                caucasion: 0, caspian: 0,
                northAsian: 0, eastAsian: 0, malay: 0, amerindian: 0,
                subSaharan: 0, ethiopian: 0 } },
                        { value: 'present', label: 'Present (Cleft Chin)',
                            contributions: { hallstatt: 4, eastNordic: 4, tronder: 2,
                eastBaltic: 0,
                ladogan: 2,
                northernSlavic: 2, centralSlavic: 2, ponticSlavic: 2,
                alpine: 2,
                dinaric: 2,
                westernMediterranean: 4, centralMediterranean: 4, easternMediterranean: 4, southernMediterranean: 2,
                levantine: 2, iranoAfghan: 2, armenoid: 2,
                caucasion: 0, caspian: 0,
                northAsian: -2, centralAsian: 0, eastAsian: -2, malay: 0, amerindian: -2,
                subSaharan: 0, ethiopian: 0 } }
                    ] }, { id: 'chinWidth', category: 'morphological', label: 'Width',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'narrow', label: 'Narrow',
                            contributions: { hallstatt: 5.30,
                eastNordic: 5.30,
                tronder: -4.60,
                eastBaltic: -2.90,
                ladogan: -4.60,
                northernSlavic: -2.40,
                centralSlavic: -2.15,
                ponticSlavic: -1.95,
                alpine: -4.40,
                dinaric: -4.40,
                westernMediterranean: 2.45,
                centralMediterranean: 4.75,
                easternMediterranean: -1.55,
                southernMediterranean: 0.15,
                levantine: 0.15,
                iranoAfghan: 4.15,
                armenoid: -4.75,
                caucasion: -4.80,
                caspian: 2.75,
                northAsian: -2.50,
                centralAsian: -2.50,
                eastAsian: 0.15,
                malay: -2.50,
                amerindian: -2.50,
                subSaharan: -4.80,
                ethiopian: 2.75
            }
        },
        {
            value: 'average',
            label: 'Average',
            contributions: {
                hallstatt: 0.05,
                eastNordic: 0.05,
                tronder: -0.35,
                eastBaltic: 1.60,
                ladogan: 0.05,
                northernSlavic: 1.90,
                centralSlavic: 2.10,
                ponticSlavic: 1.85,
                alpine: 1.70,
                dinaric: 0.45,
                westernMediterranean: 0.80,
                centralMediterranean: 0.10,
                easternMediterranean: 2.30,
                southernMediterranean: 1.70,
                levantine: 1.70,
                iranoAfghan: 0.50,
                armenoid: 1.70,
                caucasion: 0.45,
                caspian: 0.75,
                northAsian: 1.55,
                centralAsian: 1.55,
                eastAsian: 1.55,
                malay: 2.15,
                amerindian: 1.15,
                subSaharan: 0.45,
                ethiopian: 0.75
            }
        },
        {
            value: 'broad',
            label: 'Broad',
            contributions: {
                hallstatt: -6.60,
                eastNordic: -6.60,
                tronder: 5.25,
                eastBaltic: 0.85,
                ladogan: 4.55,
                northernSlavic: -1.25,
                centralSlavic: -2.25,
                ponticSlavic: -1.25,
                alpine: 0.95,
                dinaric: 4.25,
                westernMediterranean: -2.65,
                centralMediterranean: -4.20,
                easternMediterranean: -2.65,
                southernMediterranean: -2.65,
                levantine: -2.55,
                iranoAfghan: -4.10,
                armenoid: 1.00,
                caucasion: 4.30,
                caspian: -3.35,
                northAsian: 0.15,
                centralAsian: 0.15,
                eastAsian: -2.75,
                malay: -1.50,
                amerindian: 1.70,
                subSaharan: 4.30,
                ethiopian: -3.35 } }
                    ] }
            ]
        }, {
            id: 'eyebrows',
            category: 'morphological',
            number: 15,
            weightClass: 'C',
            title: 'Eyebrow Characteristics',
            definition: 'Assessment of eyebrow shape, density, and position relative to the orbital rim.',
            measurement: 'Visual assessment.',
            unit: 'Categorical (3 sub-traits)',
            guideImage: 'eyebrow-characteristic.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
            type: 'composite',
            subTraits: [
                { id: 'eyebrowShape', category: 'morphological', label: 'Shape',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'straight', label: 'Straight',
                            contributions: { hallstatt: 0.90,
                eastNordic: 0.70,
                tronder: 1.10,
                eastBaltic: 0.90,
                ladogan: 0.70,
                northernSlavic: 1.20,
                centralSlavic: 0.70,
                ponticSlavic: 0.20,
                alpine: 0.45,
                dinaric: -0.50,
                westernMediterranean: -0.05,
                centralMediterranean: 0.80,
                easternMediterranean: -0.20,
                southernMediterranean: -0.90,
                levantine: -0.85,
                iranoAfghan: -0.85,
                armenoid: 0.05,
                caucasion: 0.75,
                caspian: 0.30,
                northAsian: 1.30,
                centralAsian: 0.05,
                eastAsian: 1.50,
                malay: 0.70,
                amerindian: 0.70,
                subSaharan: -0.50,
                ethiopian: -0.85
            }
        },
        {
            value: 'arched',
            label: 'Arched',
            contributions: {
                hallstatt: 0.30,
                eastNordic: 0.50,
                tronder: 0.05,
                eastBaltic: 0.30,
                ladogan: 0.50,
                northernSlavic: 0.30,
                centralSlavic: 0.50,
                ponticSlavic: 1.05,
                alpine: 0.80,
                dinaric: 0.70,
                westernMediterranean: 1.00,
                centralMediterranean: 0.30,
                easternMediterranean: 1.10,
                southernMediterranean: 1.10,
                levantine: 1.05,
                iranoAfghan: 1.40,
                armenoid: 0.95,
                caucasion: 0.30,
                caspian: 0.75,
                northAsian: -0.20,
                centralAsian: 0.80,
                eastAsian: -0.55,
                malay: 0.30,
                amerindian: 0.30,
                subSaharan: 1.25,
                ethiopian: 1.25
            }
        },
        {
            value: 'angled',
            label: 'Angled',
            contributions: {
                hallstatt: -0.80,
                eastNordic: -0.80,
                tronder: -0.80,
                eastBaltic: -0.80,
                ladogan: -0.80,
                northernSlavic: -1.25,
                centralSlavic: -0.80,
                ponticSlavic: -0.80,
                alpine: -0.95,
                dinaric: 0.30,
                westernMediterranean: -0.50,
                centralMediterranean: -0.50,
                easternMediterranean: -0.50,
                southernMediterranean: 0.05,
                levantine: 0.05,
                iranoAfghan: -0.50,
                armenoid: -0.50,
                caucasion: -0.45,
                caspian: -0.45,
                northAsian: -0.85,
                centralAsian: -0.20,
                eastAsian: -0.85,
                malay: -0.45,
                amerindian: -0.45,
                subSaharan: -0.85,
                ethiopian: -0.50 } }
                    ] }, { id: 'eyebrowDensity', category: 'morphological', label: 'Density',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'sparse', label: 'Sparse',
                            contributions: { hallstatt: 2, eastNordic: 1, tronder: 1,
                eastBaltic: 1,
                ladogan: 1,
                northernSlavic: 1, centralSlavic: 1, ponticSlavic: 0,
                alpine: 0,
                dinaric: 0,
                westernMediterranean: 0, centralMediterranean: 0, easternMediterranean: 0, southernMediterranean: 0,
                levantine: 0, iranoAfghan: 0, armenoid: 0,
                caucasion: -1.5, caspian: 0,
                northAsian: -1, centralAsian: -1, eastAsian: -1, malay: -1, amerindian: -1,
                subSaharan: 0, ethiopian: 0 } },
                        { value: 'moderate', label: 'Moderate',
                            contributions: { hallstatt: 0, eastNordic: 0, tronder: 0,
                eastBaltic: 0,
                ladogan: 0,
                northernSlavic: 0, centralSlavic: 0, ponticSlavic: 0,
                alpine: 0,
                dinaric: 0,
                westernMediterranean: 0, centralMediterranean: 0, easternMediterranean: 0, southernMediterranean: 0,
                levantine: 0, iranoAfghan: 0, armenoid: 0,
                caucasion: 0, caspian: 0,
                northAsian: 0, eastAsian: 0, malay: 0, amerindian: 0,
                subSaharan: 0, ethiopian: 0 } },
                        { value: 'dense', label: 'Dense / Bushy',
                            contributions: { hallstatt: -1, eastNordic: 0, tronder: 0,
                eastBaltic: 0,
                ladogan: 0,
                northernSlavic: 0, centralSlavic: 0, ponticSlavic: 1,
                alpine: 1,
                dinaric: 2,
                westernMediterranean: 2, centralMediterranean: 2, easternMediterranean: 3, southernMediterranean: 2,
                levantine: 4, iranoAfghan: 4, armenoid: 5,
                caucasion: 4.5, caspian: 3,
                northAsian: -1, centralAsian: 0, eastAsian: -2, malay: 0, amerindian: -1,
                subSaharan: 1, ethiopian: 0 } }
                    ] }, { id: 'eyebrowPosition', category: 'morphological', label: 'Position',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'low', label: 'Low (Close to Orbit)',
                            contributions: { hallstatt: -1, eastNordic: 0, tronder: 0,
                eastBaltic: 1,
                ladogan: 0,
                northernSlavic: 0, centralSlavic: 0, ponticSlavic: 1,
                alpine: 1,
                dinaric: 1,
                westernMediterranean: 1, centralMediterranean: 1, easternMediterranean: 2, southernMediterranean: 1,
                levantine: 2, iranoAfghan: 2, armenoid: 2,
                caucasion: 3, caspian: 1.5,
                northAsian: 1, centralAsian: 1, eastAsian: 1, malay: 1, amerindian: 1,
                subSaharan: 1, ethiopian: 0 } },
                        { value: 'average', label: 'Average',
                            contributions: { hallstatt: 0, eastNordic: 0, tronder: 0,
                eastBaltic: 0,
                ladogan: 0,
                northernSlavic: 0, centralSlavic: 0, ponticSlavic: 0,
                alpine: 0,
                dinaric: 0,
                westernMediterranean: 0, centralMediterranean: 0, easternMediterranean: 0, southernMediterranean: 0,
                levantine: 0, iranoAfghan: 0, armenoid: 0,
                caucasion: 0, caspian: 0,
                northAsian: 0, centralAsian: 0, eastAsian: 0, malay: 0, amerindian: 0,
                subSaharan: 0, ethiopian: 0 } },
                        { value: 'high', label: 'High (Above Orbit)',
                            contributions: { hallstatt: 3, eastNordic: 2, tronder: 1,
                eastBaltic: 0,
                ladogan: 1,
                northernSlavic: 1, centralSlavic: 1, ponticSlavic: 0,
                alpine: 0,
                dinaric: 0,
                westernMediterranean: 1, centralMediterranean: 1, easternMediterranean: 1, southernMediterranean: 1,
                levantine: 0, iranoAfghan: 0, armenoid: 0,
                caucasion: 1.5, caspian: 1.5,
                northAsian: -1, centralAsian: -1, eastAsian: -1, malay: -1, amerindian: -1,
                subSaharan: -1, ethiopian: 0 } }
                    ] }, {id: 'monobrow', category: 'morphological', label: 'Monobrow',
                    options: [
                         {value: '', label: '—', contributions: {}},
        {
            value: 'none',
            label: 'Absent',
            contributions: { hallstatt: 2, eastNordic: 2, tronder: 1,
                eastBaltic: 1,
                ladogan: 1,
                northernSlavic: 1, centralSlavic: 1, ponticSlavic: 0,
                caucasion: 0.75, caspian: 0,
                northAsian: 1, centralAsian: -1, eastAsian: 1 }
        },
        {
            value: 'slight',
            label: 'Slight',
            contributions: { ponticSlavic: 1,
                dinaric: 2,
                westernMediterranean: 1, centralMediterranean: 1, easternMediterranean: 2, southernMediterranean: 2,
                levantine: 2, iranoAfghan: 2, armenoid: 2,
                caucasion: 1.5, caspian: 1.5, centralAsian: 1 }
        },
        {
            value: 'moderate',
            label: 'Moderate',
            contributions: { hallstatt: -2, eastNordic: -1,
                dinaric: 2,
                westernMediterranean: 2, centralMediterranean: 2, easternMediterranean: 3, southernMediterranean: 3,
                levantine: 8, iranoAfghan: 8, armenoid: 10,
                caucasion: 1.5, caspian: 3, centralAsian: 2 }
        },
        {
            value: 'strong',
            label: 'Strong / Complete',
            contributions: { hallstatt: -3, eastNordic: -2,
                dinaric: 3,
                westernMediterranean: 2, centralMediterranean: 2, easternMediterranean: 4, southernMediterranean: 3,
                levantine: 12, iranoAfghan: 10, armenoid: 12,
                caucasion: 0, caspian: 1.5,
                northAsian: -2, centralAsian: 3, eastAsian: -2 }
        }
    ]

                    }
            ]
        }, {
            id: 'browRidges',
            category: 'morphological',
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
                    contributions: { hallstatt: 3, eastNordic: 1.5, tronder: 1.5,
                eastBaltic: 1.5,
                ladogan: 1.5,
                northernSlavic: 3, centralSlavic: 3, ponticSlavic: 1.5,
                alpine: 0,
                dinaric: 0,
                westernMediterranean: 1.5, centralMediterranean: 1.5, easternMediterranean: 1.5, southernMediterranean: 1.5,
                levantine: 1.5, iranoAfghan: 0, armenoid: -1.5,
                caucasion: -10.5, caspian: 0,
                northAsian: 3, centralAsian: 3, eastAsian: 3, malay: 3, amerindian: 3,
                subSaharan: 0, ethiopian: 1.5 } },
                { value: 'moderate', label: 'Moderate',
                    contributions: { hallstatt: 3, eastNordic: 3, tronder: 3,
                eastBaltic: 1.5,
                ladogan: 1.5,
                northernSlavic: 3, centralSlavic: 3, ponticSlavic: 3,
                alpine: 1.5,
                dinaric: 3,
                westernMediterranean: 3, centralMediterranean: 3, easternMediterranean: 3, southernMediterranean: 3,
                levantine: 3, iranoAfghan: 3, armenoid: 3,
                caucasion: 6, caspian: 6,
                northAsian: 0, centralAsian: 0, eastAsian: 0, malay: 1.5, amerindian: 0,
                subSaharan: 1.5, ethiopian: 1.5 } },
                { value: 'strong', label: 'Strong / Pronounced',
                    contributions: { hallstatt: 0, eastNordic: 1.5, tronder: 1.5,
                eastBaltic: 0,
                ladogan: 0,
                northernSlavic: 0, centralSlavic: 0, ponticSlavic: 1.5,
                alpine: 3,
                dinaric: 1.5,
                westernMediterranean: 1.5, centralMediterranean: 3, easternMediterranean: 3, southernMediterranean: 3,
                levantine: 3, iranoAfghan: 4.5, armenoid: 6,
                caucasion: 12, caspian: 9,
                northAsian: -3, centralAsian: -1.5, eastAsian: -3, malay: -1.5, amerindian: -1.5,
                subSaharan: 3, ethiopian: 3 } },
                { value: 'veryStrong', label: 'Very Strong / Heavy',
                    contributions: { hallstatt: -3, eastNordic: -3, tronder: -1.5,
                eastBaltic: -1.5,
                ladogan: -1.5,
                northernSlavic: -1.5, centralSlavic: -1.5, ponticSlavic: 0,
                alpine: 1.5,
                dinaric: 0,
                westernMediterranean: 1.5, centralMediterranean: 3, easternMediterranean: 4.5, southernMediterranean: 3,
                levantine: 4.5, iranoAfghan: 6, armenoid: 7.5,
                caucasion: 9, caspian: 6,
                northAsian: -6, centralAsian: -4.5, eastAsian: -6, malay: -3, amerindian: -4.5,
                subSaharan: 4.5, ethiopian: 4.5 } }
            ]
        }, 
        
        {
            id: 'ears',
            category: 'morphological',
            number: 17,
            weightClass: 'C-',
            title: 'Ear Morphology',
            definition: 'Assessment of ear size, projection (protrusion), lobe type, and helix form.',
            measurement: 'Visual assessment.',
            unit: 'Categorical (4 sub-traits)',
            guideImage: 'ear-morphology.png',       // ← Set to e.g. 'eye-color.jpg' to show a guide image
            type: 'composite',
            subTraits: [
                { id: 'earSize', category: 'morphological', label: 'Size',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'small', label: 'Small',
                            contributions: { hallstatt: 0, eastNordic: 0, tronder: 0,
                eastBaltic: 0,
                ladogan: 0,
                northernSlavic: 0, centralSlavic: 0, ponticSlavic: 0,
                alpine: 0,
                dinaric: 0,
                westernMediterranean: 0, centralMediterranean: 0, easternMediterranean: 0, southernMediterranean: 0,
                levantine: 0, iranoAfghan: 0, armenoid: 0,
                caucasion: 0, caspian: 0,
                northAsian: 0.5, centralAsian: 0, eastAsian: 0.5, malay: 0, amerindian: 0,
                subSaharan: -0.5, ethiopian: 0 } },
                        { value: 'average', label: 'Average',
                            contributions: { hallstatt: 0, eastNordic: 0, tronder: 0,
                eastBaltic: 0,
                ladogan: 0,
                northernSlavic: 0, centralSlavic: 0, ponticSlavic: 0,
                alpine: 0,
                dinaric: 0,
                westernMediterranean: 0, centralMediterranean: 0, easternMediterranean: 0, southernMediterranean: 0,
                levantine: 0, iranoAfghan: 0, armenoid: 0,
                caucasion: 0, caspian: 0,
                northAsian: 0, centralAsian: 0, eastAsian: 0, malay: 0, amerindian: 0,
                subSaharan: 0, ethiopian: 0 } },
                        { value: 'large', label: 'Large',
                            contributions: { hallstatt: -0.5, eastNordic: -0.5, tronder: -0.5,
                eastBaltic: 0,
                ladogan: 0,
                northernSlavic: 0, centralSlavic: 0, ponticSlavic: 0,
                alpine: 0,
                dinaric: 0,
                westernMediterranean: 0, centralMediterranean: 0, easternMediterranean: 0, southernMediterranean: 0,
                levantine: 0, iranoAfghan: 0, armenoid: 0,
                caucasion: 0, caspian: 0,
                northAsian: 0, centralAsian: 0, eastAsian: 0, malay: 0, amerindian: 0,
                subSaharan: 0.5, ethiopian: 0.5 } }
                    ] }, { id: 'earProjection', category: 'morphological', label: 'Projection',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'flat', label: 'Flat / Close to Head',
                            contributions: { hallstatt: 0, eastNordic: 0, tronder: 0,
                eastBaltic: 0,
                ladogan: 0,
                northernSlavic: 0, centralSlavic: 0, ponticSlavic: 0,
                alpine: 0,
                dinaric: 0,
                westernMediterranean: 0, centralMediterranean: 0, easternMediterranean: 0, southernMediterranean: 0,
                levantine: 0, iranoAfghan: 0, armenoid: 0,
                caucasion: 0, caspian: 0,
                northAsian: 0, centralAsian: 0, eastAsian: 0, malay: 0, amerindian: 0,
                subSaharan: 0, ethiopian: 0 } },
                        { value: 'moderate', label: 'Moderate',
                            contributions: { hallstatt: 0, eastNordic: 0, tronder: 0,
                eastBaltic: 0,
                ladogan: 0,
                northernSlavic: 0, centralSlavic: 0, ponticSlavic: 0,
                alpine: 0,
                dinaric: 0,
                westernMediterranean: 0, centralMediterranean: 0, easternMediterranean: 0, southernMediterranean: 0,
                levantine: 0, iranoAfghan: 0, armenoid: 0,
                caucasion: 0, caspian: 0,
                northAsian: 0, centralAsian: 0, eastAsian: 0, malay: 0, amerindian: 0,
                subSaharan: 0, ethiopian: 0 } },
                        { value: 'protruding', label: 'Protruding',
                            contributions: { hallstatt: 0, eastNordic: 0, tronder: 0,
                eastBaltic: 0,
                ladogan: 0,
                northernSlavic: 0, centralSlavic: 0, ponticSlavic: 0,
                alpine: 0,
                dinaric: 0,
                westernMediterranean: 0, centralMediterranean: 0, easternMediterranean: 0, southernMediterranean: 0,
                levantine: 0, iranoAfghan: 0, armenoid: 0,
                caucasion: 0, caspian: 0,
                northAsian: 0, centralAsian: 0, eastAsian: 0, malay: 0, amerindian: 0,
                subSaharan: 0.5, ethiopian: 0 } }
                    ] }, { id: 'earLobe', category: 'morphological', label: 'Lobe Type',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'attached', label: 'Attached',
                            contributions: { hallstatt: 0, eastNordic: 0, tronder: 0,
                eastBaltic: 0,
                ladogan: 0,
                northernSlavic: 0, centralSlavic: 0, ponticSlavic: 0,
                alpine: 0,
                dinaric: 0,
                westernMediterranean: 0, centralMediterranean: 0, easternMediterranean: 0, southernMediterranean: 0,
                levantine: 0, iranoAfghan: 0, armenoid: 0,
                caucasion: 0, caspian: 0,
                northAsian: 0.5, centralAsian: 0.5, eastAsian: 0.5, malay: 0.5, amerindian: 0.5,
                subSaharan: 0, ethiopian: 0 } },
                        { value: 'free', label: 'Free / Pendulous',
                            contributions: { hallstatt: 0, eastNordic: 0, tronder: 0,
                eastBaltic: 0,
                ladogan: 0,
                northernSlavic: 0, centralSlavic: 0, ponticSlavic: 0,
                alpine: 0,
                dinaric: 0,
                westernMediterranean: 0, centralMediterranean: 0, easternMediterranean: 0, southernMediterranean: 0,
                levantine: 0, iranoAfghan: 0, armenoid: 0,
                caucasion: 0, caspian: 0,
                northAsian: 0, centralAsian: 0, eastAsian: 0, malay: 0, amerindian: 0,
                subSaharan: 0, ethiopian: 0 } }
                    ] }, { id: 'earHelix', category: 'morphological', label: 'Helix Form',
                    options: [
                        { value: '', label: '—', contributions: {} },
                        { value: 'regular', label: 'Regular / Rolled',
                            contributions: { hallstatt: 0, eastNordic: 0, tronder: 0,
                eastBaltic: 0,
                ladogan: 0,
                northernSlavic: 0, centralSlavic: 0, ponticSlavic: 0,
                alpine: 0,
                dinaric: 0,
                westernMediterranean: 0, centralMediterranean: 0, easternMediterranean: 0, southernMediterranean: 0,
                levantine: 0, iranoAfghan: 0, armenoid: 0,
                caucasion: 0, caspian: 0,
                northAsian: 0, centralAsian: 0, eastAsian: 0, malay: 0, amerindian: 0,
                subSaharan: 0, ethiopian: 0 } },
                        { value: 'flat', label: 'Flat / Unrolled',
                            contributions: { hallstatt: 0, eastNordic: 0, tronder: 0,
                eastBaltic: 0,
                ladogan: 0,
                northernSlavic: 0, centralSlavic: 0, ponticSlavic: 0,
                alpine: 0,
                dinaric: 0,
                westernMediterranean: 0, centralMediterranean: 0, easternMediterranean: 0, southernMediterranean: 0,
                levantine: 0, iranoAfghan: 0, armenoid: 0,
                caucasion: 0, caspian: 0,
                northAsian: 0, eastAsian: 0, malay: 0, amerindian: 0,
                subSaharan: 0, ethiopian: 0 } },
                        { value: 'prominent', label: 'Prominent Antihelix',
                            contributions: { hallstatt: 0, eastNordic: 0, tronder: 0,
                eastBaltic: 0,
                ladogan: 0,
                northernSlavic: 0, centralSlavic: 0, ponticSlavic: 0,
                alpine: 0,
                dinaric: 0,
                westernMediterranean: 0, centralMediterranean: 0, easternMediterranean: 0, southernMediterranean: 0,
                levantine: 0, iranoAfghan: 0, armenoid: 0,
                caucasion: 0, caspian: 0,
                northAsian: -0.5, eastAsian: -0.5, malay: -0.5, amerindian: -0.5,
                subSaharan: 0, ethiopian: 0 } }
                    ] }
            ]
        }, {
            id: 'height',
            category: 'morphological',
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
                { value: 'veryShort',
            label: 'Very Short',
            contributions: {
                hallstatt: -6.05,
                eastNordic: -6.05,
                tronder: -6.05,
                eastBaltic: -5.55,
                ladogan: -4.80,
                northernSlavic: -5.55,
                centralSlavic: -5.95,
                ponticSlavic: -5.55,
                alpine: -3.85,
                dinaric: -6.10,
                westernMediterranean: -6.00,
                centralMediterranean: -5.15,
                easternMediterranean: -6.10,
                southernMediterranean: -6.05,
                levantine: -5.95,
                iranoAfghan: -5.55,
                armenoid: -5.55,
                caucasion: -5.55,
                caspian: -5.55,
                northAsian: -5.15,
                centralAsian: -5.65,
                eastAsian: -5.65,
                malay: -3.35,
                amerindian: -3.80,
                subSaharan: -5.65,
                ethiopian: -4.75
            }
        },
        {
            value: 'short',
            label: 'Short',
            contributions: {
                hallstatt: -5.65,
                eastNordic: -5.10,
                tronder: -6.25,
                eastBaltic: -0.70,
                ladogan: 3.65,
                northernSlavic: -1.80,
                centralSlavic: -4.50,
                ponticSlavic: 1.50,
                alpine: 2.70,
                dinaric: -6.15,
                westernMediterranean: -3.90,
                centralMediterranean: 0.25,
                easternMediterranean: -5.60,
                southernMediterranean: -4.80,
                levantine: -2.65,
                iranoAfghan: -0.70,
                armenoid: 1.45,
                caucasion: 0.45,
                caspian: -0.70,
                northAsian: 2.90,
                centralAsian: -2.90,
                eastAsian: -2.40,
                malay: 3.95,
                amerindian: 1.50,
                subSaharan: 0.45,
                ethiopian: 2.25
            }
        },
        {
            value: 'average',
            label: 'Average',
            contributions: {
                hallstatt: 1.05,
                eastNordic: 1.45,
                tronder: -0.45,
                eastBaltic: 2.55,
                ladogan: 2.35,
                northernSlavic: 1.80,
                centralSlavic: 1.60,
                ponticSlavic: 2.40,
                alpine: 2.00,
                dinaric: -0.90,
                westernMediterranean: 1.80,
                centralMediterranean: 2.55,
                easternMediterranean: 0.90,
                southernMediterranean: 1.40,
                levantine: 1.95,
                iranoAfghan: 2.00,
                armenoid: 2.20,
                caucasion: 2.30,
                caspian: 2.15,
                northAsian: 2.00,
                centralAsian: 1.90,
                eastAsian: 2.10,
                malay: 1.85,
                amerindian: 2.00,
                subSaharan: 2.15,
                ethiopian: 2.05
            }
        },
        {
            value: 'tall',
            label: 'Tall',
            contributions: {
                hallstatt: 4.90,
                eastNordic: 4.45,
                tronder: 5.00,
                eastBaltic: 2.05,
                ladogan: -2.35,
                northernSlavic: 3.25,
                centralSlavic: 4.50,
                ponticSlavic: 0.25,
                alpine: 0.00,
                dinaric: 3.10,
                westernMediterranean: 3.75,
                centralMediterranean: 1.15,
                easternMediterranean: 4.80,
                southernMediterranean: 4.65,
                levantine: 3.70,
                iranoAfghan: 2.20,
                armenoid: 0.25,
                caucasion: 0.65,
                caspian: 2.05,
                northAsian: -0.75,
                centralAsian: 3.80,
                eastAsian: 3.05,
                malay: -2.40,
                amerindian: 0.00,
                subSaharan: 1.20,
                ethiopian: -0.45
            }
        },
        {
            value: 'veryTall',
            label: 'Very Tall',
            contributions: {
                hallstatt: -0.20,
                eastNordic: -1.15,
                tronder: 2.65,
                eastBaltic: -5.20,
                ladogan: -6.30,
                northernSlavic: -3.30,
                centralSlavic: -0.85,
                ponticSlavic: -5.50,
                alpine: -5.35,
                dinaric: 5.50,
                westernMediterranean: -1.90,
                centralMediterranean: -5.35,
                easternMediterranean: 0.40,
                southernMediterranean: -1.65,
                levantine: -3.95,
                iranoAfghan: -3.75,
                armenoid: -5.25,
                caucasion: -5.25,
                caspian: -3.80,
                northAsian: -5.65,
                centralAsian: -3.35,
                eastAsian: -4.20,
                malay: -5.65,
                amerindian: -4.65,
                subSaharan: -5.15,
                ethiopian: -5.60
     } }
            ]
        }, 
        

{
  id: 'lipFullness',
  category: 'morphological',
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
      contributions: { hallstatt: 7.55,
                eastNordic: 5.30,
                tronder: 4.65,
                eastBaltic: 4.45,
                ladogan: 3.20,
                northernSlavic: 2.95,
                centralSlavic: 0.85,
                ponticSlavic: 0.85,
                alpine: 5.10,
                dinaric: 0.80,
                westernMediterranean: -1.85,
                centralMediterranean: 0.80,
                easternMediterranean: 0.80,
                southernMediterranean: -1.85,
                levantine: -0.35,
                iranoAfghan: -0.85,
                armenoid: -3.70,
                caucasion: -0.35,
                caspian: -1.75,
                northAsian: 0.80,
                centralAsian: -1.85,
                eastAsian: 0.80,
                malay: -1.85,
                amerindian: 3.10,
                subSaharan: -5.65,
                ethiopian: -5.65
            }
        },
        {
            value: 'medium',
            label: 'Medium',
            contributions: {
                hallstatt: 0.25,
                eastNordic: 0.70,
                tronder: 0.70,
                eastBaltic: 1.15,
                ladogan: 1.15,
                northernSlavic: 1.25,
                centralSlavic: 1.30,
                ponticSlavic: 1.30,
                alpine: 0.95,
                dinaric: 1.15,
                westernMediterranean: 1.35,
                centralMediterranean: 1.05,
                easternMediterranean: 1.35,
                southernMediterranean: 1.05,
                levantine: 1.25,
                iranoAfghan: 1.05,
                armenoid: 0.95,
                caucasion: 1.25,
                caspian: 1.25,
                northAsian: 1.10,
                centralAsian: 1.35,
                eastAsian: 1.15,
                malay: 1.15,
                amerindian: 1.10,
                subSaharan: -0.10,
                ethiopian: 0.20
            }
        },
        {
            value: 'thick',
            label: 'Thick',
            contributions: {
                hallstatt: -6.65,
                eastNordic: -3.85,
                tronder: -2.65,
                eastBaltic: -3.85,
                ladogan: -1.75,
                northernSlavic: -3.15,
                centralSlavic: -1.40,
                ponticSlavic: -0.90,
                alpine: -2.50,
                dinaric: -0.35,
                westernMediterranean: 0.85,
                centralMediterranean: 0.60,
                easternMediterranean: -0.90,
                southernMediterranean: 2.00,
                levantine: 0.15,
                iranoAfghan: 1.05,
                armenoid: 3.00,
                caucasion: -0.35,
                caspian: 0.60,
                northAsian: 0.15,
                centralAsian: 0.85,
                eastAsian: -0.35,
                malay: 0.85,
                amerindian: -0.90,
                subSaharan: 4.60,
                ethiopian: 4.60
            }
        },
        {
            value: 'veryThick',
            label: 'Very Thick',
            contributions: {
                hallstatt: -7.65,
                eastNordic: -7.65,
                tronder: -6.70,
                eastBaltic: -7.65,
                ladogan: -5.85,
                northernSlavic: -7.15,
                centralSlavic: -6.30,
                ponticSlavic: -7.15,
                alpine: -7.35,
                dinaric: -5.65,
                westernMediterranean: -5.65,
                centralMediterranean: -5.25,
                easternMediterranean: -7.35,
                southernMediterranean: -3.60,
                levantine: -4.45,
                iranoAfghan: -3.45,
                armenoid: -1.75,
                caucasion: -5.75,
                caspian: -5.25,
                northAsian: -4.35,
                centralAsian: -5.75,
                eastAsian: -5.75,
                malay: -3.55,
                amerindian: -7.45,
                subSaharan: 0.85,
                ethiopian: -0.35
 }
    }
  ]
},

{
  id: 'prognathism',
  category: 'morphological',
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
      contributions: { hallstatt: 21.35,
                eastNordic: 16.75,
                tronder: 16.75,
                eastBaltic: 16.75,
                ladogan: 16.55,
                northernSlavic: 14.85,
                centralSlavic: 14.60,
                ponticSlavic: 16.15,
                alpine: 17.60,
                dinaric: 17.60,
                westernMediterranean: 17.60,
                centralMediterranean: 15.50,
                easternMediterranean: 17.60,
                southernMediterranean: 15.75,
                levantine: 14.75,
                iranoAfghan: 14.75,
                armenoid: 19.25,
                caucasion: 15.75,
                caspian: 14.20,
                northAsian: 17.30,
                centralAsian: 14.35,
                eastAsian: 17.70,
                malay: -11.85,
                amerindian: 7.60,
                subSaharan: -16.10,
                ethiopian: 9.20
            },
            balanceSynergy: {
                subSaharan: 0.35,
                ethiopian: 0.15
            },
            negativeSynergy: {
                subSaharan: 0.10,
                ethiopian: 0.05
            }
        },
        {
            value: 'mesognathous',
            label: 'Mesognathous',
            contributions: {
                hallstatt: -17.95,
                eastNordic: -8.10,
                tronder: -8.10,
                eastBaltic: -9.55,
                ladogan: -5.05,
                northernSlavic: -2.55,
                centralSlavic: 0.50,
                ponticSlavic: -5.00,
                alpine: -9.85,
                dinaric: -10.80,
                westernMediterranean: -9.85,
                centralMediterranean: -1.65,
                easternMediterranean: -10.80,
                southernMediterranean: -4.90,
                levantine: -3.70,
                iranoAfghan: -2.15,
                armenoid: -10.50,
                caucasion: -3.75,
                caspian: -1.05,
                northAsian: -3.25,
                centralAsian: -2.10,
                eastAsian: -3.90,
                malay: 2.95,
                amerindian: 5.50,
                subSaharan: 0.50,
                ethiopian: 5.35
            }
        },
        {
            value: 'prognathous',
            label: 'Prognathous',
            contributions: {
                hallstatt: -20.35,
                eastNordic: -20.35,
                tronder: -20.35,
                eastBaltic: -18.55,
                ladogan: -16.90,
                northernSlavic: -19.20,
                centralSlavic: -20.30,
                ponticSlavic: -18.70,
                alpine: -18.70,
                dinaric: -17.70,
                westernMediterranean: -18.70,
                centralMediterranean: -17.10,
                easternMediterranean: -17.70,
                southernMediterranean: -16.55,
                levantine: -14.20,
                iranoAfghan: -16.20,
                armenoid: -19.25,
                caucasion: -18.00,
                caspian: -16.50,
                northAsian: -18.60,
                centralAsian: -12.95,
                eastAsian: -18.60,
                malay: 12.25,
                amerindian: -8.15,
                subSaharan: 16.70,
                ethiopian: -11.55
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
  category: 'morphological',
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
      contributions: { hallstatt: -9.20,
                eastNordic: -4.90,
                tronder: -7.90,
                eastBaltic: -0.95,
                ladogan: -1.40,
                northernSlavic: -1.45,
                centralSlavic: -2.25,
                ponticSlavic: -1.85,
                alpine: -2.00,
                dinaric: 8.70,
                westernMediterranean: -3.65,
                centralMediterranean: -1.25,
                easternMediterranean: -3.45,
                southernMediterranean: -4.70,
                levantine: -1.00,
                iranoAfghan: -8.05,
                armenoid: 10.45,
                caucasion: 8.90,
                caspian: -8.95,
                northAsian: 6.35,
                centralAsian: 5.50,
                eastAsian: 4.40,
                malay: 4.85,
                amerindian: -8.40,
                subSaharan: -2.40,
                ethiopian: -3.30
            }
        },
        {
            value: 'rounded',
            label: 'Rounded',
            contributions: {
                hallstatt: 0.65,
                eastNordic: 1.25,
                tronder: 1.65,
                eastBaltic: 6.15,
                ladogan: 6.85,
                northernSlavic: 5.40,
                centralSlavic: 5.15,
                ponticSlavic: 5.40,
                alpine: 7.20,
                dinaric: -2.00,
                westernMediterranean: 4.80,
                centralMediterranean: 5.60,
                easternMediterranean: 4.60,
                southernMediterranean: 4.30,
                levantine: 6.45,
                iranoAfghan: -0.20,
                armenoid: -5.90,
                caucasion: -1.80,
                caspian: 0.40,
                northAsian: 0.00,
                centralAsian: 0.40,
                eastAsian: 2.05,
                malay: 1.30,
                amerindian: 1.60,
                subSaharan: 7.20,
                ethiopian: 5.45
            }
        },
        {
            value: 'projecting',
            label: 'Projecting',
            contributions: {
                hallstatt: 7.15,
                eastNordic: 4.90,
                tronder: 5.75,
                eastBaltic: -6.55,
                ladogan: -7.65,
                northernSlavic: -5.00,
                centralSlavic: -2.65,
                ponticSlavic: -4.20,
                alpine: -7.40,
                dinaric: -7.85,
                westernMediterranean: -0.85,
                centralMediterranean: -4.35,
                easternMediterranean: -0.65,
                southernMediterranean: 0.50,
                levantine: -3.75,
                iranoAfghan: 7.45,
                armenoid: -10.65,
                caucasion: -10.40,
                caspian: 7.25,
                northAsian: -7.75,
                centralAsian: -6.40,
                eastAsian: -7.30,
                malay: -6.85,
                amerindian: 6.15,
                subSaharan: -8.20,
                ethiopian: -0.95 }
    }
  ]
},

{
    id: 'eyeDepth',
    category: 'morphological',
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
            contributions: { hallstatt: 6.65,
                eastNordic: 7.10,
                tronder: 2.90,
                eastBaltic: -6.50,
                ladogan: -6.50,
                northernSlavic: -0.20,
                centralSlavic: -0.60,
                ponticSlavic: 0.70,
                alpine: -6.45,
                dinaric: 6.65,
                westernMediterranean: 1.70,
                centralMediterranean: 0.40,
                easternMediterranean: 2.90,
                southernMediterranean: 2.90,
                levantine: 3.30,
                iranoAfghan: 5.55,
                armenoid: 5.55,
                caucasion: 6.60,
                caspian: 0.95,
                northAsian: -6.00,
                centralAsian: -6.45,
                eastAsian: -6.85,
                malay: -5.15,
                amerindian: -4.95,
                subSaharan: -6.85,
                ethiopian: 0.25
            }
        },
        {
            value: 'average',
            label: 'Average',
            contributions: {
                hallstatt: 0.10,
                eastNordic: -0.60,
                tronder: 1.00,
                eastBaltic: -0.45,
                ladogan: 3.40,
                northernSlavic: 2.50,
                centralSlavic: 2.50,
                ponticSlavic: 2.20,
                alpine: 3.10,
                dinaric: -0.10,
                westernMediterranean: 1.55,
                centralMediterranean: 2.50,
                easternMediterranean: 1.05,
                southernMediterranean: 1.05,
                levantine: 1.10,
                iranoAfghan: 0.10,
                armenoid: -0.45,
                caucasion: 0.25,
                caspian: 2.50,
                northAsian: 3.15,
                centralAsian: 0.85,
                eastAsian: 3.30,
                malay: 2.85,
                amerindian: 2.60,
                subSaharan: -0.20,
                ethiopian: 2.60
            }
        },
        {
            value: 'prominent',
            label: 'Prominent',
            contributions: {
                hallstatt: -8.00,
                eastNordic: -6.25,
                tronder: -3.55,
                eastBaltic: 7.60,
                ladogan: -0.80,
                northernSlavic: -5.05,
                centralSlavic: -4.30,
                ponticSlavic: -3.90,
                alpine: -0.90,
                dinaric: -6.30,
                westernMediterranean: -3.35,
                centralMediterranean: -4.65,
                easternMediterranean: -3.20,
                southernMediterranean: -3.20,
                levantine: -3.40,
                iranoAfghan: -6.95,
                armenoid: -4.75,
                caucasion: -7.15,
                caspian: -4.25,
                northAsian: -1.80,
                centralAsian: 6.05,
                eastAsian: -1.70,
                malay: -1.50,
                amerindian: -0.85,
                subSaharan: 7.60,
                ethiopian: -4.75
}
        }
    ]
},


{
    id: 'nasalBridgeHeight',
    category: 'morphological',
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
            contributions: { hallstatt: -10.00,
        eastNordic: -10.00,
        tronder: -10.00,
        eastBaltic: 3.15,
        ladogan: 5.90,

        northernSlavic: -1.25,
        centralSlavic: -4.90,
        ponticSlavic: -9.40,

        alpine: -2.15,
        dinaric: -7.40,
        westernMediterranean: -6.65,
        centralMediterranean: -6.55,
        easternMediterranean: -6.65,
        southernMediterranean: -6.55,

        levantine: -8.00,
        iranoAfghan: -8.00,
        armenoid: -8.00,

        caucasion: -8.00,
        caspian: -8.00,

        northAsian: 6.40,
        centralAsian: -4.35,
        eastAsian: 7.25,
        malay: 4.70,
        amerindian: -4.35,

        subSaharan: 10.75,
        ethiopian: -7.15
    },
    balanceSynergy: {
        northAsian: -0.20
    }
},

{
    value: 'medium',
    label: 'Medium Bridge',
    contributions: {
        hallstatt: -5.80,
        eastNordic: -5.80,
        tronder: -3.65,
        eastBaltic: 5.15,
        ladogan: 3.35,

        northernSlavic: 5.35,
        centralSlavic: 6.20,
        ponticSlavic: 5.60,

        alpine: 7.40,
        dinaric: -5.55,
        westernMediterranean: 0.20,
        centralMediterranean: 6.90,
        easternMediterranean: 1.95,
        southernMediterranean: 0.55,

        levantine: -0.60,
        iranoAfghan: -3.35,
        armenoid: -3.35,

        caucasion: -4.15,
        caspian: 3.55,

        northAsian: 0.20,
        centralAsian: 5.05,
        eastAsian: 0.20,
        malay: 2.00,
        amerindian: 0.20,

        subSaharan: -7.15,
        ethiopian: 6.90
    }
},

{
    value: 'high',
    label: 'High Bridge',
    contributions: {
        hallstatt: 10.40,
        eastNordic: 10.40,
        tronder: 9.30,
        eastBaltic: -9.80,
        ladogan: -12.00,

        northernSlavic: -5.55,
        centralSlavic: -3.35,
        ponticSlavic: 0.20,

        alpine: -7.05,
        dinaric: 9.50,
        westernMediterranean: 5.95,
        centralMediterranean: -0.70,
        easternMediterranean: 4.35,
        southernMediterranean: 5.50,

        levantine: 6.65,
        iranoAfghan: 7.20,
        armenoid: 7.20,

        caucasion: 8.70,
        caspian: 5.35,

        northAsian: -7.60,
        centralAsian: 0.20,
        eastAsian: -9.90,
        malay: -7.60,
        amerindian: 5.95,

        subSaharan: -10.40,
        ethiopian: 0.25 },
        }
    ]
},



        
{
    id: 'orbitalIndex',
    category: 'morphological',
    number: 24,
    weightClass: 'A',
    title: 'Orbital Index',
    definition: 'Ratio of orbital height to orbital width x 100. Classifies eye socket shape from chamaeconch (wide, low orbit) to hypsiconch (tall, narrow orbit).',
    measurement: 'Measure orbital height from the superior to inferior bony rim at the midpoint of the orbit. Measure orbital width from the dacryon (medial corner) to the ectoconchion (most lateral point of the orbital rim). Divide height by width and multiply by 100.',
    unit: 'Index value -> chamaeconch / mesoconch / hypsiconch',
    guideImage: 'orbital-index.png',
    type: 'index',
    options: [
        { value: '', label: '— Enter measurements or select category —', contributions: {} },
        { value: 'chamaeconch', label: 'Chamaeconch (< 75.9)',
            contributions: { hallstatt: -2.65,
                eastNordic: 5.05,
                tronder: 2.70,
                eastBaltic: 7.05,
                ladogan: 7.05,
                northernSlavic: -5.25,
                centralSlavic: 0.65,
                ponticSlavic: 1.95,
                alpine: -6.00,
                dinaric: -10.30,
                westernMediterranean: -6.40,
                centralMediterranean: -0.30,
                easternMediterranean: -2.20,
                southernMediterranean: 1.15,
                levantine: -6.50,
                iranoAfghan: -1.55,
                armenoid: -7.50,
                caucasion: -2.05,
                caspian: -10.50,
                northAsian: -9.85,
                centralAsian: -8.40,
                eastAsian: -10.90,
                malay: -9.05,
                amerindian: -10.05,
                subSaharan: 13.75,
                ethiopian: -15.15
            }
        },
        {
            value: 'mesoconch',
            label: 'Mesoconch',
            contributions: {
                hallstatt: 9.15,
                eastNordic: 3.80,
                tronder: 6.65,
                eastBaltic: 2.45,
                ladogan: 2.55,
                northernSlavic: 7.05,
                centralSlavic: 8.10,
                ponticSlavic: 7.00,
                alpine: 7.50,
                dinaric: 3.20,
                westernMediterranean: 10.45,
                centralMediterranean: 7.30,
                easternMediterranean: 7.50,
                southernMediterranean: 6.75,
                levantine: 8.05,
                iranoAfghan: 7.00,
                armenoid: 7.65,
                caucasion: 7.95,
                caspian: 7.05,
                northAsian: -4.30,
                centralAsian: 3.20,
                eastAsian: -2.75,
                malay: -2.55,
                amerindian: -2.55,
                subSaharan: -4.85,
                ethiopian: -1.45
            }
        },
        {
            value: 'hypsiconch',
            label: 'Hypsiconch',
            contributions: {
                hallstatt: -5.90,
                eastNordic: -7.65,
                tronder: -8.85,
                eastBaltic: -8.25,
                ladogan: -8.55,
                northernSlavic: -1.40,
                centralSlavic: -11.05,
                ponticSlavic: -10.15,
                alpine: -1.45,
                dinaric: 8.70,
                westernMediterranean: -6.55,
                centralMediterranean: -8.05,
                easternMediterranean: -4.85,
                southernMediterranean: -8.45,
                levantine: -1.85,
                iranoAfghan: -3.55,
                armenoid: -1.25,
                caucasion: -7.55,
                caspian: 2.15,
                northAsian: 10.10,
                centralAsian: 7.15,
                eastAsian: 9.60,
                malay: 8.70,
                amerindian: 9.15,
                subSaharan: -13.60,
                ethiopian: 12.60
} }
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
    category: 'morphological',
    number: 25,
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
            contributions: { hallstatt: 9.30,
                eastNordic: 5.75,
                tronder: 2.05,
                eastBaltic: -7.25,
                ladogan: -8.05,
                northernSlavic: -2.35,
                centralSlavic: -2.25,
                ponticSlavic: 0.60,
                alpine: -3.80,
                dinaric: -4.40,
                westernMediterranean: -2.75,
                centralMediterranean: -2.35,
                easternMediterranean: -2.35,
                southernMediterranean: -3.80,
                levantine: -3.95,
                iranoAfghan: -6.30,
                armenoid: -6.65,
                caucasion: -5.00,
                caspian: -4.90,
                northAsian: -2.00,
                centralAsian: -3.00,
                eastAsian: -5.10,
                malay: -4.75,
                amerindian: -2.35,
                subSaharan: -4.80,
                ethiopian: 2.30
            }
        },
        {
            value: 'moderate',
            label: 'Moderate',
            contributions: {
                hallstatt: 1.15,
                eastNordic: 2.95,
                tronder: 7.40,
                eastBaltic: 2.10,
                ladogan: -1.60,
                northernSlavic: 5.55,
                centralSlavic: 5.70,
                ponticSlavic: 5.65,
                alpine: 3.20,
                dinaric: 2.35,
                westernMediterranean: 4.85,
                centralMediterranean: 5.15,
                easternMediterranean: 5.15,
                southernMediterranean: 5.15,
                levantine: -0.60,
                iranoAfghan: 2.65,
                armenoid: -1.70,
                caucasion: 3.05,
                caspian: 4.95,
                northAsian: 1.80,
                centralAsian: 6.15,
                eastAsian: 0.30,
                malay: 0.35,
                amerindian: 1.95,
                subSaharan: 0.20,
                ethiopian: 6.10
            }
        },
        {
            value: 'bulbous',
            label: 'Bulbous',
            contributions: {
                hallstatt: -6.30,
                eastNordic: -3.50,
                tronder: -1.60,
                eastBaltic: -0.55,
                ladogan: 5.00,
                northernSlavic: -2.40,
                centralSlavic: 3.00,
                ponticSlavic: -5.50,
                alpine: 5.95,
                dinaric: -0.25,
                westernMediterranean: -0.30,
                centralMediterranean: 1.95,
                easternMediterranean: -0.65,
                southernMediterranean: 3.10,
                levantine: 3.40,
                iranoAfghan: -5.15,
                armenoid: 0.80,
                caucasion: -6.95,
                caspian: -5.65,
                northAsian: 6.00,
                centralAsian: 3.40,
                eastAsian: 7.70,
                malay: 8.05,
                amerindian: 5.35,
                subSaharan: 9.65,
                ethiopian: -0.85
            }
        },
        {
            value: 'hooked',
            label: 'Hooked',
            contributions: {
                hallstatt: -5.10,
                eastNordic: -6.85,
                tronder: -5.10,
                eastBaltic: -8.25,
                ladogan: -8.25,
                northernSlavic: -8.35,
                centralSlavic: -8.35,
                ponticSlavic: -2.85,
                alpine: -7.70,
                dinaric: 7.25,
                westernMediterranean: 2.70,
                centralMediterranean: -0.65,
                easternMediterranean: 2.00,
                southernMediterranean: -0.65,
                levantine: 5.70,
                iranoAfghan: 6.55,
                armenoid: 6.85,
                caucasion: 7.15,
                caspian: 5.90,
                northAsian: -7.15,
                centralAsian: -1.85,
                eastAsian: -7.85,
                malay: -7.45,
                amerindian: -0.65,
                subSaharan: -7.35,
                ethiopian: -5.10
            }
        },
        {
            value: 'upturned',
            label: 'Upturned',
            contributions: {
                hallstatt: -7.85,
                eastNordic: -0.65,
                tronder: -7.85,
                eastBaltic: 7.75,
                ladogan: 6.30,
                northernSlavic: 2.30,
                centralSlavic: -5.45,
                ponticSlavic: -2.30,
                alpine: -0.65,
                dinaric: -8.50,
                westernMediterranean: -5.65,
                centralMediterranean: -4.95,
                easternMediterranean: -4.95,
                southernMediterranean: -6.35,
                levantine: -6.35,
                iranoAfghan: -7.45,
                armenoid: -7.80,
                caucasion: -7.45,
                caspian: -7.10,
                northAsian: -4.95,
                centralAsian: -4.65,
                eastAsian: -4.40,
                malay: -6.75,
                amerindian: -4.95,
                subSaharan: -5.15,
                ethiopian: -2.40
 } },
                        ]
                },

                {
    id: 'nasalProjection',
    category: 'morphological',
    number: 26,
    weightClass: 'B',
    title: 'Nasal Projection',
    definition: 'Degree of anterior projection of the external nose relative to the facial plane.',
    measurement: 'Lateral/profile assessment of nasal projection, preferably supported by anthropometric measurements.',
    unit: 'Categorical',
    guideImage: 'nasal-projection.png',
    type: 'select',

    options: [

        {
            value: '',
            label: '— Select —',
            contributions: {}
        },
        {
            value: 'low',
            label: 'Low',
            contributions: {
                hallstatt: -8.95,
                eastNordic: -7.00,
                tronder: -10.35,
                eastBaltic: 7.00,
                ladogan: 7.00,
                northernSlavic: -4.70,
                centralSlavic: -3.95,
                ponticSlavic: -5.85,
                alpine: -2.70,
                dinaric: -8.80,
                westernMediterranean: -4.05,
                centralMediterranean: -2.70,
                easternMediterranean: -5.90,
                southernMediterranean: -2.70,
                levantine: -5.85,
                iranoAfghan: -7.20,
                armenoid: -7.20,
                caucasion: -8.05,
                caspian: -2.85,
                northAsian: 7.25,
                centralAsian: 3.80,
                eastAsian: 7.25,
                malay: 7.30,
                amerindian: -1.80,
                subSaharan: 9.20,
                ethiopian: -2.50
            }
        },
        {
            value: 'moderate',
            label: 'Moderate',
            contributions: {
                hallstatt: -0.45,
                eastNordic: 0.40,
                tronder: -3.50,
                eastBaltic: 1.55,
                ladogan: 1.55,
                northernSlavic: 3.05,
                centralSlavic: 3.45,
                ponticSlavic: 3.10,
                alpine: 4.05,
                dinaric: -4.00,
                westernMediterranean: 2.15,
                centralMediterranean: 1.40,
                easternMediterranean: 0.45,
                southernMediterranean: 3.00,
                levantine: 0.45,
                iranoAfghan: -1.20,
                armenoid: -1.60,
                caucasion: -2.30,
                caspian: 3.70,
                northAsian: 0.35,
                centralAsian: 2.40,
                eastAsian: 0.55,
                malay: 0.75,
                amerindian: 2.60,
                subSaharan: 0.75,
                ethiopian: 3.25
            }
        },
        {
            value: 'high',
            label: 'High',
            contributions: {
                hallstatt: 7.55,
                eastNordic: 5.95,
                tronder: 7.55,
                eastBaltic: -6.00,
                ladogan: -4.70,
                northernSlavic: 0.00,
                centralSlavic: -2.15,
                ponticSlavic: 1.45,
                alpine: -1.10,
                dinaric: 7.40,
                westernMediterranean: 3.35,
                centralMediterranean: 4.00,
                easternMediterranean: 5.85,
                southernMediterranean: 1.65,
                levantine: 5.25,
                iranoAfghan: 5.25,
                armenoid: 6.20,
                caucasion: 7.45,
                caspian: 1.90,
                northAsian: -5.20,
                centralAsian: -2.15,
                eastAsian: -6.40,
                malay: -7.50,
                amerindian: 1.60,
                subSaharan: -8.45,
                ethiopian: 1.00
            }
        },
        {
            value: 'veryHigh',
            label: 'Very High',
            contributions: {
                hallstatt: -1.70,
                eastNordic: -1.70,
                tronder: 2.20,
                eastBaltic: -8.00,
                ladogan: -9.25,
                northernSlavic: -6.55,
                centralSlavic: -7.10,
                ponticSlavic: -7.40,
                alpine: -7.90,
                dinaric: 2.20,
                westernMediterranean: -3.95,
                centralMediterranean: -3.45,
                easternMediterranean: -1.70,
                southernMediterranean: -6.15,
                levantine: -1.85,
                iranoAfghan: 2.00,
                armenoid: 0.35,
                caucasion: 1.25,
                caspian: -7.55,
                northAsian: -7.65,
                centralAsian: -7.10,
                eastAsian: -7.65,
                malay: -7.95,
                amerindian: -4.55,
                subSaharan: -8.15,
                ethiopian: -5.95

            
}
        }

    ]
},
];
