import { Link, Locale } from "@/i18n.config";
import LocaleChanger from "./LocaleChanger";

import { useLocale, useTranslations } from "next-intl";
import PhoneIcon from "@/public/assets/icons/phone.svg";
import LocIcon from "@/public/assets/icons/loc.svg";
import { MapPinIcon } from "@heroicons/react/24/outline";

const HeaderSet = () => {
  const locale = useLocale() as Locale;
  const t = useTranslations("Navbar");

  return (
    <div className="w-full md:w-fit text-xs md:text-sm flex items-center relative ">
      <div className="hidden md:flex w-full">
        <LocaleChanger locale={locale} />
      </div>
      <div className="md:ms-4 md:flex md:space-s-2 items-center w-full ">
        <div className="hidden md:flex">
          <PhoneIcon />
        </div>
        <div className="w-full flex justify-between md:justify-start md:space-s-2 md:items-center md:divide-s ">
          <div className="flex items-center space-s-2 md:divide-s">
            <div className="order-last md:order-first p-2 flex space-s-2">
              <div className="">
                <h6 className="text-primary">{t("helpLine")}</h6>
                <p dir="ltr">+971564948368</p>
              </div>
            </div>
          </div>
          <Link
            href="/our-branches"
            className="order-first md:order-last flex items-center space-s-0 md:space-s-1 md:p-2 md:justify-between "
          >
            <MapPinIcon className="shrink-0 size-6" />
            <p className="shrink-0 text-xs md:text-md max-w-20">
              {t("ourStores")}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderSet;
