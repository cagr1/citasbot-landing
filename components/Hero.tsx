"use client";

import { Icon } from "@iconify/react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";

import HeroChat from "@/components/HeroChat";
import { WA_URL } from "@/lib/contact";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="px-6 pt-10 pb-16 lg:px-8 lg:pt-16 lg:pb-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
        <div>
          <h1
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.04] tracking-[-0.025em]"
            style={{ color: "var(--text-primary)" }}
          >
            Tu agenda se llena{" "}
            <span className="relative whitespace-nowrap">
              sola
              <LazyMotion features={domAnimation}>
                <svg
                  aria-hidden
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  className="absolute"
                  style={{
                    left: "-4px",
                    bottom: "-0.12em",
                    width: "calc(100% + 8px)",
                    height: "0.22em",
                  }}
                >
                  <m.path
                    d="M2 8 C 25 2, 60 2, 98 6"
                    stroke="var(--accent-soft)"
                    strokeWidth={3}
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: reduce ? 1 : 0 }}
                    animate={{ pathLength: 1 }}
                    transition={
                      reduce ? { duration: 0 } : { duration: 0.9, delay: 0.3, ease: "easeOut" }
                    }
                  />
                </svg>
              </LazyMotion>
            </span>{" "}
            por WhatsApp
          </h1>

          <p
            className="mt-6 max-w-[30rem] text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Tus clientes reservan, confirman y reciben recordatorios. Tú solo atiendes.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contacto"
              data-track="demo_click"
              data-track-location="hero"
              className="rounded-full bg-accent px-7 py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Solicitar demo
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noreferrer"
              data-track="whatsapp_click"
              data-track-location="hero"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-[var(--border-strong)]"
            >
              <Icon icon="ic:baseline-whatsapp" className="h-5 w-5" style={{ color: "#25D366" }} />
              Escríbenos por WhatsApp
            </a>
          </div>

          <p className="mt-6 text-sm" style={{ color: "var(--text-muted)" }}>
            Demo de 20 minutos · Sin permanencia · Configuración incluida
          </p>
        </div>

        <div className="flex justify-center">
          <HeroChat />
        </div>
      </div>
    </section>
  );
}
