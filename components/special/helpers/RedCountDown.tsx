"use client";

import { ClockIcon, ReceiptPercentIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

interface Props {
  until: number;
}

const RedCountDown = ({ until }: Props) => {
  const calculateTimeLeft = () => {
    const difference = until * 1000 - Date.now();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(() => calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const t = useTranslations("Flashdeal");
  const ts = useTranslations("SpecialDeal");

  return (
    <motion.div
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -25, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-2 p-2 bg-gray-100 shadow-md flex justify-between items-start text-black border-t-4 border-primary"
    >
      <div className="w-full flex items-center justify-between ">
        <div className="flex items-center space-s-1">
          <ReceiptPercentIcon className="size-10" />
          <p className="text-sm md:text-lg">{ts("limited")}</p>
        </div>
        <div className="flex items-start space-s-2">
          <div className="flex flex-col justify-center text-center">
            <span className="text-2xl font-semibold border bg-primary text-white">
              {timeLeft.days}
            </span>
            <span className="p-1 text-xs ">{t("days")}</span>
          </div>
          <div className="flex flex-col justify-center text-center">
            <span className="text-2xl font-semibold border bg-primary text-white">
              {timeLeft.hours}
            </span>
            <span className="p-1 text-xs ">{t("hrs")}</span>
          </div>
          <div className="flex flex-col justify-center text-center">
            <span className="text-2xl font-semibold border bg-primary text-white">
              {timeLeft.minutes}
            </span>
            <span className="p-1 text-xs ">{t("mins")}</span>
          </div>
          <div className="flex flex-col justify-center text-center">
            <span className="text-2xl font-semibold border bg-primary text-white">
              {timeLeft.seconds}
            </span>
            <span className="p-1 text-xs ">{t("second")}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RedCountDown;
