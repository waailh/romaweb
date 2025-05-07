import { create } from "zustand";

interface PricerState {
  ready: boolean;
  setReady: (data: boolean) => void;

  miniReady: boolean;
  setMiniReady: (data: boolean) => void;
}

export const usePricer = create<PricerState>((set) => ({
  ready: false,
  setReady: (data) => set(() => ({ ready: data })),

  miniReady: false,
  setMiniReady: (data) => set(() => ({ miniReady: data })),
}));
