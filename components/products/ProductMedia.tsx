"use client";

import { useEffect } from "react";
import MyImage from "../ui/MyImage";
import { motion } from "framer-motion";
import YoutubeEmbeded from "../ui/YoutubeEmbeded";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import { useProducts } from "@/store/products/products";
import { useParams, useSearchParams } from "next/navigation";
import { useCartsStore } from "@/store/products/carts";
import { ProductColor } from "@/typings";
import { useURLColor } from "../hooks/useURLColor";

interface Props {
  mini: boolean;
  thumbnail: string;
  vid?: string;
  main_photos: string[];
  colors: ProductColor[];
  small?: boolean;
}

const ProductMedia = ({
  thumbnail,
  main_photos,
  colors,
  vid,
  small,
  mini,
}: Props) => {
  const { setChoiceColor } = useCartsStore();
  const { modalActiveMedia, mainActiveMedia, setActiveMedia } = useProducts();
  const activeMedia = mini ? modalActiveMedia : mainActiveMedia;

  const { lang } = useParams();
  const searchParams = useSearchParams();
  const { handleURLColor } = useURLColor();

  const { miniProd, prod } = useProducts();
  const prodd = mini ? miniProd : prod;

  const { product_slug } = useParams();

  const handleMediaClick = (one: string) => {
    setActiveMedia(mini ? "modal" : "main", one);

    const code = colors?.find((colr) => colr.path == one)?.code!;

    if (code) {
      document.getElementById(code + "_color")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
      setChoiceColor(mini ? "modal" : "main", code.replace("#", ""));
    }
  };

  useEffect(() => {
    const urlColor = searchParams.get("color");

    if (urlColor) {
      handleURLColor({ color: urlColor, colors });
    } else {
      colors.length > 0
        ? setActiveMedia(
            mini ? "modal" : "main",
            colors[0].path || main_photos[0]
          )
        : setActiveMedia(mini ? "modal" : "main", main_photos[0]);
    }
  }, [product_slug]);

  return (
    <>
      <div className="flex flex-col md:flex-row md:space-s-2">
        {/* images */}
        <div className="mt-2 md:mt-0 order-2 md:order-1 flex flex-row space-s-2 md:space-s-0 md:flex-col md:space-y-2 md:max-h-[400px] overflow-x-scroll md:overflow-x-auto md:overflow-y-scroll hide-scrollbar">
          {main_photos
            // .filter((one) => !one.includes("placeholder"))
            .map((one, i) => (
              <div
                key={i}
                className={`relative shrink-0 ${
                  small ? "size-6 md:size-8" : "size-10 md:size-16"
                } ${
                  one === activeMedia ? "border border-primary rounded" : ""
                }`}
                onClick={() => handleMediaClick(one)}
              >
                <MyImage
                  src={one}
                  className="object-cover object-center rounded"
                  fill
                  // placeholder={true}
                />
              </div>
            ))}
          {colors?.map((one, i) => {
            if (one.path) {
              return (
                <div
                  key={i}
                  id={one.code + "_media"}
                  // ref={one.path === activeMedia ? activeImageRef : undefined}
                  className={`relative shrink-0 ${
                    small ? "size-8 md:size-8" : "size-10 md:size-16"
                  } ${
                    one.path === activeMedia
                      ? "border border-primary rounded"
                      : ""
                  }`}
                  onClick={() => handleMediaClick(one.path)}
                >
                  <MyImage
                    src={one.path}
                    className="object-cover object-center rounded"
                    fill
                    // placeholder={true}
                  />
                </div>
              );
            }
          })}
          {vid && (
            <div
              className={`flex items-center justify-center border rounded relative shrink-0 ${
                small ? "size-6 md:size-8" : "size-10 md:size-16"
              } ${vid! === activeMedia ? "border border-primary rounded" : ""}`}
              onClick={() => handleMediaClick(vid!)}
            >
              <VideoCameraIcon className="size-5" />
            </div>
          )}
        </div>

        {/* viewed image */}
        {activeMedia && (
          <div className="order-1 md:order-2 flex flex-row space-s-2 md:space-s-0 md:flex-col md:space-y-2 flex-1 ">
            <div className="w-full aspect-[8/9] relative">
              <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                {activeMedia?.includes("youtube") ? (
                  <YoutubeEmbeded url={activeMedia} />
                ) : (
                  <MyImage
                    src={activeMedia}
                    className="object-cover object-center rounded-md"
                    alt={lang == "ar" ? prodd?.ar_name : prodd?.name}
                    fill
                  />
                )}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductMedia;
