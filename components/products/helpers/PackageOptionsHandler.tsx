"use client";

import { useEffect } from "react";
import MyImage from "@/components/ui/MyImage";
import { useProducts } from "@/store/products/products";
import { PackageOption, PackageOptionChoice } from "@/typings";
import { useCartsStore } from "@/store/products/carts";

interface Props {
  mini: boolean;
  options: PackageOption[];
}

const PackageOptionsHandler = ({ mini, options }: Props) => {
  const { setActiveMedia } = useProducts();
  const { selectedPackageOptions, setSelectedPackageOption } = useCartsStore();

  // Initialize selection on mount
  useEffect(() => {
    options.forEach((opt) => {
      if (opt.option_choices.length > 0) {
        const choiceTitle = opt.option_choices[0].title;
        setSelectedPackageOption(opt.option_name, choiceTitle);
      }
    });
  }, []);

  const handleClick = (optName: string, ch: PackageOptionChoice) => {
    setSelectedPackageOption(optName, ch.title);
    if (ch.file) setActiveMedia(mini ? "modal" : "main", ch.file);
  };

  return (
    <div className="flex flex-col space-y-2 text-sm">
      {options.map((opt, i) => (
        <div key={i}>
          <h6 className="mb-1">
            {opt.option_name}: {selectedPackageOptions[opt.option_name]}
          </h6>
          <div className="w-full flex items-center space-s-1 overflow-x-scroll hide-scrollbar">
            {opt.option_choices.map((ch, j) => {
              const selectedVal = selectedPackageOptions[opt.option_name];
              const isSelected = selectedVal === ch.title;

              return (
                <div
                  key={j}
                  className="cursor-pointer"
                  onClick={() => handleClick(opt.option_name, ch)}
                >
                  {ch.color ? (
                    <div
                      className={`size-8 md:size-10 relative rounded-full p-[2px] ${
                        isSelected ? "border border-primary" : ""
                      }`}
                    >
                      <div
                        style={{ background: ch.color }}
                        className="w-full h-full rounded-full relative"
                      >
                        <MyImage src="/assets/icons/eye/eye.webp" fill />
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`py-0 px-2 border rounded ${
                        isSelected ? "border !border-primary" : ""
                      }`}
                    >
                      {ch.title}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PackageOptionsHandler;
