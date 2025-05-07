"use client";

import SearchBox from "../top/SearchBox";
import HeaderSet from "../top/HeaderSet";

import { Link } from "@/i18n.config";
import { useGlobals } from "@/store/global/globals";
import Logo from "../helpers/Logo";
// import DownOpacityLogoAnimator from "../animators/DownOpacityLogoAnimator";
import NavbarButtons from "./NavbarButtons";
import NavbarLinks from "./NavbarLinks";
import AllBrandsButtonAnimator from "../animators/AllBrandsButtonAnimator";
import AllBrandsButton from "./AllBrandsButton";

const Navbar = () => {
  const { navScrolled } = useGlobals();

  return (
    // must be a fragment for the sticky to work
    <div className="sticky top-0 bg-white z-layer-3" id="navbar">
      {/* top nav */}
      <div className="py-2 w-full flex" id="topnav">
        <div className="wrapper">
          <div className="w-full apart ">
            <div className="flex items-center space-s-2 relative">
              <Logo size="lg" />
            </div>
            <SearchBox />
            <HeaderSet />
          </div>
        </div>
      </div>

      {/* bottom nav */}
      <div
        className={`bg-white py-2 w-full ${navScrolled ? "shadow-lg" : ""}`}
        id="bottnav"
      >
        <div className="wrapper">
          <div className="w-full flex justify-between items-center space-s-20">
            <AllBrandsButtonAnimator>
              <AllBrandsButton />
            </AllBrandsButtonAnimator>

            <NavbarLinks />

            <NavbarButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
