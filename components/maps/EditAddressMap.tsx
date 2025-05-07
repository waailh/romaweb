"use client";

import { Loc } from "@/typings";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";

const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

interface Props {
  setLoc: (data: Loc) => void;
}

const AddAddressMap = ({ setLoc }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: mapsKey!,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      //   init a marker
      //   const { AdvancedMarkerElement } = (await loader.importLibrary(
      //     "marker"
      //   )) as google.maps.MarkerLibrary;
      const { AdvancedMarkerElement } = await loader.importLibrary("marker");

      const position = { lat: 25.2048, lng: 55.2708 }; // dubai position

      //   map options
      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 12,
        mapId: "MY_MAP",
      };

      // setup map
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      // put up the marker
      const marker = new AdvancedMarkerElement({
        map: map,
        position: { lat: 25.219426620306308, lng: 55.282276118052245 },
        // position: position,
        // title: "test",
      });
    };
    initMap();
    return () => {};
  }, []);
  return (
    <div className="max-w-[600px] mt-4">
      <div style={{ height: "320px" }} ref={mapRef} />
    </div>
  );
};

export default AddAddressMap;
