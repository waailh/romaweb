"use client";

import { extractFirstParagraph } from "@/lib/utils";
import { useParams } from "next/navigation";

interface Props {
  des: { ar: string; en: string };
}

const ProductMiniDescription = ({ des: { ar, en } }: Props) => {
  const { lang } = useParams();

  const sanitizedParagraph = extractFirstParagraph(lang == "ar" ? ar : en);

  return (
    <div className="">
      <div
        dangerouslySetInnerHTML={{ __html: sanitizedParagraph }}
        className="line-clamp-2"
      />
    </div>
  );
};

export default ProductMiniDescription;
