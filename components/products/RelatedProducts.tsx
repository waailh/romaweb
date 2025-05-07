"use client";

import { Product } from "@/typings";
import ProductsSection from "./ProductsSection";
import { useTranslations } from "next-intl";
import DownOpacityAnimator from "../animators/DownOpacityLogoAnimator";

interface Props {
  prods: Product[];
}

const RelatedProducts = ({ prods }: Props) => {
  const t = useTranslations("Products");
  return (
    <DownOpacityAnimator>
      <div>
        {prods && prods.length > 0 && (
          <ProductsSection prods={prods} title={t("rel")} des={t("reldes")} />
        )}
      </div>
    </DownOpacityAnimator>
  );
};

export default RelatedProducts;
