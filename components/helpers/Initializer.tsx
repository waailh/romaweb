// "use client";

// import { getToken } from "@/lib/auth/auth";
// import { axiosPure } from "@/lib/auth/axios/axios";
// import { getCountry, getCurrency } from "@/lib/utils";
// import { useGlobals } from "@/store/global/globals";
// import { useSettings } from "@/store/global/settings";
// import { useEffect } from "react";

// const Initializer = () => {
//   const { getUserData, setIsMobileLayout, user } = useGlobals();
//   const {
//     settings,
//     setSettings,
//     setSpecialDeal,
//     setCountry,
//     setAllCurrencies,
//     setCurrency,
//   } = useSettings();

//   const fetchSiteSettings = async () => {
//     try {
//       const response = await fetch("/api/site-settings");
//       const data = await response.json();
//       // console.log("the returned settings are: ", data);

//       const settings = data.data.settings.data;
//       if (settings) setSettings(settings);

//       const special_settings = data.data.special_section;
//       if (special_settings) setSpecialDeal(special_settings);
//     } catch (error) {
//       console.error("Failed to fetch site settings:", error);
//     }
//   };

//   const setCountryAndCurrency = async () => {
//     const axios = axiosPure();
//     let ipCountry;

//     try {
//       const response = await getCountry();
//       ipCountry = response.data.country;

//       // console.log("ipCountry is: ", ipCountry);

//       setCountry(ipCountry);
//     } catch (error) {
//       console.error("Failed to fetch country:", error);
//       setCountry("");
//     }

//     const cRes = await axios.get("/currencies");
//     const data = cRes.data.data;
//     setAllCurrencies(data);
//     // console.log(data);

//     const currency = getCurrency(data, ipCountry);
//     setCurrency(currency);
//   };

//   useEffect(() => {
//     // initialize user
//     getUserData();

//     // localStorage.removeItem("ecom_token");

//     // initialize settings
//     fetchSiteSettings();

//     // initialize country and currency
//     setCountryAndCurrency();

//     // console.log("inner width is: ", window?.innerWidth!);
//     setIsMobileLayout(window?.innerWidth < 768);
//   }, []);

//   // useEffect(() => {
//   //   // console.log("settings are: ", settings);
//   //   console.log("user is: ", user, getToken());
//   // }, [user]);

//   return <></>;
// };

// export default Initializer;

import {
  fetchColoredLensesChildren,
  fetchInitialData,
} from "@/lib/server/fetchInitialData";
import ClientInitializer from "./ClientInitializer";

const Initializer = async () => {
  const initialData = await fetchInitialData();
  const coloredSubcats = await fetchColoredLensesChildren();

  return (
    <ClientInitializer
      initialData={initialData}
      coloredSubcats={coloredSubcats}
    />
  );
};

export default Initializer;
