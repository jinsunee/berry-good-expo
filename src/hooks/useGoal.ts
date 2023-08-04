import { useCallback, useMemo } from "react";
import { useRecoilState } from "recoil";
import { focusedGoalIdAtom } from "../states";
import { useGoals } from "./useGoals";

export function useGoal() {
  const { data: goals } = useGoals();
  const [focusedGoalId, setFocusedGoalId] = useRecoilState(focusedGoalIdAtom);

  const goal = useMemo(
    () => goals?.find((goal) => goal.id === focusedGoalId) ?? null,
    [goals, focusedGoalId]
  );
  const setGoal = useCallback(
    (id: number) => {
      setFocusedGoalId(id);
    },
    [setFocusedGoalId]
  );

  return { goal, setGoal };
}
