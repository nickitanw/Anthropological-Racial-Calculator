const SUBTYPE_KEYS = [

    // Nordic
    "hallstatt",
    "eastNordic",
    "tronder",

    // East Baltic
    "eastBaltic",

    // Ladogan
    "ladogan",

    // Slavic
    "northernSlavic",
    "centralSlavic",
    "ponticSlavic",

    // Alpine
    "alpine",

    // Dinaric
    "dinaric",

    // Mediterranean
    "westernMediterranean",
    "centralMediterranean",
    "easternMediterranean",
    "southernMediterranean",

    // Near Eastern
    "levantine",
    "iranoAfghan",
    "armenoid",

    // Asian
    "northAsian",
    "centralAsian",
    "eastAsian",
    "malay",
    "amerindian",

    // African
    "subSaharan",
    "ethiopian"

];

const SUBTYPE_NAMES = {

    hallstatt: "Hallstatt Nordic",

    eastNordic: "East Nordic",

    tronder: "Trønder",

    eastBaltic: "East Baltic",

    ladogan: "Ladogan",

    northernSlavic: "Northern Slavic",

    centralSlavic: "Central Slavic",

    ponticSlavic: "Pontic Slavic",

    alpine: "Alpine",

    dinaric: "Dinaric",

    westernMediterranean: "Western Mediterranean",

    centralMediterranean: "Central Mediterranean",

    easternMediterranean: "Eastern Mediterranean",

    southernMediterranean: "Southern Mediterranean",

    levantine: "Levantine",

    iranoAfghan: "Irano-Afghan",

    armenoid: "Armenoid",

    northAsian: "North Asian",

    centralAsian: "Central Asian",

    eastAsian: "East Asian",

    malay: "Malay",

    amerindian: "Amerindian",

    subSaharan: "Sub-Saharan",

    ethiopian: "Ethiopian"

};

const SUBTYPE_KEY_SET = new Set(SUBTYPE_KEYS);

function getSubtypeName(typeKey) {
    return SUBTYPE_NAMES[typeKey] || GROUP_NAMES[typeKey] || typeKey;
}

function resolveSubtypeTargets(typeKey) {
    if (SUBTYPE_KEY_SET.has(typeKey)) {
        return [typeKey];
    }

    if (GROUPS[typeKey]) {
        return [...GROUPS[typeKey]];
    }

    return [];
}

function getScoreValueForTypeKey(scoreMap, typeKey) {
    if (!scoreMap) {
        return 0;
    }

    if (SUBTYPE_KEY_SET.has(typeKey)) {
        return scoreMap[typeKey] ?? 0;
    }

    if (GROUPS[typeKey]) {
        const targets = GROUPS[typeKey];

        if (!targets.length) {
            return 0;
        }

        const total = targets.reduce(
            (sum, subtypeKey) => sum + (scoreMap[subtypeKey] ?? 0),
            0
        );

        return total / targets.length;
    }

    return scoreMap[typeKey] ?? 0;
}

const GROUPS = {

    nordic: [

        "hallstatt",

        "eastNordic",

        "tronder"

    ],

    eastBaltic: [

        "eastBaltic"

    ],

    slavic: [

        "northernSlavic",

        "centralSlavic",

        "ponticSlavic"

    ],

    ladogan: [

        "ladogan"
    ],
    alpine: [

        "alpine"

    ],

    dinaric: [

        "dinaric"

    ],

    mediterranean: [

        "westernMediterranean",

        "centralMediterranean",

        "easternMediterranean",

        "southernMediterranean"

    ],

    nearEastern: [

        "levantine",

        "iranoAfghan",

        "armenoid"

    ],

    asian: [

        "northAsian",

        "centralAsian",

        "eastAsian",

        "malay",

        "amerindian"

    ],

    african: [

        "subSaharan",

        "ethiopian"

    ]

};


const GROUP_NAMES = {

    nordic: "Nordic",

    slavic: "Slavic",

    mediterranean: "Mediterranean",

    eastBaltic: "East Baltic",

    ladogan: "Ladogan",

    alpine: "Alpine",

    dinaric: "Dinaric",

    nearEastern: "Near Eastern",

    asian: "Asian",

    african: "African"

};

