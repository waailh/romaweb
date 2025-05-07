import React from "react";
import SubtotalLoader from "./SubtotalLoader";

const CartItemsLoader = () => {
  return (
    <div className="w-full flex flex-col space-y-2 ">
      <ProductLoader />
      <ProductLoader />
      <SubtotalLoader />
    </div>
  );
};

export default CartItemsLoader;

const ProductLoader = () => {
  return (
    <div className="w-full">
      <div className="w-full min-h-40 md:min-h-48 border border-gray-300 shadow rounded-md p-4">
        <div className="animate-pulse flex space-s-4 justify-between">
          <div className="bg-gray-300 h-40 w-40"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-gray-300 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-gray-300 rounded col-span-2"></div>
                <div className="h-2 bg-gray-300 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-gray-300 rounded"></div>
              <div className="mt-2 h-2 bg-gray-300 rounded"></div>
              <div className="mt-2 h-2 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
