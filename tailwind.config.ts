import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          from: "#4F52FF",
          to: "#8B3CF7",
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
        "brand-gradient": "linear-gradient(135deg, #4F52FF 0%, #8B3CF7 100%)",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 12px 0 rgba(79,82,255,0.12)",
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
