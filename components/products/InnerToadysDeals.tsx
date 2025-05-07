"use client";

import { Product } from "@/typings";
import BreadCrumb from "../helpers/BreadCrumb";
import ProductCard from "./helpers/ProductCard";
import { useTranslations } from "next-intl";
import TodaysDealsBanner from "./TodaysDealsBanner";

interface Props {
  prods: Product[];
}

const InnerToadysDeals = ({ prods }: Props) => {
  const t = useTranslations("BreadC");
  const items = [{ name: t("todays"), link: "/todays-offers" }]; // for breadcrumb

  return (
    <div>
      <BreadCrumb items={items} />
      <div className="wrapper">
        <TodaysDealsBanner />
        <div className="mt-4 grid grid-cols-12 gap-2">
          {prods.map((one, i) => (
            <div className="col-span-6 md:col-span-3" key={i}>
              <ProductCard product={one} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InnerToadysDeals;
