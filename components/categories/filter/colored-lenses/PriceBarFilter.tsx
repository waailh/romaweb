"use client";

import { useFilters } from "@/store/products/filters";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Range } from "react-range";

const PriceBarFilter = () => {
  const t = useTranslations("Filter");

  const {
    filter: { price },
    setFilter,
  } = useFilters();

  const min = 0;
  const max = 1000;

  const [values, setValues] = useState<number[]>([min, max]);

  const handleChange = (vals: number[]) => {
    setFilter("price_min", vals[0]);
    setFilter("price_max", vals[1]);
  };

  return (
    <div dir="ltr" className="">
      <div className="w-full">
        <Range
          values={values}
          step={2}
          min={min}
          max={max}
          onChange={(newValues) => {
            setValues(newValues);
            handleChange(newValues);
          }}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-2 bg-gray-300 rounded-lg"
              style={{
                ...props.style,
                height: "5px",
                background: `linear-gradient(to right, #ddd ${
                  ((values[0] - min) / (max - min)) * 100
                }% , #469292 ${
                  ((values[0] - min) / (max - min)) * 100
                }%, #469292 ${
                  ((values[1] - min) / (max - min)) * 100
                }% , #ddd ${((values[1] - min) / (max - min)) * 100}%)`,
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props, index }) => (
            <div
              {...props}
              className="size-4 bg-white border border-primary shadow focus:outline-none"
              style={{ ...props.style }}
            />
          )}
        />
        <div className="flex justify-between mt-4 text-sm text-gray-700">
          <span>
            {t("min")}: {values[0]}
          </span>
          <span>
            {t("max")}: {values[1]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceBarFilter;
