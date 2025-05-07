"use client";

import { useBanners } from "@/store/global/banners";
import MyImage from "../ui/MyImage";
import { useGlobals } from "@/store/global/globals";
import { useParams } from "next/navigation";

const TodaysDealsBanner = () => {
  const { allBanners } = useBanners();

  const { isMobileLayout } = useGlobals();
  const { lang } = useParams();

  if (!allBanners) return;

  return (
    <div className="w-full">
      <div className="w-full aspect-[6/1] relative">
        <MyImage
          src={
            isMobileLayout
              ? lang === "ar"
                ? allBanners?.todays_deal.data.small.ar_image!
                : allBanners?.todays_deal.data.small.image!
              : lang === "ar"
              ? allBanners?.todays_deal.data.regular.ar_image!
              : allBanners?.todays_deal.data.regular.image!
          }
          className="object-cover object-center rounded"
          fill
        />
      </div>
    </div>
  );
};

export default TodaysDealsBanner;
