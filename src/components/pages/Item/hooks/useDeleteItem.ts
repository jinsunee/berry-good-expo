import { useMutation } from "@tanstack/react-query";
import { queryClient } from "components/providers/ReactQueryProvider";
import { useDB } from "hooks/useDB";
import { goalItemsQueryKey } from "hooks/useGoalItems";
import { tables } from "../../../../constants/tables";
import { mutateItem } from "../../../../db";
import { GoalItem } from "../../../../types/goal";

export function useDeleteItem() {
  const db = useDB();

  return useMutation(
    async ({ id }: Pick<GoalItem, "id">) => {
      await mutateItem(db!, `DELETE FROM ${tables.goalsItems} WHERE id = ?`, [
        id,
      ]);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([goalItemsQueryKey]);
      },
    }
  );
}
