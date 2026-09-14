import type { IconType } from "react-icons";

import {
    FaAngular,
    FaAws,
    FaCss3Alt,
    FaDocker,
    FaGitAlt,
    FaGithub,
    FaHtml5,
    FaNodeJs,
    FaPython,
    FaReact,
    FaSquareJs,
} from "react-icons/fa6";

import {
    SiDjango,
    SiExpress,
    SiFastapi,
    SiGooglegemini,
    SiLangchain,
    SiMongodb,
    SiMysql,
    SiNextdotjs,
    SiOllama,
    SiPostman,
    SiPytorch,
    SiSupabase,
    SiTailwindcss,
    SiTypescript,
} from "react-icons/si";

import { BiLogoPostgresql } from "react-icons/bi";
import { MdApi } from "react-icons/md";
import { TbVectorTriangle } from "react-icons/tb";
import { TfiVector } from "react-icons/tfi";

interface Skill {
    title: string;
    icon: IconType;
    color?: string;
}

interface SkillCategory {
    title: string;
    skills: Skill[];
}

export const SKILLS = [
    {
        title: "Languages & Databases",
        skills: [
            {
                title: "TypeScript",
                icon: SiTypescript,
                color: "#3178C6",
            },
            {
                title: "JavaScript",
                icon: FaSquareJs,
                color: "#F7DF1E",
            },
            {
                title: "HTML5",
                icon: FaHtml5,
                color: "#E34F26",
            },
            {
                title: "CSS3",
                icon: FaCss3Alt,
                color: "#1572B6",
            },
            {
                title: "Python",
                icon: FaPython,
                color: "#3776AB",
            },
            {
                title: "MongoDB",
                icon: SiMongodb,
                color: "#47A248",
            },
            {
                title: "PostgreSQL",
                icon: BiLogoPostgresql,
                color: "#4169E1",
            },
            {
                title: "MySQL",
                icon: SiMysql,
                color: "#4479A1",
            },
        ],
    },
    {
        title: "Frameworks & Libraries",
        skills: [
            {
                title: "React",
                icon: FaReact,
                color: "#61DAFB",
            },
            {
                title: "Next.js",
                icon: SiNextdotjs,
                color: "#000000",
            },
            {
                title: "Express.js",
                icon: SiExpress,
                color: "#000000",
            },
            {
                title: "Tailwind CSS",
                icon: SiTailwindcss,
                color: "#06B6D4",
            },
            {
                title: "Node.js",
                icon: FaNodeJs,
                color: "#339933",
            },
            {
                title: "Angular",
                icon: FaAngular,
                color: "#DD0031",
            },
            {
                title: "Django",
                icon: SiDjango,
                color: "#092E20",
            },
            {
                title: "FastAPI",
                icon: SiFastapi,
                color: "#009688",
            },
        ],
    },
    {
        title: "AI, ML & LLMs",
        skills: [
            {
                title: "PyTorch",
                icon: SiPytorch,
                color: "#EE4C2C",
            },
            {
                title: "LangChain",
                icon: SiLangchain,
                color: "#1C3C3A",
            },
            {
                title: "Ollama",
                icon: SiOllama,
                color: "#000000",
            },
            {
                title: "Gemini",
                icon: SiGooglegemini,
                color: "#1A73E8",
            },
            {
                title: "ChromaDB",
                icon: TfiVector,
                color: "#0052FF",
            },
            {
                title: "Vector Embeddings",
                icon: TbVectorTriangle,
                color: "#FF6B6B",
            },
            {
                title: "Groq / VAPI",
                icon: MdApi,
                color: "#F55036",
            },
        ],
    },
    {
        title: "Tools, Platforms & DevOps",
        skills: [
            {
                title: "Git",
                icon: FaGitAlt,
                color: "#F05032",
            },
            {
                title: "GitHub",
                icon: FaGithub,
                color: "#181717",
            },
            {
                title: "Docker",
                icon: FaDocker,
                color: "#2496ED",
            },
            {
                title: "Postman",
                icon: SiPostman,
                color: "#FF6C37",
            },
            {
                title: "Supabase",
                icon: SiSupabase,
                color: "#3ECF8E",
            },
            {
                title: "AWS",
                icon: FaAws,
                color: "#FF9900",
            },
        ],
    },
] satisfies SkillCategory[];
