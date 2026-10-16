"use client";

import { Icon } from "@iconify/react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import Brand from "@/components/Brand";

const footerLinks = [
  { href: "#features", label: "Funciones" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#precios", label: "Precios" },
];

const WORDMARK = "CitasBot";

export default function Footer() {
  const reduce = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <footer
        className="border-t px-6 pt-16 lg:px-8"
        style={{ borderColor: "var(--border)", background: "var(--bg)" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Brand />
              <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
                Citas por WhatsApp para negocios de servicios.
              </p>
            </div>

            <nav
              className="flex flex-wrap items-center gap-6 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {footerLinks.map((link) => (
                <a key={link.href} href={link.href} className="transition-colors hover:text-ink">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div
            className="mt-12 flex flex-col gap-3 text-sm md:flex-row md:items-center md:justify-between"
            style={{ color: "var(--text-muted)" }}
          >
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a
                href="/privacy-policy.html"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-ink"
              >
                Política de privacidad
              </a>
              <a
                href="/terms.html"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-ink"
              >
                Términos de servicio
              </a>
              <a href="/aviso-legal" className="transition-colors hover:text-ink">
                Aviso legal
              </a>
              <a href="/cookies" className="transition-colors hover:text-ink">
                Cookies
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span>© 2026 CitasBot</span>
              <a
                href="https://www.carlosgallardo.dev/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-ink"
                style={{ color: "var(--text-secondary)" }}
              >
                carlosgallardo.dev
              </a>
              <a
                href="https://www.instagram.com/carlosglabs/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram de Carlos Gallardo"
                className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-ink"
                style={{ color: "var(--text-secondary)" }}
              >
                <Icon icon="mdi:instagram" width={16} height={16} />
                @carlosglabs
              </a>
            </div>
          </div>
        </div>

        <m.div
          aria-hidden
          className="mt-12 select-none pb-6 overflow-hidden text-center text-[19vw] font-medium leading-[0.8] tracking-[-0.05em] lg:mt-16 lg:text-[15rem]"
          style={{ color: "var(--text-primary)" }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
        >
          <span className="inline-block overflow-hidden align-top">
            {[...WORDMARK, "."].map((ch, i) => (
              <m.span
                key={i}
                className="inline-block"
                style={i === WORDMARK.length ? { color: "var(--accent-soft)" } : undefined}
                variants={{
                  hidden: { y: reduce ? 0 : "100%" },
                  show: {
                    y: 0,
                    transition: reduce
                      ? { duration: 0 }
                      : { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                {ch}
              </m.span>
            ))}
          </span>
        </m.div>
      </footer>
    </LazyMotion>
  );
}
