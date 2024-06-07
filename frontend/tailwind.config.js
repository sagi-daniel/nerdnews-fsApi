/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: "Roboto, monospace",
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-content": "var(--color-primary-content)",
        "primary-dark": "var(--color-primary-dark)",
        "primary-light": "var(--color-primary-light)",

        secondary: "var(--color-secondary)",
        "secondary-content": "var(--color-secondary-content)",
        "secondary-dark": "var(--color-secondary-dark)",
        "secondary-light": "var(--color-secondary-light)",

        "bg-dark": "var(--color-bg-dark)",
        "content-dark": "var(--color-content-dark)",
        "border-dark": "var(--color-border-dark)",

        "bg-light": "var(--color-bg-light)",
        "content-light": "var(--color-content-light)",
        "border-light": "var(--color-border-light)",

        tech: "var(--color-tech)",
        "tech-lighter": "var(--color-tech-lighter)",
        "tech-content": "var(--color-tech-content)",
        cybersec: "var(--color-cybersec)",
        "cybersec-lighter": "var(--color-cybersec-lighter)",
        "cybersec-content": "var(--color-cybersec-content)",
        gaming: "var(--color-gaming)",
        "gaming-lighter": "var(--color-gaming-lighter)",
        "gaming-content": "var(--color-gaming-content)",

        success: "var(--color-success)",
        "success-content": "var(--color-success-content)",
        warning: "var(--color-warning)",
        "warning-content": "var(--color-warning-content)",
        error: "var(--color-error)",
        "error-content": "var(--color-error-content)",
      },
      backgroundImage: {
        hero: "url('/assets/images/hero.jpg')",
      },
      fontSize: {
        xxs: "0.6rem",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          "scrollbar-width": "none" /* Firefox */,
          "&::-webkit-scrollbar": {
            display: "none" /* Safari and Chrome */,
          },
        },
      });
    },
  ],
};
