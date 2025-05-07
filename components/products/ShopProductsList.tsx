"use client";

import { useProducts } from "@/store/products/products";
import ProductCard from "./helpers/ProductCard";
import ProductsLoader from "../ui/loaders/ProductsLoader";
import { useTranslations } from "next-intl";

const ShopProductsList = () => {
  const { loading, products } = useProducts();

  const t = useTranslations("Products");

  return (
    <div>
      {loading ? (
        <ProductsLoader />
      ) : (
        <>
          {products.length > 0 ? (
            <div className="grid grid-cols-12 gap-1">
              {products.map((one, i) => (
                <div key={i} className="col-span-6 lg:col-span-4 flex flex-col">
                  <ProductCard product={one} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-48">
              {t("noprods")}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShopProductsList;
