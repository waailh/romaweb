import { BlogArticle } from "@/typings";
import MyImage from "../ui/MyImage";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { Link, useRouter } from "@/i18n.config";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface Props {
  article: BlogArticle;
}

const FirstArticle = ({ article }: Props) => {
  const { lang } = useParams();
  const router = useRouter();

  const t = useTranslations("Blog");

  // console.log(post);

  return (
    <div className="my-2 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-s-4">
      <Link href={`/blog/${article.slug}`} className="w-full md:w-[50%]">
        <div className="w-full aspect-[1.5/1] relative rounded-xl">
          <MyImage
            src={lang == "ar" ? article.ar_banner : article.banner}
            className="object-cover rounded-xl"
            fill
          />
        </div>
      </Link>

      <div className="p-2 md:p-4 md:w-[50%] flex flex-col bg-lightgray rounded-lg">
        <div className="w-full flex items-center justify-between">
          <div className=" px-2 py-1 rounded bg-white border text-sm">
            {lang == "ar" ? article.category.ar_name : article.category.name}
          </div>
          <div className="flex flex-col text-sm">
            <span className="text-gray-600">{article.date}</span>
            {/* <span className="font-bold">{""} Mins Read</span> */}
          </div>
        </div>
        <Link href={`/blog/${article.slug}`} className="my-2">
          <h2 className="">
            {lang == "ar" ? article.ar_title : article.title}
          </h2>
        </Link>
        <div className="flex flex-col space-y-4">
          <p>
            {lang == "ar"
              ? article.ar_short_description
              : article.short_description}
          </p>
        </div>
        <button
          onClick={() => router.push(`/blog/${article.slug}`)}
          className="mt-auto flex items-center space-s-2 pb-1 border-b border-primary text-primary w-fit"
        >
          <span className="font-bold">{t("readnow")}</span>
          <ArrowLongRightIcon
            className={`size-6 ${lang == "ar" ? "scale-x-[-1]" : ""}`}
          />
        </button>
      </div>
    </div>
  );
};

export default FirstArticle;
