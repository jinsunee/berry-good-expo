import { useNavigation } from "@react-navigation/native";
import { HomeStackNavigationType } from "components/navigators/HomeStackNavigator";
import { useGoalItems } from "hooks/useGoalItems";
import { useGoals } from "hooks/useGoals";
import useIsOpen from "hooks/useIsOpen";
import { Pressable, Text } from "react-native";
import styled from "styled-components/native";

export default function Page() {
  const { data } = useGoals();
  const { data: goalItems } = useGoalItems();
  const { isOpen, toggle } = useIsOpen();
  const { navigate } = useNavigation<HomeStackNavigationType>();
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
      <Pressable onPress={() => navigate("GoalList")} style={{ padding: 10 }}>
        <Text>Home</Text>
      </Pressable>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
