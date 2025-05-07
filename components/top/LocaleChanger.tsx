"use client";

import {
  localeNames,
  locales,
  usePathname,
  useRouter,
  type Locale,
} from "@/i18n.config";

import MyDroppy from "@/components/ui/MyDroppy";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

import { useSettings } from "@/store/global/settings";

import Select from "react-select";
import countryList from "react-select-country-list";
import { useMemo, useState } from "react";
import MyImage from "../ui/MyImage";
import { getCurrency } from "@/lib/utils";
import { useTranslations } from "next-intl";

type Country = {
  label: string;
  value: string;
};

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const { country, allCurrencies, setCurrency } = useSettings();
  const [trigger, setTrigger] = useState(false);
  const [localeOpt, setLocaleOpt] = useState<string>(locale);

  const pathname = usePathname();
  const router = useRouter();

  const [shippingTo, setShippingTo] = useState<Country | null>();
  const options = useMemo(() => countryList().getData(), []);

  const setShippingCountry = (code: string) => {
    const cur = getCurrency(allCurrencies!, code);
    setCurrency(cur);
    setTrigger(!trigger);
  };

  const apply = () => {
    setShippingCountry(shippingTo?.value!);
    router.replace(pathname, { locale: localeOpt });
  };

  const t = useTranslations("Modals");

  const buttonJSX = (
    <button className="border p-2 rounded-[5px] flex items-center gap-x-1 ">
      <MyImage
        alt="locale flag"
        src={`/assets/icons/${locale == "en" ? "usa" : "sa"}.png`}
        className="shrink-0 object-contain"
        height={7}
        width={21}
      />
      <div className="shrink-0">
        {locale == "en" ? <span>EN</span> : <span>العربية</span>}
      </div>

      <ChevronDownIcon className="size-4 shrink-0" />
    </button>
  );

  const areaJSX = (
    <div className="p-2 md:p-3">
      <h6 className="font-bold text-sm">{t("gnrl")}</h6>
      <div className="mt-4 w-full flex flex-col space-y-2">
        <label htmlFor="">{t("shippinto")}</label>

        <Select
          defaultValue={options.find((one) => one.value === country)}
          options={options}
          value={shippingTo}
          onChange={(val) => setShippingTo(val)}
        />
      </div>
      <div className="mt-4 w-full flex flex-col space-y-2">
        <label htmlFor="">{t("sitelan")}</label>
        <select
          defaultValue={locale}
          value={localeOpt}
          onChange={(e) => setLocaleOpt(e.target.value)}
          className="appearance-none border p-2 rounded border-[#E4E4EE] outline-none"
        >
          {locales.map((loc) => (
            <option selected={loc == localeOpt} key={loc} value={loc}>
              {localeNames[loc]}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={() => apply()}
        className="mt-4 py-2 px-3 rounded bg-primary text-white w-full"
      >
        {t("sve")}
      </button>
    </div>
  );

  return (
    <div>
      <MyDroppy button={buttonJSX} area={areaJSX} trigger={trigger} />
    </div>
  );
}
