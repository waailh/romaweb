"use client";

import { CheckBadgeIcon } from "@heroicons/react/16/solid";
import { MegaphoneIcon } from "@heroicons/react/24/outline";
import AccountDetailsForm from "./AccountDetailsForm";
import { useGlobals } from "@/store/global/globals";
import ViewPoints from "./helpers/ViewPoints";
import { useTranslations } from "next-intl";

const AccountDetails = () => {
  const t = useTranslations("Account");

  const { user } = useGlobals();
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* main */}
      <div className="col-span-12 md:col-span-7 mt-2 md:mt-0">
        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-s-2 md:justify-between md:items-center">
          <div className="flex items-center space-s-4">
            <h4 className="font-bold">{t("personal")}</h4>
            {!user?.guest && (
              <div className="bg-green-100 w-fit flex items-center space-s-2 text-green-600 px-2 py-1 rounded-lg text-sm">
                <CheckBadgeIcon className="size-6" />
                <span>{t("verified")}</span>
              </div>
            )}
          </div>

          {/* points */}
          <ViewPoints />
        </div>
        <AccountDetailsForm />
      </div>

      {/* end */}
      <div className="col-span-12 md:col-span-5">
        {/* hint */}
        <div className="p-2 md:p-3 rounded-lg border flex flex-col">
          <div className="flex items-center space-s-2 text-primary mb-2">
            <MegaphoneIcon className="size-4 md:size-5" />
            <span className="font-bold">{t("hint")}</span>
          </div>
          <p>{t("entraval")}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
