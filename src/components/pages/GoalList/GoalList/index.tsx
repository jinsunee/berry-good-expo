import { useNavigation } from "@react-navigation/native";
import EditSvg from "assets/svgs/edit.svg";
import { HomeStackNavigationType } from "components/navigators/HomeStackNavigator";
import { Stack } from "components/shared/Stack";
import { useGoal } from "hooks/useGoal";
import { useGoals } from "hooks/useGoals";
import { View } from "react-native";
import styled from "styled-components/native";
import { Goal } from "../../../../types/goal";
import { colors } from "../../../../utils/colors";

export function GoalList() {
  const { data: goals } = useGoals();
  const { goal: focusedGoal, setGoal } = useGoal();
  const { navigate, goBack } = useNavigation<HomeStackNavigationType>();

  return (
    <Stack spacing={10}>
      {goals?.map((goal) => (
        <GoalItem
          key={goal.id}
          {...goal}
          isFocused={focusedGoal?.id === goal.id}
          onPressItem={() => {
            setGoal(goal.id);
            goBack();
          }}
          onPressEdit={() => navigate("UpdateGoal", { id: goal.id })}
        />
      ))}
    </Stack>
  );
}

function GoalItem({
  title,
  startAt,
  endAt,
  isFocused,
  onPressItem,
  onPressEdit,
}: {
  id: number;
  isFocused?: boolean;
  onPressItem: () => void;
  onPressEdit: () => void;
} & Goal) {
  return (
    <>
      {isFocused && (
        <FocusedGoalItem>
          <View
            style={{
              flex: 1,
              paddingRight: 5,
            }}
          >
            <Title style={{ flexWrap: "wrap" }}>{title}</Title>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
                marginTop: 3,
              }}
            >
              <Date>{startAt.toString()}</Date>
              {!endAt && <Date>부터 시작</Date>}
              {endAt && (
                <>
                  <Date>-</Date>
                  <Date>{endAt.toString()}</Date>
                </>
              )}
            </View>
          </View>
          <UpdateButton onPress={onPressEdit}>
            <EditSvg />
          </UpdateButton>
        </FocusedGoalItem>
      )}
      {!isFocused && (
        <NormalGoalItem onPress={onPressItem}>
          <View style={{ flex: 1, paddingRight: 5 }}>
            <Title>{title}</Title>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
                marginTop: 3,
              }}
            >
              <Date>{startAt.toString()}</Date>
              {!endAt && <Date>부터 시작</Date>}
              {endAt && (
                <>
                  <Date>-</Date>
                  <Date>{endAt.toString()}</Date>
                </>
              )}
            </View>
          </View>
          <UpdateButton onPress={onPressEdit}>
            <EditSvg />
          </UpdateButton>
        </NormalGoalItem>
      )}
    </>
  );
}

const NormalGoalItem = styled.Pressable`
  border-radius: 10px;
  border: 2px solid ${colors.secondary[0]};
  background-color: ${colors.secondary[0]};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 18px 15px;
`;

const FocusedGoalItem = styled(NormalGoalItem)`
  border: 2px solid ${colors.primary};
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.dark};
`;

const Date = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.secondary[3]};
`;

const UpdateButton = styled.TouchableOpacity`
  border-radius: 10px;
  background: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
