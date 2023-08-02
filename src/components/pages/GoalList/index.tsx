import { useNavigation } from "@react-navigation/native";
import { HomeStackNavigationType } from "components/navigators/HomeStackNavigator";
import { Pressable, SafeAreaView, Text } from "react-native";

export default function Page() {
  const { goBack, push } = useNavigation<HomeStackNavigationType>();

  return (
    <SafeAreaView>
      <Pressable onPress={() => goBack()} style={{ padding: 20 }}>
        <Text>Item</Text>
      </Pressable>
      <Pressable onPress={() => push("AddGoal")} style={{ padding: 20 }}>
        <Text>다음</Text>
      </Pressable>
    </SafeAreaView>
  );
}
