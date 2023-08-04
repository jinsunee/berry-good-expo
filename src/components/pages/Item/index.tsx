import { useNavigation } from "@react-navigation/native";
import CloseSvg from "assets/svgs/close.svg";
import { DismissKeyboard } from "components/shared/DismissKeyboard";
import { Spacing } from "components/shared/Spacing";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { colors } from "../../../utils/colors";
import { BottomArea } from "./BottomArea";
import { Information } from "./Information";
import { ItemFormProvider } from "./ItemFormProvider";
import { ItemInputs } from "./ItemInputs";

export default function Page() {
  const { goBack } = useNavigation();

  return (
    <ItemFormProvider>
      <DismissKeyboard>
        <StyledSafeAreaView>
          <CloseButton onPress={goBack}>
            <CloseSvg fill={colors.dark} />
          </CloseButton>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView style={{ padding: 20, paddingTop: 0 }}>
              <Information />
              <Spacing size={20} />
              <ItemInputs />
            </ScrollView>
          </KeyboardAvoidingView>

          <BottomArea />
        </StyledSafeAreaView>
      </DismissKeyboard>
    </ItemFormProvider>
  );
}

const StyledSafeAreaView = styled.SafeAreaView`
  background-color: ${colors.secondary[0]};
  flex: 1;
`;

const CloseButton = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  border-radius: 20px;
  padding: 10px;
  margin: 10px;
`;
