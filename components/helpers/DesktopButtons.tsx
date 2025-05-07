"use client";

import { motion } from "framer-motion";

import {
  BoltIcon,
  ChevronDoubleRightIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "@/i18n.config";
import { useGlobals } from "@/store/global/globals";
import { useTranslations } from "next-intl";

const DesktopButtons = () => {
  const { isMobileLayout } = useGlobals();
  const router = useRouter();

  const t = useTranslations("Navbar");

  const buttonData = [
    {
      icon: <BoltIcon className="size-7" />,
      text: t("flash"),
      link: "/flash-deals",
    },
    {
      icon: <TagIcon className="size-7" />,
      text: t("todaysdeal"),
      link: "/todays-offers",
    },
    // { icon: <ListBulletIcon className="size-7" />, text: "More", link: "/" },
  ];

  return (
    <>
      {!isMobileLayout && (
        <div
          className="fixed left-0 top-1/2 transform -translate-y-1/2 space-y-2 z-high"
          dir="ltr"
        >
          {buttonData.map((button, index) => (
            <motion.div
              onClick={() => router.push(button.link)}
              key={index}
              className="relative flex items-center space-s-3 group bg-primary overflow-hidden cursor-pointer"
              initial={{ width: "2.5rem" }}
              whileHover={{ width: "11.5rem" }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="w-fit p-1 flex items-center justify-center text-white rounded-full">
                {button.icon}
              </div>
              <div className="shrink-0 flex-1 flex items-center justify-between pr-2 text-white text-md">
                <span className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {button.text}
                </span>
                <span className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ChevronDoubleRightIcon className="size-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default DesktopButtons;
