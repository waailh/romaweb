"use client";

import { Link } from "@/i18n.config";
import { useBanners } from "@/store/global/banners";
import MyImage from "../ui/MyImage";
import { useParams } from "next/navigation";
import DownOpacityAnimator from "../animators/DownOpacityLogoAnimator";

const CouponArea = () => {
  const { allBanners } = useBanners();

  const { lang } = useParams();

  return (
    <div className="w-full">
      <div className="mt-4 md:mt-0 mb-4 p-1 md:p-2 rounded-xl bg-lightgray flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-s-4 md:justify-between">
        {allBanners != null && (
          <div className="w-full md:w-[100%]">
            <DownOpacityAnimator>
              <Link
                href={allBanners.level_1.data[3]?.link || "#"}
                className="w-full"
              >
                <div className="relative w-full aspect-[3/1]">
                  <MyImage
                    src={
                      lang == "ar"
                        ? allBanners.level_1.data[3]?.ar_image
                        : allBanners.level_1.data[3]?.image
                    }
                    className="object-cover object-center rounded"
                    fill
                  />
                </div>
              </Link>
            </DownOpacityAnimator>
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponArea;
