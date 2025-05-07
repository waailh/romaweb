import { create } from "zustand";

type Step = "data" | "payment";

interface MyOrdersState {
  step: Step;
  setStep: (data: Step) => void;
}

export const useCheckout = create<MyOrdersState>((set) => ({
  step: "data",
  setStep: (data) => set(() => ({ step: data })),
}));
