"use client";

import balloonsData from "@/public/assets/animations/balloons.json";
import zeenaData from "@/public/assets/animations/zeena.json";

import Lottie from "lottie-react";

const UaeDayDecor = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-highestest">
      <div className="wrapper relative h-full">
        {/* Top-left transparent GIF */}
        <div className="absolute top-[50px] left-[-50px] w-24 h-24 pointer-events-none ">
          <Lottie
            animationData={zeenaData}
            loop={true}
            autoplay={true}
            style={{ width: 240, height: 240 }}
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

export default UaeDayDecor;
