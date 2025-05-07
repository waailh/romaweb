"use client";

import { useGlobals } from "@/store/global/globals";
import SearchIcon from "@/public/assets/icons/search.svg";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Product } from "@/typings";
import { FormEvent, useState } from "react";
import { axiosPure } from "@/lib/auth/axios/axios";
import Loading from "../ui/loaders/Loading";
import { Link } from "@/i18n.config";
import MyImage from "../ui/MyImage";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const MobileSearchLayer = () => {
  const { mobileSearchLayer, setMobileSearchLayer } = useGlobals();
  const { lang } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [results, setResults] = useState<Product[] | null>();

  const t = useTranslations("Products");
  const tn = useTranslations("Navbar");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const axios = axiosPure();
    if (keyword == "") setResults(null);

    if (keyword !== "") {
      setLoading(true);
      axios
        .get(`/products/keyword?word=${keyword}`)
        .then((res) => {
          setLoading(false);
          setResults(res.data.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  return (
    <div
      className={`fixed top-0 w-screen z-highest h-screen overflow-hidden flex flex-col bg-white transform transition-transform duration-500 shadow ease-in-out ${
        mobileSearchLayer ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-h-full overflow-y-scroll hide-scrollbar">
        <div className="wrapper">
          <div className="flex justify-end my-2">
            <button className="" onClick={() => setMobileSearchLayer(false)}>
              <XMarkIcon className="size-7" />
            </button>
          </div>
          <form
            onSubmit={(e) => handleSearch(e)}
            className="w-full flex items-center space-s-2 px-1 py-1 border-b"
          >
            <SearchIcon />
            <input
              type="search"
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={tn("searchPlaceholder")}
              className="w-full bg-transparent outline-none border-0"
              autoFocus={true}
            />
          </form>
          <div className="mt-2">
            {loading ? (
              <div className="my-4 py-6">
                <Loading />
              </div>
            ) : (
              results && (
                <>
                  {results.length > 0 ? (
                    <>
                      {results.map((one, i) => (
                        <div key={i} className="flex items-start space-s-2 p-2">
                          <Link
                            onClick={() => setMobileSearchLayer(false)}
                            href={`/product/${one.slug}`}
                          >
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
                              onClick={() => setMobileSearchLayer(false)}
                              href={`/product/${one.slug}`}
                              className="hover:text-primary"
                            >
                              <h5>{lang == "ar" ? one.ar_name : one.name}</h5>
                            </Link>
                            <p className="text-gray-400">
                              {lang == "ar"
                                ? one.ar_brand_name
                                : one.brand_name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="flex items-center justify-center py-12">
                      <p>{t("noprods")}</p>
                    </div>
                  )}
                </>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSearchLayer;
