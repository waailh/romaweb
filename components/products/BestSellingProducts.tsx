"use client";

import { Product } from "@/typings";
import ProductsSection from "./ProductsSection";
import { useTranslations } from "next-intl";

interface Props {
  prods: Product[];
}

const BestSellingProducts = ({ prods }: Props) => {
  const t = useTranslations("Products");

  return (
    <div>
      <ProductsSection prods={prods} title={t("best")} des={t("bestdes")} />
    </div>
  );
};

export default BestSellingProducts;
