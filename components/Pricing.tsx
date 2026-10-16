"use client";

import { Icon } from "@iconify/react";
import {
  AnimatePresence,
  LazyMotion,
  domMax,
  m,
  useReducedMotion,
} from "motion/react";
import { useState } from "react";
import GridFrame from "@/components/GridFrame";
import RegionLink from "@/components/RegionSwitch";
import type { Region } from "@/lib/region";

const EASE = [0.22, 1, 0.36, 1] as const;
const MUTED = { color: "var(--text-secondary)" };

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

function selectPlan(name: PlanName) {
  try {
    sessionStorage.setItem("cb_plan", name);
  } catch {}
  window.dispatchEvent(new CustomEvent("cb-plan", { detail: name }));
}

type Plan = (typeof plans)[number];

function PlanCard({
  plan,
  index,
  region,
  annual,
  reduce,
}: {
  plan: Plan;
  index: number;
  region: Region;
  annual: boolean;
  reduce: boolean | null;
}) {
  const { monthly, annual: annualPrice } = plan.prices[region];
  const showAnnual = annual && annualPrice !== null;
  const price = formatPrice(region, showAnnual ? annualPrice : monthly);

  const card = (
    <article
      className={`flex h-full flex-col bg-surface p-7 ${
        plan.popular
          ? "rounded-[calc(1.5rem-1px)]"
          : "rounded-3xl border border-line"
      }`}
    >
      <div className="flex min-h-[24px] items-center justify-between">
        <h3 className="text-lg font-medium">{plan.name}</h3>
        {plan.popular && (
          <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] text-on-ink">
            Recomendado
          </span>
        )}
      </div>

      <div className="relative mt-5 flex items-baseline gap-1.5">
        <AnimatePresence mode="popLayout" initial={false}>
          <m.span
            key={price}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="text-4xl font-medium leading-none tracking-[-0.03em]"
          >
            {price}
          </m.span>
        </AnimatePresence>
        <span className="text-sm" style={MUTED}>
          {showAnnual ? "/año" : "/mes"}
        </span>
        {region === "eu" && monthly > 0 && (
          <span className="text-sm" style={MUTED}>
            + IVA
          </span>
        )}
      </div>

      <p className="mt-3 min-h-[40px] text-sm" style={MUTED}>
        {plan.description}
      </p>

      <ul className="mt-6 flex flex-col gap-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-sm">
            <Icon
              icon="mdi:check"
              className="h-4 w-4 shrink-0"
              style={{ color: "var(--accent)" }}
            />
            {f}
          </li>
        ))}
      </ul>

      <a
        href="#contacto"
        data-track="demo_click"
        data-track-location="pricing"
        data-track-plan={plan.name}
        onClick={() => selectPlan(plan.name)}
        className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors ${
          plan.popular
            ? "bg-accent text-white hover:bg-accent-hover"
            : "border border-line bg-surface text-ink hover:border-[var(--border-strong)]"
        }`}
      >
        Solicitar demo
      </a>
    </article>
  );

  return (
    <m.div
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE, delay: 0.08 * index },
      }}
      whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.25 } }}
      viewport={{ once: true, margin: "-10%" }}
    >
      {plan.popular ? (
        <div
          className="relative h-full overflow-hidden rounded-3xl p-px"
          style={reduce ? { background: "var(--accent-soft)" } : undefined}
        >
          {!reduce && (
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2"
            >
              <m.div
                className="h-full w-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0 70%, var(--accent-soft) 85%, transparent 100%)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, ease: "linear", repeat: Infinity }}
              />
            </div>
          )}
          <div className="relative h-full">{card}</div>
        </div>
      ) : (
        card
      )}
    </m.div>
  );
}

export default function Pricing({ region }: { region: Region }) {
  const reduce = useReducedMotion();
  const [annual, setAnnual] = useState(false);
  const reveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-15%" },
          transition: { duration: 0.6, ease: EASE, delay },
        };

  const options = [
    { label: "Mensual", value: false },
    { label: "Anual", value: true },
  ];

  return (
    <LazyMotion features={domMax}>
      <section
        id="precios"
        className="relative px-6 py-24 lg:px-8 lg:py-32"
        style={{ background: "var(--bg)" }}
      >
        <GridFrame />
        <div className="relative mx-auto max-w-6xl">
          <m.h2
            {...reveal(0)}
            className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08] tracking-[-0.02em]"
          >
            Precios claros, sin permanencia
          </m.h2>
          <m.p {...reveal(0.1)} className="mt-4 max-w-[32rem] text-lg" style={MUTED}>
            Configuración incluida en todos los planes.
          </m.p>

          <m.div {...reveal(0.15)} className="mt-10 flex justify-center">
            <div className="inline-flex rounded-full border border-line bg-surface p-1">
              {options.map((o) => (
                <button
                  key={o.label}
                  type="button"
                  onClick={() => setAnnual(o.value)}
                  aria-pressed={annual === o.value}
                  className="relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                  style={{ color: annual === o.value ? "var(--on-ink)" : "var(--text-primary)" }}
                >
                  {annual === o.value && (
                    <m.div
                      layoutId="billing-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{o.label}</span>
                  {o.value && (
                    <span
                      className="relative text-[11px]"
                      style={{ color: annual ? "var(--accent-soft)" : "var(--accent)" }}
                    >
                      2 meses gratis
                    </span>
                  )}
                </button>
              ))}
            </div>
          </m.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                index={i}
                region={region}
                annual={annual}
                reduce={reduce}
              />
            ))}
          </div>

          <p className="mt-10 text-xs" style={{ color: "var(--text-muted)" }}>
            Todos los planes incluyen dashboard web, soporte por email y acceso a la API de WhatsApp.
            {region === "eu" && " Precios sin IVA. Facturación a empresas y autónomos."}
            {" "}
            <RegionLink region={region} />
          </p>
        </div>
      </section>
    </LazyMotion>
  );
}
