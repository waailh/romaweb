import InnerDeletingAccount from "@/components/account/InnerDeletingAccount";
import { Metadata } from "next";

interface MetaProps {
  params: { lang: string };
}

export async function generateMetadata({
  params: { lang },
}: MetaProps): Promise<Metadata> {
  const ar_title = "حذف الحساب";
  const en_title = "Deleting Account";

  const title = lang == "ar" ? ar_title : en_title;

  return {
    title,
    robots: {
      index: false,
    },
  };
}

const FlashDealsPage = () => {
  return <InnerDeletingAccount />;
};

export default FlashDealsPage;
