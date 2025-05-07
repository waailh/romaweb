import MobileStoresLinks from "./MobileStoresLinks";
import { useTranslations } from "next-intl";

const MobileAppsLinks = () => {
  const t = useTranslations("Footer");
  return (
    <div className="w-full">
      <h4 className="text-grayee text-sm mb-2 font-bold">{t("mobs")}</h4>
      <MobileStoresLinks />
    </div>
  );
};

export default MobileAppsLinks;
