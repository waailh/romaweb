"use client";
import MyImage from "../ui/MyImage";

import SearchIcon from "@/public/assets/icons/search.svg";
import ArrowDownIcon from "@/public/assets/icons/drowdown-arrow.svg";
import { useTranslations } from "next-intl";
import { FormEvent, useEffect, useState } from "react";
import { Product } from "@/typings";

import { motion } from "framer-motion";

import { axiosPure } from "@/lib/auth/axios/axios";
import { useParams } from "next/navigation";
import Loading from "../ui/loaders/Loading";
import { Link } from "@/i18n.config";

interface Props {}

const SearchBox = ({}: Props) => {
  const t_g = useTranslations("General");
  const t = useTranslations("Navbar");
  const tp = useTranslations("Products");

  const [keyword, setKeyword] = useState<string>("");
  const [expanded, setExpanded] = useState<boolean>(false);

  const [results, setResults] = useState<Product[] | null>();

  const fetchResults = (word: string) => {
    const axios = axiosPure();
    setResults(null);
    if (word !== "")
      axios
        .get(`/products/keyword?word=${word}`)
        .then((res) => {
          setResults(res.data.data);
        })
        .catch((err) => console.log(err));
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchResults(keyword);
    setExpanded(true);
  };

  useEffect(() => {
    if (keyword == "") setExpanded(false);
  }, [keyword]);

  const { lang } = useParams();

  return (
    <div
      onMouseLeave={() => setExpanded(false)}
      className="relative lg:px-4 lg:py-[6px] w-full bg-slate-100 rounded-[6px] text-regular max-w-[500px]"
    >
      <div className="w-full">
        <form className="apart" onSubmit={(e) => submitForm(e)}>
          <SearchIcon />
          <input
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
            className="bg-transparent flex-1 outline-none"
            placeholder={t("searchPlaceholder")}
          />
          <button type="submit" className="together">
            {t_g("all")}
            <ArrowDownIcon />
          </button>
        </form>
      </div>
      {expanded && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="absolute top-[2.6rem] z-high w-full border shadow bg-white max-h-60 overflow-y-scroll custom-y-scrollbar"
        >
          {results ? (
            <>
              {results.length > 0 ? (
                <>
                  {results.map((one, i) => (
                    <div key={i} className="flex items-start space-s-2 p-2">
                      <Link href={`/product/${one.slug}`}>
                        <div className="size-12 md:size-16 relative">
                          <MyImage
                            src={one.thumbnail_image}
                            className="object-cover objet-center"
                            fill
                          />
                        </div>
                      </Link>
                      <div className="">
                        <Link
                          href={`/product/${one.slug}`}
                          className="hover:text-primary"
                        >
                          <h5>{lang == "ar" ? one.ar_name : one.name}</h5>
                        </Link>
                        <p className="text-gray-400">
                          {lang == "ar" ? one.ar_brand_name : one.brand_name}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="h-24 flex items-center justify-center">
                  <div className="">{tp("noprods")}</div>
                </div>
              )}
            </>
          ) : (
            <Loading />
          )}
        </motion.div>
      )}
    </div>
  );
};

export default SearchBox;
