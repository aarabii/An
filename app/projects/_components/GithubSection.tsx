"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, Loader2, RefreshCw, Search } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import { Project } from "@/constant/projects";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import { cn } from "@/lib/utils";
import { GithubRepoCard } from "./GithubRepoCard";

interface GithubSectionProps {
  constantProjects: Project[];
}

export const GithubSection: React.FC<GithubSectionProps> = ({
  constantProjects,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    allFilteredCount,
    displayedRepos,
    loading,
    error,
    hasMore,
    remainingCount,
    loadMore,
    refetch,
  } = useGithubRepos(constantProjects, searchQuery);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6 pt-10 border-t border-border/40"
    >
      {/* Section Title & Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
            <FaGithub className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-300">
              // More Repositories on GitHub
            </h2>
            <p className="text-[11px] font-mono text-neutral-500">
              Public repos from @aarabii
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Filter repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card/80 border border-border rounded-xl pl-9 pr-3 py-1.5 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/60 transition-colors backdrop-blur-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>

          {/* Refresh Cache Button */}
          <button
            onClick={refetch}
            disabled={loading}
            className="p-2 rounded-xl border border-border bg-card hover:bg-card-hover text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-50"
            title="Refetch GitHub API"
            aria-label="Refresh GitHub Repos"
          >
            <RefreshCw
              className={cn("w-3.5 h-3.5", loading && "animate-spin text-accent")}
            />
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && displayedRepos.length === 0 && (
        <div className="py-16 flex flex-col items-center justify-center gap-3 text-muted-foreground font-mono text-xs">
          <Loader2 className="w-6 h-6 animate-spin text-accent" />
          <span>Fetching GitHub repositories...</span>
        </div>
      )}

      {/* Error State */}
      {error && displayedRepos.length === 0 && (
        <div className="p-6 rounded-2xl border border-error-border bg-error-bg font-mono text-xs text-error-foreground text-center">
          <p>Unable to load GitHub repositories: {error}</p>
          <button
            onClick={refetch}
            className="mt-3 px-4 py-1.5 rounded-lg border border-error-border bg-error-bg text-error-foreground hover:bg-error-border/30 transition-colors cursor-pointer"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Grid of Repos & Load More Button */}
      {displayedRepos.length > 0 && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedRepos.map((repo) => (
              <GithubRepoCard key={repo.id} repo={repo} />
            ))}
          </div>

          {/* Load More Toolbar & Progress Indicator */}
          <div className="flex flex-col items-center justify-center gap-3 pt-4 border-t border-border/40 font-mono text-xs">
            <span className="text-muted-foreground text-[11px]">
              Showing {displayedRepos.length} of {allFilteredCount} repositories
            </span>

            {hasMore && (
              <button
                onClick={loadMore}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-primary/20 bg-card/60 hover:bg-card hover:border-accent/40 text-foreground transition-all duration-200 cursor-pointer shadow-md font-semibold active:scale-95 group"
              >
                <span>Load More ({remainingCount} remaining)</span>
                <ChevronDown className="w-4 h-4 text-accent group-hover:translate-y-0.5 transition-transform" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && displayedRepos.length === 0 && (
        <div className="py-12 text-center font-mono text-xs text-muted-foreground border border-dashed border-border/60 rounded-2xl p-6">
          No matching GitHub repositories found.
        </div>
      )}
    </motion.section>
  );
};
