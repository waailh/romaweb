"use client";

import Lottie from "lottie-react";
import animationData from "@/public/assets/animations/gift.json";
import MyImage from "../ui/MyImage";
import { useParams } from "next/navigation";
// import { useCarts } from "@/store/products/cart";
import { usePlaceOrder } from "@/store/products/order";
import { useCartsStore } from "@/store/products/carts";
import { useTranslations } from "next-intl";
import {
  CloseButton,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Gifts = () => {
  const { lang } = useParams();
  const { cart } = useCartsStore();
  const { gift, setGift } = usePlaceOrder();

  const [choice, setChoice] = useState<number | null>(null);

  const handleConfirmGift = () => {
    setGift(choice);
    setChoice(null);
  };

  const t = useTranslations("Checkout");

  return (
    cart?.gifts.gifts && (
      <div className="mt-2">
        <Disclosure as="div" className="" defaultOpen={!gift}>
          <DisclosureButton
            as="div"
            className="group flex w-full items-center justify-between bg-gray-100 px-2 rounded"
          >
            <div className="flex space-s-1 items-center">
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ width: 30, height: 40 }}
                className=""
              />
              <h5 className="mb-2">{t("chosgift")}</h5>
            </div>
            <div className="w-fit flex items-center space-s-2">
              {gift && (
                <div className="text-xs flex items-center space-s-1 p-1 bg-green-600 rounded text-white">
                  <CheckCircleIcon className="size-4" />
                  <p>{t("chosen")}</p>
                </div>
              )}
              <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
            </div>
          </DisclosureButton>
          <DisclosurePanel className="mt-2">
            <div className="w-full overflow-x-scroll hide-scrollbar">
              <div className="flex w-fit items-center space-s-4">
                {cart?.gifts.gifts.length > 0 &&
                  cart?.gifts.gifts.map((one, i) => (
                    <div
                      onClick={() => {
                        setChoice(one.gift_id);
                        setGift(null);
                      }}
                      key={i}
                      className={`shrink-0 flex items-center space-s-2 w-[200px] rounded border p-1 ${
                        choice == one.gift_id || gift == one.gift_id
                          ? "!border-primary shadow"
                          : ""
                      }`}
                    >
                      <div className="relative h-16 md:h-24 aspect-square">
                        <MyImage
                          src={one.product_thumbnail}
                          className="shrink-0 object-cover object-center"
                          fill
                        />
                      </div>

                      <p className="flex-1 shrink-0 text-sm font-bold line-clamp-2">
                        {lang == "ar" ? one.product_ar_name : one.product_name}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <CloseButton as="div">
              <button
                disabled={!choice}
                onClick={() => {
                  handleConfirmGift();
                  close();
                }}
                className="my-1 bg-primary text-white px-2 py-1"
              >
                {t("chosgft")}
              </button>
            </CloseButton>

            {cart?.gifts && cart?.gifts.message && (
              <div className="">{cart?.gifts.message}</div>
            )}
          </DisclosurePanel>
        </Disclosure>
      </div>
    )
  );
};

export default Gifts;
