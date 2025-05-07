import Loading from "@/components/ui/loaders/Loading";
import { useColors } from "@/store/global/colors";
import { useFilters } from "@/store/products/filters";

const ColorFilter = () => {
  const { allColors } = useColors();
  const { filter, setFilter } = useFilters();

  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {allColors ? (
        <>
          {allColors.map((one, i) => (
            <div key={i} className="">
              <button
                onClick={
                  filter.colors.includes(one.code!)
                    ? () => setFilter("remove_color", one.code!)
                    : () => setFilter("add_color", one.code!)
                }
                style={{ background: one.code }}
                className={`bg-black  size-5 md:size-6 border border-white ${
                  filter.colors.includes(one.code!)
                    ? "ring ring-[1px] ring-primary"
                    : ""
                }`}
              />
            </div>
          ))}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ColorFilter;
