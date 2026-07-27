"use client";

import React from "react";
import { motion } from "motion/react";
import { Mail } from "lucide-react";
import { profile } from "@/constant";

export const LicenseContactBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-[28px] border border-border bg-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl"
    >
      <div className="space-y-1.5">
        <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
          Commercial Permission & Custom Licensing
        </h3>
        <p className="text-xs font-mono text-muted-foreground max-w-xl leading-relaxed">
          Need a commercial license for client projects, agency work, or template distribution? Drop me an email.
        </p>
      </div>

      <a
        href={`mailto:${profile.email}?subject=License%20Inquiry%20-%20Aarab%20Nishchal%20Portfolio`}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-accent/40 bg-accent/10 hover:bg-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0"
      >
        <Mail className="w-4 h-4" />
        <span>Contact Aarab</span>
      </a>
    </motion.div>
  );
};
