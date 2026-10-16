"use client";

import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import GridFrame from "./GridFrame";
import PhoneFrame, { ChatBubble } from "./PhoneFrame";

const AUTO_MS = 5000;

function Chips({ picked }: { picked: string }) {
  return (
    <div className="mt-1.5 flex gap-1.5">
      {["10:00", "12:30", "17:00"].map((chip) => {
        const on = chip === picked;
        return (
          <span
            key={chip}
            className="rounded-md border px-2 py-0.5 text-xs"
            style={{
              background: on ? "var(--accent)" : "transparent",
              color: on ? "#fff" : undefined,
              borderColor: on ? "var(--accent)" : "var(--border)",
            }}
          >
            {chip}
          </span>
        );
      })}
    </div>
  );
}

const steps = [
  {
    title: "Reserva",
    description: "Tus clientes eligen servicio y hora en el chat, a cualquier hora.",
  },
  {
    title: "Confirma",
    description: "La cita entra en tu agenda y el cliente recibe la confirmación al momento.",
  },
  {
    title: "Recuerda",
    description: "El día antes le llega un recordatorio. Menos ausencias, sin llamar a nadie.",
  },
  {
    title: "Tu agenda al día",
    description: "Si mueves una cita desde el panel, el cliente recibe el aviso al instante.",
  },
];

const messages: { id: string; step: number; node: ReactNode }[] = [
  {
    id: "reserva-cliente",
    step: 0,
    node: <ChatBubble from="client">Hola, ¿hay disponibilidad el jueves para una limpieza?</ChatBubble>,
  },
  {
    id: "reserva-negocio",
    step: 0,
    node: (
      <ChatBubble from="business">
        <div>Claro. Horarios del jueves 23:</div>
        <Chips picked="12:30" />
      </ChatBubble>
    ),
  },
  {
    id: "confirma-cliente",
    step: 1,
    node: <ChatBubble from="client">12:30</ChatBubble>,
  },
  {
    id: "confirma-negocio",
    step: 1,
    node: (
      <ChatBubble from="business">
        <div>
          ✅ <strong>¡Cita confirmada!</strong>
        </div>
        <div className="mt-1">
          Hola Laura, tu cita para Limpieza dental ha sido agendada el jueves 23 de octubre a las
          12:30. Te esperamos.
        </div>
      </ChatBubble>
    ),
  },
  {
    id: "dia-miercoles",
    step: 2,
    node: (
      <div
        className="mx-auto rounded-md bg-white/80 px-2 py-0.5 text-[11px]"
        style={{ color: "var(--text-muted)" }}
      >
        Miércoles
      </div>
    ),
  },
  {
    id: "recuerda-negocio",
    step: 2,
    node: (
      <ChatBubble from="business">
        <div>
          ⏰ <strong>Recordatorio de cita</strong>
        </div>
        <div className="mt-1">
          Hola Laura, te recordamos tu cita mañana para Limpieza dental a las 12:30. Si necesitas
          reprogramar, avísanos.
        </div>
      </ChatBubble>
    ),
  },
  {
    id: "recuerda-cliente",
    step: 2,
    node: <ChatBubble from="client">Perfecto, allí estaré 👍</ChatBubble>,
  },
  {
    id: "agenda-negocio",
    step: 3,
    node: (
      <ChatBubble from="business">
        <div>
          📅 <strong>Cita reprogramada</strong>
        </div>
        <div className="mt-1">
          Hola Laura, tu cita para Limpieza dental ha sido reprogramada. Nueva fecha: viernes 24 de
          octubre, 10:00.
        </div>
      </ChatBubble>
    ),
  },
  {
    id: "agenda-cliente",
    step: 3,
    node: <ChatBubble from="client">Gracias, me viene mejor 🙌</ChatBubble>,
  },
];

