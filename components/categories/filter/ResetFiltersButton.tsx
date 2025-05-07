"use client";

import { useFilters } from "@/store/products/filters";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const ResetFiltersButton = () => {
  const t = useTranslations("Filter");

  const router = useRouter();

  const { resetFilter } = useFilters();

  const handleReset = () => {
    resetFilter();
    router.refresh();
  };

  return (
    <button
      onClick={() => handleReset()}
      className="underline text-yellow-400 text-sm"
    >
      {t("reset")}
    </button>
  );
};

export default ResetFiltersButton;
