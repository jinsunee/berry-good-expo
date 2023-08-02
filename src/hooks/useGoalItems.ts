import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { tables } from "../constants/tables";
import { queryItems } from "../db/index";
import { focusedGoalIdAtom } from "../states";
import { useDB } from "./useDB";

export const goalItemsQueryKey = "goalsItems";

export function useGoalItems() {
  const db = useDB();
  const focusedGoalId = useRecoilValue(focusedGoalIdAtom);

  return useQuery(
    [goalItemsQueryKey, focusedGoalId],
    async () => {
      const result = await queryItems(
        db!,
        `SELECT * FROM ${tables.goalsItems} WHERE goalId = ${focusedGoalId}`
      );
      return result;
    },
    { enabled: db != null || focusedGoalId != null }
  );
}
