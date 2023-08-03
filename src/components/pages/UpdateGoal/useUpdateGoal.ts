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

export function useUpdateGoal() {
  const db = useDB();
  const setFocusedGoal = useSetRecoilState(focusedGoalAtom);

  return useMutation(
    async ({ id, title, startAt, endAt }: Goal) => {
      const result = await mutateItem(
        db!,
        `UPDATE ${tables.goals} SET title = ?, startAt = ?, endAt = ? WHERE id = ?`,
        [
          title,
          moment(startAt).format("YYYY-MM-DD"),
          moment(endAt).format("YYYY-MM-DD"),
          id,
        ]
      );

      return {
        id: result[0],
        title: result[1],
        startAt: result[2],
        endAt: result[3],
      };
    },
    {
      onSuccess: (result: Goal) => {
        queryClient.invalidateQueries([goalsQueryKey]);
        // queryClient.setQueryData<Goal[]>([goalsQueryKey], (prev) => [
        //   ...(prev ?? []),
        //   result,
        // ]);
      },
    }
  );
}
