"use client";

import { ArticleDataResponse } from "@/typings";
import BreadCrumb from "../helpers/BreadCrumb";
import MyImage from "../ui/MyImage";
import { Link } from "@/i18n.config";
import ShareArticlePageButtons from "./ShareArticlePageButtons";
import { useParams } from "next/navigation";
import BlogArticleProduct from "./BlogArticleProduct";
import StaticHtmlViewer from "../static-pages/html/StaticHtmlViewer";
import ArticleSchema from "./ArticleSchema";
import { useTranslations } from "next-intl";

interface Props {
  data: ArticleDataResponse;
}

const InnerArticlePage = ({ data }: Props) => {
  const { article: post, recents } = data;

  const t = useTranslations("Blog");
  const { lang } = useParams();

  const items = [
    { name: t("blg"), link: "/blog" },
    { name: lang == "ar" ? post.ar_title : post.title, link: "#" },
  ];

  return (
    <>
      <ArticleSchema article={post} />

      <div>
        <BreadCrumb items={items} />
        {/* article header */}
        <div className="bg-gray-100 py-6">
          <div className="wrapper">
            <div className="flex flex-col space-y-4 md:flex-row md:items-start md:space-y-0 md:space-s-2">
              <div className="w-full md:w-[50%] aspect-[1.3/1] relative rounded-xl">
                <MyImage
                  src={lang == "ar" ? post.ar_banner : post.banner}
                  className="object-cover rounded-xl"
                  fill
                />
              </div>
              <div className="p-2 md:p-4 md:w-[50%] flex flex-col justify-between rounded-lg">
                <div className="w-full flex items-center justify-between">
                  <div className=" px-2 py-1 rounded bg-white border text-sm">
                    {lang == "ar" ? post.category.ar_name : post.category.name}
                  </div>
                  <div className="">
                    <span className="text-gray-600">{post.date}</span>
                  </div>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="mt-3 md:mt-6 mb-2">
                    {lang == "ar" ? post.ar_title : post.title}
                  </h2>
                </Link>
                <div className="flex flex-col space-y-4">
                  {lang == "ar"
                    ? post.ar_short_description
                    : post.short_description}
                </div>
                <div className="mt-4 md:mt-12 flex items-center space-s-6 text-sm">
                  <span className="font-bold">{t("byahmedosm")}</span>
                  {/* <span className="text-grayee">
                  {"5"} Mins Read
                </span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* rest of the page */}
        <div className="wrapper">
          <div className="grid grid-cols-12 gap-4">
            {/* side */}
            <div className="col-span-12 lg:col-span-3 order-2 lg:order-1">
              {/* share */}
              <div className="">
                <ShareArticlePageButtons />
              </div>

              {/* <div className="my-2">
                <p className="text-lg">{t("relcats")}</p>
                <ul className="flex items-center space-s-2 text-sm">
                  <li>
                    <Link href={"/#"}>Makeup</Link>
                  </li>
                </ul>
              </div> */}

              {/* read next */}
              <div className="mt-4 flex flex-col space-y-2">
                <h5>{t("rdnxt")}</h5>
                {/* articles */}
                <div className="flex flex-col space-y-2">
                  {recents.map((one, i) => (
                    <div key={i} className="flex items-start space-s-2">
                      <div className="h-12 aspect-[8/6] relative">
                        <MyImage
                          className="object-cover"
                          src={lang == "ar" ? one.ar_banner : one.banner}
                          fill
                        />
                      </div>
                      <Link href={`/blog/${one.slug}`}>
                        <h6 className="font-bold line-clamp-2 hover:text-primary duration-300">
                          {lang == "ar" ? one.ar_title : one.title}
                        </h6>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* main articel area */}
            <div className="col-span-12 lg:col-span-9 order-1 lg:order-2 p-1 md:p-4 mt-6">
              {/* article html */}
              <div className="">
                <StaticHtmlViewer
                  html={lang == "ar" ? post.ar_description : post.description}
                />
              </div>
              {/* product */}
              {/* <BlogArticleProduct slug={"test-slug"} /> */}
            </div>
          </div>

          {/* products section */}
          {/* <ProductsSection title="Best Sellers" des="our best selling products" /> */}
        </div>
      </div>
    </>
  );
};

export default InnerArticlePage;
