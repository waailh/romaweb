"use client";

import movingHeartData from "@/public/assets/animations/moving-heart.json";
import explodeData from "@/public/assets/animations/explode.json";

import Lottie from "lottie-react";
import { useState } from "react";

const ValentineDecor = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="pointer-events-none fixed inset-0 z-highestest">
      <div className="wrapper relative h-full">
        {/* Top-left transparent GIF */}
        {/* <div className="absolute top-[50px] left-[0px] w-24 h-24 pointer-events-none ">
          <Lottie
            animationData={balloonsData}
            loop={true}
            autoplay={true}
            style={{ width: 520, height: 520 }}
          />
        </div> */}

        {/* middle */}
        {isVisible && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-[200px] pointer-events-none">
            <Lottie
              animationData={explodeData}
              loop={false}
              autoplay={true}
              style={{ width: 200, height: 200 }}
              onComplete={() => setIsVisible(false)} // Remove animation when it ends
            />
          </div>
        )}

        {/* Bottom-right transparent GIF */}
        <div className="absolute bottom-[50px] left-[2px] w-24 h-24 pointer-events-none">
          <Lottie
            animationData={movingHeartData}
            loop={true}
            autoplay={true}
            style={{ width: 120, height: 130 }}
          />
        </div>
      </div>
    </div>
  );
};

export default ValentineDecor;
