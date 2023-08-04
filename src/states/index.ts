import { atom } from "recoil";

export const focusedGoalIdAtom = atom<number | null>({
  key: "focusedGoalId",
  default: null,
});

export const displayModeAtom = atom<"calendar" | "normal">({
  key: "displayMode",
  default: "normal",
});
