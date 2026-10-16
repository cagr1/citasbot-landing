# NEXT — Landing CitasBot (España + LATAM)

Handoff del 2026-10-16. Objetivo: landing de SaaS profesional, sin huella "AI", que convierta a leads
de España y LATAM. Después, el backend en su propio proyecto (`../citasbot-whatsapp`).

## Estado
- Rama `feat/region-demo-legal` (sin push), con los commits `bcf1497` y el del spec 02:
  - región por ubicación (`lib/region.ts`): cookie `cb_region` > `x-vercel-ip-country` > `Accept-Language`
  - precios EU 19/39 € + IVA, LATAM USD 12/25
  - CTA "Solicitar demo" con formulario ampliado
  - banner de cookies (GTM solo tras aceptar)
  - `/aviso-legal` y `/cookies`
  - Verificado con build, curl ES/MX y navegador en móvil.
- **Sin desplegar.**

## Siguiente paso
- Hecho: spec 02 (región invisible, navbar `lg:`, enlace "Ver precios en USD/€" al pie de los precios).
  Verificado con build, curl ES/MX, navegador a 375/800/1024/1280 px y clic del enlace (cookie `cb_region`).
- Lo siguiente es el rediseño visual (punto 3 del lote), bloqueado por las referencias y capturas.
  Lo que no depende de ellas: el punto 4 (RGPD de `privacy-policy.html`/`terms.html`) y el punto 5.

## Pendiente del usuario
- [ ] Datos del aviso legal (LSSI art. 10): titular, NIF/RUC y domicilio. Hoy aparecen como
      `[PENDIENTE]` en `app/aviso-legal/page.tsx`. Conviene completarlos antes de desplegar.
- [ ] Referencias (2–3 landings) y capturas reales del dashboard y del flujo de WhatsApp. Bloquean el rediseño visual.
- [ ] Contestar al lead **Citas Express ES** (+34 617 27 09 11), una gestoría de citas de extranjería/DGT.
      Preguntarle qué necesita. Su agenda y su atención por WhatsApp encajan; capturar citas en webs
      oficiales no lo ofrecemos. Para el primer cliente: alta manual, factura B2B y precio fundador.

## Lote landing (orden)
1. ~~Región, precios, CTA de demo, legal y cookies~~ (hecho, `bcf1497`).
2. ~~Spec 02: región invisible y navbar responsive~~ (hecho).
3. Rediseño visual (cuando lleguen las referencias), con el checklist de `taste-skill/skills/redesign-skill`:
   - un solo acento en vez del degradado azul-violeta
   - sin pill en el hero
   - features en layout asimétrico
   - otra tipografía
   - capturas reales del producto
4. Revisar `public/privacy-policy.html` y `terms.html` para el RGPD (encargado del tratamiento, subencargados).
5. Detalles: el precio LATAM sale como "USD 12" (`Intl` es-419). Valorar "US$ 12".

## Backend (`../citasbot-whatsapp`, sesión propia, después del landing)
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
