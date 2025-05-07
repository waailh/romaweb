import axios from "axios";

// BRANCHES **************

export const get_branches = async () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY_2;

  const places = [
    {
      ar_name: "دبي - روما أوبتكال - العربي سنتر.",
      name: "Dubai - Roma Opticals in Arabian Center",
      place_id: "ChIJb9C8UylhXz4RMHumwMik5Ps",
    },
    {
      ar_name: "أبوظبي - روما أوبتكال - ياس مول.",
      name: "Abu Dhabi - Roma Opticals in Yas Mall",
      place_id: "ChIJpQqQxIdPXj4RxqhxTXpM4q8",
    },
    {
      ar_name: "أبوظبي - روما أوبتكال - الفرسان مول.",
      name: "Abu Dhabi - Roma Optical - Forsan Mall",
      place_id: "ChIJWcAW-fdHXj4RUKW_4kKJsao",
    },
    {
      ar_name: "الشارقة - روما أوبتكال - قرية الشعب.",
      name: "Sharjah - Roma Opticals in Al Shaab Village.",
      place_id: "ChIJd-_kx5pZXz4Rimj7VKIg94M",
    },
    {
      ar_name: "العين - روما أوبتكال - خيمة زمان.",
      name: "Al Ain - Roma Opticals in Khaymat Zaman",
      place_id: "ChIJU7q6-zaxij4RJA0velmAoS8",
    },
    {
      ar_name: "عجمان - روما أوبتكال - عجمان سيتي سنتر.",
      name: "Ajman - Roma Opticals in Ajman City Center",
      place_id: "ChIJ45CuKu9ZXz4RHuqueESB0Sg",
    },
    {
      ar_name: "الفجيرة - روما أوبتكال - الفجيرة سيتي سنتر.",
      name: "Fujairah - Roma Opticals in Fujairah city center",
      place_id: "ChIJk1hF25f59D4Rtb199gZCNUs",
    },
    {
      ar_name: "رأس الخيمة - روما أوبتكال - شارع الشيخ سالم.",
      name: "Ras Al Khaimah - Roma Opticals at Sheikh Salim Road.",
      place_id: "ChIJr_ewivZ39j4RIWAuQPrltpQ",
    },
    {
      ar_name: "القرية العالمية - روما أوبتكال - الجناح الأوروبي - محل رقم 6",
      name: "Global Village - Roma Opticals - European Pavilion - Shop No. 6",
      place_id: "ChIJe2Z22ZNvXz4RPPyHvIWCDq4",
    },
  ];

  let branches = [];

  try {
    const requests = places.map(async (place) => {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json`,
        {
          params: {
            key: apiKey,
            place_id: place.place_id,
            fields:
              "name,formatted_address,geometry,formatted_phone_number,opening_hours,photos",
          },
        }
      );
      return { ...res.data, branch: place.name, ar_branch: place.ar_name };
    });

    const responses = await Promise.all(requests);

    branches = responses.map((res) => {
      const data = res.result;

      let closesAt = "Closed today";

      if (data.opening_hours) {
        const today = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.
        const todayHours = data.opening_hours.periods
          .reverse()
          .find((period: any) => period.open.day === today);
        if (todayHours && todayHours.close) {
          closesAt = todayHours.close.time;
          closesAt = `${closesAt.slice(0, 2)}:${closesAt.slice(2)}`;
        }
      }

      const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${data.photos[0].photo_reference}&key=${apiKey}`;

      return {
        title: res.branch,
        ar_title: res.ar_branch,
        address: data.formatted_address,
        open_now: data.opening_hours?.open_now,
        closesAt,
        loc: {
          lat: data.geometry.location.lat,
          lng: data.geometry.location.lng,
        },
        phone: data.formatted_phone_number || "N/A",
        workings: data.opening_hours?.weekday_text || [],
        photo: photoUrl,
      };
    });

    return { success: true, branches };
  } catch (error) {
    return { success: false, message: "failed" };
  }
};
