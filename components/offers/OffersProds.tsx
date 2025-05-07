"use client";

import { Link } from "@/i18n.config";
import { Product } from "@/typings";
import { useParams } from "next/navigation";
import MyImage from "../ui/MyImage";
import { useTranslations } from "next-intl";

interface Props {
  prods: Product[];
}

const OffersProds = ({ prods }: Props) => {
  const { lang } = useParams();

  const t = useTranslations("Offers");

  return (
    <div className="mt-4 mb-12">
      <div className="text-center mb-4">
        <h4>{t("specioffs")}</h4>
      </div>
      <div className="md:max-w-[750px] md:mx-auto grid grid-cols-12 gap-4">
        {prods.map((one, i) => (
          <div
            key={i}
            className="col-span-12 md:col-span-4 flex flex-col items-center justify-center text-center space-y-3"
          >
            <Link href={`/product/${one.slug}`} className="w-full">
              <div className="w-full aspect-[1.2/1] relative overflow-hidden border">
                <MyImage
                  src={one.thumbnail_image}
                  className="hover:scale-[1.02] duration-500 object-cover transition-all ease-in"
                  fill
                />
              </div>
            </Link>
            <p className="font-bold">{lang == "ar" ? one.ar_name : one.name}</p>
            <p className="text-xs">
              {one.discount} {t("off")}
            </p>

            <Link
              href={`/product/${one.slug}`}
              className="pb-1 text-sm border-b border-primary text-primary"
            >
              {t("vw")}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersProds;
