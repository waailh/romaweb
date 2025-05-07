"use client";

import { getToken } from "@/lib/auth/auth";
import { getCountry, getCurrency } from "@/lib/utils";
import { useAddresses } from "@/store/account/addresses";
import { useBanners } from "@/store/global/banners";
import { useBrands } from "@/store/global/brands";
import { useCategories } from "@/store/global/categories";
import { useColors } from "@/store/global/colors";
import { useGlobals } from "@/store/global/globals";
import { useSettings } from "@/store/global/settings";
import {
  AllBannersType,
  Brand,
  Category,
  Color,
  CurrencyData,
  OurCountry,
  Settings,
  SpecialDeal,
} from "@/typings";
import { useEffect } from "react";

interface Props {
  initialData: {
    settings: Settings;
    specialDeal: SpecialDeal;
    countries: OurCountry[];
    currencies: CurrencyData[];
    cats: Category[];
    banners: AllBannersType;

    allBrands: Brand[];
    allCats: Category[];
    topColors: Color[];
  };
  coloredSubcats: Category[];
}

const ClientInitializer = ({ initialData, coloredSubcats }: Props) => {
  const { getUserData, setIsMobileLayout } = useGlobals();
  const { setOurCountries } = useAddresses();
  const { setCats, setAllCats } = useCategories();

  const { setAllBanners } = useBanners();
  const { setAllBrands, setAllColorBrands } = useBrands();
  const { setAllColors } = useColors();

  const {
    setSettings,
    setSpecialDeal,
    setCountry,
    setAllCurrencies,
    setCurrency,
  } = useSettings();

  const setCountryAndCurrency = async () => {
    let ipCountry;
    try {
      const response = await getCountry();
      ipCountry = response.data.country;
      setCountry(ipCountry);
    } catch (error) {
      console.error("Failed to fetch country:", error);
      setCountry("");
    }

    // Use already fetched currencies
    setAllCurrencies(initialData.currencies);

    // Set currency based on the fetched country
    const currency = getCurrency(initialData.currencies, ipCountry);
    setCurrency(currency);
  };

  useEffect(() => {
    getUserData(); // Client-side only
    // console.log("test: ", initialData);

    // Initialize settings from server
    setSettings(initialData.settings);
    setSpecialDeal(initialData.specialDeal);
    setCats(initialData.cats);

    setAllBanners(initialData.banners);

    setAllBrands(initialData.allBrands);
    setAllCats(initialData.allCats);
    setAllColors(initialData.topColors);

    setAllColorBrands(coloredSubcats);

    // Initialize country and currency
    setCountryAndCurrency();

    // Initialize countries
    setOurCountries(initialData.countries);

    setIsMobileLayout(window.innerWidth < 768);
  }, []);

  return null;
};

export default ClientInitializer;
