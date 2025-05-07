"use client";

import Draggable from "@/components/helpers/Draggable";
import { useFilters } from "@/store/products/filters";

interface Props {
  id?: number;
  values?: string[];
}

const GeneralFilter = ({ id, values }: Props) => {
  const { filter, setDynamicFilter } = useFilters();

  return (
    <div>
      <Draggable>
        <div className="flex items-center space-s-2 ">
          {values?.map((one, i) => {
            const specFilter = filter.dynamic.find(
              (one) => one.attribute_id == id
            )!;
            const isThere = !specFilter
              ? false
              : specFilter.values.includes(one);
            return (
              <button
                key={i}
                onClick={() => setDynamicFilter(id!, one)}
                className={`shrink-0 px-2 py-1 bg-gray-50 border-2 rounded ${
                  isThere ? "bg-white border-primary" : ""
                }`}
              >
                <p>{one}</p>
              </button>
            );
          })}
        </div>
      </Draggable>
    </div>
  );
};

export default GeneralFilter;
