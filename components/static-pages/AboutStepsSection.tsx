"use client";

import WhyIcon from "@/public/assets/icons/ab/why.svg";
import DiscoverIcon from "@/public/assets/icons/ab/plans.svg";
import PlansIcon from "@/public/assets/icons/ab/discover.svg";
import { useParams } from "next/navigation";
// import { useParams } from "next/navigation";

const why = {
  title: "Why Roma Optical?",
  ar_title: "لماذا روما اوبتكال",
  des: "Roma Optical offers a wide range of unique brands and products, including Clear and colored contact lenses, as well as eyelashes and cosmetics. The company prides itself on having a professional team dedicated to customer satisfaction. With branches throughout the country, it makes their products easily accessible to customers.",
  ar_des:
    "تشمل روما اوبتكال مجموعة واسعة من العلامات التجارية والمنتجات الفريدة، مثل العدسات اللاصقة الطبية والملونة، بالإضافة إلى الرموش ومستحضرات التجميل. تفتخر الشركة بفريق محترف لضمان رضا العملاء, مع فروع تمتد عبر البلاد، مما يسهل الوصول الي منتجاتها بكل سهولة",
};

const brands = {
  title: "Discover Brands",
  ar_title: "اكتشف علاماتنا التجارية",
  des: "Discover the latest and most fashionable styles in fashion, beauty, and accessories. Shop from a diverse selection of 3000 products from over 40 premium global brands including Anastasia, Lime Crime, Benefit, Make Up For Ever, Shiseido, The Balm, Huda Beauty, and lens brands such as Brands Diva, Amara, Lens Me, Bella, Freshlook, Dahab, Victoria, Lareen, Core, Afle, and new lens brands, along with clear lenses from leading contact lens brands Accuve and Air Optix,",
  ar_des:
    "اكتشف أحدث وأكثر الأنماط العصرية في الموضة والجمال والإكسسوارات. تسوق من مجموعة متنوعة تضم 3000 منتج من أكثر من 40 علامة تجارية عالمية رائدة بما في ذلك أناستازيا، لايم كريم، بنفت، ميك أب فور ايفر، شيسيدو، ذا بالم، هدى بيوتي، وعلامات تجارية للعدسات مثل براندز ديفا، أمارا، لينس مي، بيلا، فريش لوك، دهب، فيكتوريا، لارين، كور، أفلي، وعلامات تجارية جديدة للعدسات بالإضافة إلى العدسات الشفافة  و من أبرز العلامات  أكيوف و إير أوبتكس",
};

const cosmetics = {
  title: "Cosmetics",
  ar_title: "المكياج",
  des: "Roma is characterized by a wide range of high-quality products that add a charming and aesthetic touch to every woman. Its products are known for their long-lasting quality and durability, making them a perfect choice for any occasion.",
  ar_des:
    "تتميز روما بتشكيلة واسعة من المنتجات ذات الجودة العالية التي تضفي لمسة ساحرة وجمالية على كل امرأة. كما تتميز بالنعومة والثبات الذي يدوم طويلا، مما يجعلها اختيارا مثاليا لكل مناسبة",
};

const AboutStepsSection = () => {
  const { lang } = useParams();

  //   const { lang } = params;
  //   const righ = lang === "ar" ? "-right-2 md:-right-4" : "-left-2 md:-left-4";
  //   const righ_b = lang === "ar" ? "border-r" : "border-l";

  return (
    <div>
      <div className="flex flex-row space-s-4 w-fit mx-auto">
        <div className="flex items-center space-s-4 p-4">
          <div className="h-full flex flex-col space-y-12 md:space-y-4 justify-between items-start max-w-[600px]">
            <div className="w-full">
              <div className="flex space-s-3 ms-[-0.5rem] items-center w-full mb-3">
                <WhyIcon className="scale-[1.4] text-primary" />
                <h2 className="">{lang == "ar" ? why.ar_title : why.title}</h2>
              </div>
              <p className="ps-2 md:ps-4 border-s border-black text-xs md:text-sm">
                {lang == "ar" ? why.ar_des : why.des}
              </p>
            </div>
            <div className="w-full ">
              <div className="mt-4 flex space-s-3 ms-[-0.5rem] items-center w-full mb-3">
                <PlansIcon className="scale-[1.4] text-primary" />
                <h2 className="">
                  {lang == "ar" ? brands.ar_title : brands.title}
                </h2>
              </div>
              <p className="ps-2 md:ps-4 border-s border-black text-xs md:text-sm">
                {lang == "ar" ? brands.ar_des : brands.des}
              </p>
            </div>
            <div className="w-full ">
              <div className="mt-4 flex space-s-3 ms-[-0.5rem] items-center w-full mb-3">
                <DiscoverIcon className="scale-[1.4] text-primary" />
                <h2 className="">
                  {lang == "ar" ? cosmetics.ar_title : cosmetics.title}
                </h2>
              </div>
              <p className="ps-2 md:ps-4 border-s border-black text-xs md:text-sm">
                {lang == "ar" ? cosmetics.ar_des : cosmetics.des}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutStepsSection;
