import StarRating from "@/components/ui/StarRating";
import { Checkbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

const RatingFilter = () => {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center space-s-2 mb-1 text-sm">
        <Checkbox
          checked={true}
          //   onChange={setEnabled}
          className="group size-6 rounded-md bg-white/10 border p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
        >
          <CheckIcon className="hidden size-4 text-primary group-data-[checked]:block" />
        </Checkbox>
        <StarRating rating={{ rate: 5 }} />
      </div>
      <div className="flex items-center space-s-2 mb-1 text-sm">
        <Checkbox
          checked={false}
          //   onChange={setEnabled}
          className="group size-6 rounded-md bg-white/10 border p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
        >
          <CheckIcon className="hidden size-4 text-primary group-data-[checked]:block" />
        </Checkbox>
        <StarRating rating={{ rate: 4 }} />
      </div>
      <div className="flex items-center space-s-2 mb-1 text-sm">
        <Checkbox
          checked={true}
          //   onChange={setEnabled}
          className="group size-6 rounded-md bg-white/10 border p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
        >
          <CheckIcon className="hidden size-4 text-primary group-data-[checked]:block" />
        </Checkbox>
        <StarRating rating={{ rate: 3 }} />
      </div>
      <div className="flex items-center space-s-2 mb-1 text-sm">
        <Checkbox
          checked={true}
          //   onChange={setEnabled}
          className="group size-6 rounded-md bg-white/10 border p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
        >
          <CheckIcon className="hidden size-4 text-primary group-data-[checked]:block" />
        </Checkbox>
        <StarRating rating={{ rate: 2 }} />
      </div>
      <div className="flex items-center space-s-2 mb-1 text-sm">
        <Checkbox
          checked={true}
          //   onChange={setEnabled}
          className="group size-6 rounded-md bg-white/10 border p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
        >
          <CheckIcon className="hidden size-4 text-primary group-data-[checked]:block" />
        </Checkbox>
        <StarRating rating={{ rate: 1 }} />
      </div>
    </div>
  );
};

export default RatingFilter;
