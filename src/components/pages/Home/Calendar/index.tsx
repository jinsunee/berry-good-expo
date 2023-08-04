import { useNavigation } from "@react-navigation/native";
import BadSvg from "assets/svgs/bad1.svg";
import EmptySvg from "assets/svgs/empty-item.svg";
import GoodSvg from "assets/svgs/good.svg";
import SoSoSvg from "assets/svgs/soso.svg";
import { HomeStackNavigationType } from "components/navigators/HomeStackNavigator";
import { Spacing } from "components/shared/Spacing";
import { useGoalItems } from "hooks/useGoalItems";
import moment from "moment";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../../utils/colors";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function Calendar() {
  const startAt = "2023-08-01";
  const endAt = "2023-10-30";

  // startAt이 포함된 주부터 endAt이 포함된 주까지 O를 그린다. 그대신 startAt 이전과 endAt 이후는 공백으로 채운다.
  const getWeeks = (startAt: string, endAt: string) => {
    const _startAt = moment(startAt);
    const _endAt = moment(endAt);

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

    while (currentDate <= endAtDate) {
      dates.push(
        <Item key={currentDate.format("YYYY-MM-DD")}>
          <GoalItem date={currentDate.format("YYYY-MM-DD")} />
        </Item>
      );
      currentDate.add(1, "days");
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

  return (
    <View>
      <Flex>
        {DAYS.map((day) => (
          <Item key={day}>
            <DateText>{day}</DateText>
          </Item>
        ))}
      </Flex>
      <Spacing size={10} />
      <ScrollView>
        <Spacing size={10} />
        <FlexColumn>{getWeeks(startAt, endAt)}</FlexColumn>
        <Spacing size={400} />
      </ScrollView>
    </View>
  );
}

function GoalItem({ date }: { date: string }) {
  const { data: goalItems } = useGoalItems();
  const { navigate } = useNavigation<HomeStackNavigationType>();

  const goalItem = goalItems?.[date];

  const handleMove = () => {
    navigate("Item");
  };

  const renderCharacter = () => {
    if (!goalItem) {
      return <EmptySvg width={45} height={50} />;
    }

    const point = goalItem?.point;
    switch (point) {
      case 1: {
        return <GoodSvg width={45} height={50} />;
      }
      case 2: {
        return <SoSoSvg width={45} height={50} />;
      }
      case 3: {
        return <BadSvg width={45} height={50} />;
      }
    }
  };

  return (
    <TouchableOpacity onPress={handleMove}>
      {renderCharacter()}
    </TouchableOpacity>
  );
}

const FlexColumn = styled.View`
  flex-direction: column;
  gap: 10px;
  max-width: 500px;
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

export default Calendar;
