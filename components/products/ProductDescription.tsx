"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import StaticHtmlViewer from "../static-pages/html/StaticHtmlViewer";
import { useTranslations } from "next-intl";

interface Props {
  des: { ar: string; en: string };
}

const ProductDescription = ({ des }: Props) => {
  const { lang } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);

  const t = useTranslations("Product");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="py-4 text-sm md:text-md max-w-[650px]" id="html_des">
      <div
        className={`relative overflow-hidden transition-max-height duration-300 ${
          isExpanded ? "max-h-full" : "max-h-[160px]"
        }`}
      >
        <StaticHtmlViewer html={lang == "ar" ? des.ar : des.en} />
      </div>
      {/* Read More / Show Less Button */}
      <div className="text-start mt-2">
        <button
          onClick={toggleExpand}
          className="text-primary underline text-bold"
        >
          {isExpanded ? t("shwls") : t("redmor")}
        </button>
      </div>
    </div>
  );
};

export default ProductDescription;
