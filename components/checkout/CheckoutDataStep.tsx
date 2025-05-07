"use client";

import Gifts from "./Gifts";
import { useGlobals } from "@/store/global/globals";
import MyAddressesInner from "../account/MyAddressesInner";
import { useTranslations } from "next-intl";
import CouponRevealerModal from "../account/helpers/CouponRevealerModal";

const CheckoutDataStep = () => {
  const { user } = useGlobals();
  const t = useTranslations("Checkout");

  return (
    <>
      {/* addresses */}
      {user && (
        <>
          {user.guest ? (
            <>
              {/* <AddAddressForm guest={true} /> */}
              <MyAddressesInner guest={true} />
            </>
          ) : (
            <>
              {/* <h5 className="mb-2">Choose Delivery Address</h5> */}
              <MyAddressesInner />
              {/* <div className="grid grid-cols-12 gap-2 md:gap-4">
                {adrss.map((one, i) => (
                  <div
                    key={i}
                    className="col-span-12 md:col-span-6 py-2 px-1 rounded border shadow flex items-start justify-between"
                  >
                    <div className="flex items-center space-s-2 md:space-s-4 text-sm">
                      <RadioButton />
                      <div className="flex flex-col space-y-2">
                        <h5>{one.title}</h5>
                        <p className="truncate">{one.full}</p>
                        <div className="flex items-center space-s-2">
                          <span>Phone:</span>
                          <span>{one.phone}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      //   onClick={() => handleEdit(one)}
                      className="text-primary text-sm flex items-center space-s-2 px-2"
                    >
                      <PencilIcon className="size-4" />
                      <span>Edit</span>
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button className="flex items-center space-s-2 pb-1 border-b border-primary text-primary text-sm">
                  <HomeModernIcon className="size-4" />
                  <span>Manage Addresses</span>
                </button>
              </div> */}
            </>
          )}
        </>
      )}

      {/* <div className="">
        <div className="mt-2 md:mt-3 w-full">
          <label htmlFor="" className="text-sm">
            Note
          </label>
          <textarea
            name=""
            rows={3}
            placeholder="Write a note, delivery instructions or any extra information..."
            className="w-full border py-1 px-2 mt-1 text-sm rounded duration-300 outline-none focus:bg-primary/10"
          ></textarea>
        </div>
      </div> */}

      {/* reward */}
      <Gifts />

      <CouponRevealerModal />
    </>
  );
};

export default CheckoutDataStep;
