import { useNavigation } from "@react-navigation/native";
import ArrowLeftSvg from "assets/svgs/arrow-left.svg";
import ArrowRightSvg from "assets/svgs/arrow-right.svg";
import { HomeStackNavigationType } from "components/navigators/HomeStackNavigator";
import { Spacing } from "components/shared/Spacing";
import { useGoals } from "hooks/useGoals";
import { View } from "react-native";
import { useRecoilState } from "recoil";
import { styled } from "styled-components/native";
import { colors } from "../../../../utils/colors";
import { dateAtom } from "../states";
import { useGoalItems } from "hooks/useGoalItems";

// 해당 날짜에 해당되는 목표(goals)
// goalItems를 한번에 다 불러오면 안되지 않을까?

export function TodoList() {
  const [date, setDate] = useRecoilState(dateAtom);
  const { data: goals } = useGoals();
  const {} = useGoalItems()
  const { navigate } = useNavigation<HomeStackNavigationType>();

  const handleMoveNextMonth = () => {
    const nextMonthDate = date.clone().add(1, "day");
    setDate(nextMonthDate);
  };

  const handleMovePrevMonth = () => {
    const prevMonthDate = date.clone().add(-1, "day");
    setDate(prevMonthDate);
  };

  return (
    <>
      <MonthHeader>
        <MonthChangeButton onPress={handleMovePrevMonth}>
          <ArrowLeftSvg width={25} height={25} />
        </MonthChangeButton>
        <MonthButton>
          <MonthHeaderYear>{date.format("YYYY")}</MonthHeaderYear>
          <DateText>{date.format("MM월 DD일")}</DateText>
        </MonthButton>
        <MonthChangeButton onPress={handleMoveNextMonth}>
          <ArrowRightSvg width={25} height={25} />
        </MonthChangeButton>
      </MonthHeader>
      <Spacing size={18} />
      <View style={{ gap: 10 }}>
        {goals?.map((goal) => (
          <GoalContainer
            key={goal.id}
            onPress={() => navigate("Item", { date: date.toString(), goal })}
          >
            <View style={{ display: "flex", gap: 10, flex: 1 }}>
              <GoalText>{goal?.title}</GoalText>
            </View>

            <EmptyItem />
          </GoalContainer>
        ))}
      </View>
    </>
  );
}

const MonthHeader = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const MonthHeaderYear = styled.Text`
  font-size: 18px;
  color: ${colors.secondary[3]};
  margin-right: 3px;
  margin-top: 2px;
`;

const DateText = styled.Text`
  font-weight: bold;
  font-size: 22px;
  color: ${colors.dark};
`;

const MonthButton = styled.Pressable`
  flex-direction: row;
  justify-content: center;
`;

const MonthChangeButton = styled.Pressable`
  padding: 7px;
`;

const GoalContainer = styled.Pressable`
  border: 1px solid ${colors.secondary[1]};
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 30px;
  position: relative;
`;

const GoalText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${colors.dark};
`;

const EmptyItem = styled.View`
  width: 25px;
  height: 25px;
  background-color: ${colors.secondary[0]};
  border-radius: 50%;
`;
