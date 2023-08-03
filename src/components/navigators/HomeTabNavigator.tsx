import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CalendarSvg from "assets/svgs/calendar.svg";
import SettingSvg from "assets/svgs/setting.svg";
import Settings from "components/pages/Settings";
import HomeStackNavigator from "./HomeStackNavigator";

const Tab = createBottomTabNavigator();

const getTabIconColor = (isFocused: boolean) => {
  return isFocused ? "#000" : "#E1DEDE";
};

export default function HomeTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CalendarSvg fill={getTabIconColor(focused)} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <SettingSvg fill={getTabIconColor(focused)} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
