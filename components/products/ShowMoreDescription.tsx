"use client";

import { useGlobals } from "@/store/global/globals";
import { useProductTabs } from "@/store/products/details";
import { useTranslations } from "next-intl";

const ShowMoreDescription = () => {
  const { isMobileLayout } = useGlobals();
  const { setActiveTab } = useProductTabs();

  const t = useTranslations("Product");

  const showDes = () => {
    setActiveTab("des");

    // Scroll to the description area
    const navbarDiv = isMobileLayout ? "bottnav" : "navbar";
    const navbarHeight = document.getElementById(navbarDiv)?.offsetHeight;
    const targetElement = document.getElementById("detsArea");
    if (targetElement) {
      const yOffset = -navbarHeight!;
      const y =
        targetElement.getBoundingClientRect().top +
        window.scrollY +
        yOffset -
        15;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  return (
    <button
      onClick={() => showDes()}
      className="text-primary underline hover:text-black text-sm"
    >
      {t("redmor")}
    </button>
  );
};

export default ShowMoreDescription;
