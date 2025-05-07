"use client";

import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";

const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: mapsKey!,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");
      const position = { lat: 25.2048, lng: 55.2708 }; // dubai position

      //   map options
      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 12,
        mapId: "MY_MAP",
      };

      // setup map
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
    };
    initMap();
    return () => {};
  }, []);
  return (
    <div className="max-w-[600px] mt-4 ">
      <div style={{ height: "400px" }} ref={mapRef} className="" />
    </div>
  );
};

export default Map;
