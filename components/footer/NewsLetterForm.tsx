"use client";

import { ifEmpty } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";

const NewsLetterForm = () => {
  const t = useTranslations("Footer");

  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (ifEmpty(email)) return toast.error(t("nomssg"));
    console.log(email);
  };

  return (
    <form
      action=""
      className="col-span-12 md:col-span-6 flex flex-col space-y-2 md:space-y-0 md:flex-row md:justify-between md:space-s-4 md:items-center text-sm"
    >
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("subsplace")}
        className="outline-none w-full bg-transparent px-3 py-2 rounded border-[1px] border-[#3E414B] transition-all duration-500 ease-in-out focus:border-[2px]"
      />

      <button className="bg-black text-white px-4 py-2 border-[1px] border-black rounded">
        {t("subsbtn")}
      </button>
    </form>
  );
};

export default NewsLetterForm;
