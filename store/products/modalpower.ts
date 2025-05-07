import { create } from "zustand";

interface PowerState {
  mode: string | null;
  setMode: (data: string) => void;

  otherChoicePower: string | null;
  setOtherChoicePower: (data: string | null) => void;

  clear: string | null;
  setClear: (data: string | null) => void;
}

export const useModalPower = create<PowerState>((set) => ({
  mode: null,
  setMode: (data) => set(() => ({ mode: data })),

  otherChoicePower: null,
  setOtherChoicePower: (data) => set(() => ({ otherChoicePower: data })),

  clear: null,
  setClear: (data) => set(() => ({ clear: data })),
}));
