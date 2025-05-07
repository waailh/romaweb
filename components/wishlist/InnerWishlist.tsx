"use client";

import { useWishlist } from "@/store/products/wishlist";
import { Product } from "@/typings";

import BreadCrumb from "@/components/helpers/BreadCrumb";
import ProductsList from "@/components/products/ProductsList";
import { Link } from "@/i18n.config";
import { useEffect } from "react";
import { axiosWithAuth } from "@/lib/auth/axios/axios";
import Loading from "../ui/loaders/Loading";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const InnerWishlist = () => {
  const { wishlist, setWishlist } = useWishlist();

  const t = useTranslations("BreadC");
  const tw = useTranslations("Wishlist");
  const tet = useTranslations("ErrorToast");
  const tst = useTranslations("SuccessToast");

  const items = [{ name: t("wish"), link: "#" }];

  const axios = axiosWithAuth();
  const getWishlist = () => {
    axios
      .get(`/wishlists`)
      .then((res) => {
        // console.log(res);
        setWishlist(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const clearAll = () => {
    axios
      .delete(`/wishlists-remove-all`)
      .then((res) => {
        if (res.data.result) {
          toast.success(tst("succremov"));
          setWishlist([]);
        }
      })
      .catch((err) => {
        toast.error(tet("err"));
      });
  };

  return (
    <div>
      <BreadCrumb items={items} />
      <div className="wrapper">
        {/* title & buttons */}
        <div className="mt-4 flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:justify-between">
          <h3 className="text-xl">{tw("savedprods")}</h3>
          <div className="flex items-center space-s-3">
            <button
              onClick={() => clearAll()}
              className="bg-white text-black border border-black rounded px-2 py-1 text-sm"
            >
              {tw("clrall")}
            </button>
            {/* <button className="bg-white text-black border border-black rounded px-2 py-1 text-sm">
              {tw("sharewish")}
            </button> */}
            {/* <button className="bg-black text-white border border-black rounded px-2 py-1 text-sm">
             {tw("addall")}
            </button> */}
          </div>
        </div>

        <div className="">
          {wishlist ? (
            <>
              {wishlist.length > 0 ? (
                <>
                  <ProductsList
                    products={wishlist.map((one) => one.product.data[0])}
                    wishlist={true}
                  />
                </>
              ) : (
                <div className="mt-4 rounded p-2 md:p-6 h-[200px] md:h-[400px] flex items-center flex-col bg-lightgray justify-center space-y-2">
                  <span>{tw("noitms")}</span>
                  <Link
                    href="/category/all"
                    className="bg-black px-2 py-1 text-sm text-white rounded"
                  >
                    {tw("explr")}
                  </Link>
                </div>
              )}
            </>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};

export default InnerWishlist;
