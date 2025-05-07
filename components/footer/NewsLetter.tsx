import { useTranslations } from "next-intl";
import NewsLetterForm from "./NewsLetterForm";

const NewsLetter = () => {
  const t = useTranslations("Footer");

  return (
    <div className="md:py-6 mb-2 md:mb-8">
      <div className="mini-wrapper">
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-12 md:col-span-6 flex flex-col">
            <h6 className="font-bold text-xl">{t("joinnws")}</h6>
            <p className="text-grayee text-md">{t("nwsp")}</p>
          </div>
          <NewsLetterForm />
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
