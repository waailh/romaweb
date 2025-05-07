import BreadCrumb from "@/components/helpers/BreadCrumb";
import InnerPrivacy from "@/components/static-pages/InnerPrivacy";
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
  const res = await fetch(`${backendHost}/seo/page?slug=privacy-policy`).then(
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
      canonical: `${appUrl}/${lang}/privacy-policy`,
      languages: {
        "x-default": `${appUrl}/en/privacy-policy`,
        en: `${appUrl}/en/privacy-policy`,
        ar: `${appUrl}/ar/privacy-policy`,
      },
    },
  };
}

interface Props {
  params: { lang: string };
}

const PrivacyPolicy = async ({ params: { lang } }: Props) => {
  const axios = axiosPure();
  const res = await axios.get(`/page/privacy-policy/${lang}`);
  const data = res.data;

  return <InnerPrivacy data={data} />;
};

export default PrivacyPolicy;
