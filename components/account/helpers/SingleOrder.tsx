"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { Order } from "@/typings";
import { useMyOrders } from "@/store/account/orders";
import OrderTrack from "../OrderTrack";
import { useState } from "react";
import { useParams } from "next/navigation";
import MyImage from "@/components/ui/MyImage";
import { Link } from "@/i18n.config";
import { formatPrice, splitter } from "@/lib/utils";
import { useSettings } from "@/store/global/settings";
import { useTranslations } from "next-intl";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { getToken } from "@/lib/auth/auth";
import axios from "axios";

interface Props {
  order: Order;
  count: number;
}

const SingleOrder = ({ order, count }: Props) => {
  const { current_order, setCurrentOrder, setCurrentStory } = useMyOrders();

  const { currency } = useSettings();

  const t = useTranslations("Account");

  const handleSelect = () => {
    setCurrentOrder(order);
  };

  const { lang } = useParams();

  const {
    items: { gift, data: details },
    grand_total: total,
  } = order;

  const downloadInvoice = async () => {
    try {
      const token = getToken(); // Retrieve token from localStorage in the browser

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get(`/api/invoice?id=${order.id}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`, // Send token to the API route
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `${order.code}_invoice.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the PDF:", error);
    }
  };

  return (
    <Disclosure
      as="div"
      className={`border p-2 md:p-3 rounded ${
        current_order == order ? "shadow border-primary" : ""
      }`}
      defaultOpen={current_order?.id == order.id}
    >
      <DisclosureButton
        as="div"
        onClick={() => setCurrentOrder(order)}
        className="group flex w-full items-center justify-between"
      >
        <div className="">
          <div className="font-bold text-sm">
            #{t("ordrid")}: {order.code}
          </div>
        </div>
        <div className="flex flex-col space-y-2 items-end">
          <ChevronDownIcon
            className={`size-5 fill-black/60 group-data-[hover]:fill-black/50 group-data-[open]:rotate-180`}
          />
          <span
            className={`underline font-bold text-xs ${
              order.delivery_status == "Delivered"
                ? "text-green-600"
                : "text-orange-500"
            }`}
          >
            {order.delivery_status}
          </span>
        </div>
      </DisclosureButton>
      <DisclosurePanel className="mt-2 text-sm/5 text-black/50">
        <div className="">
          <div className="">
            {order.delivery_status.toLocaleLowerCase() == "delivered" && (
              <button
                onClick={() => downloadInvoice()}
                className="my-2 bg-gray-700 text-white px-2 py-1 rounded text-sm flex items-center space-s-2"
              >
                <ArrowDownTrayIcon className="size-4" />
                <span>{t("dwninv")}</span>
              </button>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-s-2">
              <span>{t("date")}</span>
              <span>{order.date}</span>
            </div>
            <div className="">
              {order.payment_status == "Paid" ? (
                <span className="bg-green-500 px-2 py-[1px] rounded text-white">
                  {t("paid")}
                </span>
              ) : (
                <span className="bg-red-500 px-2 py-[1px] rounded text-white">
                  {t("unpaid")}
                </span>
              )}
            </div>
          </div>
          <h6 className="mb-2 font-bold">{t("itms")}:</h6>
          <div className="flex flex-col space-y-2">
            {gift && (
              <div className="py-1 px-2 flex flex-col border rounded">
                <div className="flex items-center space-s-2">
                  <p className="text-black">{t("yurgift")}:</p>
                </div>
                <div className="flex items-center space-s-2">
                  <Link href={`/product/${gift.product_slug}`}>
                    <div className="size-12 md:size-18 relative">
                      <MyImage
                        src={gift.product_thumbnail}
                        className="object-cover rounded object-center"
                        fill
                      />
                    </div>
                  </Link>
                  <div className="">
                    <Link
                      href={`/product/${gift.product_id}`}
                      className="hover:text-primary"
                    >
                      <span>
                        {lang == "ar"
                          ? gift.product_ar_name
                          : gift.product_name}
                      </span>
                    </Link>
                    <div className="bg-red-600 px-1 text-xs w-fit text-white rounded">
                      {t("fre")}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {details &&
              details.map((one, i) => (
                <div
                  key={i}
                  className="flex items-center space-s-2 pt-1 border-t"
                >
                  <Link href={`/product/${one.product_slug}`}>
                    <div className="size-12 md:size-18 relative">
                      <MyImage
                        src={one.product_thumbnail}
                        className="object-cover rounded object-center"
                        fill
                      />
                    </div>
                  </Link>
                  <div className="flex items-start space-s-1">
                    <p>{one.quantity}x</p>
                    <div className="flex-1 flex-col space-y-2">
                      <Link
                        href={`/product/${one.product_slug}`}
                        className="hover:text-primary"
                      >
                        <span>
                          {lang == "ar"
                            ? one.product_ar_name
                            : one.product_name}
                        </span>
                      </Link>
                      {one.variation && (
                        <div className="flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-s-2 md:items-center">
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
                    </div>
                  </div>
                </div>
              ))}
            {total && (
              <div className="flex items-center space-s-2">
                <div className="">{t("tot")}</div>
                <p className="text-black font-bold">
                  {formatPrice(total.toString(), currency!)}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden">
          <OrderTrack />
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default SingleOrder;