const GROUP_KEYS = Object.keys(GROUP_NAMES);

function getGroupName(groupKey) {
    return GROUP_NAMES[groupKey] || groupKey;
}

function getGroupScoreEntries(scoreMap) {
    return GROUP_KEYS.map(groupKey => {
        const subtypeKeys = GROUPS[groupKey] || [];

        if (subtypeKeys.length === 0) {
            return {
                key: groupKey,
                name: getGroupName(groupKey),
                score: 0,
                leadSubtypeKey: null,
                leadSubtypeName: '',
                leadSubtypeScore: 0
            };
        }

        let leadSubtypeKey = subtypeKeys[0];
        let leadSubtypeScore = scoreMap?.[leadSubtypeKey] ?? 0;
        let totalScore = leadSubtypeScore;

        subtypeKeys.forEach(subtypeKey => {
            if (subtypeKey === leadSubtypeKey) {
                return;
            }

            const score = scoreMap?.[subtypeKey] ?? 0;
            totalScore += score;

            if (score > leadSubtypeScore) {
                leadSubtypeKey = subtypeKey;
                leadSubtypeScore = score;
            }
        });

        return {
            key: groupKey,
            name: getGroupName(groupKey),
            score: totalScore / subtypeKeys.length,
            leadSubtypeKey,
            leadSubtypeName: getSubtypeName(leadSubtypeKey),
            leadSubtypeScore
        };
    });
}

const SUBTYPE_TO_GROUP = {

    hallstatt: "nordic",

    eastNordic: "nordic",

    tronder: "nordic",

    eastBaltic: "eastBaltic",

    northernSlavic: "slavic",

    centralSlavic: "slavic",

    ponticSlavic: "slavic",

    ladogan: "ladogan",

    alpine: "alpine",

    dinaric: "dinaric",

    westernMediterranean: "mediterranean",

    centralMediterranean: "mediterranean",

    easternMediterranean: "mediterranean",

    southernMediterranean: "mediterranean",

    levantine: "nearEastern",

    iranoAfghan: "nearEastern",

    armenoid: "nearEastern",

    northAsian: "asian",

    centralAsian: "asian",

    eastAsian: "asian",

    malay: "asian",

    amerindian: "asian",

    subSaharan: "african",

    ethiopian: "african"

};

const DISPLAY_ORDER = [

    "hallstatt",

    "eastNordic",

    "tronder",

    "eastBaltic",

    "northernSlavic",

    "centralSlavic",

    "ponticSlavic",

    "ladogan",

    "alpine",

    "dinaric",

    "westernMediterranean",

    "centralMediterranean",

    "easternMediterranean",

    "southernMediterranean",

    "levantine",

    "iranoAfghan",

    "armenoid",

    "northAsian",

    "centralAsian",

    "eastAsian",

    "malay",

    "amerindian",

    "african",

    "ethiopian"

];

const SUBTYPE_DEFINITION_CHECK = (() => {
    const missingNames = SUBTYPE_KEYS.filter(key => !SUBTYPE_NAMES[key]);
    const extraNames = Object.keys(SUBTYPE_NAMES).filter(key => !SUBTYPE_KEY_SET.has(key));
    const missingGroups = SUBTYPE_KEYS.filter(key => !SUBTYPE_TO_GROUP[key]);
    const missingDisplayOrder = SUBTYPE_KEYS.filter(key => !DISPLAY_ORDER.includes(key));
    const extraDisplayOrder = DISPLAY_ORDER.filter(key => !SUBTYPE_KEY_SET.has(key));

    return {
        ok:
            missingNames.length === 0 &&
            extraNames.length === 0 &&
            missingGroups.length === 0 &&
            missingDisplayOrder.length === 0 &&
            extraDisplayOrder.length === 0,
        missingNames,
        extraNames,
        missingGroups,
        missingDisplayOrder,
        extraDisplayOrder
    };
})();

if (!SUBTYPE_DEFINITION_CHECK.ok) {
    console.error('Subtype taxonomy definition mismatch', SUBTYPE_DEFINITION_CHECK);
    throw new Error('Subtype taxonomy definitions are inconsistent.');
}