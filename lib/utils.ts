import { CurrencyData } from "@/typings";
import axios from "axios";

const ipinfoToken = process.env.NEXT_PUBLIC_IPINFO_TOKEN!;

const cacheEnabled = process.env.NEXT_PUBLIC_CACHE_ENABLED === "true";
const cacheReval = Number(process.env.NEXT_PUBLIC_CACHE_REVALIDATION) || 0;

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

// html manipulation

export const extractFirstParagraph = (html: string): string => {
  // Create a new DOM parser
  const parser = new DOMParser();
  // Parse the HTML string into a document
  const doc = parser.parseFromString(html, "text/html");

  // Get the first paragraph element
  const firstParagraph = doc.querySelector("p");

  if (!firstParagraph) return "";

  // Remove style attributes from all elements
  const allElements = doc.querySelectorAll("*");
  allElements.forEach((el) => {
    el.removeAttribute("style");
  });

  return firstParagraph.innerHTML;
};

// END OF HTML MANIPULATION

export const getCurrency = (
  data: CurrencyData[],
  country: string
): CurrencyData => {
  const defaultCurr = {
    id: 29,
    name: "درهم اماراتي",
    code: "AED",
    symbol: "AED",
    exchange_rate: 1,
    is_default: true,
  };

  if (!country) return defaultCurr;

  // proceed
  let curr;

  switch (country) {
    case "AE": // UAE
      curr = "AED";
      break;
    case "KW": // Kuwait
      curr = "KWD";
      break;
    case "SA": // Saudi
      curr = "SAR";
      break;
    case "BH": // Bahrain
      curr = "BHD";
      break;
    case "QA": // Qatar
      curr = "QAR";
      break;
    case "OM": // Oman
      curr = "OMR";
      break;

    default:
      curr = "AED";
      break;
  }

  return data.find((one) => one.code === curr) || defaultCurr;
};

// validate
export const ifHasEmpty = (form: { [key: string]: any }): boolean => {
  let empty = false;
  for (const key in form) {
    if (
      form[key] === "" ||
      form[key] === " " ||
      form[key] === null ||
      form[key] === undefined
    ) {
      empty = true;
    }
  }

  return empty;
};

export const ifEmpty = (field: string): boolean => {
  let empty = false;
  if (field === "" || field === " " || field === null || field === undefined) {
    empty = true;
  }

  return empty;
};

export const ifEqual = (first: string, second: string): boolean => {
  return first === second;
};

export const validatePassword = (pass: string): string => {
  if (pass.length < 6) {
    return "short";
  }
  if (!/\d/.test(pass)) {
    return "number";
  }
  if (!/[a-zA-Z]/.test(pass)) {
    return "letter";
  }
  if (/[^a-zA-Z0-9]/.test(pass)) {
    return "strange";
  }
  return "valid";
};

// format
// export const formatPrice = (price: string, currency: CurrencyData): string => {
//   if (!currency) return `${Number(price).toFixed(2)} AED`;

//   return `${(Number(price) * currency?.exchange_rate!).toFixed(
//     2
//   )} ${currency?.code!}`;
// };

// format
export const formatPrice = (price: string, currency: CurrencyData): string => {
  if (!currency)
    return `${Number(price).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} AED`;

  return `${(Number(price) * currency?.exchange_rate!).toLocaleString(
    undefined,
    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  )} ${currency?.code!}`;
};

// export const splitter = (str: string) => {
//   // Use a regular expression to split on "-" that is not preceded by another "-" and not followed by another "-"
//   // return str.split(/(?!^-)(?<![A-Za-z\u0600-\u06FF]-)-/);
//   // return str.split(/(?!^-)(?<!\w-)-/);
//   return str.split(/-(?![^-])/);
// };

export const splitter = (str: string): string[] => {
  const result: string[] = [];
  let buffer = "";
  let isNegative = str.startsWith("-"); // Check if the string starts with "-"

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === "-") {
      if (buffer) {
        result.push(buffer); // Push the current buffer
        buffer = "";
      }
      if (str[i + 1] === "-") {
        buffer = "-"; // Prepare buffer for the next part if "--" is encountered
        i++; // Skip the next "-"
      }
    } else {
      buffer += char;
    }
  }

  if (buffer) result.push(buffer); // Push any remaining buffer
  if (isNegative && result.length > 0) result[0] = "-" + result[0]; // Add "-" back if the string started with "-"

  return result;
};

export const getCountry = async () => {
  let data;

  const res = await axios.get(`https://ipinfo.io/json?token=${ipinfoToken}`);

  return res;
};

export const deAddress = (
  address_components: google.maps.GeocoderAddressComponent[]
) => {
  const sublocality = address_components?.find((component) =>
    component.types.includes("sublocality")
  )?.long_name;

  const locality = address_components?.find((component) =>
    component.types.includes("locality")
  )?.long_name;

  const state = address_components?.find((component) =>
    component.types.includes("administrative_area_level_1")
  )?.long_name;

  const country = address_components?.find((component) =>
    component.types.includes("country")
  )?.short_name;

  return { sublocality, locality, state, country };
};

export const fetchSiteSettings = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/site-settings`
    );

    // console.log("the res: ", response.data);
    const data = response.data;
    return data || {}; // Return settings
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    return {}; // Return empty object if failed
  }
};

export const getFetchOptions = (): RequestInit => {
  if (cacheEnabled) {
    return { next: { revalidate: cacheReval } }; // Caching enabled with revalidation
  } else {
    return { cache: "no-store" }; // No caching (forces fresh data)
  }
};
