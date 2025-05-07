"use client";

import { useGlobals } from "@/store/global/globals";
import MobileNavbar from "../navbar/MobileNavbar";
import Navbar from "../navbar/Navbar";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import ResetPasswordModal from "./ResetPasswordModal";

const NavbarAll = () => {
  const { isMobileLayout } = useGlobals();
  return (
    <>
      {isMobileLayout ? <MobileNavbar /> : <Navbar />}
      <LoginModal />
      <RegisterModal />
      <ResetPasswordModal />
    </>
  );
};

export default NavbarAll;
