"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

const DownOpacityAnimator = ({ children }: Props) => {
  const variants = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  };

  const transition = {
    duration: 0.6,
    delay: 0.2,
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
