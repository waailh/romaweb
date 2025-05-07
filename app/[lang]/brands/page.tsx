import AllBrands from "@/components/brands/AllBrands";
import InnerAllBrands from "@/components/brands/InnerAllBrands";
import BreadCrumb from "@/components/helpers/BreadCrumb";
import { axiosPure } from "@/lib/auth/axios/axios";
import { Metadata } from "next";

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

const BrandsPage = async () => {
  const axios = axiosPure();

  const res = await axios.get(`/all-brands`);
  const brands = res.data.data;

  return (
    <div>
      <InnerAllBrands brands={brands} />
    </div>
  );
};

export default BrandsPage;
