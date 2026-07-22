export interface Project {
  name: string;
  description: string;
  technologies: string[];
  links: {
    live?: string;
    github?: string;
  };
}

export const selected_works: Project[] = [
  {
    name: "KodaArc",
    description:
      "A terminal-native AI coding CLI designed for an interactive developer experience, featuring session management, a command palette, and a customizable theme system.",
    technologies: [
      "TypeScript",
      "React",
      "Bun",
      "OpenTUI",
      "Hono",
      "Gemini",
      "Vercel AI SDK",
      "Prisma",
      "Neon",
    ],
    links: {
      github: "https://github.com/aarabii/kodaarc",
    },
  },
  {
    name: "Next Flow",
    description:
      "A workflow automation platform inspired by n8n, featuring a visual node-based workflow builder, asynchronous task execution, AI integrations, and persistent workflow state.",
    technologies: [
      "React",
      "React Flow",
      "Zustand",
      "Trigger.dev",
      "Gemini API",
      "Transloadit",
      "Neon",
      "PostgreSQL",
      "Prisma",
    ],
    links: {
      live: "https://next-flow-automation.vercel.app/",
      github: "https://github.com/aarabii/next-flow",
    },
  },
  {
    name: "TestIQ",
    description:
      "A CLI-based RAG pipeline for intelligent code analysis and test generation, using AST-level code chunking, local LLM inference, vector retrieval, and a self-correcting validation loop.",
    technologies: [
      "Python",
      "LangChain",
      "ChromaDB",
      "Ollama",
      "CodeLlama",
      "Tree-sitter",
      "RAG",
    ],
    links: {
      github: "https://github.com/aarabii/testiq",
    },
  },
  {
    name: "Ideascribe",
    description:
      "A note-taking application with a modern block-based editor and real-time data synchronization for creating and organizing rich, structured notes.",
    technologies: ["Next.js", "TypeScript", "Convex", "BlockNote"],
    links: {
      github: "https://github.com/aarabii/ideascribe",
      live: "https://ideascribe.vercel.app/",
    },
  },
];

export const works: Project[] = [
  {
    name: "VidyaMarg",
    description:
      "A full-stack AI-powered learning path generator that creates personalized, structured learning roadmaps with graph-based topic relationships and an interactive visual learning experience.",
    technologies: [
      "Next.js",
      "FastAPI",
      "LLaMA 3.1 70B",
      "Groq",
      "NetworkX",
      "React Flow",
      "Supabase",
    ],
    links: {},
  },

  {
    name: "Curely",
    description:
      "A real-time voice AI medical assistant that enables natural voice conversations through speech recognition, intelligent multi-model routing, and low-latency AI responses.",
    technologies: [
      "VAPI",
      "Whisper",
      "Gemini",
      "OpenRouter",
      "LLM",
      "Voice AI",
    ],
    links: {},
  },
  {
    name: "Orphia",
    description:
      "An AI-powered text-to-music generation platform that transforms natural language prompts into generated music using deep learning-based music generation models.",
    technologies: [
      "Next.js",
      "Python",
      "Meta MusicGen",
      "PyTorch",
      "Hugging Face",
    ],
    links: {},
  },
];
