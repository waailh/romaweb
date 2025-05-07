"use client";

import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import ProductsFilter from "./ProductsFilter";
import { Brand, ProductFilter } from "@/typings";
import { useProducts } from "@/store/products/products";
import { useParams } from "next/navigation";
import ColoredLensesProductsFilter from "./ColoredLensesProductsFilter";
import { useTranslations } from "next-intl";

interface Props {
  id: number;
  brands: Brand[];
  filters: ProductFilter[];
  isColored: boolean;

  hasColorFilter: boolean;
}

const MobileFilter = ({
  filters,
  brands,
  id,
  isColored,
  hasColorFilter,
}: Props) => {
  const { sideFilter, setSideFilter } = useProducts();
  const { lang, cat } = useParams();

  const t = useTranslations("Filter");

  return (
    <div className="relative">
      <button
        onClick={() => setSideFilter(true)}
        className="md:hidden flex items-center space-s-2 px-2 py-1 font-bold bg-primary text-white"
      >
        <AdjustmentsHorizontalIcon className="size-4" />
        <span>{t("fltr")}</span>
      </button>

      <div
        className={`fixed top-0 start-0 w-[75%] z-highestest h-screen overflow-y-scroll hide-scrollbar flex flex-col bg-white transform transition-transform duration-500 shadow ease-in-out p-4 ${
          sideFilter
            ? "translate-x-0"
            : lang == "ar"
            ? "translate-x-[100%]"
            : "translate-x-[-100%]"
        }`}
      >
        <div className="w-full text-md flex justify-between space-s-2 items-center mb-6">
          <h6>{t("fltr")}</h6>
          <button onClick={() => setSideFilter(false)}>
            <XMarkIcon className="size-4" />
          </button>
        </div>
        {isColored ? (
          <ColoredLensesProductsFilter
            filters={filters}
            brands={brands}
            id={id}
          />
        ) : (
          <ProductsFilter
            filters={filters}
            id={id}
            isColored={isColored}
            hasColorFilter={hasColorFilter}
          />
        )}
      </div>
    </div>
  );
};

export default MobileFilter;
