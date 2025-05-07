"use client";

import { Link } from "@/i18n.config";
import NewsLetter from "./NewsLetter";
import MyImage from "../ui/MyImage";

import SocialLinks from "./SocialLinks";
import AcceptedPayments from "./AcceptedPayments";
import MobileAppsLinks from "./MobileAppsLinks";
import DownOpacityAnimator from "../animators/DownOpacityLogoAnimator";
import FooterCategories from "./FooterCategories";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import CompanyList from "./CompanyList";
import OurStoreList from "./OurStoreList";

const texts = {
  bio: "Roma Optical is a Chain of Stores in the UAE and an Online Platform Specializing in Cosmetic Contact Lenses and Clear Lenses.",
  ar_bio:
    "روما اوبتكال عبارة عن مجموعة متاجر في الامارات و عبر الإنترنت خاصة  بالعدسات اللاصقة التجميلية و الطبية",
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const { lang } = useParams();
  const t = useTranslations("Footer");

  return (
    <div className="bg-graybg mt-8 py-6">
      <div className="wrapper">
        {/* first */}
        <DownOpacityAnimator>
          <NewsLetter />
        </DownOpacityAnimator>

        {/* mid */}
        <div className="pt-4 pb-12 grid grid-cols-12 gap-2 md:gap-4">
          <div className="col-span-12 lg:col-span-3">
            <div className="logo">
              <div className="h-[80px] w-[170px] md:h-[70px] md:w-[140px] relative">
                <MyImage
                  src="/assets/logo/roma-colored.svg"
                  fill
                  className="object-fit"
                />
              </div>
            </div>
            <p className="my-4 text-sm pe-1 md:pe-3">
              {lang == "ar" ? texts.ar_bio : texts.bio}
            </p>
            <SocialLinks />
          </div>
          {/* inner grid */}
          {/* <div className="mt-4 md:mt-0 col-span-12 lg:col-span-6 grid grid-cols-9 gap-4 md:gap-2"></div> */}

          <div className="col-span-12 mt-4 md:mt-0 lg:col-span-2">
            <FooterCategories />
          </div>
          <div className="col-span-12 lg:col-span-2">
            <CompanyList />
          </div>
          <div className="col-span-12 lg:col-span-2">
            <OurStoreList />
          </div>
          <div className="col-span-12 mt-4 md:mt-0 lg:col-span-3">
            <AcceptedPayments />
            <MobileAppsLinks />
          </div>
        </div>

        {/* lower */}
        <hr className="h-[1px] bg-gray-300 my-4 md:my-6" />
        <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:justify-between items-center md:space-s-4 text-sm">
          <div className="flex items-center space-s-3">
            <Link href="/terms">{t("trms")}</Link>
            <Link href="/privacy-policy">{t("priv")}</Link>
          </div>
          <p>
            © {currentYear} {t("rigts")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