export default function HowItWorks() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [stopped, setStopped] = useState(false);

  // Desktop: el bloque que cruza el centro del viewport es el activo.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    blockRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Móvil: el autoavance solo corre con la sección visible.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const autoplay = visible && !stopped && !reduce;

  const motionProps = reduce
    ? {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        layout: true,
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 },
      };

  const reveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-15%" },
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay },
        };

  const numberMotion = {
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: { duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] as const },
  };

  const phone = (className: string) => (
    <PhoneFrame className={className} screenClassName="h-[400px]">
      <div className="flex h-full flex-col justify-end gap-1.5 overflow-hidden">
        <AnimatePresence initial={false}>
          {messages
            .filter((msg) => msg.step <= active)
            .map((msg) => (
              <m.div key={msg.id} {...motionProps} className="flex flex-col">
                {msg.node}
              </m.div>
            ))}
        </AnimatePresence>
      </div>
    </PhoneFrame>
  );

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="como-funciona"
        ref={sectionRef}
        className="relative px-6 py-20 lg:px-8 lg:py-28"
        style={{ background: "var(--bg)" }}
      >
        <GridFrame />
        <div className="relative mx-auto max-w-6xl">
          <m.h2
            {...reveal(0)}
            className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08] tracking-[-0.02em]"
          >
            Así funciona
          </m.h2>
          <m.p
            {...reveal(0.1)}
            className="mt-4 max-w-[32rem] text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Del primer mensaje a la cita, sin que toques el teléfono.
          </m.p>

          {/* Escritorio */}
          <div className="mt-16 hidden gap-16 lg:grid lg:grid-cols-[minmax(0,1fr)_auto]">
            <div className="relative pl-8">
              <div
                className="absolute bottom-0 left-0 top-0 w-0.5"
                style={{ background: "var(--border)" }}
              >
                <div
                  className="w-full"
                  style={{
                    background: "var(--accent)",
                    height: `${((active + 1) / steps.length) * 100}%`,
                    transition: reduce ? "none" : "height 300ms",
                  }}
                />
              </div>
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  ref={(el) => {
                    blockRefs.current[i] = el;
                  }}
                  data-index={i}
                  className={`flex min-h-[55vh] flex-col justify-center ${
                    reduce ? "" : "transition-opacity duration-300"
                  }`}
                  style={{ opacity: i === active ? 1 : 0.35 }}
                >
                  <div className="relative h-20">
                    <AnimatePresence mode="popLayout" initial={false}>
                      {i === active ? (
                        <m.span
                          key="big"
                          {...numberMotion}
                          className="absolute bottom-0 left-0 text-[5rem] font-medium leading-none tabular-nums"
                          style={{ color: "var(--accent-soft)" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </m.span>
                      ) : (
                        <m.span
                          key="small"
                          {...numberMotion}
                          className="absolute bottom-0 left-0 text-sm tabular-nums"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </m.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <h3 className="mt-2 text-3xl font-medium tracking-[-0.02em] lg:text-4xl">{step.title}</h3>
                  <p
                    className="mt-2 max-w-[26rem] text-lg"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <div className="sticky top-[calc(50vh-15rem)]">{phone("lg:w-[330px]")}</div>
            </div>
          </div>

          {/* Móvil y tablet */}
          <div className="lg:hidden">
            <div
              role="tablist"
              className="mt-10 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {steps.map((step, i) => {
                const on = i === active;
                return (
                  <div key={step.title} className="shrink-0">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => {
                        setActive(i);
                        setStopped(true);
                      }}
                      className={`rounded-full border px-3 py-1.5 text-sm ${
                        on ? "border-ink bg-ink text-white" : "border-line"
                      }`}
                    >
                      {step.title}
                    </button>
                    <div className="mt-1.5 h-0.5 overflow-hidden" aria-hidden>
                      {on && autoplay && (
                        <m.div
                          key={active}
                          className="h-full origin-left"
                          style={{ background: "var(--accent)" }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
                          onAnimationComplete={() => setActive((a) => (a + 1) % steps.length)}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <h3 className="mt-6 text-2xl font-medium">{steps[active].title}</h3>
            <p className="mt-2 max-w-[24rem] text-base" style={{ color: "var(--text-secondary)" }}>
              {steps[active].description}
            </p>

            <div className="mt-8 flex justify-center">{phone("w-[270px] sm:w-[300px]")}</div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
