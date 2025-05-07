"use client";

import { useTranslations } from "next-intl";
import BreadCrumb from "../helpers/BreadCrumb";
import RedCountDown from "./helpers/RedCountDown";
import { useSettings } from "@/store/global/settings";
import { SpecialProduct } from "@/typings";
import SpecialDealProducts from "./SpecialDealProducts";
import SpecialDealInnerBanner from "./SpecialDealInnerBanner";

interface Props {
  prods: SpecialProduct[];
}

const InnerSpecialDealPage = ({ prods }: Props) => {
  const t = useTranslations("BreadC");
  const items = [{ name: t("spcil"), link: "#" }]; // for breadcrumb
  const { specialDeal } = useSettings();

  return (
    <>
      <BreadCrumb items={items} />
      <div className="wrapper">
        <RedCountDown until={specialDeal?.end_date!} />
        <SpecialDealInnerBanner />
        <SpecialDealProducts prods={prods} />
      </div>
    </>
  );
};

export default InnerSpecialDealPage;
