import { Icon } from "@iconify/react";

const messages = [
  {
    side: "left",
    icon: "lucide:bot",
    content: ["Hola, soy el asistente", "de Estética Luna.", "¿Qué servicio necesitas?"],
  },
  {
    side: "right",
    content: ["Corte de cabello"],
  },
  {
    side: "left",
    icon: "lucide:bot",
    content: ["Perfecto. ¿Qué día", "prefieres?"],
  },
  {
    side: "right",
    content: ["Mañana a las 3pm"],
  },
  {
    side: "left",
    icon: "lucide:bot",
    content: ["¡Listo! Tu cita está", "confirmada:", "Martes 3:00 PM", "Recibirás recordatorio"],
  },
];

export default function WhatsAppMock() {
  return (
    <div
      className="mx-auto w-full max-w-[320px] overflow-hidden rounded-2xl border shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
      style={{ borderColor: "var(--border)", background: "var(--bg-elevated)" }}
    >
      <div className="flex items-center justify-between bg-[#075E54] px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          <Icon icon="lucide:arrow-left" className="h-4 w-4" />
          <div>
            <p className="text-sm font-semibold">CitasBot</p>
            <p className="inline-flex items-center gap-1 text-xs text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
              En linea
            </p>
          </div>
        </div>
        <Icon icon="lucide:more-vertical" className="h-4 w-4 text-white/80" />
      </div>

      <div className="flex flex-col gap-3 p-4" style={{ background: "var(--wa-chat)" }}>
        {messages.map((message, index) => {
          const isUser = message.side === "right";

          return (
            <div
              key={`${message.side}-${index}`}
              className={`max-w-[86%] opacity-0 ${isUser ? "self-end" : "self-start"} animate-message-in`}
              style={{ animationDelay: `${index * 400 + 200}ms` }}
            >
              <div
                className={`rounded-xl px-3.5 py-2.5 text-sm shadow-sm ${isUser ? "rounded-tr-sm bg-brand-gradient text-white" : "rounded-tl-sm"}`}
                style={isUser ? undefined : { background: "var(--bg-elevated)", color: "var(--text-primary)" }}
              >
                <div className="flex items-start gap-2">
                  {!isUser && message.icon ? (
                    <Icon icon={message.icon} className="mt-0.5 h-4 w-4 shrink-0 text-brand-from" />
                  ) : null}
                  <div className="inline-block align-top">
                    {message.content.map((line) => {
                      const isCalendar = line === "Martes 3:00 PM";
                      const isReminder = line === "Recibirás recordatorio";

                      if (isCalendar || isReminder) {
                        return (
                          <p key={line} className="flex items-center gap-2">
                            <Icon
                              icon={isCalendar ? "lucide:calendar-days" : "lucide:bell-ring"}
                              className="h-3.5 w-3.5"
                            />
                            {line}
                          </p>
                        );
                      }

                      return <p key={line}>{line}</p>;
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
