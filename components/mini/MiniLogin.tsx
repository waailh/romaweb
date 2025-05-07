"use client";

import { UserIcon } from "@heroicons/react/24/outline";
import { Link } from "@/i18n.config";
import MyImage from "../ui/MyImage";
import { useGlobals } from "@/store/global/globals";
import { useAccountAuth } from "@/store/account/auth";
import { useTranslations } from "next-intl";

const MiniLogin = () => {
  const { user, setMobileNav } = useGlobals();

  const t = useTranslations("Account");

  const { setAuthModal } = useAccountAuth();

  const handleOpenAuth = () => {
    setMobileNav(false);
    setAuthModal("login");
  };

  return (
    <div>
      {user && !user.guest ? (
        <>
          <Link href="/account" className="relative">
            <UserIcon className="size-5" />
            <span className="absolute top-[-5px] end-[-3px] size-2 rounded-full bg-red-600"></span>
          </Link>
        </>
      ) : (
        <>
          <button
            onClick={() => handleOpenAuth()}
            className="flex items-center space-s-2 text-xs"
          >
            <UserIcon className="size-5" />
            <span>{t("log")}</span>
          </button>
        </>
      )}
    </div>
  );
};

export default MiniLogin;
