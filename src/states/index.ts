import { atom } from "recoil";

export const focusedGoalIdAtom = atom<number | null>({
  key: "focusedGoalId",
  default: null,
});

export type DisplayMode = "calendar" | "normal";
export const displayModeAtom = atom<DisplayMode | null>({
  key: "displayMode",
  default: null,
});
