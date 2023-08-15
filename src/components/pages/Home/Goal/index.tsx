import { useNavigation } from "@react-navigation/native";
import TapeSvg from "assets/svgs/tape.svg";
import { HomeStackNavigationType } from "components/navigators/HomeStackNavigator";
import { useGoal } from "hooks/useGoal";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../../utils/colors";

export default function Goal() {
  const { goal: focusedGoal } = useGoal();
  const { navigate } = useNavigation<HomeStackNavigationType>();

  return (
    <GoalContainer onPress={() => navigate("GoalList")}>
      <TapeSvg style={{ position: "absolute", top: -20, left: "50%" }} />
      <View style={{ display: "flex", gap: 10 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            gap: 3,
          }}
        >
          <DateText>10일차</DateText>
          <Text style={{ marginBottom: 2 }}>/ 30일</Text>
        </View>

        <GoalText>{focusedGoal?.title}</GoalText>
      </View>
    </GoalContainer>
  );
}

const GoalContainer = styled.Pressable`
  border: 1px solid ${colors.secondary[1]};
  padding: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 30px;
  position: relative;
`;

const DateText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${colors.dark};
`;

const GoalText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.dark};
`;
