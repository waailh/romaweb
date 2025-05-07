import { create } from "zustand";

type ModalState = "login" | "register" | "reset" | null;

interface AccountAuthState {
  modal: ModalState;
  setAuthModal: (data: ModalState) => void;
}

export const useAccountAuth = create<AccountAuthState>((set) => ({
  // modal: "register",
  modal: null,
  setAuthModal: (data) => set(() => ({ modal: data })),
}));
