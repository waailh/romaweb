import InnerBlog from "@/components/blog/InnerBlog";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL!;
const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

interface MetaProps {
  params: { lang: string };
}

export async function generateMetadata({ params: { lang } }: MetaProps) {
  const en_title = "Roma Optical Blog for Lenses";
  const ar_title = "مدونة روما اوبتكال للعدسات";

  const en_description =
    "For beauty lovers, the Roma Optical blog is your ideal destination for the latest updates on colored and clear contact lenses, as well as the newest makeup and eyelash products.";
  const ar_description =
    "لعشاق الجمال، مدونة روما أوبتكال هي وجهتك المثالية لمستجدات العدسات اللاصقة الملونة والشفافة، إلى جانب أحدث منتجات المكياج والرموش.";

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
      canonical: `${appUrl}/${lang}/blog`,
      languages: {
        "x-default": `${appUrl}/en/blog`,
        en: `${appUrl}/en/blog`,
        ar: `${appUrl}/ar/blog`,
      },
    },
  };
}

const BlogPage = async () => {
  // blog data
  const res = await fetch(`${backendHost}/blog`, {
    cache: "no-cache",
  });

  const data = await res.json();

  // console.log(data);

  return (
    <>
      <InnerBlog data={data} />
    </>
  );
};

export default BlogPage;
