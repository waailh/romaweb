"use client";

import OffersIcon from "@/public/assets/icons/sale-red.svg";
import CartIcon from "@/public/assets/icons/cart.svg";
import HeartIcon from "@/public/assets/icons/heart.svg";
import ProfileIcon from "@/public/assets/icons/profile.svg";
import ProfileGirlIcon from "@/public/assets/icons/girl.svg";
import { Link } from "@/i18n.config";
import { useGlobals } from "@/store/global/globals";
import MobileNavExpandToggler from "./MobileNavExpandToggler";
import { useTranslations } from "next-intl";
import MyImage from "../ui/MyImage";
import { useAccountAuth } from "@/store/account/auth";
import { axiosWithAuth } from "@/lib/auth/axios/axios";
import { useEffect, useState } from "react";
// import { useCarts } from "@/store/products/cart";
import { usePlaceOrder } from "@/store/products/order";
import { useCartsStore } from "@/store/products/carts";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type Counts = {
  cart_item_count: number;
  wishlist_item_count: number;
  order_count: number;
};

const NavbarButtons = () => {
  const { isMobileLayout, user, setCounts, setMobileSearchLayer, token } =
    useGlobals();

  const { modal, setAuthModal } = useAccountAuth();
  const { countsTrigger } = useCartsStore();
  const { order_status } = usePlaceOrder();

  // console.log("user: ", user);
  const t = useTranslations("Navbar");

  const toggleAuthModal = () => {
    setAuthModal(modal == null ? "login" : null);
  };

  const getUserCounts = () => {
    if (user) {
      const axios = axiosWithAuth();
      axios
        .get(`/profile/counters`)
        .then((res) => {
          // console.log(res);
          setCounts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getUserCounts();
  }, [user?.guest, countsTrigger, order_status]);

  return (
    <div className="flex items-center space-s-10 justify-between">
      <Link
        href="/offers"
        className="hidden md:flex text-red-600 underline items-center"
      >
        <span className="underline">{t("offs")}</span>
        <OffersIcon />
      </Link>

      <div className="flex items-center space-s-4 ">
        <div className="md:hidden">
          <button className="mt-1" onClick={() => setMobileSearchLayer(true)}>
            <MagnifyingGlassIcon className="size-6 " />
          </button>
        </div>

        <Link href="/cart" className="flex items-center space-s-2">
          <div className="relative">
            <CartIcon />

            {user?.counts && user.counts.cart_item_count !== undefined && (
              <div className="absolute top-[-10px] right-[-10px] z-layer-1 size-5 rounded-full bg-pinky flex items-center justify-center text-white text-[0.65rem]">
                {user.counts.cart_item_count}
              </div>
            )}
          </div>
        </Link>
        <Link href="/wishlist" className="flex items-center space-s-2">
          <div className="relative">
            <HeartIcon />
            {user?.counts && user.counts.wishlist_item_count !== undefined && (
              <div className="absolute top-[-10px] right-[-10px] z-layer-1 size-5 rounded-full bg-pinky flex items-center justify-center text-white text-[0.65rem]">
                {user.counts.wishlist_item_count}
              </div>
            )}
          </div>
        </Link>
        {isMobileLayout ? (
          <MobileNavExpandToggler />
        ) : (
          <>
            {!user || user.guest ? (
              <button className="" onClick={() => toggleAuthModal()}>
                <ProfileIcon />
              </button>
            ) : (
              <Link href="/account" className="relative">
                <ProfileIcon />
                <span className="absolute top-[-5px] end-[-3px] size-2 rounded-full bg-red-600"></span>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NavbarButtons;
