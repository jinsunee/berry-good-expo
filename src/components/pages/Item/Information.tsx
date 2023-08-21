import { RouteProp, useRoute } from "@react-navigation/native";
import { HomeStackParamList } from "components/navigators/HomeStackNavigator";
import { Badge } from "components/shared/Badge";
import { Stack } from "components/shared/Stack";
import styled from "styled-components/native";
import { colors } from "../../../utils/colors";

export function Information() {
  const route = useRoute<RouteProp<HomeStackParamList, "Item">>();
  const date = route.params?.date;
  const goal = route.params?.goal;

  return (
    <Stack spacing={10}>
      <FlexRow>
        <Badge>목표</Badge>
        <StyledText>{goal?.title}</StyledText>
      </FlexRow>
      <FlexRow>
        <Badge>날짜</Badge>
        <StyledText>{date}</StyledText>
      </FlexRow>
    </Stack>
  );
}

const FlexRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 20px;
  color: ${colors.dark};
  font-weight: bold;
  margin-left: 10px;
`;
