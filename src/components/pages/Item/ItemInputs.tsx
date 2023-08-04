import { RouteProp, useRoute } from "@react-navigation/native";
import BadSvg from "assets/svgs/bad1.svg";
import GoodSvg from "assets/svgs/good.svg";
import SoSoSvg from "assets/svgs/soso.svg";
import { HomeStackParamList } from "components/navigators/HomeStackNavigator";
import { Spacing } from "components/shared/Spacing";
import { useGoalItem } from "hooks/useGoalItem";
import { useController, useFormContext } from "react-hook-form";
import { Pressable, View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../utils/colors";
import { ItemFormInputs } from "./ItemFormProvider";

export function ItemInputs() {
  const route = useRoute<RouteProp<HomeStackParamList, "Item">>();
  const goalItem = useGoalItem({ date: route.params?.date });

  const { control } = useFormContext<ItemFormInputs>();
  const {
    field: { value: point, onChange: onChangePoint },
  } = useController({
    name: "point",
    control,
    rules: { required: true },
    defaultValue: goalItem?.point,
  });
  const {
    field: { value: memo, onChange: onChangeMemo },
  } = useController({
    name: "memo",
    control,
    rules: { required: true },
    defaultValue: goalItem?.memo,
  });

  return (
    <>
      <PointContainer>
        <PointText>할 일을 잘 마치셨나요?</PointText>
        <Spacing size={20} />
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Pressable onPress={() => onChangePoint(1)}>
            <GoodSvg
              width={80}
              height={80}
              fill={point === 1 ? "#D6A5F4" : "#E0E0E0"}
            />
          </Pressable>
          <Pressable onPress={() => onChangePoint(2)}>
            <SoSoSvg
              width={80}
              height={80}
              fill={point === 2 ? "#FFAF65" : "#E0E0E0"}
            />
          </Pressable>
          <Pressable onPress={() => onChangePoint(3)}>
            <BadSvg
              width={80}
              height={80}
              fill={point === 3 ? "#95BCB5" : "#E0E0E0"}
            />
          </Pressable>
        </View>
      </PointContainer>

      <Spacing size={30} />

      <Title>메모</Title>
      <StyledTextInput
        value={memo}
        multiline={true}
        placeholder="내용을 입력해주세요."
        textAlignVertical="top"
        placeholderTextColor={colors.secondary[1]}
        autoFocus={false}
        onChangeText={(text) => onChangeMemo(text)}
      />
    </>
  );
}

const PointContainer = styled.View`
  padding: 20px;
  background-color: ${colors.white};
  border-radius: 10px;
`;

const PointText = styled.Text`
  align-self: center;
  font-size: 20px;
  font-weight: bold;
  color: ${colors.dark};
`;

const Title = styled.Text`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  color: ${colors.dark};
  margin-bottom: 10px;
`;

const StyledTextInput = styled.TextInput`
  border-radius: 10px;
  padding: 15px;
  background-color: ${colors.white};
  font-size: 20px;
  font-weight: bold;
  height: 200px;
`;
