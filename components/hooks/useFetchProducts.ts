// hooks/useFetchProducts.ts

import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { axiosPure } from "@/lib/auth/axios/axios";
import { useFilters } from "@/store/products/filters";
import { useProducts } from "@/store/products/products";
import { useGlobals } from "@/store/global/globals";
import { ProductsResponseData } from "@/typings";

export const useFetchProducts = (catId: number) => {
  const { filter, resetFilter } = useFilters();
  const { setMeta, setLoading, setProducts, setSideFilter, setPage } =
    useProducts();

  const { cat } = useParams();
  const params_st = useSearchParams().toString();
  const { isMobileLayout } = useGlobals();

  type Params = { page: number; maintainFilter: boolean };

  const fetchProducts = ({ page, maintainFilter }: Params) => {
    if (!maintainFilter) resetFilter();
    if (page !== null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      let params = new URLSearchParams(params_st);

      params.set("categories", cat !== "all" ? catId.toString() : "");
      params.set("brands", filter.brands.join(","));
      params.set("colors", filter.colors.join(","));
      params.set("name", filter.keyword);
      params.set("min", filter.price.min.toString());
      params.set("max", filter.price.max ? filter.price.max.toString() : "");

      let dynamic = filter.dynamic
        .map((one) => {
          return `${one.attribute_id}@${one.values.join("&")}`;
        })
        .join(",");

      params.set("specs", dynamic);
      params.set("page", (page + 1).toString());

      const noFilterParams = `categories=${params.get(
        "categories"
      )}&page=${params.get("page")}`;

      const searchParams = maintainFilter ? params.toString() : noFilterParams;

      console.log(searchParams);

      const axios = axiosPure();
      setLoading(true);

      axios
        .get(`/products/search?${searchParams}`)
        .then((res) => {
          console.log("triggered, page:", res.data.meta.current_page!);
          setLoading(false);
          if (res.data.success) {
            handleSuccess(res.data);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const handleSuccess = (data: ProductsResponseData) => {
    setMeta(data.meta);
    setPage(data.meta.current_page - 1);
    setProducts(data.data);
    if (isMobileLayout) setSideFilter(false);
  };

  return { fetchProducts, handleSuccess };
};
