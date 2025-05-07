"use client";

import React, { useEffect, useRef } from "react";
import Glide, { Controls, Breakpoints } from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
import MyImage from "../ui/MyImage";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useSettings } from "@/store/global/settings";
import { useParams } from "next/navigation";
import { Link } from "@/i18n.config";

interface Props {
  sliders: { photo: string; ar_photo: string; link: string }[];
}

const MainSliders = ({ sliders }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { lang } = useParams();
  // const { lang } = useSettings();

  useEffect(() => {
    if (sliderRef.current) {
      const glide = new Glide(sliderRef.current, {
        type: "carousel",
        focusAt: "center",
        autoplay: 7000,
        // peek: { before: 40, after: 40 },
        hoverpause: true,
        animationDuration: 2000,
        direction: lang === "ar" ? "rtl" : "ltr",

        startAt: 0,
        perView: 1,
        gap: 30,
      });

      glide.mount();

      return () => {
        glide.destroy();
      };
    }
  }, []);

  // console.log(sliders);

  return (
    <div className="w-full relative">
      <div className="glide" ref={sliderRef}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {sliders.map((one, i) => (
              <li key={i} className="glide__slide">
                <Link href={one.link || "#"}>
                  <div className="relative w-full aspect-[5/2]">
                    <MyImage
                      src={lang == "ar" ? one.ar_photo : one.photo}
                      className="object-cover rounded-lg md:rounded-3xl"
                      priority={i <= 1} // make sure first two sliders are loaded first
                      isBanner={true}
                      fill
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex glide__arrows" data-glide-el="controls">
          <button
            className="glide__arrow glide__arrow--left !bg-white !rounded-full !flex !items-center !justify-center !p-1 text-xs md:text-md hover:!bg-gray-100"
            data-glide-dir="<"
          >
            <ArrowLeftIcon className="size-3 md:size-4 text-black" />
          </button>
          <button
            className="glide__arrow glide__arrow--right !bg-white !rounded-full !flex !items-center !justify-center !p-1 text-xs md:text-md hover:!bg-gray-100"
            data-glide-dir=">"
          >
            <ArrowRightIcon className="size-3 md:size-4 text-black" />
          </button>
        </div>

        {/* bullets */}
        <div
          className={`glide__bullets !absolute !bottom-[-32px] !transform ${
            lang === "ar"
              ? "!right-1/2 !left-auto !translate-x-1/2"
              : "!left-1/2 !right-auto !-translate-x-1/2"
          } !flex !justify-center !w-fit !mx-auto`}
          data-glide-el="controls[nav]"
        >
          {sliders.map((one, i) => (
            <button
              key={i}
              data-glide-dir={`=${i}`}
              className="glide__bullet !h-2 !w-2 !bg-grayee"
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainSliders;
