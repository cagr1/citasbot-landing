import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso legal - CitasBot",
  alternates: { canonical: "/aviso-legal" },
};

export default function AvisoLegal() {
  return (
    <main
      className="px-6 py-16 lg:px-8"
      style={{ background: "var(--bg)", color: "var(--text-primary)" }}
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <a href="/" className="text-sm font-medium" style={{ color: "var(--brand)" }}>
          ← Volver al inicio
        </a>
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Aviso legal</h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Información exigida por el artículo 10 de la Ley 34/2002 de servicios de la sociedad de la
          información y de comercio electrónico (LSSI).
        </p>

        <section className="space-y-2">
          <h2 className="text-xl font-bold">Titular del sitio</h2>
          <ul className="space-y-1 text-sm" style={{ color: "var(--text-secondary)" }}>
            <li>Titular: [PENDIENTE: titular]</li>
            <li>Identificación fiscal: [PENDIENTE: NIF/RUC]</li>
            <li>Domicilio: [PENDIENTE: domicilio]</li>
            <li>
              Correo electrónico:{" "}
              <a href="mailto:hello@citasbot.app" style={{ color: "var(--brand)" }}>
                hello@citasbot.app
              </a>
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold">Objeto del sitio</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            citasbot.app presenta CitasBot, un servicio de gestión de citas, confirmaciones y
            recordatorios por WhatsApp para negocios, y permite solicitar una demostración.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold">Más información</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Consulta la{" "}
            <a href="/privacy-policy.html" style={{ color: "var(--brand)" }}>
              política de privacidad
            </a>
            , los{" "}
            <a href="/terms.html" style={{ color: "var(--brand)" }}>
              términos de servicio
            </a>{" "}
            y la{" "}
            <a href="/cookies" style={{ color: "var(--brand)" }}>
              política de cookies
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
