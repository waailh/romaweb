"use client";

import { ChangeEvent, MouseEvent, useMemo, useState } from "react";
import AddAddressMap from "../maps/AddAddressMap";
import { CountryCode, E164Number } from "libphonenumber-js/core";
import "react-phone-number-input/style.css";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  CursorArrowRippleIcon,
  ExclamationCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { axiosWithAuth } from "@/lib/auth/axios/axios";

import Select from "react-select";
import countryList from "react-select-country-list";
import { useAddresses } from "@/store/account/addresses";
import { Loc, SetAddressType } from "@/typings";
import { useSettings } from "@/store/global/settings";
import { useGlobals } from "@/store/global/globals";
import { ifEmpty, ifHasEmpty } from "@/lib/utils";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { useCartsStore } from "@/store/products/carts";

// const UAECountry = { label: "United Arab Emirates", value: "AE" };

interface Props {
  guest?: boolean;
}

type Country = {
  label: string;
  value: string;
};

// **********************************************
const forceMap = true; // forcing the map or no

const AddAddressForm = ({ guest }: Props) => {
  const t = useTranslations("Account");
  const tet = useTranslations("ErrorToast");

  const { triggerCart } = useCartsStore();

  const [viewMap, setViewMap] = useState(forceMap);

  const { country } = useSettings();
  const { ourCountries } = useAddresses();

  const options = useMemo(() => countryList().getData(), []);

  const [loading, setLoading] = useState(false);

  const [invalids, setInvalids] = useState<string[]>([]);

  const [loc, setLoc] = useState<Loc>();
  const [phone, setPhone] = useState<E164Number | undefined>();
  const [shippingTo, setShippingTo] = useState<Country | null>(
    options.find((one) => one.value === country)!
  );

  const { setAddressOtpModal, setAddressesState } = useAddresses();

  const { user } = useGlobals();

  const initialForm = {
    name: "",
    label: "",
    address: "",

    apartment_number: "",
    building_name: "",

    formatted_address: "",

    area: "",
    postal_code: "",
    sublocality: "",
    city: "",
    state: "",
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const [form, setForm] = useState(initialForm);

  const setAddress = (data: SetAddressType) => {
    const { line, area, sublocality, city, state, formatted_address, country } =
      data;

    if (country && country !== "") {
      const found = ourCountries.find((one) => one.code == country);
      if (found) {
        const balad = options.find((one) => one.value == country)!;

        if (balad) setShippingTo(balad);
      } else {
        return toast.error(tet("dontship"));
      }
    }

    if (city && city !== "") setForm((form) => ({ ...form, city: city }));

    line && line !== ""
      ? setForm((form) => ({ ...form, address: line }))
      : setForm((form) => ({ ...form, address: "" }));

    // if (area && area !== "")
    setForm((form) => ({ ...form, area: area || "" }));

    if (state && state !== "") setForm((form) => ({ ...form, state }));

    if (sublocality) setForm((form) => ({ ...form, sublocality }));

    if (formatted_address) setForm((form) => ({ ...form, formatted_address }));
  };

  const editAfterSelection = () => {
    setViewMap(true);
    // setForm(initialForm);
  };

  const handleConfirmLoc = () => {
    if (!form.formatted_address) {
      setInvalids(["location"]);
      return toast.error(tet("slctlocfrst"));
    }
    setInvalids([]);
    setViewMap(false);
  };

  const saveAddress = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const {
      apartment_number,
      building_name,
      address,
      area,
      postal_code,
      name,
      sublocality,
      label,
      city,
      state,

      formatted_address,
    } = form;

    setInvalids([]);
    if (user?.guest! && ifEmpty(name)) {
      setInvalids(["name"]);
      return toast.error(tet("pname"));
    }

    if (ifEmpty(phone as string)) {
      setInvalids(["phone"]);
      return toast.error(tet("phonman"));
    }

    if (shippingTo?.value !== "AE" && ifEmpty(postal_code as string)) {
      setInvalids(["postal_code"]);
      return toast.error(tet("postal"));
    }

    if (ifHasEmpty({ area, city, state, apartment_number, building_name })) {
      setInvalids(
        [
          // "address",
          "apartment_number",
          "building_name",
          "area",
          "city",
          "state",
        ].filter((key) => ifEmpty(eval(key)))
      );

      return toast.error(tet("emptyflds"));
    }

    const country_id = ourCountries.find((one) => one.code == shippingTo?.value)
      ?.id!;

    if (!country_id) return toast.error(tet("slctcont"));

    setLoading(true);
    const axios = axiosWithAuth();

    axios
      .post(`/user/shipping/create`, {
        user_id: user?.id,
        name: name,
        address,

        apartment_number,
        building_name,

        area, // editable
        city,
        state,

        formatted_address,
        sub_locality: sublocality, // directly from maps for analytical purposes

        latitude: loc?.lat,
        longitude: loc?.lng,

        country_id,

        phone: phone,
      })
      .then((res) => {
        // console.log(res);
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setAddressesState("view");
        setAddressOtpModal(res.data.id);

        // triggerCart();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <form action="" className="w-full flex flex-col space-y-2 text-sm">
      {/* formatted address selected */}
      {form.formatted_address && (
        <div className="mt-2 border-2 border-green-600 p-2 rounded flex items-start justify-between">
          <div className="flex items-start space-s-1">
            <CheckCircleIcon className="text-green-600 size-5 shrink-0" />
            <div className="p">{form.formatted_address}</div>
          </div>
          <button type="button" onClick={() => editAfterSelection()}>
            <PencilSquareIcon className="size-5" />
          </button>
        </div>
      )}

      <div className="mt-2 flex flex-col">
        <label
          className="font-semibold flex items-center justify-between bg-gray-100 px-1 py-1 rounded space-s-2"
          // onClick={() => setViewMap(!viewMap)}
        >
          <span>{t("pinloc")}</span>
          <ChevronDownIcon
            className={`size-4 ${!viewMap ? "animate-bounce-slow" : ""}`}
          />
        </label>
        <div className={`${viewMap ? "w-full" : "hidden"}`}>
          <div className="flex items-center space-s-1">
            <ExclamationCircleIcon className="size-5" />
            <p className="my-2 !text-md font-bold">{t("pickarea")}</p>
          </div>
          <AddAddressMap
            setLoc={setLoc}
            autoFill={setAddress}
            country={shippingTo?.value || country}
            empty={invalids.includes("location")}
          />
          <button
            type="button"
            onClick={() => handleConfirmLoc()}
            className="mt-2 bg-primary px-1 py-2 rounded text-white w-full flex items-center justify-center space-s-1 hover:bg-black"
          >
            <CursorArrowRippleIcon className="size-5" />
            <span>{t("confloc")}</span>
          </button>
        </div>

        {/* <EditAddressMap setLoc={setLoc} /> */}
      </div>

      {/* Rest of the fields */}
      <div className={`${viewMap ? "hidden" : "flex flex-col space-y-2"}`}>
        {user?.guest && (
          <div className="flex flex-col space-y-2">
            <label className="">{t("name")}</label>
            <input
              id="FormName"
              type="text"
              name="name"
              value={form.name}
              onChange={(e) => changeForm(e)}
              className={`w-full outline-none px-2 py-1 border rounded ${
                invalids.includes("name") ? "border-red-600" : ""
              }`}
              placeholder={t("nameplace")}
            />
          </div>
        )}

        {/* {!guest && (
          <div className="flex flex-col space-y-2">
            <label className="">{t("adrlabel")}</label>
            <input
              id="FormLabel"
              type="text"
              name="label"
              value={form.label}
              onChange={(e) => changeForm(e)}
              className={`w-full outline-none px-2 py-1 border rounded ${
                invalids.includes("label") ? "border-red-600" : ""
              }`}
              placeholder={t("labl")}
            />
          </div>
        )} */}

        <div className="flex flex-col space-y-2">
          <label className="">{t("buildnm")}</label>
          <input
            id="FormBuildingName"
            type="text"
            name="building_name"
            value={form.building_name}
            onChange={(e) => changeForm(e)}
            className={`w-full outline-none px-2 py-1 border rounded ${
              invalids.includes("building_name") ? "border-red-600" : ""
            }`}
            placeholder={t("buildnmplc")}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="">{t("apartnum")}</label>
          <input
            id="FormApartmentNumber"
            type="text"
            name="apartment_number"
            value={form.apartment_number}
            onChange={(e) => changeForm(e)}
            className={`w-full outline-none px-2 py-1 border rounded ${
              invalids.includes("apartment_number") ? "border-red-600" : ""
            }`}
            placeholder={t("apartnumplc")}
          />
        </div>

        {/* <div className="flex flex-col space-y-2">
          <label className="">{t("line1")}</label>
          <input
            id="FormAddressLine"
            type="text"
            name="address"
            value={form.address}
            onChange={(e) => changeForm(e)}
            className={`w-full outline-none px-2 py-1 border rounded ${
              invalids.includes("address") ? "border-red-600" : ""
            }`}
            placeholder={t("lin1place")}
          />
        </div> */}

        <div className="flex items-center space-s-2">
          <div className="w-3/4 flex flex-col space-y-2">
            <label className="">{t("line2")}</label>
            <input
              id="FormArea"
              type="text"
              name="area"
              value={form.area}
              onChange={(e) => changeForm(e)}
              className={`w-full outline-none px-2 py-1 border rounded ${
                invalids.includes("area") ? "border-red-600" : ""
              }`}
              placeholder={t("lin2place")}
            />
          </div>
          <div className="w-1/4 flex flex-col space-y-2">
            <label className="">{t("postalc")}</label>
            <input
              id="FormPostalCode"
              type="text"
              name="postal_code"
              value={form.postal_code}
              onChange={(e) => changeForm(e)}
              className={`w-full outline-none px-2 py-1 border rounded ${
                invalids.includes("postal_code") ? "border-red-600" : ""
              }`}
              placeholder={t("postalplace")}
            />
          </div>
        </div>

        <div className="flex items-center space-s-2">
          <div className="w-3/4 flex flex-col space-y-2">
            <label className="">{t("phone")}</label>

            <div className="" dir="ltr">
              <PhoneInputWithCountrySelect
                id="FormPhone"
                international
                countryCallingCodeEditable={true}
                defaultCountry={
                  (shippingTo?.value || country || "AE") as CountryCode
                }
                className={`w-full outline-none px-2 py-1 border rounded ${
                  invalids.includes("phone") ? "border-red-600" : ""
                }`}
                numberInputProps={{
                  placeholder: "5********",
                  className: "px-1 focus:outline-none",
                }}
                value={phone}
                onChange={(val) => setPhone(val)}
              />
            </div>
          </div>
          <div className="w-1/4 flex flex-col space-y-2">
            <label className="">{t("cty")}</label>
            <input
              id="FormCity"
              disabled={forceMap}
              type="text"
              name="city"
              value={form.city}
              onChange={(e) => changeForm(e)}
              className={`w-full outline-none px-2 py-1 border rounded ${
                invalids.includes("city") ? "border-red-600" : ""
              }`}
              placeholder={t("ctyplace")}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="">{t("state")}</label>
          <input
            id="FormState"
            disabled={forceMap}
            type="text"
            name="state"
            value={form.state}
            onChange={(e) => changeForm(e)}
            className={`w-full outline-none px-2 py-1 border rounded ${
              invalids.includes("state") ? "border-red-600" : ""
            }`}
            placeholder={t("stateplace")}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="">{t("cntry")}</label>
          {country && (
            <Select
              id="FormCountry"
              isDisabled={forceMap}
              defaultValue={options.find((one) => one.value == country)}
              options={options.filter((one) =>
                ourCountries.map((one) => one.code).includes(one.value)
              )}
              value={shippingTo}
              onChange={(val) => setShippingTo(val)}
            />
          )}
        </div>

        <button
          disabled={loading}
          onClick={(e) => saveAddress(e)}
          className="px-3 py-2 rounded bg-primary text-white hover:bg-black flex items-center justify-center"
        >
          {loading ? (
            <span>
              <ArrowPathIcon className="animate-spin size-4" />
            </span>
          ) : (
            <span>{guest ? t("save") : t("add")}</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default AddAddressForm;
