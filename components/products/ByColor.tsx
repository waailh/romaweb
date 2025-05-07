import { getFetchOptions } from "@/lib/utils";
import InnerByColor from "./InnerByColor";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL;

const getData = async () => {
  const fetchOptions = getFetchOptions();

  const res = await fetch(
    `${backendHost}/category/colors?category_id=108`,
    fetchOptions
  );
  const data = await res.json();

  return data?.colors || [];
};

const ByColor = async () => {
  const data = await getData();

  return <InnerByColor data={data} />;
};

export default ByColor;
