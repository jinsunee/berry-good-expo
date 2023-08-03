import { useMutation } from "@tanstack/react-query";
import { queryClient } from "components/providers/ReactQueryProvider";
import { useDB } from "hooks/useDB";
import { goalsQueryKey } from "hooks/useGoals";
import { tables } from "../../../constants/tables";
import { mutateItem } from "../../../db";
import { Goal } from "../../../types/goal";

export function useDeleteGoal() {
  const db = useDB();

  return useMutation(
    async ({ id }: Pick<Goal, "id">) => {
      await mutateItem(db!, `DELETE FROM ${tables.goals} WHERE id = ?`, [id]);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([goalsQueryKey]);
      },
    }
  );
}
