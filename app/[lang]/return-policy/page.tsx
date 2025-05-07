import BreadCrumb from "@/components/helpers/BreadCrumb";
import InnerReturnPolicy from "@/components/static-pages/InnerReturnPolicy";
import { axiosPure } from "@/lib/auth/axios/axios";
import { Metadata } from "next";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL!;
const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

interface MetaProps {
  params: { lang: string };
}

export async function generateMetadata({
  params: { lang },
}: MetaProps): Promise<Metadata> {
  const res = await fetch(`${backendHost}/seo/page?slug=return-policy`).then(
    (res) => res.json()
  );
  const meta = res.meta;

  const title = lang == "ar" ? meta.ar_title : meta.title;
  const description = lang == "ar" ? meta.ar_description : meta.description;
  const keywords = lang == "ar" ? meta.ar_keywords : meta.keywords;

  return {
    title,
    description,
    keywords,
    robots: {
      index: true,
      nocache: true,
      googleBot: {
        index: true,
      },
    },
    alternates: {
      canonical: `${appUrl}/${lang}/return-policy`,
      languages: {
        "x-default": `${appUrl}/en/return-policy`,
        en: `${appUrl}/en/return-policy`,
        ar: `${appUrl}/ar/return-policy`,
      },
    },
  };
}

interface Props {
  params: { lang: string };
}

const ReturnPolicyPage = async ({ params: { lang } }: Props) => {
  const axios = axiosPure();
  const res = await axios.get(`/page/return-policy/${lang}`);
  const data = res.data;
  return <InnerReturnPolicy data={data} />;
};

export default ReturnPolicyPage;
