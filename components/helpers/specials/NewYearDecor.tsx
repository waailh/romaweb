"use client";

import newYearData from "@/public/assets/animations/newyear.json";
import snowData from "@/public/assets/animations/snow.json";
import balloonsData from "@/public/assets/animations/balloons.json";

import Lottie from "lottie-react";

const NewYearDecor = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-highestest">
      <div className="wrapper relative h-full">
        {/* Top-left transparent GIF */}
        <div className="absolute top-[50px] left-[0px] w-24 h-24 pointer-events-none ">
          <Lottie
            animationData={snowData}
            loop={true}
            autoplay={true}
            style={{ width: 520, height: 520 }}
          />
        </div>

        {/* Bottom-right transparent GIF */}
        <div className="absolute bottom-[8px] right-[10px] w-24 h-24 pointer-events-none">
          <Lottie
            animationData={balloonsData}
            loop={true}
            autoplay={true}
            style={{ width: 120, height: 120 }}
          />
        </div>
      </div>
    </div>
  );
};

export default NewYearDecor;
