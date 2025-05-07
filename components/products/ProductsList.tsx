"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules"; // Import required modules
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { useParams } from "next/navigation";
import { Product } from "@/typings";
import ProductCard from "./helpers/ProductCard";
import { useGlobals } from "@/store/global/globals";
import { useTranslations } from "next-intl";

interface Props {
  max?: number;
  wishlist?: true;
  products: Product[];
}

const ProductsList = ({ max, wishlist, products: prods = [] }: Props) => {
  const { lang } = useParams();
  const { isMobileLayout } = useGlobals();
  const t = useTranslations("Wishlist");

  return (
    <div className="mt-4 w-full relative">
      <Swiper
        modules={[Navigation, Autoplay]} // Add Navigation and Autoplay modules
        slidesPerView={max || 4} // Set default number of slides to show
        spaceBetween={isMobileLayout ? 8 : 0} // Space between slides
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: lang === "ar" ? ".swiper-button-prev" : ".swiper-button-next",
          prevEl: lang === "ar" ? ".swiper-button-next" : ".swiper-button-prev",
        }}
        dir={lang === "ar" ? "rtl" : "ltr"} // Handle RTL
        breakpoints={{
          // Responsive breakpoints
          900: {
            slidesPerView: 4,
          },
          0: {
            slidesPerView: 2,
          },
        }}
      >
        {prods.map((one, i) => (
          <SwiperSlide key={i}>
            <div className="pb-1 relative group">
              <ProductCard product={one} />
              {/* {wishlist && (
                <div className="hidden group-hover:absolute top-1 w-full z-high bg-red-400 px-2 py-1 rounded">
                  {t("remov")}
                </div>
              )} */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button
        className={
          isMobileLayout
            ? "hidden"
            : "swiper-button-prev !bg-black/70 !rounded-full !size-8"
        }
      />
      <button
        className={
          isMobileLayout
            ? "hidden"
            : "swiper-button-next !bg-black/70 !rounded-full !size-8"
        }
      />
    </div>
  );
};

export default ProductsList;
