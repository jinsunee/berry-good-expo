import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { HomeStackParamList } from "components/navigators/HomeStackNavigator";
import { useGoals } from "hooks/useGoals";
import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../utils/colors";
import DatePicker from "./DatePicker";
import DeleteButton from "./DeleteButton";
import { useUpdateGoal } from "./useUpdateGoal";

export function UpdateGoalForm() {
  const { mutateAsync: onUpdateGoal } = useUpdateGoal();
  const { goBack } = useNavigation();
  const { data: goals } = useGoals();
  const route = useRoute<RouteProp<HomeStackParamList, "UpdateGoal">>();

  const [goal, setGoal] = useState<string>();
  const [startAt, setStartAt] = useState<Date>();
  const [endAt, setEndAt] = useState<Date>();

  const id = route.params?.id;

  const isActiveSubmitButton = useMemo(
    () => !!goal && !!startAt,
    [goal, startAt]
  );

  const handleSubmit = async () => {
    if (!goal || !startAt) return;

    await onUpdateGoal({ id: Number(id), title: goal, startAt, endAt });
    goBack();
  };

  useEffect(() => {
    const goal = goals?.find((goal) => goal.id === id);
    if (!goal) return;

    setGoal(goal.title);
    setStartAt(new Date(goal.startAt));
    if (goal.endAt) {
      setEndAt(new Date(goal.endAt));
    }
  }, []);

  return (
    <>
      <Container>
        <View>
          <Title>목표</Title>
          <StyledTextInput
            value={goal}
            multiline={true}
            placeholder="목표를 입력해주세요."
            textAlignVertical="top"
            placeholderTextColor={colors.secondary[1]}
            autoFocus={false}
            onChangeText={(text) => setGoal(text)}
          />
        </View>
        <View>
          <Title>기간</Title>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <DatePicker
              date={startAt}
              setDate={setStartAt}
              placeholderText="시작하는 날"
              maxDate={endAt}
            />
            <Text style={{ fontSize: 25, marginLeft: 10, marginRight: 10 }}>
              -
            </Text>
            <DatePicker
              date={endAt}
              setDate={setEndAt}
              placeholderText="끝나는 날"
              minDate={startAt}
            />
          </View>
        </View>
      </Container>
      <BottomArea>
        <DeleteButton />
        <SaveButton
          disabled={!isActiveSubmitButton}
          isActive={isActiveSubmitButton}
          onPress={handleSubmit}
        >
          <Text
            style={{ color: colors.white, fontSize: 22, fontWeight: "bold" }}
          >
            저장
          </Text>
        </SaveButton>
      </BottomArea>
    </>
  );
}

const Container = styled.View`
  display: flex;
  gap: 35px;
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
  height: 100px;
`;

const BottomArea = styled.View`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const SaveButton = styled.TouchableOpacity<{ isActive: boolean }>`
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  flex: 1;
  background-color: ${({ isActive }) =>
    isActive ? colors.dark : colors.secondary[1]};
`;
