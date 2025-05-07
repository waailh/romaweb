"use client";

import { motion } from "framer-motion";
import LensesIcon from "@/public/assets/icons/lenses.svg";
import CosmeticsIcon from "@/public/assets/icons/cosmetics.svg";
import { useParams } from "next/navigation";

const colored = {
  title: "Colored Lenses ",
  ar_title: "العدسات الملونة",
  des: "A wide range of natural and bold colors are available, Comfortable design to suit all tastes and occasions, Safe materials for daily and long-term use.",
  ar_des:
    "متوفر مجموعة واسعة من الألوان الطبيعية والجريئة, تصميم مريح يناسب جميع الأذواق والمناسبات, مواد آمنة للاستخدام اليومي والطويل الأمد",
};

const clear = {
  title: "Clear Lenses",
  ar_title: "العدسات الشفافة",
  des: "Optical solutions to improve vision and correct visual defects, Made of high-quality medical materials to ensure comfort and ease of use, Available in multiple prescriptions to meet the needs of all customers.",
  ar_des:
    "حلول بصرية لتحسين الرؤية وتصحيح العيوب البصرية، مصنوعة من مواد طبية عالية الجودة لضمان الراحة وسهولة الاستخدام، متوفرة بعدة وصفات لتلبية احتياجات جميع العملاء.",
};

const cosmetics = {
  title: "Cosmetics",
  ar_title: "المكياج",
  des: "Roma is characterized by a wide range of high-quality products that add a charming and aesthetic touch to every woman. Its products are known for their long-lasting quality and durability, making them a perfect choice for any occasion.",
  ar_des:
    " تتميز روما بتشكيلة واسعة من المنتجات ذات الجودة العالية التي تضفي لمسة ساحرة وجمالية على كل امرأة. كما تتميز بالنعومة والثبات الذي يدوم طويلا، مما يجعلها اختيارا مثاليا لكل مناسبة.",
};

const AboutFocusSection = () => {
  const { lang } = useParams();

  return (
    <div className="flex flex-col md:flex-row md:space-s-[-40px] md:justify-center">
      <div className="relative w-full md:w-72 h-60 md:h-80 bg-white rounded shadow clip-five-sided hover:shadow-xl hover:translate-y-[-10px] duration-500">
        <div className="flex flex-col items-start space-y-4 h-full p-3 md:p-[2.5rem]">
          <LensesIcon />
          <h2 className="my-4 md:my-6">
            {lang == "ar" ? colored.ar_title : colored.title}
          </h2>
          <p className="text-xs">
            {lang == "ar" ? colored.ar_des : colored.des}
          </p>
        </div>
      </div>
      <motion.div
        initial={{ scale: 0.98, y: 0 }}
        animate={{ scale: 1, y: -55 }}
        whileHover={{ scale: 1, y: -45 }}
        exit={{ scale: 0.98, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full md:w-72 h-60 md:h-80 rounded shadow clip-five-sided bg-lemony"
      >
        <div className="flex flex-col items-start space-y-4 h-full p-3 md:p-[2.5rem]">
          <LensesIcon />
          <h3 className="my-4 md:my-6">
            {lang == "ar" ? clear.ar_title : clear.title}
          </h3>
          <p className="text-xs">{lang == "ar" ? clear.ar_des : clear.des}</p>
        </div>
      </motion.div>
      <div className="mt-[-110px] md:mt-0 relative w-full md:w-72 h-60 md:h-80 bg-white rounded shadow clip-five-sided hover:shadow-xl hover:translate-y-[-10px] duration-500">
        <div className="flex flex-col items-start space-y-4 h-full p-3 md:p-[2.5rem]">
          <CosmeticsIcon />
          <h3 className="my-4 md:my-6">
            {lang == "ar" ? cosmetics.ar_title : cosmetics.title}
          </h3>
          <p className="text-xs">
            {lang == "ar" ? cosmetics.ar_des : cosmetics.des}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutFocusSection;
