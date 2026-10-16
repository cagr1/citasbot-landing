"use client";

import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

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
      style={{ color: "var(--text-primary)" }}
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

function Card({ show, className, dot, children }: {
  show: boolean;
  className: string;
  dot: string;
  children: string;
}) {
  return (
    <AnimatePresence>
      {show && (
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className={`absolute hidden items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 text-xs font-medium text-ink sm:flex ${className}`}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot }} />
          {children}
        </m.div>
      )}
    </AnimatePresence>
  );
}

export default function HeroChat() {
  const reduce = useReducedMotion();
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
      setMsgs([]);
      setTyping(false);
      setPicked(false);
      setCards(0);

      while (!cancelled) {
        await sleep(GAP);
        if (cancelled) return;
        push(M1);
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
        setMsgs([]);
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
        className="relative w-[270px] rounded-[2.25rem] border border-line bg-white p-2.5 sm:w-[300px] lg:w-[330px]"
      >
        <div
          className="overflow-hidden rounded-[1.75rem]"
          style={{ background: "var(--wa-chat)" }}
        >
          <div className="flex items-center gap-3 px-4 py-3" style={{ background: "#F0F2F5" }}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-xs font-medium text-white">
              CS
            </div>
            <div>
              <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                Clínica Sonrisa
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                en línea
              </div>
            </div>
          </div>

          <div className="flex h-[340px] lg:h-[400px] flex-col justify-end gap-1.5 overflow-hidden p-3 text-[13px] leading-snug">
            <AnimatePresence initial={false}>
              {msgs.map((msg) => (
                <Bubble key={msg.id} msg={msg} picked={picked} />
              ))}
              {typing && <Typing key="typing" />}
            </AnimatePresence>
          </div>
        </div>

        <Card show={cards >= 1} dot="#1F9D55" className="-left-20 top-28">
          Cita confirmada
        </Card>
        <Card show={cards >= 2} dot="var(--accent-soft)" className="-right-8 -bottom-5">
          Recordatorio programado
        </Card>
      </div>
    </LazyMotion>
  );
}
