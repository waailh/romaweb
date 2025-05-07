import Categories from "@/components/categories/Categories";
import CategoriesCoverBanners from "@/components/categories/CategoriesCoverBanners";
import ColorLensesCategories from "@/components/categories/ColorLensesCategories";
import MiniFAQ from "@/components/faq/MiniFAQ";
import Hero from "@/components/global/Hero";
import Divider from "@/components/helpers/Divider";
import OfferArea from "@/components/offers/OfferArea";
import BestSellingProducts from "@/components/products/BestSellingProducts";
import ByColor from "@/components/products/ByColor";
import FeaturedProducts from "@/components/products/FeaturedProducts";
import LatestProducts from "@/components/products/LatestProducts";
import DoubleBanners from "@/components/static-pages/DoubleBanners";
// import { useFetchCart } from "../hooks/useFetchCart";
import { Metadata } from "next";
import AffiliateBanner from "@/components/offers/AffiliateBanner";
import SpecialDealSection from "@/components/special/SpecialDealSection";
import { unstable_setRequestLocale } from "next-intl/server";
import { fetchProductsLists } from "@/lib/server/fetchProducts";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL!;
const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

// export async function generateStaticParams() {
//   return [{ lang: "en" }, { lang: "ar" }]; // Define valid paths for static generation
// }

interface MetaProps {
  params: { lang: string };
}

export async function generateMetadata({
  params: { lang },
}: MetaProps): Promise<Metadata> {
  const res = await fetch(`${backendHost}/seo/home`).then((res) => res.json());
  const meta = res.meta;

  const title = lang == "ar" ? meta.meta_ar_title : meta.meta_title;
  const description =
    lang == "ar" ? meta.meta_ar_description : meta.meta_description;
  const keywords = lang == "ar" ? meta.meta_ar_keywords : meta.meta_keywords;

  return {
    title,
    description,
    keywords,
    robots: {
      index: true,
      nocache: true,
      googleBot: {
        index: true,
      },
    },
    alternates: {
      canonical: `${appUrl}/${lang}`,
      languages: {
        "x-default": `${appUrl}/en`,
        en: `${appUrl}/en`,
        ar: `${appUrl}/ar`,
      },
    },
  };
}

interface Props {
  params: { lang: string };
}

export default async function Home({ params: { lang } }: Props) {
  // unstable_setRequestLocale(lang); // needed to make it work

  const productsLists = await fetchProductsLists();

  return (
    <main className="w-full overflow-x-hiddenn relative">
      <Hero />
      <ColorLensesCategories />
      {/* <Brands /> */}
      <BestSellingProducts prods={productsLists.bestSellers} />

      <Categories />
      <div className="md:hidden">
        <Divider />
      </div>

      <SpecialDealSection />
      <FeaturedProducts prods={productsLists.featured} />

      <ByColor />
      <OfferArea />
      <AffiliateBanner />
      <DoubleBanners />

      {/* <CategoriesCoverBanners /> */}
      <LatestProducts prods={productsLists.latest} />

      {/* <BrandsMoving /> */}

      <MiniFAQ />
    </main>
  );
}
