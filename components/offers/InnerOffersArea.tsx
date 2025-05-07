"use client";

import { Link } from "@/i18n.config";
import MyImage from "../ui/MyImage";
import { useBanners } from "@/store/global/banners";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const InnerOffersArea = () => {
  const { allBanners } = useBanners();

  const t = useTranslations("Offers");

  const { lang } = useParams();

  if (!allBanners) return null;

  return (
    <div className="md:mt-6 py-2 md:py-12">
      <div className="wrapper">
        <div className="grid grid-cols-12 gap-2 md:gap-4">
          {/* text */}
          <div className="col-span-12 lg:col-span-5 px-2 py-6">
            <h4 className="my-2 md:my-12 text-6xl text-bluee max-w-[]">
              {t("findOut")}
            </h4>

            <p className="mt-4 mb-8 md:mb-16 text-grayee">{t("discover")}</p>

            <Link
              href="/category/all"
              className="rounded-full text-white py-3 px-12 bg-primary"
            >
              {t("explore")}
            </Link>
          </div>

          {/* images */}
          <div className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {/* First Banner - Full Height on Desktop */}
              <div className="col-span-1 md:row-span-2">
                <Link href={allBanners.level_1.data[0]?.link || "#"}>
                  <div className="w-full aspect-[359/416] relative overflow-hidden rounded">
                    <MyImage
                      src={
                        lang == "ar"
                          ? allBanners.level_1.data[0]?.ar_image
                          : allBanners.level_1.data[0]?.image
                      }
                      className="hover:scale-[1.02] duration-500 object-cover transition-all ease-in"
                      isBanner={true}
                      fill
                    />
                  </div>
                </Link>
              </div>

              {/* Second Column - Two Stacked Images on Desktop */}
              <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                {/* Second Banner */}
                <div>
                  <Link href={allBanners.level_1.data[1]?.link || "#"}>
                    <div className="w-full aspect-[359/202] relative overflow-hidden rounded">
                      <MyImage
                        src={
                          lang == "ar"
                            ? allBanners.level_1.data[1]?.ar_image
                            : allBanners.level_1.data[1]?.image
                        }
                        className="hover:scale-[1.02] duration-500 object-cover transition-all ease-in"
                        isBanner={true}
                        fill
                      />
                    </div>
                  </Link>
                </div>

                {/* Third Banner */}
                <div>
                  <Link href={allBanners.level_1.data[2]?.link || "#"}>
                    <div className="w-full aspect-[359/202] relative overflow-hidden rounded">
                      <MyImage
                        src={
                          lang == "ar"
                            ? allBanners.level_1.data[2]?.ar_image
                            : allBanners.level_1.data[2]?.image
                        }
                        className="hover:scale-[1.02] duration-500 object-cover transition-all ease-in"
                        isBanner={true}
                        fill
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnerOffersArea;
