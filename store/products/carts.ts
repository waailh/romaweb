import { create } from "zustand";
import { CartResponse, Choice, SpecialProductInfo } from "@/typings";

type ChoiceType = "main" | "modal";

type Choices = {
  mainChoice: Choice;
  modalChoice: Choice;
};

interface CartsState {
  choices: Choices;
  cart: CartResponse | null;

  specialItem: SpecialProductInfo | null;
  setSpecialItem: (data: SpecialProductInfo | null) => void;

  cartTrigger: boolean;
  triggerCart: () => void;

  setChoice: (type: ChoiceType, data: Choice) => void;
  setChoiceAtt: (type: ChoiceType, data: { id: number; value: string }) => void;
  setChoiceColor: (type: ChoiceType, data: string) => void;
  setChoiceQuantity: (type: ChoiceType, data: number) => void;
  setChoiceAvailable: (type: ChoiceType, data: boolean) => void;
  setChoiceVariant: (type: ChoiceType, data: string | null) => void;
  setChoicePrice: (type: ChoiceType, data: number | null) => void;
  resetChoice: (type: ChoiceType) => void;

  setCart: (data: CartResponse) => void;

  selectedPackageOptions: Record<string, string>;
  setSelectedPackageOption: (optionName: string, choice: string) => void;
  resetSelectedPackageOption: () => void;

  countsTrigger: boolean;
  triggerCounts: () => void;
}

const initialChoice: Choice = {
  // id: null,
  quantity: 1,
  // color: null,
  attributes: [],
  available: true,
  // variant: null,
  price: undefined,
};

const initialChoices: Choices = {
  mainChoice: initialChoice,
  modalChoice: initialChoice,
};

export const useCartsStore = create<CartsState>((set) => ({
  choices: initialChoices,

  cart: null,
  setCart: (data) => set(() => ({ cart: data })),

  specialItem: null,
  setSpecialItem: (data) => set(() => ({ specialItem: data })),

  cartTrigger: false,
  triggerCart: () => set((state) => ({ cartTrigger: !state.cartTrigger })),

  setChoice: (type, data) =>
    set((state) => ({
      choices: {
        ...state.choices,
        [`${type}Choice`]: data,
      },
    })),

  setChoiceColor: (type, data) =>
    set((state) => ({
      choices: {
        ...state.choices,
        [`${type}Choice`]: {
          ...state.choices[`${type}Choice`],
          color: data,
        },
      },
    })),

  setChoiceQuantity: (type, data) =>
    set((state) => ({
      choices: {
        ...state.choices,
        [`${type}Choice`]: {
          ...state.choices[`${type}Choice`],
          quantity: data,
        },
      },
    })),

  setChoicePrice: (type, data) =>
    set((state) => ({
      choices: {
        ...state.choices,
        [`${type}Choice`]: {
          ...state.choices[`${type}Choice`],
          price: data,
        },
      },
    })),

  setChoiceAvailable: (type, data) =>
    set((state) => ({
      choices: {
        ...state.choices,
        [`${type}Choice`]: {
          ...state.choices[`${type}Choice`],
          available: data,
        },
      },
    })),

  setChoiceVariant: (type, data) =>
    set((state) => ({
      choices: {
        ...state.choices,
        [`${type}Choice`]: {
          ...state.choices[`${type}Choice`],
          variant: data,
        },
      },
    })),

  setChoiceAtt: (type, data) =>
    set((state) => {
      const { id, value } = data;
      const choice = state.choices[`${type}Choice`];
      const updatedAttributes = choice.attributes.map((attr) =>
        attr.id === id ? { ...attr, value } : attr
      );
      if (!choice.attributes.some((attr) => attr.id === id)) {
        updatedAttributes.push({ id, value });
      }
      return {
        choices: {
          ...state.choices,
          [`${type}Choice`]: {
            ...choice,
            attributes: updatedAttributes,
          },
        },
      };
    }),

  resetChoice: (type) =>
    set((state) => {
      return {
        choices: {
          ...state.choices,
          [`${type}Choice`]: initialChoice,
        },
      };
    }),

  selectedPackageOptions: {},
  setSelectedPackageOption: (optionName, choice) =>
    set((state) => ({
      selectedPackageOptions: {
        ...state.selectedPackageOptions,
        [optionName]: choice,
      },
    })),

  resetSelectedPackageOption: () => set(() => ({ selectedPackageOptions: {} })),

  countsTrigger: false,
  triggerCounts: () =>
    set((state) => ({ countsTrigger: !state.countsTrigger })),
}));
