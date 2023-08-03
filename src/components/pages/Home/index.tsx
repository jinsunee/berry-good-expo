import { useNavigation } from "@react-navigation/native";
import PlusSvg from "assets/svgs/plus.svg";
import { HomeStackNavigationType } from "components/navigators/HomeStackNavigator";
import { useGoalItems } from "hooks/useGoalItems";
import { useGoals } from "hooks/useGoals";
import useIsOpen from "hooks/useIsOpen";
import styled from "styled-components/native";
import { colors } from "../../../utils/colors";

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
      <PlusButton onPress={() => navigate("AddGoal")}>
        <PlusSvg fill={colors.dark} />
      </PlusButton>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  display: flex;
  flex: 1;
  margin: 20px;
`;

const PlusButton = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 58px;
  height: 35px;
  align-self: flex-end;
  background-color: ${colors.primary};
  border-radius: 20px;
`;
