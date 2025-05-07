"use client";

import PointIcon from "@/public/assets/icons/earn.svg";
import { useGlobals } from "@/store/global/globals";
import { useTranslations } from "next-intl";

const ViewPoints = () => {
  const { user } = useGlobals();
  const t = useTranslations("Account");

  return (
    <div className="w-full md:w-fit flex justify-end">
      <div className="bg-green-50 text-green-700 w-fit px-2 py-1 rounded flex items-center space-s-2 text-sm">
        <span>
          <PointIcon />
        </span>
        <span className="">{user?.points || "0"}</span>
        <span className="font-bold">{t("points")}</span>
      </div>
    </div>
  );
};

export default ViewPoints;
