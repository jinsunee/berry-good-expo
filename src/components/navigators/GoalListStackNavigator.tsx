import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import AddGoal from "components/pages/AddGoal";
import GoalList from "components/pages/GoalList";

type StackParamList = {
  Home: undefined;
  AddGoal: undefined;
};

export type GoalListStackNavigationType = NativeStackNavigationProp<
  StackParamList,
  "Home"
>;

const Stack = createNativeStackNavigator<StackParamList>();

export function GoalListStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={GoalList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddGoal"
        component={AddGoal}
        options={{ headerShown: false, presentation: "card" }}
      />
    </Stack.Navigator>
  );
}
