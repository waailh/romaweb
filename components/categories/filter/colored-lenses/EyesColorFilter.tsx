"use client";

import Loading from "@/components/ui/loaders/Loading";
import MyImage from "@/components/ui/MyImage";
import { useColors } from "@/store/global/colors";
import { useFilters } from "@/store/products/filters";

const EyesColorFilter = () => {
  const { allColors } = useColors();
  const { filter, setFilter } = useFilters();

  const needed = ["GRAY", "HAZEL", "BROWN", "BLUE", "GREEN", "CRAZY"];

  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {allColors ? (
        <div className="w-full grid grid-cols-12 gap-2">
          {allColors
            .filter((one) => needed.includes(one.name))
            .map((one, i) => (
              <div
                key={i}
                onClick={
                  filter.colors.includes(one.code!)
                    ? () => setFilter("remove_color", one.code!)
                    : () => setFilter("add_color", one.code!)
                }
                className={`col-span-4 flex flex-col items-center justify-center space-y-1  py-1 rounded-full`}
              >
                <div
                  className={`relative size-12 border-2 border-transparent rounded-full ${
                    filter.colors.includes(one.code!) ? "!border-primary" : ""
                  }`}
                >
                  <MyImage
                    src={
                      one.icon ||
                      "https://www.lens.me/media//amasty/shopby/option_images/slider/S-CF-blue.png"
                    }
                    className="mx-auto rounded-full object-center"
                    fill
                  />
                </div>
                <p className="text-xs ">{one.name}</p>
              </div>
            ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default EyesColorFilter;
