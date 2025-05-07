import InnerOffers from "@/components/offers/InnerOffers";
import { fetchFlashdeals } from "@/lib/server/fetchFlashdeals";
import { fetchOfferProducts } from "@/lib/server/fetchProducts";
import { Metadata } from "next";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL!;
const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

interface MetaProps {
  params: { lang: string };
}

export async function generateMetadata({ params: { lang } }: MetaProps) {
  const en_title = "Offers";
  const ar_title = "العروض";

  const en_description =
    "Browse the Roma Optical website & app to discover offers and discounts on contact lenses, makeup, and lashes. Shop now to get the best products at great prices!";
  const ar_description =
    "تصفح موقع وتطبيق روما أوبتكال لاكتشاف العروض والتخفيضات على العدسات اللاصقة، المكياج، والرموش. تسوق الآن لتحصل على أفضل المنتجات بأسعار مميزة!";

  const title = lang == "ar" ? ar_title : en_title;
  const description = lang == "ar" ? ar_description : en_description;

  return {
    title,
    description,
    robots: {
      index: true,
      nocache: true,
      googleBot: {
        index: true,
      },
    },
    alternates: {
      canonical: `${appUrl}/${lang}/offers`,
      languages: {
        "x-default": `${appUrl}/en/offers`,
        en: `${appUrl}/en/offers`,
        ar: `${appUrl}/ar/offers`,
      },
    },
  };
}

const OffersPage = async () => {
  // offers
  const offerProds = await fetchOfferProducts();
  const deals = await fetchFlashdeals();

  return (
    <div>
      <InnerOffers prods={offerProds} deals={deals} />
    </div>
  );
};

export default OffersPage;
