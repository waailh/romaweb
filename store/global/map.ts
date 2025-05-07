import { create } from "zustand";

interface MapState {
  // autocomplete
  autoComplete: google.maps.places.Autocomplete | null;
  setAutoComplete: (data: google.maps.places.Autocomplete | null) => void;
}

export const useGoogleMap = create<MapState>((set) => ({
  autoComplete: null,
  setAutoComplete: (data) => set(() => ({ autoComplete: data })),
}));
