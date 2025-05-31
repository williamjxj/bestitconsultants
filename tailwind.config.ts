import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', 
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors can be added here
      },
    },
  },
  darkMode: 'class', // Enable dark mode
  plugins: [],
};

export default config;