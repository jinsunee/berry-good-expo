import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { HomeStackParamList } from "components/navigators/HomeStackNavigator";
import { useGoalItem } from "hooks/useGoalItem";
import { useFormContext } from "react-hook-form";
import { Text } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../utils/colors";
import DeleteButton from "./DeleteButton";
import { ItemFormInputs } from "./ItemFormProvider";
import { useAddGoalItem } from "./hooks/useAddGoalItem";
import { useUpdateGoalItem } from "./hooks/useUpdateGoalItem";

export function BottomArea() {
  const {
    handleSubmit,
    formState: { errors, isValid },
  } = useFormContext<ItemFormInputs>();
  const route = useRoute<RouteProp<HomeStackParamList, "Item">>();
  const goalItem = useGoalItem({ date: route.params?.date });
  const { mutateAsync: onAddGoalItem } = useAddGoalItem();
  const { mutateAsync: onUpdateGoalItem } = useUpdateGoalItem();
  const { goBack } = useNavigation();

  const mode = goalItem ? "edit" : "create";

  const onSubmitItem = async (inputs: ItemFormInputs) => {
    if (mode === "create") {
      await onAddGoalItem(inputs);
    } else if (mode === "edit") {
      await onUpdateGoalItem(inputs);
    }

    goBack();
  };

  return (
    <Container>
      {mode === "edit" && <DeleteButton />}
      <SaveButton
        disabled={!isValid}
        isActive={isValid}
        onPress={handleSubmit(onSubmitItem)}
      >
        <Text
          style={{
            color: colors.white,
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          저장
        </Text>
      </SaveButton>
    </Container>
  );
}

const Container = styled.View`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const SaveButton = styled.TouchableOpacity<{ isActive: boolean }>`
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  flex: 1;
  background-color: ${({ isActive }) =>
    isActive ? colors.dark : colors.secondary[1]};
`;
