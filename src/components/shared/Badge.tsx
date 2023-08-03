import { ReactNode } from "react";
import styled from "styled-components/native";
import { colors } from "../../utils/colors";

interface Props {
  backgroundColor?: string;
  children: ReactNode;
}

export function Badge({ backgroundColor = colors.primary, children }: Props) {
  return (
    <Container backgroundColor={backgroundColor}>
      <StyledText>{children}</StyledText>
    </Container>
  );
}

const Container = styled.View<{ backgroundColor: string }>`
  border-radius: 20px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 5px 10px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-weight: 700;
  font-size: 16px;
  color: ${colors.dark};
`;
