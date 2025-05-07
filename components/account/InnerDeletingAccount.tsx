"use client";

import { useTranslations } from "next-intl";
import BreadCrumb from "../helpers/BreadCrumb";
import { useParams } from "next/navigation";
import MyImage from "../ui/MyImage";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const InnerDeletingAccount = () => {
  const { lang } = useParams();

  const t = useTranslations("Account");
  const tb = useTranslations("BreadC");

  const items = [{ name: tb("delacc"), link: "#" }]; // for breadcrumb

  return (
    <div>
      <BreadCrumb items={items} />
      <div className="wrapper">
        <div className="">
          <p>{t("dellngtxt")}</p>

          <hr className="divider my-6" />

          <p>{t("scrns")}</p>

          <div className="">
            <div className="flex items-center justify-between md:justify-start space-s-4">
              <div className="relative h-[400px] w-5/12 md:h-[650px] md:w-[250px]">
                <MyImage
                  src="/assets/images/screens/one.jpg"
                  className="object-contain"
                  fill
                />
              </div>
              <div className="p-1 md:p-2 border rounded-full">
                {lang == "en" ? (
                  <ArrowRightIcon className="size-3 md:size-6" />
                ) : (
                  <ArrowLeftIcon className="size-3 md:size-6" />
                )}
              </div>
              <div className="relative h-[400px] w-5/12 md:h-[650px] md:w-[250px]">
                <MyImage
                  src="/assets/images/screens/two.jpg"
                  className="object-contain"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnerDeletingAccount;
