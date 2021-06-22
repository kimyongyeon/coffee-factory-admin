import { atom, useRecoilState } from "recoil";

export type TPoint = {
  id?: string;
  pointId: string;
  score: number;
  regDate: string;
  userId: string;
};

const pointState = atom<TPoint | null>({
  key: "pointState",
  default: null,
});

export function usePointState() {
  return useRecoilState(pointState);
}
