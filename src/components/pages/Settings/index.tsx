import { Spacing } from "components/shared/Spacing";
import Constants from "expo-constants";
import { Pressable, Switch } from "react-native";
import { useRecoilState } from "recoil";
import styled from "styled-components/native";
import { displayModeAtom } from "../../../states";
import { colors } from "../../../utils/colors";

export default function Page() {
  const [displayMode, setDisplayMode] = useRecoilState(displayModeAtom);

  const toggleSwitch = () => {
    if (displayMode === "calendar") {
      setDisplayMode("normal");
    } else {
      setDisplayMode("calendar");
    }
  };

  return (
    <StyledSafeAreaView>
      <Padding>
        <Title>설정</Title>
        <Spacing size={40} />
        <Group>
          <SubTitle>화면</SubTitle>
          <Item
            title="날짜로 보여지기"
            rightElement={
              <Switch
                trackColor={{
                  false: "#E0E0E0",
                  true: colors.dark,
                }}
                thumbColor={
                  displayMode === "calendar" ? colors.primary : "#fff"
                }
                ios_backgroundColor="#E0E0E0"
                onValueChange={toggleSwitch}
                value={displayMode === "calendar"}
              />
            }
          />
        </Group>
        <Spacing size={60} />
        <Group>
          <SubTitle>기타</SubTitle>
          <Item
            title="버전"
            rightElement={
              <ItemContent>v {Constants.expoConfig?.version}</ItemContent>
            }
          />
          <Item
            title="리뷰"
            rightElement={<ItemContent>부탁드려요🙏</ItemContent>}
          />
        </Group>
      </Padding>
    </StyledSafeAreaView>
  );
}

function Item({
  title,
  rightElement,
}: {
  title: string;
  rightElement: React.ReactNode;
}) {
  return (
    <Pressable
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ItemText>{title}</ItemText>
      {rightElement}
    </Pressable>
  );
}

const StyledSafeAreaView = styled.SafeAreaView`
  background-color: ${colors.white};
  flex: 1;
`;

const Padding = styled.View`
  margin: 20px;
`;

const Title = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: ${colors.dark};
`;

const Group = styled.View`
  flex-direction: column;
  gap: 15px;
`;

const SubTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.secondary[3]};
`;

const ItemText = styled.Text`
  font-size: 18px;
  font-weight: 500;
`;

const ItemContent = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.dark};
`;
