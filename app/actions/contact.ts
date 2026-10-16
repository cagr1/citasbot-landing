"use server";

import { Resend } from "resend";

export type ContactState = { success: boolean; message: string };

export async function sendContactEmail(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const business = String(formData.get("business") ?? "").trim();
  const plan = String(formData.get("plan") ?? "").trim();
  const region = formData.get("region") === "eu" ? "ES" : "LATAM";
  const privacy = formData.get("privacy");

  if (!name || !email)
    return { success: false, message: "Nombre y correo son requeridos." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { success: false, message: "El correo ingresado no es válido." };
  if (!privacy)
    return { success: false, message: "Debes confirmar que has leído la política de privacidad." };

  const subject = `[DEMO][${region}] ${name}${business ? ` — ${business}` : ""}`.replace(/[\r\n]+/g, " ");
  const body = [
    `Nombre: ${name}`,
    `Correo: ${email}`,
    `WhatsApp: ${phone || "-"}`,
    `Negocio: ${business || "-"}`,
    `Plan: ${plan || "-"}`,
    `Región: ${region}`,
    "",
    message || "(sin mensaje)",
  ].join("\n");

  if (!process.env.RESEND_API_KEY) {
    console.log("[contact-form]", { subject, body });
    return { success: true, message: "Mensaje recibido. Te contactaremos pronto." };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "CitasBot <noreply@citasbot.app>",
      to: "hello@citasbot.app",
      replyTo: email,
      subject,
      text: body,
    });
    return { success: true, message: "Mensaje enviado. Te escribimos en menos de 24 h." };
  } catch (error) {
    console.error("[contact-form:resend-error]", error);
    return { success: false, message: "Error al enviar. Escríbenos a hello@citasbot.app." };
  }
}
