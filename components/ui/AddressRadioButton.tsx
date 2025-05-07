"use client";

import { useState } from "react";

interface Props {
  active: boolean;
  id: number;
  setActive?: (data: boolean) => void;
  setDefault: (data: number) => void;
}

const AddressRadioButton = ({ active, id, setDefault }: Props) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="radio"
        name="custom-radio"
        value=""
        checked={active}
        onChange={() => setDefault(id)}
        className="hidden"
      />
      <div
        className={`size-4 rounded-full border-2 border-gray-300 flex items-center justify-center ${
          active ? "border-primary" : ""
        }`}
      >
        {active && <div className="size-2 bg-primary rounded-full"></div>}
      </div>
    </label>
  );
};

export default AddressRadioButton;
