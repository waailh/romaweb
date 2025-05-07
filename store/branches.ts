import { RomaBranch } from "@/typings";
import { create } from "zustand";

interface BranchesState {
  active: RomaBranch | null;
  setActiveBranch: (data: RomaBranch) => void;
}

export const useBranches = create<BranchesState>((set) => ({
  active: null,
  setActiveBranch: (data) => set(() => ({ active: data })),
}));
