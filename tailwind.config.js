/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    screens: {
      xs: "380px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        dm:   ["DM Sans", "sans-serif"],
      },
      colors: {
        primary:    "#8B6E3C",
        "primary-d":"#6b5228",
        "primary-l":"#FFE1A7",
      },
    },
  },
  plugins: [],
};
