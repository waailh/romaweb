"use client";

import { useGlobals } from "@/store/global/globals";
import SideCart from "./SideCart";

const SideCartContainer = () => {
  const { isCartOpen } = useGlobals();
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      } w-80`} // Adjust width as needed, e.g., w-80 for 320px or use custom width
    >
      <SideCart />
    </div>
  );
};

export default SideCartContainer;
