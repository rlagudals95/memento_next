import React from "react";
import { useNavigate } from "react-router-dom";
import ResponsiveContainer from "@components/web/ResponsiveContainer";
import { LoginMethod } from "../apis/authApi";
import { useOauthStore } from "../../store/oauth";

const KakaoOAuthCallBackPage = () => {
  const { userInfo, OAuthRequest } = useOauthStore();

  const params = new URL(document.URL).searchParams;
  const code = params.get("code") as string;

  const navigate = useNavigate();

  const fetchUserInfoAndSet = async () => {
    const loginResult = await OAuthRequest({
      loginMethod: LoginMethod.KAKAO,
      code,
    });

    if (loginResult.registeredUser) {
      if (localStorage.getItem("accessToken")) {
        if (window.ReactNativeWebView) {
          postMessage({ accessToken: localStorage.getItem("accessToken") });
        } else {
          navigate("/");
        }
      }
    } else {
      navigate("/signUpProcessPage");
    }
  };

  React.useEffect(() => {
    if (!code) {
      navigate("/");
    }
    fetchUserInfoAndSet();
  }, []);

  return (
    <div>로그인 중 입니다..</div>
  );
};

export default KakaoOAuthCallBackPage;


