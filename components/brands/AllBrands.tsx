"use client";

import { Brand } from "@/typings";
import MyImage from "../ui/MyImage";
import { useBrands } from "@/store/global/brands";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

interface Props {
  brands: Brand[];
}
const AllBrands = ({ brands }: Props) => {
  const t = useTranslations("Brands");
  const { setAllBrands } = useBrands();

  useEffect(() => {
    if (brands) setAllBrands(brands);
  }, []);

  return (
    <>
      <h3 className="my-2">{t("working")}</h3>
      <div className="grid grid-cols-12 divide  border">
        {brands.map((one, i) => (
          <div
            key={i}
            className="col-span-4 lg:col-span-2 py-1 px-1 bg-gray-50 hover:bg-white hover:shadow-xl transition ease-out hover:scale-[1] duration-500 items-center"
          >
            <div className="relative w-full aspect-square">
              <MyImage
                src={one.icon}
                className="object-contain rounded-md"
                fill
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllBrands;
