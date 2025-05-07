import InnerOurBranches from "@/components/static-pages/InnerOurBranches";
import { get_branches } from "@/lib/fetcher";

const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

interface MetaProps {
  params: { lang: string };
}

export async function generateMetadata({ params: { lang } }: MetaProps) {
  const en_title = "Roma Optical Stores";
  const ar_title = "محلات روما اوبتكال";

  const en_description =
    "Roma Optical offers its services through 8 branches spread across the UAE, making it easier for consumers to access contact lenses, eyelashes, and cosmetics with ease.";
  const ar_description =
    "تقدم روما أوبتكال خدماتها عبر 8 فروع منتشرة في جميع أنحاء الامارات، لتسهيل وصول المستهلكين إلى العدسات اللاصقة، الرموش، ومستحضرات التجميل بكل سهولة.";

  const title = lang == "ar" ? ar_title : en_title;
  const description = lang == "ar" ? ar_description : en_description;

  return {
    title,
    description,
    robots: {
      index: true,
      nocache: true,
      googleBot: {
        index: true,
      },
    },
    alternates: {
      canonical: `${appUrl}/${lang}/our-branches`,
      languages: {
        "x-default": `${appUrl}/en/our-branches`,
        en: `${appUrl}/en/our-branches`,
        ar: `${appUrl}/ar/our-branches`,
      },
    },
  };
}

const OurBranchesPage = async () => {
  // featured
  const res = await get_branches();

  // console.log(res);

  if (!res.success) return;

  return (
    <div>
      <InnerOurBranches branches={res.branches!} />
    </div>
  );
};

export default OurBranchesPage;
