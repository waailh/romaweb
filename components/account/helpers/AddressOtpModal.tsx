"use client";

import { axiosWithAuth } from "@/lib/auth/axios/axios";
import { useAddresses } from "@/store/account/addresses";
import { useCartsStore } from "@/store/products/carts";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MouseEvent, useState } from "react";
import toast from "react-hot-toast";

import OtpInput from "react-otp-input";

const AddressOtpModal = () => {
  const t = useTranslations("Account");
  const tet = useTranslations("ErrorToast");
  const tst = useTranslations("SuccessToast");

  const { triggerCart } = useCartsStore();

  const [loading, setLoading] = useState(false);

  const { addressOtpModal, setAddressOtpModal, verifyAddressBadge } =
    useAddresses();
  const [otp, setOtp] = useState<string>("");

  const confirmAddress = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const axios = axiosWithAuth();

    if (otp.length == 6) {
      setLoading(true);
      axios
        .post(`/user/shipping/verify_address`, {
          address_id: addressOtpModal,
          verification_code: otp,
        })
        .then((res) => {
          console.log(res);
          if (res.data.result) {
            toast.success(tst("veri"));
            setAddressOtpModal(null);
            verifyAddressBadge(addressOtpModal as number);
            triggerCart();
          } else {
            toast.error(tet("wrngotp"));
          }

          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error(tet("err"));
        });
    } else {
      toast.error(tet("emptyflds"));
    }
  };

  return (
    <div>
      <Dialog
        open={addressOtpModal != null}
        as="div"
        className="relative z-layer-5 focus:outline-none"
        onClose={() => console.log("do not close")}
      >
        <div className="fixed inset-0 z-layer-5 w-screen overflow-y-auto bg-black/20">
          <div className="flex min-h-full items-center md:items-center justify-center p-2 md:p-4">
            <DialogPanel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              // transition={{ duration: 0.3 }}
              className="w-full max-w-[400px] rounded-xl bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <DialogTitle
                  as="h3"
                  className="text-xl font-semibold text-black"
                >
                  {t("confaddr")}
                </DialogTitle>
                <button onClick={() => setAddressOtpModal(null)}>
                  <XMarkIcon className="size-4" />
                </button>
              </div>
              <form className="w-full flex flex-col justify-center items-center space-y-4">
                <p className="my-2 text-sm">{t("vercode")}</p>
                <OtpInput
                  shouldAutoFocus={addressOtpModal !== null}
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span className="px-2">-</span>}
                  renderInput={(props) => (
                    <input
                      {...props}
                      placeholder="*"
                      className="!size-7 rounded border p-2 !text-black focus:outline-none focus:border-primary flex justify-center items-center"
                    />
                  )}
                />
                <button
                  disabled={loading}
                  onClick={(e) => confirmAddress(e)}
                  className="w-full bg-primary px-4 py-2 rounded-full text-white hover:bg-black duration-500 flex items-center justify-center text-center"
                >
                  {loading ? (
                    <span>
                      <ArrowPathIcon className="animate-spin size-4" />
                    </span>
                  ) : (
                    <span>{t("confaddr")}</span>
                  )}
                </button>
              </form>
              <div className="my-2 text-sm flex flex-col items-center justify-center"></div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AddressOtpModal;
