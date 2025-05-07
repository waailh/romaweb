"use client";

import { FlashDeal, Product } from "@/typings";
import BreadCrumb from "../helpers/BreadCrumb";
import CouponArea from "./CouponArea";
import OffersProds from "./OffersProds";
import { useTranslations } from "next-intl";
import ViewDeals from "./ViewDeals";

interface Props {
  prods: Product[];
  deals: FlashDeal[];
}

const InnerOffers = ({ prods, deals }: Props) => {
  const t = useTranslations("BreadC");
  const items = [{ name: t("offrs"), link: "#" }]; // for breadcrumb

  return (
    <div>
      <BreadCrumb items={items} />
      <div className="wrapper">
        {/* main coupon */}
        <CouponArea />

        {/* products with discount */}
        <OffersProds prods={prods} />

        {/* flash deals */}
        <ViewDeals deals={deals} />
      </div>
    </div>
  );
};

export default InnerOffers;
