import { StatusBar } from "expo-status-bar";
import "./global.css";
import Navigators from "./src/components/navigators";

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <Navigators />
    </>
  );
}
