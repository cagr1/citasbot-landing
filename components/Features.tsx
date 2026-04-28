"use client";

import { Icon } from "@iconify/react";
import { useFadeIn } from "@/hooks/useFadeIn";

const features = [
  {
    icon: "lucide:message-square",
    title: "Agendamiento automático",
    description:
      "El bot conversa, entiende y agenda sin intervención humana. Disponible las 24 horas, todos los días.",
  },
  {
    icon: "lucide:bell",
    title: "Recordatorios automáticos",
    description:
      "Confirmaciones y recordatorios enviados por WhatsApp. Los negocios reducen ausencias entre un 40 y 60%.",
  },
  {
    icon: "lucide:layout-dashboard",
    title: "Dashboard centralizado",
    description:
      "Citas, clientes y pagos en una sola vista. Funciona desde cualquier dispositivo, sin instalar nada.",
  },
  {
    icon: "lucide:users",
    title: "Múltiples usuarios y roles",
    description:
      "Invita a tu equipo con permisos diferenciados: administrador, recepcionista, profesional.",
  },
  {
    icon: "lucide:clock",
    title: "Control de disponibilidad",
    description:
      "Define horarios por servicio y profesional. El bot consulta la disponibilidad real antes de confirmar.",
  },
  {
    icon: "lucide:trending-up",
    title: "Reportes del negocio",
    description:
      "Servicios más solicitados, horas pico y tendencias. Decisiones basadas en datos reales.",
  },
];

export default function Features() {
  const ref = useFadeIn<HTMLElement>();

  return (
    <section id="features" ref={ref} className="fade-up px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">

        {/* Header — left-aligned */}
        <div className="max-w-xl">
          <p
            className="text-xs font-semibold uppercase tracking-[0.14em]"
            style={{ color: "var(--text-muted)" }}
          >
            Funcionalidades
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] md:text-4xl lg:text-5xl">
            Diseñado para negocios con agenda
          </h2>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Sin apps adicionales para tus clientes. Sin integraciones complicadas para ti.
          </p>
        </div>

        {/* Grid with gap-px technique — no individual borders, no colored accents */}
        <div
          className="mt-16 grid gap-px md:grid-cols-2 lg:grid-cols-3"
          style={{ background: "var(--border)" }}
        >
          {features.map((feature) => (
            <article
              key={feature.title}
              className="flex flex-col gap-5 p-8 transition-colors duration-200 hover:brightness-[0.98] dark:hover:brightness-110"
              style={{ background: "var(--bg)" }}
            >
              <Icon
                icon={feature.icon}
                className="h-5 w-5 shrink-0"
                style={{ color: "var(--text-muted)" }}
              />
              <div>
                <h3 className="text-sm font-semibold tracking-[-0.01em]">
                  {feature.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-[1.8]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
