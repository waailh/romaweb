"use client";

import GoogleIcon from "@/public/assets/icons/social/auth/google.svg";
import AppleIcon from "@/public/assets/icons/social/auth/apple.svg";
import { axiosPure } from "@/lib/auth/axios/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const GoogleAppleAuthButtons = () => {
  const axios = axiosPure();
  const router = useRouter();

  const t = useTranslations("Modals");
  const tet = useTranslations("ErrorToast");

  const getLink = (provider: string) => {
    axios
      .get(`/auth/social/${provider}`)
      .then((res) => {
        // console.log(res);
        if (res.data.result) {
          router.push(res.data.link);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(tet("redirecterr"));
      });
  };

  return (
    <>
      <p className="text-bet my-3">
        <span className="mx-2">{t("orcontin")}</span>
      </p>
      <div className="w-full flex items-start space-s-2">
        <button
          disabled={false}
          onClick={() => getLink("google")}
          className="w-[50%] flex items-center space-s-2 px-3 py-2 h-12 justify-center rounded-full border hover:bg-black hover:text-white duration-300 text-xs md:text-sm"
        >
          <GoogleIcon />
          <span>{t("congoog")}</span>
        </button>
        <button
          disabled={false}
          onClick={() => getLink("apple")}
          className="w-[50%] flex items-center space-s-2 px-3 py-2 h-12 justify-center rounded-full border hover:bg-black hover:text-white duration-300 text-xs md:text-sm"
        >
          <AppleIcon />
          <span>{t("conappl")}</span>
        </button>
      </div>
    </>
  );
};

export default GoogleAppleAuthButtons;
