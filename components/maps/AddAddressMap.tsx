"use client";

import { Loc, SetAddressType } from "@/typings";
import { Library, Loader } from "@googlemaps/js-api-loader";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import Loading from "../ui/loaders/Loading";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { deAddress } from "@/lib/utils";
import { useGoogleMap } from "@/store/global/map";
import { useTranslations } from "next-intl";

const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const markers: google.maps.marker.AdvancedMarkerElement[] = [];

interface Props {
  country?: string | null;
  setLoc: (data: Loc) => void;
  autoFill?: (data: SetAddressType) => void;
  empty?: boolean;
}

const libs: Library[] = ["core", "maps", "places", "marker"];

const AddAddressMap = ({ country, setLoc, autoFill, empty }: Props) => {
  const [map, setMap] = useState<google.maps.Map | null>();
  const t = useTranslations("Account");

  const { autoComplete, setAutoComplete } = useGoogleMap();

  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: mapsKey!,
    libraries: libs,
    language: "en",
  });

  const mapRef = useRef<HTMLDivElement>(null);
  const placeAutoCompleteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const position = { lat: 25.2048, lng: 55.2708 }; // Dubai position
      // map options
      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 12,
        streetViewControl: false,
        mapId: "MY_MAP",
      };

      // setup map
      const gMap = new google.maps.Map(
        mapRef.current as HTMLDivElement,
        mapOptions
      );

      setMap(gMap);

      // setup autocomplete

      // auto complete
      const gAutoComplete = new google.maps.places.Autocomplete(
        placeAutoCompleteRef.current as HTMLInputElement,
        {
          //   bounds: ourBounds,
          // types: ["(regions)"], // Prioritizes areas
          fields: [
            "formatted_address",
            "address_components",
            "geometry",
            "name",
          ],
          componentRestrictions: {
            country: [country as string],
          },
        }
      );

      setAutoComplete(gAutoComplete);

      // geo coding
      const gGeocoder = new google.maps.Geocoder();
      setGeocoder(gGeocoder);
    };

    if (isLoaded) initMap();

    return () => {};
  }, [isLoaded]);

  useEffect(() => {
    if (!map) return;
    // add the locate me button
    const locationButton = document.createElement("div");
    locationButton.textContent = "Locate Me";
    locationButton.classList.add("locate-me-button");
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(locationButton);

    locationButton.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            let name;
            setMarker(pos, name);
            map.panTo(pos);
            handleAutoFillingAddress(pos);
          },
          (error) => {
            console.error("Error getting location:", error);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    });

    return () => {};
  }, [map]);

  useEffect(() => {
    if (autoComplete) {
      autoComplete.addListener("place_changed", () => {
        const place = autoComplete.getPlace();
        // console.log(place);

        const position = place.geometry?.location;

        if (position) {
          // place a marker
          const lat = position?.lat();
          const lng = position?.lng();

          const loc = { lat, lng };
          setMarker(loc, place?.name);
          handleAutoFillingAddress(loc, place);
        }
      });
    }

    return () => {};
  }, [autoComplete]);

  // clicking for a marker
  useEffect(() => {
    if (!map) return;

    map.addListener("click", (event: google.maps.MapMouseEvent) => {
      const post = event.latLng!;
      const lat = post.lat();
      const lng = post.lng();

      const loc = { lat, lng };
      let name;
      //   console.log(loc);
      setMarker(loc, name);
      handleAutoFillingAddress(loc);
    });

    return () => {};
  }, [map]);

  const setMarker = (location: Loc, name: string | undefined) => {
    if (!map) return;
    map.setZoom(15);
    map.panTo(location);

    // remove old markers if any
    for (let i = 0; i < markers.length; i++) {
      markers[i].map = null;
    }

    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: map,
      position: location,
      title: name || "",
      gmpDraggable: true,
    });

    markers.push(marker);

    marker.addListener("dragend", () => {
      const new_position = marker.position as google.maps.LatLng;
      const new_loc = {
        lat: Number(new_position.lat),
        lng: Number(new_position.lng),
      };
      // console.log(new_loc);
      setLoc(new_loc);
      handleAutoFillingAddress(new_loc);
    });
    setLoc(location);
  };

  const handleAutoFillingAddress = (
    location: Loc,
    place?: google.maps.places.PlaceResult
  ) => {
    if (place) {
      // console.log(place);
      const { formatted_address, address_components, name } = place;

      const { sublocality, locality, state, country } = deAddress(
        address_components!
      );

      if (autoFill) {
        autoFill({
          line: name,
          area: sublocality,
          sublocality: sublocality,
          city: locality || "N/A",
          state: state,

          formatted_address: formatted_address,

          country: country,
        });
      }

      // place.
      // setAddress()
    } else {
      if (geocoder)
        geocoder
          .geocode({ location: location })
          .then(({ results }) => {
            // console.log(results[0]);
            const { formatted_address, address_components } = results[0];

            const { sublocality, locality, state, country } = deAddress(
              address_components!
            );

            if (autoFill) {
              autoFill({
                line: "",
                area: sublocality,
                sublocality: sublocality,
                city: locality || "N/A",
                state: state,

                formatted_address: formatted_address,

                country: country,
              });
            }
          })
          .catch((e) => window.alert("Geocoder failed due to: " + e));
    }
  };

  return (
    <div className="max-w-[600px]">
      <div
        className={`border px-2 py-1 rounded mb-1 flex items-center space-s-2 ${
          empty ? "border-red-600" : ""
        }`}
      >
        <MagnifyingGlassIcon className="size-4" />
        <input
          className="w-full outline-none"
          type="text"
          placeholder={t("locplc")}
          ref={placeAutoCompleteRef}
        />
      </div>
      {isLoaded ? (
        <div
          style={{ height: "250px" }}
          ref={mapRef}
          className="border-none outline-none"
        />
      ) : (
        <Loading message="Loading Map" />
      )}
    </div>
  );
};

export default AddAddressMap;
