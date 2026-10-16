"use client";

import { Icon } from "@iconify/react";
import {
  LazyMotion,
  animate,
  domAnimation,
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import GridFrame from "./GridFrame";

const EASE = [0.22, 1, 0.36, 1] as const;
const MUTED = { color: "var(--text-secondary)" };

function Card({
  index,
  className = "",
  children,
}: {
  index: number;
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <m.article
      initial={reduce ? false : { opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: EASE, delay: 0.08 * index },
      }}
      whileHover={
        reduce
          ? undefined
          : {
              y: -4,
              boxShadow: "0 20px 40px -20px rgba(23,24,28,0.25)",
              transition: { duration: 0.25 },
            }
      }
      viewport={{ once: true, margin: "-10%" }}
      className={`group relative overflow-hidden rounded-3xl border border-line bg-white ${className}`}
    >
      {children}
    </m.article>
  );
}

function CardText({ title, children }: { title: string; children: string }) {
  return (
    <>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-1 text-sm" style={MUTED}>
        {children}
      </p>
    </>
  );
}

type Appt = {
  name: string;
  service: string;
  col: 0 | 1;
  top: number;
  wa: boolean;
  fresh?: boolean;
};

const HOUR_H = 48;
const HOURS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
const PROS = ["Dra. Ruiz", "Dr. Méndez"];

const APPTS: Appt[] = [
  { name: "Laura M.", service: "Limpieza", col: 0, top: 0, wa: true },
  { name: "Carmen R.", service: "Revisión", col: 1, top: 0, wa: false },
  { name: "Pedro S.", service: "Revisión", col: 1, top: 1.5, wa: true },
  { name: "Ana G.", service: "Ortodoncia", col: 0, top: 2, wa: true },
  { name: "Luis T.", service: "Blanqueamiento", col: 1, top: 3, wa: true },
];

const FRESH: Appt = { name: "Laura M.", service: "Nueva · 12:30", col: 0, top: 3.5, wa: true, fresh: true };

function Block({ appt, order }: { appt: Appt; order: number }) {
  const reduce = useReducedMotion();
  const fresh = appt.fresh;
  const delay = fresh ? APPTS.length * 0.12 + 0.3 : order * 0.12;
  return (
    <m.div
      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
      whileInView={{
        opacity: 1,
        scale: fresh && !reduce ? [0.9, 1.04, 1] : 1,
        transition: { duration: fresh ? 0.6 : 0.35, ease: EASE, delay },
      }}
      viewport={{ once: true, margin: "-10%" }}
      className="absolute inset-x-1 overflow-hidden rounded-lg px-2 py-1 text-[11px] leading-tight"
      style={{
        top: appt.top * HOUR_H + 4,
        height: fresh ? 36 : HOUR_H - 8,
        background: appt.wa ? "#F6E3DA" : "#EEF0F3",
        borderLeft: appt.wa ? "3px solid var(--accent)" : "3px solid #C9CDD3",
        color: "var(--ink)",
      }}
    >
      <div className="flex items-center gap-1 font-medium">
        {appt.wa && <Icon icon="ic:baseline-whatsapp" className="h-[10px] w-[10px] text-[#1F9D55]" />}
        <span className="truncate">{fresh ? appt.service : `${appt.name} · ${appt.service}`}</span>
      </div>
      {fresh && <div className="truncate">{appt.name}</div>}
    </m.div>
  );
}

