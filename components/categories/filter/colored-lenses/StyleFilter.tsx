"use client";

import Draggable from "@/components/helpers/Draggable";
import MyImage from "@/components/ui/MyImage";
import { useFilters } from "@/store/products/filters";

interface Props {
  id?: number;
  values?: string[];
}

const StyleFilter = ({ id, values }: Props) => {
  const styles = [
    {
      icon: "",
      name: "With Ring",
    },
    {
      icon: "/assets/images/ring/noring.webp",
      name: "No Ring",
    },
  ];

  const names = ["Circle", "No Circle"];

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
                className={`shrink-0 px-2 py-1 bg-gray-50 border-2 rounded flex items-center space-s-2 ${
                  isThere ? "bg-white border-primary" : ""
                }`}
              >
                <div className="relative size-7">
                  <MyImage
                    src={`/assets/images/ring/${
                      one == "with-ring" ? "ring" : "noring"
                    }.webp`}
                    className="mx-auto object-center"
                    fill
                  />
                </div>
                <p>{names[i]}</p>
              </button>
            );
          })}
        </div>
      </Draggable>
    </div>
  );
};

export default StyleFilter;
