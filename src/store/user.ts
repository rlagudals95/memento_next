import { SEX } from "@/constants";
import create from "zustand";

export interface IUserInfo {
  birthday: string;
  sex: SEX | null;
  name: string
}

interface IUser {
  userInfo: IUserInfo;
  setUserInfo: (payload: IUserInfo) => void;
}

export const useUserStore = create<IUser>((set) => ({
  userInfo: {
    birthday: "",
    sex: null,
    name: ""
  },
  setUserInfo: (payload: IUserInfo) => {
    set((state) => ({ ...state, userInfo: payload }));
  },
}));
