"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";

import Brand from "@/components/Brand";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#features", label: "Características" },
  { href: "#precios", label: "Precios" },
  { href: "#contacto", label: "Contacto" },
];

const APP_URL = "https://citasbot-whatsapp.vercel.app";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: "var(--bg)",
        borderColor: "var(--border)",
      }}
    >
      {/* Desktop */}
      <div className="mx-auto flex h-[58px] max-w-7xl items-center justify-between px-6 lg:px-8">

        <Brand />

        {/* Nav links — weight 400, hover background (Aceternity pattern) */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded px-3 py-1.5 text-sm font-normal transition-colors duration-150"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <a
            href={`${APP_URL}/login`}
            className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition-colors"
            style={{
              color: "var(--text-secondary)",
              border: "1px solid var(--border-strong)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--brand)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
            }}
          >
            Iniciar sesión
          </a>
          <a
            href="#precios"
            className="inline-flex items-center justify-center rounded-full bg-brand-gradient px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{
              boxShadow: "rgba(0,0,0,0.1) 0px 1px 3px 0px, rgba(0,0,0,0.06) 0px 1px 2px -1px",
            }}
          >
            Empezar gratis
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
          >
            <Icon icon={menuOpen ? "lucide:x" : "lucide:menu"} className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="border-t px-6 py-4 md:hidden"
          style={{ borderColor: "var(--border)", background: "var(--bg)" }}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded px-3 py-2 text-sm font-normal transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={`${APP_URL}/login`}
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors"
              style={{ color: "var(--text-secondary)", border: "1px solid var(--border-strong)" }}
            >
              Iniciar sesión
            </a>
            <a
              href="#precios"
              onClick={() => setMenuOpen(false)}
              className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-medium text-white"
            >
              Empezar gratis
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
