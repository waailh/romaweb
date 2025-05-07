"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useAnalyze } from "../hooks/useAnalyze";

interface Props {
  className?: string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  placeholder?: true;
  isBanner?: boolean;
}

const MyImage = ({
  src,
  className,
  alt,
  width,
  height,
  fill,
  priority,
  placeholder,
  isBanner,
}: Props) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const { sendBannerClickEvent } = useAnalyze();

  const handleClick = () => {
    if (isBanner) {
      sendBannerClickEvent({ link: src });
    }
  };

  return (
    <div className="w-full h-full relative">
      <AnimatePresence>
        {!isLoaded && placeholder && (
          <motion.div
            // initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 6, y: "100%" }}
            transition={{ duration: 0.4 }}
            className="absolute w-full h-full inset-0 bg-gray-100 flex items-center justify-center z-layer-2"
          >
            <PhotoIcon className="size-10 text-gray-400" />
          </motion.div>
        )}
      </AnimatePresence>
      <Image
        onClick={() => handleClick()}
        src={src}
        className={` ${className} `}
        alt={alt || "/"}
        fill={fill || false}
        width={width}
        height={height}
        priority={priority || false}
        onLoad={() => setIsLoaded(true)}
        // placeholder="blur"
      />
    </div>
  );
};

export default MyImage;
