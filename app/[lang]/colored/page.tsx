import InnerColorCategories from "@/components/categories/InnerColorCategories";
import { getFetchOptions } from "@/lib/utils";
import { Metadata } from "next";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL!;

interface MetaProps {
  params: { lang: string };
}

export async function generateMetadata({
  params: { lang },
}: MetaProps): Promise<Metadata> {
  const ar_title = "الماركات";
  const en_title = "Brands";

  const title = lang == "ar" ? ar_title : en_title;

  return {
    title,
    robots: {
      index: false,
    },
  };
}

const getData = async () => {
  const fetchOptions = getFetchOptions();

  const res = await fetch(`${backendHost}/sub-categories/108`, fetchOptions);
  const data = await res.json();

  // console.log("as brands data: ", data);

  return data?.data || [];
};

const CategoriesAsBrandsPage = async () => {
  const data = await getData();

  return (
    <div>
      <InnerColorCategories cats={data} />
    </div>
  );
};

export default CategoriesAsBrandsPage;
