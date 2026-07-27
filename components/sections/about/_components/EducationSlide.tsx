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
      className="flex flex-col gap-2.5"
    >
      <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
        // Education &amp; Background
      </span>
      <h3 className="font-heading text-lg sm:text-xl font-bold text-white leading-snug">
        {profile.education.uni}
      </h3>
      <p className="font-mono text-xs sm:text-sm text-neutral-300 font-medium">
        {profile.education.degree} in {profile.education.major}
      </p>
      <div className="flex items-center gap-3 font-mono text-xs text-neutral-400 pt-1">
        <span className="px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-accent">
          Batch: {profile.education.batch}
        </span>
        <span>•</span>
        <span>
          {profile.education.location.city}, {profile.education.location.state}
        </span>
      </div>
    </motion.div>
  );
};
