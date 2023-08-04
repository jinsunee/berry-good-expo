import { useNavigation } from "@react-navigation/native";
import PlusSvg from "assets/svgs/plus.svg";
import { HomeStackNavigationType } from "components/navigators/HomeStackNavigator";
import { Spacing } from "components/shared/Spacing";
import { View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../utils/colors";
import Calendar from "./Calendar";
import Goal from "./Goal";

export default function Page() {
  const { navigate } = useNavigation<HomeStackNavigationType>();
  // const db = useDB();

  // useEffect(() => {
  //   (async () => {
  //     if (!db) return;
  //     await mutateItem(db!, `DELETE FROM ${tables.goals} WHERE id = ${5}`, []);
  //   })();
  // }, []);

  return (
    <Container>
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <PlusButton onPress={() => navigate("AddGoal")}>
          <PlusSvg fill={colors.dark} />
        </PlusButton>
        <Spacing size={10} />
        <Goal />
        <Spacing size={20} />
        <Calendar />
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
