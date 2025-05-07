"use client";

import { axiosPure } from "@/lib/auth/axios/axios";
import { Color, Product } from "@/typings";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../ui/loaders/Loading";
import ProductCard from "./helpers/ProductCard";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import BreadCrumb from "../helpers/BreadCrumb";
import ProductsLoader from "../ui/loaders/ProductsLoader";
import MyImage from "../ui/MyImage";
import { FilterVal, useByColor } from "@/store/products/by_color";

interface Props {
  data: Color;
}

const InnerByColorPage = ({ data }: Props) => {
  const { lang, color } = useParams();

  const t = useTranslations("Products");
  const tp = useTranslations("Product");
  const tb = useTranslations("ByColor");
  const tet = useTranslations("ErrorToast");

  const {
    filter,
    setFilter,
    prods,
    setProds,
    addProds,
    noMore,
    setNoMore,
    loading,
    setLoading,
    page,
    setPage,
  } = useByColor();

  const getProds = (page: number) => {
    const axios = axiosPure();
    setLoading(true);
    axios
      .get(`/products/all/by_color`, {
        params: { page, color, category_id: 108, ring: filter },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          const meta = res.data.meta;
          setNoMore(meta.current_page == meta.last_page);

          if (meta.current_page == 1) {
            setProds(res.data.data);
          } else {
            addProds(res.data.data);
          }

          setPage(meta.current_page + 1);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(tet("prodsfetcherr"));
        setLoading(false);
      });
  };

  useEffect(() => {
    setProds(null);
    getProds(1);
  }, [filter]);

  return (
    <div className="w-full ">
      <BreadCrumb items={[{ name: tb("shopbycolr"), link: "#" }]} />

      <div className="wrapper">
        <div className="w-full aspect-[5/1] relative">
          <MyImage src={data?.banner!} className="object-cover" fill />
        </div>

        {/* filters */}
        <div className="my-4 flex justify-center px-2 space-s-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-2 py-1 rounded text-sm border ${
              filter === "all" ? "ring ring-[1px] ring-primary" : ""
            }`}
          >
            {t("all")}
          </button>
          <button
            onClick={() => setFilter("with-ring")}
            className={`px-2 py-1 rounded text-sm border flex items-center space-s-2 ${
              filter === "with-ring" ? "ring ring-[1px] ring-primary" : ""
            }`}
          >
            <div className="relative size-7">
              <MyImage
                src="/assets/images/ring/ring.webp"
                className="object-center"
                fill
              />
            </div>
            <span>{t("rng")}</span>
          </button>
          <button
            onClick={() => setFilter("without-ring")}
            className={`px-2 py-1 rounded text-sm border flex items-center space-s-2 ${
              filter === "without-ring" ? "ring ring-[1px] ring-primary" : ""
            }`}
          >
            <div className="relative size-7">
              <MyImage
                src="/assets/images/ring/noring.webp"
                className="object-center"
                fill
              />
            </div>
            <span>{t("norng")}</span>
          </button>
        </div>

        <>
          {prods &&
            (prods.length > 0 ? (
              <div className="grid grid-cols-12 gap-2 mb-2">
                {prods.map((one, i) => (
                  <div key={i} className="col-span-6 md:col-span-3">
                    <ProductCard product={one} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-48">
                {t("noprods")}
              </div>
            ))}

          {(!prods || loading) && <ProductsLoader perLine={4} />}
        </>

        <div className="py-4 w-full flex justify-center">
          <button
            disabled={noMore || loading}
            onClick={() => getProds(page)}
            className={`px-2 py-1 rounded text-sm text-white ${
              noMore ? "bg-black" : "bg-primary"
            }`}
          >
            {noMore ? tp("nmor") : tp("loadmor")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InnerByColorPage;
