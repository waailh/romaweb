"use client";

import { getToken } from "@/lib/auth/auth";
import { useAccountAuth } from "@/store/account/auth";
import { useGlobals } from "@/store/global/globals";
import { useTranslations } from "next-intl";

const ContinueAsGuest = () => {
  const { setAuthModal } = useAccountAuth();
  const { user, getUserData } = useGlobals();

  const t = useTranslations("Modals");

  // console.log("user: ", user);
  const handleContiueAsGuest = () => {
    const token = getToken();
    if (!user || !token) getUserData();
    setAuthModal(null);
  };

  return (
    <button
      onClick={() => handleContiueAsGuest()}
      className="mt-4 underline hover:text-primary"
    >
      {t("conguest")}
    </button>
  );
};

export default ContinueAsGuest;
