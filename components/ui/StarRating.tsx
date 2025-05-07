// components/StarRating.tsx

import { FunctionComponent } from "react";
import { StarIcon as SolidStarIcon } from "@heroicons/react/16/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

interface StarRatingProps {
  rating: { rate: number; total?: number };
}

const StarRating: FunctionComponent<StarRatingProps> = ({
  rating: { rate, total },
}) => {
  const t = useTranslations("Product");

  const roundedRate = Math.round(rate);
  const fullStars = Math.floor(roundedRate);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex items-center space-s-2">
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <SolidStarIcon key={index} className="size-3 text-yellow-500" />
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <OutlineStarIcon key={index} className="size-3 text-gray-300" />
        ))}
      </div>
      {total && total != 0 ? (
        <div className="text-xs">
          <div className="flex items-center space-s-1">
            ({rate}) /{total} {t("revs")}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default StarRating;
