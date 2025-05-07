"use client";

import MyImage from "@/components/ui/MyImage";
import StarRating from "@/components/ui/StarRating";
import { Link } from "@/i18n.config";
import { FullProduct, Product } from "@/typings";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { useSettings } from "@/store/global/settings";
import { useGlobalModals } from "@/store/helpers/modals";
import { useProducts } from "@/store/products/products";
// import { useCarts } from "@/store/products/cart";
import { useTranslations } from "next-intl";
import { useCartsStore } from "@/store/products/carts";
import { useModalPower } from "@/store/products/modalpower";
import ProductMedia from "@/components/products/ProductMedia";
import AddToWishlistButton from "@/components/products/helpers/AddToWishlistButton";
import ProductPrice from "@/components/products/helpers/ProductPrice";
import ProductColorsHandler from "@/components/products/helpers/ProductColorsHandler";
import ProductPowerHandler from "@/components/products/helpers/ProductPowerHandler";
import ProductClearHandler from "@/components/products/helpers/ProductClearHandler";
import ProductUsageHandler from "@/components/products/helpers/ProductUsageHandler";
import GeneralAttributeHandler from "@/components/products/helpers/GeneralAttributeHandler";
import AddToCartButton from "@/components/products/helpers/AddToCartButton";

interface Props {
  prod: FullProduct;
}

const SpecialMiniProduct = ({ prod }: Props) => {
  const { lang } = useParams();

  const t = useTranslations("Product");

  const hasDiscount = prod.has_discount;
  const hasColors = prod.colors.length > 0;

  const { currency } = useSettings();
  const { setMiniProd } = useProducts();
  const { resetChoice, specialItem } = useCartsStore();
  const { setClear } = useModalPower();

  const { setCartModal } = useGlobalModals();

  const handleViewDetails = () => {
    const url = `/product/${prod.slug}`;

    setCartModal(false);
    setMiniProd(null);
    resetChoice("modal");
    setClear(null);

    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-s-2">
      <div className="md:w-6/12">
        {/* <div className="relative h-60 md:h-48 w-full md:w-60 overflow-hidden rounded">
          <MyImage
            src={prod.thumbnail_image}
            className="hover:scale-[1.02] duration-500 object-cover object-center transition-all ease-in"
            fill
          />
        </div> */}
        <ProductMedia
          thumbnail={prod.thumbnail_image}
          main_photos={prod.main_photos}
          colors={prod.colors}
          vid={prod.video_link}
          small={true}
          mini={true}
        />

        <button
          onClick={() => handleViewDetails()}
          className="mt-2 px-2 py-1 rounded border text-black flex items-center justify-center space-s-2 hover:underline hover:text-primary hover:border-primary text-sm transition-all duration-300"
        >
          <span>{t("fulldets")}</span>
          <EyeIcon className="size-4" />
        </button>
      </div>
      <div className="w-full md:w-6/12 overflow-auto">
        <div className="flex justify-between">
          <p className="text-grayee text-sm">
            {lang == "ar" ? prod.brand.ar_name : prod.brand.name}
          </p>

          <StarRating rating={{ rate: prod.rating }} />
        </div>

        <div className="mt-2 w-full flex justify-between items-center space-s-2">
          <h2 className="flex-1 h-[55px] text-lg font-semibold duration-300 line-clamp-2">
            {lang == "ar" ? prod.ar_name : prod.name}
          </h2>

          <AddToWishlistButton pId={prod.id} size="small" />
        </div>

        {/* price */}
        <ProductPrice
          mini={true}
          has_discount={prod.has_discount}
          discount={prod.discount}
          main_price={prod.main_price}
          stroked_price={prod.stroked_price}
          first_variant={prod.first_variant}
          colors={prod.colors}
          specialItem={specialItem!}
        />

        <div className="flex flex-col space-y-3">
          {/* color handler */}

          {hasColors && (
            <ProductColorsHandler
              // small={true}
              mini={true}
              colors={prod.colors}
              is_lense={prod.is_lense}
            />
          )}

          {/* attributes handlers */}
          {prod &&
            prod.choice_options.map((cho, i) => {
              let component;
              switch (cho.id) {
                case "1": // power
                  component = <ProductPowerHandler att={cho} mini={true} />;
                  break;

                case "10": // clear
                  component = <ProductClearHandler att={cho} mini={true} />;
                  break;

                case "XXXXXXX": // usage
                  component = <ProductUsageHandler mini={true} />;
                  break;

                default:
                  component = <GeneralAttributeHandler mini={true} att={cho} />;
                  break;
              }

              return <div key={i}>{component}</div>;
              // return <div key={i}>{cho.id}</div>;
            })}
        </div>
        <div className="mt-2 md:mt-4" />
        <AddToCartButton
          mini={true}
          special={specialItem!}
          inStock={Number(prod.all_variants_stocks) > 0}
          style="normal"
        />
      </div>
    </div>
  );
};

export default SpecialMiniProduct;
