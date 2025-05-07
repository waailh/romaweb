"use client";

import { Brand } from "@/typings";
import { useParams } from "next/navigation";
import Marquee from "react-fast-marquee";
import MyImage from "../ui/MyImage";

interface Props {
  brands: Brand[];
}

const InnerMovingBrands = ({ brands }: Props) => {
  const { lang } = useParams();

  //   console.log(brands);

  return (
    <div className="mt-8 mb-2">
      <Marquee
        delay={4}
        direction={lang == "ar" ? "right" : "left"}
        speed={35}
        play={true}
        className="flex items-center justify-center !w-fit"
      >
        {brands.map((one, i) => (
          <div key={i} className="shrink-0 relative size-32">
            <MyImage src={one.src} className="" fill />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default InnerMovingBrands;
