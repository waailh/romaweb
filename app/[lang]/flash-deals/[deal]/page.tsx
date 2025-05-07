import BreadCrumb from "@/components/helpers/BreadCrumb";
import CountDown from "@/components/helpers/CountDown";
import InnerFlashDeal from "@/components/offers/InnerFlashDeal";
import { fetchFlashdealData } from "@/lib/server/fetchFlashdeals";
import { Metadata } from "next";

interface MetaProps {
  params: { lang: string };
}

export async function generateMetadata({
  params: { lang },
}: MetaProps): Promise<Metadata> {
  const ar_title = "عرض سريع";
  const en_title = "Flash Deal";

  const title = lang == "ar" ? ar_title : en_title;

  return {
    title,
    robots: {
      index: false,
    },
  };
}

interface Props {
  params: { deal: string };
}

const FlashDealSinglePage = async ({ params: { deal } }: Props) => {
  // flash deal info
  const data = await fetchFlashdealData(deal);

  return (
    <div>
      <InnerFlashDeal deal={data.info} prods={data.products} />
    </div>
  );
};

export default FlashDealSinglePage;
