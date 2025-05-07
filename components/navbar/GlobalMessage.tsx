"use client";

import { useGlobals } from "@/store/global/globals";
import { useSettings } from "@/store/global/settings";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState } from "react";

import Marquee from "react-fast-marquee";

const GlobalMessage = () => {
  const { settings } = useSettings();

  // console.log("settings: ", settings);

  let en_mssg = settings?.find((one) => one.type == "global_message")?.value!;
  let ar_mssg = settings?.find((one) => one.type == "ar_global_message")
    ?.value!;

  const { isMobileLayout } = useGlobals();

  const { lang } = useParams();

  let mssg: string = lang == "ar" ? ar_mssg : en_mssg;

  if (!mssg) return;

  return (
    <div className="">
      <div className="wrapper">
        <div>
          <div className="w-full flex">
            <Marquee
              delay={4}
              direction={lang == "ar" ? "right" : "left"}
              speed={35}
              play={isMobileLayout}
              className={`${
                isMobileLayout
                  ? ""
                  : "flex items-center justify-center !w-fit hide-scrollbar"
              }`}
            >
              <motion.div
                initial={{ y: -25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -25, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`flex items-center space-s-2 text-red-600 w-fit mx-auto ${
                  isMobileLayout ? "me-10" : ""
                }`}
              >
                <ExclamationTriangleIcon className="size-4" />
                <p className="text-sm ">{mssg}</p>
              </motion.div>
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalMessage;
