"use client";

// import { useRouter } from "@/i18n.config"; // can not use this

import { useGlobals } from "@/store/global/globals";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const InnerSocialsHandler = () => {
  const searchParams = useSearchParams();
  const { handleSignIn } = useGlobals();
  const router = useRouter();

  useEffect(() => {
    const res = searchParams.get("res");

    const parsed = JSON.parse(decodeURIComponent(res as string));
    const original = parsed.original;

    // console.log("the res: ", original);
    handleSignIn(original?.user, original?.access_token);
    router.push("/en/account");
  }, []);

  return <></>;
};

export default InnerSocialsHandler;
