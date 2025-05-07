"use client";

import { Link } from "@/i18n.config";
import { axiosWithAuth } from "@/lib/auth/axios/axios";
import { useSettings } from "@/store/global/settings";
// import { useCarts } from "@/store/products/cart";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MyImage from "../ui/MyImage";
import { formatPrice, ifEmpty, splitter } from "@/lib/utils";
import {
  MinusIcon,
  PercentBadgeIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import CartItemsLoader from "../ui/loaders/CartItemsLoader";
import { useParams } from "next/navigation";
import { useFetchCart } from "../hooks/useFetchCart";
import { useCartsStore } from "@/store/products/carts";
import { useTranslations } from "next-intl";
// import { useGlobals } from "@/store/global/globals";

const CartList = () => {
  // const { token } = useGlobals();
  // console.log(token);
  const { currency } = useSettings();

  const t = useTranslations("Cart");
  const ts = useTranslations("SpecialDeal");
  const tet = useTranslations("ErrorToast");

  const { cartTrigger, triggerCart } = useCartsStore();

  const { lang } = useParams();

  const { triggerCounts, cart, setCart } = useCartsStore();

  const axios = axiosWithAuth();

  const { getCartData } = useFetchCart();

  // there are so many triggers for the cart values
  useEffect(() => {
    getCartData();
  }, [cartTrigger]);

  const changeQuantity = (id: number, quan: number) => {
    axios
      .post(`/carts/change-quantity`, { id: id, quantity: quan })
      .then((res) => {
        console.log(res);
        if (res.data.result) {
          triggerCart();
          triggerCounts();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message || tet("err"));
      });
  };

  return (
    <div>
      {cart && cart.cart_items ? (
        <>
          {cart.cart_items.length > 0 ? (
            <div className="bg-lightgray flex flex-col space-y-2 md:space-y-4 mb-1">
              {/* carts */}
              <div className="flex flex-col divide-y space-y-2">
                {cart.cart_items.map((one, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-start p-1 "
                  >
                    {/* first */}
                    <div className="flex items-start space-s-3">
                      <div className="relative">
                        <Link href={`/product/${one.product_slug}`}>
                          <div className="h-20 md:h-32 aspect-[7/5] relative overflow-hidden">
                            <MyImage
                              src={one.product_thumbnail_image}
                              className="hover:scale-[1.02] duration-500 object-cover rounded transition-all ease-in"
                              fill
                            />
                          </div>
                          {one.special && (
                            <div className="absolute bottom-0 w-full text-[10px] text-white bg-red-500 flex space-s-1 items-center justify-center">
                              <PercentBadgeIcon className="size-4 animate-pulse" />
                              <p>{ts("speci")}</p>
                            </div>
                          )}
                        </Link>

                        <div className="absolute top-[-10px] left-[-4px] size-6 text-xs text-white bg-primary rounded-full flex items-center justify-center">
                          {one.quantity}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 text-sm">
                        <Link href={`/product/${one.product_slug}`}>
                          <h4 className="hover:text-primary hover:underline">
                            {lang == "ar"
                              ? one.product_ar_name
                              : one.product_name}
                          </h4>
                        </Link>

                        {one.variation && (
                          <div className="flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-s-2 md:items-start">
                            <span>{t("specs")}:</span>
                            <div className="flex items-center flex-wrap gap-1 md:px-1">
                              {splitter(one.variation).map((va, i) => (
                                <div
                                  key={i}
                                  className="px-2 py-1 rounded border border-primary text-primary text-xs md:text-sm"
                                >
                                  {va}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {one.description && (
                          <div className="flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-s-2 md:items-start">
                            <span>{t("specs")}:</span>
                            <div className="flex items-center flex-wrap gap-1 md:px-1">
                              {one.description}
                            </div>
                          </div>
                        )}

                        {/* price && sale area */}
                        <div className="mt-2 flex items-center space-s-2 justify-between">
                          {/* price */}
                          <div className="flex items-center space-s-2">
                            {one.has_discount && (
                              <p className="shrink-0 text-xs md:text-sm text-gray-400 line-through">
                                <span>
                                  {formatPrice(
                                    one.stroked_price.toString(),
                                    currency!
                                  )}
                                </span>
                              </p>
                            )}

                            <p className="shrink-0 text-black">
                              <span>
                                {formatPrice(
                                  one.unit_price.toString(),
                                  currency!
                                )}
                              </span>
                            </p>
                          </div>
                          {/* sale */}
                          {one.has_discount && !one.special && (
                            <div className="shrink-0 bg-red-600 px-1 rounded text-white text-xs md:text-sm">
                              {one.discount}
                            </div>
                          )}
                          {/* offer */}
                          {one.free_count > 0 && (
                            <div className="flex items-center space-s-2">
                              <div className="shrink-0 bg-red-600 px-1 rounded text-white text-xs md:text-sm">
                                <span>
                                  {" "}
                                  {one.free_count} {t("free")}
                                </span>
                              </div>
                              {["buy1get1", "buy2get1", "buy3get1"].includes(
                                one.offer
                              ) && (
                                <div className="shrink-0 bg-green-600 px-1 rounded text-white text-xs md:text-sm">
                                  <span>{one.offer}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="mt-auto flex items-center space-s-2 text-xs">
                          (<span>{t("tax")}:</span>
                          <span className="">
                            {formatPrice(one.tax.toString(), currency!)}
                          </span>
                          )
                        </div>

                        <div className="mt-auto flex items-center space-s-2">
                          <span>{t("itmtot")}:</span>
                          <span className="font-bold text-md md:text-lg">
                            {formatPrice(one.price.toString(), currency!)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* end */}
                    <div className="flex flex-col items-end space-y-4 justify-between text-sm">
                      <button
                        onClick={() => changeQuantity(one.id, 0)}
                        className="p-1"
                      >
                        <XMarkIcon className="size-4" />
                      </button>
                      <div className="border px-2 py-1 flex items-center text-sm rounded space-s-3">
                        <button
                          onClick={() =>
                            changeQuantity(one.id, one.quantity - 1)
                          }
                        >
                          <MinusIcon className="size-3" />
                        </button>
                        <span>{one.quantity}</span>
                        <button
                          onClick={() =>
                            changeQuantity(one.id, one.quantity + 1)
                          }
                        >
                          <PlusIcon className="size-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col space-y-2 border-y py-2 px-1 md:px-2">
                <div className="flex items-center justify-between">
                  <div className="">{t("subtot")}</div>
                  <div className="">
                    <span>
                      {formatPrice(cart.sub_total.toString(), currency!)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="">{t("taxes")}</div>
                  <div className="">
                    <span>{formatPrice(cart.taxes.toString(), currency!)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between font-bold">
                  <div className="">{t("carttot")}</div>
                  <div className="">
                    <span>
                      {formatPrice(
                        (cart.sub_total + cart.taxes).toString(),
                        currency!
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-2 bg-lightgray rounded justify-center items-center min-h-[300px] md:min-h-[500px] flex flex-col">
              <p className="font-bold">{t("noitms")}</p>
              <Link
                href="/category/all"
                className="py-1 px-3 bg-black text-white mt-2 rounded"
              >
                {t("shop")}
              </Link>
            </div>
          )}
        </>
      ) : (
        <CartItemsLoader />
      )}
    </div>
  );
};

export default CartList;
