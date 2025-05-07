import { CurrencyData, Settings, SpecialDeal } from "@/typings";
import { create } from "zustand";

interface SettingsState {
  lang: "ar" | "en";

  country: string | null;
  setCountry: (data: string) => void;

  allCurrencies: CurrencyData[] | null;
  setAllCurrencies: (allCurrencies: CurrencyData[]) => void;

  settings: Settings | null;
  setSettings: (data: Settings) => void;

  specialDeal: SpecialDeal | null;
  setSpecialDeal: (data: SpecialDeal) => void;

  currency: CurrencyData | null;
  setCurrency: (data: CurrencyData) => void;
}

export const useSettings = create<SettingsState>((set) => ({
  lang: "ar",

  country: null,
  setCountry: (data) => set(() => ({ country: data || "AE" })),

  settings: null,
  setSettings: (data) => set(() => ({ settings: data })),

  allCurrencies: null,
  setAllCurrencies: (data) => set(() => ({ allCurrencies: data })),

  currency: null,
  setCurrency: (data) => set(() => ({ currency: data })),

  specialDeal: null,
  setSpecialDeal: (data) => set(() => ({ specialDeal: data })),
}));
