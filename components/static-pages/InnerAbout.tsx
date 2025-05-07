"use client";

import { useTranslations } from "next-intl";
import BreadCrumb from "../helpers/BreadCrumb";
import AboutFocusSection from "./AboutFocusSection";
import AboutStepsSection from "./AboutStepsSection";
import { useParams } from "next/navigation";
import StaticHtmlViewer from "./html/StaticHtmlViewer";

interface Props {
  data: { content: string };
}

const abt = {
  en: "Roma Optical is a leading company in the field of colored and Clear contact lenses and artificial eyelashes. Roma Optical aims to provide the best visual solutions to its customers through a wide range of products known for their high quality and modern design. The company offers Clear contact lenses for vision correction and colored lenses for aesthetic enhancement, catering to the needs of all customers whether for Clear or cosmetic purposes. Additionally, Roma Optical provides artificial eyelashes that add an attractive and distinctive touch to your appearance. The company is committed to delivering excellent customer service and ensuring customer satisfaction through reliable and safe products that meet the highest standards. Discover the difference with Roma Optical!",
  ar: "روما أوبتكال هي شركة رائدة في مجال العدسات اللاصقة الملونة والطبية، بالإضافة إلى الرموش الاصطناعية. تسعى روما أوبتكال لتقديم أفضل الحلول البصرية لعملائها من خلال مجموعة واسعة من المنتجات التي تتميز بالجودة العالية والتصميم العصري. تقدم الشركة عدسات لاصقة طبية لتصحيح النظر وعدسات ملونة لإضفاء لمسة جمالية، مما يلبي احتياجات جميع العملاء سواء لأغراض طبية أو تجميلية. بالإضافة إلى ذلك، توفر روما أوبتكال رموشا اصطناعية تضيف لمسة جذابة ومميزة لمظهرك. تسعى الشركة دائما لتقديم خدمة عملاء ممتازة وضمان رضا العملاء من خلال منتجات موثوقة وآمنة تلبي أعلى المعايير. اكتشف الفرق مع روما أوبتكال!",
};

const InnerAbout = ({ data }: Props) => {
  const t = useTranslations("Statics");

  const tb = useTranslations("BreadC");
  const items = [{ name: tb("abtus"), link: "#" }]; // for breadcrumb

  const { lang } = useParams();

  return (
    <div>
      <BreadCrumb items={items} />
      <div className="wrapper">
        <div className="border rounded-xl p-2 md:p-4 flex flex-col items-center">
          <h1>{t("aboutTitle")}</h1>
          <div className="mt-2 md:mt-6 text-sm flex flex-col items-center text-center">
            <StaticHtmlViewer html={data.content} />
            {/* <p>{lang == "ar" ? abt.ar : abt.en}</p> */}
          </div>
        </div>
      </div>
      <div className="mt-4 md:mt-16 py-6 md:py-10 bg-gray-100">
        <div className="wrapper">
          <div className="flex flex-col items-center">
            <div className="mt-2 mb-10 md:mb-24">
              <h2>{t("focusTitle")}</h2>
            </div>
            <AboutFocusSection />
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="mt-12 mb-6">
          <AboutStepsSection />
        </div>
        {/* <AboutReviewsSection /> */}
      </div>
    </div>
  );
};

export default InnerAbout;
