"use client";

import { motion } from "framer-motion";
import { useBanners } from "@/store/global/banners";
import MyImage from "../ui/MyImage";
import { useParams } from "next/navigation";
import { Link } from "@/i18n.config";

const DoubleBanners = () => {
  const { allBanners } = useBanners();
  const { lang } = useParams();

  return (
    <div className="w-full mt-4 mb-2">
      <div className="wrapper">
        {allBanners && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="grid grid-cols-12 gap-2">
              {allBanners.level_1.data[4] && (
                <div className="col-span-12 md:col-span-6">
                  <Link
                    href={allBanners.level_1.data[4]?.link || "#"}
                    className="w-full"
                  >
                    <div className="w-full aspect-[3/1] relative">
                      <MyImage
                        src={
                          lang == "ar"
                            ? allBanners.level_1.data[4]?.ar_image
                            : allBanners.level_1.data[4]?.image
                        }
                        className="object-cover object-center rounded"
                        isBanner={true}
                        fill
                      />
                    </div>
                  </Link>
                </div>
              )}
              {allBanners.level_1.data[5] && (
                <div className="col-span-12 md:col-span-6">
                  <Link
                    href={allBanners.level_1.data[5]?.link || "#"}
                    className="w-full"
                  >
                    <div className="w-full aspect-[3/1] relative">
                      <MyImage
                        src={
                          lang == "ar"
                            ? allBanners.level_1.data[5]?.ar_image
                            : allBanners.level_1.data[5]?.image
                        }
                        className="object-cover object-center rounded"
                        isBanner={true}
                        fill
                      />
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DoubleBanners;
