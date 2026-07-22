"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Code2, FolderGit2, Sparkles } from "lucide-react";

import { heading } from "@/app/fonts";
import { cn } from "@/lib/utils";

interface ProjectsHeaderProps {
  totalFeaturedCount: number;
}

export const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({
  totalFeaturedCount,
}) => {
  return (
    <header className="space-y-8">
      {/* Top Navigation Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between gap-4"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-accent transition-colors group px-3.5 py-2 rounded-xl border border-border/60 bg-card/60 backdrop-blur-xl shadow-sm hover:border-accent/40"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Portfolio</span>
        </Link>
      </motion.div>

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative rounded-3xl border border-border/60 bg-card/50 backdrop-blur-xl p-6 sm:p-10 overflow-hidden shadow-2xl"
      >
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent font-mono text-[11px] uppercase tracking-wider font-semibold">
              <FolderGit2 className="w-3.5 h-3.5" />
              Project Archive
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-semibold uppercase">
              <Sparkles className="w-3 h-3" />
              {totalFeaturedCount} Featured Works
            </span>
          </div>

          <h1
            className={cn(
              heading.className,
              "text-3xl sm:text-5xl uppercase tracking-wider text-primary font-bold"
            )}
          >
            Projects & Open Source
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed font-mono">
            A comprehensive collection of full-stack web applications, AI tools,
            CLI automation frameworks, and open-source GitHub repositories built by Aarab Nishchal.
          </p>
        </div>
      </motion.div>
    </header>
  );
};
