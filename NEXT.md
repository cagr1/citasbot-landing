# NEXT — Rediseño landing CitasBot (España + LATAM)

Objetivo: landing de SaaS profesional, sin huella "AI", que convierta a leads de España y LATAM.

## Bloqueado por el usuario
- [ ] Referencias: 2–3 landings que le gusten.
- [ ] Capturas reales del dashboard y del flujo de WhatsApp.
- [ ] Precios en € para España; ¿LATAM sigue en USD (12 / 25 actual)?
- [ ] Datos para el Aviso legal (titular, NIF/RUC, domicilio, email).

## Hallazgos 2026-10-16 (app real: ../citasbot-whatsapp)
- El bot funciona con menús y reglas, sin LLM: no aplica la transparencia de la Ley de IA de la UE (art. 50). Aun así conviene presentarlo como "asistente automático".
- Cobro: USD, transferencia manual o Stripe opcional. Stripe directo no está disponible en Ecuador.
  Hay un proveedor Paddle (MoR) en `lib/billing/providers/paddle.ts` (443 líneas), sin probar.
- Faltan para España: IVA, NIF o dirección fiscal, numeración y PDF de facturas, alta autoservicio, Madrid en
  `app/dashboard/configuracion/page.tsx:447`, locale `es-EC`, DPA del art. 28 y registro del opt-in de WhatsApp.
- Investigación de normas y competencia: `scratchpad/investigar-ue.md` de la sesión. Lo fiscal y lo RGPD están sin verificar en
  fuentes oficiales; antes de cobrar hay que validarlo con un asesor.

## Decisiones abiertas
- Canal de cobro UE: Paddle (MoR, ya hay código) o una LLC con Stripe. Recomendado: Paddle.
- España: solo B2B (NIF obligatorio, "+ IVA") o también consumidores. Recomendado: solo B2B.
- Precios en €: propuesta Starter 19 €, Pro 39 €, + IVA, con 14 días de prueba.

## Coste por cliente España (estimado, sin verificar)
- Paddle: 5 % + 0,50 USD por cobro (dato de memoria, confirmar en paddle.com/pricing).
- Meta: ~0,03 € por recordatorio enviado fuera de la ventana de 24 h. Si el negocio paga su propia WABA, ese coste no es nuestro.
- IA en Pro (Claude Haiku 5.5, 0,10/0,50 USD por 1M tokens de entrada/salida): ~0,005 USD por conversación → 1–3 €/mes.
- Vercel Hobby no permite uso comercial: hay que pasar a Pro (20 USD/mes) antes de cobrar.

## Lead activo
- Citas Express ES (+34 617 27 09 11): gestoría de citas de extranjería/DGT. Confirmar qué necesita:
  su propia agenda y atención por WhatsApp sí encaja; capturar citas en webs oficiales no lo ofrecemos.

## Lote
1. **Región y moneda**: selector ES / LATAM (€ / USD). Detección inicial por `Accept-Language`/geo,
   que el usuario puede cambiar después; precios en `components/Pricing.tsx:6`. Copy con
   variantes por región solo donde haga falta (ejemplos de negocio, tono).
2. **Legal y RGPD (ES)**: hoy GTM carga sin consentimiento (`app/layout.tsx`, `GoogleTagManager`).
   Hace falta un banner de cookies que bloquee GTM y Analytics hasta que el usuario acepte.
   También Aviso legal, y revisar `public/privacy-policy.html` y `terms.html` para el RGPD.
   `locale: "es_EC"` → `es_ES` / `es_419` según región.
3. **Rediseño visual** (checklist: `taste-skill/skills/redesign-skill`):
   - quitar el degradado azul-violeta como protagonista y dejar un solo acento
   - quitar el pill de badge del hero
   - pasar de la fila de 3 features a un layout asimétrico
   - cambiar la tipografía (Plus Jakarta → candidata Geist/Satoshi)
   - poner capturas reales del producto en el hero
4. **Captura de leads**: CTA a demo/WhatsApp con respuesta rápida; revisar
   `app/actions/contact.ts` (Resend) para que avise al momento.

## Verificación
- `npm run build` sin errores.
- Revisión visual en móvil y escritorio, en ambos temas y en ambas regiones.
- GTM no carga antes de aceptar las cookies (comprobar en la pestaña de red).
