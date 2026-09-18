import { SITE_CONFIG } from "./site_config";

/**
 * Structured Personal Information & Semantic Profile
 * Sourced directly from resume & official professional footprint
 */

export const SEO_PERSON = {
  name: "Aarab Nishchal",
  givenName: "Aarab",
  familyName: "Nishchal",
  alternateNames: ["Aarab", "aarabii"],
  gender: "https://schema.org/Male",
  jobTitle: "AI Engineer & Full-Stack Developer",
  summary:
    "AI Engineer building production AI features, LLM workflows, autonomous coding agents, and high-performance full-stack web applications.",
  url: SITE_CONFIG.url,
  image: `${SITE_CONFIG.url}/images/social_card.png`,
  email: SITE_CONFIG.contactEmail,
  telephone: SITE_CONFIG.phone,
  address: {
    addressLocality: "Katihar",
    addressRegion: "Bihar",
    addressCountry: "India",
  },
  currentRole: {
    role: "AI Engineer Intern",
    company: "Ascend HSI",
    website: "https://ascendhsi.com/",
    startDate: "2026-07-01",
    description:
      "Building AI-powered features for internal SaaS products, integrating LLM providers, and orchestrating autonomous AI agents across case management, CRM intelligence, and media placement systems.",
  },
  previousRole: {
    role: "Software Developer Intern",
    company: "Unstop",
    website: "https://unstop.com/",
    startDate: "2024-09-01",
    endDate: "2026-06-30",
    description:
      "Integrated AI-driven n8n automation workflows, engineered AI vendor assignment systems (60-70% time reduction), enhanced front-end UI, and managed CI/CD with Git & Jenkins.",
  },
  alumniOf: {
    name: "Kalinga Institute of Industrial Technology",
    alternateName: "KIIT University",
    degree: "Bachelor of Technology in Computer Science & Engineering",
    startDate: "2022",
    endDate: "2026",
  },
  sameAs: [
    "https://github.com/aarabii",
    "https://linkedin.com/in/aarab-nishchal",
    "https://x.com/aarab_ii",
    "https://instagram.com/aarab.ii",
    "https://leetcode.com/u/aarabii",
    "https://aarab.vercel.app",
    "https://facebook.com/zzcwc",
    "https://t.me/aarab_ii",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "AI Agents & Multi-Agent Architecture",
    "Large Language Models (LLMs)",
    "LangChain",
    "RAG Pipelines (Retrieval-Augmented Generation)",
    "Next.js & React 19",
    "TypeScript & JavaScript",
    "Python",
    "Hono & Node.js",
    "PostgreSQL, Neon & Supabase",
    "Prisma ORM",
    "ChromaDB & Vector Databases",
    "Trigger.dev & Workflow Orchestration",
    "n8n Automation",
    "Tailwind CSS & Shadcn UI",
    "Docker, CI/CD & Jenkins",
    "Full-Stack Web Architecture",
    "System Design & REST APIs",
  ],
  certifications: [
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
    },
    {
      name: "Scientific Computing with Python",
      issuer: "freeCodeCamp",
    },
    {
      name: "AMCAT Certified in Software Development & Database Management",
      issuer: "Aspiring Minds",
    },
    {
      name: "Problem Solving Certificate",
      issuer: "HackerRank",
    },
  ],
  flagshipProjects: [
    {
      name: "Koda-Arc",
      description:
        "Full-stack monorepo coding agent CLI with React 19 terminal UI, Hono API server, and Prisma 7/PostgreSQL layer.",
      technologies: [
        "React 19",
        "OpenTUI",
        "Hono",
        "Prisma 7",
        "PostgreSQL",
        "Bun",
        "Zod",
      ],
      github: "https://github.com/aarabii/koda-arc",
    },
    {
      name: "NextFlow",
      description:
        "Full-stack AI workflow builder with draggable canvas for composing LLM and media-processing pipelines.",
      technologies: [
        "Next.js 16",
        "React Flow",
        "Trigger.dev",
        "Gemini",
        "Transloadit",
        "Neon",
        "Prisma",
      ],
      github: "https://github.com/aarabii",
    },
    {
      name: "TestIQ",
      description:
        "CLI RAG pipeline using LangChain, ChromaDB, and Tree-sitter for AST-driven unit test generation.",
      technologies: [
        "LangChain",
        "ChromaDB",
        "Ollama",
        "Tree-sitter",
        "Python",
      ],
      github: "https://github.com/aarabii",
    },
    {
      name: "Ideascribe",
      description:
        "Developer note-taking application with BlockNote rich-text editing, Convex realtime sync, and Edge Store.",
      technologies: ["Convex", "Clerk", "React", "BlockNote", "Edge Store"],
      github: "https://github.com/aarabii",
    },
  ],
};
