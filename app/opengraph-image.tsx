import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "CitasBot — Tu agenda se llena sola por WhatsApp";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const svg = readFileSync(join(process.cwd(), "public/citasbot-simbolo.svg"));
  const symbol = `data:image/svg+xml;base64,${svg.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF8F5",
          color: "#17181C",
          padding: "64px 80px 0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse solo admite img */}
          <img src={symbol} width={72} height={72} alt="" />
          <span style={{ fontSize: 40, fontWeight: 600, letterSpacing: "-0.02em" }}>CitasBot</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, maxWidth: 900, letterSpacing: "-0.03em" }}>
            Tu agenda se llena sola por WhatsApp
          </div>
          <div style={{ fontSize: 30, color: "#5E5F66" }}>
            Citas, confirmaciones y recordatorios automáticos.
          </div>
        </div>

        <div style={{ display: "flex", height: 12, margin: "0 -80px", background: "#C8471F" }} />
      </div>
    ),
    size,
  );
}
