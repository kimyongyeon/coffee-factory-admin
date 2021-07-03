import { atom, useRecoilState } from "recoil";

export type TBanner = {
    _id?: string;
    bannerId?: string;
    name?: string;
    imgUrl?: string;
    width?: number;
    height?: number;
    location?: string;
    useYn?: string;
    startDate?: string;
    endDate?: string;
    title?: string;
    description?: string;
    sort?: number;
    deployYn?: string;
};

const bannerState = atom<TBanner | null>({
    key: 'bannerState',
    default: null, 
})

export function useBannerState() {
    return useRecoilState(bannerState);
}
