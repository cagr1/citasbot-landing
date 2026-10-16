"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "cb_consent";
const RESET_EVENT = "cb-consent-reset";

let gtmLoaded = false;

function readConsent(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function loadGtm() {
  const id = process.env.NEXT_PUBLIC_GTM_ID;
  if (gtmLoaded || !id || !/^GTM-[A-Z0-9]+$/.test(id)) return;
  gtmLoaded = true;

  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
  document.head.appendChild(script);
}

export function ConfigureCookiesButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        try {
          localStorage.removeItem(CONSENT_KEY);
        } catch {}
        window.dispatchEvent(new Event(RESET_EVENT));
      }}
    >
      Configurar cookies
    </button>
  );
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = readConsent();
    if (consent === "accepted") loadGtm();
    else if (consent !== "rejected") setVisible(true);

    const onReset = () => {
      // GTM no se puede descargar en caliente: se recarga para retirar el consentimiento.
      if (gtmLoaded) window.location.reload();
      else setVisible(true);
    };
    window.addEventListener(RESET_EVENT, onReset);
    return () => window.removeEventListener(RESET_EVENT, onReset);
  }, []);

  function choose(value: "accepted" | "rejected") {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {}
    if (value === "accepted") loadGtm();
    setVisible(false);
  }

  if (!visible) return null;

  const buttonClass =
    "flex-1 rounded-full px-5 py-2 text-sm font-semibold transition-opacity hover:opacity-80 sm:flex-none";
  const buttonStyle = {
    background: "var(--bg-subtle)",
    border: "1px solid var(--border-strong)",
    color: "var(--text-primary)",
  };

  return (
    <div
      role="dialog"
      aria-label="Consentimiento de cookies"
      className="fixed inset-x-0 bottom-0 z-[60] p-4"
    >
      <div
        className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Usamos cookies de analítica de terceros solo si las aceptas.{" "}
          <a href="/cookies" className="font-semibold underline" style={{ color: "var(--brand)" }}>
            Más información
          </a>
        </p>
        <div className="flex gap-2">
          <button type="button" className={buttonClass} style={buttonStyle} onClick={() => choose("rejected")}>
            Rechazar
          </button>
          <button type="button" className={buttonClass} style={buttonStyle} onClick={() => choose("accepted")}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
