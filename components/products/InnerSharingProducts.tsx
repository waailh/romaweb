"use client";

import { Product } from "@/typings";
import BreadCrumb from "../helpers/BreadCrumb";
import ProductCard from "./helpers/ProductCard";
import { useTranslations } from "next-intl";

interface Props {
  prods: Product[];
}

const InnerSharingProducts = ({ prods }: Props) => {
  const t = useTranslations("BreadC");
  const items = [{ name: t("sharing"), link: "#" }]; // for breadcrumb

  return (
    <div>
      <BreadCrumb items={items} />
      <div className="wrapper">
        <div className="mt-4 grid grid-cols-12 gap-2">
          {prods.map((one, i) => (
            <div className="col-span-6 md:col-span-3" key={i}>
              <ProductCard product={one} force={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InnerSharingProducts;
