"use client";

import { axiosPure } from "@/lib/auth/axios/axios";
import { formatPrice } from "@/lib/utils";
import { useSettings } from "@/store/global/settings";
// import { useCarts } from "@/store/products/cart";
import { useCartsStore } from "@/store/products/carts";
import { useModalPower } from "@/store/products/modalpower";
import { usePower } from "@/store/products/power";
import { usePricer } from "@/store/products/price";
import { useProducts } from "@/store/products/products";
import { ProductColor, ProductVariant, SpecialProductInfo } from "@/typings";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Props {
  mini: boolean;
  has_discount: boolean;
  discount: string;
  main_price: string;
  stroked_price: string;
  first_variant?: ProductVariant;
  colors?: ProductColor[];
  specialItem?: SpecialProductInfo;
}

const ProductPrice = ({
  mini,
  main_price,
  discount,
  has_discount,
  stroked_price,
  specialItem,
}: Props) => {
  const hasDiscount = has_discount;

  const [price, setPrice] = useState(main_price);
  const { miniProd, prod } = useProducts();

  const product = mini ? miniProd : prod;

  const t = useTranslations("Product");
  const ts = useTranslations("SpecialDeal");

  const { currency } = useSettings();
  const {
    choices: { modalChoice, mainChoice },
    setChoiceAvailable,
    setChoiceVariant,
    setChoicePrice,
  } = useCartsStore();
  const choice = mini ? modalChoice : mainChoice;

  const modalPowerState = useModalPower();
  const powerState = usePower();

  const { otherChoicePower } = mini ? modalPowerState : powerState;

  const { setReady, setMiniReady } = usePricer();

  const axios = axiosPure();

  const getVariantPrice = () => {
    if (product) {
      const choices = mini
        ? miniProd?.choice_options?.length
        : prod?.choice_options?.length;

      // const body = createObject(
      //   product?.id.toString()!,
      //   choice.color,
      //   choice.attributes
      // );

      const body = {
        id: product?.id,
        color: choice.color,
        atts: choice.attributes,
      };

      // console.log(body);

      if (true) {
        if (
          (choices! > 0 && choice.attributes.length == choices) ||
          choices == 0 // only colors
        ) {
          console.log("fetching variant data: ", body);

          axios
            .post(`/products/variant/price`, body)
            .then((res) => {
              // console.log(res.data);
              const data = res.data.data;
              setChoiceAvailable(mini ? "modal" : "main", data.stock > 0);

              const price =
                otherChoicePower != null ? data.price * 2 : data.price;

              setPrice(price);
              setChoicePrice(mini ? "modal" : "main", data.price);

              setChoiceVariant(mini ? "modal" : "main", data.variant);

              if (mini) {
                setMiniReady(true);
              } else {
                setReady(true);
              }
              console.log("success in setting the variant");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
  };

  useEffect(() => {
    mini ? setMiniReady(false) : setReady(false);

    getVariantPrice();
    return () => setPrice(main_price);
  }, [choice.attributes, choice.color]);

  return (
    <div className="flex items-center space-s-2 py-2">
      <span>{t("price")}:</span>
      {specialItem ? (
        <div className="flex items-center space-s-2">
          {price && (
            <span className="line-through text-sm text-gray-600">
              {formatPrice(price, currency!)}
            </span>
          )}

          <span className="text-black font-bold text-2xl">
            <span>{formatPrice(specialItem.price.toString(), currency!)}</span>
          </span>

          <div className="bg-red-600 p-1 text-white text-xs rounded">
            {ts("limitd")}
          </div>
        </div>
      ) : (
        <div className="flex items-center space-s-2">
          {hasDiscount && (
            <span className="line-through text-sm text-gray-600">
              {formatPrice(stroked_price, currency!)}
            </span>
          )}

          {price && (
            <span className="text-black font-bold text-2xl">
              <span>{formatPrice(price, currency!)}</span>
            </span>
          )}

          {hasDiscount && (
            <div className="bg-red-600 p-1 text-white text-xs rounded">
              {discount}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductPrice;
