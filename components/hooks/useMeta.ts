// hooks/useFetchCart.ts
import { axiosPure } from "@/lib/auth/axios/axios";
// import { useCarts } from "@/store/products/cart";
import toast from "react-hot-toast";
import { usePlaceOrder } from "@/store/products/order";
import { useCartsStore } from "@/store/products/carts";
import { useSettings } from "@/store/global/settings";

export const useFetchCart = () => {
  const { settings } = useSettings();

  return { settings };
};
