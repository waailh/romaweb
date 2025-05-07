import Shop from "@/components/categories/Shop";
import { fetchCatData } from "@/lib/server/fetchCats";
import {
  fetchCatProducts,
  fetchShopProducts,
} from "@/lib/server/fetchProducts";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL!;
const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

interface MetaProps {
  params: { lang: string; cat: string };
}

export async function generateMetadata({
  params: { lang, cat },
}: MetaProps): Promise<Metadata> {
  let title = "";
  let description = "";

  if (cat == "all") {
    const en_title = "Shop on Roma Opticals";
    const ar_title = "تسوق على متجر روما";

    const en_description =
      "Get the best types of Clear & colored contact lenses, makeup, and eyelashes easily and at the best prices through the Roma Optical website and app.";
    const ar_description =
      "احصل على أفضل انواع العدسات اللاصقة الطبية والتجميلية، الميكاج، والرموش بسهولة وبأفضل الأسعار عبر موقع وتطبيق روما أوبتكال.";

    title = lang == "ar" ? ar_title : en_title;
    description = lang == "ar" ? ar_description : en_description;
  } else {
    const res = await fetch(`${backendHost}/seo/category?slug=${cat}`);
    if (res.status == 404) return notFound();

    if (res.ok) {
      const data = await res.json();
      const meta = data.meta;

      title = lang == "ar" ? meta?.ar_title : meta?.title;
      description = lang == "ar" ? meta?.ar_description : meta?.description;
    }
  }

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
      canonical: `${appUrl}/${lang}/category/${cat}`,
      languages: {
        "x-default": `${appUrl}/en/category/${cat}`,
        en: `${appUrl}/en/category/${cat}`,
        ar: `${appUrl}/ar/category/${cat}`,
      },
    },
  };
}

interface Props {
  params: {
    lang: string;
    cat: string;
  };
}

const ShopPage = async ({ params: { lang, cat } }: Props) => {
  let data;
  let fProdsRes;

  if (cat !== "all") {
    data = await fetchCatData(cat);
    fProdsRes = await fetchCatProducts(cat);
  } else {
    fProdsRes = await fetchShopProducts();
  }

  return <Shop data={data} path={data?.path!} firstProds={fProdsRes} />;
};

export default ShopPage;
