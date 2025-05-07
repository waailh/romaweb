"use client";

import { useTranslations } from "next-intl";
import BreadCrumb from "../helpers/BreadCrumb";
import ViewDeals from "./ViewDeals";
import { FlashDeal } from "@/typings";
import { useEffect } from "react";
import { useFlashdeals } from "@/store/deals";

interface Props {
  deals: FlashDeal[];
}

const InnerFlashdealsPage = ({ deals }: Props) => {
  const t = useTranslations("BreadC");

  const items = [{ name: t("flsh"), link: "#" }]; // for breadcrumb

  const { setFlashdeals } = useFlashdeals();

  useEffect(() => {
    setFlashdeals(deals);
  }, []);

  return (
    <div>
      <BreadCrumb items={items} />
      <div className="wrapper">
        <ViewDeals deals={deals} />
      </div>
    </div>
  );
};

export default InnerFlashdealsPage;
