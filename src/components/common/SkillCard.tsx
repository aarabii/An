import React, { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface SkillCardProps {
  title: string;
  icon: string;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export const SkillCard: FC<SkillCardProps> = ({
  title,
  icon,
  onHoverStart,
  onHoverEnd,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="p-4 md:p-2 min-w-fit h-fit flex flex-col items-center justify-center border-b-2 border-purple-400 m-3 rounded-lg bg-slate-200 bg-opacity-20"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <div className="flex flex-row items-center justify-center gap-3">
        <Image
          src={icon}
          alt={title}
          width={40}
          height={40}
          className="rounded-lg  drop-shadow-md"
        />
        <small className="text-slate-100 text-xs sm:text-lg">{title}</small>
      </div>
    </motion.div>
  );
};
