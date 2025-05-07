"use client";

import { useGlobals } from "@/store/global/globals";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

interface Props {
  mobile?: boolean;
}

const LogoutButton = ({ mobile }: Props) => {
  const { logout, user } = useGlobals();

  const tst = useTranslations("SuccessToast");

  const handleLogout = () => {
    logout();
    toast.success(tst("outsuc"));
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  return (
    <>
      {user && !user.guest && (
        <button
          onClick={() => handleLogout()}
          className={`shrink-0 items-center space-s-2 px-2 py-1 w-fit md:w-full rounded ${
            mobile ? "flex md:hidden" : "hidden md:flex"
          }`}
        >
          <ArrowLeftStartOnRectangleIcon className="size-4" />
          <span>Logout</span>
        </button>
      )}
    </>
  );
};

export default LogoutButton;
