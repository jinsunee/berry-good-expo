import { useNavigation } from "@react-navigation/native";
import { HomeStackNavigationType } from "components/navigators/HomeStackNavigator";
import { Badge } from "components/shared/Badge";
import { useGoals } from "hooks/useGoals";
import { View } from "react-native";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";
import { focusedGoalAtom } from "../../../../states";
import { colors } from "../../../../utils/colors";

export default function Goal() {
  useGoals();
  const focusedGoal = useRecoilValue(focusedGoalAtom);
  const { navigate } = useNavigation<HomeStackNavigationType>();

  return (
    <GoalContainer onPress={() => navigate("GoalList")}>
      <Badge>목표</Badge>
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <GoalText>{focusedGoal?.title}</GoalText>
      </View>
    </GoalContainer>
  );
}

const GoalContainer = styled.Pressable`
  border-radius: 10px;
  background-color: ${colors.secondary[0]};
  padding: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 30px;
`;

const GoalText = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: ${colors.dark};
  margin-left: 10px;
`;
