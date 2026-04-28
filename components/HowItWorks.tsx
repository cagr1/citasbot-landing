"use client";

import { useFadeIn } from "@/hooks/useFadeIn";

const steps = [
  {
    number: "01",
    title: "Conecta tu WhatsApp",
    description:
      "Vincula el número de tu negocio con Meta Cloud API. El proceso toma menos de 10 minutos y no requiere conocimientos técnicos.",
  },
  {
    number: "02",
    title: "Configura servicios y horarios",
    description:
      "Define qué ofreces, cuándo y con quién. El dashboard es simple: crea servicios, asigna personal y establece tu disponibilidad.",
  },
  {
    number: "03",
    title: "Tus clientes agendan solos",
    description:
      "El bot atiende, agenda, confirma y recuerda — las 24 horas, los 7 días. Tú solo abres el dashboard y ves tu agenda llena.",
  },
];

export default function HowItWorks() {
  const ref = useFadeIn<HTMLElement>();

  return (
    <section
      id="como-funciona"
      ref={ref}
      className="fade-up px-6 py-24 lg:px-8 lg:py-32"
      style={{ background: "var(--bg-subtle)" }}
    >
      <div className="mx-auto max-w-7xl">

        {/* Header — left-aligned, no centered blob */}
        <div className="max-w-xl">
          <p
            className="text-xs font-semibold uppercase tracking-[0.14em]"
            style={{ color: "var(--text-muted)" }}
          >
            Cómo funciona
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] md:text-4xl lg:text-5xl">
            En minutos tienes tu bot activo
          </h2>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Sin configuraciones complicadas. Sin soporte técnico de tu parte.
          </p>
        </div>

        {/* Steps — divided layout, no cards */}
        <div
          className="mt-16 grid divide-y lg:grid-cols-3 lg:divide-x lg:divide-y-0"
          style={{ borderColor: "var(--border)" }}
        >
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="py-8 first:pt-0 last:pb-0 lg:py-0 lg:px-8 lg:first:pt-0 lg:last:pb-0"
              style={
                i === 0
                  ? { paddingLeft: 0 }
                  : i === steps.length - 1
                  ? { paddingRight: 0 }
                  : {}
              }
            >
              <p
                className="font-mono text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                {step.number}
              </p>
              <h3 className="mt-4 text-base font-bold tracking-[-0.02em]">
                {step.title}
              </h3>
              <p
                className="mt-3 text-sm leading-[1.8]"
                style={{ color: "var(--text-secondary)" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
