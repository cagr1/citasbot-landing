import type { Metadata } from "next";

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
    name: "Vercel Analytics",
    desc: "Estadísticas agregadas de visitas y de clics en los botones principales. No usa cookies ni guarda nada en tu navegador. Proveedor: Vercel Inc.",
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

        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Esta web no usa cookies de analítica ni de publicidad, por eso no te pedimos consentimiento. Solo usa lo siguiente:
        </p>

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

      </div>
    </main>
  );
}
