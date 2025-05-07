"use client";

// import { useCarts } from "@/store/products/cart";
import CartList from "./CartList";
import { formatPrice } from "@/lib/utils";
import { useSettings } from "@/store/global/settings";
import DownOpacityAnimator from "../animators/DownOpacityLogoAnimator";
import { useCartsStore } from "@/store/products/carts";
import { useTranslations } from "next-intl";
import CouponAndFetchSummary from "./CouponAndFetchSummary";

const CheckoutCart = () => {
  const { cart } = useCartsStore();
  const { currency } = useSettings();

  const t = useTranslations("Checkout");

  return (
    <div className="w-full">
      <div className="">
        <div className=" bg-lightgray md:p-4 flex flex-col space-y-2 md:space-y-4 rounded-xl">
          {/* carts */}
          <CartList />

          {/* coupon */}
          <CouponAndFetchSummary />

          {/* total + checkout */}
          {cart?.summary && (
            <DownOpacityAnimator>
              <div className="text-sm">
                <div className="flex items-center justify-between">
                  <div className="">{t("shipfee")}</div>
                  <div className="">
                    {cart?.summary.shipping_cost != null ? (
                      <span>
                        +
                        {formatPrice(
                          cart?.summary.shipping_cost.toString(),
                          currency!
                        )}
                      </span>
                    ) : (
                      <span>-</span>
                    )}
                  </div>
                </div>

                {/* regular coupon discount */}
                {cart?.summary.discount > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="">{t("copdis")}</div>
                    <div className="">
                      <span>
                        -
                        {formatPrice(
                          cart?.summary.discount.toString(),
                          currency!
                        )}
                      </span>
                    </div>
                  </div>
                )}

                {/* points discount */}
                {cart?.summary.points_discount > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="">{t("poidis")}</div>
                    <div className="">
                      <span>
                        -
                        {formatPrice(
                          cart?.summary.points_discount.toString(),
                          currency!
                        )}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="">{t("gtot")}</div>
                  <div className="font-bold text-xl">
                    <span>
                      {formatPrice(
                        cart?.summary.grand_total.toString(),
                        currency!
                      )}
                    </span>
                  </div>
                </div>
                <p className="mt-2">{t("allapp")}</p>
              </div>
            </DownOpacityAnimator>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutCart;
