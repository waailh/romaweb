"use client";

import { useBranches } from "@/store/branches";
import { Loc, OurMarker } from "@/typings";
import { Library } from "@googlemaps/js-api-loader";
import { useJsApiLoader } from "@react-google-maps/api";
import { useRef, useEffect, useState } from "react";

interface Props {
  markers: OurMarker[];
}

const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const libs: Library[] = ["core", "maps", "places", "marker"];

const BranchesMap = ({ markers }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<google.maps.Map | null>();

  const { active } = useBranches();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: mapsKey!,
    libraries: libs,
  });

  useEffect(() => {
    const initMap = async () => {
      const position = { lat: 25.208678685738963, lng: 55.267258261699794 }; // dubai position
      // const position = active?.loc; // dubai position

      // map options
      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 10,
        streetViewControl: false,
        mapId: "BRANCHES_MAP",
      };

      // Create bounds object
      const bounds = new google.maps.LatLngBounds();

      // setup map
      const gMap = new google.maps.Map(
        mapRef.current as HTMLDivElement,
        mapOptions
      );

      // add all brancehs markers
      markers.forEach((one) => {
        new google.maps.marker.AdvancedMarkerElement({
          map: gMap,
          gmpClickable: true,
          position: one.loc,
          title: one.name || "",
        });

        // Extend the bounds to include each marker's position
        bounds.extend(one.loc);
      });

      // Fit the map to the bounds
      gMap.fitBounds(bounds);

      setMap(gMap);
    };

    if (isLoaded) initMap();

    return () => {};
  }, [isLoaded]);

  useEffect(() => {
    if (!map) return;
    if (active?.loc) {
      map.setZoom(18);
      map.panTo(active.loc);
    }
  }, [active]);

  return <div className="w-full h-[500px]" ref={mapRef}></div>;
};

export default BranchesMap;
