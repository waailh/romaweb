"use client";

import MyImage from "@/components/ui/MyImage";
import StarRating from "@/components/ui/StarRating";
import { Link } from "@/i18n.config";
import { formatPrice } from "@/lib/utils";
import { useSettings } from "@/store/global/settings";
import { SpecialProduct } from "@/typings";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { PercentBadgeIcon } from "@heroicons/react/16/solid";
import AddToCartButton from "@/components/products/helpers/AddToCartButton";

interface Props {
  sprod: SpecialProduct;
}

const SpecialProductCard = ({ sprod }: Props) => {
  const t = useTranslations("Product");
  const ts = useTranslations("SpecialDeal");

  const { currency } = useSettings();

  const { lang } = useParams();

  const stock = Number(sprod.special.stock);
  const inStock = sprod.special.stock > 0;

  const hasDiscount = sprod.product.has_discount;

  const hasColors = sprod.product.colors.length > 0;

  return (
    <div>
      <div className="md:p-2" id="animatedB">
        <Link href={`#`}>
          {/* <Link href={`/product/${sprod.product.slug}`}> */}
          <div className="relative w-full aspect-[5/4] overflow-hidden rounded">
            <MyImage
              src={sprod.product.thumbnail_image}
              className="hover:scale-[1.02] duration-500 object-cover transition-all ease-in"
              fill
              placeholder={true}
            />
            {sprod.special && (
              <div className="absolute top-0 w-full bg-primary text-white px-2 flex items-center justify-center space-s-2 text-sm">
                <PercentBadgeIcon className="size-6 animate-pulse" />
                <p>{ts("vspeci")}</p>
              </div>
            )}
          </div>
        </Link>
        <div className="flex justify-between">
          <p className="text-grayee text-sm">
            {lang == "ar"
              ? sprod.product.ar_brand_name
              : sprod.product.brand_name}
          </p>

          <StarRating rating={{ rate: sprod.product.rating }} />
        </div>

        <Link
          title={lang == "ar" ? sprod.product.ar_name : sprod.product.name}
          href={`#`}
          //   href={`/product/${sprod.product.slug}`}
          className="h-[52px]ff text-lg font-semibold hover:text-primary duration-300 line-clamp-1"
        >
          {lang == "ar" ? sprod.product.ar_name : sprod.product.name}
        </Link>
        {/* attribute and stock */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-s-4 text-sm">
          <div className="flex items-center space-s-2">
            {hasColors && (
              <div className="hidden md:flex md:space-s-1">
                <p className="">
                  {t("availin")} {sprod.product.colors.length} {t("colrs")}
                </p>
                <div className="flex items-center ">
                  {sprod.product.colors.slice(0, 5).map((one, i) => (
                    <div
                      key={i}
                      style={{ background: one }}
                      className="shrink-0 rounded-full size-3 md:size-5 me-[-4px] md:me-[-10px] border border-white"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          {inStock ? (
            <div className="mt-1 md:mt-0 bg-greeny bg-opacity-[17%] rounded w-fit py-1 px-2 text-xs">
              {stock < 5 && stock} {t("instk")}
            </div>
          ) : (
            <div className="mt-1 md:mt-0 bg-slate-700 text-black bg-opacity-[17%] rounded w-fit py-1 px-2 text-xs">
              {t("outstk")}
            </div>
          )}
        </div>

        {/* price && sale area */}
        <div className="mt-2 flex items-center justify-between">
          {/* price */}
          <div className="flex items-center space-s-2">
            <p className="shrink-0 text-xs md:text-sm text-gray-400 line-through">
              <span>{formatPrice(sprod.product.main_price, currency!)}</span>
            </p>
            <p className="shrink-0 text-red-600 font-bold text-md md:text-lg">
              <span>
                {formatPrice(sprod.special.price.toString(), currency!)}
              </span>
            </p>
          </div>

          {/* sale */}
          {hasDiscount && (
            <div className="shrink-0 px-1 rounded bg-red-600 text-white text-xs md:text-sm">
              {sprod.product.discount}
            </div>
          )}

          {/* offer */}
          {(sprod.product.offer == "buy1get1" ||
            sprod.product.offer == "buy2get1" ||
            sprod.product.offer == "buy3get1") && (
            <div className="shrink-0 px-1 rounded text-white bg-red-600 text-xs md:text-sm">
              {sprod.product.offer}
            </div>
          )}
        </div>

        {/* add to cart */}
        <AddToCartButton
          special={sprod.special}
          mini={true}
          style="outline"
          inStock={inStock}
          prod={sprod.product}
        />
      </div>
    </div>
  );
};

export default SpecialProductCard;
