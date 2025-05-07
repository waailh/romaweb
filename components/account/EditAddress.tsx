"use client";

import { useState } from "react";
import AddAddressMap from "../maps/AddAddressMap";
import EditAddressMap from "../maps/EditAddressMap";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useAddresses } from "@/store/account/addresses";

const EditAddress = () => {
  const initialLoc = { lat: 25.2048, lng: 55.2708 }; // dubai position

  const [loc, setLoc] = useState(initialLoc);

  const { setAddressesState } = useAddresses();

  return (
    <div>
      <div className="mt-0 flex justify-between items-center space-s-2">
        <h5>Add A new Address</h5>
        <button
          onClick={() => setAddressesState("view")}
          className="mt-4 bg-black flex items-center space-s-2 rounded text-white px-2 py-1 text-xs"
        >
          <ArrowLeftIcon className="size-3" />
          <span>Back</span>
        </button>
      </div>
      <form action="" className="w-full flex flex-col space-y-2 text-sm">
        <div className="flex flex-col space-y-2">
          <label className="">Address Title</label>
          <input
            type="text"
            className="w-full outline-none px-2 py-1 border rounded"
            placeholder="Home/ Office..."
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="">Address Line 1</label>
          <input
            type="text"
            className="w-full outline-none px-2 py-1 border rounded"
            placeholder="Home/ Office..."
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="">Address Line 2</label>
          <input
            type="text"
            className="w-full outline-none px-2 py-1 border rounded"
            placeholder="Home/ Office..."
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Pin Your Location on the Map</label>
          <AddAddressMap setLoc={setLoc} />
          {/* <EditAddressMap setLoc={setLoc} /> */}
        </div>

        <button className="px-3 py-2 rounded bg-primary text-white">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditAddress;
