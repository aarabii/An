import { NextResponse } from "next/server";
import { SOCIALS } from "@/constant";

export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    updated_at: string;
    fork: boolean;
}

const FALLBACK_REPOS: GitHubRepo[] = [
    {
        id: 798895785,
        name: "An",
        full_name: "aarabii/An",
        html_url: "https://github.com/aarabii/An",
        description: "My space on web (Personal portfolio website)",
        stargazers_count: 11,
        forks_count: 7,
        language: "TypeScript",
        updated_at: "2026-09-14T13:01:10Z",
        fork: false,
    },
    {
        id: 1262624152,
        name: "KodaArc",
        full_name: "aarabii/KodaArc",
        html_url: "https://github.com/aarabii/KodaArc",
        description: "A terminal-native AI coding assistant that plans changes, edits files, and manages Git.",
        stargazers_count: 4,
        forks_count: 1,
        language: "TypeScript",
        updated_at: "2026-09-12T17:29:17Z",
        fork: false,
    },
    {
        id: 1278985479,
        name: "next-flow",
        full_name: "aarabii/next-flow",
        html_url: "https://github.com/aarabii/next-flow",
        description: "A visual AI workflow builder for creating, connecting, and running AI-powered workflows.",
        stargazers_count: 3,
        forks_count: 0,
        language: "TypeScript",
        updated_at: "2026-09-10T14:14:13Z",
        fork: false,
    },
    {
        id: 1187298342,
        name: "Testiq",
        full_name: "aarabii/Testiq",
        html_url: "https://github.com/aarabii/Testiq",
        description: "A local AI-powered unit testing assistant using RAG and Ollama to generate context-aware tests.",
        stargazers_count: 2,
        forks_count: 0,
        language: "Python",
        updated_at: "2026-08-23T15:31:10Z",
        fork: false,
    },
    {
        id: 807663879,
        name: "ideascribe",
        full_name: "aarabii/ideascribe",
        html_url: "https://github.com/aarabii/ideascribe",
        description: "A developer-focused block-based note-taking application inspired by Notion.",
        stargazers_count: 2,
        forks_count: 0,
        language: "TypeScript",
        updated_at: "2026-08-09T02:57:46Z",
        fork: false,
    },
    {
        id: 1244321998,
        name: "flight-app",
        full_name: "aarabii/flight-app",
        html_url: "https://github.com/aarabii/flight-app",
        description: "Flight booking and schedule management application with modern UI.",
        stargazers_count: 1,
        forks_count: 0,
        language: "TypeScript",
        updated_at: "2026-07-21T17:49:47Z",
        fork: false,
    },
    {
        id: 1227132689,
        name: "magicpin-assignment",
        full_name: "aarabii/magicpin-assignment",
        html_url: "https://github.com/aarabii/magicpin-assignment",
        description: "Python backend assignment showcasing optimized caching and data processing.",
        stargazers_count: 0,
        forks_count: 0,
        language: "Python",
        updated_at: "2026-06-02T09:42:02Z",
        fork: false,
    },
    {
        id: 1223916714,
        name: "praxso",
        full_name: "aarabii/praxso",
        html_url: "https://github.com/aarabii/praxso",
        description: "Full-stack web application built with modern reactive state management.",
        stargazers_count: 0,
        forks_count: 0,
        language: "TypeScript",
        updated_at: "2026-05-18T11:20:00Z",
        fork: false,
    },
];

export async function GET() {
    try {
        const githubSocial = SOCIALS.find((s) => s.name.toLowerCase() === "github");
        const username = githubSocial?.handle || "aarabii";

        const response = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
            {
                headers: {
                    Accept: "application/vnd.github.v3+json",
                    "User-Agent": "portfolio-app",
                },
                next: {
                    revalidate: 3600, // ISR cache for 1 hour
                },
            }
        );

        if (!response.ok) {
            console.warn(`GitHub API error: ${response.status}. Using fallback repos.`);
            return NextResponse.json(FALLBACK_REPOS);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            return NextResponse.json(FALLBACK_REPOS);
        }

        interface GitHubApiItem {
            id: number;
            name: string;
            full_name: string;
            html_url: string;
            description: string | null;
            stargazers_count?: number;
            forks_count?: number;
            language: string | null;
            updated_at: string;
            fork?: boolean;
        }

        const repos: GitHubRepo[] = (data as GitHubApiItem[]).map((item) => ({
            id: item.id,
            name: item.name,
            full_name: item.full_name,
            html_url: item.html_url,
            description: item.description,
            stargazers_count: item.stargazers_count ?? 0,
            forks_count: item.forks_count ?? 0,
            language: item.language,
            updated_at: item.updated_at,
            fork: item.fork ?? false,
        }));

        return NextResponse.json(repos);
    } catch (error) {
        console.error("Failed to fetch GitHub repos:", error);
        return NextResponse.json(FALLBACK_REPOS);
    }
}
