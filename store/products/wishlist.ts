import { WishlistItem } from "@/typings";
import { create } from "zustand";

interface WishlistState {
  wishlist: WishlistItem[] | null;
  setWishlist: (data: WishlistItem[] | null) => void;
}

export const useWishlist = create<WishlistState>((set) => ({
  wishlist: null,
  setWishlist: (data) => set(() => ({ wishlist: data })),
}));
