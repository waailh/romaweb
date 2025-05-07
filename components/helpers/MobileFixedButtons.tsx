"use client";

import {
  HomeIcon,
  QueueListIcon,
  CubeIcon,
  UserIcon,
  PercentBadgeIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@/i18n.config";
import { usePathname } from "@/i18n.config";
import { useGlobals } from "@/store/global/globals";
import WhatsAppButton from "./WhatsAppButton";
import ScrollUpButton from "./ScrollUpButton";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const MobileFixedButtons = () => {
  return (
    <Suspense>
      <InnerMobileFixedButtons />
    </Suspense>
  );
};

const InnerMobileFixedButtons = () => {
  const path = usePathname();
  const searchParams = useSearchParams();

  const pathname = `${path}${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;

  const { isMobileLayout } = useGlobals();

  const t = useTranslations("Fixed");
  return (
    <>
      {isMobileLayout && pathname && (
        <div className="sticky bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-2 z-high">
          <Link
            className={`flex flex-col items-center text-gray-800 pb-1  ${
              pathname === "/" ? "border-b-2 border-primary" : ""
            }`}
            href="/"
          >
            <HomeIcon className="h-5 w-5" />
            <span className="text-xs">{t("hme")}</span>
          </Link>
          <Link
            className={`flex flex-col items-center text-gray-800 pb-1  ${
              pathname.includes("/colored") ? "border-b-2 border-primary" : ""
            }`}
            href="/colored"
          >
            <QueueListIcon className="h-5 w-5" />
            <span className="text-xs">{t("cats")}</span>
          </Link>
          <Link
            className={`flex flex-col items-center text-gray-800 pb-1 relative ${
              pathname.includes("/flash-deals")
                ? "border-b-2 border-primary"
                : ""
            }`}
            href="/flash-deals"
          >
            <PercentBadgeIcon className="size-7 " />

            <span className="text-xs">{t("offrs")}</span>
            <span className="absolute top-[5px] end-[-1px] size-2 rounded-full bg-red-600 animate-pulse"></span>
          </Link>
          <Link
            className={`flex flex-col items-center text-gray-800 pb-1  ${
              pathname === "/account?mode=orders"
                ? "border-b-2 border-primary"
                : ""
            }`}
            href="/account?mode=orders"
          >
            <CubeIcon className="h-5 w-5" />
            <span className="text-xs">{t("ordrs")}</span>
          </Link>
          <Link
            className={`flex flex-col items-center text-gray-800 pb-1  ${
              pathname === "/account?mode=details"
                ? "border-b-2 border-primary"
                : ""
            }`}
            href="/account?mode=details"
          >
            <UserIcon className="h-5 w-5" />
            <span className="text-xs">{t("acc")}</span>
          </Link>
        </div>
      )}
      {isMobileLayout && (
        <>
          <div className="fixed z-high bottom-16 right-5 flex flex-col items-center space-y-2 ">
            <ScrollUpButton />
            <WhatsAppButton />
          </div>
        </>
      )}
    </>
  );
};

export default MobileFixedButtons;
