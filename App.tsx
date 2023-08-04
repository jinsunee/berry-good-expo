import Providers from "components/providers";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import "./global.css";
import Navigators from "./src/components/navigators";

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Providers>
          <Navigators />
        </Providers>
      </GestureHandlerRootView>
      <Toast />
    </>
  );
}
