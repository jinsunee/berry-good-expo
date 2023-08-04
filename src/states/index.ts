import { atom } from "recoil";

export const focusedGoalIdAtom = atom<number | null>({
  key: "focusedGoalId",
  default: null,
});
