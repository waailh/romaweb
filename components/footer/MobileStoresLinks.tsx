import { Link } from "@/i18n.config";

import AppleStoreIcon from "@/public/assets/icons/stores/apple.svg";
import GoogleStoreIcon from "@/public/assets/icons/stores/google.svg";
import { useTranslations } from "next-intl";

const MobileStoresLinks = () => {
  const t = useTranslations("Footer");

  const links = {
    google:
      "https://play.google.com/store/apps/details?id=lenses.romaopticals.com.dev.dev",
    apple: "https://apps.apple.com/us/app/roma/id1524857901",
  };

  return (
    <div className="flex flex-col text-white space-y-2 my-4 md:my-3 text-sm">
      <Link
        href={links.apple}
        className="bg-black flex items-center px-6 py-1 lg:py-3 justify-center space-s-2 rounded-lg hover:bg-primary transition-all ease-in-out duration-300"
      >
        <AppleStoreIcon className="shrink-0" />
        <span>{t("applst")}</span>
      </Link>
      <Link
        href={links.google}
        className="bg-black flex items-center px-6 py-1 lg:py-3 justify-center space-s-2 rounded-lg hover:bg-primary transition-all ease-in-out duration-300"
      >
        <GoogleStoreIcon className="shrink-0" />
        <span>{t("googst")}</span>
      </Link>
    </div>
  );
};

export default MobileStoresLinks;
