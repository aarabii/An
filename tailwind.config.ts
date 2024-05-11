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
        century: ["century"],
        fezeline: ["fezeline"],
        manarope: ["manarope"],
        nasalization: ["nasalization"],
      },
    },
  },
  plugins: [],
};
export default config;
