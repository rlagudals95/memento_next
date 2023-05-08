import CountTimer from "@/components.tsx/CountTimer";
import styled from "@emotion/styled";
import { FontSize } from "@/constants/style";

const InitPage = () => {
  return (
    <Container className="grid h-screen place-items-center ">
      mementomori는 당신의 삶의 유한함을<br/>
      상기시켜 줍니다.<br/>
      연구 결과에 의하면<br/>

      "시간은 유한하다. 당신의 남은 시간을 보여줄게요."<br/>
      "우리 인생은 한정된 기간이에요. 지금부터 당신의 시간을 함께해요."<br/>
      "모든 것은 유한해요. 자신의 삶을 책임지고 최선을 다해보아요."<br/>
      "시간이란 쉽게 가지고 놀 수 있는 것이 아니에요. 지금부터 남은 시간을 함께해요."<br/>
      "당신의 인생은 유한합니다. 자신의 시간을 더욱 소중히 여기게 해드릴게요."

    </Container>
  );
};

export default InitPage;

const Container = styled.div`
  font-size: ${FontSize.Large};
  font-weight: 700;
  padding: 16px;
`
