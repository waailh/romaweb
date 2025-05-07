"use client";

import { Link } from "@/i18n.config";
import BreadCrumb from "../helpers/BreadCrumb";
import { useParams } from "next/navigation";
import { axiosWithAuth } from "@/lib/auth/axios/axios";
import toast from "react-hot-toast";
// import { useCarts } from "@/store/products/cart";
import CartList from "./CartList";
import { useFetchCart } from "../hooks/useFetchCart";
import { useTranslations } from "next-intl";
import { useCartsStore } from "@/store/products/carts";

const InnerCart = () => {
  const { lang } = useParams();
  const { triggerCounts, triggerCart, cart, setCart } = useCartsStore();

  const t = useTranslations("BreadC");
  const tc = useTranslations("Cart");
  const tet = useTranslations("ErrorToast");
  const tst = useTranslations("SuccessToast");

  const items = [{ name: t("crt"), link: "/cart" }];

  const clearAll = () => {
    const axios = axiosWithAuth();
    axios
      .delete(`/cart-clean`)
      .then((res) => {
        if (res.data.result) {
          triggerCounts();
          triggerCart();
          toast.success(tst("succremov"));
        }
      })
      .catch((err) => {
        toast.error(tet("err"));
      });
  };

  return (
    <div>
      <BreadCrumb items={items} />
      <div className="py-4">
        <div className="wrapper">
          <CartList />

          {/* total + checkout */}

          {cart && cart.sub_total > 0 && (
            <div className="text-sm">
              {/* <div className="flex items-center justify-between">
                  <div className="">{tc("tot")}</div>
                  <div className="font-bold">1760 AED</div>
                </div> */}
              <div className="flex justify-end py-2">
                <div className="flex items-center space-s-2">
                  <button
                    onClick={() => clearAll()}
                    className="px-4 py-2 border border-black text-black rounded"
                  >
                    {tc("clrall")}
                  </button>
                  <Link
                    href="/checkout?mode=data"
                    className="px-4 py-2 border border-primary bg-primary text-white rounded hover:shadow-lg"
                  >
                    {tc("chckout")}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InnerCart;
