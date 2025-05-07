import InnerSpecialDealPage from "@/components/special/InnerSpecialDealPage";
import { fetchSpecialDealProducts } from "@/lib/server/fetchProducts";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL!;

interface MetaProps {
  params: { lang: string };
}

export function generateMetadata({ params: { lang } }: MetaProps) {
  const en_title = "Special Deal Section";
  const ar_title = "قسم العروض الخاصة";

  const title = lang == "ar" ? ar_title : en_title;

  return {
    title,
    // description,
    robots: {
      index: false,
    },
  };
}

const SpecialDealPage = async () => {
  const data = await fetchSpecialDealProducts();

  return (
    <div>
      <InnerSpecialDealPage prods={data} />
    </div>
  );
};

export default SpecialDealPage;
