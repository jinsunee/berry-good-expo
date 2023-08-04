import { useMemo } from "react";
import { useGoalItems } from "./useGoalItems";

export function useGoalItem({ date }: { date: string }) {
  const { data: goalItems } = useGoalItems();

  const goalItem = useMemo(() => goalItems?.[date], [goalItems, date]);

  return goalItem;
}
