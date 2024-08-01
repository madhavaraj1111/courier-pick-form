/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.js", // added
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
