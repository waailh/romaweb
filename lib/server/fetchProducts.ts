import { getFetchOptions } from "../utils";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchProductsLists = async () => {
  // Use only one type of cache configuration

  const fetchOptions = getFetchOptions();

  const [featuredRes, bestSellerRes, latestRes] = await Promise.all([
    fetch(`${backendHost}/products/featured`, fetchOptions),
    fetch(`${backendHost}/products/best-seller`, fetchOptions),
    fetch(`${backendHost}/products/latest`, fetchOptions),
  ]);

  const [featuredData, bestSellerData, latestData] = await Promise.all([
    featuredRes.json(),
    bestSellerRes.json(),
    latestRes.json(),
  ]);

  return {
    featured: featuredData?.data || [],
    bestSellers: bestSellerData?.data || [],
    latest: latestData?.data || [],
  };
};

export const fetchOfferProducts = async () => {
  const fetchOptions = getFetchOptions();

  const response = await fetch(`${backendHost}/offers/products`, fetchOptions);

  const data = await response.json();

  return data?.data || [];
};

export const fetchSpecialDealProducts = async () => {
  const fetchOptions = getFetchOptions();

  const response = await fetch(
    `${backendHost}/special-products/all`,
    fetchOptions
  );

  const data = await response.json();

  return data?.data || [];
};

export const fetchTodaysDealProducts = async () => {
  const fetchOptions = getFetchOptions();

  const response = await fetch(
    `${backendHost}/products/todays-deal`,
    fetchOptions
  );

  const data = await response.json();

  return data?.data || [];
};

export const fetchProductDetails = async (slug: string) => {
  const fetchOptions = getFetchOptions();

  const response = await fetch(
    `${backendHost}/products/details/${slug}`,
    fetchOptions
  );

  const data = await response.json();

  return data || {};
};

export const fetchRelatedProducts = async (slug: string) => {
  const fetchOptions = getFetchOptions();

  const response = await fetch(
    `${backendHost}/products/related/${slug}`,
    fetchOptions
  );

  const data = await response.json();

  return data?.data || [];
};

export const fetchCatProducts = async (cat: string) => {
  const fetchOptions = getFetchOptions();

  const response = await fetch(
    `${backendHost}/products/category/${cat}`,
    fetchOptions
  );

  const data = await response.json();

  return data || {};
};

export const fetchShopProducts = async () => {
  const fetchOptions = getFetchOptions();

  const response = await fetch(`${backendHost}/products/search`, fetchOptions);

  const data = await response.json();

  return data || {};
};
