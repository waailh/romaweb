"use client";

import { useProductTabs } from "@/store/products/details";
import { useTranslations } from "next-intl";

const ProductDetailsTabs = () => {
  const t = useTranslations("Product");

  const tabs = [
    { name: t("des"), value: "des" },
    { name: t("details"), value: "dets" },
    { name: t("revs"), value: "revs" },
  ];

  const { tab, setActiveTab } = useProductTabs();
  return (
    <div className=" flex items-center space-s-2 text-sm">
      {tabs.map((one, i) => (
        <button
          key={i}
          onClick={() => setActiveTab(one.value)}
          className={`px-2 md:px-3 py-1 border-b-[2px] border-gray-200 ${
            one.value === tab ? "!border-primary" : ""
          }`}
        >
          {one.name}
        </button>
      ))}
    </div>
  );
};

export default ProductDetailsTabs;
