"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

const DownOpacityAnimator = ({ children }: Props) => {
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const transition = {
    duration: 0.5,
    // delay: 0.2,
  };

  return (
    <motion.div
      variants={variants}
      transition={transition}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default DownOpacityAnimator;
