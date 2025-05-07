// hooks/useURLColor.ts

import { useCartsStore } from "@/store/products/carts";
import { useProducts } from "@/store/products/products";
import { ProductColor } from "@/typings";

export const useURLColor = () => {
  const { setActiveMedia } = useProducts();
  const { setChoiceColor } = useCartsStore();

  type Params = { color: string; colors: ProductColor[] };

  const handleURLColor = ({ color, colors }: Params) => {
    const colr = colors.find((one) => one.name === color);
    if (!colr) return; // Exit early if color is not found

    setActiveMedia("main", colr.path);

    // Scroll to the corresponding color and media elements
    ["_color", "_media"].forEach((suffix) => {
      document.getElementById(`${colr.code}${suffix}`)?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    });

    setTimeout(() => {
      setChoiceColor("main", colr.code.replace("#", ""));
    }, 500);
  };

  return { handleURLColor };
};
