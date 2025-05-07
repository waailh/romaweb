"use client";

import { useState } from "react";

const RadioButtons = () => {
  const [selectedValue, setSelectedValue] = useState("Without Power");

  return (
    <div className="flex flex-col space-y-2 text-sm">
      {["Without Power", "With Power"].map((option, index) => (
        <label key={index} className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="custom-radio"
            value={option}
            checked={selectedValue === option}
            onChange={() => setSelectedValue(option)}
            className="hidden"
          />
          <div
            className={`size-5 rounded-full border-2 border-gray-300 flex items-center justify-center ${
              selectedValue === option ? "border-primary" : ""
            }`}
          >
            {selectedValue === option && (
              <div className="w-3 h-3 bg-primary rounded-full"></div>
            )}
          </div>
          <span className="ml-2">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioButtons;
