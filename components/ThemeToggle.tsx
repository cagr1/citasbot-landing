"use client";

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextValue = !root.classList.contains("dark");
    root.classList.toggle("dark", nextValue);
    localStorage.setItem("theme", nextValue ? "dark" : "light");
    setIsDark(nextValue);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={mounted && isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
      style={{
        borderColor: "var(--border)",
        background: "var(--bg-elevated)",
        color: "var(--text-primary)",
      }}
    >
      <Icon icon={mounted && isDark ? "lucide:sun-medium" : "lucide:moon-star"} className="h-4 w-4" />
    </button>
  );
}
