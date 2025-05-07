"use client";

import Lottie from "lottie-react";
import animationData from "@/public/assets/animations/ss.json";
import { Link } from "@/i18n.config";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useAnalyze } from "../hooks/useAnalyze";
import { useParams, useSearchParams } from "next/navigation";
import { OrderDataType } from "@/typings";

const InnerSuccessPage = () => {
  const t = useTranslations("Messages");

  const { sendPurchaseEvent } = useAnalyze();
  const searchParams = useSearchParams();

  useEffect(() => {
    const orderDataParam = searchParams.get("orderData");
    if (orderDataParam) {
      const decodedData = decodeURIComponent(orderDataParam!);
      const orderData = JSON.parse(atob(decodedData)) as OrderDataType;

      // console.log("fetched data from url: ", orderData);
      // Send purchase event with the decoded order data
      sendPurchaseEvent({ orderData });
    }
  }, []);

  return (
    <div className="py-12">
      <div className="wrapper">
        <div className="flex flex-col items-center text-center justify-center space-y-2">
          <Lottie
            animationData={animationData}
            loop={false}
            autoplay={true}
            style={{ width: 120, height: 120 }}
          />
          <div className="mt-4 md:mt-8 text-center">
            <h4>{t("succs")}</h4>
            <div className="mt-4">
              <Link
                href="/account?mode=orders"
                className="bg-black px-3 py-1 text-sm rounded text-white"
              >
                {t("vuorder")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnerSuccessPage;
