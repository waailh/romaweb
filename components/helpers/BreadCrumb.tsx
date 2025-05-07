"use client";

import { Link } from "@/i18n.config";
import { BreadCrumbItem } from "@/typings";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface Props {
  items: BreadCrumbItem[];
}

const BreadCrumb = ({ items }: Props) => {
  const { lang } = useParams();
  const t = useTranslations("Bread");

  return (
    <div className="py-2 md:py-6">
      <div className="wrapper">
        <div className="flex items-center space-s-2 max-w-fit overflow-x-scroll hide-scrollbar">
          <Link href="/" className="font-bold hover:underline">
            {t("home")}
          </Link>
          {items.map((one, i) => (
            <div key={i} className="shrink-0 flex items-center space-s-2">
              <ChevronRightIcon
                className={`size-4 ${lang == "ar" ? "scale-x-[-1]" : ""}`}
              />
              <Link href={one.link} className="font-bold hover:underline">
                {one.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
