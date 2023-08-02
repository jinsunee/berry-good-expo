import { useGoalItems } from "hooks/useGoalItems";
import { useGoals } from "hooks/useGoals";
import { Text } from "react-native";
import styled from "styled-components/native";

export default function Page() {
  const { data } = useGoals();
  const { data: goalItems } = useGoalItems();
  // const db = useDB();

  // useEffect(() => {
  //   (async () => {
  //     if (!db) return;
  //     await mutateItem(
  //       db!,
  //       `INSERT INTO ${tables.goalsItems} (goalId, date, point, memo) VALUES (?,?,?,?)`,
  //       [2, "2023-08-01", 2, "오늘도 잘했다 수고많았어 내 자신!"]
  //     );
  //   })();
  // }, []);

  return (
    <Container>
      <Text>Home</Text>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
