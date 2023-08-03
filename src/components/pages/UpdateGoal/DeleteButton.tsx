import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import TrashSvg from "assets/svgs/trash.svg";
import { HomeStackParamList } from "components/navigators/HomeStackNavigator";
import { Dialog } from "components/shared/Dialog";
import useIsOpen from "hooks/useIsOpen";
import { Text } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../utils/colors";
import { useDeleteGoal } from "./useDeleteGoal";

export default function DeleteButton() {
  const { mutateAsync: onDeleteGoal } = useDeleteGoal();
  const { isOpen, toggle } = useIsOpen();
  const { goBack } = useNavigation();
  const route = useRoute<RouteProp<HomeStackParamList>>();
  const id = route.params?.id;

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
          if (!id) return;
          await onDeleteGoal({ id });
          goBack();
        }}
      >
        <Text style={{ color: colors.dark, fontSize: 22, fontWeight: "bold" }}>
          목표를 삭제하시겠습니까?
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
