import { useQuery } from "@tanstack/react-query";
import { tables } from "../constants/tables";
import { queryItems } from "../db/index";
import { Goal, GoalItem } from "../types/goal";
import { useDB } from "./useDB";

export const goalItemsQueryKey = "goalsItems";

export function useGoalItems({ goal }: { goal?: Goal | null }) {
  const db = useDB();

  return useQuery(
    [goalItemsQueryKey, goal?.id],
    async () => {
      const result = await queryItems(
        db!,
        `SELECT * FROM ${tables.goalsItems} WHERE goalId = ${goal?.id}`
      );

      return result.reduce((acc, cur) => {
        return {
          ...acc,
          [cur.date]: cur,
        };
      }, {}) as Record<string, GoalItem>;
    },
    { enabled: db != null || goal != null }
  );
}
