"use client";

import { axiosWithAuth } from "@/lib/auth/axios/axios";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeart } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import { useCarts } from "@/store/products/cart";
import { useCartsStore } from "@/store/products/carts";
import { useGlobals } from "@/store/global/globals";
import { useTranslations } from "next-intl";

interface Props {
  pId: number;
  size?: "small" | "big";
}

const AddToWishlistButton = ({ pId, size }: Props) => {
  const tst = useTranslations("SuccessToast");

  const [isWished, setIsWished] = useState<boolean | null>(null);

  const { triggerCounts } = useCartsStore();
  const { user } = useGlobals();

  const axios = axiosWithAuth();

  const checkIfWishlist = () => {
    if (user)
      axios
        .get(`/wishlists-check-product?product_id=${pId}`)
        .then((res) => {
          setIsWished(res.data.is_in_wishlist);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const addWishlist = () => {
    axios
      .post(`/wishlists-add-product`, { product_id: pId })
      .then((res) => {
        setIsWished(res.data.is_in_wishlist);
        triggerCounts();

        toast.success(tst("succaddd"));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeWishlist = () => {
    axios
      .delete(`/wishlists-remove-product?product_id=${pId}`)
      .then((res) => {
        setIsWished(res.data.is_in_wishlist);
        triggerCounts();
        toast.success(tst("succremov"));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    checkIfWishlist();
  }, [user]);

  return (
    <button
      onClick={
        isWished == null
          ? () => console.log("wait..")
          : isWished
          ? () => removeWishlist()
          : () => addWishlist()
      }
      className={`shrink-0 h-full aspect-sqaure flex items-center justify-center border rounded border-black hover:bg-black hover:text-white duration-300 ease-in-out ${
        size == "small" ? "p-1" : "p-2"
      }`}
    >
      {isWished != null && (
        <>
          {isWished ? (
            <FilledHeart
              className={`text-red-600 hover:text-white duration-300 ${
                size == "small"
                  ? "size-5 hover:scale-[1.1]"
                  : "size-5 hover:scale-[1.2]"
              }`}
            />
          ) : (
            <HeartIcon
              className={`hover:text-red-600 duration-300 ${
                size == "small"
                  ? "size-5 hover:scale-[1.1]"
                  : "size-5 hover:scale-[1.2]"
              }`}
            />
          )}
        </>
      )}
    </button>
  );
};

export default AddToWishlistButton;
