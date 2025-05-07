"use client";

import dynamic from "next/dynamic";

import { DisclosureButton, DisclosurePanel } from "@headlessui/react";
const Disclosure = dynamic(
  () => import("@headlessui/react").then((mod) => mod.Disclosure),
  { ssr: false }
);

import { useGlobals } from "@/store/global/globals";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import Link from "next/link";

const CompanyList = () => {
  const t = useTranslations("Footer");
  const { isMobileLayout } = useGlobals();

  return (
    <div className="w-full">
      <Disclosure
        as="div"
        className="w-full cursor-pointer bg-white md:bg-transparent"
        defaultOpen={!isMobileLayout}
      >
        <DisclosureButton
          disabled={!isMobileLayout}
          className="group rounded-t p-[6px] md:p-0 flex w-full items-center justify-between"
        >
          <h4 className="text-black md:text-grayee text-sm font-bold">
            {t("compny")}
          </h4>
          <PlusIcon className="size-4 md:hidden" />
        </DisclosureButton>
        <DisclosurePanel className="my-1 text-black py-2 px-2 md:px-0">
          <ul className="w-full flex flex-col space-y-2 text-fgray text-md ">
            <li className="w-fit shrink-0 hover:text-black hover:underline transition-all ease-in-out duration-500">
              <Link href="/about-us">{t("abt")}</Link>
            </li>
            <li className="w-fit shrink-0 hover:text-black hover:underline transition-all ease-in-out duration-500">
              <Link href="/faq">{t("faq")}</Link>
            </li>
            <li className="w-fit shrink-0 hover:text-black hover:underline transition-all ease-in-out duration-500">
              <Link href="/blog">{t("blg")}</Link>
            </li>
            <li className="w-fit shrink-0 hover:text-black hover:underline transition-all ease-in-out duration-500">
              <Link href="/return-policy">{t("ret")}</Link>
            </li>
            {/* <li className="w-fit shrink-0 hover:text-black hover:underline transition-all ease-in-out duration-500">
                  <Link href="/support-policy">{t("sup")}</Link>
                </li> */}
          </ul>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
};

export default CompanyList;
