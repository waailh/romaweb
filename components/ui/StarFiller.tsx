import { useState } from "react";
import { StarIcon as SolidStarIcon } from "@heroicons/react/16/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";

interface Props {
  setRate: (rate: number) => void;
}

const StarFiller: React.FC<Props> = ({ setRate }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number>(0);

  const handleMouseEnter = (index: number) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const handleClick = (index: number) => {
    setSelected(index);
    setRate(index);
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => {
      return (
        <button
          key={star}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(star)}
          className="outline-none"
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
        >
          {hovered !== null ? (
            star <= hovered ? (
              <SolidStarIcon className="size-4 md:size-5 text-yellow-500" />
            ) : (
              <OutlineStarIcon className="size-4 md:size-5 text-gray-400" />
            )
          ) : selected >= star ? (
            <SolidStarIcon className="size-4 md:size-5 text-yellow-500" />
          ) : (
            <OutlineStarIcon className="size-4 md:size-5 text-gray-400" />
          )}
        </button>
      );
    });
  };

  return <div className="flex space-s-1">{renderStars()}</div>;
};

export default StarFiller;
