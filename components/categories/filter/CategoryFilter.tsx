"use client";

import Loading from "@/components/ui/loaders/Loading";
import { Link } from "@/i18n.config";
import { useCategories } from "@/store/global/categories";
import { Category } from "@/typings";
import { Checkbox } from "@headlessui/react";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryFilter = () => {
  const [cats, setCats] = useState<Category[]>();
  const { allCats, catChilds } = useCategories();

  const t = useTranslations("Filter");

  const { lang } = useParams();

  const [search, setSearch] = useState("");

  const filterCats = (text: string) => {
    let base = catChilds || allCats;
    if (base) {
      const cats = base.filter(
        (cat: Category) =>
          cat.name.toLowerCase().includes(text.toLowerCase()) ||
          cat.ar_name?.includes(text)
      );
      setCats(cats);
    }
  };

  useEffect(() => {
    filterCats(search);
  }, [search, allCats]);

  if (!allCats) return;

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center space-s-2 pb-1 border-b mb-1 text-sm">
        <MagnifyingGlassIcon className="size-4" />
        <input
          type="text"
          className="outline-none w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("catplace")}
        />
      </div>

      <div className="max-h-40 overflow-y-scroll custom-y-scrollbar">
        {cats ? (
          cats.map((one, i) => {
            return (
              <div key={i} className="flex items-center space-s-2 mb-1 text-sm">
                <Link
                  href={`/category/${one.slug}`}
                  className="text-black hover:text-primary"
                >
                  {lang == "ar" ? one.ar_name : one.name}
                </Link>
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

export default CategoryFilter;
