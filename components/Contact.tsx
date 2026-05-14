"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendContactEmail, type ContactState } from "@/app/actions/contact";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      style={{ background: "linear-gradient(135deg, #4F52FF 0%, #8B3CF7 100%)" }}
    >
      {pending ? "Enviando..." : "Enviar mensaje"}
    </button>
  );
}

const initialState: ContactState = { success: false, message: "" };

const inputClass =
  "w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-[#4F52FF]/30";

const inputStyle = {
  background: "var(--bg-subtle)",
  border: "1px solid var(--border)",
  color: "var(--text-primary)",
};

export default function Contact() {
  const [state, action] = useActionState(sendContactEmail, initialState);

  return (
    <section
      id="contacto"
      className="px-6 py-24 lg:px-8"
      style={{ background: "var(--bg-subtle)" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          {/* Left — copy */}
          <div>
            <p
              className="mb-3 text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--brand)" }}
            >
              Contacto
            </p>
            <h2
              className="mb-4 text-3xl font-extrabold tracking-tight lg:text-4xl"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
            >
              ¿Listo para automatizar tu agenda?
            </h2>
            <p className="mb-8 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Cuéntanos sobre tu negocio y te ayudamos a configurar CitasBot en menos de 24 horas. Sin contrato, sin compromisos.
            </p>

            <div className="space-y-3 text-sm" style={{ color: "var(--text-secondary)" }}>
              <p>
                También puedes escribirnos directamente a{" "}
                <a
                  href="mailto:hello@citasbot.app"
                  className="font-semibold transition-colors hover:opacity-80"
                  style={{ color: "var(--brand)" }}
                >
                  hello@citasbot.app
                </a>
              </p>
              <p style={{ color: "var(--text-muted)" }}>
                Respondemos en menos de 24 horas en días hábiles.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
            }}
          >
            {state.success ? (
              <div className="py-10 text-center">
                <div
                  className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full text-2xl"
                  style={{ background: "rgba(79,82,255,0.08)" }}
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
                    htmlFor="contact-message"
                    className="mb-1.5 block text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Cuéntanos sobre tu negocio y cuántas citas manejas al mes..."
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                  />
                </div>

                {state.message && !state.success && (
                  <p className="text-sm" style={{ color: "#ef4444" }}>
                    {state.message}
                  </p>
                )}

                <SubmitButton />
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
