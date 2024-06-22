import { FC, Fragment } from "react";
import { motion } from "framer-motion";

interface TitleProps {
  title: string;
  subTitle?: string;
}

export const Title: FC<TitleProps> = ({ title, subTitle }) => {
  return (
    <Fragment>
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        whileHover={{
          scale: 1.05,
        }}
        className="mb-10 font-nasalization text-slate-200 text-center text-4xl"
      >
        {title}
        {subTitle && <span className="text-purple-200"> Me</span>}
      </motion.h2>
    </Fragment>
  );
};
