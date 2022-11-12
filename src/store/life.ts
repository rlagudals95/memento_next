import create from "zustand";
import { SEX } from "@/constants";

interface ILife {
  lifeExpectancy: number;
  setLifeExpectancy: (payload: number) => void;
  decrease: () => void;
  sex: SEX | null;
}

export const useLifeStore = create<ILife>((set) => ({
  lifeExpectancy: 0,
  sex: null,
  setLifeExpectancy: (payload: number) => {
    set((state) => ({ ...state, lifeExpectancy: payload }));
  },
  decrease: () => {
    set((state) => ({ ...state, lifeExpectancy: state.lifeExpectancy - 1 }));
  },
}));
