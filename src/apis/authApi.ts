/* eslint-disable no-useless-catch */
import { MessageType, postMessage } from "@/helpers/messageHelper";
import { StatusCodes } from "http-status-codes";
import { backEndUrl } from "@/constants";
import AxiosInstance from "./AxiosInstance";

export interface ILoginRequest {
  user_id: string;
  password: string;
}

export interface ILoginResponse {
  accessToken?: string;
  registeredUser: boolean;
  tempToken?: string;
}

export type IRefreshResponse = ILoginResponse;
export type IVerifyResponse = ILoginResponse;

export interface IApiKeyResponse {
  api_key: string;
}

export type IIssueApiKeyResponse = IApiKeyResponse;
export type IGetApiKeyResponse = IApiKeyResponse;

export interface IError {
  code: string;
  message: string;
}

export interface ITempUserInfo {
  phone?: string;
  id?: string;
  loginMethod?: string;
  email?: string;
  name: string;
  personalCustomsCode?: string;
}

export enum LoginMethod {
  KAKAO = "kakao",
  NAVER = "naver",
  APPLE = "apple",
}

export interface IOauthRequest {
  loginMethod: LoginMethod;
  code?: string;
  token?: string;
}

export interface ISendPhoneRequest {
  phone: string;
}

export interface IVerifySmsRequest {
  verificationCode: string;
}

export interface IAgreementRequest {
  marketingAgreedAt: number;
  marketingAgreement: string[];
}

export interface ISendPhoneResponse {
  success: boolean;
}

class AuthApi {
  public static async issueToken(
    payload: ILoginRequest
  ): Promise<ILoginResponse | IError> {
    try {
      const url = `https://${backEndUrl()}/ohzig/v1/auth/issue`;
      const result = await AxiosInstance.post(url, payload);

      if (result.status !== StatusCodes.OK) {
        console.error(`Axios error status: ${result.status}`);
      }
      return result.data as ILoginResponse;
    } catch (error) {
      throw error;
    }
  }

  public static async loginOAuth(
    OAuthRequest: IOauthRequest
  ): Promise<ILoginResponse | IError> {
    try {
      const url = `https://${backEndUrl()}/mementomori/v1/auth/oauth/${
        OAuthRequest.loginMethod
      }?code=${OAuthRequest.code ?? ""}&token=${OAuthRequest.token ?? ""}`;
      const result = await AxiosInstance.get(url);

      if (result.status !== StatusCodes.OK) {
        console.error(`Axios error status: ${result.status}`);
      }

      if (result.data.registeredUser) {
        AxiosInstance.defaults.headers.common.authorization = `Bearer ${result.data.accessToken}`;
        localStorage.setItem("accessToken", `${result.data.accessToken}`);

        postMessage({ type: MessageType.auth, body: result.data.accessToken });
      }

      return result.data as ILoginResponse;
    } catch (error) {
      throw error;
    }
  }

  public static async refreshToken(): Promise<IRefreshResponse | IError> {
    try {
      const url = `https://${backEndUrl()}/ohzig/v1/auth/refresh`;
      const result = await AxiosInstance.post(url);

      if (result.status !== StatusCodes.OK) {
        console.error(`Axios error status: ${result.status}`);
      }

      AxiosInstance.defaults.headers.common.Authorization =
        result.data.accessToken;
      return result.data as IRefreshResponse;
    } catch (error) {
      throw error;
    }
  }

  public static async sendPhone(
    payload: ISendPhoneRequest
  ): Promise<ISendPhoneResponse> {
    try {
      const url = `https://${backEndUrl()}/ohzig/v1/auth/sms/send`;
      const result = await AxiosInstance.post(url, payload);
      if (result.status !== StatusCodes.OK) {
        console.error(`Axios error status: ${result.status}`);
      }
      return result.data;
    } catch (error) {
      throw error;
    }
  }

  public static async verifySms(payload: IVerifySmsRequest): Promise<boolean> {
    try {
      const url = `https://${backEndUrl()}/ohzig/v1/auth/sms/verify`;
      const result = await AxiosInstance.post(url, payload);

      return result.data.success;
    } catch (error) {
      throw error;
    }
  }

  public static async sendAgreement(
    payload: IAgreementRequest
  ): Promise<ILoginResponse> {
    try {
      const url = `https://${backEndUrl()}/ohzig/v1/auth/agreement`;
      const result = await AxiosInstance.post(url, payload);

      AxiosInstance.defaults.headers.common.authorization = `Bearer ${result.data.accessToken}`;

      // @ts-ignore
      if (window?.ReactNativeWebView) {
        postMessage({ type: MessageType.auth, body: result.data.accessToken });
      }

      return result.data.success;
    } catch (error) {
      throw error;
    }
  }

  public static async getTempUserInfo(): Promise<ITempUserInfo> {
    try {
      const url = `https://${backEndUrl()}/ohzig/v1/users/temp`;
      const result = await AxiosInstance.get(url);

      return result.data;
    } catch (error) {
      throw error;
    }
  }

  public static async setTempUserInfo(
    payload: ITempUserInfo
  ): Promise<boolean> {
    try {
      const url = `https://${backEndUrl()}/ohzig/v1/users/temp`;
      const result = await AxiosInstance.post(url, payload);

      return result.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthApi;
