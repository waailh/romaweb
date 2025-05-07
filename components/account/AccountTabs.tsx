"use client";

import { Link } from "@/i18n.config";
import {
  ArrowLeftStartOnRectangleIcon,
  HomeModernIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { useTranslations } from "next-intl";

const AccountTabs = () => {
  // const { tab, setActiveTab } = useAccountTabs();
  const searchParams = useSearchParams();
  const tab = searchParams.get("mode");

  const t = useTranslations("Account");

  return (
    <div className="mt-4 w-full md:w-fit overflow-x-scroll md:overflow-x-auto hide-scrollbar text-sm">
      <div className="flex flex-row md:flex-col w-fit space-s-2 md:space-s-0 md:space-y-2 items-center md:items-start">
        <Link
          href="/account?mode=details"
          className={`shrink-0 flex items-center space-s-2 px-2 py-1 w-fit md:w-full rounded transition-all duration-[400ms] ${
            tab === "details" || !tab ? "bg-primary/30" : ""
          }`}
        >
          <UserIcon className="size-4" />
          <span>{t("accdets")}</span>
        </Link>
        <Link
          href="/account?mode=orders"
          className={`shrink-0 flex items-center space-s-2 px-2 py-1 w-fit md:w-full rounded transition-all duration-[400ms] ${
            tab === "orders" ? "bg-primary/30" : ""
          }`}
        >
          <ShoppingBagIcon className="size-4" />
          <span>{t("ordrs")}</span>
        </Link>
        <Link
          href="/account?mode=addresses"
          className={`shrink-0 flex items-center space-s-2 px-2 py-1 w-fit md:w-full rounded transition-all duration-[400ms] ${
            tab === "addresses" ? "bg-primary/30" : ""
          }`}
        >
          <HomeModernIcon className="size-4" />
          <span>{t("addrss")}</span>
        </Link>
        <LogoutButton />
      </div>
      <div className="mt-2 flex justify-end">
        <LogoutButton mobile={true} />
      </div>
    </div>
  );
};

export default AccountTabs;
