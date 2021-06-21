import { atom, useRecoilState } from "recoil";

export type TMenu = {
    id?: string;
    menuId?:	string;
    menuName?:	string;
    useYn?:	string;
    menuCheck?:	string;
};

const menuState = atom<TMenu | null>({
    key: 'menuState',
    default: null, 
})

export function useMenuState() {
    return useRecoilState(menuState);
}