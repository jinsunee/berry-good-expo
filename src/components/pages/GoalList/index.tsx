import { useNavigation } from "@react-navigation/native";
import CloseSvg from "assets/svgs/close.svg";
import { HomeStackNavigationType } from "components/navigators/HomeStackNavigator";
import { Spacing } from "components/shared/Spacing";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { colors } from "../../../utils/colors";
import { GoalList } from "./GoalList";

export default function Page() {
  const { goBack } = useNavigation<HomeStackNavigationType>();
  const insets = useSafeAreaInsets();

  return (
    <StyledView>
      <Flex>
        <Title>목표</Title>
        <CloseButton onPress={goBack}>
          <CloseSvg fill={colors.dark} />
        </CloseButton>
      </Flex>
      <Spacing size={20} />
      <ScrollView
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          flex: 1,
        }}
      >
        <GoalList />
        <Spacing size={insets.bottom + 20} />
      </ScrollView>
    </StyledView>
  );
}

const StyledView = styled.View`
  background-color: ${colors.white};
  flex: 1;
  min-height: 100%;
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
