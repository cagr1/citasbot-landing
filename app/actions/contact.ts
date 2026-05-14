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

  if (!name || !email || !message)
    return { success: false, message: "Todos los campos son requeridos." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { success: false, message: "El correo ingresado no es válido." };
  if (message.length < 10)
    return { success: false, message: "El mensaje es demasiado corto." };

  if (!process.env.RESEND_API_KEY) {
    console.log("[contact-form]", { name, email, message });
    return { success: true, message: "Mensaje recibido. Te contactaremos pronto." };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "CitasBot <noreply@citasbot.app>",
      to: "hello@citasbot.com",
      replyTo: email,
      subject: `Nuevo contacto de ${name}`,
      text: `Nombre: ${name}\nCorreo: ${email}\n\n${message}`,
    });
    return { success: true, message: "Mensaje enviado. Te contactamos en menos de 24 horas." };
  } catch {
    return { success: false, message: "Error al enviar. Escríbenos a hello@citasbot.com." };
  }
}
