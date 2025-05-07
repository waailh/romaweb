import { create } from "zustand";

type OrderStatus = "ongoing" | "success" | "failure" | null;

interface OrderState {
  payment_method: string | null;
  setPaymentMethod: (data: string | null) => void;

  order_status: OrderStatus;
  setOrderStatus: (data: OrderStatus) => void;

  gift: number | null;
  setGift: (data: number | null) => void;
}

export const usePlaceOrder = create<OrderState>((set) => ({
  payment_method: null, // "cash_on_delivery"
  setPaymentMethod: (data) => set(() => ({ payment_method: data })),

  gift: null,
  setGift: (data) => set(() => ({ gift: data })),

  order_status: "ongoing",
  setOrderStatus: (data) => set(() => ({ order_status: data })),
}));
