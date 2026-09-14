import type { Metadata } from "next";

import { PageNav } from "@/components/common";
import RepeatSeparator from "@/components/ui/repeat-separator";
import { AllProjects, GitHubRepos } from "./_components";

export const metadata: Metadata = {
    title: "Projects | Aarab Nishchal",
    description:
        "Curated full-stack applications, AI products, and open-source GitHub repositories by Aarab Nishchal.",
};

export default function ProjectsPage() {
    return (
        <div className="min-h-screen">
            {/* Breadcrumb Path Navigation */}
            <PageNav />
            <RepeatSeparator />

            {/* All Curated Projects (Featured & Other) */}
            <AllProjects />
            <RepeatSeparator />

            {/* GitHub Repositories (Search + Horizontal Cards + Infinite Scroll) */}
            <GitHubRepos />
            <RepeatSeparator />
        </div>
    );
}
