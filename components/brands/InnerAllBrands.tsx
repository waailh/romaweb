import React from "react";
import BreadCrumb from "../helpers/BreadCrumb";
import AllBrands from "./AllBrands";
import { Brand } from "@/typings";
import { useTranslations } from "next-intl";

interface Props {
  brands: Brand[];
}

const InnerAllBrands = ({ brands }: Props) => {
  const t = useTranslations("BreadC");
  const items = [{ name: t("brnds"), link: "#" }];

  return (
    <div>
      <BreadCrumb items={items} />
      <div className="wrapper">
        <AllBrands brands={brands} />
      </div>
    </div>
  );
};

export default InnerAllBrands;
