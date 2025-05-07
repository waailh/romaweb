"use client";
import { useAddresses } from "@/store/account/addresses";
import {
  ArrowPathIcon,
  CheckBadgeIcon,
  PlusIcon,
  RectangleGroupIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import RadioButtons from "../ui/RadioButtons";
import { axiosPure, axiosWithAuth } from "@/lib/auth/axios/axios";
import { Address } from "@/typings";
import DeleteAddressButton from "./helpers/DeleteAddressButton";
import AddressRadioButton from "../ui/AddressRadioButton";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const ViewAddresses = () => {
  const {
    setAddressesState,
    setAddressDefault,
    addresses,
    setAddresses,
    setAddressOtpModal,
  } = useAddresses();
  const [defau, setDefau] = useState("3");

  // const handleEdit = (one: any) => {
  //   // setCurrentAddress(one);
  //   setAddressesState("edit");
  // };

  const t = useTranslations("Account");
  const tet = useTranslations("ErrorToast");
  const tst = useTranslations("SuccessToast");

  const axios = axiosWithAuth();

  const setDefault = (id: number) => {
    // console.log("de", id);
    axios
      .post(`/user/shipping/make_default`, { id: id })
      .then((res) => {
        // console.log(res);

        if (res.data.result) {
          toast.success(tst("defsucc"));
          setAddressDefault(id);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(tet("errdef"));
      });
  };

  const getAddresses = () => {
    axios
      .get(`/user/shipping/address`)
      .then((res) => {
        // console.log(res);
        const addresses = res.data.data;
        if (res.data.success) setAddresses(addresses);
        if (addresses.length == 0) setAddressesState("add");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAddresses();
  }, []);

  const handleVerify = (id: number) => {
    setAddressOtpModal(id);
  };

  return (
    <div>
      <div className="flex justify-between space-s-2 mt-2 md:mt-0 mb-2">
        <h5>{t("mng")}</h5>
        <button
          onClick={() => setAddressesState("add")}
          className="pb-1 border-b flex items-center space-s-1 text-sm text-primary border-primary"
        >
          <PlusIcon className="size-4" />
          <span className="shrink-0 ">{t("addnu")}</span>
        </button>
      </div>

      <div className="flex flex-col items-center space-y-2 md:space-y-4">
        {addresses ? (
          addresses.length > 0 ? (
            addresses.map((one, i) => (
              <div
                key={i}
                className="w-full py-2 px-1 rounded border shadow flex items-start justify-between"
              >
                <div className="flex items-start space-s-2 md:space-s-4">
                  <AddressRadioButton
                    setDefault={setDefault}
                    id={one.id}
                    active={one.set_default == 1}
                  />
                  <div className="flex flex-col space-y-2">
                    <h5 className="line-clamp-2">
                      {one.address?.split("-")[0]}
                    </h5>
                    <p>{`${one.address?.split("-")[1]} - ${
                      one.country_name
                    }`}</p>
                    <div className="flex items-center space-s-2 text-sm">
                      <span>{t("phone")}:</span>
                      <span>{one.phone}</span>
                      {one.verified ? (
                        <span className="text-green-600 bg-green-200 rounded-full p-1">
                          <CheckBadgeIcon className="size-4" />
                        </span>
                      ) : (
                        <button
                          className="bg-slate-200 px-1 py-1 rounded flex items-center text-xs"
                          onClick={() => handleVerify(one.id)}
                        >
                          {t("verify")}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <DeleteAddressButton id={one.id} />
              </div>
            ))
          ) : (
            <div className="min-h-40 flex items-center justify-center space-s-2 text-sm ">
              <RectangleGroupIcon className="size-5" />
              <p>{t("noaddrss")}</p>
            </div>
          )
        ) : (
          <div className="min-h-40 flex items-center justify-center">
            <span>
              <ArrowPathIcon className="animate-spin size-4" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAddresses;