function DashboardMock() {
  return (
    <div className="p-3 text-[11px]">
      <div className="grid grid-cols-[40px_1fr_1fr] gap-2 pb-2 font-medium">
        <span />
        {PROS.map((p) => (
          <span key={p} className="text-center">
            {p}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-[40px_1fr_1fr] gap-2">
        <div>
          {HOURS.map((h) => (
            <div key={h} style={{ height: HOUR_H, color: "var(--text-muted)" }}>
              {h}
            </div>
          ))}
        </div>
        {[0, 1].map((col) => (
          <div
            key={col}
            className="relative rounded-md"
            style={{
              height: HOUR_H * HOURS.length,
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent 0, transparent 47px, #ECE8E1 47px, #ECE8E1 48px)",
            }}
          >
            {APPTS.map((a, i) => (a.col === col ? <Block key={a.name + a.top} appt={a} order={i} /> : null))}
            {FRESH.col === col && <Block appt={FRESH} order={APPTS.length} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function AgendaCard() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.92, 1]);

  return (
    <Card index={0} className="flex flex-col lg:col-span-4 lg:row-span-2">
      <div className="p-6 pb-0">
        <CardText title="Tu agenda del día">Cada reserva de WhatsApp aparece aquí al momento.</CardText>
      </div>
      <div className="relative min-h-0 flex-1 px-6 pb-6 pt-8">
        <m.div
          ref={ref}
          style={{ rotateX, scale, transformPerspective: 1400, transformOrigin: "top center" }}
          className="h-[320px] lg:h-full"
        >
          <div className="h-full overflow-hidden rounded-xl border border-line bg-[#FBFAF8] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-center gap-3 border-b border-line px-3 py-2">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-2 w-2 rounded-full bg-[#D5D8DD]" />
                ))}
              </div>
              <span
                className="rounded-md bg-white px-2 py-0.5 text-[11px]"
                style={{ color: "var(--text-muted)" }}
              >
                app.citasbot.app/agenda
              </span>
            </div>
            {/* sustituible por una captura real del dashboard en /images/dashboard.png */}
            <div className="h-[calc(100%-33px)] overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <DashboardMock />
            </div>
          </div>
        </m.div>
        <m.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 1.3 } }}
          viewport={{ once: true, margin: "-10%" }}
          className="absolute right-9 top-1 flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-xs font-medium"
          style={{ boxShadow: "0 12px 30px -12px rgba(23,24,28,0.25)" }}
        >
          <Icon icon="ic:baseline-whatsapp" className="h-3.5 w-3.5 text-[#1F9D55]" />
          +3 citas hoy por WhatsApp
        </m.div>
      </div>
    </Card>
  );
}

function PhotoCard({
  index,
  className,
  src,
  title,
  text,
  chip,
}: {
  index: number;
  className: string;
  src: string;
  title: string;
  text: string;
  chip: ReactNode;
}) {
  return (
    <Card index={index} className={`min-h-[260px] ${className}`}>
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute right-4 top-4">{chip}</div>
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="mt-1 text-sm text-white/85">{text}</p>
      </div>
    </Card>
  );
}

const CHIP = "rounded-full bg-white/85 px-3 py-1 text-xs backdrop-blur";

function RemindersCard() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (reduce) {
      count.set(24);
      return;
    }
    if (!inView) return;
    const controls = animate(count, 24, { duration: 1.2, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, reduce, count]);

  const on = reduce || inView;

  return (
    <Card index={1} className="p-6 lg:col-span-2">
      <CardText title="Recordatorios automáticos">El día antes, sin que nadie llame.</CardText>
      <div ref={ref} className="mt-6 flex items-center gap-3">
        <span className="relative h-6 w-11 shrink-0 rounded-full bg-[#D5D8DD]">
          <m.span
            aria-hidden
            initial={false}
            animate={{ opacity: on ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 0.3 }}
            className="absolute inset-0 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          <m.span
            aria-hidden
            initial={false}
            animate={{ x: on ? 20 : 0 }}
            transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 0.3, ease: EASE }}
            className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow"
          />
        </span>
        <span className="text-sm">Recordar 24 h antes</span>
      </div>
      <div className="mt-6">
        <m.div className="text-3xl font-medium tabular-nums">{rounded}</m.div>
        <div className="text-sm" style={MUTED}>
          recordatorios enviados hoy
        </div>
      </div>
    </Card>
  );
}

const SERVICES = [
  ["Limpieza dental", "45 min"],
  ["Revisión", "30 min"],
  ["Blanqueamiento", "60 min"],
];
const SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"];

