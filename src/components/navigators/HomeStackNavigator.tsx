import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import Home from "components/pages/Home";
import Item from "components/pages/Item";
import { GoalListStackNavigator } from "./GoalListStackNavigator";

type HomeStackParamList = {
  Home: undefined;
  Item: undefined;
  GoalList: undefined;
  AddGoal: undefined;
};

export type HomeStackNavigationType = NativeStackNavigationProp<
  HomeStackParamList,
  "Home"
>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Item"
        component={Item}
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen
        name="GoalList"
        component={GoalListStackNavigator}
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}
