"use client";

import { Icon } from "@iconify/react";
import type { ReactNode } from "react";

const BLUE = "#007AFF";

const PATTERN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60' fill='none' stroke='#17181C' stroke-opacity='0.06' stroke-width='1'>" +
  "<circle cx='12' cy='14' r='5'/><circle cx='44' cy='40' r='3'/>" +
  "<path d='M34 10l6 6M40 10l-6 6'/><path d='M8 44q4-6 8 0t8 0'/>" +
  "<rect x='46' y='8' width='7' height='7' rx='2'/><path d='M26 30l4 7h-8z'/></svg>";

const PATTERN = `url("data:image/svg+xml;utf8,${encodeURIComponent(PATTERN_SVG)}")`;

export const BUBBLE_SHADOW = "0 1px 0.5px rgba(0,0,0,0.13)";

export function BubbleTime({ client }: { client: boolean }) {
  return (
    <div className="mt-0.5 flex items-center justify-end gap-0.5 text-[10px] leading-none text-black/40">
      <span>12:30</span>
      {client && <Icon icon="mdi:check-all" className="h-3 w-3" style={{ color: "#53BDEB" }} />}
    </div>
  );
}

export function ChatBubble({
  from,
  children,
}: {
  from: "client" | "business";
  children: ReactNode;
}) {
  const client = from === "client";
  return (
    <div
      className={`rounded-lg px-2.5 py-1.5 ${
        client ? "ml-auto max-w-[80%] bg-[#D9FDD3]" : "mr-auto max-w-[85%] bg-white"
      }`}
      style={{ color: "var(--text-primary)", boxShadow: BUBBLE_SHADOW }}
    >
      {children}
      <BubbleTime client={client} />
    </div>
  );
}

export default function PhoneFrame({
  children,
  className = "",
  screenClassName = "",
}: {
  children: ReactNode;
  className?: string;
  screenClassName?: string;
}) {
  return (
    <div
      className={`relative rounded-[3rem] bg-[var(--phone-bezel)] p-[10px] ${className}`}
      style={{
        boxShadow:
          "0 30px 60px -20px rgba(var(--shadow-color),0.45), 0 0 0 1px var(--phone-ring), 0 0 0 1px rgba(255,255,255,0.06) inset",
        "--text-primary": "#17181c",
        "--text-secondary": "#5e5f66",
        "--text-muted": "#76777d",
        "--border": "#e7e3dc",
        "--ink": "#17181c",
        "--on-ink": "#ffffff",
      } as React.CSSProperties}
    >
      {/* Botones laterales */}
      <div aria-hidden className="absolute -left-[3px] top-24 h-10 w-[3px] rounded-l bg-[var(--phone-bezel)]" />
      <div aria-hidden className="absolute -left-[3px] top-40 h-16 w-[3px] rounded-l bg-[var(--phone-bezel)]" />
      <div aria-hidden className="absolute -right-[3px] top-32 h-20 w-[3px] rounded-r bg-[var(--phone-bezel)]" />

      <div className="relative overflow-hidden rounded-[2.4rem]" style={{ background: "#EFEAE2" }}>
        {/* Isla dinámica */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[10px] z-10 h-[26px] w-[90px] -translate-x-1/2 rounded-full bg-black"
        />

        {/* Barra de estado */}
        <div
          className="flex h-11 items-end justify-between px-6 pb-1 text-[12px] font-semibold"
          style={{ background: "#F7F7F7", color: "var(--text-primary)" }}
        >
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <Icon icon="mdi:signal-cellular-3" className="h-[14px] w-[14px]" />
            <Icon icon="mdi:wifi" className="h-[14px] w-[14px]" />
            <Icon icon="mdi:battery-80" className="h-[14px] w-[14px]" />
          </span>
        </div>

        {/* Cabecera de WhatsApp */}
        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{ background: "#F7F7F7", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
        >
          <Icon icon="mdi:chevron-left" className="h-6 w-6 shrink-0" style={{ color: BLUE }} />
          <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#17181C] text-[11px] font-medium text-white">
            CS
          </div>
          <div className="min-w-0 flex-1">
            <div
              className="truncate text-[13px] font-semibold leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Clínica Sonrisa
            </div>
            <div className="text-[11px] leading-tight" style={{ color: "var(--text-muted)" }}>
              en línea
            </div>
          </div>
          <Icon icon="mdi:video-outline" className="h-5 w-5 shrink-0" style={{ color: BLUE }} />
          <Icon icon="mdi:phone-outline" className="h-5 w-5 shrink-0" style={{ color: BLUE }} />
        </div>

        {/* Chat */}
        <div
          className={`flex flex-col justify-end gap-1.5 overflow-hidden p-3 text-[13px] leading-snug ${screenClassName}`}
          style={{ backgroundColor: "#EFEAE2", backgroundImage: PATTERN, backgroundSize: "60px 60px" }}
        >
          {children}
        </div>

        {/* Barra inferior */}
        <div className="flex items-center gap-2 bg-[#F7F7F7] px-3 py-2">
          <Icon icon="mdi:plus" className="h-5 w-5 shrink-0" style={{ color: BLUE }} />
          <div
            className="flex-1 rounded-full border border-black/5 bg-white px-3 py-1 text-[12px]"
            style={{ color: "var(--text-muted)" }}
          >
            Mensaje
          </div>
          <Icon icon="mdi:microphone-outline" className="h-5 w-5 shrink-0" style={{ color: BLUE }} />
        </div>
      </div>
    </div>
  );
}
