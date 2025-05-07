import { fetchUserData, getToken } from "@/lib/auth/auth";
import { Counts, User } from "@/typings";
import { create } from "zustand";

interface GlobalsState {
  navScrolled: boolean;
  setScrolled: (data: boolean) => void;

  isCartOpen: boolean;
  toggleCart: () => void;

  mobileNav: boolean;
  setMobileNav: (data: boolean) => void;

  mobileSearchLayer: boolean;
  setMobileSearchLayer: (data: boolean) => void;

  isMobileLayout: boolean | undefined;
  setIsMobileLayout: (isMobile: boolean) => void;

  token: string | null;
  user: User | null;

  setCounts: (counts: Counts) => void;
  changeCounts: (which: string, op: string, by: number) => void;

  getUserData: () => void;
  handleSignIn: (user: User, token?: string) => void;
  logout: () => void;
}

export const useGlobals = create<GlobalsState>((set) => {
  const getUserData = () => {
    fetchUserData().then((res) => {
      if (res) handleSignIn(res.user, res.token);
    });
  };

  const handleSignIn = (user: User, token?: string) => {
    const guestStorage = "ecom_guest_token";
    const userStorage = "ecom_token";
    const storageName = user.guest ? guestStorage : userStorage;

    if (token) localStorage.setItem(storageName, token);

    // if chosen to be guest remove user since he can login again, but not vice versa: if user save the guest data
    if (storageName == guestStorage)
      localStorage.removeItem(user.guest ? userStorage : guestStorage);

    set({ user: user });
  };

  // // Function to handle user logout
  const logout = () => {
    localStorage.removeItem("ecom_token");
    set({ user: null });
  };

  return {
    navScrolled: false,
    setScrolled: (data) => set(() => ({ navScrolled: data })),

    isCartOpen: false,
    toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

    mobileNav: false,
    setMobileNav: (data) => set((state) => ({ mobileNav: data })),

    mobileSearchLayer: false,
    setMobileSearchLayer: (data) =>
      set((state) => ({ mobileSearchLayer: data })),

    isMobileLayout: undefined,
    setIsMobileLayout: (isMobile) => set(() => ({ isMobileLayout: isMobile })),

    setCounts: (data) =>
      set((state) => ({ user: { ...state.user!, counts: data } })),

    changeCounts: (wh, op, by) =>
      set((state) => {
        let newCounts;
        switch (wh) {
          case "cart":
            switch (op) {
              case "add":
                newCounts = {
                  ...state.user?.counts!,
                  cart_item_count: state.user?.counts?.cart_item_count! + by,
                };
                break;

              default:
                newCounts = {
                  ...state.user?.counts!,
                  cart_item_count: state.user?.counts?.cart_item_count! - by,
                };
                break;
            }
            break;

          default:
            switch (op) {
              case "add":
                newCounts = {
                  ...state.user?.counts!,
                  wishlist_item_count:
                    state.user?.counts?.wishlist_item_count! + by,
                };
                break;

              default:
                newCounts = {
                  ...state.user?.counts!,
                  wishlist_item_count:
                    state.user?.counts?.wishlist_item_count! - by,
                };
                break;
            }
            break;
        }
        return { user: { ...state.user!, counts: newCounts } };
      }),

    // serious
    token: getToken(),
    user: null,

    getUserData,
    handleSignIn,
    logout,
  };
});
