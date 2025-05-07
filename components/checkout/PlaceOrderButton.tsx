"use client";

import { useRouter } from "@/i18n.config";
import { axiosWithAuth } from "@/lib/auth/axios/axios";
// import { useCarts } from "@/store/products/cart";
import { useCartsStore } from "@/store/products/carts";
import { usePlaceOrder } from "@/store/products/order";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAnalyze } from "../hooks/useAnalyze";
import { useSettings } from "@/store/global/settings";

const PlaceOrderButton = () => {
  const t = useTranslations("Checkout");
  const tet = useTranslations("ErrorToast");

  const { cart } = useCartsStore();
  const { gift, setOrderStatus, payment_method } = usePlaceOrder();
  const { sendPurchaseEvent } = useAnalyze();
  const { specialDeal } = useSettings();

  const [loading, setLoading] = useState<boolean>(false);

  // const online_payment_gateway = "myfatoorah";
  const online_payment_gateway = "ngenius";

  const router = useRouter();

  const placeOrder = () => {
    if (cart?.summary?.can_order) {
      if (payment_method) {
        const axios = axiosWithAuth();
        switch (payment_method) {
          case "cash_on_delivery":
            if (!cart?.summary?.cod_available)
              return toast.error(tet("addnavail"));

            setLoading(true);
            axios
              .post(`/order/store`, {
                payment_type: payment_method,
                gift_id: gift,
              })
              .then((res) => {
                console.log(res);
                if (res.data.result) {
                  setOrderStatus("success");
                  sendPurchaseEvent({ orderData: res.data.order });
                  router.push(
                    `/checkout/success?id=${res.data.combined_order_id}`
                  );
                } else {
                  toast.error(tet("smthngwrong"));
                }

                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
                toast.error(tet("failord"));
              });
            break;

          case "online_payment":
            setLoading(true);
            axios
              .post(`/${online_payment_gateway}/get-payment-url`, {
                gift_id: gift,
              })
              .then((res) => {
                // console.log(res);
                if (res.data.result) {
                  setOrderStatus("success");
                  router.push(`${res.data.url}`);
                } else {
                  toast.error(tet("smthngwrong"));
                }

                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
                toast.error(tet("failordcomp"));
              });
            break;

          default:
            toast.error(tet("paysupnot"));
            break;
        }
      } else {
        toast.error(tet("paysel"));
      }
    } else {
      if (!cart?.summary?.address_pass) toast.error(tet("veraddnot"));
      if (!cart?.summary?.special_pass)
        toast.error(
          `${tet("specialoffernot")} ${specialDeal?.min_cart_value} AED`
        );
    }
  };

  return (
    <div>
      <button
        disabled={loading}
        onClick={() => placeOrder()}
        className="w-full bg-black text-white px-4 py-1 rounded hover:shadow-lg duration-300 text-center flex items-center justify-center"
      >
        {loading ? (
          <span>
            <ArrowPathIcon className="animate-spin size-4" />
          </span>
        ) : (
          <span>{t("order")}</span>
        )}
      </button>
    </div>
  );
};

export default PlaceOrderButton;
