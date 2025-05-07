import {
  AssocProduct,
  FullProduct,
  PageMeta,
  Product,
  Review,
} from "@/typings";
import { create } from "zustand";

interface ProductsState {
  products: Product[];
  setProducts: (data: Product[]) => void;

  loading: boolean;
  setLoading: (data: boolean) => void;

  // filter slider
  sideFilter: boolean;
  setSideFilter: (data: boolean) => void;

  // single product
  mainActiveMedia: string | null;
  modalActiveMedia: string | null;
  setActiveMedia: (type: "modal" | "main", data: string | null) => void;

  // explore products page data
  page: number;
  setPage: (data: number) => void;

  // associated product
  assocProd: AssocProduct | null;
  setAssocProd: (data: AssocProduct | null) => void;

  // prod reviews
  prodRevs: Review[] | null;
  setProdRevs: (data: Review[] | null) => void;
  addProdRevs: (data: Review[]) => void;

  // from product page
  fromProductPage: boolean;
  setFromProductPage: (data: boolean) => void;

  meta: PageMeta | null;
  setMeta: (meta: PageMeta) => void;

  prod: FullProduct | null;
  setProd: (data: FullProduct | null) => void;

  miniProd: FullProduct | null;
  setMiniProd: (data: FullProduct | null) => void;
}

export const useProducts = create<ProductsState>((set) => ({
  products: [],
  setProducts: (data) => set(() => ({ products: data })),

  sideFilter: false,
  setSideFilter: (data) => set(() => ({ sideFilter: data })),

  page: 0,
  setPage: (data) => set(() => ({ page: data })),

  // Associated Product
  assocProd: null,
  setAssocProd: (data) => set(() => ({ assocProd: data })),

  // Associated Product
  prodRevs: null,
  setProdRevs: (data) => set(() => ({ prodRevs: data })),

  addProdRevs: (data) =>
    set((state) => {
      let oldRevs = state.prodRevs;
      let newRevs = oldRevs != null ? [...oldRevs, ...data] : data;
      return { prodRevs: newRevs };
    }),

  fromProductPage: false,
  setFromProductPage: (data) => set(() => ({ fromProductPage: data })),

  meta: null,
  setMeta: (data) => set(() => ({ meta: data })),

  loading: false,
  setLoading: (data) => set(() => ({ loading: data })),

  mainActiveMedia: null,
  modalActiveMedia: null,
  setActiveMedia: (type, data) =>
    set(() => {
      const media = type == "modal" ? "modalActiveMedia" : "mainActiveMedia";
      return { [media]: data };
    }),

  prod: null,
  setProd: (data) => set(() => ({ prod: data })),

  miniProd: null,
  setMiniProd: (data) => set(() => ({ miniProd: data })),
}));
