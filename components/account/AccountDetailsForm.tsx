"use client";

import { useAccountAuth } from "@/store/account/auth";
import { useGlobals } from "@/store/global/globals";
import { CheckBadgeIcon } from "@heroicons/react/16/solid";
import { ArrowPathIcon, MegaphoneIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import ChangePassword from "./ChangePassword";
import toast from "react-hot-toast";
import { ifHasEmpty } from "@/lib/utils";
import { axiosWithAuth } from "@/lib/auth/axios/axios";
import { useTranslations } from "next-intl";

type Form = {
  name: string | undefined | null;
  email: string | undefined | null;

  // dob
  dob_d: number | undefined | null;
  dob_m: number | undefined | null;
  dob_y: number | undefined | null;
};

const AccountDetailsForm = () => {
  const { user } = useGlobals();
  const { setAuthModal } = useAccountAuth();

  const t = useTranslations("Account");

  const tet = useTranslations("ErrorToast");
  const tst = useTranslations("SuccessToast");

  // console.log(user);

  const dob_d = user?.dob?.split("-")[2];
  const dob_m = user?.dob?.split("-")[1];
  const dob_y = user?.dob?.split("-")[0];

  const initialForm = {
    name: user?.name,
    email: user?.email,
    // dob
    dob_d: Number(dob_d),
    dob_m: Number(dob_m),
    dob_y: Number(dob_y),
  };

  const [form, setForm] = useState<Form>(initialForm);

  const [loading, setLoading] = useState(false);

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const changeForm = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsDisabled(false);
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setForm(initialForm);
  }, [user]);

  const updateProfile = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (ifHasEmpty(form)) return toast.error(tet("emptyflds"));

    // actually sign up
    const axios = axiosWithAuth();
    setLoading(true);

    axios
      .post(`/profile/update`, {
        name: form.name,
        email: form.email,
        dob: `${form.dob_y}-${form.dob_m}-${form.dob_d}`,
      })
      .then((res) => {
        // console.log(res);
        if (res.data.result) {
          toast.success(tst("profup"));
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
    <>
      {user?.guest ? (
        <div className="mt-4 flex flex-col items-center justify-center space-y-4">
          <p className="p-2 md:p-4 rounded border">{t("plscreate")}</p>
          <button
            onClick={() => setAuthModal("login")}
            className="bg-black text-white px-3 py-1 rounded"
          >
            {t("log")}
          </button>
        </div>
      ) : (
        <>
          <form className="mt-2 flex flex-col space-y-4 text-sm">
            <div className="flex flex-col space-y-2">
              <label htmlFor=""> {t("fullname")}</label>
              <input
                name="name"
                onChange={(e) => changeForm(e)}
                value={(form?.name as string) || ""}
                type="text"
                className="border px-3 py-2 outline-none rounded"
                placeholder={t("fullnameplace")}
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="">{t("email")}</label>
              <input
                name="email"
                onChange={(e) => changeForm(e)}
                value={(form?.email as string) || ""}
                type="email"
                className="border px-3 py-2 outline-none rounded"
                placeholder={t("emailplace")}
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="" className="font-bold text-md">
                {t("dob")}
              </label>
              <div className="flex flex-row items-center space-s-2">
                <div className="w-1/3 flex flex-col space-y-2">
                  <label htmlFor="">{t("day")}</label>
                  <input
                    name="dob_d"
                    min={1}
                    max={31}
                    value={Number(form?.dob_d) || 0}
                    onChange={(e) => changeForm(e)}
                    type="number"
                    className="border px-3 py-2 outline-none rounded"
                    placeholder="00"
                  />
                </div>
                <div className="w-1/3 flex flex-col space-y-2">
                  <label htmlFor="">{t("mon")}</label>
                  <input
                    name="dob_m"
                    min={1}
                    max={12}
                    value={Number(form?.dob_m) || 0}
                    onChange={(e) => changeForm(e)}
                    type="number"
                    className="border px-3 py-2 outline-none rounded"
                    placeholder="00"
                  />
                </div>

                <div className="w-1/3 flex flex-col space-y-2">
                  <label htmlFor="">{t("yr")}</label>
                  <input
                    name="dob_y"
                    min={1970}
                    max={2020}
                    value={Number(form?.dob_y) || 0}
                    onChange={(e) => changeForm(e)}
                    type="number"
                    className="border px-3 py-2 outline-none rounded"
                    placeholder="0000"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              onClick={(e) => updateProfile(e)}
              className={`px-4 py-2 rounded w-fit text-white hover:bg-black duration-300 flex items-center justify-center text-center ${
                isDisabled ? "bg-slate-500" : "bg-primary"
              }`}
              disabled={isDisabled || loading}
            >
              {loading ? (
                <span>
                  <ArrowPathIcon className="animate-spin size-4" />
                </span>
              ) : (
                <span>{t("savchnges")}</span>
              )}
            </button>
          </form>

          <ChangePassword />
        </>
      )}
    </>
  );
};

export default AccountDetailsForm;
