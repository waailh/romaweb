import { useFilters } from "@/store/products/filters";
import { Checkbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

interface Props {
  id?: number;
  values?: string[];
}

const GeneralFilter = ({ values, id }: Props) => {
  const { filter, setDynamicFilter } = useFilters();

  return (
    <div className="flex flex-col space-y-1">
      {values?.map((one, i) => {
        const attfilter = filter.dynamic.find((one) => one.attribute_id == id)!;
        const checked = !attfilter ? false : attfilter.values.includes(one);

        return (
          <div
            key={i}
            onClick={() => setDynamicFilter(id!, one)}
            className="flex items-center space-s-2 mb-1 text-sm"
          >
            <Checkbox
              checked={checked}
              className="group size-6 rounded-md bg-white/10 border p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
            >
              <CheckIcon className="hidden size-4 text-primary group-data-[checked]:block" />
            </Checkbox>
            <span>{one}</span>
          </div>
        );
      })}
    </div>
  );
};

export default GeneralFilter;
