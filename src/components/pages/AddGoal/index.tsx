import { useNavigation } from "@react-navigation/native";
import { Pressable, SafeAreaView, Text } from "react-native";

export default function Page() {
  const { goBack } = useNavigation();

  return (
    <SafeAreaView>
      <Pressable onPress={() => goBack()} style={{ padding: 20 }}>
        <Text>AddGoal</Text>
      </Pressable>
    </SafeAreaView>
  );
}
