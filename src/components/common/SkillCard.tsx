import React, { FC } from "react";
import { motion } from "framer-motion";
import { Images } from "./Images";

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
        <Images
          url={icon}
          alt={title}
          width={40}
          height={40}
          className="rounded-lg  drop-shadow-md max-w-10 max-h-10"
        />
        <small className="text-slate-100 text-xs sm:text-lg">{title}</small>
      </div>
    </motion.div>
  );
};
