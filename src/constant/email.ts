const BASE_EMAIL_VARIABLES = {
  name: "Aarab Nishchal",
  firstName: "Aarab",
  lastName: "Nishchal",
  baseURL: "https://aarab.me",
  email: "hello@aarab.me",
};

export const EMAIL_VARIABLES = {
  ...BASE_EMAIL_VARIABLES,

  navigationLinks: [
    {
      title: "Projects",
      desc: "Autonomous agents, full-stack systems, and open-source tooling.",
      href: `${BASE_EMAIL_VARIABLES.baseURL}/projects`,
      cta: "Explore Projects →",
    },
    {
      title: "Blogs",
      desc: "Essays on AI architectures, systems design, and web development.",
      href: `${BASE_EMAIL_VARIABLES.baseURL}/blogs`,
      cta: "Read Articles →",
    },
    {
      title: "Recommendations",
      desc: "High-signal books, games, and essays that shaped my thinking.",
      href: `${BASE_EMAIL_VARIABLES.baseURL}/recommendations`,
      cta: "Browse Recommendations →",
    },
    {
      title: "Resume",
      desc: "Engineering career timeline, technical proficiencies, and history.",
      href: `${BASE_EMAIL_VARIABLES.baseURL}/resume`,
      cta: "View Resume →",
    },
  ],

  socials: [
    {
      name: "GitHub",
      url: "https://github.com/aarabii",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/aarab-nishchal",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/aarab.ii",
    },
    {
      name: "X",
      url: "https://x.com/aarab_ii",
    },
  ],
};
