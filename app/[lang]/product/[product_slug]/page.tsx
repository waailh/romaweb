import InnerProduct from "@/components/products/InnerProduct";
import RelatedProducts from "@/components/products/RelatedProducts";
import {
  fetchProductDetails,
  fetchRelatedProducts,
} from "@/lib/server/fetchProducts";
import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL!;
const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

interface MetaProps {
  params: { lang: string; product_slug: string };
  searchParams: { force: boolean };
}

export async function generateMetadata({
  params: { lang, product_slug },
  searchParams: { force },
}: MetaProps): Promise<Metadata> {
  let title = "";
  let description = "";
  let keywords = "";

  const res = await fetch(
    `${backendHost}/seo/product?slug=${product_slug}&force=${force}`
  );
  if (res.status == 404) return notFound();

  if (res.ok) {
    const data = await res.json();
    const meta = data.meta;

    title = lang == "ar" ? meta.ar_title : meta.title;
    description = lang == "ar" ? meta.ar_description : meta.description;
    keywords = lang == "ar" ? meta.ar_keywords || meta.keywords : meta.keywords;
  }

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
      canonical: `${appUrl}/${lang}/product/${product_slug}`,
      languages: {
        "x-default": `${appUrl}/en/product/${product_slug}`,
        en: `${appUrl}/en/product/${product_slug}`,
        ar: `${appUrl}/ar/product/${product_slug}`,
      },
    },
  };
}

interface Props {
  params: { lang: string; product_slug: string };
}

const ProductDetailsPage = async ({
  params: { lang, product_slug },
}: Props) => {
  // unstable_setRequestLocale(lang); // needed to make it work

  const pdata = await fetchProductDetails(product_slug);
  const related = await fetchRelatedProducts(product_slug);

  // console.log(data_prods);

  return (
    <div className="w-full">
      <InnerProduct product={pdata.data[0]} />
      <RelatedProducts prods={related} />
    </div>
  );
};

export default ProductDetailsPage;

// export async function generateStaticParams() {
//   return [{ lang: "en", product_slug: "diva-lenses-cedar" }];
// }
