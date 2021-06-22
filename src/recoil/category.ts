import { atom, useRecoilState } from "recoil";

export type TCategory = {
  id?: string;
  code: string;
  codeName: string;
  type: string;
  useYn: string;
};

const categoryState = atom<TCategory | null>({
  key: "categoryState",
  default: null,
});

export function useCategoryState() {
  return useRecoilState(categoryState);
}
