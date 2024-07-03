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
        'primary': '#2A2A28',
        'secondary': '#8C8C8C',
        'accent': "#F2F2F2",
        'accent-secondary': "#F6F6F8",
      },
    }
  },
  plugins: [],
};
export default config;
