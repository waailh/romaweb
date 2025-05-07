// hooks/useFetchCart.ts
import { axiosWithAuth } from "@/lib/auth/axios/axios";
// import { useCarts } from "@/store/products/cart";
import toast from "react-hot-toast";
import { usePlaceOrder } from "@/store/products/order";
import { useCartsStore } from "@/store/products/carts";
import { useCouponer } from "@/store/global/coupon";
import { Gift } from "@/typings";
import { useTranslations } from "next-intl";

export const useFetchCart = () => {
  const { setCart } = useCartsStore();
  const { setCouponDynamically } = useCouponer();
  const tet = useTranslations("ErrorToast");

  const { gift, setGift, payment_method } = usePlaceOrder();

  const axios = axiosWithAuth();
  const getCartData = () => {
    axios
      .get(`/carts-list`, {
        params: { payment_method },
      })
      .then((res) => {
        let data = res.data.data[0];
        console.log(data);
        setCart(data);

        const giftRemains = data.gifts?.gifts.find(
          (one: Gift) => one.gift_id === gift
        );
        if (!giftRemains) setGift(null);

        setCouponDynamically(data.summary.grand_total);
      })
      .catch((err) => {
        console.log(err);
        toast.error(tet("crtftcherr"));
      });
  };

  return { getCartData };
};
