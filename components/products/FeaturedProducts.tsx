"use client";

import { Product } from "@/typings";
import ProductsSection from "./ProductsSection";
import { useTranslations } from "next-intl";

interface Props {
  prods: Product[];
}

const FeaturedProducts = ({ prods }: Props) => {
  const t = useTranslations("Products");

  return (
    <div>
      <ProductsSection prods={prods} title={t("feat")} des={t("featdes")} />
    </div>
  );
};

export default FeaturedProducts;
