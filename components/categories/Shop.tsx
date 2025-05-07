"use client";

import {
  BreadCrumbItem,
  Category,
  Product,
  ProductsResponseData,
} from "@/typings";
import BreadCrumb from "../helpers/BreadCrumb";
import ProductsList from "../products/ProductsList";
import CategoryBanner from "./CategoryBanner";
import InnerCategories from "./InnerCategories";
import MobileFilter from "./MobileFilter";
import ProductsFilter from "./ProductsFilter";
import { useParams } from "next/navigation";
import ShopProductsList from "../products/ShopProductsList";
import ProductsPagination from "../products/ProductsPagination";
import { useEffect } from "react";
import { useCategories } from "@/store/global/categories";
import { usePathname } from "@/i18n.config";
import { useGlobals } from "@/store/global/globals";
import { useProducts } from "@/store/products/products";
import { useTranslations } from "next-intl";
import ColoredLensesProductsFilter from "./ColoredLensesProductsFilter";
import { useFetchProducts } from "../hooks/useFetchProducts";
import { useFilters } from "@/store/products/filters";

interface Props {
  data: Category;
  firstProds: ProductsResponseData;
  path: { id: number; slug: string; name: string; ar_name: string }[];
}

const Shop = ({ data, path, firstProds }: Props) => {
  const { resetFilter } = useFilters();
  const { lang, cat } = useParams();
  let list: BreadCrumbItem[] = [];

  if (path)
    list = path.map((one) => ({
      name: lang == "ar" ? one.ar_name : one.name,
      link: `/category/${one.slug}`,
    }));

  const t = useTranslations("BreadC");

  const items = [{ name: t("shop"), link: "/category/all" }, ...list];

  // brand & category filter stuff
  const { setCatBrands, setCatChilds } = useCategories();
  const pathname = usePathname();

  const { handleSuccess } = useFetchProducts(data?.id!);

  useEffect(() => {
    setCatBrands(data?.products_brands);
    setCatChilds(data?.subcats);

    handleSuccess(firstProds);
    resetFilter();
  }, [pathname]);

  const { isMobileLayout } = useGlobals();

  const isColored = path?.some((one) => one.id === 108) ?? false;

  const hasColorFilter =
    path?.some((one) => [108, 136].includes(one.id)) ?? false;

  return (
    <div>
      <BreadCrumb items={items} />
      {isMobileLayout && (
        <MobileFilter
          filters={data?.filter}
          brands={data?.products_brands!}
          id={data?.id!}
          isColored={isColored}
          hasColorFilter={hasColorFilter}
        />
      )}
      <div className="wrapper">
        <div className="grid grid-cols-12 md:grid-cols-11 gap-4">
          <div className="col-span-12 md:col-span-2">
            <div className="hidden md:flex">
              {isColored && isMobileLayout ? (
                <ColoredLensesProductsFilter
                  id={data?.id!}
                  brands={data?.products_brands!}
                  filters={data?.filter}
                />
              ) : (
                <ProductsFilter
                  id={data?.id!}
                  filters={data?.filter!}
                  hasColorFilter={hasColorFilter}
                  isColored={isColored}
                />
              )}
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <CategoryBanner
              img={data?.banner}
              ar_img={data?.ar_banner}
              alt={
                cat !== "all" ? (lang == "ar" ? data.ar_name : data.name) : "/"
              }
            />
            <InnerCategories cats={data?.subcats} />
            <ShopProductsList />
            <ProductsPagination catId={data?.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
