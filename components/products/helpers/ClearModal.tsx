"use client";

import { useProducts } from "@/store/products/products";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Label,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { useGlobalModals } from "@/store/helpers/modals";
// import { useCarts } from "@/store/products/cart";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePower } from "@/store/products/power";
import { useTranslations } from "next-intl";
import { ifEmpty, ifEqual } from "@/lib/utils";
import toast from "react-hot-toast";
import { useCartsStore } from "@/store/products/carts";
import { useModalPower } from "@/store/products/modalpower";

interface Props {
  mini: boolean;
}

const ClearModal = ({ mini }: Props) => {
  const { miniProd, prod } = useProducts();
  const prodd = mini ? miniProd : prod;

  const { clearModal, setClearModal } = useGlobalModals();

  const modalPowerState = useModalPower();
  const powerState = usePower();

  const { clear, setClear } = mini ? modalPowerState : powerState;

  const [power, setPower] = useState<string>(clear!);

  const t = useTranslations("Products");
  const tp = useTranslations("Product");
  const tst = useTranslations("SuccessToast");

  const pows = prodd?.choice_options?.find((one) => one.id == "10")?.values;

  const closeModal = () => {
    setClearModal(false);
  };

  const { setChoiceAtt } = useCartsStore();

  const handleSelectPower = () => {
    setVal(power);
    closeModal();
    toast.success(tst("powcho"));
  };

  const setVal = (val: string) => {
    setClear(val);
    setChoiceAtt(mini ? "modal" : "main", { id: 10, value: val.toString() });
  };

  return (
    <div>
      <Dialog
        open={clearModal}
        as="div"
        className="relative z-layer-5-1 !pointer-events-auto focus:outline-none"
        onClose={() => closeModal()}
      >
        <div className="fixed inset-0 z-layer-5-1 w-screen overflow-y-auto bg-black/20">
          <div className="flex min-h-full items-center justify-center p-2 md:p-4">
            <DialogPanel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              // transition={{ duration: 0.3 }}
              className="w-full max-w-[200px] rounded-xl bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <DialogTitle
                  as="h3"
                  className="text-xl font-semibold text-black"
                >
                  {tp("slctpow")}
                </DialogTitle>
                <button onClick={() => closeModal()}>
                  <XMarkIcon className="size-4" />
                </button>
              </div>
              <div className="flex items-start space-s-2 max-h-[300px] overflow-y-scroll custom-y-scrollbar">
                <div className="h-full p-2 flex flex-col justify-center items-center">
                  <RadioGroup
                    value={power}
                    onChange={setPower}
                    aria-label=""
                    className="mt-2 flex flex-col space-y-1"
                  >
                    {pows &&
                      pows.map((one, i) => (
                        <Field key={i} className="flex items-center gap-2">
                          <Radio
                            value={one}
                            className="group flex size-3 items-center justify-center rounded-full border bg-white data-[checked]:bg-primary"
                          >
                            <span className="invisible size-1 rounded-full bg-white group-data-[checked]:visible" />
                          </Radio>
                          <Label>{one}</Label>
                        </Field>
                      ))}
                  </RadioGroup>
                </div>
              </div>
              <div className="mt-3 w-full border-t ">
                <button
                  onClick={() => handleSelectPower()}
                  className="w-full mt-1 bg-primary text-center rounded text-white px-6 py-1 text-sm"
                >
                  {tp("slct")}
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ClearModal;
