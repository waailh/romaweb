import { FlashDeal } from "@/typings";
import { create } from "zustand";

interface BranchesState {
  flashdeals: FlashDeal[] | null;
  setFlashdeals: (data: FlashDeal[]) => void;
}

export const useFlashdeals = create<BranchesState>((set) => ({
  flashdeals: null,
  setFlashdeals: (data) => set(() => ({ flashdeals: data })),
}));
