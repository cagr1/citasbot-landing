"use client";

import { Icon } from "@iconify/react";
import RegionLink from "@/components/RegionSwitch";
import { useFadeIn } from "@/hooks/useFadeIn";
import type { Region } from "@/lib/region";

type PlanName = "Free" | "Starter" | "Pro";

const plans: {
  name: PlanName;
  prices: Record<Region, { monthly: number; annual: number | null }>;
  description: string;
  badge?: string | null;
  features: string[];
  popular: boolean;
}[] = [
  {
    name: "Free",
    prices: {
      eu: { monthly: 0, annual: null },
      latam: { monthly: 0, annual: null },
    },
    description: "Para negocios que quieren empezar sin costo.",
    features: ["20 citas por mes", "60 mensajes WhatsApp", "1 usuario"],
    popular: false,
  },
  {
    name: "Starter",
    prices: {
      eu: { monthly: 19, annual: 190 },
      latam: { monthly: 12, annual: 120 },
    },
    description: "Para negocios que quieren crecer en serio.",
    features: ["80 citas por mes", "240 mensajes WhatsApp", "2 usuarios"],
    popular: false,
  },
  {
    name: "Pro",
    prices: {
      eu: { monthly: 39, annual: 390 },
      latam: { monthly: 25, annual: 250 },
    },
    description: "El más elegido por negocios en crecimiento.",
    features: [
      "250 citas por mes",
      "750 mensajes WhatsApp",
      "5 usuarios",
      "Asistente IA (próximamente)",
    ],
    popular: true,
  },
];

const formatters: Record<Region, Intl.NumberFormat> = {
  eu: new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }),
  latam: new Intl.NumberFormat("es-419", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }),
};

// es-419 escribe "USD 12"; "US$" se lee mejor y no se confunde con el peso local.
function formatPrice(region: Region, value: number) {
  return formatters[region]
    .formatToParts(value)
    .map((p) => (p.type === "currency" && region === "latam" ? "US$" : p.value))
    .join("");
}

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

function selectPlan(name: PlanName) {
  try {
    sessionStorage.setItem("cb_plan", name);
  } catch {}
  window.dispatchEvent(new CustomEvent("cb-plan", { detail: name }));
}

export default function Pricing({ region }: { region: Region }) {
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
            Prueba 14 días. Te ayudamos a configurarlo.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                      {formatPrice(region, plan.prices[region].monthly)}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      /mes
                    </span>
                    {region === "eu" && plan.prices.eu.monthly > 0 && (
                      <span
                        className="text-sm"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        + IVA
                      </span>
                    )}
                  </div>
                  {plan.prices[region].annual && (
                    <p
                      className="mt-1 text-xs"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {formatPrice(region, plan.prices[region].annual ?? 0)}/año
                    </p>
                  )}

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
                    href="#contacto"
                    onClick={() => selectPlan(plan.name)}
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
                    Solicitar demo
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
          {region === "eu" && " Precios sin IVA. Facturación a empresas y autónomos."}
          {" "}
          <RegionLink region={region} />
        </p>
      </div>
    </section>
  );
}
