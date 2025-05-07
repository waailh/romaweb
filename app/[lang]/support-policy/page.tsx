import InnerSupportPolicy from "@/components/static-pages/InnerSupportPolicy";
import { axiosPure } from "@/lib/auth/axios/axios";
import { Metadata } from "next";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL!;

interface MetaProps {
  params: { lang: string };
}

export async function generateMetadata({
  params: { lang },
}: MetaProps): Promise<Metadata> {
  const ar_title = "سياسة الدعم";
  const en_title = "Support Policy";

  const title = lang == "ar" ? ar_title : en_title;

  return {
    title,
    robots: {
      index: false,
    },
  };
}

interface Props {
  params: { lang: string };
}

const SupportPolicyPage = async ({ params: { lang } }: Props) => {
  const axios = axiosPure();
  const res = await axios.get(`/page/support-policy/${lang}`);
  const data = res.data;

  return <InnerSupportPolicy data={data} />;
};

export default SupportPolicyPage;
