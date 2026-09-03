const ENGINE_RULES = {

    combinations: [

// ============================================================
// NORDIC GROUP
// ============================================================

{
    id: "morphology_nordic_001",
    name: "Nordic Morphological Core",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "dolichocephalic" &&
            ["leptoprosopic", "hyperleptoprosopic"].includes(userSelections.facialIndex) &&
            userSelections.noseType === "leptorrhine" &&
            userSelections.nasalProfile === "straight" &&
            ["tall", "veryTall"].includes(userSelections.height)
        );
    },
    effects: [
        { type: "nordic", value: 8 }
    ]
},
{
    id: "pigmentation_nordic_001",
    name: "Nordic Pigmentation Core",
    enabled: true,
    condition() {
        return (
            ["veryLightBlue", "lightBlue", "grey"].includes(userSelections.eyeColor) &&
            ["platinumBlonde", "lightBlonde", "goldenBlonde"].includes(userSelections.hairColor) &&
            ["typeI", "typeII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "nordic", value: 5 }
    ]
},
{
    id: "composite_nordic_001",
    name: "Nordic Composite Core",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "dolichocephalic" &&
            ["leptoprosopic", "hyperleptoprosopic"].includes(userSelections.facialIndex) &&
            userSelections.noseType === "leptorrhine" &&
            userSelections.nasalProfile === "straight" &&
            ["tall", "veryTall"].includes(userSelections.height) &&
            ["veryLightBlue", "lightBlue", "grey"].includes(userSelections.eyeColor) &&
            ["platinumBlonde", "lightBlonde", "goldenBlonde"].includes(userSelections.hairColor) &&
            ["typeI", "typeII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "nordic", value: 14 }
    ]
},

// --- Hallstatt Nordic (notably HIGH vault + projecting occiput) ---
{
    id: "morphology_hallstatt_001",
    name: "Hallstatt — High Vault & Projecting Occiput",
    enabled: true,
    condition() {
        return (
            userSelections.occipitalContour === "projecting" &&
            userSelections.cephalicIndex === "dolichocephalic"
        );
    },
    effects: [
        { type: "hallstatt", value: 7 },
        { type: "eastNordic", value: -5 }
    ]
},
{
    id: "pigmentation_hallstatt_001",
    name: "Hallstatt — Very Light Ash-Blond Pigmentation",
    enabled: true,
    condition() {
        return (
            userSelections.skinColor === "typeI" &&
            ["veryLightBlue", "lightBlue"].includes(userSelections.eyeColor) &&
            ["platinumBlonde", "lightBlonde", "darkBlonde"].includes(userSelections.hairColor)
        );
    },
    effects: [
        { type: "hallstatt", value: 5 },
        { type: "tronder", value: -2 }
    ]
},
{
    id: "composite_hallstatt_001",
    name: "Hallstatt Composite Core",
    enabled: true,
    condition() {
        return (
            userSelections.occipitalContour === "projecting" &&
            userSelections.cephalicIndex === "dolichocephalic" &&
            userSelections.skinColor === "typeI" &&
            ["veryLightBlue", "lightBlue"].includes(userSelections.eyeColor) &&
            ["platinumBlonde", "lightBlonde", "darkBlonde"].includes(userSelections.hairColor)
        );
    },
    effects: [
        { type: "hallstatt", value: 13 },
        { type: "eastNordic", value: -7 }
    ]
},

// --- East Nordic (notably LOW vault + dolichocephalic + broader face) ---
{
    id: "morphology_eastNordic_001",
    name: "East Nordic — Low Vault & Wide Cheekbones",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "dolichocephalic" &&
            ["high", "veryHigh"].includes(userSelections.cheekbones)
        );
    },
    effects: [
        { type: "eastNordic", value: 7 },
        { type: "hallstatt", value: -5 }
    ]
},
{
    id: "pigmentation_eastNordic_001",
    name: "East Nordic — Grey-Green Eyes & Brown Hair",
    enabled: true,
    condition() {
        return (
            ["greyGreen", "green"].includes(userSelections.eyeColor) &&
            ["darkBlonde", "lightBrown"].includes(userSelections.hairColor) &&
            ["typeI", "typeII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "eastNordic", value: 5 },
        { type: "hallstatt", value: -2 }
    ]
},
{
    id: "composite_eastNordic_001",
    name: "East Nordic Composite Core",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "dolichocephalic" &&
            ["high", "veryHigh"].includes(userSelections.cheekbones) &&
            ["greyGreen", "green"].includes(userSelections.eyeColor) &&
            ["darkBlonde", "lightBrown"].includes(userSelections.hairColor) &&
            ["typeI", "typeII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "eastNordic", value: 13 },
        { type: "hallstatt", value: -7 }
    ]
},

// --- Trønder (mesocephalic + robust + wavy + tall + golden) ---
{
    id: "morphology_tronder_001",
    name: "Trønder — Mesocephalic Robust Core",
    enabled: true,
    condition() {
        return (
            ["mesocephalic", "sub-brachycephalic"].includes(userSelections.cephalicIndex) &&
            userSelections.hairForm === "wavy" &&
            ["tall", "veryTall"].includes(userSelections.height) 
        );
    },
    effects: [
        { type: "tronder", value: 7 },
        { type: "hallstatt", value: -3 },
        { type: "eastNordic", value: -2 }
    ]
},
{
    id: "pigmentation_tronder_001",
    name: "Trønder — Golden / Tawny Pigmentation",
    enabled: true,
    condition() {
        return (
            ["lightBlue", "greyGreen"].includes(userSelections.eyeColor) &&
            ["goldenBlonde", "darkBlonde", "lightBrown"].includes(userSelections.hairColor) &&
            ["typeI", "typeII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "tronder", value: 4 },
        { type: "hallstatt", value: -2 }
    ]
},
{
    id: "composite_tronder_001",
    name: "Trønder Composite Core",
    enabled: true,
    condition() {
        return (
            ["mesocephalic", "sub-brachycephalic"].includes(userSelections.cephalicIndex) &&
            userSelections.hairForm === "wavy" &&
            ["tall", "veryTall"].includes(userSelections.height) &&

            ["lightBlue", "greyGreen"].includes(userSelections.eyeColor) &&
            ["goldenBlonde", "darkBlonde", "lightBrown"].includes(userSelections.hairColor) &&
            ["typeI", "typeII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "tronder", value: 13 },
        { type: "hallstatt", value: -5 },
        { type: "eastNordic", value: -3 }
    ]
},

// ============================================================
// EAST BALTIC
// ============================================================

{
    id: "morphology_eastBaltic_001",
    name: "East Baltic Morphological Core",
    enabled: true,
    condition() {
        return (
            ["brachycephalic", "hyperbrachycephalic"].includes(userSelections.cephalicIndex) &&
            ["hypereuryprosopic", "euryprosopic"].includes(userSelections.facialIndex) &&
            userSelections.nasalProfile === "concave" &&
            userSelections.nasalTipMorphology === "upturned" 
        );
    },
    effects: [
        { type: "eastBaltic", value: 8 }
    ]
},
{
    id: "pigmentation_eastBaltic_001",
    name: "East Baltic — Light Eyes & Ash-Blond",
    enabled: true,
    condition() {
        return (
            ["grey", "lightBlue", "greyGreen"].includes(userSelections.eyeColor) &&
            ["darkBlonde", "goldenBlonde", "lightBlonde"].includes(userSelections.hairColor) &&
            ["typeI", "typeII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "eastBaltic", value: 5 },
    ]
},
{
    id: "pigmentation_ladogan_001",
    name: "Ladogan — Light Eyes & Ash-Blond",
    enabled: true,
    condition() {
        return (
            ["green", "grey", "greyGreen"].includes(userSelections.eyeColor) &&
            ["darkBlonde", "goldenBlonde", "lightBlonde"].includes(userSelections.hairColor) &&
            ["typeI", "typeII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "ladogan", value: 5 },
    ]
},

{
    id: "composite_eastBaltic_001",
    name: "East Baltic Composite Core",
    enabled: true,
    condition() {
        return (
            ["brachycephalic", "hyperbrachycephalic"].includes(userSelections.cephalicIndex) &&
            ["hypereuryprosopic", "euryprosopic"].includes(userSelections.facialIndex) &&
            userSelections.nasalProfile === "concave" &&
            userSelections.nasalTipMorphology === "upturned" &&

            ["grey", "lightBlue"].includes(userSelections.eyeColor) &&
            ["darkBlonde", "goldenBlonde", "lightBlonde"].includes(userSelections.hairColor) &&
            ["typeI", "typeII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "eastBaltic", value: 14 }
    ]
},

// ============================================================
// SLAVIC GROUP
// ============================================================

{
    id: "morphology_slavic_001",
    name: "Slavic Morphological Core",
    enabled: true,
    condition() {
        return (
            ["brachycephalic", "mesocephalic", "sub-brachycephalic"].includes(userSelections.cephalicIndex) &&
            userSelections.facialIndex === "mesoprosopic" &&
            userSelections.noseType === "mesorrhine" &&
            ["high", "veryHigh", "moderate"].includes(userSelections.cheekbones)
        );
    },
    effects: [
        { type: "slavic", value: 7 }
    ]
},
{
    id: "composite_slavic_001",
    name: "Slavic Composite Core",
    enabled: true,
    condition() {
        return (
            ["brachycephalic", "mesocephalic", "sub-brachycephalic"].includes(userSelections.cephalicIndex) &&
            userSelections.facialIndex === "mesoprosopic" &&
            userSelections.noseType === "mesorrhine" &&
            ["high", "veryHigh", "moderate"].includes(userSelections.cheekbones) &&
            ["grey", "greyGreen", "green", "hazel", "lightBrown"].includes(userSelections.eyeColor) &&
            ["darkBlonde", "lightBrown", "brown"].includes(userSelections.hairColor) &&
            ["typeI", "typeII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "slavic", value: 13 }
    ]
},

// --- Northern Slavic (Finnic substrate — concave, brachy, snub, ash pigmentation) ---
{
    id: "morphology_northernSlavic_001",
    name: "Northern Slavic — Concave / Snub Nose Complex",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "sub-dolichocephalic" &&
            userSelections.nasalProfile === "concave" &&
            userSelections.nasalTipMorphology === "upturned" &&
            userSelections.noseType === "mesorrhine" &&
            ["typeI", "typeII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "northernSlavic", value: 6 },
        { type: "centralSlavic", value: 2 },
        { type: "ponticSlavic", value: -4 }
    ]
},
{
    id: "pigmentation_northernSlavic_001",
    name: "Northern Slavic — Ash-Blond & Grey Eyes",
    enabled: true,
    condition() {
        return (
            ["grey", "lightBlue"].includes(userSelections.eyeColor) &&
            ["lightBlonde", "darkBlonde", "lightBrown"].includes(userSelections.hairColor) &&
            ["typeI", "typeII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "northernSlavic", value: 5 },
        { type: "ponticSlavic", value: -3 }
    ]
},
{
    id: "composite_northernSlavic_001",
    name: "Northern Slavic Composite Core",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "sub-dolichocephalic" &&
            userSelections.nasalProfile === "concave" &&
            userSelections.nasalTipMorphology === "upturned" &&
            userSelections.noseType === "mesorrhine" &&
            ["grey", "lightBlue"].includes(userSelections.eyeColor) &&
            ["lightBlonde", "darkBlonde", "lightBrown"].includes(userSelections.hairColor) &&
            ["typeI", "typeII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "northernSlavic", value: 12 },
        { type: "ponticSlavic", value: -5 }
    ]
},

// --- Central Slavic / Neo-Danubian (round face + ash-blond + grey-green eyes) ---
{
    id: "morphology_centralSlavic_001",
    name: "Central Slavic — Round Face & Elevated Tip",
    enabled: true,
    condition() {
        return (
            ["mesocephalic", "sub-brachycephalic"].includes(userSelections.cephalicIndex) &&
            userSelections.faceShape === "round" &&
            userSelections.nasalTipMorphology === "bulbous" &&
            userSelections.cheekbones === "moderate"
        );
    },
    effects: [
        { type: "centralSlavic", value: 7 },
        { type: "northernSlavic", value: 2 },
        { type: "ponticSlavic", value: -3 },
        { type: "alpine", value: -3 }
    ]
},
{
    id: "pigmentation_centralSlavic_001",
    name: "Central Slavic — Ash-Blond & Grey-Mixed Eyes",
    enabled: true,
    condition() {
        return (
            ["grey", "greyGreen"].includes(userSelections.eyeColor) &&
            ["lightBlonde", "darkBlonde"].includes(userSelections.hairColor) &&
            ["typeI", "typeII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "centralSlavic", value: 5 },
        { type: "ponticSlavic", value: -3 }
    ]
},
{
    id: "composite_centralSlavic_001",
    name: "Central Slavic Composite Core",
    enabled: true,
    condition() {
        return (
            ["mesocephalic", "sub-brachycephalic"].includes(userSelections.cephalicIndex) &&
            userSelections.faceShape === "round" &&
            userSelections.nasalTipMorphology === "bulbous" &&
            userSelections.cheekbones === "moderate" &&
            ["grey", "greyGreen"].includes(userSelections.eyeColor) &&
            ["lightBlonde", "darkBlonde"].includes(userSelections.hairColor) &&
            ["typeI", "typeII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "centralSlavic", value: 13 },
        { type: "alpine", value: -5 },
        { type: "ponticSlavic", value: -4 }
    ]
},

// --- Southern Slavic (mesocephalic + Pontic/Dinaric admixture + darker) ---


// ============================================================
// LADOGAN
// ============================================================

{
    id: "morphology_ladogan_001",
    name: "Ladogan Morphological Core",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "brachycephalic" &&
            userSelections.facialIndex === "euryprosopic" &&
            userSelections.nasalProfile === "concave" &&
            userSelections.nasalTipMorphology === "upturned" &&
            ["high", "veryHigh"].includes(userSelections.cheekbones)
        );
    },
    effects: [
        { type: "ladogan", value: 8 }
    ]
},
{
    id: "composite_ladogan_001",
    name: "Ladogan Composite Core",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "brachycephalic" &&
            userSelections.facialIndex === "euryprosopic" &&
            userSelections.nasalProfile === "concave" &&
            userSelections.nasalTipMorphology === "upturned" &&
            ["high", "veryHigh"].includes(userSelections.cheekbones) &&
            ["grey", "lightBlue", "greyGreen"].includes(userSelections.eyeColor) &&
            ["lightBlonde", "darkBlonde", "goldenBlonde"].includes(userSelections.hairColor) &&
            ["typeI", "typeII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "ladogan", value: 14 }
    ]
},

// ============================================================
// ALPINE
// ============================================================

{
    id: "morphology_alpine_001",
    name: "Alpine Morphological Core",
    enabled: true,
    condition() {
        return (
            ["brachycephalic", "hyperbrachycephalic"].includes(userSelections.cephalicIndex) &&
            ["hypereuryprosopic", "euryprosopic"].includes(userSelections.facialIndex) &&
            userSelections.occipitalContour === "rounded" &&
            userSelections.nasalProfile === "concave" &&
            userSelections.faceShape === "round"
        );
    },
    effects: [
        { type: "alpine", value: 9 }
    ]
},
{
    id: "pigmentation_alpine_001",
    name: "Alpine Pigmentation Core",
    enabled: true,
    condition() {
        return (
            ["hazel", "lightBrown", "mediumBrown"].includes(userSelections.eyeColor) &&
            ["lightBrown", "brown", "darkBrown"].includes(userSelections.hairColor) &&
            ["typeII", "typeIII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "alpine", value: 5 }
    ]
},
{
    id: "composite_alpine_001",
    name: "Alpine Composite Core",
    enabled: true,
    condition() {
        return (
            ["brachycephalic", "hyperbrachycephalic"].includes(userSelections.cephalicIndex) &&
            ["hypereuryprosopic", "euryprosopic"].includes(userSelections.facialIndex) &&
            userSelections.occipitalContour === "rounded" &&
            userSelections.nasalProfile === "concave" &&
            userSelections.faceShape === "round" &&
            ["hazel", "lightBrown", "mediumBrown"].includes(userSelections.eyeColor) &&
            ["lightBrown", "brown", "darkBrown"].includes(userSelections.hairColor) &&
            ["typeII", "typeIII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "alpine", value: 15 }
    ]
},

// ============================================================
// DINARIC
// ============================================================

{
    id: "morphology_dinaric_001",
    name: "Dinaric Morphological Core",
    enabled: true,
    condition() {
        return (
            ["brachycephalic", "hyperbrachycephalic"].includes(userSelections.cephalicIndex) &&
            ["leptoprosopic", "hyperleptoprosopic"].includes(userSelections.facialIndex) &&
            userSelections.nasalProfile === "convex" &&
            userSelections.nasalBridgeHeight === "high" &&
            userSelections.occipitalContour === "flat"
        );
    },
    effects: [
        { type: "dinaric", value: 9 }
    ]
},
{
    id: "pigmentation_dinaric_001",
    name: "Dinaric Pigmentation Core",
    enabled: true,
    condition() {
        return (
            ["darkBrown", "blackBrown"].includes(userSelections.eyeColor) &&
            ["darkBrown", "black"].includes(userSelections.hairColor) &&
            ["typeII", "typeIII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "dinaric", value: 5 }
    ]
},
{
    id: "composite_dinaric_001",
    name: "Dinaric Composite Core",
    enabled: true,
    condition() {
        return (
            ["brachycephalic", "hyperbrachycephalic"].includes(userSelections.cephalicIndex) &&
            ["leptoprosopic", "hyperleptoprosopic"].includes(userSelections.facialIndex) &&
            userSelections.nasalProfile === "convex" &&
            userSelections.nasalBridgeHeight === "high" &&
            userSelections.occipitalContour === "flat" &&
            ["darkBrown", "blackBrown"].includes(userSelections.eyeColor) &&
            ["darkBrown", "black"].includes(userSelections.hairColor) &&
            ["typeII", "typeIII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "dinaric", value: 15 }
    ]
},

// ============================================================
// MEDITERRANEAN GROUP
// ============================================================

{
    id: "morphology_mediterranean_001",
    name: "Mediterranean Morphological Core",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "dolichocephalic" &&
            ["leptoprosopic", "hyperleptoprosopic"].includes(userSelections.facialIndex) &&
            userSelections.noseType === "leptorrhine" &&
            userSelections.nasalProfile === "straight" &&
            ["short", "average"].includes(userSelections.height)
        );
    },
    effects: [
        { type: "mediterranean", value: 8 }
    ]
},
{
    id: "composite_mediterranean_001",
    name: "Mediterranean Composite Core",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "dolichocephalic" &&
            ["leptoprosopic", "hyperleptoprosopic"].includes(userSelections.facialIndex) &&
            userSelections.noseType === "leptorrhine" &&
            userSelections.nasalProfile === "straight" &&
            ["short", "average"].includes(userSelections.height) &&
            ["darkBrown", "blackBrown"].includes(userSelections.eyeColor) &&
            ["brown", "darkBrown", "black"].includes(userSelections.hairColor) &&
            ["typeIII", "typeIV"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "mediterranean", value: 14 }
    ]
},

// --- Western Mediterranean (gracile, straight, dolichocephalic, narrow) ---
{
    id: "morphology_westernMediterranean_001",
    name: "Western Mediterranean — Gracile Dolichocephalic",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "dolichocephalic" &&
            ["leptoprosopic", "hyperleptoprosopic"].includes(userSelections.facialIndex) &&
            userSelections.noseType === "leptorrhine" &&
            userSelections.nasalProfile === "straight" 
        );
    },
    effects: [
        { type: "westernMediterranean", value: 7 },
        { type: "southernMediterranean", value: 3 },
        { type: "easternMediterranean", value: -3 }
    ]
},
{
    id: "pigmentation_westernMediterranean_001",
    name: "Western Mediterranean Pigmentation",
    enabled: true,
    condition() {
        return (
            ["mediumBrown", "darkBrown"].includes(userSelections.eyeColor) &&
            ["darkBrown", "black"].includes(userSelections.hairColor) &&
            ["typeIII", "typeIV"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "westernMediterranean", value: 5 },
        { type: "centralMediterranean", value: 3 }
    ]
},

// --- Southern Mediterranean (very narrow, dolichocephalic, light-to-medium brown skin) ---
{
    id: "morphology_southernMediterranean_001",
    name: "Southern Mediterranean — Attenuated Dolichocephalic",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "dolichocephalic" &&
            userSelections.facialIndex === "hyperleptoprosopic" &&
            userSelections.noseType === "leptorrhine" &&
            ["short", "average"].includes(userSelections.height) 
        );
    },
    effects: [
        { type: "southernMediterranean", value: 7 },
        { type: "levantine", value: 3 },
        { type: "westernMediterranean", value: 2 }
    ]
},

// --- Central Mediterranean (broader, moderate robustness, Italy) ---
{
    id: "morphology_centralMediterranean_001",
    name: "Central Mediterranean — Moderate Cranial Type",
    enabled: true,
    condition() {
        return (
            ["mesocephalic", "sub-dolichocephalic", "sub-brachycephalic"].includes(userSelections.cephalicIndex) &&
            userSelections.noseType === "leptorrhine" &&
            ["leptoprosopic", "mesoprosopic"].includes(userSelections.facialIndex) 
        );
    },
    effects: [
        { type: "centralMediterranean", value: 6 },
        { type: "westernMediterranean", value: 2 },
        { type: "easternMediterranean", value: 2 }
    ]
},

// --- Eastern Mediterranean (brachycephalic, broad face, very dark) ---
{
    id: "morphology_easternMediterranean_001",
    name: "Eastern Mediterranean — Brachycephalic & Dark",
    enabled: true,
    condition() {
        return (
            ["sub-brachycephalic", "mesocephalic"].includes(userSelections.cephalicIndex) &&
            ["mesoprosopic", "leptoprosopic"].includes(userSelections.facialIndex) &&
            ["darkBrown", "blackBrown"].includes(userSelections.eyeColor) &&
            ["darkBrown", "black"].includes(userSelections.hairColor) &&
            ["typeII", "typeIII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "easternMediterranean", value: 7 },
        { type: "centralMediterranean", value: 3 },
        { type: "westernMediterranean", value: -4 }
    ]
},

// ============================================================
// NEAR EASTERN GROUP
// ============================================================

{
    id: "morphology_nearEastern_001",
    name: "Near Eastern Morphological Core",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "dolichocephalic" &&
            ["leptoprosopic", "hyperleptoprosopic"].includes(userSelections.facialIndex) &&
            userSelections.noseType === "leptorrhine" &&
            userSelections.nasalProfile === "convex" &&
            userSelections.nasalBridgeHeight === "high"
        );
    },
    effects: [
        { type: "nearEastern", value: 8 }
    ]
},
{
    id: "composite_nearEastern_001",
    name: "Near Eastern Composite Core",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "dolichocephalic" &&
            ["leptoprosopic", "hyperleptoprosopic"].includes(userSelections.facialIndex) &&
            userSelections.noseType === "leptorrhine" &&
            userSelections.nasalProfile === "convex" &&
            userSelections.nasalBridgeHeight === "high" &&
            ["blackBrown", "darkBrown"].includes(userSelections.eyeColor) &&
            ["black", "darkBrown"].includes(userSelections.hairColor) &&
            ["typeIII", "typeIV", "typeV"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "nearEastern", value: 14 }
    ]
},

// --- Levantine (narrow, dolichocephalic, convex/beaked, shorter, dark) ---
{
    id: "morphology_levantine_001",
    name: "Levantine — Narrow Convex Dolichocephalic",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "dolichocephalic" &&
            ["leptoprosopic", "hyperleptoprosopic"].includes(userSelections.facialIndex) &&
            userSelections.nasalProfile === "convex" &&
            userSelections.nasalBridgeHeight === "high" &&
            ["short", "average"].includes(userSelections.height)
        );
    },
    effects: [
        { type: "levantine", value: 7 },
        { type: "southernMediterranean", value: 2 },
        { type: "iranoAfghan", value: -2 }
    ]
},
{
    id: "pigmentation_levantine_001",
    name: "Levantine Pigmentation Core",
    enabled: true,
    condition() {
        return (
            ["blackBrown", "darkBrown"].includes(userSelections.eyeColor) &&
            userSelections.hairColor === "black" &&
            ["typeIII", "typeIV"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "levantine", value: 5 },
        { type: "southernMediterranean", value: 2 }
    ]
},
{
    id: "composite_levantine_001",
    name: "Levantine Composite Core",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "dolichocephalic" &&
            ["leptoprosopic", "hyperleptoprosopic"].includes(userSelections.facialIndex) &&
            userSelections.nasalProfile === "convex" &&
            userSelections.nasalBridgeHeight === "high" &&
            ["short", "average"].includes(userSelections.height) &&
            ["blackBrown", "darkBrown"].includes(userSelections.eyeColor) &&
            userSelections.hairColor === "black" &&
            ["typeIII", "typeIV"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "levantine", value: 13 },
        { type: "iranoAfghan", value: -3 }
    ]
},

// --- Irano-Afghan (tall, very long face, hook-nosed, leptorrhine) ---
{
    id: "morphology_iranoAfghan_001",
    name: "Irano-Afghan — Hook-Nosed Tall Dolichocephalic",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "dolichocephalic" &&
            ["leptoprosopic", "hyperleptoprosopic"].includes(userSelections.facialIndex) &&
            userSelections.nasalProfile === "convex" &&
            userSelections.nasalTipMorphology === "hooked" &&
            userSelections.nasalBridgeHeight === "high"
        );
    },
    effects: [
        { type: "iranoAfghan", value: 9 },
        { type: "levantine", value: 2 },
        { type: "armenoid", value: -4 }
    ]
},
{
    id: "pigmentation_iranoAfghan_001",
    name: "Irano-Afghan Pigmentation Core",
    enabled: true,
    condition() {
        return (
            ["darkBrown", "blackBrown"].includes(userSelections.eyeColor) &&
            ["darkBrown", "black"].includes(userSelections.hairColor) &&
            ["typeIII", "typeIV"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "iranoAfghan", value: 4 },
        { type: "levantine", value: 2 },
        { type: "armenoid", value: 2 }
    ]
},
{
    id: "composite_iranoAfghan_001",
    name: "Irano-Afghan Composite Core",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "dolichocephalic" &&
            ["leptoprosopic", "hyperleptoprosopic"].includes(userSelections.facialIndex) &&
            userSelections.nasalProfile === "convex" &&
            userSelections.nasalTipMorphology === "hooked" &&
            userSelections.nasalBridgeHeight === "high" &&
            ["darkBrown", "blackBrown"].includes(userSelections.eyeColor) &&
            ["darkBrown", "black"].includes(userSelections.hairColor) &&
            ["typeIII", "typeIV"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "iranoAfghan", value: 14 },
        { type: "armenoid", value: -5 }
    ]
},

// --- Armenoid (hyperbrachycephalic + flat occiput + hooked drooping tip + heavy brows) ---
{
    id: "morphology_armenoid_001",
    name: "Armenoid — Brachycephalic Flat Occiput & Hooked Nose",
    enabled: true,
    condition() {
        return (
            ["brachycephalic", "hyperbrachycephalic"].includes(userSelections.cephalicIndex) &&
            userSelections.occipitalContour === "flat" &&
            userSelections.nasalProfile === "convex" &&
            userSelections.nasalTipMorphology === "hooked" &&
            userSelections.nasalBridgeHeight === "high"
        );
    },
    effects: [
        { type: "armenoid", value: 10 },
        { type: "iranoAfghan", value: -4 },
        { type: "dinaric", value: -3 }
    ]
},

{
    id: "composite_armenoid_001",
    name: "Armenoid Composite Core",
    enabled: true,
    condition() {
        return (
            ["brachycephalic", "hyperbrachycephalic"].includes(userSelections.cephalicIndex) &&
            userSelections.occipitalContour === "flat" &&
            userSelections.nasalProfile === "convex" &&
            userSelections.nasalTipMorphology === "hooked" &&
            userSelections.nasalBridgeHeight === "high" &&
            ["darkBrown", "blackBrown"].includes(userSelections.eyeColor) &&
            ["darkBrown", "black"].includes(userSelections.hairColor) &&
            ["typeIII", "typeIV"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "armenoid", value: 15 },
        { type: "iranoAfghan", value: -5 },
        { type: "dinaric", value: -5 }
    ]
},

// ============================================================
// EAST ASIAN
// ============================================================

{
    id: "morphology_eastAsian_001",
    name: "East Asian Morphological Core",
    enabled: true,
    condition() {
        return (
            ["moderate", "strong"].includes(userSelections.epicanthus) &&
            ["high", "veryHigh"].includes(userSelections.cheekbones) &&
            userSelections.eyeShape === "horizontal" &&
            ["broad", "veryBroad"].includes(userSelections.faceShape) &&
            userSelections.orbitalIndex === "chamaeconch"
        );
    },
    effects: [
        { type: "eastAsian", value: 8 }
    ]
},
{
    id: "pigmentation_eastAsian_001",
    name: "East Asian Pigmentation Core",
    enabled: true,
    condition() {
        return (
            ["blackBrown", "darkBrown"].includes(userSelections.eyeColor) &&
            userSelections.hairColor === "black" &&
            userSelections.hairForm === "straight" &&
            ["typeIV", "typeV"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "eastAsian", value: 5 },
        { type: "northAsian", value: 3 }
    ]
},
{
    id: "composite_eastAsian_001",
    name: "East Asian Composite Core",
    enabled: true,
    condition() {
        return (
            ["moderate", "strong"].includes(userSelections.epicanthus) &&
            ["high", "veryHigh"].includes(userSelections.cheekbones) &&
            userSelections.eyeShape === "horizontal" &&
            ["broad", "veryBroad"].includes(userSelections.faceShape) &&
            userSelections.orbitalIndex === "chamaeconch" &&
            ["blackBrown", "darkBrown"].includes(userSelections.eyeColor) &&
            userSelections.hairColor === "black" &&
            userSelections.hairForm === "straight"
        );
    },
    effects: [
        { type: "eastAsian", value: 14 }
    ]
},

// ============================================================
// NORTH ASIAN (Buryat-Mongol / Taigid)
// ============================================================

{
    id: "morphology_northAsian_001",
    name: "North Asian Morphological Core",
    enabled: true,
    condition() {
        return (
            ["brachycephalic", "hyperbrachycephalic"].includes(userSelections.cephalicIndex) &&
            userSelections.epicanthus === "strong" &&
            userSelections.cheekbones === "veryHigh" &&
            userSelections.faceShape === "veryBroad" 
        );
    },
    effects: [
        { type: "northAsian", value: 9 },
        { type: "eastAsian", value: 2 },
        { type: "centralAsian", value: 2 }
    ]
},
{
    id: "pigmentation_northAsian_001",
    name: "North Asian Pigmentation Core",
    enabled: true,
    condition() {
        return (
            userSelections.eyeColor === "blackBrown" &&
            userSelections.hairColor === "black" &&
            userSelections.hairForm === "straight" &&
           ["typeIV", "typeV"].includes(userSelections.skinColor) 
        );
    },
    effects: [
        { type: "northAsian", value: 5 },
        { type: "eastAsian", value: 3 }
    ]
},
{
    id: "composite_northAsian_001",
    name: "North Asian Composite Core",
    enabled: true,
    condition() {
        return (
            ["brachycephalic", "hyperbrachycephalic"].includes(userSelections.cephalicIndex) &&
            userSelections.epicanthus === "strong" &&
            userSelections.cheekbones === "veryHigh" &&
            userSelections.faceShape === "veryBroad" &&
            userSelections.eyeColor === "blackBrown" &&
            userSelections.hairColor === "black" &&
            userSelections.hairForm === "straight" &&
            ["typeIV", "typeV"].includes(userSelections.skinColor) 
        );
    },
    effects: [
        { type: "northAsian", value: 14 }
    ]
},

// ============================================================
// CENTRAL ASIAN (Kazakh/Kirghiz hybrid — Europoid admixture)
// ============================================================

{
    id: "morphology_centralAsian_001",
    name: "Central Asian Morphological Core",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "brachycephalic" &&
            ["high", "veryHigh"].includes(userSelections.cheekbones) &&
            userSelections.nasalProfile === "convex" &&
            ["slight", "moderate"].includes(userSelections.epicanthus) &&
            userSelections.faceShape === "broad"
        );
    },
    effects: [
        { type: "centralAsian", value: 8 },
        { type: "northAsian", value: -2 },
        { type: "nearEastern", value: -3 }
    ]
},
{
    id: "pigmentation_centralAsian_001",
    name: "Central Asian Pigmentation Core",
    enabled: true,
    condition() {
        return (
            ["darkBrown", "blackBrown"].includes(userSelections.eyeColor) &&
            ["darkBrown", "black"].includes(userSelections.hairColor) &&
            userSelections.hairForm === "straight" &&
            ["typeIV", "typeV"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "centralAsian", value: 5 },
        { type: "northAsian", value: 2 }
    ]
},
{
    id: "composite_centralAsian_001",
    name: "Central Asian Composite Core",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "brachycephalic" &&
            ["high", "veryHigh"].includes(userSelections.cheekbones) &&
            userSelections.nasalProfile === "convex" &&
            ["slight", "moderate"].includes(userSelections.epicanthus) &&
            userSelections.faceShape === "broad" &&
            ["darkBrown", "blackBrown"].includes(userSelections.eyeColor) &&
            ["darkBrown", "black"].includes(userSelections.hairColor) &&
            userSelections.hairForm === "straight" &&
            ["typeIV", "typeV"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "centralAsian", value: 13 }
    ]
},

// ============================================================
// MALAY
// ============================================================

{
    id: "morphology_malay_001",
    name: "Malay Morphological Core",
    enabled: true,
    condition() {
        return (
            ["brachycephalic", "mesocephalic", "sub-brachycephalic"].includes(userSelections.cephalicIndex) &&
            ["hypereuryprosopic", "euryprosopic"].includes(userSelections.facialIndex) &&
            userSelections.noseType === "mesorrhine" &&
            userSelections.hairForm === "straight" &&
            ["slight", "moderate"].includes(userSelections.epicanthus)
        );
    },
    effects: [
        { type: "malay", value: 8 }
    ]
},
{
    id: "pigmentation_malay_001",
    name: "Malay Pigmentation Core",
    enabled: true,
    condition() {
        return (
            ["blackBrown", "darkBrown"].includes(userSelections.eyeColor) &&
            userSelections.hairColor === "black" &&
            ["typeIV", "typeV"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "malay", value: 5 }
    ]
},
{
    id: "composite_malay_001",
    name: "Malay Composite Core",
    enabled: true,
    condition() {
        return (
            ["brachycephalic", "mesocephalic", "sub-brachycephalic"].includes(userSelections.cephalicIndex) &&
            ["hypereuryprosopic", "euryprosopic"].includes(userSelections.facialIndex) &&
            userSelections.noseType === "mesorrhine" &&
            userSelections.hairForm === "straight" &&
            ["slight", "moderate"].includes(userSelections.epicanthus) &&
            ["blackBrown", "darkBrown"].includes(userSelections.eyeColor) &&
            userSelections.hairColor === "black" &&
            ["typeIV", "typeV"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "malay", value: 14 }
    ]
},

// ============================================================
// AMERINDIAN
// ============================================================

{
    id: "morphology_amerindian_001",
    name: "Amerindian Morphological Core",
    enabled: true,
    condition() {
        return (
            ["mesocephalic", "dolichocephalic", "sub-dolichocephalic"].includes(userSelections.cephalicIndex) &&
            ["high", "veryHigh"].includes(userSelections.cheekbones) &&
            userSelections.noseType === "mesorrhine" &&
            userSelections.hairForm === "straight" &&
            userSelections.prognathism === "orthognathous"
        );
    },
    effects: [
        { type: "amerindian", value: 8 }
    ]
},
{
    id: "pigmentation_amerindian_001",
    name: "Amerindian Pigmentation Core",
    enabled: true,
    condition() {
        return (
            ["darkBrown", "blackBrown"].includes(userSelections.eyeColor) &&
            userSelections.hairColor === "black" &&
            userSelections.hairForm === "straight" &&
            ["typeIII", "typeIV", "typeV"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "amerindian", value: 5 }
    ]
},
{
    id: "composite_amerindian_001",
    name: "Amerindian Composite Core",
    enabled: true,
    condition() {
        return (
            ["mesocephalic", "dolichocephalic", "sub-dolichocephalic"].includes(userSelections.cephalicIndex) &&
            ["high", "veryHigh"].includes(userSelections.cheekbones) &&
            userSelections.noseType === "mesorrhine" &&
            userSelections.hairForm === "straight" &&
            userSelections.prognathism === "orthognathous" &&
            ["darkBrown", "blackBrown"].includes(userSelections.eyeColor) &&
            userSelections.hairColor === "black" &&
            ["typeIII", "typeIV", "typeV"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "amerindian", value: 14 }
    ]
},

// ============================================================
// SUB-SAHARAN AFRICAN
// ============================================================

{
    id: "morphology_african_001",
    name: "Sub-Saharan African Morphological Core",
    enabled: true,
    condition() {
        return (
            userSelections.noseType === "platyrrhine" &&
            userSelections.prognathism === "prognathous" &&
            ["thick", "veryThick"].includes(userSelections.lipFullness) &&
            userSelections.nasalBridgeHeight === "low" &&
            userSelections.hairForm === "tightlyCurled"
        );
    },
    effects: [
        { type: "subSaharan", value: 9 }
    ]
},
{
    id: "pigmentation_african_001",
    name: "Sub-Saharan African Pigmentation Core",
    enabled: true,
    condition() {
        return (
            userSelections.eyeColor === "blackBrown" &&
            userSelections.hairColor === "black" &&
            ["typeV", "typeVI"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "subSaharan", value: 5 }
    ]
},
{
    id: "composite_african_001",
    name: "Sub-Saharan African Composite Core",
    enabled: true,
    condition() {
        return (
            userSelections.noseType === "platyrrhine" &&
            userSelections.prognathism === "prognathous" &&
            ["thick", "veryThick"].includes(userSelections.lipFullness) &&
            userSelections.nasalBridgeHeight === "low" &&
            userSelections.hairForm === "tightlyCurled" &&
            userSelections.eyeColor === "blackBrown" &&
            userSelections.hairColor === "black" &&
            ["typeV", "typeVI"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "subSaharan", value: 15 }
    ]
},

// ============================================================
// ETHIOPIAN
// ============================================================

{
    id: "morphology_ethiopian_001",
    name: "Ethiopian Morphological Core",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "dolichocephalic" &&
            ["leptoprosopic", "hyperleptoprosopic"].includes(userSelections.facialIndex) &&
            userSelections.noseType === "leptorrhine" &&
            userSelections.nasalBridgeHeight === "high" &&
            userSelections.prognathism === "orthognathous"
        );
    },
    effects: [
        { type: "ethiopian", value: 8 }
    ]
},
{
    id: "pigmentation_ethiopian_001",
    name: "Ethiopian Pigmentation Core",
    enabled: true,
    condition() {
        return (
            ["blackBrown", "darkBrown"].includes(userSelections.eyeColor) &&
            userSelections.hairColor === "black" &&
            ["typeV", "typeVI"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "ethiopian", value: 5 }
    ]
},
{
    id: "composite_ethiopian_001",
    name: "Ethiopian Composite Core",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "dolichocephalic" &&
            ["leptoprosopic", "hyperleptoprosopic"].includes(userSelections.facialIndex) &&
            userSelections.noseType === "leptorrhine" &&
            userSelections.nasalBridgeHeight === "high" &&
            userSelections.prognathism === "orthognathous" &&
            ["blackBrown", "darkBrown"].includes(userSelections.eyeColor) &&
            userSelections.hairColor === "black" &&
            ["typeV", "typeVI"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "ethiopian", value: 14 }
    ]
},

    ],  // end combinations

    contradictions: [

// ============================================================
// MACRO CONTRADICTIONS
// ============================================================

{
    id: "macro_contradiction_european_001",
    name: "European vs East Asian Morphology",
    enabled: true,
    condition() {
        return (
            ["moderate", "strong"].includes(userSelections.epicanthus) &&
            userSelections.eyeShape === "horizontal"
        );
    },
    effects: [
        { type: "nordic",      value: -7 },
        { type: "eastBaltic",  value: -7 },
        { type: "ladogan",     value: -7 },
        { type: "slavic",      value: -7 },
        { type: "alpine",      value: -7 },
        { type: "dinaric",     value: -7 },
        { type: "mediterranean", value: -7 },
        { type: "nearEastern", value: -5 }
    ]
},
{
    id: "macro_contradiction_european_002",
    name: "European vs African Morphology",
    enabled: true,
    condition() {
        return (
            userSelections.noseType === "platyrrhine" &&
            userSelections.prognathism === "prognathous"
        );
    },
    effects: [
        { type: "nordic",      value: -9 },
        { type: "eastBaltic",  value: -9 },
        { type: "ladogan",     value: -9 },
        { type: "slavic",      value: -9 },
        { type: "alpine",      value: -9 },
        { type: "dinaric",     value: -9 },
        { type: "mediterranean", value: -9 },
        { type: "nearEastern", value: -8 }
    ]
},
{
    id: "macro_contradiction_african_001",
    name: "African vs European Pigmentation",
    enabled: true,
    condition() {
        return (
            ["typeI", "typeII"].includes(userSelections.skinColor) &&
            ["veryLightBlue", "lightBlue", "grey", "greyGreen", "green"].includes(userSelections.eyeColor)
        );
    },
    effects: [
        { type: "subSaharan",    value: -14 },
        { type: "ethiopian",  value: -12 }
    ]
},
{
    id: "macro_contradiction_asian_001",
    name: "East Asian vs African Morphology",
    enabled: true,
    condition() {
        return (
            ["moderate", "strong"].includes(userSelections.epicanthus) &&
            userSelections.prognathism === "prognathous"
        );
    },
    effects: [
        { type: "eastAsian",  value: -7 },
        { type: "northAsian", value: -7 }
    ]
},
{
    id: "macro_contradiction_amerindian_001",
    name: "Amerindian vs Hyperbrachycephalic + Strong Epicanthus",
    enabled: true,
    condition() {
        return (
            userSelections.epicanthus === "strong" &&
            userSelections.cephalicIndex === "hyperbrachycephalic"
        );
    },
    effects: [
        { type: "amerindian", value: -7 }
    ]
},
{
    id: "macro_contradiction_nearEastern_001",
    name: "Near Eastern vs Platyrrhine / Low Bridge",
    enabled: true,
    condition() {
        return (
            userSelections.noseType === "platyrrhine" &&
            userSelections.nasalBridgeHeight === "low"
        );
    },
    effects: [
        { type: "nearEastern",    value: -9 },
        { type: "mediterranean",  value: -8 }
    ]
},
{
    id: "macro_contradiction_european_003",
    name: "European vs East Asian Pigmentation Complex",
    enabled: true,
    condition() {
        return (
            ["typeI", "typeII"].includes(userSelections.skinColor) &&
            ["platinumBlonde", "lightBlonde", "goldenBlonde", "darkBlonde"].includes(userSelections.hairColor) &&
            ["veryLightBlue", "lightBlue", "grey", "greyGreen", "green"].includes(userSelections.eyeColor) &&
            userSelections.epicanthus === "absent"
        );
    },
    effects: [
        { type: "eastAsian",   value: -7 },
        { type: "northAsian",  value: -7 },
        { type: "centralAsian", value: -5 },
        { type: "malay",       value: -7 }
    ]
},
{
    id: "macro_contradiction_asian_002",
    name: "East Asian vs European Nasal / Cranial Complex",
    enabled: true,
    condition() {
        return (
            userSelections.noseType === "leptorrhine" &&
            ["straight", "convex"].includes(userSelections.nasalProfile) &&
            ["dolichocephalic","sub-dolichocephalic", "mesocephalic"].includes(userSelections.cephalicIndex) &&
            ["leptoprosopic", "hyperleptoprosopic"].includes(userSelections.facialIndex)
        );
    },
    effects: [
        { type: "eastAsian",  value: -7 },
        { type: "northAsian", value: -7 },
        { type: "malay",      value: -6 }
    ]
},
{
    id: "macro_contradiction_european_004",
    name: "European vs Armenoid / Near Eastern Nasal Complex",
    enabled: true,
    condition() {
        return (
            userSelections.nasalProfile === "convex" &&
            userSelections.nasalBridgeHeight === "high"
        );
    },
    effects: [
        { type: "nordic",     value: -6 },
        { type: "eastBaltic", value: -6 },
        { type: "ladogan",    value: -6 },
        { type: "slavic",     value: -5 },
        { type: "alpine",     value: -6 }
    ]
},

// ============================================================
// INTRA-EUROPEAN CONTRADICTIONS
// ============================================================

// Nordic ↔ East Baltic
{
    id: "contradiction_nordic_001",
    name: "Nordic vs East Baltic — Brachycephalic & Broad Face",
    enabled: true,
    condition() {
        return (
            ["brachycephalic", "hyperbrachycephalic"].includes(userSelections.cephalicIndex) &&
            ["hypereuryprosopic", "euryprosopic"].includes(userSelections.facialIndex)
        );
    },
    effects: [
        { type: "nordic", value: -8 }
    ]
},
{
    id: "contradiction_eastBaltic_001",
    name: "East Baltic vs Nordic — Dolichocephalic & Leptorrhine",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "dolichocephalic" &&
            userSelections.noseType === "leptorrhine"
        );
    },
    effects: [
        { type: "eastBaltic", value: -8 }
    ]
},

// East Baltic ↔ Ladogan
{
    id: "contradiction_eastBaltic_002",
    name: "East Baltic vs Ladogan — Rounded Occiput & Upturned Tip",
    enabled: true,
    condition() {
        return (
            userSelections.occipitalContour === "rounded" &&
            userSelections.nasalTipMorphology === "upturned"
        );
    },
    effects: [
        { type: "eastBaltic", value: -6 }
    ]
},
{
    id: "contradiction_ladogan_001",
    name: "Ladogan vs East Baltic — Very High Cheeks & Mesoprosopic",
    enabled: true,
    condition() {
        return (
            userSelections.cheekbones === "veryHigh" &&
            userSelections.facialIndex === "mesoprosopic"
        );
    },
    effects: [
        { type: "ladogan", value: -6 }
    ]
},

// Nordic ↔ Slavic
{
    id: "contradiction_nordic_002",
    name: "Nordic vs Slavic — Mesorrhine & Mesocephalic",
    enabled: true,
    condition() {
        return (
            userSelections.noseType === "mesorrhine" &&
            ["mesocephalic", "brachycephalic","sub-brachycephalic"].includes(userSelections.cephalicIndex)
        );
    },
    effects: [
        { type: "nordic", value: -6 }
    ]
},
{
    id: "contradiction_slavic_002",
    name: "Slavic vs Nordic — Dolichocephalic & Leptorrhine",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "dolichocephalic" &&
            userSelections.noseType === "leptorrhine"
        );
    },
    effects: [
        { type: "slavic", value: -6 }
    ]
},

// Nordic ↔ Dinaric
{
    id: "contradiction_nordic_003",
    name: "Nordic vs Dinaric — Flat Occiput & Convex Nose",
    enabled: true,
    condition() {
        return (
            userSelections.occipitalContour === "flat" &&
            userSelections.nasalProfile === "convex"
        );
    },
    effects: [
        { type: "nordic", value: -8 }
    ]
},
{
    id: "contradiction_dinaric_001",
    name: "Dinaric vs Nordic — Dolichocephalic & Straight Profile",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "dolichocephalic" &&
            userSelections.nasalProfile === "straight"
        );
    },
    effects: [
        { type: "dinaric", value: -7 }
    ]
},

// Alpine ↔ Slavic
{
    id: "contradiction_slavic_003",
    name: "Slavic vs Alpine — Rounded Occiput & Concave Nose",
    enabled: true,
    condition() {
        return (
            userSelections.occipitalContour === "rounded" &&
            userSelections.nasalProfile === "concave"
        );
    },
    effects: [
        { type: "slavic", value: -7 }
    ]
},
{
    id: "contradiction_alpine_001",
    name: "Alpine vs Slavic — High Cheekbones & Mesorrhine",
    enabled: true,
    condition() {
        return (
            ["high", "veryHigh"].includes(userSelections.cheekbones) &&
            userSelections.noseType === "mesorrhine"
        );
    },
    effects: [
        { type: "alpine", value: -11 }
    ]
},

// Alpine ↔ Dinaric
{
    id: "contradiction_alpine_002",
    name: "Alpine vs Dinaric — Flat Occiput & Convex Nose",
    enabled: true,
    condition() {
        return (
            userSelections.occipitalContour === "flat" &&
            userSelections.nasalProfile === "convex"
        );
    },
    effects: [
        { type: "alpine", value: -8 }
    ]
},
{
    id: "contradiction_dinaric_002",
    name: "Dinaric vs Alpine — Rounded Occiput & Concave Nose",
    enabled: true,
    condition() {
        return (
            userSelections.occipitalContour === "rounded" &&
            userSelections.nasalProfile === "concave"
        );
    },
    effects: [
        { type: "dinaric", value: -8 }
    ]
},

// Southern Slavic ↔ Alpine (key inter-subtype distinction)
{
    id: "contradiction_ponticSlavic_vs_alpine_001",
    name: "Southern Slavic vs Alpine — Mesocephalic & Convex Profile",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "mesocephalic" &&
            userSelections.nasalProfile === "convex" &&
            ["typeII", "typeIII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "alpine",         value: -7 },
        { type: "northernSlavic", value: -4 },
        { type: "centralSlavic",  value: -4 }
    ]
},
{
    id: "contradiction_alpine_vs_ponticSlavic_001",
    name: "Alpine vs Southern Slavic — Round Face & Concave Nose",
    enabled: true,
    condition() {
        return (
            userSelections.faceShape === "round" &&
            userSelections.nasalProfile === "concave" &&
            ["typeIII", "typeIV"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "ponticSlavic", value: -7 }
    ]
},

// Mediterranean ↔ Near Eastern
{
    id: "contradiction_mediterranean_001",
    name: "Mediterranean vs Near Eastern — Convex & High Bridge",
    enabled: true,
    condition() {
        return (
            userSelections.nasalProfile === "convex" &&
            userSelections.nasalBridgeHeight === "high"
        );
    },
    effects: [
    { type: "westernMediterranean", value: -2 },
    { type: "centralMediterranean", value: -1 }
]
},

// Dinaric ↔ Armenoid
{
    id: "contradiction_armenoid_vs_dinaric_001",
    name: "Armenoid vs Dinaric — Dolichocephalic & Projecting Occiput",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "dolichocephalic" &&
            userSelections.occipitalContour === "projecting"
        );
    },
    effects: [
        { type: "armenoid", value: -8 }
    ]
},
{
    id: "contradiction_dinaric_vs_armenoid_001",
    name: "Dinaric vs Armenoid — Rounded Occiput & Dolichocephalic",
    enabled: true,
    condition() {
        return (
            userSelections.occipitalContour === "rounded" &&
            userSelections.nasalProfile === "convex" &&
            userSelections.cephalicIndex === "dolichocephalic"
        );
    },
    effects: [
        { type: "dinaric", value: -7 }
    ]
},

// Irano-Afghan ↔ Armenoid
{
    id: "contradiction_iranoAfghan_vs_armenoid_001",
    name: "Irano-Afghan vs Armenoid — Brachycephalic & Flat Occiput",
    enabled: true,
    condition() {
        return (
            ["brachycephalic", "hyperbrachycephalic"].includes(userSelections.cephalicIndex) &&
            userSelections.occipitalContour === "flat"
        );
    },
    effects: [
        { type: "iranoAfghan", value: -8 }
    ]
},
{
    id: "contradiction_armenoid_vs_iranoAfghan_001",
    name: "Armenoid vs Irano-Afghan — Dolichocephalic & Tall",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "dolichocephalic" &&
            ["tall", "veryTall"].includes(userSelections.height)
        );
    },
    effects: [
        { type: "armenoid", value: -7 }
    ]
},

// ============================================================
// INTRA-ASIAN CONTRADICTIONS
// ============================================================

// East Asian ↔ North Asian
{
    id: "contradiction_eastAsian_001",
    name: "East Asian vs North Asian — Hyperbrachy & Very Broad",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "hyperbrachycephalic" &&
            userSelections.faceShape === "veryBroad"
        );
    },
    effects: [
        { type: "eastAsian", value: -3 }
    ]
},
{
    id: "contradiction_northAsian_001",
    name: "North Asian vs East Asian — Moderate Epicanthus & Broad",
    enabled: true,
    condition() {
        return (
            userSelections.epicanthus === "moderate" &&
            userSelections.faceShape === "broad"
        );
    },
    effects: [
        { type: "northAsian", value: -3 }
    ]
},

// East Asian ↔ Malay
{
    id: "contradiction_eastAsian_002",
    name: "East Asian vs Malay — Mesorrhine & Wavy Hair",
    enabled: true,
    condition() {
        return (
            userSelections.noseType === "mesorrhine" &&
            userSelections.hairForm === "wavy"
        );
    },
    effects: [
        { type: "eastAsian",  value: -7 },
        { type: "northAsian", value: -8 }
    ]
},
{
    id: "contradiction_malay_001",
    name: "Malay vs East Asian — Strong Epicanthus & Horizontal",
    enabled: true,
    condition() {
        return (
            userSelections.epicanthus === "strong" &&
            userSelections.eyeShape === "horizontal"
        );
    },
    effects: [
        { type: "malay", value: -8 }
    ]
},

// Malay ↔ Amerindian
{
    id: "contradiction_malay_002",
    name: "Malay vs Amerindian — Mesorrhine & Orthognathous",
    enabled: true,
    condition() {
        return (
            userSelections.noseType === "mesorrhine" &&
            userSelections.prognathism === "orthognathous"
        );
    },
    effects: [
        { type: "malay", value: -7 }
    ]
},
{
    id: "contradiction_amerindian_001",
    name: "Amerindian vs Malay — Wavy Hair & Mesognathous",
    enabled: true,
    condition() {
        return (
            userSelections.hairForm === "wavy" &&
            userSelections.prognathism === "mesognathous"
        );
    },
    effects: [
        { type: "amerindian", value: -7 }
    ]
},

// Amerindian ↔ Asian
{
    id: "contradiction_amerindian_002",
    name: "Amerindian vs East Asian — Strong Epicanthus & Horizontal",
    enabled: true,
    condition() {
        return (
            userSelections.epicanthus === "strong" &&
            userSelections.eyeShape === "horizontal"
        );
    },
    effects: [
        { type: "amerindian", value: -8 }
    ]
},
{
    id: "contradiction_amerindian_003",
    name: "Amerindian vs North Asian — Hyperbrachy & Strong Epicanthus",
    enabled: true,
    condition() {
        return (
            userSelections.cephalicIndex === "hyperbrachycephalic" &&
            userSelections.epicanthus === "strong"
        );
    },
    effects: [
        { type: "amerindian", value: -8 }
    ]
},
{
    id: "contradiction_eastAsian_003",
    name: "East Asian vs Amerindian — Mesorrhine & Orthognathous",
    enabled: true,
    condition() {
        return (
            userSelections.noseType === "mesorrhine" &&
            userSelections.prognathism === "orthognathous"
        );
    },
    effects: [
        { type: "eastAsian",  value: -6 },
        { type: "northAsian", value: -7 }
    ]
},

// ============================================================
// AFRICAN INTRA-GROUP CONTRADICTIONS
// ============================================================

{
    id: "contradiction_ethiopian_001",
    name: "Ethiopian vs Sub-Saharan — Platyrrhine & Prognathous",
    enabled: true,
    condition() {
        return (
            userSelections.noseType === "platyrrhine" &&
            userSelections.prognathism === "prognathous"
        );
    },
    effects: [
        { type: "ethiopian", value: -9 }
    ]
},
{
    id: "contradiction_african_001",
    name: "Sub-Saharan vs Ethiopian — Leptorrhine & High Bridge",
    enabled: true,
    condition() {
        return (
            userSelections.noseType === "leptorrhine" &&
            userSelections.nasalBridgeHeight === "high"
        );
    },
    effects: [
        { type: "subSaharan", value: -9 }
    ]
},

    ],  // end contradictions

    exclusions: [

{
    id: "exclusion_macro_european_001",
    name: "European Impossible Phenotype",
    enabled: true,
    condition() {
        return (
            ["typeV", "typeVI"].includes(userSelections.skinColor) &&
            userSelections.hairForm === "tightlyCurled" &&
            userSelections.noseType === "platyrrhine" &&
            userSelections.prognathism === "prognathous" &&
            userSelections.lipFullness === "veryThick"
        );
    },
    effects: [
        { type: "nordic",        value: -35 },
        { type: "eastBaltic",    value: -35 },
        { type: "ladogan",       value: -35 },
        { type: "slavic",        value: -35 },
        { type: "alpine",        value: -35 },
        { type: "dinaric",       value: -35 },
        { type: "mediterranean", value: -35 },
        { type: "nearEastern",   value: -35 }
    ]
},
{
    id: "exclusion_asian_001",
    name: "Asian Impossible Phenotype",
    enabled: true,
    condition() {
        return (
            ["typeI", "typeII"].includes(userSelections.skinColor) &&
            ["veryLightBlue", "lightBlue"].includes(userSelections.eyeColor) &&
            ["platinumBlonde", "lightBlonde"].includes(userSelections.hairColor) &&
            userSelections.noseType === "leptorrhine" &&
            userSelections.nasalProfile === "straight" &&
            userSelections.epicanthus === "absent"
        );
    },
    effects: [
        { type: "eastAsian",    value: -35 },
        { type: "northAsian",   value: -35 },
        { type: "centralAsian", value: -35 },
        { type: "malay",        value: -35 }
    ]
},
{
    id: "exclusion_african_001",
    name: "African Impossible Phenotype",
    enabled: true,
    condition() {
        return (
            ["typeI", "typeII"].includes(userSelections.skinColor) &&
            ["veryLightBlue", "lightBlue"].includes(userSelections.eyeColor) &&
            ["platinumBlonde", "lightBlonde"].includes(userSelections.hairColor) &&
            userSelections.noseType === "leptorrhine" &&
            userSelections.nasalBridgeHeight === "high" &&
            userSelections.prognathism === "orthognathous"
        );
    },
    effects: [
        { type: "ethiopian", value: -35 },
        { type: "subSaharan",   value: -35 }
    ]
},
{
    id: "exclusion_nearEastern_001",
    name: "Near Eastern Impossible Phenotype",
    enabled: true,
    condition() {
        return (
            userSelections.noseType === "platyrrhine" &&
            userSelections.prognathism === "prognathous" &&
            userSelections.hairForm === "tightlyCurled"
        );
    },
    effects: [
        { type: "nearEastern", value: -35 }
    ]
},

    ],  // end exclusions

    modifiers: [

    ],

    macros: [

{
    id: "macro_european_001",
    name: "General European",
    enabled: true,
    condition() {
        return (
            userSelections.epicanthus === "absent" &&
            ["leptorrhine", "mesorrhine"].includes(userSelections.noseType) &&
            ["typeI", "typeII", "typeIII", "typeIV"].includes(userSelections.skinColor) &&
            ["veryLightBlue", "lightBlue", "grey", "greyGreen", "green", "hazel", "lightBrown", "mediumBrown", "darkBrown"].includes(userSelections.eyeColor) &&
            ["straight", "wavy", "curly"].includes(userSelections.hairForm)
        );
    },
    effects: [
        { type: "nordic",        value: 2 },
        { type: "ladogan",       value: 2 },
        { type: "eastBaltic",    value: 2 },
        { type: "slavic",        value: 2 },
        { type: "alpine",        value: 2 },
        { type: "dinaric",       value: 2 },
        { type: "mediterranean", value: 2 },
        { type: "nearEastern",   value: 1 },
        { type: "eastAsian",     value: -1 },
        { type: "northAsian",    value: -1 },
        { type: "subSaharan",       value: -1 },
        { type: "ethiopian",     value: -1 }
    ]
},
{
    id: "macro_asian_morphology_001",
    name: "General East Asian Morphology",
    enabled: true,
    condition() {
        return (
            ["strong", "moderate"].includes(userSelections.epicanthus) &&
            userSelections.hairForm === "straight" &&
            ["high", "veryHigh"].includes(userSelections.cheekbones)
        );
    },
    effects: [
        { type: "eastAsian",  value: 2 },
        { type: "northAsian", value: 2 }
    ]
},
{
    id: "macro_african_001",
    name: "General African Morphology",
    enabled: true,
    condition() {
        return (
            ["typeV", "typeVI"].includes(userSelections.skinColor) &&
            ["curly", "tightlyCurled"].includes(userSelections.hairForm) &&
            ["platyrrhine", "mesorrhine"].includes(userSelections.noseType)
        );
    },
    effects: [
        { type: "subSaharan",   value: 2 },
        { type: "ethiopian", value: 1 }
    ]
},
{
    id: "macro_amerindian_001",
    name: "General Amerindian Morphology",
    enabled: true,
    condition() {
        return (
            userSelections.hairForm === "straight" &&
            userSelections.hairColor === "black" &&
            ["high", "veryHigh"].includes(userSelections.cheekbones) &&
            userSelections.epicanthus === "absent"
        );
    },
    effects: [
        { type: "amerindian", value: 2 }
    ]
},
{
    id: "macro_nearEastern_001",
    name: "General Near Eastern",
    enabled: true,
    condition() {
        return (
            userSelections.nasalProfile === "convex" &&
            userSelections.nasalBridgeHeight === "high" &&
            ["typeIII", "typeIV"].includes(userSelections.skinColor) &&
            userSelections.epicanthus === "absent"
        );
    },
    effects: [
        { type: "nearEastern", value: 2 },
        { type: "dinaric",     value: 1 }
    ]
},
{
    id: "morphology_southEuropean_001",
    name: "Southern European — Mesocephalic & Straight Nose",
    enabled: true,
    condition() {
        return (
            ["mesocephalic", "sub-brachycephalic"].includes(userSelections.cephalicIndex) &&
            ["leptoprosopic", "mesoprosopic"].includes(userSelections.facialIndex) &&
            userSelections.nasalProfile === "straight" &&
            ["typeII", "typeIII"].includes(userSelections.skinColor) &&
            userSelections.epicanthus === "absent"

        );
    },
    effects: [
        { type: "ponticSlavic", value: 3 },
    { type: "centralMediterranean", value: 3 },
    { type: "easternMediterranean", value: 1 },
    { type: "southernMediterranean", value: 2 },
    { type: "westernMediterranean", value: 1 },
    { type: "dinaric", value: 2 },
        { type: "northernSlavic", value: -4 },
        { type: "centralSlavic", value: -3 }
    ]
},
{
    id: "pigmentation_southEuropean_001",
    name: "Southern European — Brown Hair & Mixed Eyes",
    enabled: true,
    condition() {
        return (
            ["hazel", "lightBrown", "mediumBrown","darkBrown"].includes(userSelections.eyeColor) &&
            ["brown", "darkBrown"].includes(userSelections.hairColor) &&
            ["typeII", "typeIII"].includes(userSelections.skinColor)
        );
    },
    effects: [
        { type: "ponticSlavic", value: +3 },
        { type: "centralMediterranean", value: +3 },
        { type: "easternMediterranean", value: +3 },
        { type: "southernMediterranean", value: +2 },
        { type: "dinaric", value: 3 },
        { type: "northernSlavic", value: -3 }
    ]
},

{
    id: "composite_southEuropean_001",
    name: "Southern European Composite Core",
    enabled: true,
    condition() {
        return (
            ["mesocephalic", "sub-brachycephalic"].includes(userSelections.cephalicIndex) &&
            ["leptoprosopic", "mesoprosopic"].includes(userSelections.facialIndex) &&
            userSelections.nasalProfile === "straight" &&
            ["hazel", "lightBrown", "mediumBrown","darkBrown"].includes(userSelections.eyeColor) &&
            ["brown", "darkBrown"].includes(userSelections.hairColor) &&
            ["typeII", "typeIII"].includes(userSelections.skinColor) &&
            userSelections.epicanthus === "absent"
        );
    },
    effects: [
        { type: "ponticSlavic", value: 13 },
        { type: "centralMediterranean", value: 10 },
        { type: "easternMediterranean", value: 10 },
        { type: "southernMediterranean", value: 10 },
        { type: "westernMediterranean", value: 4 },
        { type: "dinaric", value: 5 },
        { type: "levantine", value: 3 },
        { type: "iranoAfghan", value: 2 },
        { type: "northernSlavic", value: -5 },
        { type: "centralSlavic", value: -4 }
    ]
},
    ]

};
