import { atom, useRecoilState } from "recoil";

export type User = {
    user_id?: string;
    password?:	string;
};

const userState = atom<User | null>({
    key: 'userState',
    default: null, 
})

export function useUserState() {
    return useRecoilState(userState);//아톰을 사용하려면 useRecoilState사용
}