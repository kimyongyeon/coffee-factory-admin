import { atom, useRecoilState } from "recoil";

export type TOrder = {
    id?: string;
    userId?: string;
    productId?: string;
    orderStartDate?: string;
    orderEndDate?: string;
    state?: string;
};

const orderState = atom<TOrder | null>({
    key: 'orderState',
    default: null, 
})

export function useOrderState() {
    return useRecoilState(orderState);
}