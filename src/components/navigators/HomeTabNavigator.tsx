import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Settings from "../pages/Settings";
import HomeStackNavigator from "./HomeStackNavigator";

const Tab = createBottomTabNavigator();

export default function HomeTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
