"use client";

import { useMyOrders } from "@/store/account/orders";
import { useEffect, useState } from "react";
import { axiosWithAuth } from "@/lib/auth/axios/axios";
import SingleOrder from "./helpers/SingleOrder";
import Loading from "../ui/loaders/Loading";
import { useTranslations } from "next-intl";

const OrdersList = () => {
  const { orders, setOrders, addOrders, current_order, setCurrentOrder } =
    useMyOrders();
  const [page, setPage] = useState<number>(1);
  const [noMore, setNoMore] = useState<boolean>(false);

  const t = useTranslations("Account");

  const getOrders = () => {
    const axios = axiosWithAuth();
    axios
      .get(`/purchase-history?page=${"1"}`)
      .then((res) => {
        // console.log(res);
        if (res.data.success) {
          setOrders(res.data.data);
          if (res.data.data.length > 0) setCurrentOrder(res.data.data[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getMore = () => {
    const axios = axiosWithAuth();
    axios
      .get(`/purchase-history?page=${page + 1}`)
      .then((res) => {
        // console.log(res);
        if (res.data.success) {
          setPage((page) => page + 1);

          if (res.data.data.length > 0) {
            addOrders(res.data.data);
          } else {
            setNoMore(true);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-4 md:mt-0 col-span-12 md:col-span-7">
      <div className="max-h-[40rem] overflow-y-scroll w-full hide-scrollbar">
        {orders ? (
          orders.length > 0 && current_order ? (
            <div className="flex flex-col space-y-4">
              {orders.map((one, i) => (
                <div key={i}>
                  <SingleOrder order={one} count={i} />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-32 flex flex-col items-center justify-center">
              <p>{t("noordrs")}</p>
            </div>
          )
        ) : (
          <Loading />
        )}
      </div>
      {orders && orders.length > 0 && (
        <button
          disabled={noMore}
          onClick={() => getMore()}
          className={`mt-4 text-sm text-white px-2 py-1 rounded ${
            noMore ? "bg-black" : "bg-primary"
          }`}
        >
          {noMore ? t("nomor") : t("vwmor")}
        </button>
      )}
    </div>
  );
};

export default OrdersList;
