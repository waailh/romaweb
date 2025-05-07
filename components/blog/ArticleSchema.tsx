"use client";

import { BlogArticle } from "@/typings";
import { useParams } from "next/navigation";
import Script from "next/script";

interface Props {
  article: BlogArticle;
}

const ArticleSchema = ({ article }: Props) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

  const { lang } = useParams();
  const pageUrl = `${appUrl}/${lang}/blog/${article.slug}`;

  const articleSchema = {
    "@context": "https://schema.org/",
    "@type": "BlogPosting",
    "@id": pageUrl,
    // mainEntityOfPage: pageUrl,
    headline: lang == "ar" ? article.ar_title : article.title,
    // name: "",
    description: lang == "ar" ? article.ar_description : article.description,
    datePublished: article.date,
    // dateModified: "2019-05-14",
    author: {
      "@type": "Person",
      "@id": "ahmed",
      name: "Ahmed Othman",
      //   url: "https://dataliberate.com/author/richard-wallis/",
      //   image: {
      //     "@type": "ImageObject",
      //     "@id":
      //       "https://secure.gravatar.com/avatar/bbdd78abba6116d6f5bfa2c992de6592?s=96&d=mm&r=g",
      //     url: "https://secure.gravatar.com/avatar/bbdd78abba6116d6f5bfa2c992de6592?s=96&d=mm&r=g",
      //     height: "96",
      //     width: "96",
      //   },
    },
    url: pageUrl,
    image: {
      "@type": "ImageObject",
      "@id": lang == "ar" ? article.ar_banner : article.banner,
      url: lang == "ar" ? article.ar_banner : article.banner,
      //   height: "362",
      //   width: "388",
    },

    // wordCount: "488",
    // keywords: ["Bibframe2Schema.org", "Libraries", "Library of Congress"],
    // aggregateRating: {
    //   "@type": "AggregateRating",
    //   "@id":
    //     "https://dataliberate.com/2019/05/14/library-metadata-evolution-final-mile/#aggregate",
    //   url: "https://dataliberate.com/2019/05/14/library-metadata-evolution-final-mile/",
    //   ratingValue: "2.5",
    //   ratingCount: "2",
    // },

    // isPartOf: {
    //   "@type": "Blog",
    //   "@id": "https://dataliberate.com/blog/",
    //   name: "Data Liberate Blog",
    //   publisher: {
    //     "@type": "Organization",
    //     "@id": "https://dataliberate.com",
    //     name: "Data Liberate",
    //   },
    // },
    // commentCount: "1",
    // comment: [
    //   {
    //     "@type": "Comment",
    //     "@id":
    //       "https://dataliberate.com/2019/05/14/library-metadata-evolution-final-mile/#Comment1",
    //     dateCreated: "2019-06-23 17:31:15",
    //     description:
    //       "I've been looking for a decent metadata scheme for use in a home-brew library system for the past 4 years now. I'm a big user of schema.org. I found this very interesting, especially the part about reconciliation. I assume you're referring to the process of identifying duplicate representations of works. This has also been one of my biggest struggles. I'll still be waiting for schema.org to mature...",
    //     author: {
    //       "@type": "Person",
    //       name: "Jeff",
    //       url: "http://schoenstatt.link",
    //     },
    //   },
    // ],
    // about: [
    //   {
    //     "@type": "Thing",
    //     "@id": "https://dataliberate.com/category/bibframe/",
    //     name: "Bibframe",
    //     sameAs: [
    //       "https://en.wikipedia.org/wiki/BIBFRAME",
    //       "http://www.wikidata.org/entity/Q17050075",
    //     ],
    //   },
    //   "Data Liberate",
    //   {
    //     "@type": "Thing",
    //     "@id": "https://dataliberate.com/category/knowledge-graph/",
    //     name: "Knowledge Graph",
    //     sameAs: [
    //       "https://en.wikipedia.org/wiki/Knowledge_Graph",
    //       "http://www.wikidata.org/entity/Q648625",
    //     ],
    //   },
    //   {
    //     "@type": "Thing",
    //     "@id": "https://dataliberate.com/category/libraries/",
    //     name: "Libraries",
    //     sameAs: [
    //       "https://en.wikipedia.org/wiki/Library",
    //       "http://www.wikidata.org/entity/Q7075",
    //     ],
    //   },
    //   {
    //     "@type": "Thing",
    //     "@id": "https://dataliberate.com/category/schema-org/",
    //     name: "schema.org",
    //     sameAs: [
    //       "https://en.wikipedia.org/wiki/Schema.org",
    //       "http://www.wikidata.org/entity/Q3475322",
    //     ],
    //   },
    //   {
    //     "@type": "Thing",
    //     "@id": "https://dataliberate.com/category/structured-data/",
    //     name: "Structured Data",
    //     sameAs: [
    //       "https://en.wikipedia.org/wiki/Data_model",
    //       "http://www.wikidata.org/entity/Q26813700",
    //     ],
    //   },
    // ],
  };

  return (
    <>
      <Script
        id="article-schema"
        key="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
};

export default ArticleSchema;
