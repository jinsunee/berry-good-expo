import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import TrashSvg from "assets/svgs/trash.svg";
import { HomeStackParamList } from "components/navigators/HomeStackNavigator";
import { Dialog } from "components/shared/Dialog";
import { useGoalItem } from "hooks/useGoalItem";
import useIsOpen from "hooks/useIsOpen";
import { Text } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../utils/colors";
import { useDeleteItem } from "./hooks/useDeleteItem";

export default function DeleteButton() {
  const { mutateAsync: onDeleteItem } = useDeleteItem();
  const { isOpen, toggle } = useIsOpen();
  const { goBack } = useNavigation();
  const route = useRoute<RouteProp<HomeStackParamList, "Item">>();
  const goalItem = useGoalItem({ date: route.params?.date });

  return (
    <>
      <RemoveButton
        onPress={() => {
          toggle();
        }}
      >
        <TrashSvg fill={colors.dark} />
      </RemoveButton>
      <Dialog
        isOpen={isOpen}
        onClose={toggle}
        onConfirm={async () => {
          if (!goalItem) return;

          await onDeleteItem({ id: goalItem.id });
          goBack();
        }}
      >
        <Text style={{ color: colors.dark, fontSize: 22, fontWeight: "bold" }}>
          기록을 삭제하시겠습니까?
        </Text>
      </Dialog>
    </>
  );
}

const RemoveButton = styled.TouchableOpacity`
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid ${colors.secondary[1]};
`;
