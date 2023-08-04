import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { GoalItem } from "types/goal";
import { tables } from "../constants/tables";
import { queryItems } from "../db/index";
import { focusedGoalAtom } from "../states";
import { useDB } from "./useDB";

export const goalItemsQueryKey = "goalsItems";

export function useGoalItems() {
  const db = useDB();
  const focusedGoal = useRecoilValue(focusedGoalAtom);

  return useQuery(
    [goalItemsQueryKey, focusedGoal?.id],
    async () => {
      const result = await queryItems(
        db!,
        `SELECT * FROM ${tables.goalsItems} WHERE goalId = ${focusedGoal?.id}`
      );

      return result.reduce((acc, cur) => {
        return {
          ...acc,
          [cur.date]: cur,
        };
      }, {}) as Record<string, GoalItem>;
    },
    { enabled: db != null || focusedGoal != null }
  );
}
