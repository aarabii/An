import * as React from "react";
import { ArrowUpRight, Star, GitFork } from "lucide-react";

import { type GitHubRepo } from "@/app/api/github/repos/route";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RepoCardProps {
    repo: GitHubRepo;
    className?: string;
}

const formatDate = (isoString: string): string => {
    try {
        const date = new Date(isoString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    } catch {
        return "";
    }
};

const RepoCard: React.FC<RepoCardProps> = ({ repo, className }) => {
    return (
        <Card
            className={cn(
                "group/repo flex w-full flex-col justify-between gap-4 rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-150 hover:border-border/80 hover:shadow-md",
                className
            )}
        >
            {/* Top Row: Repo Title & Stats */}
            <div className="flex items-start justify-between gap-4">
                <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/title flex items-center gap-1.5 font-heading text-base font-semibold tracking-tight text-foreground transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm min-w-0"
                >
                    <span className="truncate">{repo.name}</span>
                    <ArrowUpRight className="size-4 shrink-0 opacity-0 transition-opacity duration-150 group-hover/title:opacity-100" />
                </a>

                {/* Right side stats */}
                <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground select-none">
                    <div className="flex items-center gap-1" title={`${repo.stargazers_count} stars`}>
                        <Star className="size-3.5 text-chart-1" />
                        <span className="font-mono text-xs">{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1" title={`${repo.forks_count} forks`}>
                        <GitFork className="size-3.5 text-muted-foreground" />
                        <span className="font-mono text-xs">{repo.forks_count}</span>
                    </div>
                </div>
            </div>

            {/* Middle Row: Description if available */}
            {repo.description && (
                <p className="line-clamp-2 text-sm text-muted-foreground font-para leading-relaxed">
                    {repo.description}
                </p>
            )}

            {/* Bottom Row: Language & Updated Date */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground font-mono">
                {repo.language && (
                    <span className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-chart-2" />
                        <span>{repo.language}</span>
                    </span>
                )}
                {repo.updated_at && (
                    <span>
                        Updated {formatDate(repo.updated_at)}
                    </span>
                )}
            </div>
        </Card>
    );
};

export default RepoCard;
