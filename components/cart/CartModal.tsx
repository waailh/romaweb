"use client";

import { useGlobalModals } from "@/store/helpers/modals";
// import { useCarts } from "@/store/products/cart";
import { useProducts } from "@/store/products/products";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import MiniProduct from "../products/helpers/MiniProduct";
import PowerModal from "../products/helpers/PowerModal";
import CartModalProductLoader from "../ui/loaders/CartModalProductLoader";
import { usePower } from "@/store/products/power";
import ClearModal from "../products/helpers/ClearModal";
import { useCartsStore } from "@/store/products/carts";
import { useModalPower } from "@/store/products/modalpower";
import SpecialMiniProduct from "../special/helpers/SpecialMiniProduct";

const CartModal = () => {
  const { cartModal, setCartModal } = useGlobalModals();
  const t = useTranslations("Navbar");
  const tp = useTranslations("Product");

  const { miniProd, setMiniProd } = useProducts();
  const {
    resetChoice,
    specialItem,
    setSpecialItem,
    resetSelectedPackageOption,
  } = useCartsStore();

  const { setClear, setMode, setOtherChoicePower } = useModalPower();

  const closeModal = () => {
    setCartModal(false);
    setMiniProd(null);
    setClear(null);
    setOtherChoicePower(null);
    resetChoice("modal");
    setSpecialItem(null);
    resetSelectedPackageOption();
  };

  return (
    <div>
      <Dialog
        open={cartModal}
        as="div"
        className="relative z-layer-5 focus:outline-none"
        onClose={() => closeModal()}
      >
        <div className="fixed inset-0 z-layer-5 w-screen overflow-y-auto bg-black/20">
          <div className="flex min-h-full items-center justify-center p-2 md:p-4">
            <DialogPanel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              // transition={{ duration: 0.3 }}
              className="w-full max-w-[700px] rounded-xl bg-white p-4 md:p-6 backdrop-blur-2xl max-h-[75vh] overflow-y-scroll hide-scrollbar duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <DialogTitle
                  as="h3"
                  className="text-xl font-semibold text-black"
                >
                  {tp("addcrt")}
                </DialogTitle>
                <button onClick={() => closeModal()}>
                  <XMarkIcon className="size-4" />
                </button>
              </div>

              {miniProd ? (
                <>
                  {specialItem ? (
                    <SpecialMiniProduct prod={miniProd} />
                  ) : (
                    <MiniProduct prod={miniProd} />
                  )}
                </>
              ) : (
                <>
                  <CartModalProductLoader />
                </>
              )}
            </DialogPanel>
          </div>
        </div>
        <PowerModal mini={true} />
        <ClearModal mini={true} />
      </Dialog>
    </div>
  );
};

export default CartModal;
