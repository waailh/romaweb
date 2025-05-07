"use client";

import { useSettings } from "@/store/global/settings";
import DownOpacityAnimator from "../animators/DownOpacityAnimator";
import MyImage from "../ui/MyImage";
import { useParams } from "next/navigation";

const SpecialDealBanner = () => {
  const { specialDeal } = useSettings();
  const { lang } = useParams();

  if (!specialDeal || !specialDeal.enabled) return;

  return (
    <div className="w-full">
      <div className="mt-4 ">
        {specialDeal != null && (
          <div className="w-full md:w-[100%]">
            <DownOpacityAnimator>
              <div className="relative w-full aspect-[3/1]">
                <MyImage
                  src={
                    lang == "ar" ? specialDeal.ar_banner : specialDeal.banner
                  }
                  className="object-cover object-center rounded"
                  fill
                />
              </div>
            </DownOpacityAnimator>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialDealBanner;
