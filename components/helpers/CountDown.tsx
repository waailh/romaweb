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

const CountDown = ({ until }: Props) => {
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

  return (
    <motion.div
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -25, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-white rounded-lg shadow-md flex justify-between items-start"
    >
      <div className="flex items-center space-s-4">
        <ClockIcon className="size-8 md:size-12 text-primary" />
        <div className="flex flex-col">
          <div className="flex items-center space-s-2 mb-2">
            <div className="flex flex-col justify-center text-center">
              <span className="text-primary text-2xl font-semibold">
                {timeLeft.days}
              </span>
              <span className="border p-1 text-sm rounded font-semibold">
                {t("days")}
              </span>
            </div>
            <div className="flex flex-col justify-center text-center">
              <span className="text-primary text-2xl font-semibold">
                {timeLeft.hours}
              </span>
              <span className="border p-1 text-sm rounded font-semibold">
                {t("hrs")}
              </span>
            </div>
            <div className="flex flex-col justify-center text-center">
              <span className="text-primary text-2xl font-semibold">
                {timeLeft.minutes}
              </span>
              <span className="border p-1 text-sm rounded font-semibold">
                {t("mins")}
              </span>
            </div>
            <div className="flex flex-col justify-center text-center">
              <span className="text-primary text-2xl font-semibold">
                {timeLeft.seconds}
              </span>
              <span className="border p-1 text-sm rounded font-semibold">
                {t("second")}
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-400">{t("timeleft")}</div>
        </div>
      </div>
      <div className="">
        <ReceiptPercentIcon className="size-10 text-red-600" />
      </div>
    </motion.div>
  );
};

export default CountDown;
