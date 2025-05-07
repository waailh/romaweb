"use client";

import { FullProduct } from "@/typings";
import { useParams } from "next/navigation";
import Script from "next/script";

interface Props {
  product: FullProduct;
}

const ProductSchema = ({ product }: Props) => {
  const { lang } = useParams();

  const productSchema: any = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: lang == "ar" ? product.ar_name : product.name,
    image: product.thumbnail_image,

    description: lang == "ar" ? product.ar_description : product.description,

    // aggregateRating: {
    //   "@type": "AggregateRating",
    //   ratingValue: product.rating || "0",
    //   reviewCount: product.rating_count || "0",
    // },

    offers: {
      "@type": "Offer",
      availability: "InStock",
      price: product.main_price,
      priceCurrency: "AED",
    },
  };

  return (
    <>
      <Script
        id="product-schema"
        key="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
};

export default ProductSchema;
