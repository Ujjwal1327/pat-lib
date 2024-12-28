/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shrinkBar: {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
      },
      animation: {
        shrinkBar: "shrinkBar 4s linear forwards",
      },
    },
  },
  plugins: [],
};
