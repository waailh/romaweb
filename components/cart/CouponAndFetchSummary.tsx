"use client";

import { axiosWithAuth } from "@/lib/auth/axios/axios";
import { ifEmpty } from "@/lib/utils";
// import { useCarts } from "@/store/products/cart";
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MouseEvent, useState } from "react";
import toast from "react-hot-toast";

import DownOpacityAnimator from "../animators/DownOpacityLogoAnimator";
import { useCartsStore } from "@/store/products/carts";
import { useTranslations } from "next-intl";

const CouponAndFetchSummary = () => {
  const { cart, triggerCart } = useCartsStore();

  const [coupon, setCoupon] = useState<string>("");

  const t = useTranslations("Checkout");
  const tet = useTranslations("ErrorToast");
  const tst = useTranslations("SuccessToast");

  const axios = axiosWithAuth();

  const handleApplyCoupon = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (ifEmpty(coupon)) return toast.error(tet("emptyflds"));

    const tId = toast.loading(tet("plswait"));
    axios
      .post(`/coupon-apply`, { coupon_code: coupon })
      .then((res) => {
        // console.log(res);
        if (res.data.result) {
          toast.success(tst("sucaddcoup"), { id: tId });
          triggerCart();
        } else {
          switch (res.data.message) {
            case "Coupon expired!":
              toast.error(tet("coupex"), { id: tId });
              break;

            case "Invalid coupon code!":
              toast.error(tet("invcoup"), { id: tId });
              break;

            default:
              toast.error(res.data.message, { id: tId });
              break;
          }
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(tet("err"), { id: tId });
      });
  };

  const removeCoupon = () => {
    axios
      .post(`/coupon-remove`)
      .then((res) => {
        if (res.data.result) {
          toast.success(tst("succremov"));
          triggerCart();
        } else {
          toast.error(tet("fyld"));
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(tet("fyld"));
      });
  };

  return (
    <>
      <div className="flex flex-col space-y-2 md:px-2">
        <div className="flex items-center space-s-2">
          <p>{t("cop")}</p>
        </div>

        <form className="flex items-center space-s-3 text-sm">
          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            type="text"
            className="border rounded border-black bg-transparent px-2 py-1 outline-none w-full focus:bg-black/10 duration-300"
          />

          <button
            disabled={cart?.summary?.coupon_applied}
            onClick={(e) => handleApplyCoupon(e)}
            className="border rounded bg-black border-black text-white px-2 py-1"
          >
            {t("appl")}
          </button>
        </form>

        {/* coupon message */}
        {cart?.summary && (
          <div>
            <DownOpacityAnimator>
              <div
                className={`px-2 py-1 rounded w-full flex items-center space-s-2 ${
                  cart?.summary.coupon_applied
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-xs"
                }`}
              >
                {cart?.summary.coupon_applied ? (
                  <CheckBadgeIcon className="text-green-600 size-5" />
                ) : (
                  <ExclamationCircleIcon className="size-5" />
                )}
                <div className="flex-1 flex flex-col space-y-2 md:flex-row md:flex-y-0 md:justify-between md:space-s-2 shrink-0 text-sm">
                  <p className="">
                    {cart?.summary.coupon_applied
                      ? `${t("cop")} ${cart?.summary.coupon_code} ${t("isapp")}`
                      : t("nocop")}
                  </p>
                </div>

                {cart?.summary.coupon_applied && (
                  <button
                    onClick={() => removeCoupon()}
                    className="text-xs px-1 py-[1px] shrink-0 rounded bg-green-50 flex items-center border space-s-2 w-fit"
                  >
                    <XMarkIcon className="size-3" />
                    <span>{t("remv")}</span>
                  </button>
                )}
              </div>
            </DownOpacityAnimator>
          </div>
        )}
      </div>
    </>
  );
};

export default CouponAndFetchSummary;
