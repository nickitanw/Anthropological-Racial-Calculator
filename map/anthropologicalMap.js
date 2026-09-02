import { TYPE_REGIONS }
from './anthropologicalMapData.js';

export function renderAnthropologicalMap(
    scores,
    typeColors
) {

    const maxScore =
        Math.max(
            ...Object.values(scores)
        );

    Object.entries(scores)
        .forEach(([type, score]) => {

            const region =
                document.getElementById(
                    `${type}-region`
                );

            if (!region) return;

            region.style.fill =
                typeColors[type];

            region.style.fillOpacity =
                Math.max(
                    0.08,
                    score / maxScore
                );
        });
}


window.addEventListener(
    'message',
    e => {

        renderMap(
            e.data.scores,
            e.data.colors
        );

    }
);


const MAP_REGIONS = {

    nordic: [
        'Norway',
        'Sweden',
        'Denmark',
        'Iceland'
    ],

    ladogan: [
        'Karelia',
        'Ingria'
    ],

    eastBaltic: [
        'Estonia',
        'Latvia'
    ],

    slavic: [
        'Belarus',
        'Ukraine',
        'Russia'
    ],

    alpine: [
        'Switzerland',
        'Austria',
        'SouthGermany'
    ],

    dinaric: [
        'Croatia',
        'Bosnia',
        'Montenegro'
    ],

    mediterranean: [
        'Italy',
        'Spain',
        'Portugal'
    ],

    nearEastern: [
        'Armenia',
        'Georgia',
        'Turkey',
        'Syria'
    ],

    eastAsian: [
        'China',
        'Korea'
    ],

    mongolian: [
        'Mongolia'
    ],

    malay: [
        'Indonesia',
        'Malaysia'
    ],

    ethiopian: [
        'Ethiopia'
    ],

    subSaharanAfrican: [
        'WestAfrica',
        'CentralAfrica'
    ],

    amerindian: [
        'Andes',
        'Mesoamerica'
    ]
};