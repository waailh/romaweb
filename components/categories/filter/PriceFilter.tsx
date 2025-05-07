"use client";

import { useFilters } from "@/store/products/filters";
import { useTranslations } from "next-intl";

const PriceFilter = () => {
  const t = useTranslations("Filter");

  const {
    filter: { price },
    setFilter,
  } = useFilters();

  return (
    <div className="flex items-center space-s-2 mt-2">
      <input
        type="number"
        placeholder={t("min")}
        value={price.min}
        onChange={(e) => setFilter("price_min", e.target.value)}
        className="w-[50%] outline-none px-1 py-1 border rounded"
      />
      <span>-</span>
      <input
        type="number"
        placeholder={t("max")}
        value={price.max || ""}
        onChange={(e) => setFilter("price_max", e.target.value)}
        className="w-[50%] outline-none px-1 py-1 border rounded"
      />
    </div>
  );
};

export default PriceFilter;
