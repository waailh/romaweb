import { create } from "zustand";

interface DetailsTabsState {
  tab: string;
  setActiveTab: (data: string) => void;
}

export const useProductTabs = create<DetailsTabsState>((set) => ({
  tab: "des", // dets or revs
  setActiveTab: (data) => set(() => ({ tab: data })),
}));
