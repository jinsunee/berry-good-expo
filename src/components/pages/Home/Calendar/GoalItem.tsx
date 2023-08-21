import { useNavigation } from "@react-navigation/native";
import BadSvg from "assets/svgs/bad1.svg";
import GoodSvg from "assets/svgs/good.svg";
import SoSoSvg from "assets/svgs/soso.svg";
import { HomeStackNavigationType } from "components/navigators/HomeStackNavigator";
import { Spacing } from "components/shared/Spacing";
import * as Device from "expo-device";
import { useGoal } from "hooks/useGoal";
import { useGoalItems } from "hooks/useGoalItems";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../../utils/colors";

export function GoalItem({ date }: { date: string; index: number }) {
  const { goal } = useGoal();
  const { data: goalItems } = useGoalItems({ goal });
  const { goal: focusedGoal } = useGoal();
  const { navigate } = useNavigation<HomeStackNavigationType>();

  const [size, setSize] = useState<number>(0);

  const goalItem = goalItems?.[date];
  const startAt = goal?.startAt;
  const endAt = goal?.endAt;

  const isInvalidDate =
    moment(date).isBefore(startAt, "day") ||
    (endAt && moment(date).isAfter(endAt, "day"));

  useEffect(() => {
    (async () => {
      const deviceInfo = await Device.getDeviceTypeAsync();
      if (deviceInfo === Device.DeviceType.TABLET) {
        setSize(70);
      } else {
        setSize(45);
      }
    })();
  }, []);

  const handleMove = () => {
    if (goal) {
      navigate("Item", { date, goal });
    }
  };

  const renderCharacter = useCallback(() => {
    // date가 startAt과 같은날이거나 더 앞선 날 & endAt이 있다면 이보다 더 이전인 경우
    if (isInvalidDate) {
      return <EmptyItem width={size} height={size} />;
    }

    if (!goalItem) {
      return (
        <EmptyItem
          width={size}
          height={size}
          backgroundColor={colors.secondary[0]}
        />
      );
    }

    const point = goalItem?.point;
    switch (point) {
      case 1: {
        return <GoodSvg width={size} height={size} fill="#D6A5F4" />;
      }
      case 2: {
        return <SoSoSvg width={size} height={size} fill="#FFAF65" />;
      }
      case 3: {
        return <BadSvg width={size} height={size} fill="#95BCB5" />;
      }
    }
  }, [size, goalItem, goal]);

  return (
    <TouchableOpacity
      onPress={() => {
        if (!isInvalidDate) {
          handleMove();
        }
      }}
    >
      <StyledText>{moment(date).format("D")}</StyledText>
      <Spacing size={5} />
      {renderCharacter()}
    </TouchableOpacity>
  );
}

const StyledText = styled.Text`
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: ${colors.dark};
`;

const EmptyItem = styled.View<{
  width: number;
  height: number;
  backgroundColor?: string;
}>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 50%;
`;
