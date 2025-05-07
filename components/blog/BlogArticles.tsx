"use client";

import FirstArticle from "./FirstArticle";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { Link } from "@/i18n.config";
import { useBlogs } from "@/store/blog";
import MyImage from "../ui/MyImage";
import { useParams } from "next/navigation";
import BlogsLoader from "../ui/loaders/BlogsLoader";
import { useTranslations } from "next-intl";

const BlogArticles = () => {
  const { blogs, loading } = useBlogs();
  const { lang } = useParams();

  const firstArticle = blogs[0];

  const t = useTranslations("Blog");

  //   console.log(firstArticle);

  return (
    <>
      {blogs && !loading ? (
        <div>
          {firstArticle && <FirstArticle article={firstArticle} />}

          {blogs.length > 0 ? (
            <div className="mt-4 grid grid-cols-12 gap-4">
              {blogs.slice(1).map((one, i) => (
                <div
                  key={i}
                  className="col-span-12 md:col-span-4 lg:col-span-3 flex flex-col space-y-1"
                >
                  <div className="relative">
                    <Link href={`/blog/${one.slug}`}>
                      <div className="w-full aspect-[1.3/1] bg-gray-100 relative rounded-md">
                        <MyImage
                          src={lang == "ar" ? one.ar_banner : one.banner}
                          className="object-cover rounded-md"
                          fill
                        />
                      </div>
                    </Link>
                    <div className="absolute top-2 left-2 px-2 py-1 rounded bg-white border text-xs">
                      {lang == "ar" ? one.category.ar_name : one.category.name}
                    </div>
                  </div>
                  <Link
                    href={`/blog/${one.slug}`}
                    className="font-bold line-clamp-1"
                  >
                    {lang == "ar" ? one.ar_title : one.title}
                  </Link>
                  <p className="text-xs line-clamp-1">
                    {lang == "ar"
                      ? one.ar_short_description
                      : one.short_description}
                  </p>

                  {/* date and read length */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">{one.date}</span>
                    {/* <span className="">{one.read_length} Mins Read</span> */}
                  </div>

                  <Link
                    href={`/blog/${one.slug}`}
                    className="flex items-center space-s-2 text-sm"
                  >
                    <span className="font-bold">{t("readnow")}</span>
                    <ArrowLongRightIcon
                      className={`size-6 ${lang == "ar" ? "scale-x-[-1]" : ""}`}
                    />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 mt-6 flex items-center justify-center">
              <p>{t("noarticls")}</p>
            </div>
          )}
        </div>
      ) : (
        <BlogsLoader />
      )}
    </>
  );
};

export default BlogArticles;
