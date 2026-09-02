// ============================================================
// LOCALIZATION / INTERNATIONALIZATION (i18n)
// ============================================================
// This module handles all text strings and translations

const LOCALE = {
    current: localStorage.getItem('appLanguage') || 'en',

    strings: {
        en: {
            // Header & Pages
            pageTitle: 'Historical Anthropometric Reconstruction Simulator',
            pageSubtitle: 'Reconstructing Late 19th & Early 20th Century Morphological Classification Systems',
            eraBadge: '📜 circa 1880–1940 · Physical Anthropology · Racial Typology · Craniometry',

            // Disclaimers
            disclaimerBanner: 'This simulator reconstructs historical anthropological classification systems (c. 1880–1940). It does NOT represent modern scientific ancestry analysis, genetics, ethnicity prediction, race determination, or biological reality. For educational and historical study purposes only.',
            disclaimerNotice: 'IMPORTANT HISTORICAL NOTICE: This simulator reconstructs historical anthropological classification methods. It does NOT constitute modern genetics, scientific ancestry estimation, ethnicity prediction, race determination, or any statement of biological reality. The categories and scoring reflect obsolete typological frameworks studied here solely for their historical and educational value.',

            // UI Elements
            selectTraits: 'Select traits to begin',
            primary: 'Primary Type',
            secondary: 'Secondary Types',
            report: 'Generate Full Report',
            resetAll: 'Reset All Traits',
            close: 'Close',
            printReport: 'Print Report',
            clearSelections: 'Clear all selections and start over',
            liveScores: 'Live Type Scores',
            scoresNote: 'Historical anthropological type affinity scores (baseline: 50). Higher score = greater morphological alignment in this historical framework.',
            closestType: 'Closest Historical Type',

            // Type Names
            types: {
                nordic: 'Nordic',
                ladogan: 'Ladogan',
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
                subSaharan: 'Sub-Saharan African',
                amerindian: 'Amerindian'
            },

            // Trait Names & Descriptions
            traits: {
                eyeColor: 'Eye Color',
                eyeColorDesc: 'Classification of iris pigmentation based on visual comparison against standardized chromatic scales (e.g., Martin–Schultz scale).',
                eyeColorMeasure: 'Visual comparison under natural daylight conditions.',

                hairColor: 'Hair Color',
                hairColorDesc: 'Classification of hair pigmentation using standardized color scales.',
                hairColorMeasure: 'Visual assessment of hair shade under natural light.',

                skinPigmentation: 'Skin Pigmentation',
                skinPigmentationDesc: 'Classification of skin tone based on visible pigmentation.',
                skinPigmentationMeasure: 'Visual observation of unexposed skin areas.',

                headForm: 'Head Form (Cephalic Index)',
                headFormDesc: 'Classification based on skull breadth-to-length ratio.',

                facialForm: 'Facial Form',
                facialFormDesc: 'Classification based on overall facial shape and proportions.',

                noseForm: 'Nose Form',
                noseFormDesc: 'Classification of nasal morphology and bridge height.',

                lipThickness: 'Lip Thickness',
                lipThicknessDesc: 'Classification of labial size and prominence.',

                hairForm: 'Hair Form (Texture)',
                hairFormDesc: 'Classification based on hair curvature and texture.',
                hairFormMeasure: 'Visual assessment of hair wave pattern and curl form.',
            },

            // Eye Color Options
            eyeColorOptions: {
                veryLightBlue: 'Very Light Blue (Martin 13–14)',
                lightBlue: 'Light Blue (Martin 15)',
                grey: 'Grey (Martin 16)',
                greyGreen: 'Grey-Green',
                greenBrown: 'Green-Brown',
                brown: 'Brown (Martin 17)',
                darkBrown: 'Dark Brown (Martin 18–19)',
                veryDarkBrown: 'Very Dark Brown / Black (Martin 20)',
            },

            // Hair Color Options
            hairColorOptions: {
                veryLight: 'Very Light Blonde',
                lightBlonde: 'Light Blonde',
                mediumBlonde: 'Medium Blonde',
                darkBlonde: 'Dark Blonde',
                lightBrown: 'Light Brown',
                mediumBrown: 'Medium Brown',
                darkBrown: 'Dark Brown',
                veryDark: 'Very Dark Brown / Black',
                reddish: 'Reddish / Auburn',
            },

            // Skin Pigmentation Options
            skinOptions: {
                veryFair: 'Very Fair (Celtic/Scandinavian)',
                fair: 'Fair',
                lightOlive: 'Light Olive',
                olive: 'Olive',
                darkOlive: 'Dark Olive',
                lightBrown: 'Light Brown',
                brown: 'Brown',
                darkBrown: 'Dark Brown',
                veryDark: 'Very Dark Brown',
            },

            // Head Form Options
            headFormOptions: {
                dolichocephalic: 'Dolichocephalic (Long-headed)',
                mesocephalic: 'Mesocephalic (Medium-headed)',
                brachycephalic: 'Brachycephalic (Round-headed)',
            },

            // Facial Form Options
            facialFormOptions: {
                leptosome: 'Leptosome (Narrow, Long)',
                mesosome: 'Mesosome (Medium)',
                pyknic: 'Pyknic (Broad, Round)',
                athletic: 'Athletic',
                dysplastic: 'Dysplastic',
            },

            // Messages
            messages: {
                initialized: 'Historical Anthropometric Reconstruction Simulator initialized.',
                notRepresentative: 'DISCLAIMER: This simulates obsolete historical classification systems only.',
                notReality: 'It does NOT represent modern genetics, ancestry, ethnicity, race, or biological reality.'
            }
        },

        ru: {
            // Заголовок и страницы
            pageTitle: 'Симулятор исторической антропометрической реконструкции',
            pageSubtitle: 'Реконструкция систем морфологической классификации конца XIX - начала XX века',
            eraBadge: '📜 около 1880–1940 гг. · Физическая антропология · Расовая типология · Краниометрия',

            // Отказы от ответственности
            disclaimerBanner: 'Этот симулятор воспроизводит исторические системы антропологической классификации (ок. 1880–1940). Он НЕ представляет современный научный анализ происхождения, генетику, прогнозирование этнической принадлежности, определение расы или биологическую реальность. Исключительно в образовательных и исторических целях.',
            disclaimerNotice: 'ВАЖНОЕ ИСТОРИЧЕСКОЕ УВЕДОМЛЕНИЕ: Этот симулятор воспроизводит исторические методы антропологической классификации. Это НЕ представляет современную генетику, научную оценку происхождения, прогнозирование этнической принадлежности, определение расы или какое-либо утверждение о биологической реальности. Категории и оценки отражают устаревшие типологические системы, изучаемые здесь исключительно в их историческом и образовательном значении.',

            // Элементы пользовательского интерфейса
            selectTraits: 'Выберите признаки для начала',
            primary: 'Основной тип',
            secondary: 'Вторичные типы',
            report: 'Генерировать полный отчет',
            resetAll: 'Сбросить все признаки',
            close: 'Закрыть',
            printReport: 'Печать отчета',
            clearSelections: 'Очистить все выборы и начать заново',
            liveScores: 'Оценки типов в реальном времени',
            scoresNote: 'Исторические оценки сродства антропологических типов (исходное значение: 50). Более высокая оценка = большее морфологическое сходство в этой исторической структуре.',
            closestType: 'Ближайший исторический тип',

            // Названия типов
            types: {
                nordic: 'Нордический',
                ladogan: 'Ладожский',
                eastBaltic: 'Восточно-балтийский',
                slavic: 'Славянский',
                alpine: 'Альпийский',
                dinaric: 'Динарский',
                mediterranean: 'Средиземноморский',
                nearEastern: 'Ближневосточный',
                eastAsian: 'Восточноазиатский',
                mongolian: 'Монгольский',
                malay: 'Малайский',
                ethiopian: 'Эфиопский',
                subSaharanAfrican: 'Африканский (южнее Сахары)',
                amerindian: 'Американский индеец'
            },

            // Названия признаков и описания
            traits: {
                eyeColor: 'Цвет глаз',
                eyeColorDesc: 'Классификация пигментации радужной оболочки на основе визуального сравнения со стандартизированными цветовыми шкалами (например, шкала Мартина–Шульца).',
                eyeColorMeasure: 'Визуальное сравнение при естественном дневном освещении.',

                hairColor: 'Цвет волос',
                hairColorDesc: 'Классификация пигментации волос по стандартизированным цветовым шкалам.',
                hairColorMeasure: 'Визуальная оценка оттенка волос при естественном свете.',

                skinPigmentation: 'Пигментация кожи',
                skinPigmentationDesc: 'Классификация оттенка кожи на основе видимой пигментации.',
                skinPigmentationMeasure: 'Визуальное наблюдение незащищённых участков кожи.',

                headForm: 'Форма черепа (Цефалический индекс)',
                headFormDesc: 'Классификация на основе отношения ширины к длине черепа.',

                facialForm: 'Форма лица',
                facialFormDesc: 'Классификация на основе общей формы лица и его пропорций.',

                noseForm: 'Форма носа',
                noseFormDesc: 'Классификация морфологии носа и высоты переносицы.',

                lipThickness: 'Толщина губ',
                lipThicknessDesc: 'Классификация размера и выступания губ.',

                hairForm: 'Форма волос (Текстура)',
                hairFormDesc: 'Классификация на основе кривизны волос и текстуры.',
                hairFormMeasure: 'Визуальная оценка волнистости волос и формы завитка.',
            },

            // Варианты цвета глаз
            eyeColorOptions: {
                veryLightBlue: 'Очень светло-голубой (Мартин 13–14)',
                lightBlue: 'Светло-голубой (Мартин 15)',
                grey: 'Серый (Мартин 16)',
                greyGreen: 'Серо-зелёный',
                greenBrown: 'Зелёно-коричневый',
                brown: 'Коричневый (Мартин 17)',
                darkBrown: 'Тёмно-коричневый (Мартин 18–19)',
                veryDarkBrown: 'Очень тёмно-коричневый / Чёрный (Мартин 20)',
            },

            // Варианты цвета волос
            hairColorOptions: {
                veryLight: 'Очень светлый блондин',
                lightBlonde: 'Светлый блондин',
                mediumBlonde: 'Средний блондин',
                darkBlonde: 'Тёмный блондин',
                lightBrown: 'Светло-коричневый',
                mediumBrown: 'Средне-коричневый',
                darkBrown: 'Тёмно-коричневый',
                veryDark: 'Очень тёмный коричневый / Чёрный',
                reddish: 'Рыжеватый / Медный',
            },

            // Варианты пигментации кожи
            skinOptions: {
                veryFair: 'Очень светлая (кельтская/скандинавская)',
                fair: 'Светлая',
                lightOlive: 'Светлая оливковая',
                olive: 'Оливковая',
                darkOlive: 'Тёмная оливковая',
                lightBrown: 'Светло-коричневая',
                brown: 'Коричневая',
                darkBrown: 'Тёмно-коричневая',
                veryDark: 'Очень тёмная коричневая',
            },

            // Варианты формы черепа
            headFormOptions: {
                dolichocephalic: 'Долихоцефальная (удлинённая)',
                mesocephalic: 'Мезоцефальная (средняя)',
                brachycephalic: 'Брахицефальная (округлённая)',
            },

            // Варианты формы лица
            facialFormOptions: {
                leptosome: 'Лептосомная (узкая, вытянутая)',
                mesosome: 'Мезосомная (средняя)',
                pyknic: 'Пикническая (широкая, округлённая)',
                athletic: 'Спортивная',
                dysplastic: 'Дисплазия',
            },

            // Сообщения
            messages: {
                initialized: 'Симулятор исторической антропометрической реконструкции инициализирован.',
                notRepresentative: 'ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ: Этот симулятор воспроизводит только устаревшие исторические системы классификации.',
                notReality: 'Это НЕ представляет современную генетику, происхождение, этническую принадлежность, расу или биологическую реальность.'
            }
        },
    },

    // Get a localized string
    get(key, lang = null) {
        const language = lang || this.current;
        const keys = key.split('.');
        let value = this.strings[language];

        for (const k of keys) {
            value = value?.[k];
            if (!value) return key; // Fallback to key if not found
        }
        return value;
    },

    // Set current language
    setLanguage(lang) {
        if (this.strings[lang]) {
            this.current = lang;
            console.log(`Locale switched to: ${lang}`);
        } else {
            console.warn(`Language ${lang} not available`);
        }
    },

    // Add a new language
    addLanguage(lang, strings) {
        this.strings[lang] = strings;
        console.log(`Language ${lang} added`);
    }
};

Object.entries(window.APP_LOCALES || {}).forEach(([language, strings]) => {
    LOCALE.strings[language] = {
        ...(LOCALE.strings[language] || {}),
        ...strings
    };
});

window.LOCALE = LOCALE;

// Usage examples:
// LOCALE.get('pageTitle')
// LOCALE.get('types.nordic')
// LOCALE.get('messages.initialized')
// LOCALE.get('eyeColorOptions.lightBlue')
