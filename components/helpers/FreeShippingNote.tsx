"use client";

import { formatPrice } from "@/lib/utils";
import { useSettings } from "@/store/global/settings";
import { useTranslations } from "next-intl";
import { useState } from "react";

const FreeShippingNote = () => {
  const [min, setMin] = useState("");
  const { currency, settings } = useSettings();
  const t = useTranslations("Product");

  const freeMin = settings?.find((one) => one.type == "free_shipping_cost_rate")
    ?.value!;

  //   console.log(settings, freeMin);
  if (!freeMin) return;

  return (
    <div className="mt-1">
      <p className="text-sm">
        - {t("freeship")}{" "}
        <span className="font-bold">{formatPrice(freeMin, currency!)}</span>
      </p>
    </div>
  );
};

export default FreeShippingNote;
