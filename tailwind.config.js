/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        pulse: {
          "0%": { opacity: "0.5" },
          "50%": { opacity: "0.7" },
          "100%": { opacity: "0.15" },
        },
      },
      animation: {
        pulse: "pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
