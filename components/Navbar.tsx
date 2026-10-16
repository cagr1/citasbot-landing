"use client";

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

import Brand from "@/components/Brand";

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
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{
        background: "var(--bg-nav)",
        borderColor: scrolled ? "var(--border)" : "transparent",
      }}
    >
      {/* Desktop */}
      <div className="mx-auto flex h-[58px] max-w-7xl items-center justify-between px-6 lg:px-8">

        <Brand />

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap text-sm font-normal ${linkClass}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden items-center gap-5 lg:flex">
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
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-ink px-5 py-2 text-sm font-medium text-white hover:bg-black"
          >
            Solicitar demo
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-subtle)]"
          >
            <Icon icon={menuOpen ? "lucide:x" : "lucide:menu"} className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="border-t px-6 py-4 lg:hidden"
          style={{ borderColor: "var(--border)", background: "var(--bg)" }}
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
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-black"
            >
              Solicitar demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
