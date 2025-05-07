"use client";

import { Link } from "@/i18n.config";
import { useBanners } from "@/store/global/banners";
import MyImage from "../ui/MyImage";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useGlobals } from "@/store/global/globals";

const AffiliateBanner = () => {
  const { allBanners } = useBanners();
  const { isMobileLayout } = useGlobals();
  const { lang } = useParams();

  return (
    <div className="w-full my-3">
      <div className="wrapper">
        {allBanners && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <Link
              href="https://api.whatsapp.com/send?phone=971564948368"
              className="w-full"
            >
              <div className="w-full aspect-[3/1] md:aspect-[1246/70] relative">
                <MyImage
                  src={
                    isMobileLayout
                      ? lang === "ar"
                        ? allBanners.affiliate.data.small.ar_image
                        : allBanners.affiliate.data.small.image
                      : lang === "ar"
                      ? allBanners.affiliate.data.regular.ar_image
                      : allBanners.affiliate.data.regular.image
                  }
                  className="object-cover object-center rounded"
                  isBanner={true}
                  fill
                />
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AffiliateBanner;
