"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useAddresses } from "@/store/account/addresses";
import AddAddressForm from "./AddAddressForm";
import { useTranslations } from "next-intl";

interface Props {
  guest?: boolean;
}

const AddAddress = ({ guest }: Props) => {
  const { setAddressesState } = useAddresses();

  const t = useTranslations("Account");

  return (
    <div>
      <div className="mt-0 flex justify-between items-center space-s-2">
        <h5>{t("addnw")}</h5>
        <button
          onClick={() => setAddressesState("view")}
          className="mt-4 bg-black flex items-center space-s-2 rounded text-white px-2 py-1 text-xs"
        >
          <ArrowLeftIcon className="size-3" />
          <span>{t("bck")}</span>
        </button>
      </div>
      <AddAddressForm guest={guest} />
    </div>
  );
};

export default AddAddress;
