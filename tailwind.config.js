/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,ts}"];
export const theme = {
  extend: {},
  screens: {
    xs: "400px",

    sm: "640px",
    // => @media (min-width: 640px) { ... }

    md: "768px",
    // => @media (min-width: 768px) { ... }

    lg: "1024px",
    // => @media (min-width: 1024px) { ... }

    xl: "1200px",
    // => @media (min-width: 1280px) { ... }

    "2xl": "1466px",
    // => @media (min-width: 1536px) { ... }

    "3xl": "1850px",
    // => @media (min-width: 1850px) { ... }
  },
  container: {
    center: true,
    padding: {
      DEFAULT: "2rem",
      sm: "2rem",
      lg: "5rem",
      xl: "10rem",
      "2xl": "15rem",
    },
  },
  fontFamily: {
    inter: ["Inter", "sans-serif"],
  },
};
export const plugins = [];
