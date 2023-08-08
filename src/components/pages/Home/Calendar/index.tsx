import { useDisplayMode } from "components/pages/Settings/DisplayModeToggleButton/useDisplayMode";
import { Spacing } from "components/shared/Spacing";
import { useGoal } from "hooks/useGoal";
import moment, { Moment } from "moment";
import React, { Fragment, ReactElement } from "react";
import { ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../../utils/colors";
import { GoalItem } from "./GoalItem";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
type DateTtn = Record<
  string,
  {
    key: { year: string; month: string };
    dates: Date[];
    startAt: Moment;
    endAt: Moment;
  }
>;

const getDates = (startAt?: Date, endAt?: Date): DateTtn => {
  const _startAt = moment(startAt);
  const _startAtKey = _startAt.format("YYYY.MM");
  const _endAt = moment(endAt);
  const _endAtKey = _endAt.format("YYYY.MM");

  const currentDate = _startAt.clone();
  const endAtDate = _endAt.clone();

  const rtn: DateTtn = {};

  while (currentDate <= endAtDate) {
    const year = currentDate.format("YYYY");
    const month = currentDate.format("MM");
    const key = `${year}.${month}`;

    if (!rtn[key]) {
      const thisMonthFirst =
        _startAtKey === key ? _startAt : currentDate.clone().startOf("month");
      const thisMonthEnd =
        _endAtKey === key ? _endAt : currentDate.clone().endOf("month");

      rtn[key] = {
        key: { year, month },
        dates: [],
        startAt: thisMonthFirst,
        endAt: thisMonthEnd,
      };
    }

    rtn[key].dates.push(currentDate.clone().toDate());
    currentDate.add(1, "days");
  }

  return rtn;
};

const getCalendar = (_startAt: Moment, _endAt: Moment) => {
  const startAtDay = _startAt.day();
  const endAtDay = _endAt.day();

  const dates = [];

  // 0~startAt-1까지 공백으로 채우기
  for (let i = 0; i < startAtDay; i++) {
    dates.push(<Item key={`empty-${i}`} />);
  }

  // startAt~endAt까지 O로 채우기
  const currentDate = _startAt.clone();
  const endAtDate = _endAt.clone();
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
      <Flex key={i}>{dates.slice(i, i + 7).map((date) => date)}</Flex>
    );
  }

  return weeks;
};

function Calendar() {
  const { displayMode } = useDisplayMode();
  const { goal: focusedGoal } = useGoal();

  const startAt = focusedGoal?.startAt;
  const endAt = focusedGoal?.endAt;

  const renderItems = () => {
    const dateMap = getDates(startAt, endAt);

    const rtn: ReactElement[] = [];
    for (const date of Object.keys(dateMap)) {
      const {
        startAt,
        endAt,
        key: { year, month },
      } = dateMap[date];

      rtn.push(
        <MonthHeader>
          <MonthHeaderYear>{year}</MonthHeaderYear>
          <MonthHeaderMonth>{month}</MonthHeaderMonth>
        </MonthHeader>
      );
      rtn.push(<Fragment>{getCalendar(startAt, endAt)}</Fragment>);
    }

    return rtn;
  };

  return (
    <View>
      {displayMode === "calendar" && (
        <>
          <Flex>
            {DAYS.map((day) => (
              <Item key={day}>
                <DateText>{day}</DateText>
              </Item>
            ))}
          </Flex>
          <Spacing size={10} />
        </>
      )}

      <ScrollView>
        <Spacing size={10} />
        <FlexColumn>{renderItems()}</FlexColumn>
        <Spacing size={400} />
      </ScrollView>
    </View>
  );
}

const FlexColumn = styled.View`
  flex-direction: column;
  gap: 10px;
`;

const Flex = styled.View`
  flex-direction: row;
`;

const Item = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const DateText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.dark};
`;

const MonthHeader = styled.View`
  flex-direction: row;
  padding-top: 20px;
  /* align-items: flex-end; */
`;

const MonthHeaderYear = styled.Text`
  font-size: 16px;
  color: ${colors.secondary[3]};
  margin-right: 3px;
  margin-top: 4px;
`;

const MonthHeaderMonth = styled.Text`
  font-weight: bold;
  font-size: 22px;
  color: ${colors.dark};
`;

export default Calendar;
