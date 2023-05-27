import React, { useCallback } from "react";
// import { postMessage } from "@/helpers/messageHelper";
// import AppleLogo from "@images/apple-logo.png";
// import NaverLogo from "@images/naver-logo.png";
// import CloseIcon from "@images/pictogram-line-close.svg";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import KakaoLogo from "../images/kakao-logo.png";
import { Color } from "../constants/Color";

const Title = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 150%;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.6px;
  color: ${Color.GREY_870};
`;

const Logo = styled.img<any>`
  width: 24px;
  height: 24px;
  object-fit: fit;
`;

const ButtonInfo = styled.div<{ margin?: string }>`
  margin: ${(props) => props.margin ?? "auto 0 auto 0.5rem"};
  align-items: center;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;
  letter-spacing: -0.02em;
`;

const InquiryButtonInfo = styled.div`
  font-size: 0.875rem;
  line-height: 1.5rem;
  text-align: center;
  letter-spacing: -0.6px;
  text-decoration-line: underline;
  color: ${Color.GREY_500};
`;

const ButtonsContainer = styled.div`
  margin-top: 15rem;
`;

function SignUpPage() {

  const router = useRouter();

  const handleClickRequestKakaoAuth = useCallback(() => {
    
    const config = {
      client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
      redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
      response_type: "code",
    };
    
    const queryString = Object.entries(config)
      // @ts-ignore
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    
    window.location.href = `https://kauth.kakao.com/oauth/authorize?${queryString}`;
  }, []);

  const handleOnClickRequestNaverAuth = useCallback(() => {
    const config = {
      client_id: process.env.NAVER_CLIENT_ID,
      redirect_uri: process.env.NAVER_REDIRECT_URI,
      response_type: "code",
      state: "1234",
    };

    const queryString = Object.entries(config)
      // @ts-ignore
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?${queryString}`;
  }, []);

  const handleOnClickRequestAppleAuth = useCallback(() => {
    const config = {
      client_id: process.env.APPLE_CLIENT_ID,
      redirect_uri: process.env.APPLE_REDIRECT_URI,
      response_type: "code id_token",
      state: "origin:web",
      scope: "email name",
      response_mode: "form_post",
      m: 11,
    };
    const queryString = Object.entries(config)
      // @ts-ignore
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    window.location.href = `https://appleid.apple.com/auth/authorize?${queryString}`;
  }, []);

  const handleOnClickGoMain = useCallback(() => {
    router.replace("/");
  }, []);

  const handleOnClickGoChanneltalk = () => {
    window.location.href = "https://ohzig.channel.io/";
  };

  return (
    <div className="bg-secondary-1 flex items-center min-h-screen bg-white">
      <div className="container max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <div className="mx-auto my-1 items-center flex flex-col justify-center">
          <ButtonsContainer>
            {/* <Button
              onClick={handleOnClickRequestNaverAuth}
            >
              <Logo src={NaverLogo} />
              <ButtonInfo>네이버로 시작하기</ButtonInfo>
            </Button> */}
            <Button
              style={{ marginTop: "20px" }}
              className="my-3"
              color="primary"
              onClick={handleClickRequestKakaoAuth}
            >
              {/* <Logo src={KakaoLogo} /> */}
              카카오로 시작하기
            </Button>

            {/* <Button
  
              onClick={handleOnClickRequestAppleAuth}
            >
              <Logo src={AppleLogo} />
              <ButtonInfo>Apple로 시작하기</ButtonInfo>
            </Button> */}
            {/* <Button
              onClick={handleOnClickGoMain}
            >
              <ButtonInfo margin={"0"}>로그인없이 일단 둘러보기</ButtonInfo>
            </Button> */}

            {/* <Button
              styleCustom={{
                background: "",
                margin: "1.9rem 0 0 0",
                color: Color.GREY_600,
              }}
              onClick={handleOnClickGoChanneltalk}
            >
              <InquiryButtonInfo>로그인에 문제가 있으신가요?</InquiryButtonInfo>
            </Button> */}
          </ButtonsContainer>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;

