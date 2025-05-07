"use client";

import { useFilters } from "@/store/products/filters";

const UsageFilter = () => {
  const usages = ["Daily", "Monthly", "3 Months", "6 Months", "Yearly"];

  const { filter, setFilter } = useFilters();

  return (
    <div>
      <div className="flex items-center space-s-2 overflow-x-scroll hide-scrollbar p-1">
        {usages.map((one, i) => (
          <button
            key={i}
            onClick={
              filter.usages.includes(one)
                ? () => setFilter("remove_usage", one)
                : () => setFilter("add_usage", one)
            }
            className={`shrink-0 px-2 py-1 border rounded ${
              filter.usages.includes(one) ? "ring ring-[1px] ring-primary" : ""
            }`}
          >
            <p>{one}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UsageFilter;
