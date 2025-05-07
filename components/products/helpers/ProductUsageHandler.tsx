"use client";

import { useTranslations } from "next-intl";

interface Props {
  mini: boolean;
}

const ProductUsageHandler = ({ mini }: Props) => {
  const t = useTranslations("Product");

  return (
    <div>
      <div className="">
        <label htmlFor="">{t("usg")}</label>
        <div className="mt-1 flex items-center space-s-2">
          <button
            className={`border px-4 py-1.5 flex items-center justify-center rounded text-sm ${""}`}
          >
            1 Month
          </button>
          <button
            className={`border px-4 py-1.5 flex items-center justify-center rounded text-sm ${"border-primary text-primary shadow"}`}
          >
            2 Month
          </button>
          <button
            className={`border px-4 py-1.5 flex items-center justify-center rounded text-sm ${""}`}
          >
            3 Month
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductUsageHandler;
