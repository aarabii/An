"use client";

import * as React from "react";
import { Container, Title } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { type GitHubRepo } from "@/app/api/github/repos/route";
import RepoCard from "./RepoCard";
import RepoSearch from "./RepoSearch";

const PAGE_SIZE = 10;

const GitHubRepos: React.FC = () => {
    const [repos, setRepos] = React.useState<GitHubRepo[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);

    const loadSentinelRef = React.useRef<HTMLDivElement>(null);

    const loadRepos = React.useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/github/repos");
            if (!res.ok) {
                throw new Error("Failed to load GitHub repositories");
            }
            const data: GitHubRepo[] = await res.json();
            setRepos(data);
        } catch (err: unknown) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to load repositories"
            );
        } finally {
            setIsLoading(false);
        }
    }, []);

    React.useEffect(() => {
        let isMounted = true;

        fetch("/api/github/repos")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to load GitHub repositories");
                }
                return res.json();
            })
            .then((data: GitHubRepo[]) => {
                if (isMounted) {
                    setRepos(data);
                    setIsLoading(false);
                }
            })
            .catch((err: unknown) => {
                if (isMounted) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Failed to load repositories"
                    );
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    // IntersectionObserver for auto-infinite loading when scrolling near the bottom
    React.useEffect(() => {
        if (isLoading || visibleCount >= repos.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, repos.length));
                }
            },
            { rootMargin: "150px" }
        );

        const currentSentinel = loadSentinelRef.current;
        if (currentSentinel) {
            observer.observe(currentSentinel);
        }

        return () => {
            if (currentSentinel) {
                observer.unobserve(currentSentinel);
            }
        };
    }, [isLoading, visibleCount, repos.length]);

    const visibleRepos = React.useMemo(() => {
        return repos.slice(0, visibleCount);
    }, [repos, visibleCount]);

    const hasMore = visibleCount < repos.length;

    return (
        <Container id="repositories">
            <Title heading="GitHub Repositories" />

            <div className="flex flex-col gap-6 p-5 sm:p-8">
                {/* Search Bar */}
                <RepoSearch repos={repos} />

                {/* Loading Skeleton */}
                {isLoading && (
                    <div className="flex flex-col gap-4">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <Skeleton
                                key={`skeleton-${idx}`}
                                className="h-28 w-full rounded-xl bg-card/60"
                            />
                        ))}
                    </div>
                )}

                {/* Error State */}
                {error && !isLoading && (
                    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
                        <p className="text-xs text-destructive">{error}</p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={loadRepos}
                        >
                            Try again
                        </Button>
                    </div>
                )}

                {/* Repositories Cards List */}
                {!isLoading && !error && (
                    <div className="flex flex-col gap-3 sm:gap-4">
                        {visibleRepos.map((repo) => (
                            <RepoCard key={repo.id} repo={repo} />
                        ))}
                    </div>
                )}

                {/* Infinite Scroll Sentinel & Load More Option */}
                {hasMore && !isLoading && (
                    <div className="flex flex-col items-center justify-center pt-2">
                        {/* Sentinel target for IntersectionObserver */}
                        <div ref={loadSentinelRef} className="h-4 w-full" />

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setVisibleCount((prev) =>
                                    Math.min(prev + PAGE_SIZE, repos.length)
                                )
                            }
                            className="font-mono text-xs"
                        >
                            Load more repositories ({repos.length - visibleCount} remaining)
                        </Button>
                    </div>
                )}

                {/* End of list indicator */}
                {!hasMore && !isLoading && repos.length > 0 && (
                    <p className="pt-2 text-center text-xs text-muted-foreground/60 font-mono">
                        Showing all {repos.length} repositories
                    </p>
                )}
            </div>
        </Container>
    );
};

export default GitHubRepos;
