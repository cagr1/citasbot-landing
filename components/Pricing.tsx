"use client";

import { Icon } from "@iconify/react";
import { useFadeIn } from "@/hooks/useFadeIn";

const plans = [
  {
    name: "Free",
    price: 0,
    description: "Para negocios que quieren empezar sin costo.",
    badge: "14 días trial",
    features: ["10 citas por mes", "45 mensajes WhatsApp", "1 usuario"],
    cta: "Empezar gratis",
    popular: false,
  },
  {
    name: "Starter",
    price: 19,
    description: "Para negocios que quieren crecer en serio.",
    badge: null,
    features: ["40 citas por mes", "120 mensajes WhatsApp", "2 usuarios"],
    cta: "Elegir plan",
    popular: false,
  },
  {
    name: "Pro",
    price: 29,
    description: "El más elegido por negocios en crecimiento.",
    badge: null,
    features: ["80 citas por mes", "240 mensajes WhatsApp", "5 usuarios"],
    cta: "Elegir plan",
    popular: true,
  },
  {
    name: "Business",
    price: 39,
    description: "Para equipos con alto volumen de citas.",
    badge: null,
    features: ["150 citas por mes", "450 mensajes WhatsApp", "10 usuarios"],
    cta: "Elegir plan",
    popular: false,
  },
];

// Gradient border shell — from the AI Features Showcase DESIGN.md technique.
// A 1px wrapper with a gradient background creates a premium hairline frame.
const CARD_BG = "#15171E";
const SECTION_BG = "#0c0d12";

// Shell gradient per card type
function shellGradient(popular: boolean) {
  if (popular) {
    // Brand gradient border for the featured card + glow
    return "linear-gradient(135deg, rgba(79,82,255,0.8) 0%, rgba(139,60,247,0.5) 100%)";
  }
  // Subtle glass border for standard cards
  return "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 100%)";
}

export default function Pricing() {
  const ref = useFadeIn<HTMLElement>();

  return (
    // Section is always dark — independent of light/dark theme
    <section
      id="precios"
      ref={ref}
      className="fade-up px-6 py-24 lg:px-8 lg:py-32"
      style={{ background: SECTION_BG }}
    >
      <div className="mx-auto max-w-7xl">

        {/* Header — on dark background */}
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em]"
            style={{ color: "rgba(255,255,255,0.3)" }}>
            Precios
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-white md:text-4xl lg:text-5xl">
            Planes para cada etapa
          </h2>
          <p className="mt-4 text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.45)" }}>
            Empieza gratis. Escala solo cuando tu agenda lo exija.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (

              // Outer shell — 1px gradient border technique from DESIGN.md
              <div
                key={plan.name}
                className="relative rounded-2xl p-px"
                style={{
                  background: shellGradient(plan.popular),
                  boxShadow: plan.popular
                    ? "0 0 48px rgba(79,82,255,0.18), 0 25px 50px -12px rgba(0,0,0,0.4)"
                    : "0 25px 50px -12px rgba(0,0,0,0.25)",
                }}
              >
                {/* Inner glass surface */}
                <article
                  className="flex h-full min-h-[360px] flex-col rounded-[15px] p-5 xl:p-6"
                  style={{ background: CARD_BG }}
                >
                  {/* Badges row */}
                  <div className="flex min-h-[22px] items-center gap-2">
                    {plan.popular && (
                      <span
                        className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em]"
                        style={{
                          background: "linear-gradient(135deg, #4f52ff, #8b3cf7)",
                          color: "#fff",
                        }}
                      >
                        Popular
                      </span>
                    )}
                    {plan.badge && (
                      <span
                        className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          color: "rgba(255,255,255,0.4)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  {/* Plan name */}
                  <p
                    className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {plan.name}
                  </p>

                  {/* Price */}
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="text-4xl font-extrabold leading-none tracking-[-0.04em] text-white">
                      ${plan.price}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      /mes
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    className="mt-3 min-h-[42px] text-xs leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {plan.description}
                  </p>

                  {/* Divider */}
                  <div
                    className="my-5 h-px w-full"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  />

                  {/* Features */}
                  <ul className="flex flex-col gap-2.5">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2.5 text-xs"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        <span
                          className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                          style={{ background: "rgba(255,255,255,0.07)" }}
                        >
                          <Icon
                            icon="lucide:check"
                            className="h-2.5 w-2.5"
                            style={{
                              color: plan.popular
                                ? "#8b7fff"
                                : "rgba(255,255,255,0.4)",
                            }}
                          />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA — pushed to bottom */}
                  <a
                    href="#"
                    className="mt-auto inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
                    style={
                      plan.popular
                        ? {
                            background: "linear-gradient(135deg, #4f52ff, #8b3cf7)",
                            color: "#fff",
                          }
                        : {
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.09)",
                            color: "rgba(255,255,255,0.75)",
                          }
                    }
                  >
                    {plan.cta}
                  </a>
                </article>
              </div>
            ))}
          </div>
        </div>

        <p
          className="mt-10 text-xs"
          style={{ color: "rgba(255,255,255,0.22)" }}
        >
          Todos los planes incluyen dashboard web, soporte por email y acceso a la API de WhatsApp.
        </p>
      </div>
    </section>
  );
}
