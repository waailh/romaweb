import { MegaphoneIcon } from "@heroicons/react/24/outline";
import MyAddressesInner from "./MyAddressesInner";
import { useTranslations } from "next-intl";

const MyAddresses = () => {
  const t = useTranslations("Account");

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* main */}
      <div className="col-span-12 md:col-span-7">
        <MyAddressesInner />
      </div>

      {/* end */}
      <div className="col-span-12 md:col-span-5">
        {/* hint */}
        <div className="p-2 md:p-3 rounded-lg border flex flex-col">
          <div className="flex items-center space-s-2 text-primary mb-2">
            <MegaphoneIcon className="size-4 md:size-5" />
            <span className="font-bold">{t("hint")}</span>
          </div>
          <ul className="list-disc px-4 text-sm">
            <li>
              <p>{t("adju")}</p>
            </li>
            <li>
              <p>{t("choosbet")}</p>
            </li>
            <li>
              <p>{t("listany")}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyAddresses;
