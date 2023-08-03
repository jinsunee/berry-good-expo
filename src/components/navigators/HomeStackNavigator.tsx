import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import AddGoal from "components/pages/AddGoal";
import GoalList from "components/pages/GoalList";
import Home from "components/pages/Home";
import Item from "components/pages/Item";

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
        options={{ headerShown: false, presentation: "fullScreenModal" }}
      />
      <Stack.Screen
        name="GoalList"
        component={GoalList}
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen
        name="AddGoal"
        component={AddGoal}
        options={{ headerShown: false, presentation: "fullScreenModal" }}
      />
    </Stack.Navigator>
  );
}
