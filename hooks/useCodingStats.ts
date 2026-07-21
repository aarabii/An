"use client";

import { useState, useEffect } from "react";
import { socials } from "@/constant";

export interface GithubStats {
  repos: number;
  followers: number;
  following: number;
  gists: number;
  handle: string;
}

export interface CodingStats {
  github: GithubStats | null;
  loading: boolean;
}

interface CachedStats {
  data: GithubStats;
  timestamp: number;
}

const STORAGE_KEY = "aarab's-portfolio-data";
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export const useCodingStats = (): CodingStats => {
  const [stats, setStats] = useState<CodingStats>({
    github: null,
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;

    const githubHandle =
      socials.find((s) => s.name.toLowerCase() === "github")?.handle ||
      "aarabii";

    const loadStats = async () => {
      let cached: CachedStats | null = null;
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          cached = JSON.parse(stored);
        }
      } catch {}

      const now = Date.now();
      const isCacheValid =
        cached &&
        cached.timestamp &&
        cached.data &&
        now - cached.timestamp < ONE_WEEK_MS;

      if (isCacheValid && cached) {
        if (isMounted) {
          setStats({
            github: cached.data,
            loading: false,
          });
        }
        return;
      }

      try {
        const res = await fetch(`https://api.github.com/users/${githubHandle}`);
        if (!res.ok) throw new Error("Failed to fetch GitHub stats");
        const data = await res.json();

        const githubData: GithubStats = {
          repos: data.public_repos ?? 0,
          followers: data.followers ?? 0,
          following: data.following ?? 0,
          gists: data.public_gists ?? 0,
          handle: githubHandle,
        };

        try {
          const cachePayload: CachedStats = {
            data: githubData,
            timestamp: now,
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cachePayload));
        } catch {}

        if (isMounted) {
          setStats({
            github: githubData,
            loading: false,
          });
        }
      } catch {
        if (isMounted) {
          setStats({
            github: cached?.data || null,
            loading: false,
          });
        }
      }
    };

    loadStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return stats;
};
