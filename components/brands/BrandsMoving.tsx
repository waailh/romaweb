import { axiosPure } from "@/lib/auth/axios/axios";
import React from "react";
import InnerMovingBrands from "./InnerMovingBrands";

const BrandsMoving = async () => {
  const axios = axiosPure();

  const res = await axios.get(`/brands`);
  const brands = res.data.data;

  return (
    <div className="">
      <div className="wrapper">
        <div className="max-w-full">
          <InnerMovingBrands brands={brands} />
        </div>
      </div>
    </div>
  );
};

export default BrandsMoving;
