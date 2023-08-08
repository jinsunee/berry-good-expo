import { Switch } from "react-native";
import { colors } from "../../../../utils/colors";
import { useDisplayMode } from "./useDisplayMode";

export function DisplayModeToggleButton() {
  const { displayMode, switchDisplayMode } = useDisplayMode();

  return (
    <Switch
      trackColor={{
        false: "#E0E0E0",
        true: colors.dark,
      }}
      thumbColor={displayMode === "calendar" ? colors.primary : "#fff"}
      ios_backgroundColor="#E0E0E0"
      onValueChange={switchDisplayMode}
      value={displayMode === "calendar"}
    />
  );
}
