"use client";

import Draggable from "@/components/helpers/Draggable";
import { useFilters } from "@/store/products/filters";
import { Brand } from "@/typings";
import { useParams } from "next/navigation";

interface Props {
  brands: Brand[];
}

const BrandFilter = ({ brands }: Props) => {
  const { lang } = useParams();

  const { filter, setFilter } = useFilters();

  return (
    <div>
      <Draggable>
        <div className="flex items-center space-s-2 ">
          {brands.map((one, i) => (
            <button
              key={i}
              onClick={
                filter.brands.includes(one.id)
                  ? () => setFilter("remove_brand", one.id)
                  : () => setFilter("add_brand", one.id)
              }
              className={`shrink-0 px-2 py-1 bg-gray-50 border-2 rounded ${
                filter.brands.includes(one.id) ? "bg-white border-primary" : ""
              }`}
            >
              <p>{lang == "ar" ? one.ar_name : one.name}</p>
            </button>
          ))}
        </div>
      </Draggable>
    </div>
  );
};

export default BrandFilter;
