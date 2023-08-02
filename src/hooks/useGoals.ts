import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { tables } from "../constants/tables";
import { queryItems } from "../db/index";
import { focusedGoalAtom } from "../states/index";
import { useDB } from "./useDB";

export const goalsQueryKey = "goals";

export function useGoals() {
  const db = useDB();
  const setFocusedGoal = useSetRecoilState(focusedGoalAtom);

  return useQuery(
    [goalsQueryKey],
    async () => {
      const result = await queryItems(db!, `SELECT * FROM ${tables.goals}`);
      if (!result || result.length <= 0) {
        return [];
      }

      setFocusedGoal(result[0]);
      return result;
    },
    { enabled: db != null }
  );
}
