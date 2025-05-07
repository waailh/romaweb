"use client";

import { Link } from "@/i18n.config";
import BreadCrumb from "../helpers/BreadCrumb";
import CountDown from "../helpers/CountDown";
import { FlashDeal, Product } from "@/typings";
import ProductCard from "../products/helpers/ProductCard";
import MyImage from "../ui/MyImage";
import { useSettings } from "@/store/global/settings";
import { formatPrice } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface Props {
  deal: FlashDeal;
  prods: Product[];
}

const InnerFlashDeal = ({ deal, prods }: Props) => {
  const t = useTranslations("BreadC");
  const tf = useTranslations("Flashdeal");

  const { lang } = useParams();

  const items = [
    { name: t("flsh"), link: "/flash-deals" },
    { name: t("thisOffr"), link: "#" },
  ]; // for breadcrumb

  const { currency } = useSettings();

  let offerData;
  switch (deal.discount_type) {
    case "amount":
      offerData = (
        <div>
          <p className="my-4 text-sm">
            {tf("savflat")}{" "}
            <span className="text-red-500">
              {formatPrice(deal.discount, currency!)}
            </span>
            .
          </p>
        </div>
      );
      break;

    case "percent":
      offerData = (
        <div>
          <p className="my-4 text-sm">
            {tf("svupto")}{" "}
            <span className="text-red-500">
              {deal.discount} {tf("off")}
            </span>
          </p>
        </div>
      );
      break;

    default:
      offerData = (
        <div>
          <p className="my-4 text-sm">
            {tf("explor")}{" "}
            <span className="text-red-500">{deal.discount_type}</span>{" "}
            {tf("offr")}
          </p>
        </div>
      );
      break;
  }

  return (
    <div>
      <BreadCrumb items={items} />
      <div className="wrapper">
        <div className="w-full mb-4">
          <div className="w-full aspect-[2.5/1]">
            <MyImage
              src={lang == "ar" ? deal.ar_banner : deal.banner}
              className="object-cover object-center rounded-lg"
              fill
            />
          </div>
        </div>
        {deal.date && <CountDown until={deal.date!} />}

        <div className="mt-4 md:mt-12 grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3 rounded-lg bg-lightgray p-4 md:p-6 shadow h-fit">
            <h5>{tf("these")}</h5>
            {offerData}
            <p className="my-4 text-sm">{tf("nocod")}</p>
            <Link
              href="#"
              className="my-4 bg-primary px-3 py-1 rounded text-white"
            >
              {tf("explr")}
            </Link>
          </div>

          <div className="col-span-12 md:col-span-9 ">
            <div className="grid grid-cols-12 gap-1">
              {prods.map((one, i) => (
                <div key={i} className="col-span-6 lg:col-span-4">
                  <ProductCard product={one} />
                </div>
              ))}
            </div>
            {/* <ProductsList max={3} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnerFlashDeal;
