"use client";

import { Link } from "@/i18n.config";
import { FlashDeal } from "@/typings";
import MyImage from "../ui/MyImage";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface Props {
  deals: FlashDeal[];
}

const ViewDeals = ({ deals }: Props) => {
  const { lang } = useParams();

  const t = useTranslations("Offers");

  return (
    <div>
      <h3>{t("chckdeals")}</h3>
      <div className="mt-4 grid grid-cols-12 gap-4">
        {deals.map((one, i) => (
          <div key={i} className="col-span-12 md:col-span-6">
            <Link href={`/flash-deals/${one.slug}`}>
              <div className="relative w-full aspect-[2.5/1] rounded-lg overflow-hidden">
                <MyImage
                  src={lang == "ar" ? one.ar_banner : one.banner}
                  className="hover:scale-[1.02] duration-500 object-cover transition-all ease-in rounded-lg"
                  fill
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewDeals;
