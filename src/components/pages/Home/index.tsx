import { Text } from "react-native";
import styled from "styled-components/native";

export default function Page() {
  return (
    <Container>
      <Text>Home</Text>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
