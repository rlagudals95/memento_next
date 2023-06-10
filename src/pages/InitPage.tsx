import styled from "@emotion/styled";
import { FontSize } from "@/constants/style";
import SimpleSlider from "@/components/SimpleSlider";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { Color } from "@/constants/Color";
import { useUserStore } from "@/store";
import { MessageType, postMessage } from "@/helpers/messageHelper";
import { FontGraphicChange } from "@/elements/FontGraphicChange";

const InitPage = () => {

  const Container = styled.div` 
    font-size: ${FontSize.XLarge};
    font-weight: 900;
    color: black;
    width: 100vw;
  `

  const Section = styled.div`
    width: 100%;
    height: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: ${FontSize.XLarge};
  `

  const router = useRouter();
  const { setUserInfo } = useUserStore();

  const onMessageHandler = useCallback((e: any) => {

    const response = JSON.parse(e.data);
    const messageBody = response.body;

    if (messageBody?.birthday) {
      setUserInfo({
        birthday: messageBody?.birthday,
        name: messageBody.name,
        sex: messageBody.sex
      })
      router.replace("/MainPage");
    }
  }, [])


  useEffect(() => {
    postMessage({ type: MessageType.hasUserInfo });
  }, []);

  useEffect(() => {
    const isUIWebView = () => {
      return navigator.userAgent
        .toLowerCase()
        .match(/\(ip.*applewebkit(?!.*(version|crios))/)
    }

    const receiver = isUIWebView() ? window : document

    receiver.addEventListener('message', onMessageHandler)

    return () => {
      receiver.removeEventListener('message', onMessageHandler)
    }
  }, [])


  const handleClickGoSettingPage = useCallback(() => {
    router.replace("/SettingPage");
  }, [])

  const SectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
  `

  const sectionList: React.ReactNode[] = [
    // eslint-disable-next-line react/jsx-key
    <SectionWrapper className="fade-in">
      <FontGraphicChange/>
    </SectionWrapper>,
    // eslint-disable-next-line react/jsx-key
    <SectionWrapper className="fade-in">죽음이 멀리 있고 대수롭지 않은 것으로 느껴질 때에는 우리 삶은 게을러져.<br />
      하지만 언제라도 죽음과 만나리라는 것을 알았을 때 인간은 보다 나은 삶을 살아갈 수 있지.</SectionWrapper>,
    // eslint-disable-next-line react/jsx-key
    <SectionWrapper>
      <div className="fade-in">
        우리 인생은 한정된 기간이에요 당신의 남은 시간을 보여줄게요
        지금부터 당신의 시간을 함께해요
      </div>
      <div style={{
        position: 'fixed',
        bottom: '-40px',
        width: '100%',
        zIndex: 9999,
        background: 'white',
        height: 'fit-content',
        fontSize: FontSize.Mideum
      }}>
        <Button
          styleCustom={{
            width: "100%",
            height: "2.7rem",
            background: "none",
            border: `1px solid ${Color.GREY_870}`,
            borderRadius: "6.25rem",
            margin: "16px 0 0 0",
          }}
          onClick={handleClickGoSettingPage}
        >
          <p style={{fontWeight: 700}}>mementomori</p>
        </Button>
      </div>
    </SectionWrapper>,
  ]


  return (
    <Container className="grid h-screen text-center">
      <SimpleSlider>
        {sectionList.map((section, index) =>
          <Section key={index}>{section}</Section>
        )}
      </SimpleSlider>
    </Container>
  );
};

export default InitPage;

// 죽음이 멀리 있고 대수롭지 않은 것으로 느껴질 때에는 우리 삶은 게을러져. <br />
// 하지만 언제라도 죽음과 만나리라는 것을 알았을 때 인간은 보다 나은 삶을 살아갈 수 있지.   <br />
// 우리는 언제라도 죽을 수 있다는 관점에서 바라보면, 삶은 당연한 권리가 아니라 소중한 선물이야.   <br />
// 이처럼 죽음의 진정한 의미는 언젠가 없어질 수 있는 자신의 삶에 대해 소중한 의미를 부여할 때 제대로 드러나.   <br />
// 살아 있는 우리가 죽음을 거론하는 까닭도 여기에 있어. *


