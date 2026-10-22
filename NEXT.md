# NEXT — Landing CitasBot (España + LATAM)

Handoff del 2026-10-16. Objetivo: landing de SaaS profesional, sin huella "AI", que convierta a leads
de España y LATAM. Después, el backend en su propio proyecto (`../citasbot-whatsapp`).

## Estado (2026-10-16, cierre del lote landing)
- **En producción** (`main`, PR #2): región y precios €/US$, legal RGPD, analítica sin cookies, rediseño completo
  (dirección en `docs/direccion-visual.md`), logo nuevo SVG, favicon e imagen OG.
- **PR #3 `feat/modo-oscuro`** (sin fusionar): modo oscuro automático + conmutador, iPhone visible en oscuro,
  pie con carlosgallardo.dev e Instagram @carlosglabs.

## Pendiente del usuario (landing)
- [ ] Fusionar el PR #3.
- [ ] `[PENDIENTE]` legales: titular, NIF/RUC y domicilio (`app/aviso-legal/page.tsx`); representante UE (art. 27)
      y región de Supabase (`public/privacy-policy.html`). Revisión de un abogado de RGPD.
- [ ] Vercel: activar Web Analytics, borrar `NEXT_PUBLIC_GTM_ID` y pasar a Pro (Hobby prohíbe uso comercial;
      los eventos propios probablemente exigen Pro, sin verificar).
- [ ] Captura del Inicio del dashboard con datos de prueba → `public/images/dashboard-inicio.png`.
- [ ] Enlaces con UTM en todo lo compartido (WhatsApp, LinkedIn, anuncios).
- [ ] Contestar al lead **Citas Express ES** (+34 617 27 09 11).

## Pendiente opcional (landing, sesión nueva)
- Desambiguar "citas" (la gente lo lee como app para ligar): línea encima del titular
  `Reservas por WhatsApp para clínicas, peluquerías y centros de estética`, y título/descr. de Google y OG
  `CitasBot — Reservas por WhatsApp para negocios de servicios`. Mismo descriptor en el perfil de WhatsApp Business.
- Lighthouse móvil (presupuesto ≥ 90) y revisión en oscuro a 375 px.
- Borrar `hooks/useFadeIn.ts` si sigue sin uso.

## Backend (`../citasbot-whatsapp`, sesión propia: lo siguiente)
- **Bug**: emojis rotos (`ðŸ“…`) en el aviso de reprogramación, `app/api/appointments/update-status/route.ts:150`.
- **Marca**: logo nuevo (`public/citasbot-simbolo.svg` de este repo) y paleta papel/tinta/terracota en el dashboard.
- **Cobro en €**:
  - Paddle como MoR; ya hay `lib/billing/providers/paddle.ts`, sin probar. Stripe directo no admite Ecuador.
  - Confirmar que Paddle acepta vendedores de Ecuador y su comisión (de memoria: 5 % + 0,50 USD).
  - Recomendado: España solo B2B, con NIF obligatorio y precios "+ IVA".
- **Datos fiscales**: NIF y dirección del cliente, numeración y PDF de facturas.
- **Región**:
  - Madrid en `app/dashboard/configuracion/page.tsx:447`
  - locale `es-EC` fijo en `lib/whatsapp/send-message.ts:208`
  - idioma por negocio
- **IA en Pro**: Claude Haiku 5.5, acotada al negocio. Prompt de sistema con los datos del negocio y
  herramientas cerradas: disponibilidad, reservar, cancelar. Fuera de eso, deriva a un humano.
  Debe decir que es un asistente automático (Ley de IA de la UE, art. 50).
  Coste estimado: ~0,005 USD por conversación.
- **RGPD**: DPA del art. 28 con cada negocio y registro del opt-in de WhatsApp. Región de Supabase/Vercel sin confirmar.
- **Infra**: Vercel Hobby prohíbe el uso comercial; pasar a Pro antes de cobrar.
- Falta un cron `ACTIVE → PAST_DUE`; ver `../citasbot-whatsapp/NEXT.md` §1.

## Referencias
- Investigación de normas UE/España y competencia: `docs/investigacion-ue-2026-10-16.md`.
  Lo fiscal y lo RGPD están sin verificar en fuentes oficiales; validarlo con un asesor antes de cobrar.
- Coste y margen estimados por cliente en España:
  - Starter 19 € → ~15 € de margen
  - Pro 39 € → ~26–28 € de margen
  - Incluye Paddle, Meta (~0,03 € por recordatorio fuera de la ventana de 24 h) y la IA.
- Competencia en España: Booksy 34,99 € + IVA, Koibox desde 40 €, Doctoralia desde 69 €.

## Herramientas (método)
- Bug en `~/.agent-method/bin/delegate:172`: `--tools` es variádico y se traga el prompt, así que el rol
  `investigar` falla siempre. Arreglo: poner el prompt antes de `--tools`, o usar `--tools=...`. Va en `MemoriesMD/method`.
