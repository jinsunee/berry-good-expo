import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home";
import Item from "../pages/Item";

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Item" component={Item} />
    </Stack.Navigator>
  );
}