function ScheduleCard() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const lit = reduce || inView;

  return (
    <Card index={2} className="p-6 lg:col-span-3">
      <CardText title="Horarios y servicios">
        Tú defines qué ofreces y cuándo. El bot respeta tu disponibilidad.
      </CardText>
      <div ref={ref} className="mt-5 grid gap-5 sm:grid-cols-2">
        <ul className="text-sm">
          {SERVICES.map(([name, time]) => (
            <li key={name} className="flex justify-between border-b border-line py-2">
              <span>{name}</span>
              <span style={{ color: "var(--text-muted)" }}>{time}</span>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-4 gap-1.5">
          {SLOTS.map((slot, i) => (
            <span
              key={slot}
              className="relative flex items-center justify-center rounded-md border border-line py-1 text-xs"
            >
              {slot}
              <m.span
                aria-hidden
                initial={false}
                animate={{ opacity: lit ? 1 : 0 }}
                transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : 0.2 + i * 0.15 }}
                className="absolute inset-0 flex items-center justify-center rounded-md text-white"
                style={{ background: "var(--accent)" }}
              >
                {slot}
              </m.span>
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}

const AVATARS = [
  { initials: "AR", bg: "var(--ink)", color: "#fff" },
  { initials: "MP", bg: "var(--accent)", color: "#fff" },
  { initials: "LT", bg: "#E8DCC8", color: "var(--ink)" },
];

function ProsChip() {
  return (
    <span className={`${CHIP} flex items-center gap-2`}>
      <span className="flex">
        {AVATARS.map((a, i) => (
          <span
            key={a.initials}
            className="flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-white text-[8px] font-medium"
            style={{ background: a.bg, color: a.color, marginLeft: i === 0 ? 0 : -8 }}
          >
            {a.initials}
          </span>
        ))}
      </span>
      3 profesionales
    </span>
  );
}

function NoAppsCard() {
  return (
    <Card index={5} className="flex min-h-[260px] flex-col lg:col-span-6 lg:block">
      <div className="flex flex-col justify-center p-8 lg:h-full lg:w-1/2">
        <p className="text-2xl font-medium leading-tight lg:text-3xl">
          Tus clientes no instalan nada.{" "}
          <span style={{ color: "var(--accent)" }}>Solo WhatsApp.</span>
        </p>
        <p className="mt-3 text-base" style={{ color: "var(--text-muted)" }}>
          Funciona con el WhatsApp que ya usan cada día.
        </p>
      </div>
      <div className="relative h-52 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-1/2">
        <Image
          src="/images/detalle-manos-movil.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 576px, 100vw"
          className="object-cover"
          style={{ objectPosition: "center" }}
        />
      </div>
    </Card>
  );
}

export default function Features() {
  const reduce = useReducedMotion();
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
        id="features"
        className="relative px-6 py-24 lg:px-8 lg:py-32"
        style={{ background: "var(--bg)" }}
      >
        <GridFrame />
        <div className="relative mx-auto max-w-6xl">
          <m.h2
            {...reveal(0)}
            className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08] tracking-[-0.02em]"
          >
            Tu recepción, sin recepcionista
          </m.h2>
          <m.p {...reveal(0.1)} className="mt-4 max-w-[32rem] text-lg" style={MUTED}>
            Todo lo que hoy haces por teléfono, resuelto en el chat y en un panel.
          </m.p>

          <div className="mt-14 grid gap-4 lg:auto-rows-[260px] lg:grid-cols-6">
            <AgendaCard />
            <PhotoCard
              index={1}
              className="lg:col-span-2"
              src="/images/bento-barberia.jpg"
              title="Barberías y peluquerías"
              text="Tus clientes reservan corte mientras tú cortas."
              chip={<span className={CHIP}>Corte + barba · 18:00</span>}
            />
            <RemindersCard />
            <ScheduleCard />
            <PhotoCard
              index={4}
              className="lg:col-span-3"
              src="/images/bento-fisioterapia.jpg"
              title="Varios profesionales"
              text="Cada uno con su agenda y sus horarios."
              chip={<ProsChip />}
            />
            <NoAppsCard />
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
