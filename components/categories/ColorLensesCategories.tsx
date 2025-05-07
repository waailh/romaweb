"use client";

import { useTranslations } from "next-intl";
import SectionTitle from "../ui/SectionTitle";
import { Category } from "@/typings";
import { Link } from "@/i18n.config";
import { useEffect } from "react";
import { useBrands } from "@/store/global/brands";
import SubcatsSlider from "./SubcatsSlider";

const ColorLensesCategories = () => {
  const t = useTranslations("Color");

  const { allColorBrands } = useBrands();

  if (!allColorBrands) return;

  return (
    <div className="mt-4 md:mt-12 w-full py-4">
      <div className="wrapper">
        <SectionTitle title={t("lenseCats")} top={true} />
      </div>
      <div className="wrapper">
        <SubcatsSlider sliders={allColorBrands} />
        <div className="flex justify-end mt-4">
          <Link
            href="/colored"
            className="text-xs pb-1 border-b text-primary border-primary"
          >
            {t("vAll")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ColorLensesCategories;
