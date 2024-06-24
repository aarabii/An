"use client";

import { FC } from "react";
import { motion } from "framer-motion";

interface TechClipProps {
  name: string;
  keyValue?: number;
}

export const Techclip: FC<TechClipProps> = ({ keyValue, name }) => {
  return (
    <motion.span
      key={keyValue}
      className="relative inline-flex items-center px-2 py-1 text-sm mr-2 mt-4 text-slate-200 bg-purple-800 rounded font-light capitalize"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <span className="relative z-10">{name}</span>
    </motion.span>
  );
};
