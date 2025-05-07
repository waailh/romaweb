import { Metadata } from "next";
import InnerSuccessPage from "@/components/static-pages/InnerSuccessPage";

interface MetaProps {
  params: { lang: string };
}

export async function generateMetadata({
  params: { lang },
}: MetaProps): Promise<Metadata> {
  const ar_title = "تم الطلب بنجاح";
  const en_title = "Successful Order";

  const title = lang == "ar" ? ar_title : en_title;

  return {
    title,
    robots: {
      index: false,
    },
  };
}

const SuccessfullOrderPage = () => {
  return <InnerSuccessPage />;
};

export default SuccessfullOrderPage;
