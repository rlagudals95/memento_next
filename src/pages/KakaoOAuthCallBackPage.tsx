import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Container from "@/components/Container";
import { Loading } from "@/elements/Loading";
import { LoginMethod } from "../apis/authApi";
import { useOauthStore } from "../store/oauth";

const KakaoOAuthCallBackPage = () => {
  const router = useRouter();
  const { requestOAuth } = useOauthStore();

  const fetchUserInfo = async (code: string) => {
    const loginResult = await requestOAuth({
      loginMethod: LoginMethod.KAKAO,
      code,
    });

    console.log("loginResult : ", loginResult)
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
    return;
    const params = new URL(document.URL).searchParams;
    const code = params.get("code") as string;

    if (!code) {
      router.replace("/");
    }
    fetchUserInfo(code);
  }, []);

  return (
    <Container><Loading /></Container>
  );
};

export default KakaoOAuthCallBackPage;


