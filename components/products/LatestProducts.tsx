"use client";

import { Product } from "@/typings";
import ProductsSection from "./ProductsSection";
import { useTranslations } from "next-intl";

interface Props {
  prods: Product[];
}

const LatestProducts = ({ prods }: Props) => {
  const t = useTranslations("Products");

  return (
    <div>
      <ProductsSection prods={prods} title={t("late")} des={t("latedes")} />
    </div>
  );
};

export default LatestProducts;
