import moment from "moment";
import { useReducer } from "react";
import { Keyboard } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styled from "styled-components/native";
import { dateFormat } from "../../../constants/date";
import { colors } from "../../../utils/colors";

export default function DatePicker({
  date,
  setDate,
  placeholderText,
  minDate,
  maxDate,
}: {
  date?: Date;
  setDate: (date: Date) => void;
  placeholderText?: string;
  minDate?: Date;
  maxDate?: Date;
}) {
  const [isShow, toggleShow] = useReducer((prev) => !prev, false);

  const handlePressButton = () => {
    toggleShow();
    Keyboard.dismiss();
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    toggleShow();
  };

  console.log("date", date);

  return (
    <>
      <StyledDate onPress={handlePressButton}>
        {date && <DateText>{moment(date).format(dateFormat)}</DateText>}
        {!date && <PlaceholderText>{placeholderText}</PlaceholderText>}
      </StyledDate>
      <DateTimePickerModal
        locale="ko"
        isVisible={isShow}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={toggleShow}
        confirmTextIOS="확인"
        cancelTextIOS="취소"
        maximumDate={maxDate}
        minimumDate={minDate}
      />
    </>
  );
}

const StyledDate = styled.Pressable`
  background-color: ${colors.white};
  flex: 1;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;

const DateText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.dark};
`;

const PlaceholderText = styled(DateText)`
  color: ${colors.secondary[1]};
`;
