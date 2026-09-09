"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { SectionHeader } from "@/components/common";

export const ProjectsHeader: React.FC = () => {
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
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-accent transition-colors group px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-xl hover:border-neutral-700"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Portfolio</span>
        </Link>
      </motion.div>

      {/* Section Header with Main Page Numbering & Styling */}
      <div className="pt-4">
        <SectionHeader as="h1" number="06" title="Projects & Open Source" align="left" />
        <p className="text-xs sm:text-sm font-mono text-neutral-400 max-w-2xl leading-relaxed -mt-10">
          Projects, tools, and late-night experiments. Featured builds upfront,
          live GitHub repositories below.
        </p>
      </div>
    </header>
  );
};
