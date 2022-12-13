import CountTimer from "@/components.tsx/CountTimer";
import PaperBackground from "@/images/paper-background.jpg";
import styled from "styled-components";

const MainPage = () => {
  return (
    <Container
      backgroundImage={PaperBackground}
      className="grid h-screen place-items-center"
    >
      <CountTimer />
    </Container>
  );
};

export default MainPage;

const Container = styled.div<any>`
  background-image: url(${(props) => props.backgroundImage ?? ""});
  background-size: cover;
  width: 100%;
  heigth: 100%;
`;
