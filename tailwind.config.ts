import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    letterSpacing: {
      preloaderSpacing: "0.35em",
      contactFormSpacing: "0.175em",
      notFoundSpacing: "0.1em",
    },
    extend: {
      fontFamily: {
        argine: ["--font-argine"],
        fezeline: ["--font-fezeline"],
        nasalization: ["--font-nasalization"],
        manrope: ["--font-manrope"],
      },
    },
  },
  plugins: [],
};
export default config;
