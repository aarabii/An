"use client";

import { motion } from "framer-motion";

export const SkillCard = ({
  title,
  Icon,
  className,
}: {
  title: string;
  Icon: React.FC;
  className?: string;
}) => {
  return (
    <div
      className={`${className} flex flex-row items-center justify-center gap-2 grayscale-[80%] hover:grayscale-0 transition-all duration-300 w-auto`}
    >
      <div className="h-8 w-8">
        <Icon />
      </div>
      <motion.small
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="text-center text-sm font-medium"
      >
        {title}
      </motion.small>
    </div>
  );
};
