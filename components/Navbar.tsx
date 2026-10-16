"use client";

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

import Brand from "@/components/Brand";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#features", label: "Características" },
  { href: "#precios", label: "Precios" },
  { href: "#contacto", label: "Contacto" },
];

const APP_URL = "https://citasbot-whatsapp.vercel.app";

const linkClass =
  "text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4">
      <nav
        aria-label="Principal"
        className="mx-auto w-full rounded-full border border-line backdrop-blur-md"
        style={{
          background: "var(--nav-bg)",
          maxWidth: scrolled ? "56rem" : "72rem",
          padding: scrolled ? "0.5rem 1rem" : "0.625rem 1.25rem",
          boxShadow: scrolled ? "0 8px 30px rgba(var(--shadow-color),0.08)" : "0 0 0 rgba(var(--shadow-color),0)",
          transition:
            "max-width 400ms cubic-bezier(0.22,1,0.36,1), padding 400ms cubic-bezier(0.22,1,0.36,1), box-shadow 400ms",
        }}
      >
        <div className="flex items-center justify-between">
          <Brand />

          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap text-sm font-normal ${linkClass}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden items-center gap-5 lg:flex">
            <ThemeToggle />
            <a
              href={`${APP_URL}/login`}
              className={`whitespace-nowrap text-sm font-normal ${linkClass}`}
            >
              Iniciar sesión
            </a>
            <a
              href="#contacto"
              data-track="demo_click"
              data-track-location="navbar"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-ink px-5 py-2 text-sm font-medium text-on-ink hover:opacity-90"
            >
              Solicitar demo
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-subtle)]"
            >
              <Icon icon={menuOpen ? "lucide:x" : "lucide:menu"} className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="mx-auto mt-2 max-w-4xl rounded-3xl border border-line px-4 py-4 lg:hidden"
          style={{
            background: "var(--nav-bg-solid)",
            boxShadow: "0 8px 30px rgba(var(--shadow-color),0.08)",
          }}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded px-3 py-2 text-sm font-normal ${linkClass}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={`${APP_URL}/login`}
              onClick={() => setMenuOpen(false)}
              className={`rounded px-3 py-2 text-sm font-normal ${linkClass}`}
            >
              Iniciar sesión
            </a>
            <a
              href="#contacto"
              data-track="demo_click"
              data-track-location="navbar_mobile"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-on-ink hover:opacity-90"
            >
              Solicitar demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
