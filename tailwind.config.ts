import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          from: "#C8471F", // transitorio: hasta rediseñar cada sección
          to: "#C8471F", // transitorio: hasta rediseñar cada sección
        },
        paper: "#FAF8F5",
        ink: "#17181C",
        line: "#E7E3DC",
        accent: {
          DEFAULT: "#C8471F",
          hover: "#B03E1B",
          soft: "#E4572E",
        },
        neutral: {
          50: "#F8F9FF",
          100: "#F0F1FA",
          200: "#E2E3F0",
          300: "#C5C6D8",
          400: "#9899B0",
          500: "#6B6C84",
          600: "#4A4B60",
          700: "#32333F",
          800: "#1E1F28",
          900: "#12131A",
          950: "#0D0E14",
        },
        wa: "#25D366",
      },
      backgroundImage: {
        // transitorio: hasta rediseñar cada sección
        "brand-gradient": "linear-gradient(#C8471F, #C8471F)",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)",
        // transitorio: hasta rediseñar cada sección
        "card-hover": "0 4px 12px 0 rgba(23,24,28,0.08)",
      },
      keyframes: {
        messageIn: {
          from: {
            opacity: "0",
            transform: "translateY(8px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "message-in": "messageIn 0.3s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
