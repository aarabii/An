type Url = `http://${string}` | `https://${string}`;

type DateRange = {
    month: string;
    year: string;
};

type ExperienceType =
    | "full-time"
    | "part-time"
    | "internship"
    | "contract"
    | "freelance"
    | "other";

type CompanyData = {
    name: string;
    url: Url;
    linkedin: Url;
};

interface ExperienceItemBase {
    id: string;
    title: string;
    company: CompanyData;
    type: ExperienceType;
    startDate: DateRange;
    responsibilities: string[];
    stack: string[];
}

interface CurrentExperience extends ExperienceItemBase {
    present: true;
    endDate?: never;
}

interface PastExperience extends ExperienceItemBase {
    present: false;
    endDate: DateRange;
}

export type ExperienceItem = CurrentExperience | PastExperience;

export const EXPERIENCE = [
    {
        id: "1",
        title: "AI Enginner Intern",
        company: {
            name: "Ascend HSI",
            url: "https://ascendhsi.com/",
            linkedin: "https://www.linkedin.com/company/ascendhsi",
        },
        type: "internship",
        startDate: {
            month: "Jul",
            year: "2026",
        },
        present: true,
        responsibilities: [
            "Building AI-powered features for internal SaaS products, integrating LLM providers into production workflows.",
            "Developing AI agents to automate repetitive business processes across case management, CRM intelligence, and media placement systems.",
            "Supporting integration of AI services into web-based applications, working across prompt engineering, automation, and data pipeline tasks.",
            "Contributing to internal documentation and research on applied generative AI use cases for the company's SaaS platform.",
        ],
        stack: [
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
        id: "2",
        title: "Software Developer Intern",
        company: {
            name: "Unstop",
            url: "https://unstop.com",
            linkedin: "https://www.linkedin.com/company/unstop",
        },
        type: "internship",
        startDate: {
            month: "Sep",
            year: "2024",
        },
        endDate: {
            month: "Jun",
            year: "2026",
        },
        present: false,
        responsibilities: [
            "Integrated AI-driven n8n automation workflows across internal REST API endpoints and a custom CMS, adding white-label support and dynamic window-title configuration",
            "Built an AI workflow system to auto-generate and validate vendor assignments, cutting creation and validation time by 60–70%",
            "Enhanced front-end UI components to surface the new workflow system, streamlining vendor-facing task flows",
            "Managed CI/CD pipelines via Git and Jenkins to maintain consistent deployments across environments",
            "Tracked sprint progress and maintained technical documentation in Jira and Confluence",
        ],
        stack: ["n8n", "REST APIs", "Git", "Jenkins", "Jira"],
    },
] satisfies ExperienceItem[];
