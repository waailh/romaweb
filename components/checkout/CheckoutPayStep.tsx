import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import MyImage from "../ui/MyImage";

import { motion } from "framer-motion";

import MasterSvg from "@/public/assets/images/pay/master.svg";
import VisaSvg from "@/public/assets/images/pay/visa.svg";
import AppleSvg from "@/public/assets/images/pay/apple.svg";
import GoogleSvg from "@/public/assets/images/pay/google.svg";
import { Link, useRouter } from "@/i18n.config";

import TabbySvg from "@/public/assets/images/pay/tabby.svg";
import TamaraSvg from "@/public/assets/images/pay/tamara.svg";
import RadioButton from "./ui/RadioButton";
import { useEffect, useState } from "react";
import { usePlaceOrder } from "@/store/products/order";
import PlaceOrderButton from "./PlaceOrderButton";
import { useCheckout } from "@/store/account/checkout";
import { useTranslations } from "next-intl";
import UsePoints from "./UsePoints";
import DownOpacityAnimator from "../animators/DownOpacityLogoAnimator";
import { useCartsStore } from "@/store/products/carts";
import { useSettings } from "@/store/global/settings";
// import { useCarts } from "@/store/products/cart";

const methods = [
  {
    id: 1,
    name: "Cash On Delivery",
    ar_name: "الدفع عند الوصول",
    api_name: "cash_on_delivery",
  },
  {
    id: 2,
    name: "Online Payment",
    ar_name: "الدفع الالكتروني",
    api_name: "online_payment",
  },
  // {
  //   id: 3,
  //   name: "With Points",
  //   ar_name: "الدفع الالكتروني",
  //   api_name: "points",
  // },
];

const CheckoutPayStep = () => {
  const { payment_method, setPaymentMethod } = usePlaceOrder();
  const { cart, triggerCart } = useCartsStore();
  const { settings } = useSettings();

  let isFreeShippingOnlineEnabled: boolean =
    settings?.find((one) => one.type == "online_payment_free_delivery")
      ?.value == "1";

  const handleSetMethod = (data: string) => {
    setPaymentMethod(data);
    if (isFreeShippingOnlineEnabled) triggerCart();
  };

  const t = useTranslations("Checkout");

  return (
    <>
      <UsePoints />
      <p className="font-bold my-1">{t("chosepay")}:</p>
      <div className="flex flex-col space-y-2 mb-4">
        {methods.map((one, i) => {
          let component;

          switch (one.id) {
            case 1:
              component = cart?.summary.cod_available && (
                <div className="flex items-center justify-between space-s-3 border py-2 px-2 rounded">
                  <div className="flex items-center space-s-2">
                    <RadioButton active={one.api_name == payment_method} />
                    <span className="font-bold">{t("cash")}</span>
                  </div>
                  {cart?.summary.shipping_cost! > 0 &&
                    isFreeShippingOnlineEnabled && (
                      <p className="text-xs text-green-600 font-bold">
                        {t("withdelfee")}
                      </p>
                    )}
                </div>
              );
              break;
            case 2:
              component = (
                <div className="flex flex-col space-y-2 border py-2 rounded">
                  <div className="flex items-start justify-between space-s-3 px-2">
                    <div className="flex items-center space-s-2">
                      <RadioButton active={one.api_name == payment_method} />
                      <span className="font-bold">{t("online")}</span>
                    </div>
                    <div className="flex items-center space-s-2">
                      <MasterSvg />
                      <VisaSvg />
                      <GoogleSvg />
                      <AppleSvg />
                    </div>
                  </div>

                  {isFreeShippingOnlineEnabled && (
                    <div className="">
                      <DownOpacityAnimator>
                        <p className="mt-1 w-fit text-sm py-1 text-white bg-gradient-to-r from-black to-primary px-2 ">
                          {t("onlinefree")}
                        </p>
                      </DownOpacityAnimator>
                    </div>
                  )}
                </div>
              );
              break;

            case 3:
              component = (
                <div className="flex items-center justify-between space-s-3 border py-2 px-2 rounded">
                  <div className="flex items-center space-s-2">
                    <RadioButton active={one.api_name == payment_method} />
                    <span className="font-bold">{t("points")}</span>
                  </div>
                  <div className="text-primary flex items-center space-s-1 text-sm">
                    <ExclamationCircleIcon className="size-5" />
                    0000
                  </div>
                </div>
              );
              break;

            default:
              break;
          }

          return (
            <div
              onClick={() => handleSetMethod(one.api_name)}
              key={i}
              className="cursor-pointer"
            >
              {component}
            </div>
          );
        })}

        {/* <div className="flex items-center justify-between space-s-3 border py-2 px-2 rounded">
          <div className="flex items-center space-s-2">
            <RadioButton />
            <span className="font-bold">Installments</span>
          </div>
          <div className="text-primary flex items-center space-s-1 text-sm">
            <TabbySvg />
            <TamaraSvg />
          </div>
        </div> */}
      </div>
      {/* actions */}
      <div className="mt-4 flex flex-col space-y-4">
        <PlaceOrderButton />
      </div>
    </>
  );
};

export default CheckoutPayStep;
