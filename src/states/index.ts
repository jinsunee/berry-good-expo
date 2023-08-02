import { atom } from "recoil";
import { Goal } from "types/goal";

export const focusedGoalAtom = atom<Goal | null>({
  key: "focusedGoal",
  default: null,
});
