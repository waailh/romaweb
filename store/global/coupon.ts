import { useGlobalModals } from "@/store/helpers/modals";
import { useCartsStore } from "@/store/products/carts";
import { create } from "zustand";

type Cop = {
  discount: string | null;
  code: string | null;
  min?: number;
  max?: number;
};

interface CopState {
  coupon: Cop;
  setCoupon: (data: Cop) => void;
  resetCoupon: () => void;
  setCouponDynamically: (grandTotal: number) => void; // Renamed function
}

const nullCop: Cop = {
  discount: null,
  code: null,
};

const initialCop: Cop = {
  discount: "10",
  code: "go10",
};

const middleCop: Cop = {
  discount: "15",
  code: "go15",
};

const FinalCop: Cop = {
  discount: "20",
  code: "go20",
};

export const useCouponer = create<CopState>((set) => ({
  coupon: nullCop,
  setCoupon: (data) => set(() => ({ coupon: data })),
  resetCoupon: () => set(() => ({ coupon: initialCop })),

  setCouponDynamically: (grandTotal) => {
    let newCoupon: Cop = initialCop;

    // Determine the new coupon based on the grandTotal
    if (grandTotal > 500 && grandTotal < 700) {
      newCoupon = middleCop;
    } else if (grandTotal >= 700) {
      newCoupon = FinalCop;
    }

    // Get the current coupon state
    const currentCoupon = useCouponer.getState().coupon;

    // Check if the new coupon is different from the current coupon
    const { cart } = useCartsStore.getState();

    if (
      currentCoupon.code !== newCoupon.code &&
      !cart?.summary.coupon_applied!
    ) {
      // If different, update the coupon and set the delay for the modal
      set(() => ({ coupon: newCoupon }));

      // Trigger the modal after a delay
      setTimeout(() => {
        const { setCouponRevealModal } = useGlobalModals.getState();
        setCouponRevealModal(true);
      }, 5000); // Delay in milliseconds
    }
  },
}));
