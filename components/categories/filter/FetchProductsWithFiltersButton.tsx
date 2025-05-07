"use client";

import { useFetchProducts } from "@/components/hooks/useFetchProducts";
import { useTranslations } from "next-intl";

interface Props {
  catId: number;
}

const FetchProductsWithFiltersButton = ({ catId }: Props) => {
  const { fetchProducts } = useFetchProducts(catId);
  const t = useTranslations("Filter");

  return (
    <button
      onClick={() => fetchProducts({ page: 0, maintainFilter: true })}
      className="px-4 py-2 bg-primary text-white rounded"
    >
      {t("apply")}
    </button>
  );
};

export default FetchProductsWithFiltersButton;
