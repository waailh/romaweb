"use client";

import { useGlobals } from "@/store/global/globals";
import Logo from "../helpers/Logo";
import HeaderSet from "../top/HeaderSet";
import MobileNavExpand from "./MobileNavExpand";
import NavbarButtons from "./NavbarButtons";
import MobileSearchLayer from "./MobileSearchLayer";

const MobileNavbar = () => {
  const { navScrolled } = useGlobals();
  return (
    <>
      <div className="w-full py-1" id="topnav">
        <div className="wrapper">
          <HeaderSet />
        </div>
      </div>
      <div
        className={`py-3 sticky top-0 z-layer-3 bg-white ${
          navScrolled ? "shadow" : ""
        }`}
        id="bottnav"
      >
        <div className="wrapper">
          <div className="flex items-center space-s-2 justify-between">
            <Logo size="sm" />
            <NavbarButtons />
          </div>
        </div>
      </div>

      <MobileNavExpand />
      <MobileSearchLayer />
    </>
  );
};

export default MobileNavbar;
