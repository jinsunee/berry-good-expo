import { useMutation } from "@tanstack/react-query";
import { queryClient } from "components/providers/ReactQueryProvider";
import { useDB } from "hooks/useDB";
import { goalsQueryKey } from "hooks/useGoals";
import moment from "moment";
import { tables } from "../../../constants/tables";
import { mutateItem } from "../../../db";

export function useAddGoal() {
  const db = useDB();

  return useMutation(
    async ({
      goal,
      startAt,
      endAt,
    }: {
      goal: string;
      startAt: Date;
      endAt: Date;
    }) => {
      await mutateItem(
        db!,
        `INSERT INTO ${tables.goals} (title, startAt, endAt) VALUES (?,?,?);`,
        [
          goal,
          moment(startAt).format("YYYY-MM-DD"),
          moment(endAt).format("YYYY-MM-DD"),
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
