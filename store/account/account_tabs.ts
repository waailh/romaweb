import { create } from "zustand";

interface DetailsTabsState {
  tab: string;
  setActiveTab: (data: string) => void;
}

export const useAccountTabs = create<DetailsTabsState>((set) => ({
  tab: "addresses", // orders, addresses
  setActiveTab: (data) => set(() => ({ tab: data })),
}));
