import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        argine: ["argine"],
        fezeline: ["fezeline"],
        manarope: ["manarope"],
        nasalization: ["nasalization"],
      },
    },
    letterSpacing: {
      "preloaderSpacing": "0.35em",
    },
  },
  plugins: [],
};
export default config;
