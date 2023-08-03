import { useMutation } from "@tanstack/react-query";
import { queryClient } from "components/providers/ReactQueryProvider";
import { useDB } from "hooks/useDB";
import { goalsQueryKey } from "hooks/useGoals";
import moment from "moment";
import { useSetRecoilState } from "recoil";
import { tables } from "../../../constants/tables";
import { mutateItem } from "../../../db";
import { focusedGoalAtom } from "../../../states";
import { Goal } from "../../../types/goal";

export function useAddGoal() {
  const db = useDB();
  const setFocusedGoal = useSetRecoilState(focusedGoalAtom);

  return useMutation(
    async ({ title, startAt, endAt }: Omit<Goal, "id">) => {
      const result = await mutateItem(
        db!,
        `INSERT INTO ${tables.goals} (title, startAt, endAt) VALUES (?,?,?);`,
        [
          title,
          moment(startAt).format("YYYY-MM-DD"),
          moment(endAt).format("YYYY-MM-DD"),
        ]
      );

      return {
        id: result.id,
        title: result[0],
        startAt: result[1],
        endAt: result[2],
      };
    },
    {
      onSuccess: (result: Goal) => {
        setFocusedGoal(result);
        queryClient.setQueryData<Goal[]>([goalsQueryKey], (prev) => [
          ...(prev ?? []),
          result,
        ]);
      },
    }
  );
}
