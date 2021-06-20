import { atom, useRecoilState } from "recoil"

export type TProduct = {
    _id?: string;
    productId?: string;
    name?: string;
    price?: string;
    volume?: string;
    size?: string;
    sort?: string;
    imgUrl?: string;
    useYn?: string;
    hotIceGb?: string;
    whippingYn?: string;
    shotYn?: string;
    category?: string;
}

const productState = atom<TProduct | null>({
    key: 'productState',
    default: null, 
})

export function useProductState() {
    return useRecoilState(productState);
}