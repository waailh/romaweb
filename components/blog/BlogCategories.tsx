"use client";

import { useBlogs } from "@/store/blog";
import { BlogCategory } from "@/typings";
import { useParams } from "next/navigation";
import { useFetchArticles } from "../hooks/useFetchArticles";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

interface Props {
  categories: BlogCategory[];
}

const BlogCategories = ({ categories }: Props) => {
  const { lang } = useParams();
  const { activeBlogCat, setActiveBlogCat } = useBlogs();

  const { fetchArticles } = useFetchArticles();

  const handleChangeCategory = (data: number | "all") => {
    setActiveBlogCat(data);
    fetchArticles({ page: 1, keyword: "", cat: data });
  };

  const t = useTranslations("Blog");

  return (
    <div className="my-4 flex w-full overflow-x-scroll hide-scrollbar">
      <div className="flex space-s-2 items-center w-fit">
        <button
          onClick={() => handleChangeCategory("all")}
          className={`shrink-0 border-[0.11rem] border-primary text-primary text-sm px-3 py-2 rounded ${
            activeBlogCat == "all" ? "bg-primary text-white" : ""
          }`}
        >
          {t("all")}
        </button>
        {categories.map((one: BlogCategory, i: number) => (
          <button
            key={i}
            onClick={() => handleChangeCategory(one.id)}
            className={`shrink-0 border-[0.11rem] border-primary text-primary text-sm px-3 py-2 rounded ${
              activeBlogCat == one.id ? "bg-primary text-white" : ""
            }`}
          >
            {lang == "ar" ? one.ar_name : one.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogCategories;
