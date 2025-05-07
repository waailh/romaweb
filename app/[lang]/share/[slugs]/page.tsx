import InnerSharingProducts from "@/components/products/InnerSharingProducts";
import InnerToadysDeals from "@/components/products/InnerToadysDeals";
import { axiosPure } from "@/lib/auth/axios/axios";
import { Metadata } from "next";

interface MetaProps {
  params: { lang: string };
}

export async function generateMetadata({
  params: { lang },
}: MetaProps): Promise<Metadata> {
  const ar_title = "مشاركة";
  const en_title = "Sharing Products";

  const title = lang == "ar" ? ar_title : en_title;

  return {
    title,
    robots: {
      index: false,
    },
  };
}

interface Props {
  params: { slugs: string };
}

const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL!;

const ShareProductsPage = async ({ params: { slugs } }: Props) => {
  const axios = axiosPure();

  const productsSlugs = decodeURIComponent(slugs).split("&");

  console.log(productsSlugs);

  // products
  const res = await axios.post(`${backendHost}/products/group/fetch`, {
    products: productsSlugs,
  });

  const prods = res.data.data;

  return (
    <>
      <InnerSharingProducts prods={prods} />
    </>
  );
};

export default ShareProductsPage;
