"use client";
import { useEffect, useRef } from "react";
import { useGlobals } from "@/store/global/globals";

const ScrollHandler = () => {
  const { setScrolled, setIsMobileLayout } = useGlobals();

  const topNavId = "topnav";
  const bottNavId = "bottnav";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const topNav = document.getElementById(topNavId);
      const bottNav = document.getElementById(bottNavId);

      if (topNav && bottNav) {
        // const targetHeight = topNav.offsetHeight + bottNav.offsetHeight - 70;
        const targetHeight = topNav.offsetHeight * 0.8;
        if (scrollPosition > targetHeight) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
    };

    const handleResize = () => {
      setIsMobileLayout(window.innerWidth < 768);
    };

    handleResize(); // initial

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [setScrolled, setIsMobileLayout, topNavId, bottNavId]);

  return null;
};

export default ScrollHandler;
