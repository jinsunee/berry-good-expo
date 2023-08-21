import { useMemo } from "react";
import { Goal } from "types/goal";
import { useGoalItems } from "./useGoalItems";

export function useGoalItem({ date, goal }: { date: string; goal: Goal }) {
  const { data: goalItems } = useGoalItems({ goal });

  const goalItem = useMemo(() => goalItems?.[date], [goalItems, date]);

  return goalItem;
}
