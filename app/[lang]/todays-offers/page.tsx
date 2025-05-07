import InnerToadysDeals from "@/components/products/InnerToadysDeals";
import { fetchTodaysDealProducts } from "@/lib/server/fetchProducts";
import { Metadata } from "next";

interface MetaProps {
  params: { lang: string };
}

export async function generateMetadata({
  params: { lang },
}: MetaProps): Promise<Metadata> {
  const ar_title = "عروض اليوم";
  const en_title = "Today's Sale";

  const title = lang == "ar" ? ar_title : en_title;

  return {
    title,
    robots: {
      index: false,
    },
  };
}

const TodaysDealsPage = async () => {
  // todays deals
  const prods = await fetchTodaysDealProducts();

  return (
    <div>
      <InnerToadysDeals prods={prods} />
    </div>
  );
};

export default TodaysDealsPage;
