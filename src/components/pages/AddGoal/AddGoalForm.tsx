import { View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../utils/colors";

export function AddGoalForm() {
  return (
    <Container>
      <View>
        <Title>목표</Title>
        <StyledTextInput
          multiline={true}
          placeholder="목표를 입력해주세요."
          textAlignVertical="top"
          placeholderTextColor={colors.secondary[1]}
        />
      </View>
      <View>
        <Title>기간</Title>
      </View>
    </Container>
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
  font-size: 18px;
  font-weight: bold;
  height: 100px;
`;
