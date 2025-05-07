"use client";

import React, { useEffect, useRef } from "react";
import Glide, { Controls, Breakpoints } from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
import MyImage from "../ui/MyImage";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { Brand } from "@/typings";

interface Props {
  sliders: Brand[];
}

const BrandsSlider = ({ sliders }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { lang } = useParams();

  // const { lang } = useSettings();

  useEffect(() => {
    if (sliderRef.current) {
      const glide = new Glide(sliderRef.current, {
        type: "carousel",
        animationDuration: 200,
        direction: lang == "ar" ? "rtl" : "ltr",
        autoplay: 3000,
        dragThreshold: 200,
        perTouch: 3,

        breakpoints: {
          6600: {
            perView: 7.1,
          },
          900: {
            perView: 5.1,
          },
          768: {
            perView: 3.1,
          },
        },

        startAt: 0,
        perView: 7.1,
        gap: 10,
      });

      glide.mount();

      return () => {
        glide.destroy();
      };
    }
  }, []);

  return (
    <div className="w-full relative">
      <div className="brands_glide" ref={sliderRef}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {sliders.map((one, i) => (
              <li key={i} className="glide__slide">
                <div className="py-1 px-1 rounded-lg hover:bg-white hover:shadow-2xl transition ease-in hover:scale-[1] duration-500 flex items-center justify-center">
                  <div className="relative size-20 md:size-40">
                    <MyImage
                      src={one.src}
                      className="object-contain rounded-md"
                      fill
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="glide__arrows" data-glide-el="controls">
          <button
            className="glide__arrow glide__arrow--left !bg-black/70 !rounded-full !flex !items-center !justify-center !p-1 hover:!bg-black !transition-all !ease-in !duration-300 !border-none"
            data-glide-dir="<"
          >
            <ArrowLeftIcon className="size-3 md:size-4 text-white" />
          </button>
          <button
            className="glide__arrow glide__arrow--right !bg-black/70 !rounded-full !flex !items-center !justify-center !p-1 hover:!bg-black !transition-all !ease-in !duration-300 !border-none"
            data-glide-dir=">"
          >
            <ArrowRightIcon className="size-3 md:size-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandsSlider;
