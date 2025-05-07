import axios from "axios";
import { MetadataRoute } from "next";

type Frequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL!;
const base = process.env.NEXT_PUBLIC_APP_URL!;
const langOptions = ["en", "ar"]; // Both languages

type SitemapItem = {
  url: string;
  lastModified: string | Date;
  alternates: {
    languages: {
      en: string;
      ar: string;
    };
  };
  priority: number;
  changeFrequency: Frequency;
};

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const getAllCats = async () => {
    const res = await axios.get(`${backendHost}/seo/alls?type=categories`);
    let data = res.data.data;

    return data.flatMap((one: string) =>
      langOptions.map((lang) => ({
        url: `${base}/${lang}/category/${one}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${base}/en/category/${one}`,
            ar: `${base}/ar/category/${one}`,
          },
        },
        changeFrequency: "monthly",
        priority: 1,
      }))
    );
  };

  const getAllProducts = async () => {
    const res = await axios.get(`${backendHost}/seo/alls?type=products`);
    let data = res.data.data;

    return data.flatMap((one: string) =>
      langOptions.map((lang) => ({
        url: `${base}/${lang}/product/${one}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${base}/en/product/${one}`,
            ar: `${base}/ar/product/${one}`,
          },
        },
        changeFrequency: "weekly",
        priority: 0.9,
      }))
    );
  };

  const getAllArticles = async () => {
    const res = await axios.get(`${backendHost}/seo/alls?type=articles`);
    let data = res.data.data;

    return data.flatMap((one: string) =>
      langOptions.map((lang) => ({
        url: `${base}/${lang}/blog/${one}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${base}/en/blog/${one}`,
            ar: `${base}/ar/blog/${one}`,
          },
        },
        changeFrequency: "monthly",
        priority: 1,
      }))
    );
  };

  const createSitemapItem = (
    slug: string,
    path: string,
    frequency: Frequency,
    priority: number
  ) => {
    return langOptions.map((lang) => ({
      url: `${base}/${lang}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${base}/en${path}`,
          ar: `${base}/ar${path}`,
        },
      },
      changeFrequency: frequency,
      priority: priority,
    }));
  };

  let home: SitemapItem[] = createSitemapItem("", "", "yearly", 1); // main page
  let offers: SitemapItem[] = createSitemapItem(
    "offers",
    "/offers",
    "weekly",
    0.9
  );
  let about: SitemapItem[] = createSitemapItem(
    "about-us",
    "/about-us",
    "yearly",
    0.7
  );
  let faq: SitemapItem[] = createSitemapItem("faq", "/faq", "yearly", 1);
  let ret: SitemapItem[] = createSitemapItem(
    "return-policy",
    "/return-policy",
    "yearly",
    0.7
  );
  let terms: SitemapItem[] = createSitemapItem(
    "terms",
    "/terms",
    "yearly",
    0.7
  );
  let privacy: SitemapItem[] = createSitemapItem(
    "privacy-policy",
    "/privacy-policy",
    "yearly",
    0.7
  );
  let stores: SitemapItem[] = createSitemapItem(
    "our-branches",
    "/our-branches",
    "yearly",
    0.9
  );
  let shop: SitemapItem[] = createSitemapItem(
    "category/all",
    "/category/all",
    "yearly",
    1
  );
  let blog: SitemapItem[] = createSitemapItem("blog", "/blog", "yearly", 1);

  let allCats: SitemapItem[] = await getAllCats();
  let allArticles: SitemapItem[] = await getAllArticles();
  let allProducts: SitemapItem[] = await getAllProducts();

  return [
    ...home,
    ...offers,
    ...about,
    ...faq,
    ...ret,
    ...terms,
    ...privacy,
    ...stores,
    ...shop,
    ...allCats,
    ...blog,
    ...allArticles,
    ...allProducts,
  ];
}
