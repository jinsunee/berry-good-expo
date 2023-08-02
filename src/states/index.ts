import { atom } from "recoil";

export const focusedGoalIdAtom = atom<string | null>({
  key: "focusedGoalId",
  default: null,
});
