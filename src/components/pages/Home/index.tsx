import { useNavigation } from "@react-navigation/native";
import CalendarSvg from "assets/svgs/calendar.svg";
import MenuSvg from "assets/svgs/menu.svg";
import PlusSvg from "assets/svgs/plus.svg";
import TodoSvg from "assets/svgs/todo.svg";
import { HomeStackNavigationType } from "components/navigators/HomeStackNavigator";
import { Spacing } from "components/shared/Spacing";
import { useGoals } from "hooks/useGoals";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../utils/colors";
import { Calendar } from "./Calendar";
import Goal from "./Goal";

type ViewMode = "calendar" | "todo";

export default function Page() {
  const { navigate } = useNavigation<HomeStackNavigationType>();
  const { data: goals } = useGoals();

  const [mode, setMode] = useState<ViewMode>("calendar");

  const isExistedGoals = useMemo(() => (goals?.length ?? 0) > 0, [goals]);

  useEffect(() => {
    if (goals && !isExistedGoals) {
      navigate("AddGoal");
    }
  }, [goals, isExistedGoals]);

  return (
    <Container>
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Pressable
            style={{ paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}
            onPress={() => navigate("AddGoal")}
          >
            <MenuSvg fill={colors.dark} />
          </Pressable>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <PlusButton onPress={() => navigate("AddGoal")}>
              <PlusSvg fill={colors.dark} />
            </PlusButton>
            <ChangeModeButton mode={mode} onChangeMode={setMode} />
          </View>
        </View>

        {isExistedGoals && mode === "calendar" && (
          <>
            <Spacing size={10} />
            <Goal />
            <Spacing size={10} />
            <Calendar />
          </>
        )}
      </View>
    </Container>
  );
}

function ChangeModeButton({
  mode,
  onChangeMode,
}: {
  mode: ViewMode;
  onChangeMode: (mode: ViewMode) => void;
}) {
  return (
    <Fragment>
      {mode === "calendar" && (
        <StyledChangeModeButton onPress={() => onChangeMode("todo")}>
          <TodoSvg fill={colors.dark} />
        </StyledChangeModeButton>
      )}
      {mode === "todo" && (
        <StyledChangeModeButton onPress={() => onChangeMode("calendar")}>
          <CalendarSvg fill={colors.dark} />
        </StyledChangeModeButton>
      )}
    </Fragment>
  );
}

const Container = styled.SafeAreaView`
  display: flex;
  flex: 1;
  background-color: ${colors.white};
`;

const PlusButton = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: ${colors.secondary[0]};
  border-radius: 20px;
`;

const StyledChangeModeButton = styled.Pressable`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
