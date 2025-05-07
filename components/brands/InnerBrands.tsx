"use client";
import SectionTitle from "../ui/SectionTitle";
import BrandsSlider from "./BrandsSlider";
import { useTranslations } from "next-intl";
import { Brand } from "@/typings";
import { Link } from "@/i18n.config";

const InnerBrands = ({ brands }: { brands: Brand[] }) => {
  const t = useTranslations("Brands");
  return (
    <div className="mt-4 md:mt-12 w-full py-4">
      <div className="wrapper">
        <SectionTitle title={t("popBrands")} />
      </div>
      <div className="wrapper">
        <BrandsSlider sliders={brands} />
        <div className="flex justify-end mt-4">
          <Link
            href="/brands"
            className="text-xs pb-1 border-b text-primary border-primary"
          >
            {t("vAll")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InnerBrands;
