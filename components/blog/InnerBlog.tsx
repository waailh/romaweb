"use client";

import { BlogResponse } from "@/typings";
import BreadCrumb from "../helpers/BreadCrumb";
import DownOpacityAnimator from "../animators/DownOpacityLogoAnimator";
import BlogHero from "./BlogHero";

import BlogPagination from "./BlogPagination";
import BlogCategories from "./BlogCategories";
import BlogArticles from "./BlogArticles";
import { useEffect } from "react";
import { useBlogs } from "@/store/blog";
import { useTranslations } from "next-intl";

interface Props {
  data: BlogResponse;
}

const InnerBlog = ({ data }: Props) => {
  const t = useTranslations("BreadC");

  const items = [{ name: t("blg"), link: "#" }]; // for breadcrumb

  const {
    data: {
      categories,
      blog_banner,
      articles: { current_page, last_page, total, data: blogsData },
    },
  } = data;

  const { blogs, setBlogs, setBlogsMeta } = useBlogs();

  useEffect(() => {
    setBlogs(blogsData);
    setBlogsMeta({ current_page, last_page, total });
  }, []);

  if (!blogs) return;

  return (
    <div>
      <BreadCrumb items={items} />
      <DownOpacityAnimator>
        <BlogHero banner={blog_banner} />
      </DownOpacityAnimator>
      <div className="wrapper">
        {/* categories */}
        <BlogCategories categories={categories} />

        {/* articles */}
        <BlogArticles />

        {/* pagination */}
        <BlogPagination />
      </div>
    </div>
  );
};

export default InnerBlog;
