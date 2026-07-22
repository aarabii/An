"use client";

import { motion } from "motion/react";
import { profile } from "@/constant";

export const EducationSlide = () => {
  return (
    <motion.div
      key="slide-1"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-2"
    >
      <span className="text-xs uppercase tracking-widest text-secondary font-semibold">
        Education
      </span>
      <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
        {profile.education.uni}
      </h3>
      <p className="text-sm sm:text-base text-foreground/90 font-medium">
        {profile.education.degree} in {profile.education.major}
      </p>
      <div className="flex items-center gap-4 text-xs text-secondary pt-1">
        <span>Batch: {profile.education.batch}</span>
        <span>•</span>
        <span>
          {profile.education.location.city}, {profile.education.location.state}
        </span>
      </div>
    </motion.div>
  );
};
