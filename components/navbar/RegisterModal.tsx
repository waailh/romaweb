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
import { ChangeEvent, MouseEvent, useState } from "react";

import GoogleAppleAuthButtons from "../helpers/GoogleAppleAuthButtons";
import { ifEqual, ifHasEmpty, validatePassword } from "@/lib/utils";
import toast from "react-hot-toast";
import { axiosPure, axiosWithAuth } from "@/lib/auth/axios/axios";
import { useGlobals } from "@/store/global/globals";
import ContinueAsGuest from "../helpers/ContinueAsGuest";
import { useTranslations } from "next-intl";

type Form = {
  name: string;
  email: string;
  pass: string;
  confirm_pass: string;

  // dob
  dob_d: number;
  dob_m: number;
  dob_y: number;
};

const initForm = {
  name: "",
  email: "",
  pass: "",
  confirm_pass: "",

  // dob
  dob_d: 0,
  dob_m: 0,
  dob_y: 0,
};

const RegisterModal = () => {
  const t = useTranslations("Modals");
  const tet = useTranslations("ErrorToast");
  const tst = useTranslations("SuccessToast");

  const { modal, setAuthModal } = useAccountAuth();
  const [form, setForm] = useState<Form>(initForm);

  const { handleSignIn } = useGlobals();

  const [passType, setPassType] = useState(true);
  const [passConfType, setPassConfType] = useState(true);

  const [loading, setLoading] = useState(false);

  const changeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const router = useRouter();

  const signup = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    if (ifHasEmpty(form)) return toast.error(tet("emptyflds"));

    const passValidate = validatePassword(form.pass);
    switch (passValidate) {
      case "short":
        return toast.error(tet("passshort"));
        break;
      case "number":
        return toast.error(tet("passnum"));
        break;
      case "letter":
        return toast.error(tet("passletter"));
        break;
      case "strange":
        return toast.error(tet("passstrange"));
        break;

      default:
        break;
    }

    if (!ifEqual(form.pass, form.confirm_pass))
      return toast.error(tet("passmatch"));

    // actually sign up
    const axios = axiosWithAuth();
    setLoading(true);

    axios
      .post(`/auth/transform-user`, {
        name: form.name,
        register_by: "email",
        password: form.pass,
        email_or_phone: form.email,
        dob: `${form.dob_y}-${form.dob_m}-${form.dob_d}`,
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
        toast.error(tet("err"));
      });
  };

  return (
    <div>
      <Dialog
        open={modal == "register"}
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
                  {t("regs")}
                </DialogTitle>
                <button onClick={() => setAuthModal(null)}>
                  <XMarkIcon className="size-4" />
                </button>
              </div>
              <form className="w-full flex flex-col space-y-4">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">{t("fulln")}</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={(e) => changeForm(e)}
                    type="text"
                    className="w-full border px-2 py-1 rounded text-sm outline-none"
                    placeholder={t("entefuln")}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">{t("emal")}</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={(e) => changeForm(e)}
                    type="email"
                    className="w-full border px-2 py-1 rounded text-sm outline-none"
                    placeholder={t("enter")}
                    required
                  />
                </div>

                <div className="flex flex-row items-center space-s-2">
                  <div className="w-1/2 flex flex-col space-y-1">
                    <label htmlFor="">{t("pass")}</label>
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
                  </div>
                  <div className="w-1/2 flex flex-col space-y-1">
                    <label htmlFor="">{t("confpass")}</label>
                    <div className="flex items-center justify-between px-2 py-1 rounded text-sm border">
                      <input
                        name="confirm_pass"
                        value={form.confirm_pass}
                        onChange={(e) => changeForm(e)}
                        type={passConfType ? "password" : "text"}
                        className="w-full bg-transparent outline-none"
                        placeholder="**********"
                        required
                      />
                      <EyeSlashIcon
                        onClick={() => setPassConfType(!passConfType)}
                        className="size-4"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="" className="text-md">
                    {t("dob")}
                  </label>
                  <div className="flex flex-row items-center space-s-2">
                    <div className="w-1/3 flex flex-col space-y-2">
                      <label htmlFor="">{t("d")}</label>
                      <input
                        name="dob_d"
                        min={1}
                        max={31}
                        onChange={(e) => changeForm(e)}
                        type="number"
                        className="border px-3 py-2 outline-none rounded"
                        placeholder="00"
                      />
                    </div>
                    <div className="w-1/3 flex flex-col space-y-2">
                      <label htmlFor="">{t("m")}</label>
                      <input
                        name="dob_m"
                        min={1}
                        max={12}
                        onChange={(e) => changeForm(e)}
                        type="number"
                        className="border px-3 py-2 outline-none rounded"
                        placeholder="00"
                      />
                    </div>
                    <div className="w-1/3 flex flex-col space-y-2">
                      <label htmlFor="">{t("y")}</label>
                      <input
                        name="dob_y"
                        min={1970}
                        max={2020}
                        onChange={(e) => changeForm(e)}
                        type="number"
                        className="border px-3 py-2 outline-none rounded"
                        placeholder="0000"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-sm">
                  <p>
                    <span>{t("bycont")} </span>
                    <span>
                      <Link
                        className="underline hover:text-primary"
                        href="/terms"
                      >
                        {t("trms")}
                      </Link>
                    </span>
                    <span> {t("ofuse")} </span>
                    <span>
                      <Link
                        className="underline hover:text-primary"
                        href="/privacy-policy"
                      >
                        {t("privcy")}
                      </Link>
                    </span>
                  </p>
                </div>
                <button
                  disabled={loading}
                  onClick={(e) => signup(e)}
                  className="bg-primary px-4 py-2 rounded-full text-white hover:bg-black duration-500 flex items-center justify-center text-center"
                >
                  {loading ? (
                    <span>
                      <ArrowPathIcon className="animate-spin size-4" />
                    </span>
                  ) : (
                    <span>{t("regs")}</span>
                  )}
                </button>
              </form>
              <div className="my-2 text-sm flex flex-col items-center justify-center">
                <p>
                  <span>{t("alrdy")} </span>
                  <button
                    onClick={() => setAuthModal("login")}
                    className="font-semibold"
                  >
                    {t("logn")}
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

export default RegisterModal;
