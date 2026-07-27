"use client";

import React from "react";
import { motion } from "motion/react";
import { ExternalLink, GitFork, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
  fork: boolean;
}

interface GithubRepoCardProps {
  repo: GithubRepo;
}

export const GithubRepoCard: React.FC<GithubRepoCardProps> = ({ repo }) => {
  const formattedDate = new Date(repo.updated_at).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <motion.a
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between p-5 rounded-2xl border border-border bg-card/80 backdrop-blur-xl hover:border-card-border-hover transition-colors duration-300 shadow-md overflow-hidden"
    >
      {/* Background glow on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/15 transition-all pointer-events-none" />

      <div className="space-y-3 relative z-10">
        {/* Card Header: Icon, Repo Name, External Link Indicator */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 group-hover:scale-105 transition-transform">
              <FaGithub className="w-4 h-4" />
            </div>
            <h3 className="font-mono text-sm font-bold text-foreground group-hover:text-accent transition-colors truncate">
              {repo.name}
            </h3>
          </div>

          <ExternalLink className="w-4 h-4 text-muted-foreground/60 group-hover:text-accent transition-colors shrink-0 mt-1" />
        </div>

        {/* Description */}
        <p className="font-mono text-xs text-muted-foreground line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {repo.description || "No description provided."}
        </p>

        {/* Topics / Tags */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {repo.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="px-2 py-0.5 rounded-md border border-accent/20 bg-accent/10 font-mono text-[10px] text-accent/90"
              >
                #{topic}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer: Metadata (Language, Stars, Forks, Date) */}
      <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between font-mono text-[11px] text-muted-foreground relative z-10">
        <div className="flex items-center gap-3">
          {repo.language && (
            <span className="flex items-center gap-1.5 text-foreground/80 font-semibold">
              <span className="w-2 h-2 rounded-full bg-accent" />
              {repo.language}
            </span>
          )}

          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1 text-amber-400">
              <Star className="w-3 h-3 fill-amber-400/20" />
              {repo.stargazers_count}
            </span>
          )}

          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1 text-muted-foreground">
              <GitFork className="w-3 h-3" />
              {repo.forks_count}
            </span>
          )}
        </div>

        <span className="text-[10px] text-muted-foreground/70">
          Updated {formattedDate}
        </span>
      </div>
    </motion.a>
  );
};
