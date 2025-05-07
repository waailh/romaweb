"use client";

import { Link, useRouter } from "@/i18n.config";
import { useAddresses } from "@/store/account/addresses";
import { useCheckout } from "@/store/account/checkout";
import { useTranslations } from "next-intl";

const CheckoutOrderButton = () => {
  const { setStep } = useCheckout();
  const { addresses, state: addressState } = useAddresses();

  const t = useTranslations("Checkout");

  const router = useRouter();

  return (
    <button
      className={`bg-primary px-2 py-1.5 text-md text-white rounded ${
        addressState == "add" ? "hidden" : ""
      }`}
      disabled={!addresses || addresses?.length == 0}
      onClick={() => router.push("/checkout?mode=payment")}
    >
      {t("comp")}
    </button>
  );
};

export default CheckoutOrderButton;
