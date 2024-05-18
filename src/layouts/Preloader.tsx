import { motion } from "framer-motion";
import { FC } from "react";
import data from "@/constants/details.json";

interface H1ComponentProps {
  name: string;
  y_initialValue: number;
}

const H1_Compoent: FC<H1ComponentProps> = ({ name, y_initialValue }) => {
  return (
    <motion.h1
      initial={{ y: y_initialValue, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="text-neutral-200 font-nasalization"
    >
      {name}
    </motion.h1>
  );
};

export const Preloader = () => {
  return (
    <div className="overflow-x-hidden w-screen h-screen">
      <div className="flex items-center justify-center fixed h-full w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, }}
          transition={{ duration: 1 }}
          className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
        ></motion.div>
        <div className="flex justify-center items-center tracking-preloaderSpacing mx-auto container text-2xl text-neutral-400">
          <H1_Compoent name={data.first_name} y_initialValue={100} />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            /
          </motion.span>
          <H1_Compoent name={data.last_name} y_initialValue={-100} />
        </div>
      </div>
    </div>
  );
};
