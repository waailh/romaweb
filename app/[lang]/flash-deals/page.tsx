import InnerFlashdealsPage from "@/components/offers/InnerFlashdealsPage";
import { fetchFlashdeals } from "@/lib/server/fetchFlashdeals";
import { Metadata } from "next";

interface MetaProps {
  params: { lang: string };
}

export async function generateMetadata({
  params: { lang },
}: MetaProps): Promise<Metadata> {
  const ar_title = "العروض السريعة";
  const en_title = "Flash Deals";

  const title = lang == "ar" ? ar_title : en_title;

  return {
    title,
    robots: {
      index: false,
    },
  };
}

const FlashDealsPage = async () => {
  const deals = await fetchFlashdeals();

  return (
    <div>
      <InnerFlashdealsPage deals={deals} />
    </div>
  );
};

export default FlashDealsPage;
