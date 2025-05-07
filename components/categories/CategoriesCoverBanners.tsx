"use client";
import { axiosPure } from "@/lib/auth/axios/axios";
import MyImage from "../ui/MyImage";
import SectionTitle from "../ui/SectionTitle";
import { Category } from "@/typings";
import { useLocale, useTranslations } from "next-intl";
import { useCategories } from "@/store/global/categories";
import { useParams } from "next/navigation";
import { Link } from "@/i18n.config";

const CategoriesCoverBanners = () => {
  const { cats } = useCategories();

  // console.log(cats);

  const { lang } = useParams();
  const t = useTranslations("Cats");

  return (
    <div className="mt-2 md:mt-12 w-full py-4">
      <div className="wrapper">
        <div className="w-full grid grid-cols-12 gap-1 md:gap-2">
          {cats &&
            cats.map((one: Category, i: number) => (
              <div
                key={i}
                className="col-span-4 aspect-[1/2] lg:col-span-2 border rounded"
              >
                <Link href={`/category/${one.slug}`}>
                  <div className="relative w-full h-full overflow-hidden">
                    <MyImage
                      src={lang == "ar" ? one.ar_cover : one.cover}
                      className="hover:scale-[1.02] duration-500 rounded object-cover transition-all ease-in"
                      fill
                    />
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesCoverBanners;
