"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import MyImage from "../ui/MyImage";
import { useParams } from "next/navigation";
import { Category } from "@/typings";
import { Link } from "@/i18n.config";
import { useGlobals } from "@/store/global/globals";

interface Props {
  sliders: Category[];
}

const SubcatsSlider = ({ sliders }: Props) => {
  const { lang } = useParams();
  const { isMobileLayout } = useGlobals();

  return (
    <div className="w-full relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={5} // Show 5 slides at a time
        spaceBetween={1} // Space between slides
        // slidesPerGroup={4} // step
        navigation={{
          nextEl: lang == "ar" ? ".swiper-button-prev" : ".swiper-button-next",
          prevEl: lang == "ar" ? ".swiper-button-next" : ".swiper-button-prev",
        }}
        autoplay={{
          delay: 2500, // Delay between slide transitions (in milliseconds)
          pauseOnMouseEnter: true,
        }}
        dir={lang === "ar" ? "rtl" : "ltr"} // Handle RTL
        breakpoints={{
          // Responsive breakpoints
          900: {
            slidesPerView: 8.1,
          },
          768: {
            slidesPerView: 6.1,
          },
          0: {
            slidesPerView: 4.4,
          },
        }}
      >
        {sliders.map((one, i) => (
          <SwiperSlide key={i}>
            <Link href={`/category/${one.slug}`}>
              <div className="py-1 px-1 rounded-lg hover:bg-white hover:shadow-2xl transition ease-in hover:scale-[1] duration-500 flex items-center justify-center">
                <div className="relative size-20 md:size-40">
                  <MyImage
                    src={one.icon}
                    className="object-contain rounded-md"
                    fill
                  />
                </div>
              </div>
            </Link>
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

export default SubcatsSlider;
