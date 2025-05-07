import { useGlobals } from "@/store/global/globals";
import { useState, useEffect, useRef } from "react";

interface DropdownProps {
  button: React.ReactNode;
  area: React.ReactNode;

  trigger?: boolean;
}

const ButtonWithDropdown: React.FC<DropdownProps> = ({
  button,
  area,
  trigger,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobileLayout } = useGlobals();

  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (trigger) setIsOpen(!isOpen);
  }, [trigger]);

  return (
    <div className="relative inline-block bg">
      <div onClick={() => handleButtonClick()} className="cursor-pointer">
        {button}
      </div>

      {isOpen && (
        <div
          className={`absolute z-layer-4 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
            isMobileLayout ? "left-[-70%] bottom-12" : ""
          }`}
          style={{ animation: "fadeIn 0.2s ease-out" }}
        >
          {area}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ButtonWithDropdown;
