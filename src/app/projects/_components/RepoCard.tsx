import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { FaStar, FaCodeFork } from "react-icons/fa6";

import { type GitHubRepo } from "@/app/api/github/repos/route";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RepoCardProps {
    repo: GitHubRepo;
    className?: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Rust: "#dea584",
    Go: "#00ADD8",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    Shell: "#89e051",
    "Jupyter Notebook": "#DA5B0B",
};

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
    const langColor = repo.language
        ? LANGUAGE_COLORS[repo.language] ?? "#8b949e"
        : null;

    return (
        <Card
            className={cn(
                "group/repo flex w-full flex-col justify-between gap-3 rounded-xl border border-border bg-card/60 p-4 transition-all duration-200 hover:border-foreground/25 hover:bg-card/90 sm:p-5",
                className
            )}
        >
            {/* Top Row: Repo Title & Stats */}
            <div className="flex items-start justify-between gap-4">
                <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/title flex items-center gap-1.5 font-heading text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-primary sm:text-base"
                >
                    <span className="truncate">{repo.name}</span>
                    <ArrowUpRight className="size-3.5 shrink-0 opacity-0 transition-all duration-150 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 group-hover/title:opacity-100" />
                </a>

                {/* Right side stats with color icons */}
                <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground select-none">
                    <div className="flex items-center gap-1" title={`${repo.stargazers_count} stars`}>
                        <FaStar className="size-3.5 text-[#e3b341]" />
                        <span className="font-mono text-[0.6875rem]">{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1" title={`${repo.forks_count} forks`}>
                        <FaCodeFork className="size-3.5 text-[#58a6ff]" />
                        <span className="font-mono text-[0.6875rem]">{repo.forks_count}</span>
                    </div>
                </div>
            </div>

            {/* Middle Row: Description if available */}
            {repo.description && (
                <p className="line-clamp-2 text-xs/relaxed text-muted-foreground font-para">
                    {repo.description}
                </p>
            )}

            {/* Bottom Row: Language & Updated Date */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-[0.6875rem] text-muted-foreground font-mono">
                {repo.language && (
                    <span className="flex items-center gap-1.5">
                        <span
                            className="size-2 rounded-full"
                            style={{ backgroundColor: langColor ?? "#8b949e" }}
                        />
                        <span>{repo.language}</span>
                    </span>
                )}
                {repo.updated_at && (
                    <span className="text-muted-foreground/70">
                        Updated {formatDate(repo.updated_at)}
                    </span>
                )}
            </div>
        </Card>
    );
};

export default RepoCard;
