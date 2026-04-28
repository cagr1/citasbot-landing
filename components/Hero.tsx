"use client";

import { useFadeIn } from "@/hooks/useFadeIn";
import WhatsAppMock from "@/components/WhatsAppMock";

export default function Hero() {
  const ref = useFadeIn<HTMLElement>();

  return (
    <section ref={ref} className="fade-up px-6 pb-20 pt-12 lg:px-8 lg:pb-28 lg:pt-14">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1fr_480px]">

        {/* Copy */}
        <div>
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold"
            style={{
              background: "rgba(79,82,255,0.08)",
              borderColor: "rgba(79,82,255,0.15)",
              color: "var(--brand)",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Gestión de citas por WhatsApp
          </span>

          <h1
            className="mt-5 text-[clamp(2.4rem,5.5vw,4.25rem)] font-extrabold leading-[1.03] tracking-[-0.04em]"
            style={{ color: "var(--text-primary)" }}
          >
            Tus clientes ya tienen WhatsApp.{" "}
            <span style={{ color: "var(--text-secondary)" }}>
              Úsalo para llenar tu agenda.
            </span>
          </h1>

          <p
            className="mt-6 max-w-[480px] text-lg leading-[1.75]"
            style={{ color: "var(--text-secondary)" }}
          >
            CitasBot gestiona citas, confirmaciones y recordatorios por WhatsApp
            — sin que tus clientes descarguen nada ni tú pierdas tiempo al teléfono.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#precios"
              className="inline-flex items-center justify-center rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Empezar gratis
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center gap-2 rounded-full border px-5 py-3.5 text-sm font-medium transition-colors hover:opacity-70"
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            >
              Ver cómo funciona
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <p className="mt-5 text-sm" style={{ color: "var(--text-muted)" }}>
            Sin tarjeta de crédito&ensp;·&ensp;Plan gratis disponible&ensp;·&ensp;Activo en minutos
          </p>
        </div>

        {/* Visual */}
        <div className="flex justify-center lg:justify-end">
          <WhatsAppMock />
        </div>
      </div>
    </section>
  );
}
