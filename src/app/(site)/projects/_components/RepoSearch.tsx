"use client";

import * as React from "react";
import { Search, X, ArrowUpRight, Star } from "lucide-react";

import { type GitHubRepo } from "@/app/api/github/repos/route";
import { cn } from "@/lib/utils";

interface RepoSearchProps {
    repos: GitHubRepo[];
    className?: string;
}

const RepoSearch: React.FC<RepoSearchProps> = ({ repos, className }) => {
    const [query, setQuery] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Top 3 matching repositories
    const topResults = React.useMemo(() => {
        const trimmed = query.trim().toLowerCase();
        if (!trimmed) return [];

        return repos
            .filter(
                (repo) =>
                    repo.name.toLowerCase().includes(trimmed) ||
                    (repo.description && repo.description.toLowerCase().includes(trimmed))
            )
            .slice(0, 3);
    }, [query, repos]);

    // Close dropdown on click outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className={cn("relative w-full", className)}>
            {/* Search Input Bar */}
            <div className="relative flex items-center">
                <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Search GitHub repositories..."
                    className={cn(
                        "h-10 w-full rounded-md border border-input bg-muted/50 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-150",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    )}
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => {
                            setQuery("");
                            setIsOpen(false);
                        }}
                        className="absolute right-3 flex size-5 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <X className="size-4" />
                        <span className="sr-only">Clear search</span>
                    </button>
                )}
            </div>

            {/* Dropdown with top 3 results */}
            {isOpen && query.trim().length > 0 && (
                <div className="absolute top-full left-0 z-50 mt-1.5 w-full overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 duration-150">
                    {topResults.length > 0 ? (
                        <div className="flex flex-col gap-1">
                            <div className="px-2 py-1 text-xs font-medium tracking-wider text-muted-foreground uppercase font-mono">
                                Top Results ({topResults.length})
                            </div>
                            {topResults.map((repo) => (
                                <a
                                    key={`search-${repo.id}`}
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsOpen(false)}
                                    className="group/item flex items-center justify-between rounded-md p-2 transition-colors duration-150 hover:bg-accent hover:text-accent-foreground"
                                >
                                    <div className="flex flex-1 flex-col gap-0.5 overflow-hidden pr-2">
                                        <div className="flex items-center gap-1.5 font-para text-sm font-medium text-foreground group-hover/item:text-accent-foreground">
                                            <span className="truncate">{repo.name}</span>
                                            <ArrowUpRight className="size-3.5 shrink-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-150" />
                                        </div>
                                        {repo.description && (
                                            <p className="truncate text-xs text-muted-foreground font-para">
                                                {repo.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground font-mono">
                                        {repo.language && (
                                            <span className="rounded-sm bg-muted px-1.5 py-0.5 text-[0.6875rem]">
                                                {repo.language}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1">
                                            <Star className="size-3 text-chart-1" />
                                            {repo.stargazers_count}
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="px-3 py-4 text-center text-sm text-muted-foreground font-para">
                            No repositories found matching &ldquo;{query}&rdquo;
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default RepoSearch;
