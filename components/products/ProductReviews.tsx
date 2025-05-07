"use client";

import { StarIcon } from "@heroicons/react/16/solid";
import LineDivider from "../helpers/LineDivider";
import StarRating from "../ui/StarRating";
import { axiosWithAuth } from "@/lib/auth/axios/axios";
import { useEffect, useState } from "react";
import { useProducts } from "@/store/products/products";
import MyImage from "../ui/MyImage";
import AddReviewModal from "./helpers/AddReviewModal";
import { useGlobalModals } from "@/store/helpers/modals";
import Loading from "../ui/loaders/Loading";
import { useTranslations } from "next-intl";

interface Props {
  id: number;
}

type RevTotal = { average_rating: number; total_reviews: number };

const ProductReviews = ({ id }: Props) => {
  const { prodRevs, setProdRevs, addProdRevs } = useProducts();
  const { addRevModal, setAddRevModal } = useGlobalModals();
  const [page, setPage] = useState(1);

  const [total, setTotal] = useState<RevTotal>();

  const [loading, setLoading] = useState<boolean>(false);
  const [noMore, setNoMore] = useState<boolean>(false);

  const t = useTranslations("Product");

  const fetchReviews = () => {
    setLoading(true);
    const axios = axiosWithAuth();
    axios
      .get(`/reviews/product/${id}?page=1`)
      .then((res) => {
        // console.log(res);
        if (res.data.success) {
          setProdRevs(res.data.data);

          setTotal({
            average_rating: res.data.average_rating,
            total_reviews: res.data.total_reviews,
          });

          if (res.data.data.length == 0) setNoMore(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const fetchMoreReviews = () => {
    setLoading(true);
    const axios = axiosWithAuth();
    axios
      .get(`/reviews/product/${id}?page=${page + 1}`)
      .then((res) => {
        // console.log(res);
        if (res.data.success) {
          addProdRevs(res.data.data);
          setPage((page) => page + 1);
          if (res.data.data.length == 0) setNoMore(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReviews();

    return () => setAddRevModal(false);
  }, []);

  return (
    <>
      {prodRevs ? (
        <div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center space-s-1">
              <StarIcon className="size-4 text-yellow-500" />
              <span className="font-bold">{total?.average_rating}/ 5</span>
              <span>
                - {total?.total_reviews} {t("revs")}
              </span>
            </div>
            <button
              onClick={() => setAddRevModal(true)}
              className="border border-black px-2 py-1 text-sm hover:bg-black duration-300 hover:text-white rounded"
            >
              {t("addrev")}
            </button>
          </div>
          <LineDivider />
          <div className="mt-2 flex flex-col space-y-8">
            {prodRevs.length == 0 ? (
              <p className="mt-4 text-sm py-1 ps-2 border-s-4 border-gray-600">
                {t("norevs")}
              </p>
            ) : (
              prodRevs.map((one, i) => (
                <div key={i}>
                  <div className="flex flex-col space-y-2 md:flex-row md:items-start md:space-y-0 md:space-s-2">
                    <div className="size-8 md:size-12 rounded-full bg-lightgray flex items-center justify-center text-xs md:text-sm shrink-0 relative">
                      <MyImage alt="/" src={one.avatar} fill />
                    </div>
                    <div className="flex flex-col space-y-2 md:flex-1">
                      <div className="flex items-center justify-between">
                        <h4>{one.user_name}</h4>
                        <StarRating rating={{ rate: one.rating }} />
                      </div>
                      <p className="text-gray-500 text-xs">{one.time}</p>
                      <p className="mt-1">{one.comment}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            <button
              disabled={loading || noMore}
              onClick={() => fetchMoreReviews()}
              className="w-fit mt-2 md:mt-4 px-2 py-1 md:px-4 rounded border border-black text-sm hover:shadow"
            >
              {noMore ? t("nmor") : t("loadmor")}
            </button>
          </div>
        </div>
      ) : (
        <div className="pt-3 md:pt-12">
          <Loading />
        </div>
      )}
      <AddReviewModal id={id} />
    </>
  );
};

export default ProductReviews;
