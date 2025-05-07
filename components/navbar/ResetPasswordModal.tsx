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
import toast from "react-hot-toast";
import { axiosPure } from "@/lib/auth/axios/axios";
import { ifEqual, validatePassword } from "@/lib/utils";
import ContinueAsGuest from "../helpers/ContinueAsGuest";

type Form = {
  email: string;
  otp: string;
  pass: string;
  confirm_pass: string;
};

const initForm = {
  email: "",
  otp: "",
  pass: "",
  confirm_pass: "",
};

const ResetPasswordModal = () => {
  const { modal, setAuthModal } = useAccountAuth();
  const [form, setForm] = useState<Form>(initForm);
  const [step, setStep] = useState("req"); // req & otp

  const [passType, setPassType] = useState(true);
  const [passConfType, setPassConfType] = useState(true);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const changeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const t = useTranslations("Modals");
  const tet = useTranslations("ErrorToast");
  const tst = useTranslations("SuccessToast");

  const requestCode = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (form.email == "") return toast.error(tet("emptyflds"));

    const axios = axiosPure();
    setLoading(true);

    axios
      .post(`/auth/password/forget_request`, {
        send_code_by: "email",
        email_or_phone: form.email,
      })
      .then((res) => {
        // console.log(res);
        if (res.data.result) {
          toast.success(tst("succotpemail"));
          setStep("otp");

          // setAuthModal(null);
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

  const resetPass = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    if (form.email == "" || form.pass == "" || form.confirm_pass == "")
      return toast.error(tet("emptyflds"));

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

    const axios = axiosPure();
    setLoading(true);

    axios
      .post(`/auth/password/confirm_reset`, {
        verification_code: form.otp,
        password: form.pass,
      })
      .then((res) => {
        // console.log(res);
        if (res.data.result) {
          toast.success(tst("resetted"));

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
        open={modal == "reset"}
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
                  {t("reset")}
                </DialogTitle>
                <button onClick={() => setAuthModal(null)}>
                  <XMarkIcon className="size-4" />
                </button>
              </div>
              <form className="w-full flex flex-col space-y-4">
                {step == "otp" ? (
                  <>
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="">{t("cde")}</label>
                      <input
                        name="otp"
                        value={form.otp}
                        onChange={(e) => changeForm(e)}
                        type="number"
                        className="w-full border px-2 py-1 rounded text-sm outline-none"
                        placeholder={t("entervercode")}
                      />
                    </div>
                    <div className="flex flex-row items-center space-s-2">
                      <div className="w-1/2 flex flex-col space-y-1">
                        <label htmlFor="">{t("nupass")}</label>
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
                  </>
                ) : (
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="">{t("emal")}</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={(e) => changeForm(e)}
                      type="email"
                      className="w-full border px-2 py-1 rounded text-sm outline-none"
                      placeholder={t("enter")}
                    />
                  </div>
                )}

                <button
                  disabled={loading}
                  onClick={
                    step == "otp" ? (e) => resetPass(e) : (e) => requestCode(e)
                  }
                  className="bg-primary px-4 py-2 rounded-full text-white hover:bg-black duration-500 flex items-center justify-center text-center"
                >
                  {loading ? (
                    <span>
                      <ArrowPathIcon className="animate-spin size-4" />
                    </span>
                  ) : (
                    <span>{step == "otp" ? t("reset") : t("sendpasres")}</span>
                  )}
                </button>
              </form>
              <div className="my-2 text-sm flex flex-col items-center justify-center">
                <p>
                  <span>{t("dnthav")} </span>
                  <button
                    onClick={() => setAuthModal("register")}
                    className="font-semibold"
                  >
                    {t("signup")}
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

export default ResetPasswordModal;
