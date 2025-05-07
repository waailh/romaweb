"use client";

import { Category } from "@/typings";
import BreadCrumb from "../helpers/BreadCrumb";
import { useTranslations } from "next-intl";
import MyImage from "../ui/MyImage";
import { useRouter } from "@/i18n.config";

interface Props {
  cats: Category[];
}

const InnerColorCategories = ({ cats }: Props) => {
  const t = useTranslations("BreadC");
  const items = [{ name: t("brnds"), link: "#" }]; // for breadcrumb

  const router = useRouter();

  return (
    <div>
      <BreadCrumb items={items} />

      <div className="mt-4 wrapper">
        <div className="grid grid-cols-12 gap-2">
          {cats.map((one, i) => (
            <div
              onClick={() => router.push(`/category/${one.slug}`)}
              key={i}
              className="col-span-4 md:col-span-2 cursor-pointer"
            >
              <div className="w-full aspect-square relative">
                <MyImage src={one.icon} fill />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InnerColorCategories;
