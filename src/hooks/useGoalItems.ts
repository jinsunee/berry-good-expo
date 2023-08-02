import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { tables } from "../constants/tables";
import { queryItems } from "../db/index";
import { focusedGoalAtom } from "../states";
import { useDB } from "./useDB";

export const goalItemsQueryKey = "goalsItems";

export function useGoalItems() {
  const db = useDB();
  const focusedGoal = useRecoilValue(focusedGoalAtom);

  return useQuery(
    [goalItemsQueryKey, focusedGoal],
    async () => {
      const result = await queryItems(
        db!,
        `SELECT * FROM ${tables.goalsItems} WHERE goalId = ${focusedGoal?.id}`
      );
      return result;
    },
    { enabled: db != null || focusedGoal != null }
  );
}