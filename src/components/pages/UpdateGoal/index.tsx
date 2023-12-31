import { useNavigation } from "@react-navigation/native";
import CloseSvg from "assets/svgs/close.svg";
import { DismissKeyboard } from "components/shared/DismissKeyboard";
import { View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../utils/colors";
import { UpdateGoalForm } from "./UpdateGoalForm";

export default function Page() {
  const { goBack } = useNavigation();

  return (
    <DismissKeyboard>
      <StyledSafeAreaView>
        <Flex>
          <Title>목표 수정</Title>
          <CloseButton onPress={goBack}>
            <CloseSvg fill={colors.dark} />
          </CloseButton>
        </Flex>
        <View style={{ padding: 20, flex: 1 }}>
          <UpdateGoalForm />
        </View>
      </StyledSafeAreaView>
    </DismissKeyboard>
  );
}

const StyledSafeAreaView = styled.SafeAreaView`
  background-color: ${colors.secondary[0]};
  flex: 1;
`;

const Flex = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-top: 25px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  color: ${colors.dark};
`;

const CloseButton = styled.Pressable`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  border-radius: 20px;
  padding: 10px;
  top: 10px;
  right: 10px;
`;
