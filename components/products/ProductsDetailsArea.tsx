"use client";

import { useProductTabs } from "@/store/products/details";
import { useParams } from "next/navigation";
import ProductReviews from "./ProductReviews";
import ProductDescription from "./ProductDescription";

interface Props {
  des: { ar: string; en: string };
  id: number;
}

const ProductsDetailsArea = ({ des, id }: Props) => {
  const { tab } = useProductTabs();
  const { lang } = useParams();
  return (
    <div>
      {tab === "des" ? (
        <ProductDescription des={des} />
      ) : tab === "revs" ? (
        <>
          <ProductReviews id={id} />
        </>
      ) : (
        <>
          <div className="p-2">
            <p>Details</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsDetailsArea;
