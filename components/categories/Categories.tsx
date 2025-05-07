"use client";
import { axiosPure } from "@/lib/auth/axios/axios";
import MyImage from "../ui/MyImage";
import SectionTitle from "../ui/SectionTitle";
import { Category } from "@/typings";
import { useLocale, useTranslations } from "next-intl";
import { useCategories } from "@/store/global/categories";
import { useParams } from "next/navigation";
import { Link } from "@/i18n.config";

const Categories = () => {
  const { cats } = useCategories();

  // console.log(cats);

  const { lang } = useParams();
  const t = useTranslations("Cats");

  return (
    <div className="bg-lightgray mt-2 md:mt-12 w-full py-4">
      <div className="wrapper">
        <SectionTitle title={t("cats")} />
        <div className="w-full grid grid-cols-12 gap-3 md:gap-4">
          {cats &&
            cats.map((one: Category, i: number) => (
              <div key={i} className="col-span-4 lg:col-span-2">
                <Link href={`/category/${one.slug}`}>
                  <div className="relative w-full aspect-square overflow-hidden rounded">
                    <MyImage
                      src={one.icon}
                      className="hover:scale-[1.02] duration-500 object-contain transition-all ease-in"
                      fill
                    />
                  </div>
                </Link>
                <h1 className="text-lg shrink-0 text-primary font-semibold w-fit mx-auto md:my-2">
                  {lang == "ar" ? one.ar_name : one.name}
                </h1>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
