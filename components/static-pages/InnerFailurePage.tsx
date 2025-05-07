"use client";

import { useRouter } from "@/i18n.config";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const InnerFailurePage = () => {
  const router = useRouter();

  const t = useTranslations("Messages");

  useEffect(() => {
    setTimeout(() => {
      router.push("/cart");
    }, 5000);
  }, []);

  return (
    <div>
      <div className="wrapper">
        <div className="w-full min-h-40 flex flex-col space-y-2 items-center justify-center mt-6">
          <ExclamationCircleIcon className="size-40 text-red-600" />
          <p>{t("faile")}</p>
          <p>{t("weredire")}</p>
        </div>
      </div>
    </div>
  );
};

export default InnerFailurePage;
