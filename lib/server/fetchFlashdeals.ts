import { getFetchOptions } from "../utils";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL;

const fetchOptions = getFetchOptions();

export const fetchFlashdeals = async () => {
  const response = await fetch(`${backendHost}/flash-deals`, fetchOptions);

  const data = await response.json();

  return data?.data || [];
};

export const fetchFlashdealData = async (deal: string) => {
  const response = await fetch(
    `${backendHost}/flash-deals/info/${deal}`,
    fetchOptions
  );

  const data = await response.json();

  return data || {};
};
