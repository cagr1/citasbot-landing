"use client";

import { Icon } from "@iconify/react";
import { LazyMotion, domAnimation, m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useActionState, useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { useFormStatus } from "react-dom";
import { sendContactEmail, type ContactState } from "@/app/actions/contact";
import { WA_URL } from "@/lib/contact";
import type { Region } from "@/lib/region";

const EASE = [0.22, 1, 0.36, 1] as const;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
    >
      {pending ? "Enviando..." : "Solicitar demo"}
    </button>
  );
}

const initialState: ContactState = { success: false, message: "" };

const inputClass =
  "w-full rounded-xl border border-line bg-[var(--bg)] px-4 py-3 text-sm outline-none transition-colors focus:border-ink";

const inputStyle = { color: "var(--text-primary)" };

const perks = ["Configuración incluida", "Sin permanencia", "Te escribimos en menos de 24 h"];

export default function Contact({ region }: { region: Region }) {
  const [state, action] = useActionState(sendContactEmail, initialState);
  const [plan, setPlan] = useState("");
  const [origin, setOrigin] = useState({ utm_source: "", utm_medium: "", utm_campaign: "", referrer: "" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let referrer = document.referrer;
    if (referrer) {
      try {
        if (new URL(referrer).origin === window.location.origin) referrer = "";
      } catch {
        referrer = "";
      }
    }
    setOrigin({
      utm_source: params.get("utm_source") ?? "",
      utm_medium: params.get("utm_medium") ?? "",
      utm_campaign: params.get("utm_campaign") ?? "",
      referrer,
    });
  }, []);

  useEffect(() => {
    if (state.success) track("form_submit", { region, plan: plan || "-" });
  }, [state.success]);

  useEffect(() => {
    const onPlan = (e: Event) => setPlan((e as CustomEvent<string>).detail);
    window.addEventListener("cb-plan", onPlan);
    return () => window.removeEventListener("cb-plan", onPlan);
  }, []);

  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start center"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const reveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-15%" },
          transition: { duration: 0.6, ease: EASE, delay },
        };

  return (
    <LazyMotion features={domAnimation}>
    <section
      id="contacto"
      ref={sectionRef}
      className="relative px-6 py-24 lg:px-8 lg:py-32"
    >
      <m.div
        aria-hidden
        className="absolute inset-0 mx-4 overflow-hidden rounded-[2.5rem] bg-block dark:border dark:border-[var(--border)] lg:mx-8"
        style={reduce ? undefined : { scale: bgScale }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
      </m.div>
      <div className="relative mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          {/* Left — copy */}
          <m.div {...reveal(0)}>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08] tracking-[-0.02em] text-white">
              Te lo enseñamos con tu negocio
            </h2>
            <p className="mt-4 text-lg text-white/70">
              20 minutos por videollamada. Sin compromiso.
            </p>
            <ul className="mt-8 flex flex-col gap-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2.5 text-white">
                  <Icon
                    icon="mdi:check"
                    className="h-5 w-5 shrink-0"
                    style={{ color: "var(--accent-soft)" }}
                  />
                  {perk}
                </li>
              ))}
            </ul>
            <a
              href={WA_URL}
              target="_blank"
              rel="noreferrer"
              data-track="whatsapp_click"
              data-track-location="contact"
              className="mt-8 inline-block text-sm text-white/80 underline underline-offset-4 transition-colors hover:text-white"
            >
              ¿Prefieres WhatsApp? Escríbenos
            </a>
          </m.div>

          {/* Right — form */}
          <m.div {...reveal(0.15)} className="rounded-3xl bg-surface p-6 lg:p-8">
            {state.success ? (
              <div className="py-10 text-center">
                <div
                  className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full text-2xl"
                  style={{ background: "var(--bg-subtle)", color: "var(--accent)" }}
                >
                  ✓
                </div>
                <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                  ¡Mensaje enviado!
                </p>
                <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  {state.message}
                </p>
              </div>
            ) : (
              <form action={action} className="space-y-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Nombre
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Tu nombre o el de tu negocio"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Correo
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="tu@correo.com"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="mb-1.5 block text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    WhatsApp (opcional)
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="+34 600 000 000"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-business"
                    className="mb-1.5 block text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Tipo de negocio (opcional)
                  </label>
                  <input
                    id="contact-business"
                    type="text"
                    name="business"
                    placeholder="Clínica, peluquería, gestoría..."
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-plan"
                    className="mb-1.5 block text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Plan (opcional)
                  </label>
                  <select
                    id="contact-plan"
                    name="plan"
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  >
                    <option value="">Selecciona un plan</option>
                    <option value="Free">Free</option>
                    <option value="Starter">Starter</option>
                    <option value="Pro">Pro</option>
                    <option value="No lo sé">No lo sé</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Mensaje (opcional)
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Cuéntanos sobre tu negocio y cuántas citas manejas al mes..."
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                  />
                </div>

                <input type="hidden" name="region" value={region} />
                <input type="hidden" name="utm_source" value={origin.utm_source} />
                <input type="hidden" name="utm_medium" value={origin.utm_medium} />
                <input type="hidden" name="utm_campaign" value={origin.utm_campaign} />
                <input type="hidden" name="referrer" value={origin.referrer} />

                <label
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <input type="checkbox" name="privacy" required className="mt-1" />
                  <span>
                    He leído la{" "}
                    <a
                      href="/privacy-policy.html"
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold underline"
                      style={{ color: "var(--brand)" }}
                    >
                      política de privacidad
                    </a>
                  </span>
                </label>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Responsable: Carlos Gallardo (CitasBot). Finalidad: responder a tu solicitud de demo.
                  Legitimación: tu solicitud. Destinatario: Resend (envío de correo, EE. UU.). Derechos:
                  acceso, supresión y los demás que explica la política, en hello@citasbot.app.
                </p>

                {state.message && !state.success && (
                  <p className="text-sm" style={{ color: "#ef4444" }}>
                    {state.message}
                  </p>
                )}

                <SubmitButton />
              </form>
            )}
          </m.div>
        </div>
      </div>
    </section>
    </LazyMotion>
  );
}
