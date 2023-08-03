import TrashSvg from "assets/svgs/trash.svg";
import { useMemo, useReducer, useState } from "react";
import { Keyboard, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styled from "styled-components/native";
import { colors } from "../../../utils/colors";

export function AddGoalForm() {
  const [goal, setGoal] = useState<string>();
  const [startAt, setStartAt] = useState<Date>();
  const [endAt, setEndAt] = useState<Date>();

  const isActiveSubmitButton = useMemo(
    () => !!goal && !!startAt && !!endAt,
    [goal, startAt, endAt]
  );

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
        <RemoveButton>
          <TrashSvg fill={colors.dark} />
        </RemoveButton>
        <SaveButton
          disabled={isActiveSubmitButton}
          isActive={isActiveSubmitButton}
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

function DatePicker({
  date,
  setDate,
  placeholderText,
  minDate,
  maxDate,
}: {
  date?: Date;
  setDate: (date: Date) => void;
  placeholderText?: string;
  minDate?: Date;
  maxDate?: Date;
}) {
  const [isShow, toggleShow] = useReducer((prev) => !prev, false);

  const handlePressButton = () => {
    toggleShow();
    Keyboard.dismiss();
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    toggleShow();
  };

  return (
    <>
      <StyledDate onPress={handlePressButton}>
        {date && <DateText>{date.toLocaleDateString()}</DateText>}
        {!date && <PlaceholderText>{placeholderText}</PlaceholderText>}
      </StyledDate>
      <DateTimePickerModal
        locale="ko"
        isVisible={isShow}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={toggleShow}
        confirmTextIOS="확인"
        cancelTextIOS="취소"
        maximumDate={maxDate}
        minimumDate={minDate}
      />
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

const StyledDate = styled.Pressable`
  background-color: ${colors.white};
  flex: 1;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;

const DateText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.dark};
`;

const PlaceholderText = styled(DateText)`
  color: ${colors.secondary[1]};
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

const RemoveButton = styled.TouchableOpacity`
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid ${colors.secondary[1]};
`;

const SaveButton = styled.Pressable<{ isActive: boolean }>`
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  flex: 1;
  background-color: ${({ isActive }) =>
    isActive ? colors.dark : colors.secondary[1]};
`;
