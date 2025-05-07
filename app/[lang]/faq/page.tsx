import OneFaq from "@/components/faq/OneFaq";
import BreadCrumb from "@/components/helpers/BreadCrumb";
import Divider from "@/components/helpers/Divider";
import { useTranslations } from "next-intl";
import Script from "next/script";

const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

interface MetaProps {
  params: { lang: string };
}

export async function generateMetadata({ params: { lang } }: MetaProps) {
  const en_title = "Frequently Asked Questions";
  const ar_title = "الأسئلة الشائعة";

  const en_description = "";
  const ar_description = "";

  const title = lang == "ar" ? ar_title : en_title;
  const description = lang == "ar" ? ar_description : en_description;

  return {
    title,
    // description,
    robots: {
      index: true,
      nocache: true,
      googleBot: {
        index: true,
      },
    },
    alternates: {
      canonical: `${appUrl}/${lang}/faq`,
      languages: {
        "x-default": `${appUrl}/en/faq`,
        en: `${appUrl}/en/faq`,
        ar: `${appUrl}/ar/faq`,
      },
    },
  };
}

const faqs = [
  {
    question: "How to choose the right type of lenses for you?",
    ar_q: "كيف تختارين نوع العدسات المناسب لك؟",
    answer:
      "Choosing the right type of lenses requires considering several factors such as the necessary degree of vision correction, comfort during use, and your daily lifestyle. It's best to consult an eye doctor to determine the optimal choice. Make sure to try out the lenses before making a final decision.",
    ar_ans:
      "اختيار نوع العدسات المناسب يتطلب مراعاة عدة عوامل، مثل درجة تصحيح النظر المطلوبة، مدى الراحة عند الاستخدام، وأسلوب الحياة اليومي. ومن الأفضل استشارة أخصائي العيون لتحديد الخيار الأمثل. تأكدي من تجربة العدسات قبل اتخاذ القرار النهائي.",
  },
  {
    question: "Can Clear lenses be colored?",
    ar_q: "هل يمكن ان تكون العدسات الطبية ملونة؟",
    answer:
      "Yes, Clear lenses can indeed be colored. These lenses combine vision correction with changing eye color for cosmetic purposes. They are commonly used to enhance appearance alongside improving vision.",
    ar_ans:
      "نعم، يمكن أن تكون العدسات الطبية ملونة. هذه العدسات تجمع بين تصحيح النظر وتغيير لون العين لأغراض تجميلية. تستخدم عادة لتحسين المظهر بجانب تحسين الرؤية.",
  },
  {
    question: "Can drops be used while wearing contact lenses?",
    ar_q: "هل يمكن وضع قطرة اثناء ارتداء العدسات؟",
    answer:
      "Yes, certain drops can be used while wearing contact lenses, but it's important to use drops specifically designed for this purpose. Consult an eye doctor to ensure that the drops are safe and suitable for your lenses. Avoid using regular drops as they may cause irritation or damage to the lenses.",
    ar_ans:
      "نعم، يمكن وضع قطرات معينة أثناء ارتداء العدسات اللاصقة، ولكن يجب استخدام قطرات مخصصة لهذا الغرض. استشر طبيب العيون للتأكد من أن القطرات آمنة ومناسبة لعدساتك. تجنب استخدام القطرات العادية لأنها قد تسبب تهيجا أو تلف العدسات.",
  },
];

interface Props {
  params: { lang: string };
}

const FaqPage = ({ params: { lang } }: Props) => {
  const t = useTranslations("Faq");

  const items = [{ name: t("faq"), link: "#" }]; // for breadcrumb

  const data = faqs.map((one) => {
    return {
      "@type": "Question",
      name: lang == "ar" ? one.ar_q : one.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: lang == "ar" ? one.ar_ans : one.answer,
      },
    };
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data,
  };

  return (
    <>
      <Script
        id="faq-schema"
        key="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div>
        <BreadCrumb items={items} />
        <div className="mini-wrapper">
          <Divider />
          <div className="">
            <h4>{t("faqbig")}</h4>
          </div>

          <div className="mt-6 flex flex-col items-center space-y-4">
            {faqs.map((one, i) => (
              <OneFaq key={i} order={i} faq={one} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqPage;
