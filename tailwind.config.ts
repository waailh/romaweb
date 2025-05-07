import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // primary: "#668C2E",
        // secondary: "#97B7DE",
        primary: "#469292", // #889c7f
        secondary: "#889c7f",
        light: "#83BA20",
        blacky: "#333335",
        pinky: "#F76659",
        grayee: "#C4C4C4",
        lightgray: "#FAFAFA",
        greeny: "#82BA1F",
        bluee: "#252F35",
        texty: "#4A4949",
        graybg: "#F8F8F8",
        fgray: "#5C5F6A",
        lemony: "#9CE714",
        yellowy: "#FEFBE8",
      },
    },
  },
  plugins: [require("tailwindcss-rtl")],
};
export default config;
