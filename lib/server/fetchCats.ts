import { getFetchOptions } from "../utils";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchCatData = async (cat: string) => {
  const fetchOptions = getFetchOptions();

  const response = await fetch(
    `${backendHost}/category/info/${cat}`,
    fetchOptions
  );

  const data = await response.json();

  return data || [];
};
