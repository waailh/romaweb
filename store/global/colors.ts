import { Brand, Color } from "@/typings";
import { create } from "zustand";

interface ColorsState {
  allColors: Color[] | null;
  setAllColors: (data: Color[]) => void;
}

export const useColors = create<ColorsState>((set) => ({
  allColors: null,
  setAllColors: (data) => set(() => ({ allColors: data })),
}));
