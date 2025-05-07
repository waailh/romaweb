"use client";

import Image from "next/image";
import TestSocial from "../auth/TestSocial";
import { Link } from "@/i18n.config";
import { useGlobals } from "@/store/global/globals";
import { useSettings } from "@/store/global/settings";
import { useEffect } from "react";
import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Ensure this is set in your environment variables

const Test = () => {
  const { lang } = useSettings();
  const { toggleCart } = useGlobals();

  const getData = async () => {
    const request = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json`,
      {
        params: {
          key: apiKey,
          place_id: "ChIJ8UadyjeuEmsRDt5QbiDg720",
          fields: "formatted_address,geometry",
          // "name,formatted_address,geometry,formatted_phone_number,opening_hours",
        },
      }
    );

    console.log("data: ", request);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {/* <img
        src="https://romaopticals-2024.s3.me-central-1.amazonaws.com/uploads/all/SQ8Ow7vafufvDfd191loScpOFDjsjbvnb5guoYJ6.webp"
        alt=""
      />

      <Image
        src="https://romaopticals-2024.s3.me-central-1.amazonaws.com/uploads/all/SQ8Ow7vafufvDfd191loScpOFDjsjbvnb5guoYJ6.webp"
        alt="/"
        height={400}
        width={1200}
        className="object-contain"
      /> */}
      {/* 
      <button
        onClick={toggleCart}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Toggle Cart
      </button> */}

      {/* <TestSocial /> */}
    </div>
  );
};

export default Test;
