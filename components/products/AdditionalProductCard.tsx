"use client";

import MyImage from "../ui/MyImage";
import { useParams } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { useSettings } from "@/store/global/settings";
import { useEffect, useState } from "react";
// import { useCarts } from "@/store/products/cart";
import { axiosWithAuth } from "@/lib/auth/axios/axios";
import toast from "react-hot-toast";
import { useProducts } from "@/store/products/products";
import { useGlobals } from "@/store/global/globals";
import Loading from "../ui/loaders/Loading";
import { useTranslations } from "next-intl";
import { useCartsStore } from "@/store/products/carts";

interface Props {
  id: number;
}

const AdditionalProductCard = ({ id }: Props) => {
  const { lang } = useParams();
  const { currency } = useSettings();
  const [added, setAdded] = useState<boolean>(false);
  const [loaded, setLoaded] = useState(false);

  const t = useTranslations("Product");
  const tet = useTranslations("ErrorToast");
  const tst = useTranslations("SuccessToast");

  const { triggerCounts } = useCartsStore();
  const { user } = useGlobals();

  const { setAssocProd, assocProd } = useProducts();

  const handleAddToCart = () => {
    if (assocProd && !assocProd.in_cart && !added) {
      const axios = axiosWithAuth();
      axios
        .post(`/carts/add`, {
          id: assocProd.product.id,
          quantity: 1,
        })
        .then((res) => {
          // console.log(res);
          if (res.data.result) {
            triggerCounts();
            setAdded(true);
            toast.success(tst("addcart"));
          } else {
            toast.error(tet("err"));
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(tet("err"));
        });
    }
  };

  const fetchAssociatedProduct = () => {
    const axios = axiosWithAuth();

    axios
      .get(`/products/associated/${id}`)
      .then((res) => {
        // console.log("assoc: ", res.data);
        setAssocProd(res.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setLoaded(true);
      });
  };

  useEffect(() => {
    fetchAssociatedProduct();
  }, []);

  return (
    <div className="my-2">
      {assocProd ? (
        <div className="py-2 border-y border-gray-300">
          <div className="flex items-start space-s-2">
            <input
              type="checkbox"
              className=""
              disabled={assocProd.in_cart || added}
              checked={assocProd.in_cart || added}
              onChange={() => handleAddToCart()}
            />
            <div
              onClick={() => handleAddToCart()}
              className="relative cursor-pointer size-[60px] md:size-[80px]"
            >
              <MyImage
                src={assocProd.product.thumbnail_image}
                className="object-cover rounded"
                fill
              />
            </div>
            <div className="flex flex-col items-start justify-center">
              <h6 className="text-lg font-bold">
                {lang == "ar"
                  ? assocProd.product.ar_name
                  : assocProd.product.name}
              </h6>
              <div className="flex items-center space-s-2 text-sm">
                <span className="text-gray-500">{t("price")} : </span>
                <span className="font-bold">
                  {formatPrice(assocProd.product.main_price, currency!)}
                </span>
              </div>
              {(added || assocProd.in_cart) && (
                <div className="text-sm text-green-600">{t("alrdycrt")}</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {!loaded && (
            <div className="py-2 border-y border-gray-300">
              <Loading />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdditionalProductCard;
