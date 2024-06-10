import { FC } from "react";
import { motion } from "framer-motion";
import localFont from "next/font/local";

import { nasalizationLocation } from "@/util/fontLocation";

const nasalization = localFont({
  src: nasalizationLocation,
});

interface TitleProps {
  title: string;
  subTitle?: string;
}

export const Title: FC<TitleProps> = ({ title, subTitle }) => {
  return (
    <motion.h2
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.05,
      }}
      className={`${nasalization.className} mb-10 text-slate-200 text-center text-4xl`}
    >
      {title}
      {subTitle && <span className="text-purple-200"> Me</span>}
    </motion.h2>
  );
};
