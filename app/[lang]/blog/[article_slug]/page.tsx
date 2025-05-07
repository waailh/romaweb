import InnerArticlePage from "@/components/blog/InnerArticlePage";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL!;
const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

interface MetaProps {
  params: { lang: string; article_slug: string };
}

export async function generateMetadata({
  params: { lang, article_slug },
}: MetaProps): Promise<Metadata> {
  let title = "";
  let description = "";
  let keywords = "";

  const res = await fetch(`${backendHost}/seo/article?slug=${article_slug}`);
  if (res.status == 404) return notFound();

  if (res.ok) {
    const data = await res.json();
    const meta = data.meta;

    title = lang == "ar" ? meta.ar_title : meta.title;
    description = lang == "ar" ? meta.ar_description : meta.description;
    keywords = lang == "ar" ? meta.ar_keywords : meta.keywords;
  }

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
      canonical: `${appUrl}/${lang}/blog/${article_slug}`,
      languages: {
        "x-default": `${appUrl}/en/blog/${article_slug}`,
        en: `${appUrl}/en/blog/${article_slug}`,
        ar: `${appUrl}/ar/blog/${article_slug}`,
      },
    },
  };
}

interface Props {
  params: { article_slug: string };
}

const ArticlePage = async ({ params: { article_slug } }: Props) => {
  // blog data
  const res = await fetch(`${backendHost}/blog/article/${article_slug}`, {
    cache: "no-cache",
  });

  const data = await res.json();

  // console.log(data);

  return (
    <div>
      <InnerArticlePage data={data.data} />
    </div>
  );
};

export default ArticlePage;
