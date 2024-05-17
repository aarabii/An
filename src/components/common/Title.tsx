import { FC } from "react";
import { motion } from "framer-motion";

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
      className="mb-10 font-nasalization text-center text-4xl"
    >
      {title}
      {subTitle && <span className="text-neutral-500"> Me</span>}
    </motion.h2>
  );
};
