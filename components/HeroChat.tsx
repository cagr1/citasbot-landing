"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import PhoneFrame, { BUBBLE_SHADOW, BubbleTime } from "./PhoneFrame";

type Msg = {
  id: string;
  from: "client" | "business";
  text: string;
  body?: string;
  chips?: string[];
};

const M1: Msg = {
  id: "m1",
  from: "client",
  text: "Hola, ¿hay disponibilidad el jueves para una limpieza?",
};
const M2: Msg = {
  id: "m2",
  from: "business",
  text: "Claro. Horarios del jueves 23:",
  chips: ["10:00", "12:30", "17:00"],
};
const M3: Msg = { id: "m3", from: "client", text: "12:30" };
const M4: Msg = {
  id: "m4",
  from: "business",
  text: "✅ *¡Cita confirmada!*",
  body: "Hola Laura, tu cita para Limpieza dental ha sido agendada el jueves 23 de octubre a las 12:30. Te esperamos.",
};

const ALL: Msg[] = [M1, M2, M3, M4];
const PICKED = "12:30";
const GAP = 700;
const TYPING = 900;

function Bubble({ msg, picked }: { msg: Msg; picked: boolean }) {
  const client = msg.from === "client";
  const title = msg.text.startsWith("✅") ? (
    <>
      ✅ <strong>¡Cita confirmada!</strong>
    </>
  ) : (
    msg.text
  );

  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className={`rounded-lg px-2.5 py-1.5 ${
        client ? "ml-auto max-w-[80%] bg-[#D9FDD3]" : "mr-auto max-w-[85%] bg-white"
      }`}
      style={{ color: "var(--text-primary)", boxShadow: BUBBLE_SHADOW }}
    >
      <div>{title}</div>
      {msg.body && <div className="mt-1">{msg.body}</div>}
      {msg.chips && (
        <div className="mt-1.5 flex gap-1.5">
          {msg.chips.map((chip) => {
            const on = picked && chip === PICKED;
            return (
              <span
                key={chip}
                className="rounded-md border px-2 py-0.5 text-xs transition-colors"
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
      )}
      <BubbleTime client={client} />
    </m.div>
  );
}

function Typing() {
  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="mr-auto flex gap-1 rounded-lg bg-white px-2.5 py-2.5"
      style={{ boxShadow: BUBBLE_SHADOW }}
      aria-label="escribiendo"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-[5px] w-[5px] animate-bounce rounded-full bg-[var(--text-muted)]"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </m.div>
  );
}

const CARD_STYLE = {
  boxShadow: "0 12px 30px -12px rgba(23,24,28,0.25)",
};

function FloatCard({
  show = true,
  y,
  className,
  duration,
  offset,
  reduce,
  children,
}: {
  show?: boolean;
  y: MotionValue<number>;
  className: string;
  duration: number;
  offset: number;
  reduce: boolean | null;
  children: ReactNode;
}) {
  return (
    <m.div style={{ y }} className={`absolute hidden lg:block ${className}`}>
      <AnimatePresence>
        {show && (
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <m.div
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration, ease: "easeInOut", repeat: Infinity, delay: offset }}
              className="rounded-2xl border border-line bg-white/90 px-3.5 py-2.5 backdrop-blur"
              style={CARD_STYLE}
            >
              {children}
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}

function StatusCard({ icon, color, children }: { icon: string; color: string; children: string }) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap text-xs font-medium text-ink">
      <Icon icon={icon} className="h-4 w-4" style={{ color }} />
      {children}
    </div>
  );
}

export default function HeroChat({
  progress,
  rotateX,
  rotateY,
}: {
  progress: MotionValue<number>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const phoneY = useTransform(progress, [0, 1], [0, reduce ? 0 : -60]);
  const panelY = useTransform(progress, [0, 1], [0, reduce ? 0 : 50]);
  const card1Y = useTransform(progress, [0, 1], [0, reduce ? 0 : -140]);
  const card2Y = useTransform(progress, [0, 1], [0, reduce ? 0 : -90]);
  const card3Y = useTransform(progress, [0, 1], [0, reduce ? 0 : -40]);
  const rootRef = useRef<HTMLDivElement>(null);

  // El primer render (SSR) es el estado final completo.
  const [msgs, setMsgs] = useState<Msg[]>(ALL);
  const [typing, setTyping] = useState(false);
  const [picked, setPicked] = useState(true);
  const [cards, setCards] = useState(2);

  useEffect(() => {
    const showFinal = () => {
      setMsgs(ALL);
      setTyping(false);
      setPicked(true);
      setCards(2);
    };

    const root = rootRef.current;
    if (reduce || !root) {
      showFinal();
      return;
    }

    let cancelled = false;
    let visible = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let wake: (() => void) | undefined;

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && wake) {
        const w = wake;
        wake = undefined;
        w();
      }
    });
    observer.observe(root);

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, ms);
      }).then(async () => {
        // Si está fuera de pantalla, espera a volver a ser visible.
        if (!visible && !cancelled) {
          await new Promise<void>((resolve) => {
            wake = resolve;
          });
        }
      });

    const push = (msg: Msg) => setMsgs((prev) => [...prev, msg]);

    const business = async (msg: Msg) => {
      await sleep(GAP);
      if (cancelled) return;
      setTyping(true);
      await sleep(TYPING);
      if (cancelled) return;
      setTyping(false);
      push(msg);
    };

    const run = async () => {
      // El primer mensaje del cliente siempre queda visible.
      setMsgs([M1]);
      setTyping(false);
      setPicked(false);
      setCards(0);

      while (!cancelled) {
        await business(M2);
        if (cancelled) return;
        await sleep(GAP);
        if (cancelled) return;
        setPicked(true);
        await sleep(GAP);
        if (cancelled) return;
        push(M3);
        await business(M4);
        if (cancelled) return;
        setCards(1);
        await sleep(600);
        if (cancelled) return;
        setCards(2);
        await sleep(3500);
        if (cancelled) return;
        setCards(0);
        setMsgs([M1]);
        setPicked(false);
        await sleep(GAP);
      }
    };

    run();

    return () => {
      cancelled = true;
      clearTimeout(timer);
      wake = undefined;
      observer.disconnect();
    };
  }, [reduce]);

  return (
    <LazyMotion features={domAnimation}>
      <div
        ref={rootRef}
        className="relative mx-auto h-[540px] w-[300px] sm:h-[560px] lg:h-[600px] lg:w-[560px]"
      >
        <m.div
          aria-hidden
          style={{ y: panelY }}
          className="absolute -right-6 top-14 h-[440px] w-[300px] rotate-[-4deg] overflow-hidden rounded-[2.5rem] sm:h-[480px] lg:left-0 lg:right-auto lg:top-0 lg:h-[540px] lg:w-[440px]"
        >
          <Image
            src="/images/hero-recepcionista-clinica.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 440px, 300px"
            className="object-cover"
            style={{ objectPosition: "25% center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </m.div>

        <m.div
          style={{ y: phoneY, rotateX, rotateY, transformPerspective: 1200 }}
          className="absolute left-0 top-4 w-[300px] lg:left-auto lg:right-0 lg:top-[120px] lg:w-[320px]"
        >
          <m.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          >
            <PhoneFrame className="w-full" screenClassName="h-[300px] sm:h-[320px] lg:h-[400px]">
              <AnimatePresence initial={false}>
                {msgs.map((msg) => (
                  <Bubble key={msg.id} msg={msg} picked={picked} />
                ))}
                {typing && <Typing key="typing" />}
              </AnimatePresence>
            </PhoneFrame>
          </m.div>
        </m.div>

        <FloatCard
          show={cards >= 1}
          y={card1Y}
          reduce={reduce}
          duration={4}
          offset={0}
          className="-left-10 top-12"
        >
          <StatusCard icon="mdi:check-circle" color="#1F9D55">
            Cita confirmada
          </StatusCard>
        </FloatCard>

        <FloatCard
          y={card3Y}
          reduce={reduce}
          duration={5}
          offset={1.2}
          className="-left-6 bottom-24"
        >
          <div className="flex items-center gap-3">
            <div className="text-center leading-none">
              <div className="text-[10px] font-medium" style={{ color: "var(--accent)" }}>
                JUE
              </div>
              <div className="mt-1 text-2xl font-semibold text-ink">23</div>
            </div>
            <div className="whitespace-nowrap text-xs">
              <div className="font-medium text-ink">12:30 · Limpieza dental</div>
              <div style={{ color: "var(--text-muted)" }}>Laura M.</div>
            </div>
          </div>
        </FloatCard>

        <FloatCard
          show={cards >= 2}
          y={card2Y}
          reduce={reduce}
          duration={4.5}
          offset={0.6}
          className="-right-4 bottom-2"
        >
          <StatusCard icon="mdi:bell-ring-outline" color="var(--accent-soft)">
            Recordatorio programado
          </StatusCard>
        </FloatCard>
      </div>
    </LazyMotion>
  );
}
