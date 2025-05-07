"use client";

import { Link } from "@/i18n.config";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import OneFaq from "./OneFaq";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

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

const MiniFAQ = () => {
  const t = useTranslations("Faq");
  const { lang } = useParams();

  return (
    <div className="mt-2 md:mt-12 py-6">
      <div className="wrapper">
        <div className="mini-wrapper">
          <div className="w-full">
            <h3 className="font-bold text-2xl mb-2">{t("faq")}</h3>
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:items-center md:justify-between">
              <p className="text-xs md:text-md">{t("faqin")}</p>
              <Link
                href="/faq"
                className="flex items-center space-s-2 text-xs md:text-sm hover:underline"
              >
                <span className="shrink-0">{t("cAll")}</span>
                <ArrowRightIcon
                  className={`size-4 ${lang == "ar" ? "scale-x-[-1]" : ""}`}
                />
              </Link>
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center space-y-4">
            {faqs.map((one, i) => (
              <OneFaq key={i} order={i} faq={one} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniFAQ;
