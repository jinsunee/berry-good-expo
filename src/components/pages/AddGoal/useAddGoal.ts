import { useMutation } from "@tanstack/react-query";
import { queryClient } from "components/providers/ReactQueryProvider";
import { useDB } from "hooks/useDB";
import { goalsQueryKey } from "hooks/useGoals";
import moment from "moment";
import { useSetRecoilState } from "recoil";
import { tables } from "../../../constants/tables";
import { mutateItem } from "../../../db";
import { focusedGoalIdAtom } from "../../../states";
import { Goal } from "../../../types/goal";

export function useAddGoal() {
  const db = useDB();
  const setFocusedGoalId = useSetRecoilState(focusedGoalIdAtom);

  return useMutation(
    async ({ title, startAt, endAt }: Omit<Goal, "id">) => {
      const result = await mutateItem(
        db!,
        `INSERT INTO ${tables.goals} (title, startAt, endAt) VALUES (?,?,?);`,
        [
          title,
          moment(startAt).format("YYYY-MM-DD"),
          endAt ? moment(endAt).format("YYYY-MM-DD") : null,
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
        setFocusedGoalId(result.id);
        queryClient.setQueryData<Goal[]>([goalsQueryKey], (prev) => [
          ...(prev ?? []),
          result,
        ]);
      },
    }
  );
}
