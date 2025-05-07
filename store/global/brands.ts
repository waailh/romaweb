import { Brand, Category } from "@/typings";
import { create } from "zustand";

interface BrandsState {
  allColorBrands: Category[] | null;
  setAllColorBrands: (data: Category[]) => void;

  allBrands: Brand[] | null;
  setAllBrands: (data: Brand[]) => void;
}

export const useBrands = create<BrandsState>((set) => ({
  allColorBrands: null,
  setAllColorBrands: (data) => set(() => ({ allColorBrands: data })),

  allBrands: null,
  setAllBrands: (data) => set(() => ({ allBrands: data })),
}));
