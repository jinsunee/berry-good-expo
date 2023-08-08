import { useNavigation } from "@react-navigation/native";
import BadSvg from "assets/svgs/bad1.svg";
import GoodSvg from "assets/svgs/good.svg";
import SoSoSvg from "assets/svgs/soso.svg";
import { HomeStackNavigationType } from "components/navigators/HomeStackNavigator";
import { useDisplayMode } from "components/pages/Settings/DisplayModeToggleButton/useDisplayMode";
import { Spacing } from "components/shared/Spacing";
import * as Device from "expo-device";
import { useGoalItems } from "hooks/useGoalItems";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Dimensions, ScaledSize, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import styled from "styled-components/native";
import { colors } from "../../../../utils/colors";

export function GoalItem({ date, index }: { date: string; index: number }) {
  const { displayMode } = useDisplayMode();
  const { data: goalItems } = useGoalItems();
  const { navigate } = useNavigation<HomeStackNavigationType>();

  const [size, setSize] = useState<number>(0);
  const [screenSize, setScreenSize] = useState<number>(
    Dimensions.get("screen").width
  );

  const goalItem = goalItems?.[date];

  useEffect(() => {
    Dimensions.addEventListener(
      "change",
      ({ screen: { width } }: { window: ScaledSize; screen: ScaledSize }) => {
        setScreenSize(width);
      }
    );
  });

  useEffect(() => {
    (async () => {
      const deviceInfo = await Device.getDeviceTypeAsync();
      if (deviceInfo === Device.DeviceType.TABLET) {
        setSize(screenSize / 7 - 20);
      } else {
        setSize(45);
      }
    })();
  }, [screenSize]);

  const handleMove = () => {
    if (moment(date) > moment()) {
      Toast.show({
        type: "error",
        text1: "오늘 이후는 기록할 수 없어요!",
        topOffset: 100,
      });
      return;
    }
    navigate("Item", { date });
  };

  const renderCharacter = () => {
    if (!goalItem) {
      return <EmptyItem width={size} height={size} />;
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
  };

  return (
    <TouchableOpacity onPress={handleMove}>
      {displayMode === "calendar" && (
        <StyledText>{moment(date).format("M/D")}</StyledText>
      )}
      {displayMode === "normal" && <StyledText>{index}일차</StyledText>}
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

const EmptyItem = styled.View<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: ${colors.secondary[0]};
  border-radius: 50%;
`;
