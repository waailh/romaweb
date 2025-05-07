// import { create } from "zustand";
// import { usePower } from "./power";
// import { CartResponse, Choice } from "@/typings";

// interface CartsState {
//   choice: Choice;
//   cart: CartResponse | null;

//   altChoice: Choice;
//   setAltChoice: () => void;
//   regainChoice: () => void;

//   loadings: { choice: boolean };
//   setChoiceLoading: (data: boolean) => void;

//   setChoice: (data: Choice) => void;
//   setChoiceAtt: (data: { id: number; value: string }) => void;
//   setChoiceColor: (data: string) => void;
//   setChoiceQuantity: (data: number) => void;
//   setChoiceAvailable: (data: boolean) => void;
//   setChoiceVariant: (data: string | null) => void;

//   resetChoice: () => void;

//   setCart: (data: CartResponse) => void;

//   countsTrigger: boolean;
//   triggerCounts: () => void;
// }

// const initialChoice = {
//   id: null,
//   quantity: 1,
//   color: null,
//   attributes: [],
//   available: true,
//   variant: null,
// };

// const initialLoadings = {
//   choice: false,
// };

// export const useCarts = create<CartsState>((set) => ({
//   choice: initialChoice,

//   loadings: initialLoadings,

//   setChoiceLoading: (data) =>
//     set((state) => ({ loadings: { ...state.loadings, choice: data } })),

//   cart: null,
//   setCart: (data) => set(() => ({ cart: data })),

//   countsTrigger: false,

//   setChoice: (data) => set(() => ({ choice: data })),

//   setChoiceColor: (data) =>
//     set((state) => {
//       let choic = state.choice;
//       choic.color = data;
//       return { choice: choic };
//     }),

//   setChoiceQuantity: (data) =>
//     set((state) => ({ choice: { ...state.choice, quantity: data } })),

//   setChoiceAvailable: (data) =>
//     set((state) => ({ choice: { ...state.choice, available: data } })),

//   setChoiceVariant: (data) =>
//     set((state) => ({ choice: { ...state.choice, variant: data } })),

//   setChoiceAtt: (data) =>
//     set((state) => {
//       const { id, value } = data;
//       const updatedAttributes = state.choice.attributes.map((attr) =>
//         attr.id === id ? { ...attr, value } : attr
//       );

//       const attributeExists = state.choice.attributes.some(
//         (attr) => attr.id === id
//       );
//       if (!attributeExists) {
//         updatedAttributes.push({ id, value });
//       }

//       let choic = state.choice;
//       choic.attributes = updatedAttributes;

//       return { choice: choic };
//     }),

//   resetChoice: () =>
//     set(() => {
//       const setOtherChoicePower = usePower.getState().setOtherChoicePower;
//       setOtherChoicePower(null);

//       return { choice: { ...initialChoice, variant: null } };
//     }),

//   altChoice: initialChoice,
//   setAltChoice: () =>
//     set((state) => ({ altChoice: state.choice, choice: initialChoice })),
//   regainChoice: () =>
//     set((state) => ({ choice: state.altChoice, altChoice: initialChoice })),

//   triggerCounts: () =>
//     set((state) => ({ countsTrigger: !state.countsTrigger })),
// }));
