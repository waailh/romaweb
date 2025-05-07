"use client";

import { Color } from "@/typings";
import MyImage from "../ui/MyImage";
import SectionTitle from "../ui/SectionTitle";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n.config";
import { useParams } from "next/navigation";

interface Props {
  data: Color[];
}

const InnerByColor = ({ data }: Props) => {
  const t = useTranslations("ByColor");
  const { lang } = useParams();

  return (
    <div className="mt-4 md:mt-12 w-full py-4 ">
      <div className="wrapper">
        <SectionTitle title={t("shopbycolr")} top={true} />
      </div>
      <div className="wrapper">
        <div className="mt-4 grid grid-cols-12 gap-2">
          {data.map((one, i) => (
            <div
              key={i}
              className="col-span-4 md:col-span-2 flex flex-col items-center space-y-2"
            >
              <Link href={`/colored/${one.name}`} className="w-full h-full">
                <div className="w-full aspect-square relative">
                  <MyImage
                    src={one.cover_image}
                    className="object-contain object-center"
                    fill
                  />
                </div>
              </Link>
              <h6>{lang == "ar" ? one.ar_name : one.name}</h6>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InnerByColor;
