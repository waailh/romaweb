import { Category, Brand } from "@/typings";
import { create } from "zustand";

interface CatsState {
  cats: Category[] | null;
  setCats: (data: Category[]) => void;

  catBrands: Brand[] | null;
  setCatBrands: (data: Brand[] | null) => void;

  catChilds: Category[] | null;
  setCatChilds: (data: Category[] | null) => void;

  allCats: Category[] | null;
  setAllCats: (data: Category[]) => void;
}

export const useCategories = create<CatsState>((set) => ({
  cats: null,
  setCats: (data) => set(() => ({ cats: data })),

  catBrands: null,
  setCatBrands: (data) => set(() => ({ catBrands: data })),

  catChilds: null,
  setCatChilds: (data) => set(() => ({ catChilds: data })),

  allCats: null,
  setAllCats: (data) => set(() => ({ allCats: data })),
}));
