import { RouteProp, useRoute } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { HomeStackParamList } from "components/navigators/HomeStackNavigator";
import { queryClient } from "components/providers/ReactQueryProvider";
import { useDB } from "hooks/useDB";
import { useGoalItem } from "hooks/useGoalItem";
import { goalItemsQueryKey } from "hooks/useGoalItems";
import { tables } from "../../../../constants/tables";
import { mutateItem } from "../../../../db";
import { GoalItem } from "../../../../types/goal";

export function useUpdateGoalItem() {
  const db = useDB();
  const route = useRoute<RouteProp<HomeStackParamList, "Item">>();
  const goalItem = useGoalItem({ date: route.params?.date });

  return useMutation(
    async ({ point, memo }: Pick<GoalItem, "point" | "memo">) => {
      await mutateItem(
        db!,
        `UPDATE ${tables.goalsItems} SET point = ?, memo = ? WHERE id = ?;`,
        [point, memo, goalItem!.id]
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([goalItemsQueryKey, goalItem?.goalId]);
      },
    }
  );
}
