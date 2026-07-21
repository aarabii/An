export interface ExperienceDate {
  dd: number;
  mm: string;
  yyyy: number;
}

export interface BaseExperience {
  role: string;
  startDate: ExperienceDate;
  description: string[];
  company: string;
  companySite: string;
  technologies: string[];
}

export type Experience =
  | (BaseExperience & {
      current: true;
      // endDate?: never;
    })
  | (BaseExperience & {
      current?: false;
      endDate: ExperienceDate;
    });

export const experience: Experience[] = [
  {
    role: "AI Engineer Intern",
    startDate: {
      dd: 2,
      mm: "July",
      yyyy: 2026,
    },
    current: true,
    description: [
      "Building AI-powered features for internal SaaS products, integrating LLM providers into production workflows.",
      "Developing AI agents to automate repetitive business processes across case management, CRM intelligence, and media placement systems.",
      "Supporting integration of AI services into web-based applications, working across prompt engineering, automation, and data pipeline tasks.",
      "Contributing to internal documentation and research on applied generative AI use cases for the company's SaaS platform.",
    ],
    company: "Ascend HSI",
    companySite: "https://ascendhsi.com/",
    technologies: [
      "Next.js",
      "Python",
      "LLMs",
      "OpenAI",
      "Prompt Engineering",
      "AI Agents",
      "Automation",
    ],
  },
  {
    role: "Software Developer Intern",
    startDate: {
      dd: 12,
      mm: "September",
      yyyy: 2024,
    },
    endDate: {
      dd: 30,
      mm: "July",
      yyyy: 2026,
    },
    description: [
      "Integrated AI-driven n8n automation workflows across internal REST API endpoints and a custom CMS, adding white-label support and dynamic window-title configuration",
      "Built an AI workflow system to auto-generate and validate vendor assignments, cutting creation and validation time by 60–70%",
      "Enhanced front-end UI components to surface the new workflow system, streamlining vendor-facing task flows",
      "Managed CI/CD pipelines via Git and Jenkins to maintain consistent deployments across environments",
      "Tracked sprint progress and maintained technical documentation in Jira and Confluence",
    ],
    company: "Unstop",
    companySite: "https://unstop.com/",
    technologies: ["n8n", "REST APIs", "Git", "Jenkins", "Jira"],
  },
];
