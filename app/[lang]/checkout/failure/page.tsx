import InnerFailurePage from "@/components/static-pages/InnerFailurePage";
import { Metadata } from "next";

interface MetaProps {
  params: { lang: string };
}

export async function generateMetadata({
  params: { lang },
}: MetaProps): Promise<Metadata> {
  const ar_title = "فشل الطلب";
  const en_title = "Checkout Failure";

  const title = lang == "ar" ? ar_title : en_title;

  return {
    title,
    robots: {
      index: false,
    },
  };
}

const FailurePage = () => {
  return <InnerFailurePage />;
};

export default FailurePage;
