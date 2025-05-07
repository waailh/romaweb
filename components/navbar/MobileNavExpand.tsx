"use client";

import LocaleChanger from "@/components/top/LocaleChanger";

import { Link, usePathname, type Locale } from "@/i18n.config";

import { useGlobals } from "@/store/global/globals";
import { XMarkIcon } from "@heroicons/react/16/solid";
import MiniLogin from "../mini/MiniLogin";
import NavbarLinks from "./NavbarLinks";
import HeaderSet from "../top/HeaderSet";
import { TruckIcon } from "@heroicons/react/24/outline";
import SocialLinks from "../footer/SocialLinks";
import { useLocale, useTranslations } from "next-intl";
import MobileStoresLinks from "../footer/MobileStoresLinks";
import { useEffect } from "react";

const MobileNavExpand = () => {
  const { mobileNav, setMobileNav } = useGlobals();

  const locale = useLocale() as Locale;

  const t = useTranslations("Account");

  const pathname = usePathname();

  useEffect(() => {
    setMobileNav(false);
  }, [pathname]);

  return (
    <div
      className={`fixed top-0 w-screen z-highest h-screen overflow-hidden flex flex-col bg-white transform transition-transform duration-500 shadow ease-in-out ${
        mobileNav ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mobnav-wrapper">
        {/* first line */}
        <div className="flex items-center justify-between space-s-2 py-1">
          <MiniLogin />
          <button className="" onClick={() => setMobileNav(false)}>
            <XMarkIcon className="size-6" />
          </button>
        </div>

        <div className="text-black">
          <h3 className="mt-2 mb-6 w-fit mx-auto text-[18px] font-bold">
            {t("mainmenu")}
          </h3>
          <NavbarLinks />
        </div>
      </div>
      <div className="flex-1 mt-2 w-full bg-lightgray pt-2">
        <div className="mobnav-wrapper">
          <div className="flex flex-col items-center justify-center">
            <HeaderSet />
            <Link
              href="/account?mode=orders"
              className="mt-2 mb-2 flex items-center w-fit space-s-1"
            >
              <TruckIcon className="size-5" />
              <span>{t("track")}</span>
            </Link>
            <div className="my-2">
              <SocialLinks />
            </div>
            <div className="my-2">
              <LocaleChanger locale={locale} />
            </div>
            <div className="my-2">
              <MobileStoresLinks />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavExpand;
