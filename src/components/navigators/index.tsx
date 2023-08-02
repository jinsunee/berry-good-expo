import { NavigationContainer } from "@react-navigation/native";
import HomeTabNavigator from "./HomeTabNavigator";

export default function Navigators() {
  return (
    <NavigationContainer>
      <HomeTabNavigator />
    </NavigationContainer>
  );
}
