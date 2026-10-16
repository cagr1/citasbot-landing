"use client";

import { Icon } from "@iconify/react";
import {
  LazyMotion,
  domAnimation,
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type PointerEvent } from "react";

import GridFrame from "@/components/GridFrame";
import HeroChat from "@/components/HeroChat";
import { WA_URL } from "@/lib/contact";

const EASE = [0.22, 1, 0.36, 1] as const;
const WORDS = ["Tu", "agenda", "se", "llena", "sola", "por", "WhatsApp"];
const SOLA = 4;
const TILT_QUERY = "(min-width: 1024px) and (pointer: fine)";

export default function Hero() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.2]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 150, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 150, damping: 20 });
  const rotateY = useTransform(springX, (v) => v * 14);
  const rotateX = useTransform(springY, (v) => -v * 10);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || !window.matchMedia(TILT_QUERY).matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const fadeUp = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE, delay },
  });

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="inicio"
        ref={heroRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative overflow-hidden px-6 pt-10 pb-16 lg:px-8 lg:pt-16 lg:pb-24"
      >
        <GridFrame />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(23,24,28,0.09) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "radial-gradient(ellipse 60% 60% at 70% 40%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 70% 40%, black, transparent)",
          }}
        />

        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <m.div style={{ opacity: textOpacity, y: textY }}>
            <h1
              className="text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.04] tracking-[-0.025em]"
              style={{ color: "var(--text-primary)" }}
            >
              {WORDS.map((word, i) => (
                <span key={i}>
                  <span className="relative inline-block whitespace-nowrap align-bottom">
                    <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                      <m.span
                        className="inline-block"
                        initial={reduce ? false : { y: "105%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.08 * i }}
                      >
                        {word}
                      </m.span>
                    </span>
                    {i === SOLA && (
                      <svg
                        aria-hidden
                        viewBox="0 0 100 12"
                        preserveAspectRatio="none"
                        className="absolute"
                        style={{
                          left: "-4px",
                          bottom: "-0.12em",
                          width: "calc(100% + 8px)",
                          height: "0.22em",
                        }}
                      >
                        <m.path
                          d="M2 8 C 25 2, 60 2, 98 6"
                          stroke="var(--accent-soft)"
                          strokeWidth={3}
                          strokeLinecap="round"
                          fill="none"
                          initial={{ pathLength: reduce ? 1 : 0 }}
                          animate={{ pathLength: 1 }}
                          transition={
                            reduce ? { duration: 0 } : { duration: 0.9, delay: 0.9, ease: "easeOut" }
                          }
                        />
                      </svg>
                    )}
                  </span>
                  {i < WORDS.length - 1 && " "}
                </span>
              ))}
            </h1>

            <m.p
              {...fadeUp(0.5)}
              className="mt-6 max-w-[30rem] text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Tus clientes reservan, confirman y reciben recordatorios. Tú solo atiendes.
            </m.p>

            <m.div {...fadeUp(0.6)} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contacto"
                data-track="demo_click"
                data-track-location="hero"
                className="rounded-full bg-accent px-7 py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Solicitar demo
              </a>
              <a
                href={WA_URL}
                target="_blank"
                rel="noreferrer"
                data-track="whatsapp_click"
                data-track-location="hero"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-[var(--border-strong)]"
              >
                <Icon icon="ic:baseline-whatsapp" className="h-5 w-5" style={{ color: "#25D366" }} />
                Escríbenos por WhatsApp
              </a>
            </m.div>

            <m.p {...fadeUp(0.7)} className="mt-6 text-sm" style={{ color: "var(--text-muted)" }}>
              Demo de 20 minutos · Sin permanencia · Configuración incluida
            </m.p>
          </m.div>

          <div className="flex justify-center">
            <HeroChat progress={scrollYProgress} rotateX={rotateX} rotateY={rotateY} />
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
