import type { ReactNode } from "react";

export function ChatBubble({
  from,
  children,
}: {
  from: "client" | "business";
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-lg px-2.5 py-1.5 ${
        from === "client" ? "ml-auto max-w-[80%] bg-[#D9FDD3]" : "mr-auto max-w-[85%] bg-white"
      }`}
      style={{ color: "var(--text-primary)" }}
    >
      {children}
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
      className={`relative rounded-[2.25rem] border border-line bg-white p-2.5 ${className}`}
    >
      <div className="overflow-hidden rounded-[1.75rem]" style={{ background: "var(--wa-chat)" }}>
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

        <div
          className={`flex flex-col justify-end gap-1.5 overflow-hidden p-3 text-[13px] leading-snug ${screenClassName}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
