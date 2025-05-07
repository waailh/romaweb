import MyImage from "../ui/MyImage";

import MasterSvg from "@/public/assets/images/pay/master.svg";
import VisaSvg from "@/public/assets/images/pay/visa.svg";
import AppleSvg from "@/public/assets/images/pay/apple.svg";
import GoogleSvg from "@/public/assets/images/pay/google.svg";

import TabbySvg from "@/public/assets/images/pay/tabby.svg";
import TamaraSvg from "@/public/assets/images/pay/tamara.svg";
import { useTranslations } from "next-intl";

const AcceptedPayments = () => {
  const t = useTranslations("Footer");

  return (
    <div className="w-full">
      <h4 className="text-grayee text-sm mb-2 font-bold">{t("accppays")}</h4>

      <div className="flex items-center space-s-2 my-8 md:my-3">
        <MasterSvg />
        <VisaSvg />
        <GoogleSvg />
        <AppleSvg />
      </div>
      {/* <div className="flex flex-col space-y-2">
        <h6>
          Get <span>0%</span> Installment by
        </h6>
        <div className="flex items-center space-s-3">
          <TabbySvg />
          <TamaraSvg />
        </div>
      </div> */}
    </div>
  );
};

export default AcceptedPayments;
