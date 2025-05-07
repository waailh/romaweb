"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const CheckoutStepsBar = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { id: 1, name: "Cart", icon: <CheckIcon className="h-6 w-6" /> },
    { id: 2, name: "Shipping", icon: <CheckIcon className="h-6 w-6" /> },
    { id: 3, name: "Payment", icon: <CheckIcon className="h-6 w-6" /> },
  ];

  const handleClick = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div>
      <div className="flex justify-center space-x-0 my-8">
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex items-center">
            {/* Rectangle button with triangle-shaped ends */}
            <div
              className={`flex items-center px-6 py-2 cursor-pointer relative 
              ${
                activeStep === step.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-600"
              } 
              ${index === 0 ? "rounded-l-lg" : ""}
              ${index === steps.length - 1 ? "rounded-r-lg" : ""}
              `}
              onClick={() => handleClick(step.id)}
            >
              <span className="font-medium">{step.name}</span>
              {activeStep > step.id && (
                <CheckIcon className="h-6 w-6 ml-2 text-white" />
              )}
            </div>

            {/* Left triangle */}
            {index < steps.length - 1 && (
              <div className="absolute w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-l-[15px] border-l-gray-300 -right-3 z-10" />
            )}

            {/* Right triangle */}
            {activeStep > step.id && index < steps.length - 1 && (
              <div className="absolute w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-l-[15px] border-l-blue-600 -right-3 z-20" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutStepsBar;
