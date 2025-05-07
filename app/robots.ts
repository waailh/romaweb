import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_APP_URL!;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["Googlebot", "*"],
        allow: ["/en", "/ar"],
        disallow: [
          "/en/account",
          "/ar/account",

          "/en/brands",
          "/ar/brands",

          "/en/cart",
          "/ar/cart",

          "/en/checkout",
          "/ar/checkout",

          "/en/colored*",
          "/ar/colored*",

          "/en/delete_account",
          "/ar/delete_account",

          "/en/flash-deals*",
          "/ar/flash-deals*",

          "/en/share*",
          "/ar/share*",

          "/en/todays-offers",
          "/ar/todays-offers",

          "/en/wishlist",
          "/ar/wishlist",
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
