"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { SectionHeader } from "@/components/common";

export const BlogsHeader: React.FC = () => {
  return (
    <header className="space-y-6">
      {/* Top Navigation Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-accent transition-colors group px-3.5 py-2 rounded-xl border border-border bg-card/80 backdrop-blur-xl hover:border-card-border-hover"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Portfolio</span>
        </Link>
      </motion.div>

      {/* Section Header */}
      <div className="pt-4">
        <SectionHeader number="07" title="Blog & Articles" align="left" />
        <p className="text-xs sm:text-sm font-mono text-muted-foreground max-w-2xl leading-relaxed -mt-10">
          Technical writing, thoughts, tutorials, and deep-dives on full-stack development, AI, and software engineering.
        </p>
      </div>
    </header>
  );
};
