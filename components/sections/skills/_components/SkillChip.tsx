"use client";

import { IconType } from "react-icons";
import { motion } from "motion/react";

export const SkillChip = ({
  LogoComponent,
  color,
  title,
}: {
  LogoComponent: IconType;
  color: string;
  title: string;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group flex items-center gap-3 px-4.5 py-2.5 rounded-xl border border-primary/15 bg-primary/8 backdrop-blur-md shadow-md hover:border-accent/40 transition-colors duration-300 cursor-default"
    >
      <LogoComponent
        className="size-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ color: color }}
      />
      <span className="text-sm font-medium text-primary whitespace-nowrap">
        {title}
      </span>
    </motion.div>
  );
};
