import { create } from "zustand";

type Filter = {
  keyword: string; // search

  colors: string[]; // colors
  brands: number[]; // brand ids
  price: { min: number; max: number | null };
  rating: number[]; // array of numbers for multi rate selection
  dynamic: { attribute_id: number; values: string[] }[];

  // for colored lenses
  usages: string[]; // usages
  styles: string[]; // styles
};

type Parameter =
  | "add_brand"
  | "remove_brand"
  | "add_color"
  | "remove_color"
  | "price_min"
  | "price_max"
  | "add_rating"
  | "remove_rating"

  // for colored lenses
  | "add_usage"
  | "remove_usage"
  | "add_style"
  | "remove_style";

interface FiltersState {
  filter: Filter;
  setFilter: (parameter: Parameter, value: string | number) => void;

  resetFilter: () => void;

  setDynamicFilter: (attribute_id: number, value: string) => void;
  setKeyword: (data: string) => void;
}

const initialFilter = {
  keyword: "",
  brands: [],
  colors: [],
  price: { min: 0, max: null },
  rating: [],
  dynamic: [],

  usages: [],
  styles: [],
};

export const useFilters = create<FiltersState>((set) => ({
  filter: initialFilter,
  setFilter: (parameter, value) =>
    set((state) => {
      let newFilter = { ...state.filter };

      switch (parameter) {
        // brands

        case "add_brand":
          if (!newFilter.brands) newFilter.brands = [];
          newFilter.brands = [...newFilter.brands, value as number];
          break;
        case "remove_brand":
          if (newFilter.brands) {
            newFilter.brands = newFilter.brands.filter(
              (brand) => brand !== value
            );
          }
          break;

        // color
        case "add_color":
          if (!newFilter.colors) newFilter.colors = [];
          newFilter.colors = [...newFilter.colors, value as string];
          break;
        case "remove_color":
          if (newFilter.colors) {
            newFilter.colors = newFilter.colors.filter(
              (color) => color !== value
            );
          }
          break;

        //   price
        case "price_min":
          if (!newFilter.price) newFilter.price = { min: 0, max: null };
          newFilter.price.min = value as number;
          break;
        case "price_max":
          if (!newFilter.price) newFilter.price = { min: 0, max: null };
          newFilter.price.max = value as number;
          break;

        //   rating
        case "add_rating":
          if (!newFilter.rating) newFilter.rating = [];
          newFilter.rating = [...newFilter.rating, value as number];
          break;
        case "remove_rating":
          if (newFilter.rating) {
            newFilter.rating = newFilter.rating.filter(
              (rating) => rating !== value
            );
          }
          break;

        // usage
        case "add_usage":
          if (!newFilter.usages) newFilter.usages = [];
          newFilter.usages = [...newFilter.usages, value as string];
          break;
        case "remove_usage":
          if (newFilter.usages) {
            newFilter.usages = newFilter.usages.filter(
              (usage) => usage !== value
            );
          }
          break;

        // style
        case "add_style":
          if (!newFilter.styles) newFilter.styles = [];
          newFilter.styles = [...newFilter.styles, value as string];
          break;
        case "remove_style":
          if (newFilter.styles) {
            newFilter.styles = newFilter.styles.filter(
              (style) => style !== value
            );
          }
          break;
        default:
          break;
      }

      return { filter: newFilter };
    }),

  setDynamicFilter: (attribute_id, value) =>
    set((state) => ({
      filter: {
        ...state.filter, // put regular filters as they are
        dynamic: state.filter.dynamic.find(
          (one) => one.attribute_id == attribute_id
        ) // in dynamic fields we check if its added previously
          ? state.filter.dynamic
              .map((one) => {
                if (one.values.includes(value)) {
                  const newVals = one.values.filter((one) => one !== value);
                  return newVals.length > 0
                    ? { ...one, values: newVals }
                    : { attribute_id, values: [] };
                } else {
                  return { ...one, values: [...one.values, value] };
                }
              })
              .filter((one) => one.values.length > 0)
          : [...state.filter.dynamic, { attribute_id, values: [value] }],
      },
    })),

  setKeyword: (data) =>
    set((state) => ({ filter: { ...state.filter, keyword: data } })),

  resetFilter: () =>
    set(() => ({
      filter: { ...initialFilter, brand: [], price: { min: 0, max: null } },
    })),
}));
