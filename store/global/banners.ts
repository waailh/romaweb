import { AllBannersType } from "@/typings";
import { create } from "zustand";

interface BannersState {
  allBanners: AllBannersType | null;
  setAllBanners: (data: AllBannersType) => void;
}

export const useBanners = create<BannersState>((set) => ({
  allBanners: null,
  setAllBanners: (data) => set(() => ({ allBanners: data })),
}));
