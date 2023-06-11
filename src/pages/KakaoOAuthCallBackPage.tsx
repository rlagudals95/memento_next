import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Container from "@/components/Container";
import { LoginMethod } from "../apis/authApi";
import { useOauthStore } from "../store/oauth";

const KakaoOAuthCallBackPage = () => {
  const router = useRouter();
  const { userInfo, requestOAuth } = useOauthStore();

  const fetchUserInfo = async (code: string) => {

    const loginResult = await requestOAuth({
      loginMethod: LoginMethod.KAKAO,
      code,
    });

    if (loginResult.registeredUser) {
      if (localStorage.getItem("accessToken")) {
        // @ts-ignore
        if (window.ReactNativeWebView) {
          postMessage({ accessToken: localStorage.getItem("accessToken") });
        } else {
          router.replace("SettingPage");
        }
      }
    } else {
      router.replace("/signUpProcessPage");
    }
  };

  useEffect(() => {
    const params = new URL(document.URL).searchParams;
    const code = params.get("code") as string;

    if (!code) {
      router.replace("/");
    }
    fetchUserInfo(code);
  }, []);

  return (
    <Container>로그인 중 입니다..</Container>
  );
};

export default KakaoOAuthCallBackPage;


