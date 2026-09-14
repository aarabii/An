import nextflow_mockup from "@/assets/mockups/nextflow_mockup.webp";
import kodaarc_mockup from "@/assets/mockups/kodaarc_mockup.webp";
import ideascribe_mockup from "@/assets/mockups/ideascribe_mockup.webp";
import orphia_mockup from "@/assets/mockups/orphia_mockup.webp";
import testiq_mockup from "@/assets/mockups/testiq_mockup.webp";
import vidyamarg_mockup from "@/assets/mockups/vidyamarg_mockup.webp";

type Url = `http://${string}` | `https://${string}`;

type Status = "live" | "building" | "completed" | "archived";

interface BaseProject {
    title: string;
    description: string;
    image: string;
    github: Url;
    technologies: string[];
    status: Status;
    slug: string;
    content: string;
}

export type ProjectItem =
    | (BaseProject & {
          type: "website";
          demo: Url;
      })
    | (BaseProject & {
          type: "app" | "library" | "other";
          demo?: never;
      });

export const FEATURED_PROJECTS = [
    {
        title: "KodaArc",
        description:
            "A terminal-native AI coding assistant that can understand your codebase, plan changes, edit files, run commands, and manage Git through a conversational terminal interface.",
        image: kodaarc_mockup.src,
        github: "https://github.com/aarabii/kodaarc",
        technologies: [
            "Bun",
            "TypeScript",
            "React",
            "OpenTUI",
            "Hono",
            "Prisma",
            "PostgreSQL",
            "Anthropic",
            "OpenAI",
            "Gemini",
        ],
        status: "building",
        slug: "kodaarc",
        type: "app",
        content: "kodaarc.mdx",
    },
    {
        title: "Next Flow",
        description:
            "A visual AI workflow builder for creating, connecting, and running AI-powered workflows through an interactive node-based interface.",
        image: nextflow_mockup.src,
        github: "https://github.com/aarabii/next-flow",
        technologies: [
            "Next.js",
            "TypeScript",
            "React",
            "Tailwind CSS",
            "Shadcn UI",
            "Prisma",
            "Clerk",
            "Neon",
            "Trigger.dev",
            "Gemini",
            "React Flow",
            "Zustand",
            "Transloadit",
        ],
        status: "live",
        slug: "next-flow",
        type: "website",
        demo: "https://next-flow-automation.vercel.app",
        content: "next-flow.mdx",
    },
    {
        title: "TestIQ",
        description:
            "A local AI-powered unit testing assistant that uses RAG and Ollama to understand codebases, generate context-aware tests, analyze coverage, and explain failing tests.",
        image: testiq_mockup.src,
        github: "https://github.com/aarabii/testiq",
        technologies: [
            "Python",
            "Typer",
            "Tree-sitter",
            "LangChain",
            "ChromaDB",
            "Ollama",
            "Pytest",
            "RAG",
        ],
        status: "live",
        slug: "testiq",
        type: "app",
        content: "testiq.mdx",
    },
    {
        title: "IdeaScribe",
        description:
            "A developer-focused block-based note-taking application inspired by Notion, with rich editing, authentication, file uploads, and real-time data synchronization.",
        image: ideascribe_mockup.src,
        github: "https://github.com/aarabii/ideascribe",
        technologies: [
            "Next.js",
            "TypeScript",
            "React",
            "Tailwind CSS",
            "BlockNote",
            "Clerk",
            "Convex",
            "EdgeStore",
            "Zustand",
        ],
        status: "live",
        slug: "ideascribe",
        type: "website",
        demo: "https://ideascribe.vercel.app",
        content: "ideascribe.mdx",
    },
] satisfies ProjectItem[];

const OTHER_PROJECTS = [
    {
        title: "Vidya Marg",
        description:
            "An AI-powered adaptive learning platform that builds prerequisite knowledge graphs, assesses users with adaptive quizzes, and generates personalized learning paths.",
        image: vidyamarg_mockup.src,
        github: "https://github.com/aarabii/vidyamarg",
        technologies: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Framer Motion",
            "React Flow",
            "FastAPI",
            "Python",
            "Groq",
            "NetworkX",
            "Supabase",
            "BeautifulSoup",
        ],
        status: "completed",
        slug: "vidya-marg",
        type: "website",
        demo: "https://vidyamarg.aarab.me",
        content: "vidyamarg.mdx",
    },
    {
        title: "Orphia",
        description:
            "An experimental music-generation project that trains an RNN-LSTM model on symbolic music to generate new melodies.",
        image: orphia_mockup.src,
        github: "https://github.com/aarabii/orphia-notebook",
        technologies: [
            "Python",
            "Jupyter Notebook",
            "TensorFlow",
            "Keras",
            "music21",
            "Librosa",
            "NumPy",
        ],
        status: "archived",
        slug: "orphia",
        type: "other",
        content: "orphia.mdx",
    },
] satisfies ProjectItem[];

export const PROJECTS = [...FEATURED_PROJECTS, ...OTHER_PROJECTS];
