import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0B132B",
        "navy-raise": "#111B3D",
        "navy-deep": "#070E22",
        gold: "#D0B040",
        "gold-bright": "#E3C96A",
        paper: "#F7F2E6",
        "paper-dim": "#EFE8D6",
        ink: "#111A33",
        "ink-soft": "#3C4560",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Verdana", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
