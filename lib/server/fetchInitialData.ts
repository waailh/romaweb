import { getFetchOptions } from "../utils";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL;

const fetchOptions = getFetchOptions();

export const fetchInitialData = async () => {
  // console.log("fetch opts: ", fetchOptions);

  const [
    settingsRes,
    currenciesRes,
    countriesRes,
    catsRes,
    bannersRes,
    allBrandsRes,
    allCatsRes,
    allColorsRes,
  ] = await Promise.all([
    fetch(`${backendHost}/site-settings`, fetchOptions),
    fetch(`${backendHost}/currencies`, fetchOptions),
    fetch(`${backendHost}/countries`, fetchOptions),
    fetch(`${backendHost}/categories`, fetchOptions),
    fetch(`${backendHost}/banners/web`, fetchOptions),

    fetch(`${backendHost}/all-brands`, fetchOptions),
    fetch(`${backendHost}/categories/all`, fetchOptions),

    fetch(`${backendHost}/colors/top`, fetchOptions),
  ]);

  const [
    settingsData,
    currenciesData,
    countriesData,
    catsData,
    bannersData,
    allBrandsData,
    allCatsData,
    allColorsData,
  ] = await Promise.all([
    settingsRes.json(),
    currenciesRes.json(),
    countriesRes.json(),
    catsRes.json(),
    bannersRes.json(),

    allBrandsRes.json(),
    allCatsRes.json(),
    allColorsRes.json(),
  ]);

  return {
    settings: settingsData?.settings?.data || [],
    specialDeal: settingsData?.special_section || {},
    currencies: currenciesData?.data || [],
    countries: countriesData?.data || [],
    cats: catsData?.data || [],
    banners: bannersData?.data || [],

    allBrands: allBrandsData?.data || [],
    allCats: allCatsData?.data || [],

    topColors: allColorsData?.data || [],
  };
};

export const fetchColoredLensesChildren = async () => {
  const response = await fetch(
    `${backendHost}/sub-categories/108`,
    fetchOptions
  );

  const data = await response.json();

  return data?.data || [];
};
