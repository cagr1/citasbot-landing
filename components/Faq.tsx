"use client";

import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const items: { q: string; a: ReactNode }[] = [
  {
    q: "¿Mis clientes tienen que instalar algo?",
    a: "No. Escriben al WhatsApp de tu negocio, como hacen siempre.",
  },
  {
    q: "¿Necesito un número nuevo?",
    a: "Usas un número de WhatsApp Business conectado a la API oficial de Meta. Te ayudamos a configurarlo.",
  },
  {
    q: "¿Cuánto tarda en estar listo?",
    a: "Conectar WhatsApp lleva unos minutos. Tus servicios y horarios los dejamos listos contigo, sin coste.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí. No hay permanencia ni penalizaciones.",
  },
  {
    q: "¿Están protegidos mis datos y los de mis clientes?",
    a: (
      <>
        Sí. Cumplimos el RGPD y solo usamos los datos para gestionar tus citas.{" "}
        <a
          href="/privacy-policy.html"
          target="_blank"
          rel="noreferrer"
          className="underline"
          style={{ color: "var(--text-primary)" }}
        >
          Política de privacidad
        </a>
      </>
    ),
  },
];

export default function Faq() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <LazyMotion features={domAnimation}>
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <m.h2
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08] tracking-[-0.02em]"
          >
            Preguntas frecuentes
          </m.h2>

          <div className="mt-10">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q} style={{ borderBottom: "1px solid var(--border)" }}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-medium"
                  >
                    {item.q}
                    <m.span
                      aria-hidden
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: reduce ? 0 : 0.25, ease: EASE }}
                      className="shrink-0 text-2xl leading-none"
                    >
                      +
                    </m.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        id={`faq-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5" style={{ color: "var(--text-secondary)" }}>
                          {item.a}
                        </p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
