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
        'base': {
          '100': '#AAAAAA',
          '200': '#8C8C8C',
        },
        'accent': {
          '100': '#F2F2F2',
          '200': '#E5E5E5',
          '300': '#EEEEEE',
          '400': '#E0E0E0',
        },
      },
    },
  },
  safelist: [
    'hover:text-black',
    'hover:text-red-500',
    'border-blue-500',
  ],
  plugins: [],
};
export default config;
