"use client";

import Loading from "@/components/ui/loaders/Loading";
import { useBrands } from "@/store/global/brands";
import { useCategories } from "@/store/global/categories";
import { useFilters } from "@/store/products/filters";
import { Brand } from "@/typings";
import { Checkbox } from "@headlessui/react";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BrandsFilter = () => {
  const t = useTranslations("Filter");
  const { allBrands } = useBrands();
  const { filter, setFilter } = useFilters();

  const { lang } = useParams();

  const [search, setSearch] = useState("");
  const [brands, setBrands] = useState<Brand[]>();

  const { catBrands } = useCategories();

  const filterBrands = (text: string) => {
    let base = catBrands || allBrands;
    if (base) {
      const brands = base.filter(
        (brand: Brand) =>
          brand.name.toLowerCase().includes(text.toLowerCase()) ||
          brand.ar_name?.includes(text)
      );
      setBrands(brands);
    }
  };

  useEffect(() => {
    filterBrands(search);
  }, [allBrands, search, catBrands]);

  if (!allBrands) return;

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center space-s-2 pb-1 border-b mb-1 text-sm">
        <MagnifyingGlassIcon className="size-4" />
        <input
          type="text"
          className="outline-none w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("brndsplace")}
        />
      </div>

      <div className="max-h-40 overflow-y-scroll custom-y-scrollbar">
        {brands ? (
          brands.map((one, i) => {
            const checked = filter.brands?.includes(one.id);
            return (
              <div
                key={i}
                onClick={
                  checked
                    ? () => setFilter("remove_brand", one.id!)
                    : () => setFilter("add_brand", one.id!)
                }
                className="flex items-center space-s-2 mb-1 text-sm"
              >
                <Checkbox
                  checked={checked}
                  className="group size-6 rounded-md bg-white/10 border p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
                >
                  <CheckIcon className="hidden size-4 text-primary group-data-[checked]:block" />
                </Checkbox>
                <span>{lang == "ar" ? one.ar_name : one.name}</span>
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default BrandsFilter;
