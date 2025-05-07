"use client";
const story = {
  result: true,
  data: [
    {
      date: 1717167950910,
      details: {
        authorApp: "apigeeV2",
        authorId: null,
      },
      status: "Order Created",
      statusCode: "1",
    },
    {
      date: 1717187950910,
      details: {
        authorApp: "apigeeV2",
        authorId: null,
      },
      status: "Order Processed",
      statusCode: "1",
    },
    {
      date: 1717207950910,
      details: {
        authorApp: "apigeeV2",
        authorId: null,
      },
      status: "Order Shipped",
      statusCode: "1",
    },
  ],
};

import { formatDate } from "@/lib/utils";
import { useMyOrders } from "@/store/account/orders";
import Loading from "../ui/loaders/Loading";
import { useTranslations } from "next-intl";
import QuiqupIFrame from "../helpers/QuiqupIFrame";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const OrderTrack = () => {
  const { current_Story, current_order } = useMyOrders();

  const [expanded, setExpanded] = useState<boolean>(true);

  const t = useTranslations("Account");

  return (
    <div className="mt-8 md:mt-0 w-full p-2 md:p-4 rounded border shadow-lg">
      {current_order?.track ? (
        <>
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="w-full flex items-center justify-between px-2 py-1 bg-gray-100 rounded"
          >
            <div className="font-bold text-sm mb-2">{t("trck")}</div>
            <div>
              <ChevronDownIcon className="size-5" />
            </div>
          </button>

          {expanded && current_order.track.tracking_url ? (
            <QuiqupIFrame url={current_order.track.tracking_url} />
          ) : (
            <div className="mt-2 text-sm">{t("emptytrack")}</div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default OrderTrack;
