import { atom } from 'recoil';

export const navBackBtnAtom = atom({
    key: 'navBackBtn',
    default: false,
});

export const userFeedsAtom = atom({
    key: 'userFeeds',
    default: [],
});