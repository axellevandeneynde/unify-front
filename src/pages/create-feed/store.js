import { atom } from 'recoil';

export const progressAtom = atom({
    key: 'progress',
    default: 0,
});

//location 

export const locationsAtom = atom({
    key: 'allLocations',
    default: [],
});

export const selectedLocationsAtom = atom({
    key: 'selectedLocations',
    default: [],
});

//Categories
export const categoriesAtom = atom({
    key: 'allCategories',
    default: [],
});

export const selectedCategoriesAtom = atom({
    key: 'selectedCategories',
    default: [],
});

//Sources
export const relevantSourcesAtom = atom({
    key: 'relevantSources',
    default: [],
});

export const selectedSourcesAtom = atom({
    key: 'selectedSources',
    default: [],
});

export const updateFeedIdAtom = atom({
    key: 'updateFeedId',
    default: null,
});
