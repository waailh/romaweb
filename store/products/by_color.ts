import { Product } from "@/typings";
import { create } from "zustand";

export type FilterVal = "all" | "with-ring" | "without-ring";

interface ByColorState {
  prods: Product[] | null;
  setProds: (data: Product[] | null) => void;
  addProds: (data: Product[]) => void;

  filter: FilterVal;
  setFilter: (data: FilterVal) => void;

  page: number;
  setPage: (data: number) => void;

  noMore: boolean;
  setNoMore: (data: boolean) => void;

  loading: boolean;
  setLoading: (data: boolean) => void;
}

export const useByColor = create<ByColorState>((set) => ({
  prods: null,
  setProds: (data) => set(() => ({ prods: data })),
  addProds: (data) => set((state) => ({ prods: [...state.prods!, ...data] })),

  filter: "all",
  setFilter: (data) => set(() => ({ filter: data })),

  page: 1,
  setPage: (data) => set(() => ({ page: data })),

  noMore: false,
  setNoMore: (data) => set(() => ({ noMore: data })),

  loading: false,
  setLoading: (data) => set(() => ({ loading: data })),
}));
