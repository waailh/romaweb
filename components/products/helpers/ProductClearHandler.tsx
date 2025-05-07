"use client";

// import { useCarts } from "@/store/products/cart";
import { Field, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGlobalModals } from "@/store/helpers/modals";
import { usePower } from "@/store/products/power";
import { useCartsStore } from "@/store/products/carts";
import { useModalPower } from "@/store/products/modalpower";

interface Props {
  mini: boolean;
  att: {
    id: string;
    name: string;
    ar_name: string;
    values: string[];
  };
}

const ProductClearHandler = ({
  mini,
  att: { id, name, ar_name, values },
}: Props) => {
  const { lang } = useParams();
  const { setClearModal } = useGlobalModals();

  const { setChoiceAtt } = useCartsStore();

  const modalPowerState = useModalPower();
  const powerState = usePower();

  const { clear, setClear } = mini ? modalPowerState : powerState;

  useEffect(() => {
    setClear(values[0]);
    setChoiceAtt(mini ? "modal" : "main", {
      id: Number(id),
      value: values[0].toString(),
    });
  }, []);

  return (
    <div className="mt-3 flex items-center space-s-2 text-xs">
      <h6 className="mb-2">{lang == "ar" ? ar_name : name}</h6>

      <button
        onClick={() => setClearModal(true)}
        className="w-fit relative flex items-center space-s-2 border rounded border-gray-400 shadow hover:border-gray-500 px-2 py-1 focus:shadow-outline"
      >
        <div className="">{clear}</div>
        <ChevronDownIcon className="size-4" />
      </button>
    </div>
  );
};

export default ProductClearHandler;
