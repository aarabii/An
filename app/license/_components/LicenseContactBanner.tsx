"use client";

import React from "react";
import { motion } from "motion/react";
import { Mail } from "lucide-react";

import { heading } from "@/app/fonts";
import { profile } from "@/constant";
import { cn } from "@/lib/utils";

export const LicenseContactBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-16 rounded-3xl border border-primary/20 bg-linear-to-r from-accent/15 via-card/50 to-secondary/15 backdrop-blur-xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl"
    >
      <div className="space-y-2 text-center sm:text-left">
        <h3
          className={cn(
            heading.className,
            "text-xl sm:text-2xl uppercase tracking-wider text-primary font-bold"
          )}
        >
          Need a Custom Commercial License?
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground font-mono max-w-xl">
          Have questions about using this codebase for commercial projects,
          agency deliverables, or custom development? Feel free to reach out.
        </p>
      </div>

      <a
        href={`mailto:${profile.email}?subject=License%20Inquiry%20-%20Aarab%20Nishchal%20Portfolio`}
        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-accent/25 hover:scale-105 shrink-0"
      >
        <Mail className="w-4 h-4" />
        <span>Contact Author</span>
      </a>
    </motion.div>
  );
};
