import type { Metadata } from "next";

import { ConfigureCookiesButton } from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "Política de cookies - CitasBot",
  alternates: { canonical: "/cookies" },
};

const items = [
  {
    name: "cb_region (cookie)",
    desc: "Preferencia: guarda la región y moneda que eliges (España / Europa o Latinoamérica). Duración: 1 año. Propia. Exenta de consentimiento, porque la solicita el propio usuario.",
  },
  {
    name: "cb_consent (localStorage)",
    desc: "Guarda tu decisión sobre las cookies (aceptadas o rechazadas). Propia. No se envía a ningún servidor.",
  },
  {
    name: "Google Tag Manager / Google Analytics",
    desc: "Analítica. De terceros (Google). Solo se cargan si aceptas las cookies.",
  },
  {
    name: "Vercel Analytics",
    desc: "Medición de visitas agregada. No usa cookies.",
  },
];

export default function Cookies() {
  return (
    <main
      className="px-6 py-16 lg:px-8"
      style={{ background: "var(--bg)", color: "var(--text-primary)" }}
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <a href="/" className="text-sm font-medium" style={{ color: "var(--brand)" }}>
          ← Volver al inicio
        </a>
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Política de cookies</h1>

        <ul className="space-y-4">
          {items.map((i) => (
            <li key={i.name}>
              <p className="font-bold">{i.name}</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {i.desc}
              </p>
            </li>
          ))}
        </ul>

        <section className="space-y-2">
          <h2 className="text-xl font-bold">Retirar el consentimiento</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Puedes cambiar tu decisión en cualquier momento con el botón siguiente o desde el enlace
            «Configurar cookies» del pie de página.
          </p>
          <ConfigureCookiesButton className="rounded-full px-5 py-2 text-sm font-semibold underline" />
        </section>
      </div>
    </main>
  );
}
