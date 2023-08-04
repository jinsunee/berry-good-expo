import { useMutation } from "@tanstack/react-query";
import { queryClient } from "components/providers/ReactQueryProvider";
import { useDB } from "hooks/useDB";
import { goalsQueryKey } from "hooks/useGoals";
import moment from "moment";
import { tables } from "../../../constants/tables";
import { mutateItem } from "../../../db";
import { Goal } from "../../../types/goal";

export function useUpdateGoal() {
  const db = useDB();

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
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([goalsQueryKey]);
      },
    }
  );
}
