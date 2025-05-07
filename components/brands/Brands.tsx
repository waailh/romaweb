import { axiosPure } from "@/lib/auth/axios/axios";
import InnerBrands from "./InnerBrands";

const Brands = async () => {
  const axios = axiosPure();

  const res = await axios.get(`/brands`);
  const brands = res.data.data;

  return <InnerBrands brands={brands} />;
};

export default Brands;
