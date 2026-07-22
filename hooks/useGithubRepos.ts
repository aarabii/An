"use client";

import { useEffect, useMemo, useState } from "react";
import { Project } from "@/constant/projects";
import { GithubRepo } from "@/app/projects/_components/GithubRepoCard";

const REPOS_CACHE_KEY = "aarab_github_repos_data";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour TTL to prevent GitHub rate-limiting
const ITEMS_PER_PAGE = 6;

interface CachedReposPayload {
  data: GithubRepo[];
  timestamp: number;
}

export interface UseGithubReposReturn {
  allFilteredCount: number;
  displayedRepos: GithubRepo[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  remainingCount: number;
  visibleCount: number;
  loadMore: () => void;
  refetch: () => void;
}

export const useGithubRepos = (
  constantProjects: Project[],
  searchQuery: string
): UseGithubReposReturn => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const fetchRepos = async (ignoreCache = false) => {
    setLoading(true);
    setError(null);
    const now = Date.now();

    // Check localStorage cache unless explicitly ignored
    if (!ignoreCache) {
      try {
        const stored = localStorage.getItem(REPOS_CACHE_KEY);
        if (stored) {
          const cached: CachedReposPayload = JSON.parse(stored);
          if (cached && cached.timestamp && now - cached.timestamp < CACHE_TTL_MS) {
            setRepos(cached.data);
            setLoading(false);
            return;
          }
        }
      } catch {}
    }

    try {
      const res = await fetch(
        "https://api.github.com/users/aarabii/repos?sort=updated&per_page=100"
      );
      if (!res.ok) {
        if (res.status === 403) {
          throw new Error("GitHub API rate limit exceeded. Please try again later.");
        }
        throw new Error("Failed to fetch GitHub repositories");
      }
      const data: GithubRepo[] = await res.json();
      setRepos(data);

      // Save to localStorage
      try {
        const payload: CachedReposPayload = {
          data,
          timestamp: now,
        };
        localStorage.setItem(REPOS_CACHE_KEY, JSON.stringify(payload));
      } catch {}
    } catch (err: any) {
      setError(err.message || "Failed to load GitHub repositories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  // Filter out repos whose name matches any project in constant/projects.ts
  const filteredRepos = useMemo(() => {
    const normalize = (str: string) =>
      str.toLowerCase().replace(/[^a-z0-9]/g, "");

    const constantNames = constantProjects.map((p) => normalize(p.name));
    const constantGithubNames = constantProjects
      .map((p) => p.links?.github)
      .filter(Boolean)
      .map((url) => normalize((url as string).split("/").pop() || ""));

    return repos
      .filter((repo) => {
        const normRepo = normalize(repo.name);
        const isAlreadyInConstant =
          constantNames.includes(normRepo) ||
          constantGithubNames.includes(normRepo);
        return !isAlreadyInConstant;
      })
      .filter((repo) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          repo.name.toLowerCase().includes(q) ||
          (repo.description && repo.description.toLowerCase().includes(q)) ||
          (repo.language && repo.language.toLowerCase().includes(q))
        );
      });
  }, [repos, constantProjects, searchQuery]);

  const displayedRepos = useMemo(
    () => filteredRepos.slice(0, visibleCount),
    [filteredRepos, visibleCount]
  );

  const hasMore = visibleCount < filteredRepos.length;
  const remainingCount = Math.max(0, filteredRepos.length - visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const refetch = () => {
    fetchRepos(true);
  };

  return {
    allFilteredCount: filteredRepos.length,
    displayedRepos,
    loading,
    error,
    hasMore,
    remainingCount,
    visibleCount,
    loadMore,
    refetch,
  };
};
