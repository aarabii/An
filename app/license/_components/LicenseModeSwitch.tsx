"use client";

import React from "react";
import { motion } from "motion/react";
import { Code2, FileText, Layers, Search } from "lucide-react";

import { cn } from "@/lib/utils";

interface LicenseModeSwitchProps {
  activeTab: "overview" | "document" | "code";
  setActiveTab: (tab: "overview" | "document" | "code") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const LicenseModeSwitch: React.FC<LicenseModeSwitchProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 my-8"
    >
      {/* Tab Switcher */}
      <div className="flex items-center p-1 rounded-2xl bg-muted/60 border border-border/60 backdrop-blur-md self-start sm:self-auto shadow-inner">
        <button
          onClick={() => setActiveTab("overview")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer",
            activeTab === "overview"
              ? "bg-card text-accent shadow-md border border-border/60 font-semibold"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Interactive Overview</span>
        </button>

        <button
          onClick={() => setActiveTab("document")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer",
            activeTab === "document"
              ? "bg-card text-accent shadow-md border border-border/60 font-semibold"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Full Document</span>
        </button>

        <button
          onClick={() => setActiveTab("code")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer",
            activeTab === "code"
              ? "bg-card text-accent shadow-md border border-border/60 font-semibold"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Raw Code</span>
        </button>
      </div>

      {/* Search Input Bar */}
      {activeTab !== "code" && (
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search license terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card/60 border border-border/60 rounded-xl pl-9 pr-8 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent/60 transition-colors backdrop-blur-md shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
};
