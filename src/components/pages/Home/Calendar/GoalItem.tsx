import { useNavigation } from "@react-navigation/native";
import BadSvg from "assets/svgs/bad1.svg";
import EmptySvg from "assets/svgs/empty-item.svg";
import GoodSvg from "assets/svgs/good.svg";
import SoSoSvg from "assets/svgs/soso.svg";
import { HomeStackNavigationType } from "components/navigators/HomeStackNavigator";
import { Spacing } from "components/shared/Spacing";
import * as Device from "expo-device";
import { useGoalItems } from "hooks/useGoalItems";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Dimensions, ScaledSize, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";
import { displayModeAtom } from "../../../../states";
import { colors } from "../../../../utils/colors";

export function GoalItem({ date, index }: { date: string; index: number }) {
  const displayMode = useRecoilValue(displayModeAtom);
  const { data: goalItems } = useGoalItems();
  const { navigate } = useNavigation<HomeStackNavigationType>();

  const [size, setSize] = useState<number>();
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
      console.log("screenSize", screenSize);
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
      return <EmptySvg width={size} height={size} />;
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
