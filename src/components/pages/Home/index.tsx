import { useNavigation } from "@react-navigation/native";
import PlusSvg from "assets/svgs/plus.svg";
import { HomeStackNavigationType } from "components/navigators/HomeStackNavigator";
import { Spacing } from "components/shared/Spacing";
import { useGoals } from "hooks/useGoals";
import { useEffect, useMemo } from "react";
import { Image, Text, View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../utils/colors";
import Calendar from "./Calendar";
import Goal from "./Goal";

export default function Page() {
  const { navigate } = useNavigation<HomeStackNavigationType>();
  const { data: goals } = useGoals();

  const isExistedGoals = useMemo(() => (goals?.length ?? 0) > 0, [goals]);

  useEffect(() => {
    if (!isExistedGoals) {
      navigate("AddGoal");
    }
  }, []);

  return (
    <Container>
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <PlusButton onPress={() => navigate("AddGoal")}>
          <PlusSvg fill={colors.dark} />
        </PlusButton>
        {!isExistedGoals && (
          <View
            style={{
              alignSelf: "flex-end",
              alignItems: "flex-end",
              gap: 10,
              marginTop: 10,
              padding: 20,
              backgroundColor: colors.secondary[0],
              borderRadius: 10,
            }}
          >
            <Image source={require("assets/images/top.png")} />
            <Text
              style={{ textAlign: "right", fontSize: 20, fontWeight: "bold" }}
            >
              여기를 눌러서{"\n"}목표를 {"\n"}추가해보세요!
            </Text>
          </View>
        )}
        {isExistedGoals && (
          <>
            <Spacing size={10} />
            <Goal />
            <Spacing size={20} />
            <Calendar />
          </>
        )}
      </View>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  display: flex;
  flex: 1;
  background-color: ${colors.white};
`;

const PlusButton = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 58px;
  height: 35px;
  align-self: flex-end;
  background-color: ${colors.primary};
  border-radius: 20px;
`;
