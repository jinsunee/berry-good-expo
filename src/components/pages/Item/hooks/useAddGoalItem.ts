import { RouteProp, useRoute } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { HomeStackParamList } from "components/navigators/HomeStackNavigator";
import { queryClient } from "components/providers/ReactQueryProvider";
import { useDB } from "hooks/useDB";
import { useGoal } from "hooks/useGoal";
import { goalItemsQueryKey } from "hooks/useGoalItems";
import { tables } from "../../../../constants/tables";
import { mutateItem } from "../../../../db";
import { GoalItem } from "../../../../types/goal";

export function useAddGoalItem() {
  const db = useDB();
  const route = useRoute<RouteProp<HomeStackParamList, "Item">>();
  const { goal: focusedGoal } = useGoal();

  const goalId = focusedGoal?.id;
  const date = route.params?.date;

  return useMutation(
    async ({ point, memo }: Pick<GoalItem, "point" | "memo">) => {
      const result = await mutateItem(
        db!,
        `INSERT INTO ${tables.goalsItems} (goalId, date, point, memo) VALUES (?,?,?,?);`,
        [goalId, date, point, memo]
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([goalItemsQueryKey, goalId]);
      },
    }
  );
}
