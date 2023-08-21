import moment from "moment";
import { atom } from "recoil";

export const dateAtom = atom({
  key: "dateAtom",
  default: moment(),
});
