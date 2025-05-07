import { create } from "zustand";

interface ModalsState {
  powerModal: boolean;
  setPowerModal: (data: boolean) => void;

  cartModal: boolean;
  setCartModal: (data: boolean) => void;

  addRevModal: boolean;
  setAddRevModal: (data: boolean) => void;

  clearModal: boolean;
  setClearModal: (data: boolean) => void;

  couponRevealModal: boolean;
  setCouponRevealModal: (data: boolean) => void;
}

export const useGlobalModals = create<ModalsState>((set) => ({
  powerModal: false,
  setPowerModal: (data) => set(() => ({ powerModal: data })),

  cartModal: false,
  setCartModal: (data) => set(() => ({ cartModal: data })),

  addRevModal: false,
  setAddRevModal: (data) => set(() => ({ addRevModal: data })),

  clearModal: false,
  setClearModal: (data) => set(() => ({ clearModal: data })),

  couponRevealModal: false,
  setCouponRevealModal: (data) => set(() => ({ couponRevealModal: data })),
}));
