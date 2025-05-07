"use client";

import EyesColorFilter from "./filter/colored-lenses/EyesColorFilter";
import UsageFilter from "./filter/colored-lenses/UsageFilter";
import { Brand, ProductFilter } from "@/typings";
import { useTranslations } from "next-intl";
import ResetFiltersButton from "./filter/ResetFiltersButton";
import FetchProductsWithFiltersButton from "./filter/FetchProductsWithFiltersButton";

import StyleFilter from "./filter/colored-lenses/StyleFilter";
import BrandFilter from "./filter/colored-lenses/BrandFilter";
import PriceBarFilter from "./filter/colored-lenses/PriceBarFilter";
import { useParams } from "next/navigation";
import GeneralFilter from "./filter/colored-lenses/GeneralFilter";

interface Props {
  id: number;
  brands: Brand[];
  filters?: ProductFilter[];
}

const ColoredLensesProductsFilter = ({ filters, brands, id }: Props) => {
  const t = useTranslations("Filter");
  const { lang } = useParams();

  return (
    <div className="w-full mt-2">
      <div className="flex flex-col text-sm">
        {/* new filter */}
        <div className="flex flex-col space-y-3">
          {/* color */}
          <div className="flex flex-col space-y-2">
            <div className="bg-gray-100 rounded-t px-2 py-1">
              <p>{t("col")}</p>
            </div>
            <EyesColorFilter />
          </div>

          <>
            {filters?.map((one, i) => {
              let component;

              switch (one.id) {
                case 3: // ring-style
                  component = (
                    <div className="flex flex-col space-y-2">
                      <div className="bg-gray-100 rounded-t px-2 py-1">
                        <p>{t("styl")}</p>
                      </div>
                      <StyleFilter id={3} values={one.values} />
                    </div>
                  );
                  break;

                default:
                  component = (
                    <div className="flex flex-col space-y-2">
                      <div className="bg-gray-100 rounded-t px-2 py-1">
                        <p>{lang == "ar" ? one.ar_name : one.name}</p>
                      </div>
                      <GeneralFilter id={one.id} values={one.values} />
                    </div>
                  );
                  break;
              }

              return (
                <div key={i} className="">
                  {component}
                </div>
              );
            })}
          </>

          {/* brand */}
          <div className="flex flex-col space-y-2">
            <div className="bg-gray-100 rounded-t px-2 py-1">
              <p>{t("brnd")}</p>
            </div>
            <BrandFilter brands={brands} />
          </div>

          {/* price */}
          <div className="flex flex-col space-y-5">
            <div className="bg-gray-100 rounded-t px-2 py-1">
              <p>{t("pric")}</p>
            </div>
            <PriceBarFilter />
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-col space-y-2">
        <FetchProductsWithFiltersButton catId={id} />
        <ResetFiltersButton />
      </div>
    </div>
  );
};

export default ColoredLensesProductsFilter;
