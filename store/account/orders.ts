import { Order, OrderTrackState } from "@/typings";
import { create } from "zustand";

interface MyOrdersState {
  orders: Order[] | null;
  setOrders: (data: Order[] | null) => void;
  addOrders: (data: Order[]) => void;

  current_order: Order | null;

  setCurrentOrder: (data: Order) => void;

  current_Story: OrderTrackState | null;
  setCurrentStory: (data: OrderTrackState | null) => void;
}

export const useMyOrders = create<MyOrdersState>((set) => ({
  orders: null,
  current_order: null,
  setCurrentOrder: (data) => set(() => ({ current_order: data })),

  setOrders: (data) => set(() => ({ orders: data })),

  addOrders: (data) =>
    set((state) => ({ orders: [...(state.orders as []), ...data] })),

  current_Story: null,
  setCurrentStory: (data) => set(() => ({ current_Story: data })),
}));
