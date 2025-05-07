"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import CategoryFilter from "./filter/CategoryFilter";
import BrandsFilter from "./filter/BrandsFilter";
import ColorFilter from "./filter/ColorFilter";
import EyesColorFilter from "./filter/colored-lenses/EyesColorFilter";
import PriceFilter from "./filter/PriceFilter";
import { ProductFilter } from "@/typings";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import GeneralFilter from "./filter/GeneralFilter";
import ResetFiltersButton from "./filter/ResetFiltersButton";
import FetchProductsWithFiltersButton from "./filter/FetchProductsWithFiltersButton";
import { useFilters } from "@/store/products/filters";
import PriceBarFilter from "./filter/colored-lenses/PriceBarFilter";

interface Props {
  id: number;
  filters?: ProductFilter[];
  isColored: boolean;
  hasColorFilter: boolean;
}

const ProductsFilter = ({ filters, id, isColored, hasColorFilter }: Props) => {
  const t = useTranslations("Cats");
  const tf = useTranslations("Filter");
  const { lang } = useParams();

  const { filter } = useFilters();

  return (
    <div className="w-full mt-2">
      <div className="flex flex-col ">
        {/* Color */}
        {hasColorFilter && (
          <Disclosure
            as="div"
            className={`w-full border-b py-2 cursor-pointer ${
              isColored ? "" : "order-2"
            }`}
            defaultOpen={true}
          >
            <DisclosureButton className="group bg-gray-100 rounded-t px-2 py-1 flex w-full items-center justify-between">
              <div className="">
                <div className="font-bold text-sm">{tf("clrs")}</div>
              </div>
              <div className="bg-transparent p-1 ">
                <ChevronDownIcon className="size-4" />
              </div>
            </DisclosureButton>
            <DisclosurePanel className="mt-1 px-2 text-sm/5 text-black/50 mb-1">
              {isColored ? <EyesColorFilter /> : <ColorFilter />}
            </DisclosurePanel>
          </Disclosure>
        )}

        {/* category */}
        {!isColored && (
          <Disclosure
            as="div"
            className={`w-full border-b cursor-pointer order-0`}
            defaultOpen={true}
          >
            <DisclosureButton className="group bg-gray-100 rounded-t px-2 py-1 flex w-full items-center justify-between">
              <div className="">
                <div className="font-bold text-sm">{t("cat")}</div>
              </div>
              <div className="bg-transparent p-1 ">
                <ChevronDownIcon className="size-4" />
              </div>
            </DisclosureButton>
            <DisclosurePanel className="mt-1 px-2 text-sm/5 text-black/50 mb-1">
              <CategoryFilter />
            </DisclosurePanel>
          </Disclosure>
        )}

        {/* brands */}
        <Disclosure
          as="div"
          className={`w-full border-b py-2 cursor-pointer`}
          defaultOpen={filter.brands.length > 0}
        >
          <DisclosureButton className="group bg-gray-100 rounded-t px-2 py-1 flex w-full items-center justify-between">
            <div className="">
              <div className="font-bold text-sm">{tf("brnds")}</div>
            </div>
            <div className="bg-transparent p-1 ">
              <ChevronDownIcon className="size-4" />
            </div>
          </DisclosureButton>
          <DisclosurePanel className="mt-1 px-2 text-sm/5 text-black/50 mb-1">
            <BrandsFilter />
          </DisclosurePanel>
        </Disclosure>

        {/* mapping filters coming from db */}
        <>
          {filters &&
            filters.map((one, i) => {
              let component = (
                <Disclosure
                  as="div"
                  className={`w-full border-b py-2 cursor-pointer`}
                  defaultOpen={false}
                >
                  <DisclosureButton className="group bg-gray-100 rounded-t px-2 py-1 flex w-full items-center justify-between">
                    <div className="">
                      <div className="font-bold text-sm">
                        {lang == "ar" ? one.ar_name : one.name}
                      </div>
                    </div>
                    <div className="bg-transparent p-1 ">
                      <ChevronDownIcon className="size-4" />
                    </div>
                  </DisclosureButton>
                  <DisclosurePanel className="mt-1 px-2 text-sm/5 text-black/50 mb-1">
                    <GeneralFilter id={one.id} values={one.values} />
                  </DisclosurePanel>
                </Disclosure>
              );

              return (
                <div key={i} className="">
                  {component}
                </div>
              );
            })}
        </>

        {/* Price */}
        <Disclosure
          as="div"
          className={`w-full border-b py-2 cursor-pointer order-3`}
          defaultOpen={false}
        >
          <DisclosureButton className="group bg-gray-100 rounded-t px-2 py-1 flex w-full items-center justify-between">
            <div className="">
              <div className="font-bold text-sm">{tf("price")}</div>
            </div>
            <div className="bg-transparent p-1 ">
              <ChevronDownIcon className="size-4" />
            </div>
          </DisclosureButton>
          <DisclosurePanel className="mt-1 px-2 text-sm/5 text-black/50 mb-1 pt-2">
            <PriceBarFilter />
          </DisclosurePanel>
        </Disclosure>

        {/* Rating
        <Disclosure
          as="div"
          className={`w-full border-b py-2 cursor-pointer `}
          defaultOpen={false}
        >
          <DisclosureButton className="group bg-gray-100 rounded-t px-2 py-1 flex w-full items-center justify-between">
            <div className="">
              <div className="font-bold text-sm">Customer Rating</div>
            </div>
            <div className="bg-transparent p-1 ">
              <ChevronDownIcon className="size-4" />
            </div>
          </DisclosureButton>
          <DisclosurePanel className="mt-1 px-2 text-sm/5 text-black/50 mb-1">
            <RatingFilter />
          </DisclosurePanel>
        </Disclosure> */}
      </div>
      <div className="mt-2 flex flex-col space-y-2">
        <FetchProductsWithFiltersButton catId={id} />
        <ResetFiltersButton />
      </div>
    </div>
  );
};

export default ProductsFilter;
