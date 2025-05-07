import { Address, AddressForm, OurCountry } from "@/typings";
import { create } from "zustand";

type State = "view" | "edit" | "add";

interface MyOrdersState {
  state: State;

  setAddressesState: (data: State) => void;

  addresses: Address[] | null;
  setAddresses: (data: Address[]) => void;
  removeAddress: (id: number) => void;
  verifyAddressBadge: (id: number) => void;
  setAddressDefault: (id: number) => void;

  current_address: Address | null;

  setCurrentAddress: (data: Address) => void;

  addressOtpModal: number | null; // store the id of the added address
  setAddressOtpModal: (data: number | null) => void;

  ourCountries: OurCountry[];
  setOurCountries: (data: OurCountry[]) => void;
}

export const useAddresses = create<MyOrdersState>((set) => ({
  state: "view",
  setAddressesState: (data) => set(() => ({ state: data })),

  addresses: null,
  setAddresses: (data) => set(() => ({ addresses: data })),
  removeAddress: (id) =>
    set((state) => ({
      addresses: state.addresses?.filter((adr) => adr.id !== id),
    })),

  verifyAddressBadge: (id) =>
    set((state) => ({
      addresses: state.addresses?.map((adr) => {
        return adr.id == id ? { ...adr, verified: true } : adr;
      }),
    })),

  setAddressDefault: (id) =>
    set((state) => ({
      addresses: state.addresses?.map((adr) => {
        return adr.id == id
          ? { ...adr, set_default: 1 }
          : { ...adr, set_default: 0 };
      }),
    })),

  current_address: null,

  setCurrentAddress: (data) => set(() => ({ current_address: data })),

  addressOtpModal: null,
  setAddressOtpModal: (data) => set(() => ({ addressOtpModal: data })),

  ourCountries: [],
  setOurCountries: (data) => set(() => ({ ourCountries: data })),
}));
