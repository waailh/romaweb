"use client";

import { FullProduct } from "@/typings";
import BreadCrumb from "../helpers/BreadCrumb";
import ProductMedia from "./ProductMedia";
import SharePageButtons from "./SharePageButtons";
import { useParams } from "next/navigation";
import StarRating from "../ui/StarRating";
import ActiveBadge from "../ui/ActiveBadge";
import ShowMoreDescription from "./ShowMoreDescription";
import PointIcon from "@/public/assets/icons/earn.svg";
import AdditionalProductCard from "./AdditionalProductCard";
import LineDivider from "../helpers/LineDivider";
import ProductDetailsTabs from "./ProductDetailsTabs";
import ProductsDetailsArea from "./ProductsDetailsArea";
import ProductMiniDescription from "./helpers/ProductMiniDescription";
import { useEffect } from "react";
import { useProducts } from "@/store/products/products";
import AddToWishlistButton from "./helpers/AddToWishlistButton";
import AddToCartButton from "./helpers/AddToCartButton";
import PowerModal from "./helpers/PowerModal";
import ProductPrice from "./helpers/ProductPrice";
import FreeShippingNote from "../helpers/FreeShippingNote";
import { useTranslations } from "next-intl";
import ClearModal from "./helpers/ClearModal";
import { useGlobalModals } from "@/store/helpers/modals";
import { useCartsStore } from "@/store/products/carts";
import ProductSchema from "./ProductSchema";
import { Link } from "@/i18n.config";
import { useGlobals } from "@/store/global/globals";
import ProductChoiceSelectionHandlers from "./helpers/ProductChoiceSelectionHandlers";
import { FireIcon } from "@heroicons/react/24/outline";

interface Props {
  product: FullProduct;
}

const InnerProduct = ({ product }: Props) => {
  const { lang } = useParams();
  const { isMobileLayout } = useGlobals();

  const { prod, setProd, setFromProductPage, setAssocProd, setActiveMedia } =
    useProducts();
  const { resetChoice, resetSelectedPackageOption } = useCartsStore();
  const { cartModal } = useGlobalModals();

  const t = useTranslations("BreadC");
  const tp = useTranslations("Product");

  // breadcrumb
  const items = [
    { name: t("shop"), link: "/category/all" },
    { name: t("proddets"), link: "#" },
  ];

  useEffect(() => {
    // console.log("prod: ", product);
    setProd(product);

    return () => {
      setProd(null);
      resetChoice("main");
      setFromProductPage(true);
      setAssocProd(null);
      setActiveMedia("main", null);
      resetSelectedPackageOption();
    };
  }, []);

  if (!prod) return;

  return (
    <>
      {prod && <ProductSchema product={prod} />}
      {prod && (
        <div>
          <BreadCrumb items={items} />
          <div className="py-2 md:py-4 w-full">
            <div className="wrapper">
              <div className="grid grid-cols-12 gap-2 md:gap-4">
                {/* media & shares & tags */}
                <div className="col-span-12 md:col-span-6">
                  <ProductMedia
                    mini={false}
                    thumbnail={prod.thumbnail_image}
                    main_photos={product.main_photos}
                    colors={prod.colors}
                    vid={prod.video_link}
                  />

                  {/* colors & atts handlers */}
                  {isMobileLayout && <ProductChoiceSelectionHandlers />}

                  <SharePageButtons />
                </div>
                {/* details */}
                <div className="col-span-12 md:col-span-6">
                  {/* scrollable */}
                  <div className="w-full ">
                    {/* md:max-h-[420px] md:overflow-y-scroll hide-scrollbar */}
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-400 ">
                        {lang == "ar" ? prod.brand.ar_name : prod.brand.name}
                      </p>
                      <StarRating
                        rating={{ rate: prod.rating, total: prod.rating_count }}
                      />
                    </div>
                    <div className="w-full flex flex-col mb-1">
                      <div className="flex items-center space-s-2">
                        <h1 className="text-3xl mt-4 mb-2">
                          {lang == "ar" ? prod.ar_name : prod.name}
                        </h1>
                        {prod.new && (
                          <div className="px-1 py-[2px] animate-pulse bg-blue-600 flex items-center space-s-1 rounded text-white text-xs">
                            <FireIcon className="size-4" />{" "}
                            <span>{tp("nw")}</span>
                          </div>
                        )}
                      </div>

                      {Number(prod.all_variants_stocks) > 0 && (
                        <div className="flex items-center space-s-2 ps-2">
                          <ActiveBadge />
                          <span className="text-xs">{tp("instkready")}</span>
                        </div>
                      )}

                      {/* price */}
                      <ProductPrice
                        mini={false}
                        has_discount={prod.has_discount}
                        discount={prod.discount}
                        main_price={prod.main_price}
                        stroked_price={prod.stroked_price}
                        first_variant={prod.first_variant}
                        colors={prod.colors}
                      />
                    </div>
                    <div className="">
                      <ProductMiniDescription
                        des={{ ar: prod.ar_description, en: prod.description }}
                      />

                      <ShowMoreDescription />
                    </div>

                    {/* color handler */}
                    {!isMobileLayout && <ProductChoiceSelectionHandlers />}
                  </div>
                  {/* cart & wishlist */}
                  <div className="mt-2 w-full flex items-center space-s-2">
                    {/* add to cart button */}
                    <AddToCartButton
                      style="big"
                      mini={false}
                      inStock={Number(prod.all_variants_stocks) > 0}
                    />
                    {/* wishlist */}
                    <AddToWishlistButton pId={prod.id} />
                  </div>

                  {/* free shipping note */}
                  <FreeShippingNote />

                  {/* available stock */}
                  {Number(prod.all_variants_stocks) < 3 && (
                    <div className="mt-1 flex items-center justify-center">
                      <p className="text-xs flex items-center space-s-1 text-primary">
                        <span> &#8226;</span>
                        <span className="font-bold">
                          {tp("only")} {"2"} {tp("availstk")}.
                        </span>
                      </p>
                    </div>
                  )}

                  {/* points */}
                  <div className="my-3">
                    <div className="p-1 md:p-2 rounded-lg border-[2px] flex flex-col space-y-2 items-center justify-center min-h-16">
                      <div className="flex items-center space-s-2">
                        <PointIcon />
                        <span>
                          {tp("wrth")} {prod.earn_point} {tp("pnts")}
                        </span>
                      </div>
                      <p>
                        {tp("earnevry")} {"AED 40"} {tp("spnd")}
                      </p>
                    </div>
                  </div>

                  {/* discover */}
                  {prod.big_category && (
                    <div className="my-3 w-full px-4 py-1 border rounded text-center text-white text-sm bg-gradient-to-l from-black to-primary">
                      <Link
                        href={`/category/${prod.big_category}`}
                        className=""
                      >
                        <span>{tp("allcolrs")}</span>
                      </Link>
                    </div>
                  )}

                  {/* associated product (solution) */}
                  <AdditionalProductCard id={prod.id!} />
                </div>
              </div>
            </div>

            {/* Description & details & reviews */}
            <LineDivider />
            <div className="wrapper" id="detsArea">
              <ProductDetailsTabs />
              <ProductsDetailsArea
                des={{ ar: prod.ar_description, en: prod.description }}
                id={prod.id}
              />
            </div>

            {/* power modal */}
            {!cartModal && (
              <>
                <PowerModal mini={false} />
                <ClearModal mini={false} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default InnerProduct;
