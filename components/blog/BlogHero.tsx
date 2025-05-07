import { BlogBanner } from "@/typings";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface Props {
  banner: BlogBanner;
}

const BlogHero = ({ banner }: Props) => {
  const { lang } = useParams();
  const t = useTranslations("Blog");

  return (
    <div
      style={{
        backgroundImage: `url('${
          lang == "ar" ? banner.ar_image : banner.image
        }')`,
      }}
      className="h-[14rem] md:h-[20rem] bg-no-repeat bg-cover bg-right"
    >
      <div className="wrapper h-full">
        <div className="flex flex-col md:max-w-[500px] h-full items-center justify-center">
          <div className="flex flex-col space-y-4 p-4 text-white">
            <h2>{t("wel")}</h2>
            <p>{t("downtext")}</p>
            <div className="flex items-center justify-between space-s-2 bg-white rounded-full px-2 py-1">
              <input
                type="text"
                placeholder={t("srchplace")}
                className="w-full outline-none px-3 text-sm text-black"
              />
              <button className="p-2 bg-black rounded-full">
                <MagnifyingGlassIcon className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHero;
