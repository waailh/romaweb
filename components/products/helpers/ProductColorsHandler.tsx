"use client";

import { useProducts } from "@/store/products/products";
import { ProductColor } from "@/typings";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCartsStore } from "@/store/products/carts";
import MyImage from "@/components/ui/MyImage";

interface Props {
  mini: boolean;
  colors: ProductColor[];
  is_lense: boolean;
}

const ProductColorsHandler = ({ mini, colors, is_lense }: Props) => {
  const { modalActiveMedia, mainActiveMedia, setActiveMedia } = useProducts();
  const activeMedia = mini ? modalActiveMedia : mainActiveMedia;
  const activeColor = colors.find((one) => one.path == activeMedia);

  const t = useTranslations("Product");

  const { setChoiceColor } = useCartsStore();

  const hasColors = colors.length > 0;

  const handleClick = (color: ProductColor) => {
    if (color.path) setActiveMedia(mini ? "modal" : "main", color.path);
    setChoiceColor(mini ? "modal" : "main", color.code.replace("#", ""));

    document.getElementById(color.code + "_media")?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  };

  return (
    hasColors && (
      <div className="">
        <div className="">
          <div className="max-w-full mt-2 flex items-center w-fit space-s-1 py-1 px-1 overflow-x-scroll hide-scrollbar">
            {colors.map((one, i) => (
              <div key={i} id={one.code + "_color"} className="w-full">
                <motion.div
                  key={i}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleClick(one)}
                  className="shrink-0 flex flex-col justify-center items-center space-y-1 transition-all duration-300 relative" // w-20
                >
                  {one.icon != null ? (
                    <div
                      className={`size-8 relative shrink-0 border border-white  ${
                        one.code == activeColor?.code
                          ? "ring-2 ring-primary"
                          : ""
                      }`}
                    >
                      <MyImage src={one.icon} fill />
                    </div>
                  ) : (
                    <div
                      className={`shrink-0 relative border p-[2px] border-white ${
                        one.code == activeColor?.code
                          ? "ring-2 ring-primary"
                          : ""
                      } ${
                        is_lense
                          ? "size-16 md:size-10 rounded-full"
                          : "size-10 md:size-10"
                      }`}
                    >
                      <div
                        style={{ background: one.code }}
                        className={`w-full h-full relative ${
                          is_lense ? "rounded-full" : ""
                        }`}
                      >
                        {is_lense && (
                          <MyImage src="/assets/icons/eye/eye.webp" fill />
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <h5 className="mt-2">
          {t("colr")}: {activeColor?.name!}
        </h5>
      </div>
    )
  );
};

export default ProductColorsHandler;
