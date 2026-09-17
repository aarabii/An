interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  DOB: {
    d: number;
    m: number;
    y: number;
  };
  about: {
    text: string;
    highlights: string[];
  }[];

  profile_image: string;
  profile_image_alt: string;
  custom_roles: string[];
  currentProfession: {
    role: string;
    company: string;
    website: string;
  };
  bio: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  timeZone: {
    offset: number;
    name: string;
  };
  contact_email: string;
}

export const PERSONAL_INFO = {
  name: "Aarab Nishchal",
  firstName: "Aarab",
  lastName: "Nishchal",

  DOB: {
    d: 9,
    m: 8,
    y: 2004,
  },

  about: [
    {
      text: "I'm an AI Engineer who builds full-stack products with AI woven into the core, not bolted on top.",
      highlights: ["AI Engineer"],
    },
    {
      text: "I work across React, TypeScript, Next.js, and Node.js, building interfaces and APIs that stay fast and type-safe end to end.",
      highlights: ["React, TypeScript, Next.js, and Node.js"],
    },
    {
      text: "On the AI side, I integrate LangChain, Gemini, and Ollama into production workflows — RAG pipelines, agents, and self-correcting validation loops.",
      highlights: ["LangChain, Gemini, and Ollama"],
    },
    {
      text: "I like taking a messy, manual process and turning it into a system that runs itself — clean code, real infrastructure, no shortcuts.",
      highlights: [],
    },
  ],

  profile_image: "/images/me1.png",
  profile_image_alt: "Aarab Nishchal - AI Engineer & Software Developer",

  custom_roles: ["AI Engineer", "Software Engineer"],

  currentProfession: {
    role: "AI Engineer",
    company: "Ascend HSI",
    website: "https://ascendhsi.com/",
  },

  bio: "Stay GOATed.",

  location: {
    city: "Katihar",
    state: "Bihar",
    country: "India",
  },
  timeZone: {
    offset: 5.5,
    name: "Asia/Kolkata",
  },

  contact_email: "hello@aarab.me",
} satisfies PersonalInfo;
