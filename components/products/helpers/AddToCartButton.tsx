"use client";

import { useAnalyze } from "@/components/hooks/useAnalyze";
import { useRouter } from "@/i18n.config";
import { axiosPure, axiosWithAuth } from "@/lib/auth/axios/axios";
import { useAccountAuth } from "@/store/account/auth";
import { useGlobals } from "@/store/global/globals";
import { useGlobalModals } from "@/store/helpers/modals";
// import { useCarts } from "@/store/products/cart";
import { useCartsStore } from "@/store/products/carts";
import { useModalPower } from "@/store/products/modalpower";
import { usePower } from "@/store/products/power";
import { usePricer } from "@/store/products/price";
import { useProducts } from "@/store/products/products";
import { Choice, FullProduct, Product, SpecialProductInfo } from "@/typings";
import {
  ArrowPathIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  style: "outline" | "normal" | "big";
  mini: boolean;
  inStock: boolean;
  prod?: Product;
  special?: SpecialProductInfo;
}

const AddToCartButton = ({ style, prod, mini, inStock, special }: Props) => {
  const t = useTranslations("Product");
  const tet = useTranslations("ErrorToast");
  const tst = useTranslations("SuccessToast");

  const [quan, setQuan] = useState();
  const { setAuthModal } = useAccountAuth();

  const { cartModal, setCartModal } = useGlobalModals();
  const { miniProd, prod: stateProd, setMiniProd } = useProducts();

  const { ready, miniReady } = usePricer();

  const prodd = mini ? miniProd : stateProd;

  const { product_slug } = useParams();
  const { sendAddToCartEvent } = useAnalyze();

  const router = useRouter();

  const axios = axiosWithAuth();

  // const { user, changeCounts } = useGlobals();

  const {
    choices: { modalChoice, mainChoice },
    resetChoice,
    triggerCounts,
    specialItem,
    setSpecialItem,

    selectedPackageOptions,
  } = useCartsStore();

  const choice = mini ? modalChoice : mainChoice;

  const modalPowerState = useModalPower();
  const powerState = usePower();

  const { otherChoicePower, setClear, setOtherChoicePower } = mini
    ? modalPowerState
    : powerState;

  const isLoading = (mini && !miniReady) || (!mini && !ready);
  const loader = (
    <div className="w-full flex justify-center items-center">
      <ArrowPathIcon className="animate-spin size-4" />
    </div>
  );

  const openCartModal = () => {
    setCartModal(true);
    if (special) setSpecialItem(special);
    const axios = axiosPure();
    axios
      .get(`/products/mini/${prod?.id!}`, {
        params: { special: special?.stock != null },
      })
      .then((res) => {
        // console.log("mini: ", res.data.data[0]);
        setMiniProd(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addForOtherPower = () => {
    if (otherChoicePower) {
      axios
        .post(`/products/variant/price`, {
          id: prodd?.id,
          color: choice.color,
          atts: choice.attributes.map((one) =>
            one.id == 1 ? { id: 1, value: otherChoicePower } : one
          ),
        })
        .then((res) => {
          axios
            .post(`/carts/add`, {
              id: prodd?.id,
              variant: res.data.data.variant,
              quantity: 1,
            })
            .then((res) => {
              // console.log(res);
              if (res.data.result) {
                triggerCounts();
                setOtherChoicePower(null);
                if (cartModal) {
                  setMiniProd(null);
                  setClear(null);
                }
              } else {
                toast.error(tet("powerr"));
              }
            })
            .catch((err) => {
              console.log(err);
              toast.error(tet("powerr"));
            });
        })
        .catch((err) => {
          console.log(err);
          toast.error(tet("powerr"));
        });
    }
  };

  const createDesString = (
    selectedPackageOptions: Record<string, string>
  ): string => {
    return Object.entries(selectedPackageOptions)
      .map(([optionName, choiceTitle]) => `${optionName}: ${choiceTitle}`)
      .join(" - ");
  };

  const handleAddToCart = (choice: Choice) => {
    console.log("choice: ", choice);
    const isSpecial = special ? true : false;
    console.log("special: ", isSpecial);

    let des = createDesString(selectedPackageOptions);
    // console.log(otherChoicePower);

    if (!isLoading) {
      axios
        .post(`/carts/add`, {
          id: prodd?.id,
          variant: choice.variant,
          quantity: 1,
          special: isSpecial,
          description: des,
        })
        .then((res) => {
          // console.log(res);
          if (res.data.result) {
            sendAddToCartEvent({
              product: prodd!,
              special,
              variant: choice.variant!,
              price: choice.price!,
            });

            if (cartModal && !otherChoicePower) {
              setMiniProd(null);
              setClear(null);
            }
            triggerCounts();
            toast.success(tst("itmcrtadd"));
            if (otherChoicePower) addForOtherPower();

            setCartModal(false);
          } else {
            // console.log(res);
            toast.error(res.data.message || tet("erradditm"));
          }

          if (isSpecial) setSpecialItem(null);
        })
        .catch((err) => {
          // console.log(err);
          // toast.error(JSON.stringify(err));
          if (err.response?.status === 401) {
            if (cartModal) {
              router.push(`/product/${prodd?.slug!}`);
              setCartModal(false);
            } else {
              setAuthModal("login");
            }
          } else {
            toast.error(err.response.data.message || tet("fyladditm"));
          }
        });
    }
  };

  return (
    <button disabled={!inStock || !choice.available} className="h-fit w-full">
      {style === "big" ? (
        // big cart button in product page
        <div
          onClick={() => handleAddToCart(choice)}
          className="flex-1 bg-primary text-white rounded flex items-center divide-s divide-gray-200 justify-between hover:shadow-lg duration-300 hover:bg-primary/90"
        >
          <div className="shrink-0 flex items-center justify-center p-2">
            <MinusIcon className="size-4 text-white" />
          </div>
          <div className="flex-1 py-2 px-3">
            {isLoading ? (
              loader
            ) : (
              <>
                {choice.available ? (
                  <span>{t("addcrt")}</span>
                ) : (
                  <span>{t("outstk")}</span>
                )}
              </>
            )}
          </div>
          <div className="shrink-0 flex items-center justify-center p-2">
            <PlusIcon className="size-4 text-white" />
          </div>
        </div>
      ) : style === "outline" ? (
        // in product card "outline"
        <div
          onClick={() => openCartModal()}
          className="w-full text-sm flex items-center space-s-2 justify-center px-2 py-1 md:px-4 md:py-2 border-2 border-black rounded hover:shadow hover:border-primary hover:text-primary text-black  transition-all duration-300 ease-in"
        >
          {inStock && choice.available ? (
            <span>{t("addcrt")}</span>
          ) : (
            <span>{t("outstk")}</span>
          )}
          <ShoppingCartIcon className="size-4" />
        </div>
      ) : (
        // in modal (normal style)
        <div
          onClick={() => handleAddToCart(choice)}
          className="px-2 py-1 rounded border border-primary bg-primary text-white flex items-center justify-center space-s-2 hover:bg-black hover-border-black transition-all duration-300"
        >
          {isLoading ? (
            loader
          ) : (
            <>
              {inStock && choice.available ? (
                <span>{t("addcrt")}</span>
              ) : (
                <span>{t("outstk")}</span>
              )}
            </>
          )}
        </div>
      )}
    </button>
  );
};

export default AddToCartButton;
