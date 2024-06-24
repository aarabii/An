"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { NovaSquare } from "@/app/fonts";

interface TitleProps {
  title: string;
  subTitle?: string;
}

export const Title: FC<TitleProps> = ({ title, subTitle }) => {
  return (
    <motion.h2
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={`${NovaSquare.className} mb-10 font-nasalization text-slate-200 text-center text-5xl`}
    >
      {title}
      {subTitle && <span className="text-purple-300"> Me</span>}
    </motion.h2>
  );
};
