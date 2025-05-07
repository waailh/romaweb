import InnerTerms from "@/components/static-pages/InnerTerms";
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
  const res = await fetch(`${backendHost}/seo/page?slug=terms`).then((res) =>
    res.json()
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
      canonical: `${appUrl}/${lang}/terms`,
      languages: {
        "x-default": `${appUrl}/en/terms`,
        en: `${appUrl}/en/terms`,
        ar: `${appUrl}/ar/terms`,
      },
    },
  };
}

interface Props {
  params: { lang: string };
}

const TermsPage = async ({ params: { lang } }: Props) => {
  const axios = axiosPure();
  const res = await axios.get(`/page/terms/${lang}`);
  const data = res.data;

  return <InnerTerms data={data} />;
};

export default TermsPage;
