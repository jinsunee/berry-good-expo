import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { tables } from "../constants/tables";
import { queryItems } from "../db/index";
import { focusedGoalIdAtom } from "../states";
import { useDB } from "./useDB";

export const goalsQueryKey = "goals";

export function useGoals() {
  const db = useDB();
  const setFocusedGoalId = useSetRecoilState(focusedGoalIdAtom);

  return useQuery(
    [goalsQueryKey],
    async () => {
      const result = await queryItems(db!, `SELECT * FROM ${tables.goals}`);
      if (!result || result.length <= 0) {
        return [];
      }

      setFocusedGoalId(result[0].id);
      return result;
    },
    { enabled: db != null }
  );
}
