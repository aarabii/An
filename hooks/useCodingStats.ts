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

export const useCodingStats = (): CodingStats => {
  const [stats, setStats] = useState<CodingStats>({
    github: null,
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;

    const githubHandle =
      socials.find((s) => s.name.toLowerCase() === "github")?.handle || "aarabii";

    const fetchStats = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${githubHandle}`);
        if (!res.ok) throw new Error("Failed to fetch GitHub stats");
        const data = await res.json();

        if (isMounted) {
          setStats({
            github: {
              repos: data.public_repos ?? 0,
              followers: data.followers ?? 0,
              following: data.following ?? 0,
              gists: data.public_gists ?? 0,
              handle: githubHandle,
            },
            loading: false,
          });
        }
      } catch {
        if (isMounted) {
          setStats({
            github: null,
            loading: false,
          });
        }
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return stats;
};
