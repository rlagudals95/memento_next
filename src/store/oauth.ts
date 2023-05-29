import create from "zustand";
import AuthApi, {
  IError,
  ILoginResponse,
  IOauthRequest,
  ISendPhoneRequest,
  IVerifySmsRequest,
  IAgreementRequest,
  ITempUserInfo,
} from "../apis/authApi";

interface IOauth {
  userInfo?: ILoginResponse | IError;
  tempUserInfo?: ITempUserInfo | null;
  requestOAuth: (OAuthRequest: IOauthRequest) => Promise<ILoginResponse>;
  verifySms: (payload: IVerifySmsRequest) => void;
  sendAgreement: (payload: IAgreementRequest) => void;
  setLoading: (payload: boolean) => void;
  isVerify: boolean | null;
  loading: boolean;
  getTempUserInfo: () => Promise<ITempUserInfo>;
  setTempUserInfo: (payload: ITempUserInfo) => void;
}

export const useOauthStore = create<IOauth>((set) => ({
  isVerify: null,
  loading: false,
  tempUserInfo: null,
  requestOAuth: async (
    OAuthRequest: IOauthRequest
  ): Promise<ILoginResponse> => {
    const response = (await AuthApi.loginOAuth(OAuthRequest)) as ILoginResponse;
    const accessToken = response?.accessToken ?? null;
    set((state) => ({ ...state, userInfo: response, accessToken }));
    return response as ILoginResponse;
  },
  verifySms: async (payload: IVerifySmsRequest) => {
    const response = await AuthApi.verifySms(payload);
    set((state) => ({ ...state, isVerify: response }));
  },
  sendAgreement: async (payload: IAgreementRequest) => {
    const response = await AuthApi.sendAgreement(payload);
    set((state) => ({ ...state }));
  },
  setLoading: (payload: boolean) => {
    set((state) => ({ ...state, loading: payload }));
  },
  getTempUserInfo: async () => {
    const response = await AuthApi.getTempUserInfo();
    set((state) => ({ ...state, tempUserInfo: response }));
    return response;
  },
  setTempUserInfo: async (payload: ITempUserInfo) => {
    const response = await AuthApi.setTempUserInfo(payload);
  },
}));
