// SkillsCard.tsx
"use client";

import { motion } from "motion/react";

export const SkillCard = ({
  title,
  Icon,
  color,
  className,
}: {
  title: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
  className?: string;
}) => {
  return (
    <motion.div
      className={`${className} flex flex-row items-center justify-center gap-4 grayscale-[90%] hover:grayscale-0 transition-all duration-300 px-3 py-1 w-fit h-fit group`}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="h-8 w-8 flex items-center justify-center flex-shrink-0"
        whileHover={{ rotate: 15, scale: 1.2 }}
        transition={{ duration: 0.2 }}
      >
        {/* Change made here: using inline style for color */}
        <Icon
          className={`w-6 h-6 text-gray-400 transition-colors duration-300`}
          style={{ color: color }} // Apply the color directly as an inline style
        />
      </motion.div>
      <motion.small
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="text-sm text-secondry font-semibold group-hover:text-primary-foreground/90"
      >
        {title}
      </motion.small>
    </motion.div>
  );
};
