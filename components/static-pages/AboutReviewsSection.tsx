import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import StarRating from "../ui/StarRating";

const revs = [
  {
    rating: { rate: 5 },
    comment: "Test review",
    verified: true,
    name: "Ali Omer",
  },
  {
    rating: { rate: 5 },
    comment: "Test review with a little long text",
    verified: true,
    name: "Amal Omer",
  },
  {
    rating: { rate: 4.2 },
    comment: "Test review with a little long text",
    verified: true,
    name: "Rima Omer",
  },
  {
    rating: { rate: 5 },
    comment: "Test review with a little long text",
    verified: true,
    name: "Hassan Omer",
  },
];

const AboutReviewsSection = () => {
  return (
    <div className="py-12">
      <div className="w-full flex flex-col items-center justify-center space-y-4">
        <h2>1,500+ Five Stars Reviews</h2>
        <div className="mt-4 flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-s-4 w-full md:w-fit mx-auto">
          {revs.map((rev, i) => (
            <div
              key={i}
              className="w-full md:w-fit bg-yellowy rounded p-2 md:p-4 flex flex-col space-y-4"
            >
              <StarRating rating={rev.rating} />
              <p className="text-sm">&quot;{rev.comment}&quot;</p>
              <div className="pt-2 border-t flex space-s-4 items-center justify-between">
                <p className="font-bold">{rev.name}</p>
                <div className="flex items-center space-s-1 text-green-600">
                  <CheckBadgeIcon className="size-4" />
                  <span className="text-xs">Verified Purchase</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutReviewsSection;
