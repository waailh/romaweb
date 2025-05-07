"use client";

import { useSettings } from "@/store/global/settings";
import SpecialDealBanner from "./SpecialDealBanner";
import { Link } from "@/i18n.config";

const SpecialDealSection = () => {
  const { specialDeal } = useSettings();

  // console.log("specialDeal: ", specialDeal);

  if (!specialDeal || !specialDeal.enabled) return;

  return (
    <div className="wrapper">
      <div className="my-2">
        <Link href="/special-deal">
          <SpecialDealBanner />
        </Link>
      </div>
    </div>
  );
};

export default SpecialDealSection;
