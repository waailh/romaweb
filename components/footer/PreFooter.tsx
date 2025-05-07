"use client";

import {
  ArrowPathRoundedSquareIcon,
  ArrowUturnLeftIcon,
  CurrencyDollarIcon,
  PhoneArrowDownLeftIcon,
  TruckIcon,
} from "@heroicons/react/16/solid";
import { useParams } from "next/navigation";

const items = [
  {
    name: "Free Shipping",
    des: "enjoy free shipping on qualifying orders! Don't miss out on this opportunity.",
    ar_name: "توصيل مجاني",
    ar_des: "استمتع بالشحن المجاني على الطلبات المؤهلة! لا تفوت هذه الفرصة.",
  },
  {
    name: "Secure Payment",
    des: "Your security is our priority. Your payments are secure with us.",
    ar_name: "دفع امن",
    ar_des: "أمانك هو أولويتنا. مدفوعاتك امنة معنا.",
  },
  {
    name: "Satisfaction Guarantee",
    des: "Shop confidently with our Satisfaction Guarantee: Our customer service team is always there for you.",
    ar_name: "ضمان الرضا",
    ar_des:
      "تسوق بثقة مع ضمان الرضا: فريق خدمة العملاء لدينا دائما هنا من أجلك.",
  },
  {
    name: "Replace within 7 Days",
    des: "You may replace our products within 7 business days.",
    ar_name: "استبدال خلال 7 ايام",
    ar_des: "يمكنك استبدال منتجاتنا خلال 7 أيام عمل.",
  },
];

const PreFooter = () => {
  const { lang } = useParams();

  return (
    <div className="mt-6 py-6">
      <div className="wrapper">
        <div className="mini-wrapper">
          <div className="grid grid-cols-12 gap-4">
            {items.map((one, i) => (
              <div
                key={i}
                className="col-span-6 md:col-span-6 lg:col-span-3 flex flex-col space-y-4 p-3 rounded transition-all ease-in duration-700 border border-transparent hover:shadow hover:border-primary"
              >
                {/* icon */}
                <div className="aspect-square flex w-fit p-2 rounded-full bg-primary">
                  {i == 0 ? (
                    <TruckIcon className="size-4 text-white" />
                  ) : i == 1 ? (
                    <CurrencyDollarIcon className="size-4 text-white" />
                  ) : i == 2 ? (
                    <PhoneArrowDownLeftIcon className="size-4 text-white" />
                  ) : (
                    <ArrowPathRoundedSquareIcon className="size-4 text-white" />
                  )}
                </div>
                <h5 className="font-bold text-lg">
                  {lang == "ar" ? one.ar_name : one.name}
                </h5>
                <p className="text-grayee text-xs">
                  {lang == "ar" ? one.ar_des : one.des}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreFooter;
