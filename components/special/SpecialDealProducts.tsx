"use client";

import { SpecialProduct } from "@/typings";
import SpecialProductCard from "./helpers/SpecialProductCard";

interface Props {
  prods: SpecialProduct[];
}

const SpecialDealProducts = ({ prods }: Props) => {
  return (
    <div className="mt-3 grid grid-cols-12 gap-1">
      {prods.map((sprod, i) => {
        return (
          <div key={i} className="col-span-6 md:col-span-3">
            <SpecialProductCard sprod={sprod} />
          </div>
        );
      })}
    </div>
  );
};

export default SpecialDealProducts;
