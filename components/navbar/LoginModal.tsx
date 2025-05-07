"use client";

import { Link, useRouter } from "@/i18n.config";
import { useAccountAuth } from "@/store/account/auth";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  ArrowPathIcon,
  EyeSlashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChangeEvent, MouseEvent, useState } from "react";

import GoogleAppleAuthButtons from "../helpers/GoogleAppleAuthButtons";
import { ifHasEmpty, validatePassword } from "@/lib/utils";
import toast from "react-hot-toast";
import { axiosPure } from "@/lib/auth/axios/axios";
import { useGlobals } from "@/store/global/globals";
import ContinueAsGuest from "../helpers/ContinueAsGuest";

type Form = {
  email: string;
  pass: string;
};

const initForm = {
  email: "",
  pass: "",
};

const LoginModal = () => {
  const { modal, setAuthModal } = useAccountAuth();
  const [form, setForm] = useState<Form>(initForm);

  const { handleSignIn } = useGlobals();

  const [passType, setPassType] = useState(true);

  const changeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const [loading, setLoading] = useState(false);

  const t = useTranslations("Navbar");
  const tm = useTranslations("Modals");
  const tet = useTranslations("ErrorToast");
  const tst = useTranslations("SuccessToast");

  const router = useRouter();

  const login = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    if (ifHasEmpty(form)) return toast.error(tet("emptyflds"));

    // actually sign up
    const axios = axiosPure();
    setLoading(true);

    axios
      .post(`/auth/login`, {
        login_by: "email",
        password: form.pass,
        email_or_phone: form.email,
      })
      .then((res) => {
        // console.log(res);
        if (res.data.result) {
          toast.success(tst("logged"));
          const { user, access_token } = res.data;
          handleSignIn(user, access_token);
          setAuthModal(null);
          router.push("/account");
        } else {
          toast.error(res.data.message[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        const { result, message } = err.response.data;
        if (!result) return toast.error(message[0]);
        toast.error(tet("err"));
      });
  };

  return (
    <div>
      <Dialog
        open={modal == "login"}
        as="div"
        className="relative z-layer-5 focus:outline-none"
        onClose={() => setAuthModal(null)}
      >
        <div className="fixed inset-0 z-layer-5 w-screen overflow-y-auto bg-black/20">
          <div className="flex min-h-full items-center md:items-start justify-center p-2 md:p-4">
            <DialogPanel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              // transition={{ duration: 0.3 }}
              className="w-full max-w-[600px] rounded-xl bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <DialogTitle
                  as="h3"
                  className="text-xl font-semibold text-black"
                >
                  {t("login")}
                </DialogTitle>
                <button onClick={() => setAuthModal(null)}>
                  <XMarkIcon className="size-4" />
                </button>
              </div>
              <form className="w-full flex flex-col space-y-4">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">{tm("emal")}</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={(e) => changeForm(e)}
                    type="email"
                    className="w-full border px-2 py-1 rounded text-sm outline-none"
                    placeholder={tm("enter")}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">{tm("pass")}</label>
                  <div className="flex items-center justify-between px-2 py-1 rounded text-sm border">
                    <input
                      name="pass"
                      value={form.pass}
                      onChange={(e) => changeForm(e)}
                      type={passType ? "password" : "text"}
                      className="w-full bg-transparent outline-none"
                      placeholder="**********"
                      required
                    />
                    <EyeSlashIcon
                      onClick={() => setPassType(!passType)}
                      className="size-4"
                    />
                  </div>
                  <div className="flex justify-end text-sm">
                    <span
                      onClick={() => setAuthModal("reset")}
                      className="text-blue-500 cursor-pointer hover:text-primary duration-300"
                    >
                      {tm("forg")}
                    </span>
                  </div>
                </div>
                <div className="text-sm">
                  <p>
                    <span>{tm("bycont")} </span>
                    <span>
                      <Link
                        className="underline hover:text-primary"
                        href="/terms"
                      >
                        {tm("trms")}
                      </Link>
                    </span>
                    <span> {tm("ofuse")} </span>
                    <span>
                      <Link
                        className="underline hover:text-primary"
                        href="/privacy-policy"
                      >
                        {tm("privcy")}
                      </Link>
                    </span>
                  </p>
                </div>
                <button
                  disabled={loading}
                  onClick={(e) => login(e)}
                  className="bg-primary px-4 py-2 rounded-full text-white hover:bg-black duration-500 flex items-center justify-center text-center"
                >
                  {loading ? (
                    <span>
                      <ArrowPathIcon className="animate-spin size-4" />
                    </span>
                  ) : (
                    <span>{tm("logn")}</span>
                  )}
                </button>
              </form>
              <div className="my-2 text-sm flex flex-col items-center justify-center">
                <p>
                  <span>{tm("dnthav")} </span>
                  <button
                    onClick={() => setAuthModal("register")}
                    className="font-semibold"
                  >
                    {tm("signup")}
                  </button>
                </p>
                <GoogleAppleAuthButtons />
                <ContinueAsGuest />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default LoginModal;
