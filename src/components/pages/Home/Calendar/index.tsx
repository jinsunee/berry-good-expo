import { useDisplayMode } from "components/pages/Settings/DisplayModeToggleButton/useDisplayMode";
import { Spacing } from "components/shared/Spacing";
import { useGoal } from "hooks/useGoal";
import moment, { Moment } from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import styled from "styled-components/native";
import { dateFormat } from "../../../../constants/date";
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

const getDates = (startAt?: string, endAt?: string): DateTtn => {
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

  const [endAt, setEndAt] = useState<string>();

  const startAt = focusedGoal?.startAt;
  const _endAt = focusedGoal?.endAt;

  const isLimited = !!_endAt;

  // 한번에 최대 3개월까지만 보여주고, endAt이 끝날 때까지 아래로 스크롤 하면 더 보여줌.
  // 처음부터 endAt이 없다면 무한으로 보여짐.
  useEffect(() => {
    // endAt이 없다면 start로 부터 3개월 후의 마지막 날이 endAt임
    if (!isLimited) {
      const _startAt = focusedGoal?.startAt;
      if (_startAt) {
        const _endAt = moment(_startAt).add(2, "months").endOf("month");
        setEndAt(_endAt.format(dateFormat));
      }
    } else {
      setEndAt(_endAt as string);
    }
  }, [isLimited, focusedGoal]);

  const handleEndReached = useCallback(() => {
    if (isLimited) return;

    const newEndAt = moment(endAt)
      .add(2, "months")
      .endOf("month")
      .format(dateFormat);
    setEndAt(newEndAt);
  }, [endAt]);

  const renderItem = useCallback(
    ({ item }: any) => {
      const {
        startAt,
        endAt,
        key: { year, month },
      } = item;

      return (
        <>
          <MonthHeader>
            <MonthHeaderYear>{year}</MonthHeaderYear>
            <MonthHeaderMonth>{month}</MonthHeaderMonth>
          </MonthHeader>
          {getCalendar(startAt, endAt)}
        </>
      );
    },
    [focusedGoal]
  );

  const dataArr = useMemo(
    () => Object.values(getDates(startAt, endAt)),
    [startAt, endAt, focusedGoal]
  ); // dateMap을 array로 변환

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

      <FlatList
        data={dataArr}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.key.year}-${item.key.month}`}
        ListFooterComponent={<Spacing size={400} />}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5} // 스크롤이 목록의 하단 50% 부분에 도달하면 호출
      />
    </View>
  );
}

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
