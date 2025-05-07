import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const ScrollUpButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;

      if (scrolled >= 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    showButton && (
      <button
        onClick={scrollToTop}
        className="size-8 aspect-square flex items-center justify-center bg-primary text-white rounded-full shadow-lg hover:bg-black transition transform animate-bounce-slow"
      >
        <ArrowUpIcon className="size-4" />
      </button>
    )
  );
};

export default ScrollUpButton;
