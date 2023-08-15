import ArrowLeftSvg from "assets/svgs/arrow-left.svg";
import ArrowRightSvg from "assets/svgs/arrow-right.svg";
import { Spacing } from "components/shared/Spacing";
import moment, { Moment } from "moment";
import { useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../../utils/colors";
import { GoalItem } from "./GoalItem";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function Calendar() {
  // const { goal } = useGoal();

  const [date, setDate] = useState(moment());

  const getCalendar = (d: Moment) => {
    // 0~startAt-1까지 공백으로 채우기
    // month의 첫째날을 구하는 방법

    const startAt = d.clone().startOf("month");
    const endAt = d.clone().endOf("month");

    const dates = [];
    const startAtDay = startAt.day();
    const endAtDay = endAt.day();

    for (let i = 0; i < startAtDay; i++) {
      dates.push(<Item key={`empty-${i}`} />);
    }

    // startAt~endAt까지 O로 채우기
    const currentDate = startAt.clone();
    const endAtDate = endAt.clone();
    let index = 1;

    while (currentDate <= endAtDate) {
      dates.push(
        <Item key={currentDate.format("YYYY-MM-DD")}>
          <GoalItem date={currentDate.format("YYYY-MM-DD")} index={index} />
        </Item>
      );
      currentDate.add(1, "days");
      index++;
    }

    // endAt~7까지 공백으로 채우기
    for (let i = endAtDay; i <= 7; i++) {
      dates.push(<Item key={`empty-${i}`} />);
    }

    // 7로 나눠서 weeks 단위로 리턴
    const weeks = [];
    for (let i = 0; i < dates.length; i += 7) {
      weeks.push(
        <View>
          <Divider />
          <Spacing size={10} />
          <Flex key={i}>{dates.slice(i, i + 7).map((date) => date)}</Flex>
        </View>
      );
    }

    return weeks;
  };

  const handleMoveNextMonth = () => {
    const nextMonthDate = date.clone().add(1, "months");
    setDate(nextMonthDate);
  };

  const handleMovePrevMonth = () => {
    const prevMonthDate = date.clone().add(-1, "months");
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
          <MonthHeaderMonth>{date.format("MM")}</MonthHeaderMonth>
        </MonthButton>
        <MonthChangeButton onPress={handleMoveNextMonth}>
          <ArrowRightSvg width={25} height={25} />
        </MonthChangeButton>
      </MonthHeader>
      <Spacing size={10} />
      <Container>
        <Flex>
          {DAYS.map((day) => (
            <Item key={day}>
              <DateText>{day}</DateText>
            </Item>
          ))}
        </Flex>
        {getCalendar(date)}
      </Container>
    </>
  );
}

const Container = styled.View`
  gap: 10px;
`;

const Item = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Flex = styled.View`
  flex-direction: row;
`;

const DateText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.dark};
`;

const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${colors.secondary[0]};
`;

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

const MonthHeaderMonth = styled.Text`
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
