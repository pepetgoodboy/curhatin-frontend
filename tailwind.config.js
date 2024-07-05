/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        comfortaa: ["'Comfortaa'", "sans-serif"],
      },
      borderRadius: {
        lgm: "10px",
      },
      dropShadow: {
        br: ".23rem .23rem 0 rgb(0, 0, 0)",
        rd: "0 .12rem 0 rgb(0, 0, 0)",
        wt: ".23rem 0 0 rgb(255, 255, 255)",
      },
    },
  },
  plugins: [],
};
