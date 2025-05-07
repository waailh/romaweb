"use client";

import MyImage from "@/components/ui/MyImage";
import StarRating from "@/components/ui/StarRating";
import { Link } from "@/i18n.config";
import { formatPrice } from "@/lib/utils";
import { useSettings } from "@/store/global/settings";
import { Product, SpecialProductInfo } from "@/typings";
import { useParams } from "next/navigation";
import AddToCartButton from "./AddToCartButton";
import { useTranslations } from "next-intl";
import { PercentBadgeIcon } from "@heroicons/react/16/solid";
import { FireIcon } from "@heroicons/react/24/outline";

interface Props {
  product: Product;
  force?: boolean;
}

const ProductCard = ({ product, force }: Props) => {
  const t = useTranslations("Product");

  const { currency } = useSettings();

  const { lang } = useParams();

  const stock = Number(product.all_variants_stocks);
  const inStock = stock > 0;

  const hasDiscount = product.has_discount;

  const hasColors = product.colors.length > 0;

  return (
    <div>
      <div className="md:p-2" id="animatedB">
        <Link href={`/product/${product.slug}${force ? "?force=true" : ""}`}>
          <div className="relative w-full aspect-[5/4] overflow-hidden rounded">
            <MyImage
              src={product.thumbnail_image}
              className="hover:scale-[1.02] duration-500 object-cover transition-all ease-in"
              fill
              placeholder={true}
            />
            {product.new && (
              <div className="absolute start-2 bottom-2 px-1 py-[2px] animate-pulse bg-blue-600 flex items-center space-s-1 rounded text-white text-xs">
                <FireIcon className="size-4" /> <span>{t("nw")}</span>
              </div>
            )}
          </div>
        </Link>
        <div className="flex justify-between">
          <p className="text-grayee text-sm">
            {lang == "ar" ? product.ar_brand_name : product.brand_name}
          </p>

          <StarRating rating={{ rate: product.rating }} />
        </div>

        <Link
          title={lang == "ar" ? product.ar_name : product.name}
          href={`/product/${product.slug}${force ? "?force=true" : ""}`}
          className="h-[52px]ff text-lg font-semibold hover:text-primary duration-300 line-clamp-1"
        >
          {lang == "ar" ? product.ar_name : product.name}
        </Link>
        {/* attribute and stock */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-s-4 text-sm">
          <div className="flex items-center space-s-2">
            {hasColors && (
              <div className="hidden md:flex md:space-s-1">
                <p className="">
                  {t("availin")} {product.colors.length} {t("colrs")}
                </p>
                <div className="flex items-center ">
                  {product.colors.slice(0, 5).map((one, i) => (
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
            {hasDiscount && (
              <p className="shrink-0 text-xs md:text-sm text-gray-400 line-through">
                <span>{formatPrice(product.stroked_price, currency!)}</span>
              </p>
            )}

            <p className="shrink-0 text-black font-bold text-md md:text-lg">
              <span>{formatPrice(product.main_price, currency!)}</span>
            </p>
          </div>

          {/* sale */}
          {hasDiscount && (
            <div className="shrink-0 px-1 rounded bg-red-600 text-white text-xs md:text-sm">
              {product.discount}
            </div>
          )}

          {/* offer */}
          {(product.offer == "buy1get1" ||
            product.offer == "buy2get1" ||
            product.offer == "buy3get1") && (
            <div className="shrink-0 px-1 rounded text-white bg-red-600 text-xs md:text-sm">
              {product.offer}
            </div>
          )}
        </div>

        {/* add to cart */}
        <AddToCartButton
          mini={true}
          style="outline"
          inStock={inStock}
          prod={product}
        />
      </div>
    </div>
  );
};

export default ProductCard;
