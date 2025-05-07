"use client";

import { useGlobalModals } from "@/store/helpers/modals";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Scratcher from "@/components/ui/Scratcher";
import { useCouponer } from "@/store/global/coupon";

const CouponRevealerModal = () => {
  const t = useTranslations("Cart");
  const { coupon } = useCouponer();

  const { couponRevealModal, setCouponRevealModal } = useGlobalModals();

  return (
    <div>
      <Dialog
        // open={true}
        open={couponRevealModal}
        as="div"
        className="relative z-layer-5 focus:outline-none"
        onClose={() => setCouponRevealModal(false)}
      >
        <div className="fixed inset-0 z-layer-5 w-screen overflow-y-auto bg-black/20">
          <div className="mt-32 flex h-fit justify-center p-2 md:p-4">
            <DialogPanel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              // transition={{ duration: 0.3 }}
              className="w-full max-w-full md:max-w-[500px] rounded-xl bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 shadow"
            >
              <div className="flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-6">
                  <DialogTitle
                    as="h3"
                    className="text-sm md:text-lg font-semibold text-black"
                  >
                    {t("congs")}
                  </DialogTitle>
                  <button onClick={() => setCouponRevealModal(false)}>
                    <XMarkIcon className="size-4" />
                  </button>
                </div>
                <div className="bg-red-600 w-full px-4 py-1 text-white flex items-center justify-center mb-6">
                  <p>
                    {t("enj")} {coupon.discount!}
                    {t("peroff")}
                  </p>
                </div>
                <div className="flex items-center space-s-2">
                  <Scratcher value={coupon.code!} />
                </div>

                <p className="mt-4 text-xs">{t("scrtch")}</p>

                <p className="text-center mt-6 bg-gray-100 p-1 rounded">
                  {coupon.discount == "10"
                    ? t("499mssg")
                    : coupon.discount == "15"
                    ? t("699mssg")
                    : ``}
                </p>

                <div className="my-2 text-sm flex flex-col items-center justify-center"></div>
                <button
                  onClick={() => setCouponRevealModal(false)}
                  className="my-4 px-4 py-1 bg-black text-white"
                >
                  {t("cls")}
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CouponRevealerModal;
