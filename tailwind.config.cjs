/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2b09ff",
        inputBackground: "#131313",
      },
      animation: {
        fadeIn: "fadeIn 0.2s linear",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [
    require('./tailwindcss-scrollbar-hide.cjs')
  ],
};
