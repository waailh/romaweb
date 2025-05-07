"use client";

import { Link } from "@/i18n.config";
import { axiosPure } from "@/lib/auth/axios/axios";
import BurgerIcon from "@/public/assets/icons/brg.svg";
import { useBrands } from "@/store/global/brands";
import { Category } from "@/typings";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const alphabet = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);

const AllBrandsButton = () => {
  const [view, setView] = useState(false);
  const [onArea, setOnArea] = useState(false);

  const { lang } = useParams();

  const { allColorBrands } = useBrands();

  const [brands, setBrands] = useState<Category[] | null>();

  const [letter, setLetter] = useState("");

  const handleMouseLeave = () => {
    if (!onArea) setView(false);
  };

  const t = useTranslations("Navbar");

  useEffect(() => {
    letter == ""
      ? setBrands(allColorBrands)
      : setBrands(allColorBrands?.filter((one) => one.name[0] == letter));
  }, [letter, allColorBrands]);

  // if (!allColorBrands) return null;

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setView(!view)}
        onMouseEnter={() => setView(true)}
        onMouseLeave={() => handleMouseLeave()}
        className="flex items-center space-s-2 bg-primary px-6 py-3 rounded-md text-white "
      >
        <BurgerIcon />
        <span>{t("allBrands")}</span>
      </button>
      <div
        onMouseEnter={() => setOnArea(true)}
        onMouseLeave={() => setView(false)}
        className="relative "
      >
        {view && (
          <div className="absolute top-0 start-0  h-fit w-[800px] z-layer-4 p-3 bg-white">
            <div className="flex space-s-2.5 border-b pb-1">
              {alphabet.map((one, i) => (
                <button
                  key={i}
                  onClick={() => setLetter(one)}
                  className={`font-bold ${
                    letter == one ? "text-primary" : "text-black"
                  }`}
                >
                  <span>{one}</span>
                </button>
              ))}
            </div>
            <div className="mt-2">
              <div className="max-h-60 overflow-y-scroll bg-white w-full hide-scrollbar">
                <div className="grid grid-cols-12 gap-2 h-fit">
                  {brands &&
                    brands.map((one, i) => (
                      <Link
                        href={`/category/${one.slug}`}
                        key={i}
                        className="col-span-3 p-2 hover:bg-lightgray rounded"
                      >
                        {lang == "ar" ? one.ar_name : one.name}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBrandsButton;
