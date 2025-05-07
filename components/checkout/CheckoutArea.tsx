"use client";

import { useAddresses } from "@/store/account/addresses";
import CheckoutDataStep from "./CheckoutDataStep";
import CheckoutPayStep from "./CheckoutPayStep";
import { motion } from "framer-motion";

const CheckoutArea = () => {
  const { addresses } = useAddresses();

  return (
    <motion.div
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -25, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col space-y-2"
    >
      <CheckoutDataStep />
      {addresses && addresses.length > 0 && <CheckoutPayStep />}
    </motion.div>
  );
};

export default CheckoutArea;
