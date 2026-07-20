import type { IconType } from "react-icons";

import {
  FaGitAlt,
  FaGithub,
  FaPython,
  FaReact,
  FaNodeJs,
  FaAngular,
  FaHtml5,
  FaCss3Alt,
  FaDocker,
  FaAws,
  FaSquareJs,
} from "react-icons/fa6";

import {
  SiExpress,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPostman,
  SiTailwindcss,
  SiTypescript,
  SiDjango,
  SiFastapi,
  SiPytorch,
  SiLangchain,
  SiOllama,
  SiGooglegemini,
  SiSupabase,
} from "react-icons/si";

import { BiLogoPostgresql } from "react-icons/bi";
import { TfiVector } from "react-icons/tfi";
import { MdApi } from "react-icons/md";
import { TbVectorTriangle } from "react-icons/tb";

interface LogoProps {
  title: string;
  logoComponent: IconType;
  color?: string;
}

interface SkillsDataProps {
  title: string;
  data: LogoProps[];
}

export const skillsData: SkillsDataProps[] = [
  {
    title: "Languages & Databases",
    data: [
      { title: "TypeScript", logoComponent: SiTypescript, color: "#3178C6" },
      { title: "JavaScript", logoComponent: FaSquareJs, color: "#F7DF1E" }, // Note: If using FaSquareJs, color is #F7DF1E
      { title: "HTML5", logoComponent: FaHtml5, color: "#E34F26" },
      { title: "CSS3", logoComponent: FaCss3Alt, color: "#1572B6" },
      { title: "Python", logoComponent: FaPython, color: "#3776AB" },
      { title: "MongoDB", logoComponent: SiMongodb, color: "#47A248" },
      {
        title: "PostgreSQL",
        logoComponent: BiLogoPostgresql,
        color: "#4169E1",
      },
      { title: "MySQL", logoComponent: SiMysql, color: "#4479A1" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    data: [
      { title: "React", logoComponent: FaReact, color: "#61DAFB" },
      { title: "Next.js", logoComponent: SiNextdotjs, color: "#000000" },
      { title: "Express.js", logoComponent: SiExpress, color: "#000000" },
      { title: "Tailwind CSS", logoComponent: SiTailwindcss, color: "#06B6D4" },
      { title: "Node.js", logoComponent: FaNodeJs, color: "#339933" },
      { title: "Angular", logoComponent: FaAngular, color: "#DD0031" },
      { title: "Django", logoComponent: SiDjango, color: "#092E20" },
      { title: "FastAPI", logoComponent: SiFastapi, color: "#009688" },
    ],
  },
  {
    title: "AI, ML & LLMs",
    data: [
      { title: "PyTorch", logoComponent: SiPytorch, color: "#EE4C2C" },
      { title: "LangChain", logoComponent: SiLangchain, color: "#1C3C3A" },
      { title: "Ollama", logoComponent: SiOllama, color: "#000000" },
      { title: "Groq / VAPI", logoComponent: MdApi, color: "#F55036" },
      { title: "Gemini", logoComponent: SiGooglegemini, color: "#1A73E8" },
      { title: "ChromaDB", logoComponent: TfiVector, color: "#0052FF" },
      {
        title: "Vector Embeddings",
        logoComponent: TbVectorTriangle,
        color: "#FF6B6B",
      },
    ],
  },
  {
    title: "Tools, Platforms & DevOps",
    data: [
      { title: "Git", logoComponent: FaGitAlt, color: "#F05032" },
      { title: "GitHub", logoComponent: FaGithub, color: "#181717" },
      { title: "Docker", logoComponent: FaDocker, color: "#2496ED" },
      { title: "Postman", logoComponent: SiPostman, color: "#FF6C37" },
      { title: "Supabase", logoComponent: SiSupabase, color: "#3ECF8E" },
      { title: "AWS", logoComponent: FaAws, color: "#FF9900" },
    ],
  },
];
